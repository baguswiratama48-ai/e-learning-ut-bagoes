import React, { useState, useEffect, Fragment, useMemo } from "react";
import { supabase } from "../supabaseClient";
import { STUDENTS } from "../data/students";
import { CLASSES, MENUS, FEEDBACK_MESSAGES } from "../data/constants";

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

      // Fisher-Yates Shuffle
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

      await supabase.from("submissions").delete()
        .eq("student_email", "SYSTEM_GROUP").eq("class_id", activeTab).eq("meeting_num", selectedMeeting);

      await supabase.from("submissions").insert([{
        student_email: "SYSTEM_GROUP", class_id: activeTab, meeting_num: selectedMeeting,
        section_name: "GENERATED_GROUPS", content: JSON.stringify(groups)
      }]);

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
      await supabase.from("submissions").delete()
        .eq("student_email", "SYSTEM_GROUP").eq("class_id", activeTab).eq("meeting_num", selectedMeeting).eq("section_name", "GENERATED_GROUPS");
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
  // --- CALCULATORS ---
  const calculateProgress = (studentEmail, meetingNum) => {
    const isSesi2BK = (activeTab === "1" || activeTab === "2" || activeTab === "3" || activeTab === "4") && String(meetingNum) === "2";
    let requiredMenus = ["Pertanyaan Pemantik", "Ayo Diskusi (LKPD)", "Kuis dan Latihan", "Refleksi"];
    
    if (isSesi2BK) {
      requiredMenus = ["Pertanyaan Pemantik", "Ayo Diskusi (LKPD)", "Kuis dan Latihan", "Rangkuman", "Refleksi"];
    }

    const studentSubs = (submissions || []).filter(s => 
      s.student_email === studentEmail && 
      String(s.meeting_num) === String(meetingNum)
    );

    const completedCount = requiredMenus.filter(menu => 
      studentSubs.some(s => s.section_name === menu)
    ).length;

    return Math.round((completedCount / requiredMenus.length) * 100);
  };

  const totalPages = Math.ceil(studentList.length / pageSize);

  // --- RENDER HELPERS ---
  const renderCorrectionHub = (student) => {
    const studentSubs = (submissions || []).filter(s => s.student_email === student.email && String(s.meeting_num) === String(selectedMeeting));
    
    return (
      <div className="bg-slate-50 border-t-2 border-slate-200 p-6 animate-in slide-in-from-top-2 duration-300">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sub-Menu Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-4">Kategori Penilaian</p>
            {(() => {
              const isSesi2BK = (activeTab === "1" || activeTab === "2" || activeTab === "3" || activeTab === "4") && String(selectedMeeting) === "2";
              
              // Define the list of menus for this specific context
              let dynamicMenus = [...MENUS];
              if (isSesi2BK) {
                // For Sesi 2 BK, we want a specific order and items
                dynamicMenus = [
                  "Informasi Modul",
                  "Pertanyaan Pemantik",
                  "Materi Pembelajaran",
                  "Video Pembelajaran",
                  "Ayo Diskusi (LKPD)",
                  "Kuis dan Latihan",
                  "Rangkuman",
                  "Refleksi"
                ];
              }

              return dynamicMenus.map(menu => {
                const hasSub = studentSubs.find(s => s.section_name === menu);
                const hasFeedback = studentSubs.find(s => s.section_name === `TUTOR_FEEDBACK_${menu}`);
                
                let displayLabel = menu;
                if (isSesi2BK) {
                  if (menu === "Informasi Modul") displayLabel = "RAT/SAT";
                  if (menu === "Ayo Diskusi (LKPD)") displayLabel = "LKM (Lembar Kerja Mahasiswa)";
                  if (menu === "Kuis dan Latihan") displayLabel = "Quiz";
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

          {/* Correction Area */}
          <div className="flex-1 bg-white rounded-[3rem] p-8 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden transition-all duration-500">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                <span className="material-symbols-outlined text-[150px] font-thin">
                  {activeCorrectionTab.includes("Kuis") || activeCorrectionTab === "Quiz" ? 'quiz' : 
                   activeCorrectionTab === "Rangkuman" ? 'history_edu' : 
                   activeCorrectionTab === "Refleksi" ? 'psychology' : 'edit_note'}
                </span>
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                  <h4 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                    <span className="w-2 h-10 bg-primary rounded-full shadow-sm shadow-primary/40"></span>
                    {(() => {
                        const isSpecialSesi2 = (activeTab === "1" || activeTab === "2" || activeTab === "3" || activeTab === "4") && String(selectedMeeting) === "2";
                        if (isSpecialSesi2) {
                          if (activeCorrectionTab === "Informasi Modul") return "RAT/SAT";
                          if (activeCorrectionTab === "Ayo Diskusi (LKPD)") return "LKM (Lembar Kerja Mahasiswa)";
                          if (activeCorrectionTab === "Kuis dan Latihan") return "Quiz";
                        }
                        return activeCorrectionTab;
                    })()}
                  </h4>
                  <div className="hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">person</span>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{student.name}</p>
                  </div>
                </div>

                {(() => {
                  const sub = studentSubs.find(s => s.section_name === activeCorrectionTab);
                  const feedback = studentSubs.find(s => s.section_name === `TUTOR_FEEDBACK_${activeCorrectionTab}`);
                  const curStars = feedback ? parseInt(feedback.content) : 0;

                  if (!sub) return (
                    <div className="py-24 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-slate-200 shadow-inner">
                        <span className="material-symbols-outlined text-slate-300 text-4xl">history_edu</span>
                      </div>
                      <p className="text-slate-400 font-bold italic tracking-tight">Belum ada pengiriman dari mahasiswa.</p>
                      <p className="text-[10px] text-slate-300 uppercase font-black mt-2 tracking-widest">Awaiting Submission</p>
                    </div>
                  );

                  return (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       {/* Content Display Card */}
                       <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-inner relative">
                          <div className="absolute top-6 right-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Submitted Content</div>
                          
                          <div className="text-slate-700 leading-[1.8] font-medium text-base md:text-lg">
                            {(activeCorrectionTab === "Kuis dan Latihan" || activeCorrectionTab === "Quiz") ? (
                              <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-slate-50">
                                <div className="w-28 h-28 bg-gradient-to-br from-primary to-indigo-900 rounded-[2rem] flex flex-col items-center justify-center text-white shadow-xl shadow-primary/20">
                                  <span className="text-4xl font-black">{sub.content.match(/SKOR AKHIR: (\d+)/)?.[1] || "0"}</span>
                                  <span className="text-xs font-bold opacity-60">/ 100</span>
                                </div>
                                <div className="text-center md:text-left">
                                  <p className="text-xl font-black text-slate-800 mb-2">Evaluasi Quiz Otomatis</p>
                                  <p className="text-slate-500 leading-relaxed max-w-sm">
                                    {sub.content.split('\n')[1] || "Mahasiswa telah menyelesaikan seluruh rangkaian soal dengan hasil di atas."}
                                  </p>
                                </div>
                              </div>
                            ) : activeCorrectionTab === "Pertanyaan Pemantik" || activeCorrectionTab === "Refleksi" ? (
                              <div className="grid gap-8">
                                {sub.content.split(/\n\n(?=Pertanyaan \d+:)/).map((block, bidx) => {
                                  const parts = block.split('\nJawaban: ');
                                  const qPart = parts[0] || bidx + 1;
                                  const aPart = parts[1] || "-";
                                  return (
                                    <div key={bidx} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                                      {/* QUESTION SECTION */}
                                      <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100">
                                        <div className="flex items-center gap-2 mb-3">
                                           <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                           <p className="text-[9px] font-black text-primary/60 uppercase tracking-[0.2em]">Pertanyaan Tutor</p>
                                        </div>
                                        <p className="font-black text-slate-800 leading-snug text-sm md:text-base">{qPart.replace(/^Pertanyaan \d+: /, "")}</p>
                                      </div>
                                      
                                      {/* ANSWER SECTION */}
                                      <div className="p-6 md:p-8 bg-white relative">
                                         <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em]">Jawaban Mahasiswa</p>
                                         </div>
                                         <div className="text-slate-600 font-medium leading-[1.8] text-sm md:text-base text-left">
                                            {aPart}
                                         </div>
                                         <div className="absolute bottom-4 right-6 opacity-[0.05]">
                                            <span className="material-symbols-outlined text-[40px]">format_quote</span>
                                         </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : activeCorrectionTab === "Rangkuman" ? (
                              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-lg shadow-primary/5">
                                <div className="flex items-center gap-4 mb-8">
                                   <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                                      <span className="material-symbols-outlined">auto_stories</span>
                                   </div>
                                   <div>
                                      <p className="text-xl font-black text-slate-800 leading-none mb-1">Jurnal Sintesis Terpandu</p>
                                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{sub.content.match(/TOTAL KATA: (\d+)/)?.[0] || "Summary Report"}</p>
                                   </div>
                                </div>
                                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium font-serif border-l-4 border-emerald-100 pl-8 ml-2 text-sm md:text-base">
                                  {sub.content.replace(/\[RANGKUMAN MODUL PENGGANTI TEST\]\n/, "")}
                                </div>
                              </div>
                            ) : sub.content.includes("Jawaban:") ? (
                              <div className="grid gap-8">
                                {sub.content.split(/\n\n(?=Soal \d+:)/).map((block, bidx) => {
                                  const parts = block.split(/\n\nJawaban:\n|\nJawaban:\n|\nJawaban: /);
                                  const qPart = parts[0] || bidx + 1;
                                  const aPart = parts[1] || "-";
                                  return (
                                    <div key={bidx} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                                      <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100">
                                        <div className="flex items-center gap-2 mb-3">
                                           <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                           <p className="text-[9px] font-black text-primary/60 uppercase tracking-[0.2em]">Pertanyaan / Instruksi</p>
                                        </div>
                                        <p className="font-black text-slate-800 leading-snug text-sm md:text-base">{qPart.replace(/^Soal \d+: /, "")}</p>
                                      </div>
                                      <div className="p-6 md:p-8 bg-white relative">
                                         <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em]">Jawaban Mahasiswa</p>
                                         </div>
                                         <div className="text-slate-600 font-medium leading-[1.8] text-sm md:text-base text-left">
                                            {aPart}
                                         </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm font-medium leading-[2] whitespace-pre-wrap text-slate-800 text-sm md:text-base text-left">
                                {sub.content}
                              </div>
                            )}
                          </div>
                       </div>

                       {/* Grading & Feedback Area */}
                       <div className="pt-10 mt-10 border-t border-slate-100 bg-white sticky bottom-0 z-10 py-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="max-w-xs">
                              <h5 className="font-black text-slate-900 text-lg mb-1 tracking-tight">Validasi & Penilaian</h5>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">Pilih Bintang & Berikan Apresiasi</p>
                            </div>
                            <div className="flex gap-3 bg-slate-50 p-3 rounded-[2rem] border border-slate-100 shadow-inner">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  onClick={() => handleStarFeedback(student.email, activeTab, selectedMeeting, activeCorrectionTab, star)}
                                  className={`w-14 h-14 rounded-2xl transition-all duration-300 flex items-center justify-center ${star <= curStars ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-xl shadow-yellow-400/30 scale-105 active:scale-95" : "bg-white text-slate-200 hover:text-slate-300 hover:scale-105"}`}
                                >
                                  <span className="material-symbols-outlined fill-1 text-[28px]">star</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {curStars > 0 && (
                            <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 md:p-8 rounded-3xl flex items-center gap-6 animate-in slide-in-from-left-4 duration-500">
                              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-emerald-200/50 shadow-lg text-emerald-500 shrink-0 border border-emerald-50">
                                <span className="material-symbols-outlined text-4xl">verified</span>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2 leading-none">Apresiasi Tutor Otomatis:</p>
                                <p className="text-lg font-black text-slate-800 font-italic tracking-tight leading-snug">"{FEEDBACK_MESSAGES[curStars]}"</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-8">
                             <div className="flex items-center gap-2 text-slate-300">
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                                <span className="text-[9px] font-black tracking-widest uppercase">Safe & Encrypted</span>
                             </div>
                             <button
                               onClick={() => handleUnlock(student.email, activeCorrectionTab)}
                               className="text-[10px] font-black text-red-400 hover:text-white hover:bg-red-500 border border-transparent hover:border-red-500 px-4 py-2 rounded-xl uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                             >
                               <span className="material-symbols-outlined text-sm">lock_open</span> Reset Jawaban
                             </button>
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
      {/* HEADER SECTION */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Pusat Kendali Tutor</h1>
           <p className="text-slate-500 font-medium italic">Kelola kelas, acak kelompok, dan berikan penilaian real-time.</p>
        </div>
        <button onClick={fetchData} className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-black text-slate-600 hover:text-primary transition-all flex items-center gap-2 shadow-sm">
           <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>refresh</span> Refresh Data
        </button>
      </div>

      {/* SESSION HUB */}
      <div className="mb-10 overflow-x-auto pb-4 custom-scrollbar">
         <div className="flex gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <button
                key={num}
                onClick={() => setSelectedMeeting(String(num))}
                className={`flex-shrink-0 w-36 p-5 rounded-3xl border-2 transition-all text-center ${selectedMeeting === String(num) ? "bg-primary border-primary text-white shadow-xl shadow-primary shadow-opacity-20 scale-105" : "bg-white border-white text-slate-400 hover:border-slate-200"}`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Pertemuan</p>
                <p className="text-3xl font-black leading-none">{num}</p>
              </button>
            ))}
         </div>
      </div>

      {/* CLASS SELECTION GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {CLASSES.map((cls) => {
          const studentCount = STUDENTS.filter(
            (s) => s.classId === cls.id && s.email !== "demo@ecampus.ut.ac.id"
          ).length;
          const isActive = activeTab === cls.id;

          return (
            <button
              key={cls.id}
              onClick={() => setActiveTab(cls.id)}
              className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-between overflow-hidden ${
                isActive
                  ? "bg-white border-primary shadow-xl shadow-primary/10"
                  : "bg-white border-white hover:border-slate-200 text-slate-400"
              }`}
            >
              <div className="flex items-center gap-4 text-left relative z-10">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    isActive ? "bg-primary text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    school
                  </span>
                </div>
                <div>
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      isActive ? "text-primary/60" : "text-slate-400"
                    }`}
                  >
                    {cls.title.split("|")[0].trim()}
                  </p>
                  <h4
                    className={`font-black text-sm md:text-base leading-tight ${
                      isActive ? "text-slate-800" : "text-slate-500"
                    }`}
                  >
                    {cls.title.split("|")[1]?.trim() || cls.title}
                  </h4>
                </div>
              </div>

              <div className="text-right relative z-10">
                <p
                  className={`text-xl font-black ${
                    isActive ? "text-primary" : "text-slate-300"
                  }`}
                >
                  {studentCount}
                </p>
                <p className="text-[8px] font-black uppercase tracking-tighter opacity-60">
                  Mahasiswa
                </p>
              </div>

              {isActive && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* GROUP GENERATOR CARD */}
      {activeTab !== "demo" && (
        <div className="mb-10 bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary bg-opacity-20 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-white bg-opacity-10 rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white border-opacity-10">
                    <span className="material-symbols-outlined text-4xl text-yellow-400">casino</span>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black mb-1 tracking-tight">Generator Kelompok Sesi {selectedMeeting}</h3>
                    <p className="text-white text-opacity-50 text-sm font-medium">Acak daftar mahasiswa secara otomatis per pertemuan.</p>
                 </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 bg-white bg-opacity-5 p-3 rounded-[2rem] border border-white border-opacity-10 backdrop-blur-md">
                 <div className="px-6 border-r border-white border-opacity-10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Target Kelompok</p>
                    <input type="number" value={groupCount} onChange={e => setGroupCount(parseInt(e.target.value))} className="bg-transparent text-xl font-black text-center w-12 outline-none" />
                 </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button onClick={handleGenerateGroups} disabled={generating} className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-2xl font-black text-sm hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400 shadow-opacity-20 disabled:opacity-50">
                       {generating ? 'ACAK...' : 'ACAK SEKARANG'}
                    </button>
                    {(() => {
                        const groupRow = (submissions || []).find(s => s.student_email === "SYSTEM_GROUP" && s.section_name === "GENERATED_GROUPS" && String(s.meeting_num) === String(selectedMeeting));
                        if (!groupRow) return null;
                        return (
                          <button 
                            onClick={() => setShowGroupPreview(!showGroupPreview)}
                            className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-sm transition-all border-2 ${showGroupPreview ? "bg-white text-primary border-primary" : "bg-white/10 text-white border-white/10 hover:bg-white/20"}`}
                          >
                            <span className="material-symbols-outlined">{showGroupPreview ? 'visibility_off' : 'visibility'}</span>
                            {showGroupPreview ? 'Sembunyikan Kelompok' : 'Lihat Kelompok'}
                          </button>
                        );
                    })()}
                    <button onClick={handleResetGroups} className="w-14 h-14 bg-red-500 bg-opacity-20 text-red-400 border border-red-500 border-opacity-20 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                       <span className="material-symbols-outlined">delete_sweep</span>
                    </button>
                  </div>
              </div>
           </div>
        </div>
      )}
      {/* GROUP VISUALIZATION CARD */}
      {showGroupPreview && (() => {
        const groupRow = (submissions || []).find(s => s.student_email === "SYSTEM_GROUP" && s.section_name === "GENERATED_GROUPS" && String(s.meeting_num) === String(selectedMeeting));
        const groups = groupRow ? JSON.parse(groupRow.content) : null;
        if (!groups) return null;

        return (
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex items-center gap-3 mb-6 px-4">
                <span className="material-symbols-outlined text-primary">diversity_3</span>
                <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Daftar Kelompok Aktif — Sesi {selectedMeeting}</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {groups.map((group, gidx) => (
                  <div key={gidx} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col">
                     <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/20">
                           {group.group_num}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kelompok {group.group_num}</span>
                     </div>
                     <div className="space-y-3 flex-1">
                        {group.members.map((member, midx) => (
                          <div key={midx} className={`flex items-center justify-between p-3 rounded-xl border ${member.isLeader ? 'bg-amber-50 border-amber-200 ring-1 ring-amber-400/20' : 'bg-slate-50 border-slate-100'}`}>
                             <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${member.isLeader ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                   {midx + 1}
                                </div>
                                <span className="text-[11px] font-bold text-slate-700 truncate">{member.name}</span>
                             </div>
                             {member.isLeader ? (
                               <span className="bg-amber-400 text-[8px] font-black text-white px-2 py-0.5 rounded-full shadow-sm animate-pulse">KETUA</span>
                             ) : (
                               <span className="bg-slate-200 text-[8px] font-black text-slate-500 px-2 py-0.5 rounded-full border border-slate-300">ANGGOTA</span>
                             )}
                          </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      })()}

      {/* MAIN MONITORING CARD */}
      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
        {/* Table Controls */}
        <div className="p-8 md:p-12 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-2xl flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined">groups</span>
              </div>
              <div>
                 <h2 className="text-2xl font-black text-slate-800 tracking-tight">Daftar Mahasiswa</h2>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{studentList.length} Mahasiswa Terdaftar</p>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="relative">
                 <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                 <input type="text" placeholder="Cari Nama / NIM..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold w-full md:w-80 focus:bg-white focus:border-primary outline-none transition-all" />
              </div>
              <select value={pageSize} onChange={e => setPageSize(parseInt(e.target.value))} className="bg-slate-50 border border-slate-100 px-4 py-3.5 rounded-2xl text-xs font-black text-slate-500 outline-none cursor-pointer">
                 {[10, 20, 50].map(s => <option key={s} value={s}>{s} Baris</option>)}
              </select>
           </div>
        </div>        {/* Table Content */}
        <div className="px-8 pb-12 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-6 py-4 text-center w-20">No</th>
                <th className="px-6 py-4 text-left">Informasi Mahasiswa</th>
                <th className="px-6 py-4 text-center">Progress (Sesi {selectedMeeting})</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student, idx) => {
                const studentSubsAtMeeting = (submissions || []).filter(s => s.student_email === student.email && String(s.meeting_num) === String(selectedMeeting));
                const subCount = studentSubsAtMeeting.filter(s => !s.section_name.startsWith('TUTOR_FEEDBACK_')).length;
                const evaluatedCount = studentSubsAtMeeting.filter(s => s.section_name.startsWith('TUTOR_FEEDBACK_')).length;
                const isExpanded = expandedStudent === student.email;

                return (
                  <Fragment key={student.email}>
                    <tr className={`group transition-all bg-white border border-slate-200 rounded-3xl ${isExpanded ? 'ring-2 ring-primary ring-opacity-10 shadow-lg' : 'hover:shadow-md hover:border-slate-300 shadow-sm'}`}>
                      <td className="px-6 py-8 text-center text-slate-400 font-black text-sm border-y border-l rounded-l-[1.5rem] bg-slate-50/30">
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      <td className="px-6 py-8 border-y bg-white">
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm transition-colors ${isExpanded ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white'}`}>
                              {student.name.charAt(0)}
                           </div>
                           <div>
                              <p className="font-black text-slate-900 uppercase text-sm leading-none mb-1.5">{student.name}</p>
                              <p className="text-[10px] font-black text-slate-400 tracking-tighter uppercase">{student.nim} — {student.email}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-8 border-y bg-white">
                        {(() => {
                           const progress = calculateProgress(student.email, selectedMeeting);
                           return (
                             <div className="flex flex-col items-center gap-2 max-w-[120px] mx-auto">
                               <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                                  <div 
                                    className={`h-full transition-all duration-1000 ${progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-primary' : 'bg-amber-400'}`}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                               </div>
                               <span className={`text-[11px] font-black ${progress === 100 ? 'text-emerald-600' : 'text-slate-500'}`}>{progress}% Selesai</span>
                             </div>
                           );
                        })()}
                      </td>
                      <td className="px-6 py-8 text-center border-y border-r rounded-r-[1.5rem] bg-white">
                        <button
                          onClick={() => setExpandedStudent(isExpanded ? null : student.email)}
                          className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isExpanded ? "bg-slate-800 text-white" : "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"}`}
                        >
                          {isExpanded ? 'Tutup Panel' : 'Koreksi Jawaban'}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="animate-in slide-in-from-top-2 duration-300">
                        <td colSpan={4} className="p-0 pt-2 pb-6">
                          <div className="rounded-[2rem] overflow-hidden border-2 border-primary border-opacity-10 shadow-2xl">
                             {renderCorrectionHub(student)}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-8 md:p-12 bg-slate-50/50 border-t flex items-center justify-between">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Halaman <span className="text-primary">{currentPage}</span> Dari {totalPages}</p>
             <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-6 py-3 bg-white border rounded-2xl font-black text-[10px] uppercase text-slate-400 hover:text-primary transition-all disabled:opacity-0">Kembali</button>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-black transition-all disabled:opacity-0">Selanjutnya</button>
             </div>
          </div>
        )}
    </div>
  );
};
