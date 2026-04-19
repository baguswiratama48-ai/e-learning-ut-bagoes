import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { STUDENTS } from '../data/students';

/**
 * LkpdClass5A - STABLE EMERGENCY VERSION
 * Fixes: White Screen (runtime crash) by adding defensive checks.
 */
export const LkpdClass5A = ({
  user,
  meetingId,
  submissions: initialSubmissions,
  onComplete,
  missions: propMissions,
  config: lkmConfig = {}
}) => {
  const [activeTab, setActiveTab] = useState("MY_LKM");
  const [answers, setAnswers] = useState({});
  const [localNewPosts, setLocalNewPosts] = useState([]);
  const [localNewComments, setLocalNewComments] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loadingAction, setLoadingAction] = useState({ type: null, id: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Safety Toggle: If data parsing fails, show friendlier error
  const [dataError, setDataError] = useState(null);

  const STORAGE_KEY = `lkpd_5a_v4_draft_${user?.email}_${meetingId}`;

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // 1. Group Logic with Safety
  const { activeGroupNum, groupRowFound } = useMemo(() => {
    try {
      const row = (initialSubmissions || []).find(
        (s) => s.student_email === "SYSTEM_GROUP" && String(s.meeting_num) === String(meetingId) && String(s.class_id) === "4"
      );
      if (!row) return { activeGroupNum: 1, groupRowFound: false };

      // DEFENSIVE: JSON.parse can crash if content is bad
      let allGroups = [];
      try {
        allGroups = typeof row.content === 'string' ? JSON.parse(row.content) : (row.content || []);
      } catch (e) {
        console.error("LKM 5A: JSON Parse Error on Groups", e);
        allGroups = [];
      }

      const myGroup = allGroups.find(g => g?.members?.some(m => m?.email === user?.email));
      return { activeGroupNum: myGroup ? myGroup.group_num : 1, groupRowFound: true };
    } catch (err) {
      console.error("LKM 5A: Critical Failure in Group Logic", err);
      return { activeGroupNum: 1, groupRowFound: false };
    }
  }, [initialSubmissions, meetingId, user?.email]);

  // 2. Mission Logic with Safety
  const currentMission = useMemo(() => {
    try {
      if (propMissions && (lkmConfig?.type === "GROUP_DISCUSSION" || lkmConfig?.type === "Interactive")) {
        const groupData = propMissions[activeGroupNum] || propMissions[String(activeGroupNum)];
        if (groupData) return groupData;
      }
      return {
        title: "Strategi Pembelajaran di SD",
        subtitle: `Diskusi Materi Kelompok ${activeGroupNum}`,
        icon: "groups",
        description: "Menganalisis dan mendiskusikan berbagai model strategi pembelajaran kontemporer.",
        questions: ["Materi belum termapping sempurna dika kelas ini. Silakan refresh halaman atau hubungi Tutor Anda."]
      };
    } catch (err) {
      return { title: "Error Memuat Misi", questions: ["Terjadi kesalahan teknis. Mohon maaf."] };
    }
  }, [propMissions, activeGroupNum, lkmConfig]);

  // 3. Draft Sync
  useEffect(() => {
    if (!user?.email) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setAnswers(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, [meetingId, user?.email]);

  useEffect(() => {
    if (!user?.email) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers, user?.email]);

  // 4. Forum Processing with Safety
  const allForumPosts = useMemo(() => {
    try {
      const fromServer = (initialSubmissions || [])
        .filter(s => s?.section_name === "LKM_5A_FORUM_POST")
        .map(p => { 
          try { 
            const parsed = typeof p.content === 'string' ? JSON.parse(p.content) : (p.content || {});
            return { ...p, parsed }; 
          } catch(e) { 
            return {...p, parsed: {}};
          } 
        });
      const combined = [...localNewPosts, ...fromServer];
      const seen = new Set();
      return combined.filter(p => { 
        if (!p?.id || seen.has(p.id)) return false; 
        seen.add(p.id); 
        return true; 
      }).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (e) {
      return [];
    }
  }, [initialSubmissions, localNewPosts]);

  const allComments = useMemo(() => {
    try {
      const fromServer = (initialSubmissions || [])
        .filter(s => s?.section_name === "LKM_5A_COMMENT")
        .map(c => { 
          try { 
            const parsed = typeof c.content === 'string' ? JSON.parse(c.content) : (c.content || {});
            return { ...c, parsed: { targetId: parsed.targetId || null, comment: parsed.comment || "" } }; 
          } catch(e) { 
            return {...c, parsed: {targetId: null, comment: ""}};
          } 
        });
      const combined = [...fromServer, ...localNewComments];
      const seen = new Set();
      return combined.filter(c => { 
        if (!c?.id || seen.has(c.id)) return false; 
        seen.add(c.id); 
        return true; 
      }).sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
    } catch (e) {
      return [];
    }
  }, [initialSubmissions, localNewComments]);

  // 5. Stats Logic
  const myStats = useMemo(() => {
    try {
      const pCount = allForumPosts.filter(p => p?.student_email === user?.email).length;
      const cCount = allComments.filter(c => c?.student_email === user?.email).length;
      return { 
        posts: pCount, 
        comments: cCount, 
        total: pCount + cCount,
        badge: pCount >= 2 && cCount >= 2 ? "Strategist Sejati" : pCount >= 1 ? "Aktif" : "Pasif"
      };
    } catch (e) {
      return { posts: 0, comments: 0, total: 0, badge: "N/A" };
    }
  }, [allForumPosts, allComments, user?.email]);

  const getSafeName = (email) => {
    if (!email) return "Anonymous";
    const st = STUDENTS?.find(s => s?.email === email);
    return st ? st.name : email.split('@')[0];
  };

  // --- ACTIONS ---
  const handleShare = async (idx, qText, aText) => {
    if (!aText || aText.trim().length < 5) return;
    setLoadingAction({ type: 'share', id: idx });
    try {
      const parsedContent = { questionIndex: idx, questionText: qText, answerText: aText, groupNum: activeGroupNum, title: currentMission.title };
      const payload = { student_email: user.email, class_id: "4", meeting_num: String(meetingId), section_name: "LKM_5A_FORUM_POST", content: JSON.stringify(parsedContent) };
      const { data } = await supabase.from("submissions").insert([payload]).select();
      
      const newPost = data?.[0] ?? { id: `local_${Date.now()}`, student_email: user.email, created_at: new Date().toISOString() };
      setLocalNewPosts(prev => [{ ...newPost, parsed: parsedContent }, ...prev]);
      showSuccess('✅ Jawaban Anda kini tersedia di Forum!');
      setActiveTab('FORUM');
    } catch (e) { console.error(e); }
    setLoadingAction({ type: null, id: null });
  };

  const handleComment = async (targetId, text) => {
    if (!text || text.trim().length === 0) return;
    setLoadingAction({ type: 'comment', id: targetId });
    try {
      const parsedContent = { targetId, comment: text };
      const payload = { student_email: user.email, class_id: "4", meeting_num: String(meetingId), section_name: "LKM_5A_COMMENT", content: JSON.stringify(parsedContent) };
      const { data } = await supabase.from("submissions").insert([payload]).select();
      const newComment = data?.[0] ?? { id: `local_${Date.now()}`, student_email: user.email, created_at: new Date().toISOString() };
      setLocalNewComments(prev => [...prev, { ...newComment, parsed: parsedContent }]);
    } catch (e) { console.error(e); }
    setLoadingAction({ type: null, id: null });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    let finalDoc = `LEMBAR KERJA MAHASISWA (LKM) - STRATEGI PEMBELAJARAN\nTopik: ${currentMission.title}\n\n`;
    (currentMission.questions || []).forEach((q, i) => {
       finalDoc += `Q${i+1}: ${q}\nJ: ${answers[i] || "-"}\n\n`;
    });
    try {
      await onComplete(finalDoc);
      showSuccess('🏆 LKM Strategi berhasil terkirim!');
    } catch (e) { console.error(e); }
    setIsSubmitting(false);
  };

  // --- RENDER FALLBACKS ---
  if (!user) return <div className="p-10 text-center">Mohon login untuk mengakses LKM.</div>;

  if (!groupRowFound) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 p-12 py-20 rounded-[3rem] text-center mt-10">
         <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 animate-pulse">group_work</span>
         <h3 className="font-bold text-xl text-slate-800 mb-2">Menunggu Pembagian Kelompok</h3>
         <p className="text-slate-400 text-sm max-w-sm mx-auto">Harap tunggu Tutor untuk memasukkan Anda ke dalam kelompok sebelum mengerjakan LKM ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 text-left">
      
      {successMsg && (
        <div className="fixed top-8 right-8 z-[100] bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 border border-white/10">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <p className="font-black text-[10px] uppercase tracking-widest">{successMsg}</p>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-gradient-to-br from-teal-900 to-black text-white p-8 md:p-14 rounded-[3.5rem] relative overflow-hidden shadow-2xl mt-10">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[150px]">architecture</span>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
               <span className="material-symbols-outlined text-yellow-400 text-sm">military_tech</span>
               <p className="text-[10px] font-black uppercase tracking-widest">TIM {activeGroupNum}</p>
            </div>
            <div className="flex bg-black/40 rounded-2.5xl p-1.5 border border-white/5 backdrop-blur-md">
              <button onClick={() => setActiveTab('MY_LKM')} className={`px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'MY_LKM' ? 'bg-white text-teal-950 shadow-xl' : 'text-teal-100/30'}`}>DRAFT LKM</button>
              <button onClick={() => setActiveTab('FORUM')} className={`px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'FORUM' ? 'bg-white text-teal-950 shadow-xl' : 'text-teal-100/30'}`}>FORUM <span className="bg-emerald-500 text-white px-1.5 py-0.5 rounded-lg text-[8px]">{allForumPosts.length}</span></button>
              <button onClick={() => setActiveTab('GRAFIK')} className={`px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'GRAFIK' ? 'bg-white text-teal-950 shadow-xl' : 'text-teal-100/30'}`}>GRAFIK SAYA</button>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight mb-4">{currentMission.title}</h1>
          <p className="text-teal-100/40 text-sm font-medium max-w-xl leading-relaxed">{currentMission.description}</p>
        </div>
      </div>

      {activeTab === 'MY_LKM' && (
        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl p-8 md:p-14">
          <div className="space-y-12">
            {(currentMission.questions || []).map((q, idx) => {
              const isShared = allForumPosts.some(p => p?.student_email === user?.email && p?.parsed?.questionIndex === idx);
              return (
                <div key={idx} className="relative">
                  <div className="flex gap-5 items-start mb-6">
                    <div className="w-10 h-10 bg-slate-900 text-teal-400 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg">{idx + 1}</div>
                    <p className="font-bold text-slate-800 text-base md:text-lg leading-relaxed pt-1 flex-1">{q}</p>
                  </div>
                  <textarea
                    value={answers[idx] || ""}
                    onChange={(e) => setAnswers({...answers, [idx]: e.target.value})}
                    placeholder="Tuliskan ulasan strategi Anda di sini..."
                    className="w-full min-h-[160px] bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-sm md:text-base font-medium outline-none focus:bg-white focus:border-teal-500 transition-all resize-y"
                  />
                  <div className="mt-4 flex items-center justify-between">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div> Cloud Synced</p>
                     <button
                        onClick={() => handleShare(idx, q, answers[idx])}
                        disabled={isShared || !answers[idx] || answers[idx].length < 5 || loadingAction.type === 'share'}
                        className={`px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${isShared ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-teal-950 text-white hover:bg-black shadow-xl"}`}
                      >
                         {isShared ? <><span className="material-symbols-outlined !text-[16px]">verified</span> Shared</> : <><span className="material-symbols-outlined !text-[16px]">share</span> Share ke Forum</>}
                      </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 pt-12 border-t border-slate-50 flex flex-col items-center">
             <button onClick={handleFinalSubmit} disabled={isSubmitting} className="bg-slate-950 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                {isSubmitting ? "MENGIRIM..." : "KIRIM LKM FINAL"}
             </button>
          </div>
        </div>
      )}

      {activeTab === 'FORUM' && (
        <div className="space-y-6">
           {allForumPosts.length === 0 ? (
             <div className="p-20 text-center bg-white rounded-[3.5rem] border border-slate-100 text-slate-400 italic">Belum ada strategi yang dibagikan. Mari berkontribusi!</div>
           ) : allForumPosts.map((post) => {
             const comments = allComments.filter(c => c.parsed.targetId === post.id);
             return (
               <div key={post.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="p-6 bg-slate-50 flex items-center justify-between border-b border-slate-100">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-950 text-teal-400 rounded-xl flex items-center justify-center font-black text-sm">{getSafeName(post.student_email).charAt(0)}</div>
                        <div><p className="font-black text-slate-800 text-[10px] leading-none mb-1 uppercase">{getSafeName(post.student_email)}</p><p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">TIM {post.parsed.groupNum}</p></div>
                     </div>
                  </div>
                  <div className="p-8">
                     <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100 mb-8">
                        <p className="text-[9px] font-black text-teal-600 uppercase mb-3 italic">Membahas: "{post.parsed.questionText}"</p>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed italic">"{post.parsed.answerText}"</p>
                     </div>
                     <div className="space-y-4">
                        {comments.map((c, ci) => (
                           <div key={ci} className="bg-slate-50 p-4 rounded-xl text-xs"><p className="font-black text-slate-800 text-[9px] mb-1">{getSafeName(c.student_email)}</p><p className="text-slate-500 font-medium">{c.parsed.comment}</p></div>
                        ))}
                        <div className="flex gap-3 items-center pt-2">
                           <input id={`cf-${post.id}`} placeholder="Tulis komentar..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:bg-white" />
                           <button onClick={() => { const el = document.getElementById(`cf-${post.id}`); handleComment(post.id, el.value); el.value=''; }} className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">send</span></button>
                        </div>
                     </div>
                  </div>
               </div>
             );
           })}
        </div>
      )}

      {activeTab === 'GRAFIK' && (
        <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 text-center animate-in zoom-in-95 duration-500">
           <div className="flex flex-col md:flex-row gap-8 justify-around mb-12">
              <div><p className="text-5xl font-black text-teal-700">{myStats.posts}</p><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Post Forum</p></div>
              <div><p className="text-5xl font-black text-violet-700">{myStats.comments}</p><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ulasan Teman</p></div>
              <div className="bg-teal-950 text-white px-10 py-6 rounded-3xl flex flex-col items-center justify-center shadow-2xl">
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2">My Rank</p>
                 <h4 className="text-xl font-black uppercase">{myStats.badge}</h4>
              </div>
           </div>
           <div className="space-y-8 max-w-xl mx-auto">
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase"><span>Post Status</span><span>{myStats.posts} / 2</span></div>
                 <div className="h-4 bg-slate-50 rounded-full p-1"><div className="h-full bg-teal-500 rounded-full transition-all duration-1000" style={{width: `${Math.min(100, (myStats.posts/2)*100)}%`}}></div></div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase"><span>Comment Status</span><span>{myStats.comments} / 2</span></div>
                 <div className="h-4 bg-slate-50 rounded-full p-1"><div className="h-full bg-violet-500 rounded-full transition-all duration-1000" style={{width: `${Math.min(100, (myStats.comments/2)*100)}%`}}></div></div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
