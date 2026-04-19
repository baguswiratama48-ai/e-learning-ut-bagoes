import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { STUDENTS } from '../data/students';

const MISSIONS = [
  {
    id: 1,
    title: "The Foundation",
    subtitle: "Misi 01: Hakikat Belajar & Pembelajaran",
    icon: "account_balance",
    description: "Tentukan garis dasar pemahaman Anda. Bedakan antara Belajar dan Pembelajaran, serta identifikasi 6 Prinsip Utama yang menggerakkannya.",
    tasks: [
      { id: '1a', q: "Manakah yang merupakan ciri utama 'Belajar'?", options: ["Proses perubahan perilaku permanen", "Proses yang dirancang oleh guru", "Kondisi aktif di dalam kelas"], correct: 0 },
      { id: '1b', q: "Guru berperan sebagai fasilitator adalah ciri dari...", options: ["Belajar", "Pembelajaran", "Kurikulum"], correct: 1 },
      { id: '1c', q: "Prinsip yang menekankan siswa belajar lebih baik melalui praktikum IPA adalah...", options: ["Prinsip Perhatian", "Prinsip Motivasi", "Prinsip Pengalaman Langsung"], correct: 2 }
    ]
  },
  {
    id: 2,
    title: "The Hierarchy",
    subtitle: "Misi 02: Membedah S/P/M/T",
    icon: "layers",
    description: "Seorang arsitek pembelajaran harus tahu urutan alatnya. Susunlah hierarki pembelajaran dari yang paling umum ke yang paling operasional.",
    tasks: [
      { id: '2a', q: "Urutan Hierarki yang Benar adalah:", options: ["Strategi > Metode > Teknik > Pendekatan", "Pendekatan > Strategi > Metode > Teknik", "Metode > Teknik > Strategi > Pendekatan"], correct: 1 },
      { id: '2b', q: "Konstruktivisme dan Saintifik adalah contoh dari...", options: ["Pendekatan", "Strategi", "Teknik"], correct: 0 }
    ]
  },
  {
    id: 3,
    title: "The Analyst",
    subtitle: "Misi 03: Penentu Strategi",
    icon: "troubleshoot",
    description: "Analisis situasi kelas Anda. Faktor apa saja yang harus dipertimbangkan sebelum memutuskan strategi yang akan digunakan?",
    questions: [
      "Bagaimanakah karakteristik siswa SD memengaruhi pemilihan strategi Anda?",
      "Kenapa ketersediaan sarana (proyektor/alat peraga) bisa mengubah total strategi yang sudah dirancang?"
    ]
  },
  {
    id: 4,
    title: "The Designer",
    subtitle: "Misi 04: Rancang Misi",
    icon: "architecture",
    description: "Misi Terakhir: Rancanglah alur pembelajaran singkat menggunakan Strategi Project Based Learning (PjBL) untuk topik 'Lingkungan Bersih'.",
    prompts: [
      "Langkah 1: Pertanyaan Mendasar (Siswa mengamati apa?)",
      "Langkah 2: Perancangan Proyek (Produk apa yang dibuat?)",
      "Langkah 3: Jadwal & Monitoring",
      "Langkah 4: Menguji Hasil & Evaluasi"
    ]
  }
];

