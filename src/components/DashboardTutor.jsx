import React, { useState, useEffect, Fragment, useMemo } from "react";
import { supabase } from "../supabaseClient";
import { STUDENTS } from "../data/students";
import { CLASSES, MENUS, FEEDBACK_MESSAGES } from "../data/constants";
import { getSessionConfig } from "../data/sessions";

// ============================================================
// KONFIGURASI LAPORAN FORUM DISKUSI LKM
// Tambahkan entri baru di sini untuk menerapkan ke kelas/sesi lain.
//
// Format key: `${classId}_${meetingId}`
// postSection   : section_name yang dipakai komponen LKM saat share ke forum
// commentSection: section_name yang dipakai komponen LKM saat komentar
// label         : Judul yang tampil di header laporan
// ============================================================
const LKM_FORUM_CONFIG = {
  "3_2": {
    postSection:    "LKM_6A_FORUM_POST",
    commentSection: "LKM_6A_COMMENT",
    label:          "Laporan Keaktifan Forum Diskusi LKM — Kelas 6A ABK Sesi 2",
  },
  "4_2": {
    postSection:    "LKM_5A_FORUM_POST",
    commentSection: "LKM_5A_COMMENT",
    label:          "Laporan Keaktifan Forum Diskusi LKM — Kelas 5A Strategi Sesi 2",
  },
};

