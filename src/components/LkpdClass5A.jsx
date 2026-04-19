import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { STUDENTS } from '../data/students';

/**
 * LkpdClass5A - Refactored to Class 6A Premium Logic
 * Focus: Strategy Learning (Strategi Pembelajaran di SD)
 * Features: Multi-tab, Graphics, Activity Stats, Optimistic Forum Updates
 */
export const LkpdClass5A = ({
  user,
  classId,
  meetingId,
  submissions: initialSubmissions,
  onComplete,
  missions: propMissions,
  config: lkmConfig = {}
}) => {
  // 1. TABS & LOCAL STATES
  const [activeTab, setActiveTab] = useState("MY_LKM"); // MY_LKM, FORUM, GRAFIK
  const [currentStage, setCurrentStage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [localNewPosts, setLocalNewPosts] = useState([]);
  const [localNewComments, setLocalNewComments] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loadingAction, setLoadingAction] = useState({ type: null, id: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const STORAGE_KEY = `lkpd_5a_premium_draft_${user.email}_${meetingId}`;

  // Helper: Success Notification
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // 2. GROUP RESOLUTION (SYSTEM_GROUP logic)
  const groupRow = (initialSubmissions || []).find(
    (s) => s.student_email === "SYSTEM_GROUP" && String(s.meeting_num) === String(meetingId) && String(s.class_id) === "4"
  );
  const allGroups = groupRow ? JSON.parse(groupRow.content) : [];
  const myGroup = allGroups.find(g => g.members.some(m => m.email === user.email));
  const activeGroupNum = myGroup ? myGroup.group_num : 1;

  // 3. DRAFT MANAGEMENT (Local Storage)
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, stage: currentStage }));
  }, [answers, currentStage]);

  // 4. DYNAMIC MISSION HANDLER (Strategi Pembelajaran)
  const activeMissionsList = useMemo(() => {
    // We prioritize propMissions (Sesi 2 data)
    if (propMissions && lkmConfig.type === "GROUP_DISCUSSION") {
      const groupMission = propMissions[activeGroupNum];
      if (groupMission) return [ { ...groupMission, id: 1 } ]; 
    }
    // Fallback or Generic
    return propMissions ? Object.values(propMissions) : [];
  }, [propMissions, activeGroupNum, lkmConfig]);

  const totalStages = activeMissionsList.length;
  const currentMission = activeMissionsList[0] || { title: "Misi Belum Tersedia", questions: [], description: "Harap hubungi tutor." };

  // 5. FORUM PROCESSING (Unified Server + Local)
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

  // 6. ACTIVITY STATS & BADGES
  const myStats = useMemo(() => {
    const myPosts = allForumPosts.filter(p => p.student_email === user.email).length;
    const myComments = allComments.filter(c => c.student_email === user.email).length;
    const total = myPosts + myComments;

    let badge, badgeColor, badgeDesc;
    if (myPosts >= 2 && myComments >= 2) {
      badge = "Strategist Sejati"; badgeColor = "bg-emerald-500 text-white"; badgeDesc = "Luar biasa! Analisis strategi Anda sangan mendalam.";
    } else if (myPosts >= 1 && myComments >= 1) {
      badge = "Explorer Aktif";    badgeColor = "bg-teal-500 text-white";    badgeDesc = "Bagus! Teruskan kontribusi Anda di forum.";
    } else if (total >= 1) {
      badge = "Cukup Berkontribusi"; badgeColor = "bg-amber-400 text-slate-900";badgeDesc = "Ayo bagikan lebih banyak ide strategi.";
    } else {
      badge = "Belum Beraksi";      badgeColor = "bg-rose-100 text-rose-600"; badgeDesc = "Yuk mulai bagikan jawaban atau beri komentar!";
    }
    return { myPosts, myComments, total, badge, badgeColor, badgeDesc };
  }, [allForumPosts, allComments, user.email]);

  const getStudentProfile = (email) => {
    const st = STUDENTS.find(s => s.email === email);
    if (st) return { name: st.name, nim: st.nim };
    return { name: email.split('@')[0], nim: "N/A" };
  };

  // --- ACTIONS ---
  const handleShareToForum = async (qIdx, qText, aText) => {
    if(!aText || aText.trim().length < 10) return;
    setLoadingAction({ type: 'share', id: qIdx });
    try {
        const parsedContent = { 
            questionIndex: qIdx, 
            questionText: qText, 
            answerText: aText,
            groupNum: activeGroupNum,
            title: currentMission.title
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

  const handleAddComment = async (targetId, commentInput) => {
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
        showSuccess('💬 Komentar berhasil dikirim!');
    } catch (err) {
        console.error(err);
        alert("Gagal mengirim komentar.");
    }
    setLoadingAction({ type: null, id: null });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSaveStatus('saving');
    
    let docContent = `LEMBAR KERJA MAHASISWA (LKM) STRATEGI PEMBELAJARAN\nTopik: ${currentMission.title}\nKelompok: ${activeGroupNum}\n\n`;
    currentMission.questions.forEach((q, idx) => {
      docContent += `Soal ${idx + 1}:\n${q}\n\nJawaban:\n${answers[idx] || "-"}\n\n`;
    });

    try {
      await onComplete(docContent);
      setSaveStatus('success');
      showSuccess('🏆 LKM Strategi berhasil dikirim ke Tutor!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDERERS ---
  if (!groupRow) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-12 rounded-[3.5rem] text-center mt-10">
         <span className="material-symbols-outlined text-6xl text-teal-200 mb-4 animate-pulse">group_work</span>
         <h3 className="font-black text-2xl text-slate-800 mb-2 tracking-tight">Menunggu Pembagian Tim</h3>
         <p className="text-slate-500 font-medium text-sm max-w-sm mx-auto leading-relaxed">Harap tunggu Tutor membagi kelompok untuk Modul Strategi Pembelajaran ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20 relative text-left">
      
      {/* Toast Notification */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-[60] bg-slate-900 border border-white/10 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-4 duration-300">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <p className="font-bold text-xs uppercase tracking-widest">{successMsg}</p>
        </div>
      )}

      {/* LUXURY HEADER */}
      <div className="bg-gradient-to-br from-teal-900 via-emerald-950 to-black text-white p-8 md:p-12 rounded-[3rem] relative overflow-hidden shadow-2xl mt-10">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
           <span className="material-symbols-outlined text-[180px]">architecture</span>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
             <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <span className="material-symbols-outlined text-yellow-400">workspace_premium</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Tim Strategi Group {activeGroupNum}</span>
             </div>
             
             {/* Tabs Toggle */}
             <div className="flex bg-black/30 rounded-2xl p-1.5 backdrop-blur-md border border-white/5 shadow-inner">
                <button onClick={() => setActiveTab("MY_LKM")} className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === "MY_LKM" ? "bg-white text-teal-900 shadow-xl" : "text-teal-100/40 hover:text-white"}`}>DRAFT LKM</button>
                <button onClick={() => setActiveTab("FORUM")} className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === "FORUM" ? "bg-white text-teal-900 shadow-xl" : "text-teal-100/40 hover:text-white"}`}>FORUM DISKUSI <span className="bg-emerald-500 text-white px-1.5 py-0.5 rounded text-[8px]">{allForumPosts.length}</span></button>
                <button onClick={() => setActiveTab("GRAFIK")} className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === "GRAFIK" ? "bg-white text-teal-900 shadow-xl" : "text-teal-100/40 hover:text-white"}`}>📊 STATISTIK SAYA</button>
             </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none mb-3">{currentMission.title}</h2>
          <p className="text-teal-100/60 text-sm font-medium max-w-2xl">{currentMission.description}</p>
        </div>
      </div>

      {activeTab === "MY_LKM" && (
        <div className="space-y-8">
           <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
                 <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center"><span className="material-symbols-outlined text-3xl">{currentMission.icon || 'quiz'}</span></div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Topik Utama</p>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">{currentMission.title}</h3>
                 </div>
              </div>

              <div className="space-y-12">
                 {currentMission.questions.map((q, idx) => {
                   const isShared = allForumPosts.some(p => p.student_email === user.email && p.parsed.questionIndex === idx);
                   const isDraftEmpty = (answers[idx] || "").trim().length < 10;

                   return (
                     <div key={idx} className="relative">
                        <div className="flex gap-5 items-start mb-6">
                           <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-lg">{idx + 1}</div>
                           <p className="font-bold text-slate-700 leading-relaxed text-base pt-1">{q}</p>
                        </div>
                        
                        <div className="relative group">
                           <textarea
                             value={answers[idx] || ""}
                             onChange={(e) => setAnswers({...answers, [idx]: e.target.value})}
                             className="w-full min-h-[160px] bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm md:text-base outline-none focus:bg-white focus:border-teal-500 focus:shadow-2xl focus:shadow-teal-900/5 transition-all resize-y placeholder:text-slate-300"
                             placeholder="Uraikan strategi kelompok Anda secara mendalam..."
                           />
                           
                           <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                 {isDraftEmpty ? (
                                   <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-1"><span className="material-symbols-outlined !text-[12px]">info</span> Minimal 10 karakter</span>
                                 ) : (
                                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1"><span className="material-symbols-outlined !text-[12px]">done_all</span> Tersimpan Otomatis</span>
                                 )}
                              </div>
                              
                              <button
                                onClick={() => handleShareToForum(idx, q, answers[idx])}
                                disabled={isDraftEmpty || isShared || loadingAction.type === 'share'}
                                className={`w-full md:w-auto px-6 py-3 rounded-2xl font-black text-[10px] uppercase transition-all flex items-center justify-center gap-2 ${isShared ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-900 text-white hover:bg-black shadow-xl"}`}
                              >
                                {isShared ? <><span className="material-symbols-outlined !text-[16px]">public</span> Tayang di Forum</> : <><span className="material-symbols-outlined !text-[16px]">share</span> Share ke Forum</>}
                              </button>
                           </div>
                        </div>
                     </div>
                   );
                 })}
              </div>

              <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col items-center">
                 <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6"><span className="material-symbols-outlined text-4xl">cloud_upload</span></div>
                 <h4 className="text-xl font-black text-slate-800 mb-2">Siap Kirim Hasil Final?</h4>
                 <p className="text-slate-500 text-xs font-medium max-w-sm text-center mb-8">Hasil pengiriman final akan menjadi dasar penilaian utama oleh Tutor.</p>
                 <button 
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-teal-900 to-black text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                 >
                   {isSubmitting ? "MENGIRIM..." : "KIRIM LKM FINAL KE TUTOR"}
                 </button>
              </div>
           </div>
        </div>
      )}

      {activeTab === "FORUM" && (
         <div className="space-y-6">
            <div className="bg-emerald-950 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400 opacity-5 rounded-full -mr-40 -mt-40 blur-3xl"></div>
               <h3 className="text-2xl font-black mb-2 flex items-center gap-3"><span className="material-symbols-outlined text-yellow-400">group</span> Collective Strategy Brainstorm</h3>
               <p className="text-teal-100/60 text-xs font-medium max-w-xl leading-relaxed">Kolaborasi antar kelompok sangan penting. Berikan umpan balik yang membangun atau ajukan pertanyaan kritis atas strategi tim lain.</p>
            </div>

            {allForumPosts.map((post) => {
              const profile = getStudentProfile(post.student_email);
              const postComments = allComments.filter(c => c.parsed.targetId === post.id);

              return (
                <div key={post.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                   <div className="bg-slate-50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-teal-900 text-teal-400 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-transform">{profile.name.charAt(0)}</div>
                         <div>
                            <p className="font-black text-slate-800 uppercase text-xs leading-none mb-1">{profile.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tim Explorer {post.parsed.groupNum || '?'}</p>
                         </div>
                      </div>
                      <span className="bg-emerald-100/50 text-emerald-700 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-200/50 self-start md:self-center">{post.parsed.title}</span>
                   </div>
                   
                   <div className="p-8">
                      <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-emerald-500 mb-8">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Membahas Soal: "{post.parsed.questionText}"</p>
                         <p className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">{post.parsed.answerText}</p>
                      </div>

                      <div className="space-y-4">
                         {postComments.length > 0 && (
                            <div className="pl-6 space-y-4 mb-6 border-l-2 border-slate-100">
                               {postComments.map((c, ci) => {
                                 const cp = getStudentProfile(c.student_email);
                                 return (
                                   <div key={ci} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                      <p className="text-[9px] font-black text-slate-800 uppercase mb-1">{cp.name} <span className="text-slate-400 font-medium ml-2">{cp.nim}</span></p>
                                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{c.parsed.comment}</p>
                                   </div>
                                 );
                               })}
                            </div>
                         )}

                         <div className="flex gap-4 items-center">
                            <input 
                              id={`input-${post.id}`}
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner" 
                              placeholder="Ketik tanggapan Anda..." 
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddComment(post.id, e.target.value);
                                  e.target.value = '';
                                }
                              }}
                            />
                            <button 
                              onClick={() => {
                                const inp = document.getElementById(`input-${post.id}`);
                                handleAddComment(post.id, inp.value);
                                inp.value = '';
                              }}
                              className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-emerald-600 transition-colors"
                            >
                               <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              );
            })}
         </div>
      )}

      {activeTab === "GRAFIK" && (
        <div className="space-y-8 animate-in zoom-in-95">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm text-center">
                 <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 tracking-normal"><span className="material-symbols-outlined text-3xl font-black">forum</span></div>
                 <p className="text-5xl font-black text-slate-800 mb-1">{myStats.myPosts}</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategi Dibagi</p>
              </div>
              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm text-center">
                 <div className="w-16 h-16 bg-violet-50 text-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-4 tracking-normal"><span className="material-symbols-outlined text-3xl font-black">chat_bubble</span></div>
                 <p className="text-5xl font-black text-slate-800 mb-1">{myStats.myComments}</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ulasan Teman</p>
              </div>
              <div className={`${myStats.badgeColor} p-10 rounded-[3rem] shadow-xl text-center relative overflow-hidden group`}>
                 <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform"><span className="material-symbols-outlined text-[100px]">military_tech</span></div>
                 <div className="relative z-10 flex flex-col items-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-3 block">Level Partisipasi</p>
                    <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-3">{myStats.badge}</h4>
                    <p className="text-[9px] font-bold leading-relaxed px-4 opacity-80 uppercase tracking-widest">{myStats.badgeDesc}</p>
                 </div>
              </div>
           </div>

           <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <h3 className="text-3xl font-black text-slate-800 mb-12 flex items-center gap-5 leading-none">
                 <span className="w-2.5 h-12 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20 tracking-normal"></span>
                 Activity Explorer Metrics
              </h3>
              
              <div className="space-y-14">
                 <div className="space-y-6">
                    <div className="flex justify-between items-end px-2">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Postingan Strategi (Min. Target: 2)</p>
                          <p className="text-xl font-black text-teal-800">{myStats.myPosts} <span className="text-slate-200">/ 2</span></p>
                       </div>
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest ${myStats.myPosts >= 2 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{myStats.myPosts >= 2 ? 'TERPENUHI' : 'PENGUMPULAN'}</span>
                    </div>
                    <div className="h-4 bg-slate-50 rounded-full p-1 border border-slate-100 shadow-inner">
                       <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full shadow-sm transition-all duration-1000 ease-out" style={{ width: `${Math.min(100, (myStats.myPosts / 2) * 100)}%` }}></div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex justify-between items-end px-2">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Review & Feedback (Min. Target: 2)</p>
                          <p className="text-xl font-black text-violet-800">{myStats.myComments} <span className="text-slate-200">/ 2</span></p>
                       </div>
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest ${myStats.myComments >= 2 ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-400'}`}>{myStats.myComments >= 2 ? 'TERPENUHI' : 'EVALUASI'}</span>
                    </div>
                    <div className="h-4 bg-slate-50 rounded-full p-1 border border-slate-100 shadow-inner">
                       <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full shadow-sm transition-all duration-1000 ease-out" style={{ width: `${Math.min(100, (myStats.myComments / 2) * 100)}%` }}></div>
                    </div>
                 </div>
              </div>

              <div className="mt-16 bg-teal-50 p-8 rounded-[2rem] border border-teal-100 flex items-start gap-5">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm shrink-0"><span className="material-symbols-outlined text-2xl">tips_and_updates</span></div>
                 <div>
                    <p className="text-xs font-bold text-teal-900 mb-1 uppercase tracking-tight">Kunci Penilaian Keaktifan:</p>
                    <p className="text-xs text-teal-800 leading-relaxed font-medium">Nilai Tutorial akan maksimal jika Anda mencapai level <span className="font-black text-emerald-700">STRATEGIST SEJATI</span> dengan membagikan 2 jawaban and memberikan 2 tanggapan siganifikandika forum ini.</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
