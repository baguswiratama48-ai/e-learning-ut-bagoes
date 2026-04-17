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
  const [activeTab, setActiveTab] = useState("1"); // Default to Kelas 8B
  const [selectedMeeting, setSelectedMeeting] = useState("1");
  const [groupCount, setGroupCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [unlocking, setUnlocking] = useState(null);
  const [activeCorrectionTab, setActiveCorrectionTab] = useState(MENUS[0]);
  const [showGroupPreview, setShowGroupPreview] = useState(false);

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

      const shuffled = [...classStudents].sort(() => Math.random() - 0.5);
      const groups = Array.from({ length: groupCount }, (_, i) => ({ group_num: i + 1, members: [] }));

      shuffled.forEach((student, index) => {
        const groupIndex = index % groupCount;
        groups[groupIndex].members.push({
          nim: student.nim, name: student.name, email: student.email,
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
            {MENUS.map(menu => {
              const hasSub = studentSubs.find(s => s.section_name === menu);
              const hasFeedback = studentSubs.find(s => s.section_name === `TUTOR_FEEDBACK_${menu}`);
              return (
                <button
                  key={menu}
                  onClick={() => setActiveCorrectionTab(menu)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between group ${activeCorrectionTab === menu ? "bg-primary text-white shadow-lg shadow-primary shadow-opacity-20" : "bg-white text-slate-500 hover:bg-slate-100"}`}
                >
                  <span className="truncate">{menu}</span>
                  <div className="flex items-center gap-1">
                    {hasSub && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-white"></span>}
                    {hasFeedback && <span className="material-symbols-outlined text-[14px] text-emerald-400 group-hover:text-white">verified</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Correction Area */}
          <div className="flex-1 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="material-symbols-outlined text-[120px]">{activeCorrectionTab === "Kuis dan Latihan" ? 'quiz' : 'edit_note'}</span>
             </div>
             
             <div className="relative z-10">
                <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-primary rounded-full"></span>
                  {activeCorrectionTab}
                </h4>

                {(() => {
                  const sub = studentSubs.find(s => s.section_name === activeCorrectionTab);
                  const feedback = studentSubs.find(s => s.section_name === `TUTOR_FEEDBACK_${activeCorrectionTab}`);
                  const curStars = feedback ? parseInt(feedback.content) : 0;

                  if (!sub) return (
                    <div className="py-20 text-center">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-200">
                        <span className="material-symbols-outlined text-slate-300">history_edu</span>
                      </div>
                      <p className="text-slate-400 font-bold italic">Mahasiswa belum mengirimkan tugas untuk bagian ini.</p>
                    </div>
                  );

                  return (
                    <div className="space-y-8">
                       {/* Content Display */}
                       <div className="bg-slate-50 rounded-3xl p-6 md:p-10 border border-slate-100">
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Jawaban Mahasiswa:</p>
                          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium text-sm">
                            {activeCorrectionTab === "Kuis dan Latihan" ? (
                              <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200">
                                <div className="w-20 h-20 bg-primary rounded-2xl flex flex-col items-center justify-center text-white">
                                  <span className="text-2xl font-black">{sub.content.match(/SKOR AKHIR: (\d+)/)?.[1] || "0"}</span>
                                  <span className="text-[10px] opacity-70">/ 100</span>
                                </div>
                                <div>
                                  <p className="font-bold text-slate-800 mb-1">Hasil Kuis Otomatis</p>
                                  <p className="text-sm text-slate-500">{sub.content.split('\n')[1]}</p>
                                </div>
                              </div>
                            ) : activeCorrectionTab === "Pertanyaan Pemantik" ? (
                              <div className="space-y-4">
                                {sub.content.split(/\n\n(?=Pertanyaan \d+:)/).map((block, bidx) => (
                                  <div key={bidx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Butir {bidx + 1}</p>
                                    <p className="text-sm font-bold text-slate-800 mb-3 leading-snug">{block.split('\nJawaban: ')[0]}</p>
                                    <div className="pl-4 border-l-4 border-primary">
                                       <p className="text-sm text-slate-600 italic">"{block.split('\nJawaban: ')[1] || "-"}"</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="whitespace-pre-wrap">{sub.content}</div>
                            )}
                          </div>
                       </div>

                       {/* Grading Area */}
                       <div className="border-t pt-8">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <p className="font-black text-slate-800 mb-1">Beri Penilaian (Bintang)</p>
                              <p className="text-xs text-slate-400 font-medium">Nilai akan langsung tersimpan dan terlihat oleh mahasiswa.</p>
                            </div>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  onClick={() => handleStarFeedback(student.email, activeTab, selectedMeeting, activeCorrectionTab, star)}
                                  className={`w-12 h-12 rounded-xl transition-all ${star <= curStars ? "bg-yellow-400 text-white shadow-lg shadow-yellow-400 shadow-opacity-30" : "bg-slate-100 text-slate-300 hover:bg-slate-200"}`}
                                >
                                  <span className="material-symbols-outlined fill-1">star</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          {curStars > 0 && (
                            <div className="mt-6 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3">
                              <span className="material-symbols-outlined text-emerald-500">info</span>
                              <div>
                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Feedback Otomatis:</p>
                                <p className="text-sm font-bold text-emerald-700 leading-tight">"{FEEDBACK_MESSAGES[curStars]}"</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-10 flex justify-end">
                             <button
                               onClick={() => handleUnlock(student.email, activeCorrectionTab)}
                               className="text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1"
                             >
                               <span className="material-symbols-outlined text-sm">lock_open</span> Buka Kunci (Reset Jawaban)
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

      {/* CLASS TABS */}
      <div className="flex flex-wrap gap-3 mb-8">
        {CLASSES.map(cls => (
          <button
            key={cls.id}
            onClick={() => setActiveTab(cls.id)}
            className={`px-6 py-3 rounded-2xl font-black text-sm transition-all border-2 ${activeTab === cls.id ? "bg-white border-primary text-primary shadow-md" : "bg-white border-white text-slate-400 hover:border-slate-200"}`}
          >
            {cls.title.split('|')[1]?.trim() || cls.title}
          </button>
        ))}
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
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black ${member.isLeader ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                   {member.name.charAt(0)}
                                </div>
                                <span className="text-[11px] font-bold text-slate-700 truncate">{member.name}</span>
                             </div>
                             {member.isLeader && (
                               <span className="bg-amber-400 text-[8px] font-black text-white px-2 py-0.5 rounded-full shadow-sm animate-pulse">KETUA</span>
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
                      <td className="px-6 py-8 text-center border-y bg-white">
                        <div className="flex items-center justify-center gap-3">
                           <span className="px-4 py-1.5 bg-primary bg-opacity-5 text-primary rounded-xl text-[10px] font-black uppercase ring-1 ring-primary ring-opacity-10">
                              {subCount} Dikirim
                           </span>
                           <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-sm ${evaluatedCount === subCount && subCount > 0 ? 'bg-emerald-500 text-white' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                              {evaluatedCount} / {subCount} Dinilai
                           </span>
                        </div>
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
    </div>
  );
};