export const DashboardTutor = ({ 
  submissions, 
  moduleContent, 
  fetchData, 
  loading 
}) => {
  // --- INTERNAL STATE ---
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("tutor_active_tab") || "1");
  const [selectedMeeting, setSelectedMeeting] = useState(() => localStorage.getItem("tutor_selected_meeting") || "1");
  const [groupCount, setGroupCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [unlocking, setUnlocking] = useState(null);
  const [activeCorrectionTab, setActiveCorrectionTab] = useState(MENUS[0]);
  const [showGroupPreview, setShowGroupPreview] = useState(false);

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem("tutor_active_tab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("tutor_selected_meeting", selectedMeeting);
  }, [selectedMeeting]);

  // Reset pagination and search when class or meeting changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm("");
    setExpandedStudent(null);
  }, [activeTab, selectedMeeting]);

  // --- HANDLERS ---
  const handleUnlock = async (studentEmail, sectionName) => {
    const key = `${studentEmail}_${sectionName}`;
    setUnlocking(key);
    try {
      let deleteQuery = supabase
        .from("submissions")
        .delete()
        .eq("student_email", studentEmail);
        
      if (activeTab === "4" && (sectionName.startsWith("LKPD_5A_STAGE_") || sectionName === "LKPD (Lembar Kerja Peserta Didik)")) {
        deleteQuery = deleteQuery.or(`section_name.ilike.LKPD_5A_STAGE_%,section_name.eq."LKPD (Lembar Kerja Peserta Didik)"`);
      } else {
        deleteQuery = deleteQuery.eq("section_name", sectionName);
      }
      
      await deleteQuery;
      await supabase
        .from("submissions")
        .delete()
        .eq("student_email", studentEmail)
        .eq("section_name", `TUTOR_FEEDBACK_${sectionName}`);
      
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setUnlocking(null);
    }
  };

  const handleStarFeedback = async (studentEmail, classId, meetingNum, sectionName, stars) => {
    try {
      const feedbackName = `TUTOR_FEEDBACK_${sectionName}`;
      await supabase
        .from("submissions")
        .delete()
        .eq("student_email", studentEmail)
        .eq("section_name", feedbackName);
      await supabase.from("submissions").insert([{
        student_email: studentEmail,
        class_id: classId,
        meeting_num: meetingNum,
        section_name: feedbackName,
        content: String(stars),
      }]);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateGroups = async () => {
    setGenerating(true);
    try {
      const classStudents = STUDENTS.filter(s => s.classId === activeTab && s.email !== "demo@ecampus.ut.ac.id");
      if (classStudents.length === 0) return;

      const shuffled = [...classStudents];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const groups = Array.from({ length: groupCount }, (_, i) => ({ 
        group_num: i + 1, 
        members: [] 
      }));

      shuffled.forEach((student, index) => {
        const groupIndex = index % groupCount;
        groups[groupIndex].members.push({
          nim: student.nim, 
          name: student.name, 
          email: student.email,
          isLeader: groups[groupIndex].members.length === 0
        });
      });

      // Conversion to integer for DB compatibility if needed
      const dbClassId = isNaN(activeTab) ? activeTab : parseInt(activeTab);
      const dbMeetingNum = isNaN(selectedMeeting) ? selectedMeeting : parseInt(selectedMeeting);

      await supabase.from("submissions").delete()
        .eq("student_email", "SYSTEM_GROUP")
        .eq("class_id", dbClassId)
        .eq("meeting_num", dbMeetingNum);

      const { error: insError } = await supabase.from("submissions").insert([{
        student_email: "SYSTEM_GROUP", 
        class_id: dbClassId, 
        meeting_num: dbMeetingNum,
        section_name: "GENERATED_GROUPS", 
        content: JSON.stringify(groups)
      }]);

      if (insError) throw insError;

      alert(`Berhasil mengacak ${classStudents.length} mahasiswa ke ${groupCount} kelompok!`);
      await fetchData();
    } finally {
      setGenerating(false);
    }
  };

  const handleResetGroups = async () => {
    if (!confirm(`Reset kelompok Pertemuan ${selectedMeeting}?`)) return;
    setGenerating(true);
    try {
      const dbClassId = isNaN(activeTab) ? activeTab : parseInt(activeTab);
      const dbMeetingNum = isNaN(selectedMeeting) ? selectedMeeting : parseInt(selectedMeeting);

      await supabase.from("submissions").delete()
        .eq("student_email", "SYSTEM_GROUP")
        .eq("class_id", dbClassId)
        .eq("meeting_num", dbMeetingNum)
        .eq("section_name", "GENERATED_GROUPS");
      
      await fetchData();
    } finally {
      setGenerating(false);
    }
  };

  // --- DERIVED DATA ---
  const studentList = useMemo(() => {
    let filtered = STUDENTS.filter(s => s.classId === activeTab && s.email !== "demo@ecampus.ut.ac.id");
    if (activeTab === "demo") filtered = STUDENTS.filter(s => s.email === "demo@ecampus.ut.ac.id").slice(0, 1);
    if (searchTerm) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.nim.includes(searchTerm));
    }
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [activeTab, searchTerm]);

  const paginatedStudents = studentList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const forumActivityReport = useMemo(() => {
    const configKey = `${activeTab}_${selectedMeeting}`;
    const forumConfig = LKM_FORUM_CONFIG[configKey];
    if (!forumConfig) return null;

    const { postSection, commentSection, label } = forumConfig;

    const allPosts    = (submissions || []).filter(s => s.section_name === postSection);
    const allComments = (submissions || []).filter(s => s.section_name === commentSection);

    const groupRow = (submissions || []).find(
      s => s.student_email === "SYSTEM_GROUP" &&
           s.section_name === "GENERATED_GROUPS" &&
           String(s.meeting_num) === String(selectedMeeting)
    );
    const groupsData = groupRow ? (() => { try { return JSON.parse(groupRow.content); } catch(e) { return null; } })() : null;

    const getGroupNum = (email) => {
      if (!groupsData) return "-";
      const g = groupsData.find(grp => grp.members.some(m => m.email === email));
      return g ? g.group_num : "-";
    };

    const classStudents = STUDENTS.filter(
      s => s.classId === activeTab && s.email !== "demo@ecampus.ut.ac.id"
    );

    const rows = classStudents.map(student => {
      const postCount    = allPosts.filter(p => p.student_email === student.email).length;
      const commentCount = allComments.filter(c => c.student_email === student.email).length;
      const totalActivity = postCount + commentCount;

      let badge, badgeColor;
      if (postCount >= 2 && commentCount >= 2) {
        badge = "Sangat Aktif";  badgeColor = "bg-emerald-500 text-white";
      } else if (postCount >= 1 && commentCount >= 1) {
        badge = "Aktif";         badgeColor = "bg-blue-500 text-white";
      } else if (totalActivity >= 1) {
        badge = "Cukup";         badgeColor = "bg-amber-400 text-slate-900";
      } else {
        badge = "Pasif";         badgeColor = "bg-rose-100 text-rose-600";
      }

      return {
        ...student,
        groupNum: getGroupNum(student.email),
        postCount,
        commentCount,
        totalActivity,
        badge,
        badgeColor,
      };
    }).sort((a, b) => b.totalActivity - a.totalActivity);

    return { rows, label, postSection, commentSection };
  }, [submissions, activeTab, selectedMeeting]);

  const calculateProgress = (studentEmail, meetingNum) => {
    const sessionConfig = getSessionConfig(activeTab, meetingNum);
    let requiredMenus = ["Pertanyaan Pemantik", "Ayo Diskusi (LKPD)", "Kuis dan Latihan", "Refleksi"];
    
    if (sessionConfig) {
      requiredMenus = sessionConfig.sections.filter(s => s.required).map(s => s.name);
      if (requiredMenus.length === 0) {
        requiredMenus = sessionConfig.sections.map(s => s.name);
      }
    }

    const studentSubs = (submissions || []).filter(s => 
      s.student_email === studentEmail && 
      String(s.meeting_num) === String(meetingNum)
    );

    const isSectionCompleted = (menuName, subs) => {
      return subs.some(s => {
        const sName = s.section_name || "";
        // Special Matching for Class 5A (ID: 4) Sesi 1 (meeting: 1)
        if (activeTab === "4" && String(meetingNum) === "1") {
          if (menuName === "Ayo Diskusi (LKPD)") {
            return sName.startsWith("LKPD_5A_STAGE_") || 
                   sName === "Ayo Diskusi (LKPD)" || 
                   sName === "LKPD (Lembar Kerja Peserta Didik)" ||
                   sName === "LKM (Lembar Kerja Peserta Didik)";
          }
          if (menuName === "Pertanyaan Pemantik") return sName === "Pertanyaan Pemantik" || sName === "Pemantik";
          if (menuName === "Kuis dan Latihan") return sName === "Kuis dan Latihan" || sName === "Quiz" || sName === "Kuis";
          if (menuName === "Refleksi") return sName === "Refleksi" || sName === "Refleksi Materi";
        }
        
        // Special Matching for Class 6A (ID: 3) Sesi 1
        if (activeTab === "3" && String(meetingNum) === "1" && menuName === "Ayo Diskusi (LKPD)") {
           return sName === "LKPD_6A_DISCUSSION" || sName === "Ayo Diskusi (LKPD)";
        }

        // Default Match
        return sName === menuName;
      });
    };

    const completedCount = requiredMenus.filter(menu => isSectionCompleted(menu, studentSubs)).length;

    return Math.round((completedCount / requiredMenus.length) * 100);
  };

  const totalPages = Math.ceil(studentList.length / pageSize);

  const renderCorrectionHub = (student) => {
    const studentSubs = (submissions || []).filter(s => s.student_email === student.email && String(s.meeting_num) === String(selectedMeeting));
    const sessionConfig = getSessionConfig(activeTab, selectedMeeting);
    
    return (
      <div className="bg-slate-50 border-t-2 border-slate-200 p-6 animate-in slide-in-from-top-2 duration-300">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-4">Kategori Penilaian</p>
            {(() => {
              let dynamicMenus = sessionConfig ? sessionConfig.sections.map(s => s.name) : [...MENUS];

              const configKey = `${activeTab}_${selectedMeeting}`;
              const forumConfig = LKM_FORUM_CONFIG[configKey];
              if (forumConfig) {
                dynamicMenus.push("Keaktifan Forum");
              }

              const isSectionCompletedInHub = (menuName) => {
                return studentSubs.some(s => {
                  const sName = s.section_name || "";
                  if (String(selectedMeeting) === "1") {
                    if (activeTab === "3" && menuName === "Ayo Diskusi (LKPD)") return sName === "LKPD_6A_DISCUSSION";
                    if (activeTab === "4") {
                      if (menuName === "Ayo Diskusi (LKPD)") {
                        return sName.startsWith("LKPD_5A_STAGE_") || 
                               sName === "Ayo Diskusi (LKPD)" || 
                               sName === "LKPD (Lembar Kerja Peserta Didik)" ||
                               sName === "LKM (Lembar Kerja Peserta Didik)";
                      }
                      if (menuName === "Pertanyaan Pemantik") return sName === "Pertanyaan Pemantik" || sName === "Pemantik";
                      if (menuName === "Kuis dan Latihan") return sName === "Kuis dan Latihan" || sName === "Quiz" || sName === "Kuis";
                      if (menuName === "Refleksi") return sName === "Refleksi" || sName === "Refleksi Materi";
                    }
                    if ((activeTab === "1" || activeTab === "2") && menuName === "Ayo Diskusi (LKPD)") return sName === "LKPD (Lembar Kerja Peserta Didik)";
                  }
                  return sName === menuName;
                });
              };

              return dynamicMenus.map(menu => {
                const isForumActivityTab = menu === "Keaktifan Forum";
                const hasSub = isForumActivityTab ? true : isSectionCompletedInHub(menu);
                
                const hasFeedback = studentSubs.find(s => s.section_name === `TUTOR_FEEDBACK_${menu}`);
                
                let displayLabel = menu;
                if (sessionConfig) {
                  const sect = sessionConfig.sections.find(s => s.name === menu);
                  if (sect?.tutorLabel) displayLabel = sect.tutorLabel;
                } else if (activeTab === "1" || activeTab === "2") {
                  if (menu === "Ayo Diskusi (LKPD)") displayLabel = "LKM";
                }

                return (
                  <button
                    key={menu}
                    onClick={() => setActiveCorrectionTab(menu)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-[10px] font-black transition-all flex items-center justify-between group ${activeCorrectionTab === menu ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white text-slate-500 hover:bg-slate-100"}`}
                  >
                    <span className="truncate">{displayLabel}</span>
                    <div className="flex items-center gap-1">
                      {hasSub && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-white"></span>}
                      {hasFeedback && <span className="material-symbols-outlined text-[14px] text-emerald-400 group-hover:text-white">verified</span>}
                    </div>
                  </button>
                );
              });
            })()}
          </div>

          <div className="flex-1 bg-white rounded-[3rem] p-8 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden transition-all duration-500">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                <span className="material-symbols-outlined text-[150px] font-thin">
                  {activeCorrectionTab === "Keaktifan Forum" ? 'forum' : 
                   activeCorrectionTab.includes("Kuis") || activeCorrectionTab === "Quiz" ? 'quiz' : 
                   activeCorrectionTab === "Rangkuman" ? 'history_edu' : 
                   activeCorrectionTab === "Refleksi" ? 'psychology' : 'edit_note'}
                </span>
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                  <h4 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                    <span className="w-2 h-10 bg-primary rounded-full shadow-sm shadow-primary/40"></span>
                    {(() => {
                        const sect = sessionConfig?.sections?.find(s => s.name === activeCorrectionTab);
                        if (sect?.tutorLabel) {
                           if (sect.tutorLabel === "LKM") return "LKM (Lembar Kerja Mahasiswa)";
                           if (sect.tutorLabel === "Quiz") return "Quiz (Latihan)";
                           return sect.tutorLabel;
                        }
                        
                        // Fallback labels for older sessions without tutorLabels
                        if (activeCorrectionTab === "Ayo Diskusi (LKPD)") return "LKM (Lembar Kerja Mahasiswa)";
                        if (activeCorrectionTab === "Kuis dan Latihan") return "Quiz";
                        
                        return activeCorrectionTab;
                    })()}
                  </h4>
                  <div className="hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">person</span>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{student.name}</p>
                  </div>
                </div>

                {(() => {
                  const sub = studentSubs.find(s => {
                    const sName = s.section_name || "";
                    if (String(selectedMeeting) === "1") {
                      if (activeTab === "3" && activeCorrectionTab === "Ayo Diskusi (LKPD)") return sName === "LKPD_6A_DISCUSSION";
                      if (activeTab === "4") {
                        if (activeCorrectionTab === "Ayo Diskusi (LKPD)") {
                          return sName.startsWith("LKPD_5A_STAGE_") || 
                                 sName === "Ayo Diskusi (LKPD)" || 
                                 sName === "LKPD (Lembar Kerja Peserta Didik)" ||
                                 sName === "LKM (Lembar Kerja Peserta Didik)";
                        }
                        if (activeCorrectionTab === "Pertanyaan Pemantik") return sName === "Pertanyaan Pemantik" || sName === "Pemantik";
                        if (activeCorrectionTab === "Kuis dan Latihan") return sName === "Kuis dan Latihan" || sName === "Quiz" || sName === "Kuis";
                        if (activeCorrectionTab === "Refleksi") return sName === "Refleksi" || sName === "Refleksi Materi";
                      }
                      if ((activeTab === "1" || activeTab === "2") && activeCorrectionTab === "Ayo Diskusi (LKPD)") return sName === "LKPD (Lembar Kerja Peserta Didik)";
                    }
                    return sName === activeCorrectionTab;
                  });

                  if (!sub && activeCorrectionTab !== "Keaktifan Forum") return (
                    <div className="py-24 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-slate-200 shadow-inner">
                        <span className="material-symbols-outlined text-slate-300 text-4xl">history_edu</span>
                      </div>
                      <p className="text-slate-400 font-bold italic tracking-tight">Belum ada pengiriman dari mahasiswa.</p>
                      <p className="text-[10px] text-slate-300 uppercase font-black mt-2 tracking-widest">Awaiting Submission</p>
                    </div>
                  );

                  const feedback = studentSubs.find(s => s.section_name === `TUTOR_FEEDBACK_${activeCorrectionTab}`);
                  const curStars = feedback ? parseInt(feedback.content) : 0;

                  return (
                    <div className="space-y-10 animate-in fade-in">
                       <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-inner relative">
                          <div className="absolute top-6 right-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Submitted Content</div>
                          <div className="text-slate-700 leading-[1.8] font-medium text-base md:text-lg">
                            {/* TAB KEAKTIFAN FORUM - Diletakkan paling pertama untuk menghindari undefined crash */}
                            {activeCorrectionTab === "Keaktifan Forum" ? (() => {
                                const configKey = `${activeTab}_${selectedMeeting}`;
                                const config = LKM_FORUM_CONFIG[configKey];
                                if (!config) return <div className="py-20 text-center text-slate-400 italic">Data konfigurasi forum tidak ditemukan.</div>;
                                
                                const pCount = (submissions || []).filter(s => s.student_email === student.email && s.section_name === config.postSection).length;
                                const cCount = (submissions || []).filter(s => s.student_email === student.email && s.section_name === config.commentSection).length;
                                
                                let b = "Pasif", bc = "bg-rose-100 text-rose-600";
                                if (pCount >= 2 && cCount >= 2) { b = "Sangat Aktif"; bc = "bg-emerald-500 text-white shadow-emerald-200"; }
                                else if (pCount >= 1 && cCount >= 1) { b = "Aktif"; bc = "bg-blue-500 text-white shadow-blue-200"; }
                                else if ((pCount + cCount) >= 1) { b = "Cukup"; bc = "bg-amber-400 text-slate-900 shadow-amber-200"; }

                                return (
                                  <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                                            <span className="material-symbols-outlined font-black">public</span>
                                          </div>
                                          <div className="text-left">
                                            <p className="text-sm font-black text-slate-800">{pCount} Post</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Discussion Post</p>
                                          </div>
                                        </div>
                                        <div className="w-px h-10 bg-slate-100 mx-4"></div>
                                        <div className="flex items-center gap-4">
                                          <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center">
                                            <span className="material-symbols-outlined font-black">chat</span>
                                          </div>
                                          <div className="text-left">
                                            <p className="text-sm font-black text-slate-800">{cCount} Komen</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Replies</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className={`p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center text-center ${bc}`}>
                                         <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Status Keaktifan</p>
                                         <h4 className="text-2xl font-black uppercase tracking-tight">{b}</h4>
                                      </div>
                                    </div>
                                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                                       <div className="flex items-center gap-3 mb-6">
                                          <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                                          <h5 className="font-black text-slate-800 text-sm italic">"Review Singkat Kontribusi Diskusi"</h5>
                                       </div>
                                       <p className="text-xs text-slate-500 leading-relaxed text-left bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                                          Mahasiswa ini telah berkontribusi dengan membagikan pemikiran mereka dan menanggapi rekan sejawat di Forum LKM. Gunakan data di atas sebagai pertimbangan tambahan dalam memberikan nilai pada menu LKM atau Refleksi.
                                       </p>
                                    </div>
                                  </div>
                                );
                            })() : (activeCorrectionTab === "Kuis dan Latihan" || activeCorrectionTab === "Quiz") ? (
                              <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-slate-50">
                                <div className="w-28 h-28 bg-gradient-to-br from-primary to-indigo-900 rounded-[2rem] flex flex-col items-center justify-center text-white shadow-xl shadow-primary/20">
                                  <span className="text-4xl font-black">{sub?.content?.match(/SKOR AKHIR: (\d+)/)?.[1] || "0"}</span>
                                  <span className="text-xs font-bold opacity-60">/ 100</span>
                                </div>
                                <div className="text-center md:text-left">
                                  <p className="text-xl font-black text-slate-800 mb-2">Evaluasi Quiz Otomatis</p>
                                  <p className="text-slate-500 leading-relaxed max-w-sm">
                                    {sub?.content?.split('\n')?.[1] || "Mahasiswa telah menyelesaikan seluruh rangkaian soal dengan hasil di atas."}
                                  </p>
                                </div>
                              </div>
                            ) : (activeCorrectionTab === "Pertanyaan Pemantik" || activeCorrectionTab === "Refleksi") ? (
                              <div className="grid gap-8">
                                {(sub?.content || "").split(/\n\n(?=Pertanyaan \d+:)/).map((block, bidx) => {
                                  let parts = block.split(/\nJawaban: |\nJawaban: /);
                                  return (
                                    <div key={bidx} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                                      <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100">
                                        <div className="flex items-center gap-2 mb-3">
                                           <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                           <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest">Pertanyaan Tutor</p>
                                        </div>
                                        <p className="font-black text-slate-800 text-sm md:text-base">{parts[0]?.replace(/^Pertanyaan \d+: /, "")}</p>
                                      </div>
                                      <div className="p-6 md:p-8 bg-white relative">
                                         <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Jawaban Mahasiswa</p>
                                         </div>
                                         <div className="text-slate-600 font-medium leading-[1.8] text-sm md:text-base text-left">
                                            {parts[1] || "-"}
                                         </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : sub?.section_name === "LKPD_6A_DISCUSSION" || sub?.section_name?.startsWith("LKPD_5A_STAGE_") ? (
                               <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-inner">
                                 {(() => {
                                   try {
                                     const data = JSON.parse(sub?.content || "{}");
                                     if (sub?.section_name === "LKPD_6A_DISCUSSION") {
                                       return (
                                         <div className="space-y-4">
                                           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p className="text-[10px] font-black text-primary uppercase mb-2">Pertanyaan</p><p className="font-bold text-slate-800">{data.questionId}</p></div>
                                           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Jawaban</p><p className="text-slate-600 whitespace-pre-wrap">{data.text}</p></div>
                                         </div>
                                       );
                                     }
                                     return <p className="text-xs font-bold text-slate-400 italic">Data interaktif {sub?.section_name} terdeteksi.</p>;
                                   } catch (e) { return <p className="text-slate-500 italic">Gagal memproses data interaktif.</p>; }
                                 })()}
                               </div>
                            ) : activeCorrectionTab === "Rangkuman" ? (
                              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-lg shadow-primary/5">
                                 <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                       <span className="material-symbols-outlined">auto_stories</span>
                                    </div>
                                    <div>
                                       <p className="text-xl font-black text-slate-800 mb-1">Jurnal Sintesis Terpandu</p>
                                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{sub?.content?.match(/TOTAL KATA: (\d+)/)?.[0] || "Summary Report"}</p>
                                    </div>
                                 </div>
                                 <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium font-serif border-l-4 border-emerald-100 pl-8 ml-2 text-sm md:text-base">
                                   {(sub?.content || "").replace(/\[RANGKUMAN MODUL PENGGANTI TEST\]\n/, "")}
                                 </div>
                              </div>
                            ) : (activeCorrectionTab === "Informasi Modul" || activeCorrectionTab === "RAT/SAT") ? (
                               <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-lg shadow-primary/5">
                                 {(() => {
                                   const cfg = getSessionConfig(activeTab, selectedMeeting);
                                   const ratsat = cfg?.sections?.find(s => s.type === "RATSATV2");
                                   return (
                                     <div className="space-y-8">
                                       <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pertanyaan Evaluasi RAT/SAT</p>
                                         <p className="text-sm font-black text-slate-800 italic leading-relaxed">
                                           "{ratsat?.content?.evaluationQuestion || "Apa pendapat Anda mengenai modul ini?"}"
                                         </p>
                                       </div>
                                       <div className="space-y-3">
                                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Jawaban Mahasiswa</p>
                                          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium font-serif border-l-4 border-emerald-100 pl-8 ml-2 text-sm md:text-base text-justify">
                                            {sub?.content || "Tidak ada konten."}
                                          </div>
                                       </div>
                                     </div>
                                   );
                                 })()}
                               </div>
                            ) : sub?.content?.includes("Jawaban:") ? (
                              <div className="grid gap-8">
                                {sub.content.split(/\n\n(?=Soal \d+:)/).map((block, bidx) => {
                                  let parts = block.split(/\n\nJawaban:\n|\nJawaban:\n|\nJawaban: /);
                                  return (
                                    <div key={bidx} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                                      <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100">
                                         <p className="font-black text-slate-800 text-sm md:text-base">{parts[0]?.replace(/^Soal \d+: /, "")}</p>
                                      </div>
                                      <div className="p-6 md:p-8 bg-white text-slate-600 text-sm md:text-base text-left">{parts[1] || "-"}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                               <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm font-medium leading-[2] whitespace-pre-wrap text-slate-800 text-sm md:text-base text-left">
                                 {sub?.content || "Tidak ada konten."}
                               </div>
                            )}
                          </div>
                       </div>

                       {/* Grading & Feedback Area */}
                       <div className="pt-10 mt-10 border-t border-slate-100 bg-white sticky bottom-0 z-10 py-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 text-left">
                            <div>
                              <h5 className="font-black text-slate-900 text-lg mb-1 tracking-tight">Validasi & Penilaian</h5>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Berikan Apresiasi Bintang</p>
                            </div>
                            <div className="flex gap-3 bg-slate-50 p-3 rounded-[2rem] border border-slate-100">
                               {[1, 2, 3, 4, 5].map(star => (
                                 <button key={star} onClick={() => handleStarFeedback(student.email, activeTab, selectedMeeting, activeCorrectionTab, star)} className={`w-14 h-14 rounded-2xl transition-all flex items-center justify-center ${star <= curStars ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-xl shadow-yellow-400/30" : "bg-white text-slate-200 hover:text-slate-300"}`}>
                                   <span className="material-symbols-outlined fill-1 text-[28px]">star</span>
                                 </button>
                               ))}
                            </div>
                          </div>
                          {curStars > 0 && <div className="mt-8 bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex items-center gap-6"><div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-emerald-500 shrink-0"><span className="material-symbols-outlined text-4xl">verified</span></div><div><p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Feedback:</p><p className="text-lg font-black text-slate-800 italic">"{FEEDBACK_MESSAGES[curStars]}"</p></div></div>}
                          <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-8">
                             <span className="text-[9px] font-black tracking-widest uppercase text-slate-300">Data Terenkripsi Aman</span>
                             <button onClick={() => handleUnlock(student.email, activeCorrectionTab)} className="text-[10px] font-black text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl uppercase transition-all">Reset Jawaban</button>
                          </div>
                       </div>
                    </div>
                  );
                })()}
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-8 min-h-screen px-4 bg-slate-50/30">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-left">
           <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Pusat Kendali Tutor</h1>
           <p className="text-slate-500 font-medium italic">Kelola kelas, acak kelompok, dan berikan penilaian real-time.</p>
        </div>
        <button onClick={fetchData} className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-black text-slate-600 hover:text-primary transition-all flex items-center gap-2 shadow-sm">
           <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>refresh</span> Refresh Data
        </button>
      </div>

      <div className="mb-10 overflow-x-auto pb-4 custom-scrollbar">
         <div className="flex gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <button key={num} onClick={() => setSelectedMeeting(String(num))} className={`flex-shrink-0 w-36 p-5 rounded-3xl border-2 transition-all text-center ${selectedMeeting === String(num) ? "bg-primary border-primary text-white shadow-xl scale-105" : "bg-white border-white text-slate-400 hover:border-slate-200"}`}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Pertemuan</p>
                <p className="text-3xl font-black leading-none">{num}</p>
              </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {CLASSES.map((cls) => {
          const studentCount = STUDENTS.filter(s => s.classId === cls.id && s.email !== "demo@ecampus.ut.ac.id").length;
          const isActive = activeTab === cls.id;
          return (
            <button key={cls.id} onClick={() => setActiveTab(cls.id)} className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-between overflow-hidden ${isActive ? "bg-white border-primary shadow-xl shadow-primary/10" : "bg-white border-white hover:border-slate-200 text-slate-400"}`}>
              <div className="flex items-center gap-4 text-left relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isActive ? "bg-primary text-white" : "bg-slate-50 text-slate-400"}`}><span className="material-symbols-outlined text-[20px]">school</span></div>
                <div><p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-primary/60" : "text-slate-400"}`}>{cls.title.split("|")[0].trim()}</p><h4 className={`font-black text-sm md:text-base leading-tight ${isActive ? "text-slate-800" : "text-slate-500"}`}>{cls.title.split("|")[1]?.trim() || cls.title}</h4></div>
              </div>
              <div className="text-right relative z-10"><p className={`text-xl font-black ${isActive ? "text-primary" : "text-slate-300"}`}>{studentCount}</p><p className="text-[8px] font-black uppercase tracking-tighter opacity-60">Mahasiswa</p></div>
              {isActive && <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12"></div>}
            </button>
          )
        })}
      </div>

      {activeTab !== "demo" && (
        <div className="mb-10 bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary bg-opacity-20 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-white bg-opacity-10 rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white border-opacity-10"><span className="material-symbols-outlined text-4xl text-yellow-400">casino</span></div>
                 <div><h3 className="text-2xl font-black mb-1 tracking-tight">Generator Kelompok Sesi {selectedMeeting}</h3><p className="text-white text-opacity-50 text-sm font-medium">Acak daftar mahasiswa secara otomatis per pertemuan.</p></div>
              </div>
              <div className="flex flex-wrap items-center gap-4 bg-white bg-opacity-5 p-3 rounded-[2rem] border border-white border-opacity-10 backdrop-blur-md">
                 <div className="px-6 border-r border-white border-opacity-10 text-center"><p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Target</p><input type="number" value={groupCount} onChange={e => setGroupCount(parseInt(e.target.value))} className="bg-transparent text-xl font-black text-center w-12 outline-none" /></div>
                 <div className="flex flex-col sm:flex-row gap-2">
                    <button onClick={handleGenerateGroups} disabled={generating} className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-2xl font-black text-sm hover:bg-yellow-300 transition-all shadow-xl disabled:opacity-50">{generating ? 'ACAK...' : 'ACAK SEKARANG'}</button>
                    {(() => {
                        const gr = (submissions || []).find(s => 
                          s.student_email === "SYSTEM_GROUP" && 
                          s.section_name === "GENERATED_GROUPS" && 
                          String(s.class_id) === String(activeTab) &&
                          String(s.meeting_num) === String(selectedMeeting)
                        );
                        if (!gr) return null;
                        return <button onClick={() => setShowGroupPreview(!showGroupPreview)} className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-sm transition-all border-2 ${showGroupPreview ? "bg-white text-primary border-primary" : "bg-white/10 text-white border-white/10 hover:bg-white/20"}`}><span className="material-symbols-outlined">{showGroupPreview ? 'visibility_off' : 'visibility'}</span>{showGroupPreview ? 'Sembunyikan' : 'Lihat'}</button>;
                    })()}
                    <button onClick={handleResetGroups} className="w-14 h-14 bg-red-500 bg-opacity-20 text-red-400 border border-red-500 border-opacity-20 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><span className="material-symbols-outlined">delete_sweep</span></button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {showGroupPreview && (() => {
        const gr = (submissions || []).find(s => 
          s.student_email === "SYSTEM_GROUP" && 
          s.section_name === "GENERATED_GROUPS" && 
          String(s.class_id) === String(activeTab) &&
          String(s.meeting_num) === String(selectedMeeting)
        );
        const groups = gr ? JSON.parse(gr.content) : null;
        if (!groups) return null;
        return (
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex items-center gap-3 mb-6 px-4"><span className="material-symbols-outlined text-primary">diversity_3</span><h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Daftar Kelompok Aktif — Sesi {selectedMeeting}</h3></div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {groups.map((group, gidx) => (
                  <div key={gidx} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl flex flex-col">
                     <div className="flex items-center justify-between mb-6"><div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">{group.group_num}</div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kelompok {group.group_num}</span></div>
                     <div className="space-y-3 flex-1">{group.members.map((member, midx) => (<div key={midx} className={`flex items-center justify-between p-3 rounded-xl border ${member.isLeader ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}><div className="flex items-center gap-3 min-w-0"><div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${member.isLeader ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-500'}`}>{midx + 1}</div><span className="text-[11px] font-bold text-slate-700 truncate">{member.name}</span></div>{member.isLeader && <span className="bg-amber-400 text-[8px] font-black text-white px-2 py-0.5 rounded-full animate-pulse">KETUA</span>}</div>))}</div>
                  </div>
                ))}
             </div>
          </div>
        );
      })()}

      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white">
           <div className="flex items-center gap-4"><div className="w-12 h-12 bg-primary bg-opacity-10 rounded-2xl flex items-center justify-center text-primary"><span className="material-symbols-outlined">groups</span></div><div><h2 className="text-2xl font-black text-slate-800 tracking-tight">Daftar Mahasiswa</h2><p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{studentList.length} Mahasiswa Terdaftar</p></div></div>
           <div className="flex items-center gap-3"><div className="relative"><span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span><input type="text" placeholder="Cari Nama / NIM..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold w-full md:w-80 outline-none transition-all" /></div><select value={pageSize} onChange={e => setPageSize(parseInt(e.target.value))} className="bg-slate-50 border border-slate-100 px-4 py-3.5 rounded-2xl text-xs font-black text-slate-500 cursor-pointer outline-none">{[10, 20, 50].map(s => <option key={s} value={s}>{s} Baris</option>)}</select></div>
        </div>
        <div className="px-8 pb-12 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-4">
            <thead><tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]"><th className="px-6 py-4 text-center w-20">No</th><th className="px-6 py-4 text-left">Informasi</th><th className="px-6 py-4 text-center">Progress</th><th className="px-6 py-4 text-center">Aksi</th></tr></thead>
            <tbody>
              {paginatedStudents.map((student, idx) => {
                const isExpanded = expandedStudent === student.email;
                return (
                  <Fragment key={student.email}>
                    <tr className={`group transition-all bg-white border border-slate-200 rounded-3xl ${isExpanded ? 'ring-2 ring-primary ring-opacity-10 shadow-lg' : 'hover:shadow-md shadow-sm'}`}>
                      <td className="px-6 py-8 text-center text-slate-400 font-black text-sm border-y border-l rounded-l-[1.5rem] bg-slate-50/30">{(currentPage - 1) * pageSize + idx + 1}</td>
                      <td className="px-6 py-8 border-y bg-white"><div className="flex items-center gap-4"><div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-colors ${isExpanded ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>{student.name.charAt(0)}</div><div><p className="font-black text-slate-900 uppercase text-sm mb-1.5">{student.name}</p><p className="text-[10px] font-black text-slate-400 uppercase">{student.nim}</p></div></div></td>
                      <td className="px-6 py-8 border-y bg-white">{(() => { const p = calculateProgress(student.email, selectedMeeting); return ( <div className="flex flex-col items-center gap-2 max-w-[120px] mx-auto"><div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className={`h-full transition-all duration-1000 ${p === 100 ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${p}%` }}></div></div><span className="text-[11px] font-black text-slate-500">{p}%</span></div> ); })()}</td>
                      <td className="px-6 py-8 text-center border-y border-r rounded-r-[1.5rem] bg-white"><button onClick={() => setExpandedStudent(isExpanded ? null : student.email)} className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase transition-all ${isExpanded ? "bg-slate-800 text-white" : "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105"}`}>{isExpanded ? 'Tutup' : 'Koreksi'}</button></td>
                    </tr>
                    {isExpanded && <tr className="animate-in slide-in-from-top-2 duration-300"><td colSpan={4} className="p-0 pt-2 pb-6"><div className="rounded-[2rem] overflow-hidden border-2 border-primary border-opacity-10 shadow-2xl">{renderCorrectionHub(student)}</div></td></tr>}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="p-8 md:p-12 bg-slate-50/50 border-t flex items-center justify-between"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Halaman <span className="text-primary">{currentPage}</span> Dari {totalPages}</p><div className="flex gap-2"><button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-6 py-3 bg-white border rounded-2xl font-black text-[10px] uppercase text-slate-400 disabled:opacity-0">Kembali</button><button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase disabled:opacity-0">Lanjut</button></div></div>
        )}
      </div>

      {forumActivityReport && (
        <div className="mt-10 bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden text-left">
          <div className="p-8 md:p-12 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-violet-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><span className="material-symbols-outlined">forum</span></div>
              <div><h2 className="text-xl font-black text-slate-800 tracking-tight">{forumActivityReport.label}</h2><p className="text-xs text-slate-500 font-bold uppercase mt-0.5">{forumActivityReport.rows.filter(r => r.totalActivity > 0).length} Mahasiswa Aktif</p></div>
            </div>
            <div className="bg-white/70 backdrop-blur border border-indigo-100 rounded-2xl p-4 shadow-sm text-left">
              <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-3">📋 Syarat Aktif</p>
              <div className="space-y-1">
                <div className="flex items-center gap-3"><span className="bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded w-20 text-center">Sangat Aktif</span><span className="text-indigo-600 text-[9px] font-black">≥2 Post & ≥2 Komen</span></div>
                <div className="flex items-center gap-3"><span className="bg-blue-500 text-white text-[8px] font-black px-2 py-1 rounded w-20 text-center">Aktif</span><span className="text-indigo-600 text-[9px] font-black">≥1 Post & ≥1 Komen</span></div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-10 overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3 mt-6">
              <thead><tr className="text-slate-400 text-[9px] font-black uppercase tracking-widest"><th className="px-4 py-3 text-center w-8">No</th><th className="px-4 py-3 text-left">Mahasiswa</th><th className="px-4 py-3 text-center">Kelompok</th><th className="px-4 py-3 text-center">Post</th><th className="px-4 py-3 text-center">Komen</th><th className="px-4 py-3 text-center">Status</th></tr></thead>
              <tbody>
                {forumActivityReport.rows.map((row, idx) => (
                  <tr key={row.email} className="bg-white border border-slate-100 shadow-sm rounded-3xl hover:shadow-md transition-all">
                    <td className="px-4 py-4 text-center text-slate-400 font-black text-xs border-y border-l rounded-l-2xl bg-slate-50/30">{idx + 1}</td>
                    <td className="px-4 py-4 border-y bg-white"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm shrink-0">{row.name.charAt(0)}</div><div><p className="font-black text-slate-800 text-sm leading-none">{row.name}</p><p className="text-[10px] text-slate-400 font-medium mt-0.5">{row.nim}</p></div></div></td>
                    <td className="px-4 py-4 text-center border-y bg-white"><span className="w-8 h-8 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center mx-auto">{row.groupNum}</span></td>
                    <td className="px-4 py-4 text-center border-y bg-white text-indigo-600 font-black">{row.postCount}</td>
                    <td className="px-4 py-4 text-center border-y bg-white text-violet-600 font-black">{row.commentCount}</td>
                    <td className="px-4 py-4 text-center border-y border-r rounded-r-2xl bg-white"><span className={`inline-block px-3 py-1.5 rounded-xl text-[10px] font-black ${row.badgeColor}`}>{row.badge}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