export const LkpdClass5A = ({
  user,
  meetingId,
  submissions: initialSubmissions,
  onComplete,
  loading: parentLoading
}) => {
  const [activeTab, setActiveTab] = useState("MY_LKM"); // MY_LKM, FORUM, GRAFIK
  const [currentStage, setCurrentStage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'success', 'error'
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Forum Logic States (Real-time update)
  const [commentInputs, setCommentInputs] = useState({});
  const [loadingAction, setLoadingAction] = useState({ type: null, id: null });
  const [localNewPosts, setLocalNewPosts] = useState([]);
  const [localNewComments, setLocalNewComments] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);

  const STORAGE_KEY = `lkpd_5a_draft_${user.email}_${meetingId}`;

  // Success Notification Helper
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // 1. Get Group Info
  const groupRow = (initialSubmissions || []).find(
    (s) => s.student_email === "SYSTEM_GROUP" && String(s.meeting_num) === String(meetingId) && String(s.class_id) === "4"
  );
  const allGroups = groupRow ? JSON.parse(groupRow.content) : [];
  const myGroup = allGroups.find(g => g.members.some(m => m.email === user.email));
  const activeGroupNum = myGroup ? myGroup.group_num : 1;

  // 2. Load Draft
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setCurrentStage(parsed.stage || 1);
      } catch (e) { console.error(e); }
    }
  }, [meetingId]);

  // 3. Save Draft Locally
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, stage: currentStage }));
  }, [answers, currentStage]);

  // --- FORUM DATA HANDLING ---
  const allForumPosts = useMemo(() => {
    const fromServer = (initialSubmissions || [])
      .filter(s => s.section_name === "LKM_5A_FORUM_POST")
      .map(p => { try { return { ...p, parsed: JSON.parse(p.content) }; } catch(e) { return {...p, parsed: {}};} });
    const combined = [...localNewPosts, ...fromServer];
    const seen = new Set();
    return combined.filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true; })
      .sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  }, [initialSubmissions, localNewPosts]);

  const allComments = useMemo(() => {
    const fromServer = (initialSubmissions || [])
      .filter(s => s.section_name === "LKM_5A_COMMENT")
      .map(c => { try { return { ...c, parsed: JSON.parse(c.content) }; } catch(e) { return {...c, parsed: {targetId: null, comment: ""}};} });
    const combined = [...fromServer, ...localNewComments];
    const seen = new Set();
    return combined.filter(c => { if (seen.has(c.id)) return false; seen.add(c.id); return true; })
      .sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
  }, [initialSubmissions, localNewComments]);

  // Personal Stats Calculation
  const myStats = useMemo(() => {
    const myPosts = allForumPosts.filter(p => p.student_email === user.email).length;
    const myComments = allComments.filter(c => c.student_email === user.email).length;
    const total = myPosts + myComments;

    let badge, badgeColor, badgeDesc;
    if (myPosts >= 2 && myComments >= 2) {
      badge = "Sangat Aktif";  badgeColor = "bg-emerald-500 text-white"; badgeDesc = "Strategist Sejati! Pertahankan kontribusimu.";
    } else if (myPosts >= 1 && myComments >= 1) {
      badge = "Aktif";         badgeColor = "bg-blue-500 text-white";    badgeDesc = "Bagus! Teruslah berbagi ide strategi.";
    } else if (total >= 1) {
      badge = "Cukup Aktif";   badgeColor = "bg-amber-400 text-slate-900";badgeDesc = "Sedikit lagi untuk menjadi mahasiwa aktif.";
    } else {
      badge = "Pasif";         badgeColor = "bg-rose-100 text-rose-600"; badgeDesc = "Ayo mulai bagikan idemu di forum!";
    }
    return { myPosts, myComments, total, badge, badgeColor, badgeDesc };
  }, [allForumPosts, allComments, user.email]);

  const getStudentProfile = (email) => {
    const st = STUDENTS.find(s => s.email === email);
    if (st) return { name: st.name, nim: st.nim };
    return { name: email.split('@')[0], nim: "N/A" };
  };

  // --- ACTIONS ---
  const handleShareToForum = async (stageId, text) => {
     if(!text || text.trim().length < 5) return;
     setLoadingAction({ type: 'share', id: stageId });
     try {
         const parsedContent = { 
             stageId, 
             title: MISSIONS.find(m => m.id === currentStage)?.title || "Explorer Mission",
             text: text,
             groupNum: activeGroupNum
         };
         const payload = {
            student_email: user.email,
            class_id: "4",
            meeting_num: String(meetingId),
            section_name: "LKM_5A_FORUM_POST",
            content: JSON.stringify(parsedContent)
         };
         const { data } = await supabase.from("submissions").insert([payload]).select();

         const newPost = data?.[0] ?? {
           id: `local_${Date.now()}`,
           student_email: user.email,
           created_at: new Date().toISOString(),
           section_name: "LKM_5A_FORUM_POST",
         };
         setLocalNewPosts(prev => [{ ...newPost, parsed: parsedContent }, ...prev]);
         showSuccess('✅ Jawaban berhasil dibagikan ke forum!');
         setActiveTab('FORUM');
     } catch (err) {
         console.error(err);
         alert('Gagal membagikan.');
     }
     setLoadingAction({ type: null, id: null });
  };

  const handleAddComment = async (targetId) => {
     const commentInput = commentInputs[targetId];
     if(!commentInput || commentInput.trim().length === 0) return;
     setLoadingAction({ type: 'comment', id: targetId });
     try {
         const parsedContent = { targetId, comment: commentInput };
         const payload = {
            student_email: user.email,
            class_id: "4",
            meeting_num: String(meetingId),
            section_name: "LKM_5A_COMMENT",
            content: JSON.stringify(parsedContent)
         };
         const { data } = await supabase.from("submissions").insert([payload]).select();

         const newComment = data?.[0] ?? {
           id: `local_${Date.now()}`,
           student_email: user.email,
           created_at: new Date().toISOString(),
           section_name: "LKM_5A_COMMENT",
         };
         setLocalNewComments(prev => [...prev, { ...newComment, parsed: parsedContent }]);
         setCommentInputs(prev => ({...prev, [targetId]: ""}));
         showSuccess('💬 Komentar berhasil dikirim!');
     } catch (err) {
         console.error(err);
         alert("Gagal mengirim komentar.");
     }
     setLoadingAction({ type: null, id: null });
  };

  const handleFinalSubmit = async (stage) => {
    setIsSubmitting(true);
    setSaveStatus('saving');

    const payload = {
      student_email: user.email,
      class_id: "4",
      meeting_num: String(meetingId),
      section_name: `LKPD_5A_STAGE_${stage}`,
      content: JSON.stringify({
        groupNum: activeGroupNum,
        answers: answers,
        completedAt: new Date().toISOString(),
        authorName: user.name || user.email.split('@')[0]
      })
    };

    try {
      const { error } = await supabase.from('submissions').insert([payload]);
      if (error) throw error;
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
      
      if (stage < 4) {
        setCurrentStage(stage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setShowCelebration(true);
        if (onComplete) onComplete(JSON.stringify(answers));
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
      alert("Gagal menyimpan ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDERING ---
  if (!groupRow) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 p-12 rounded-[3.5rem] text-center mt-10">
         <span className="material-symbols-outlined text-6xl text-teal-200 mb-4 animate-pulse">group_work</span>
         <h3 className="font-black text-2xl text-slate-800 mb-2 tracking-tight">Menunggu Pembagian Tim</h3>
         <p className="text-slate-500 font-medium text-sm max-w-sm mx-auto leading-relaxed">Harap tunggu Tutor membagi kelompok untuk Modul Strategi Pembelajaran ini sebelum memulai Misi Explorer.</p>
      </div>
    );
  }

  if (showCelebration) {
    return (
      <div className="bg-teal-600 rounded-[3.5rem] p-12 text-white text-center shadow-2xl animate-in fade-in zoom-in duration-700">
         <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <span className="material-symbols-outlined text-6xl">military_tech</span>
         </div>
         <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase">MISSION ACCOMPLISHED!</h1>
         <p className="text-teal-50 text-xl font-medium mb-10">Selamat! Anda telah mendapatkan gelar <span className="text-yellow-400 font-black">MASTER OF STRATEGY EXPLORER</span>.</p>
         <button  onClick={() => setShowCelebration(false)}  className="mt-12 bg-white text-teal-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors">LIHAT PROGRESS FORUM</button>
      </div>
    );
  }

  const currentMission = MISSIONS.find(m => m.id === currentStage);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20 relative">
      
      {/* Toast Notifikasi Sukses */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-4 duration-300 border border-white/10">
          <p className="font-bold text-sm">{successMsg}</p>
        </div>
      )}

      {/* HEADER UTAMA */}
      <div className="bg-gradient-to-br from-teal-900 to-emerald-900 text-white p-8 md:p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl mt-10">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
           <span className="material-symbols-outlined text-[150px]">architecture</span>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
             <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <span className="material-symbols-outlined text-yellow-400">military_tech</span>
                <span className="text-xs font-black uppercase tracking-widest">Tim Strategi {activeGroupNum}</span>
             </div>
             
             {/* Tab Navigation */}
             <div className="flex bg-black/20 rounded-2xl p-1.5 backdrop-blur-md border border-white/5">
                <button onClick={() => setActiveTab("MY_LKM")} className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === "MY_LKM" ? "bg-white text-teal-900 shadow-xl" : "text-teal-100/50 hover:text-white"}`}>LKM SAYA (DRAFT)</button>
                <button onClick={() => setActiveTab("FORUM")} className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === "FORUM" ? "bg-white text-teal-900 shadow-xl" : "text-teal-100/50 hover:text-white"}`}>FORUM DISKUSI <span className="bg-teal-500 text-white px-1.5 py-0.5 rounded text-[8px]">{allForumPosts.length}</span></button>
                <button onClick={() => setActiveTab("GRAFIK")} className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === "GRAFIK" ? "bg-white text-teal-900 shadow-xl" : "text-teal-100/50 hover:text-white"}`}>📊 GRAFIK SAYA</button>
             </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none mb-2">Modul Strategi Pembelajaran</h2>
          <p className="text-teal-100/70 text-sm font-medium">
             {activeTab === "MY_LKM" ? `Misi #${currentStage}: Jalankan misi explorer dan bagikan temuanmu.` : 
              activeTab === "FORUM" ? "Evaluasi strategi dari tim explorer kelas lainnya." : "Pantau skor keaktifan strategi Anda."}
          </p>
        </div>
      </div>

      {activeTab === "MY_LKM" && (
        <div className="space-y-10">
          {/* Progress Tracker Inline */}
          <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-200/50">
             <div className="flex justify-between items-center mb-4 px-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tahapan Misi</span>
                <span className="text-teal-600 font-extrabold text-xs">{currentStage} / 4</span>
             </div>
             <div className="flex gap-2">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-700 ${s <= currentStage ? 'bg-teal-500 shadow-sm' : 'bg-slate-200'}`}></div>
                ))}
             </div>
          </div>

          {/* Mission Content */}
          <div className="bg-white rounded-[3.5rem] shadow-xl border border-slate-100 p-8 md:p-14 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -mr-32 -mt-32 transition-colors group-hover:bg-teal-100/50"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-5 mb-10">
                   <div className="w-16 h-16 bg-teal-900 text-teal-400 rounded-2xl flex items-center justify-center shadow-lg"><span className="material-symbols-outlined text-3xl">{currentMission.icon}</span></div>
                   <div>
                      <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-1">{currentMission.subtitle}</p>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{currentMission.title}</h3>
                   </div>
                </div>

                {/* TASKS AREA */}
                <div className="space-y-10">
                   {currentMission.questions ? currentMission.questions.map((q, idx) => {
                     const val = answers[`mission3_${idx}`] || "";
                     const isShared = allForumPosts.some(p => p.student_email === user.email && p.parsed.stageId === `m3_${idx}`);
                     return (
                      <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 transition-all focus-within:bg-white focus-within:border-teal-500 group/item relative">
                         {isShared && <div className="absolute top-6 right-8 bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-lg">Tayang di Forum</div>}
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Analisis #{idx+1}</p>
                         <h4 className="font-bold text-slate-800 text-base mb-6">{q}</h4>
                         <textarea
                            value={val}
                            onChange={(e) => setAnswers({...answers, [`mission3_${idx}`]: e.target.value})}
                            className="w-full min-h-[140px] bg-white border border-slate-100 rounded-2xl p-5 text-sm outline-none focus:ring-4 focus:ring-teal-500/5 transition-all resize-none shadow-sm"
                            placeholder="Tuliskan analisis Anda..."
                         />
                         <div className="mt-4 flex justify-end">
                            <button 
                              onClick={() => handleShareToForum(`m3_${idx}`, val)} 
                              disabled={val.length < 5 || isShared || loadingAction.type === 'share'}
                              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${isShared ? "bg-emerald-50 text-emerald-600" : "bg-teal-900 text-white hover:bg-black shadow-lg shadow-teal-900/10"}`}
                            >
                              {isShared ? <><span className="material-symbols-outlined !text-[14px]">check_circle</span> Terbagi</> : <><span className="material-symbols-outlined !text-[14px]">share</span> Share ke Forum</>}
                            </button>
                         </div>
                      </div>
                   )}) : currentMission.prompts ? currentMission.prompts.map((p, idx) => {
                     const val = answers[`mission4_${idx}`] || "";
                     const isShared = allForumPosts.some(p => p.student_email === user.email && p.parsed.stageId === `m4_${idx}`);
                     return (
                      <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 transition-all focus-within:bg-white focus-within:border-teal-500 relative">
                         {isShared && <div className="absolute top-6 right-8 bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-lg">Tayang di Forum</div>}
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Design Requirement #{idx+1}</p>
                         <h4 className="font-bold text-slate-800 text-base mb-4 italic">"{p}"</h4>
                         <textarea
                            value={val}
                            onChange={(e) => setAnswers({...answers, [`mission4_${idx}`]: e.target.value})}
                            className="w-full min-h-[120px] bg-white border border-slate-100 rounded-2xl p-5 text-sm outline-none shadow-sm"
                            placeholder="Rancang strategi Anda..."
                         />
                         <div className="mt-4 flex justify-end">
                            <button 
                              onClick={() => handleShareToForum(`m4_${idx}`, val)} 
                              disabled={val.length < 5 || isShared || loadingAction.type === 'share'}
                              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${isShared ? "bg-emerald-50 text-emerald-600" : "bg-teal-900 text-white hover:bg-black shadow-lg"}`}
                            >
                              {isShared ? <><span className="material-symbols-outlined !text-[14px]">check_circle</span> Terbagi</> : <><span className="material-symbols-outlined !text-[14px]">share</span> Share ke Forum</>}
                            </button>
                         </div>
                      </div>
                   )}) : (
                      <div className="grid gap-6">
                        {currentMission.tasks.map((task, idx) => (
                           <div key={task.id} className="bg-slate-50 p-6 rounded-3xl">
                              <h4 className="font-bold text-slate-700 text-sm mb-4">{task.q}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                 {task.options.map((opt, oi) => (
                                    <button key={oi} onClick={() => setAnswers({...answers, [task.id]: oi})} className={`p-4 rounded-xl text-xs font-bold border transition-all ${answers[task.id] === oi ? 'bg-teal-900 text-white border-teal-900 shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-teal-200'}`}>{opt}</button>
                                 ))}
                              </div>
                           </div>
                        ))}
                      </div>
                   )}
                </div>

                {/* FOOTER ACTIONS */}
                <div className="mt-16 pt-10 border-t border-slate-100 flex justify-between items-center bg-white sticky bottom-0 z-10 py-6">
                   <div className="hidden md:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Sinkronisasi</p>
                      <p className="text-xs font-bold text-slate-800 flex items-center gap-2">{saveStatus === 'saving' ? 'Mengunggah Misi...' : 'Draft Aman di Cloud'}</p>
                   </div>
                   <div className="flex gap-4 w-full md:w-auto">
                      {currentStage > 1 && <button onClick={() => setCurrentStage(currentStage - 1)} className="px-8 py-4 rounded-2xl border border-slate-200 text-slate-400 font-black text-xs uppercase hover:bg-slate-50 transition-all">Balik</button>}
                      <button onClick={() => handleFinalSubmit(currentStage)} disabled={isSubmitting} className="flex-1 md:flex-none bg-teal-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-900/20 hover:scale-[1.02] flex items-center justify-center gap-2">
                        {currentStage === 4 ? "TUNTASKAN SEMUA MISI" : "SIMPAN & LANJUT"} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === "FORUM" && (
        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                 <span className="material-symbols-outlined text-yellow-400">explore</span> Strategist Global Forum
              </h3>
              <p className="text-slate-400 text-sm font-medium">Evaluasi dan tanggapi hasil rancangan strategi dari seluruh tim explorer kelas 5A.</p>
           </div>

           {allForumPosts.length === 0 ? (
             <div className="py-20 text-center bg-white rounded-[3.5rem] border border-slate-100 text-slate-400 italic">Belum ada strategi yang dibagikan. Jadilah yang pertama!</div>
           ) : allForumPosts.map((post) => {
              const profile = getStudentProfile(post.student_email);
              const postComments = allComments.filter(c => c.parsed.targetId === post.id);

              return (
                <div key={post.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="bg-slate-50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-teal-900 text-teal-400 rounded-xl flex items-center justify-center font-black">{profile.name.charAt(0)}</div>
                      <div className="text-left">
                        <p className="font-black text-slate-800 uppercase text-xs leading-none">{profile.name} <span className="text-slate-300 ml-2 font-medium">{profile.nim}</span></p>
                        <p className="text-[10px] text-slate-400 mt-1">{new Date(post.created_at).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})} • Tim {post.parsed.groupNum}</p>
                      </div>
                    </div>
                    <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-100 text-[9px] font-black text-teal-600 uppercase tracking-widest self-start md:self-center">{post.parsed.title}</span>
                  </div>
                  <div className="p-8 text-left">
                     <div className="text-sm text-slate-700 leading-relaxed bg-teal-50/30 p-6 rounded-2xl border border-teal-100/50 italic mb-8">"{post.parsed.text}"</div>
                     
                     <div className="space-y-4">
                        {postComments.map((c, ci) => {
                          const cp = getStudentProfile(c.student_email);
                          return (
                            <div key={ci} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl">
                               <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0 border border-slate-100">{cp.name.charAt(0)}</div>
                               <div><p className="text-[10px] font-black text-slate-600">{cp.name}</p><p className="text-xs text-slate-500">{c.parsed.comment}</p></div>
                            </div>
                          );
                        })}
                        <div className="flex gap-3 items-center pt-4">
                           <input value={commentInputs[post.id] || ''} onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-xs outline-none focus:bg-white focus:border-teal-500 transition-all" placeholder="Tanggapi strategi ini..." />
                           <button onClick={() => handleAddComment(post.id)} disabled={!commentInputs[post.id] || loadingAction.type === 'comment'} className="w-10 h-10 bg-teal-900 text-white rounded-xl flex items-center justify-center shadow-lg"><span className="material-symbols-outlined text-[18px]">send</span></button>
                        </div>
                     </div>
                  </div>
                </div>
              );
           })}
        </div>
      )}

      {activeTab === "GRAFIK" && (
        <div className="space-y-8 animate-in zoom-in-95 text-left">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm"><p className="text-4xl font-black text-teal-600">{myStats.myPosts}</p><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Share Strategi</p></div>
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm"><p className="text-4xl font-black text-violet-600">{myStats.myComments}</p><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Review Teman</p></div>
              <div className={`${myStats.badgeColor} p-8 rounded-[3rem] shadow-xl text-center`}><p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Status Keaktifan</p><h4 className="text-2xl font-black uppercase">{myStats.badge}</h4><p className="text-[9px] font-bold mt-2 opacity-80">{myStats.badgeDesc}</p></div>
           </div>
           
           <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-4"><span className="w-2.5 h-10 bg-teal-600 rounded-full shadow-lg"></span> Metrics Explorer Anda</h3>
              <div className="space-y-12">
                 <div className="space-y-4">
                    <div className="flex justify-between items-end"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share Strategi (Target: ≥ 2)</p><span className="text-xs font-black text-teal-600">{myStats.myPosts} / 2</span></div>
                    <div className="h-4 bg-slate-50 rounded-full p-1"><div className="h-full bg-teal-500 rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${Math.min(100, (myStats.myPosts / 2) * 100)}%` }}></div></div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-end"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Review Teman (Target: ≥ 2)</p><span className="text-xs font-black text-violet-600">{myStats.myComments} / 2</span></div>
                    <div className="h-4 bg-slate-50 rounded-full p-1"><div className="h-full bg-violet-500 rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${Math.min(100, (myStats.myComments / 2) * 100)}%` }}></div></div>
                 </div>
              </div>
              <div className="mt-14 bg-teal-50/50 p-6 rounded-3xl border border-teal-100 flex items-start gap-4">
                 <span className="material-symbols-outlined text-teal-600">tips_and_updates</span>
                 <p className="text-xs font-medium text-teal-800 leading-relaxed">Berikan setidaknya 2 postingan strategi dan 2 komentar pada tim lain untuk mendapatkan badge <span className="font-black uppercase tracking-tighter text-teal-900">Sangat Aktif</span> sebagai syarat nilai tutorial maksimal.</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
