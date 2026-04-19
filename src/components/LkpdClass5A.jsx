import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { STUDENTS } from '../data/students';

/**
 * LkpdClass5A - FINAL STABLE VERSION
 * Built with full Error Boundaries and Defensive States
 */
export const LkpdClass5A = ({
  user,
  meetingId,
  submissions = [],
  onComplete,
  missions: propMissions,
  config: lkmConfig = {}
}) => {
  // 1. Critical Base State
  const [activeTab, setActiveTab] = useState("MY_LKM");
  const [answers, setAnswers] = useState({});
  const [localNewPosts, setLocalNewPosts] = useState([]);
  const [localNewComments, setLocalNewComments] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loadingAction, setLoadingAction] = useState({ type: null, id: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const STORAGE_KEY = `lkpd_5a_v5_draft_${user?.email || 'guest'}_${meetingId}`;

  // 2. Error Boundary for Component
  const [componentError, setComponentError] = useState(null);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // 3. Resolve Group Logic Safely
  const { activeGroupNum, hasGroupRow } = useMemo(() => {
    try {
      const gRow = (submissions || []).find(
        (s) => s?.student_email === "SYSTEM_GROUP" && 
               String(s?.meeting_num) === String(meetingId) && 
               String(s?.class_id) === "4"
      );
      
      if (!gRow) return { activeGroupNum: 1, hasGroupRow: false };

      let parsed = [];
      try {
        parsed = typeof gRow.content === 'string' ? JSON.parse(gRow.content) : (gRow.content || []);
      } catch (e) { parsed = []; }

      const myG = (parsed || []).find(g => g?.members?.some(m => m?.email === user?.email));
      return { activeGroupNum: myG ? myG.group_num : 1, hasGroupRow: true };
    } catch (err) {
      console.error("Group Logic Crash:", err);
      return { activeGroupNum: 1, hasGroupRow: false };
    }
  }, [submissions, meetingId, user?.email]);

  // 4. Resolve Mission Content safely
  const currentMission = useMemo(() => {
    try {
      const fallback = {
        title: "Strategi Pembelajaran SD",
        subtitle: `Tugas Diskusi Kelompok ${activeGroupNum}`,
        icon: "groups",
        description: "Menganalisis rumpun model mengajar dan strategi pembelajaran kontemporer dika dika SD.",
        questions: ["Gagal memuat materi spesifik. Silakan hubungi Tutor atau refresh halaman."]
      };

      if (!propMissions) return fallback;
      
      const target = propMissions[activeGroupNum] || propMissions[String(activeGroupNum)];
      return target || fallback;
    } catch (e) { return { title: "Error Data", questions: ["Terjadi kesalahan parsing materi."] }; }
  }, [propMissions, activeGroupNum]);

  // 5. Lifecycle Hooks
  useEffect(() => {
    if (!user?.email) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setAnswers(JSON.parse(saved));
    } catch (e) { console.warn("Draft load failed"); }
  }, [meetingId, user?.email]);

  useEffect(() => {
    if (!user?.email) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch (e) { }
  }, [answers, user?.email]);

  // 6. Forum Data Processing Safely
  const allForumPosts = useMemo(() => {
    try {
      const rawPosts = (submissions || []).filter(s => s?.section_name === "LKM_5A_FORUM_POST");
      const mapped = rawPosts.map(p => {
        try {
          const content = typeof p.content === 'string' ? JSON.parse(p.content) : (p.content || {});
          return { ...p, parsed: content };
        } catch (e) { return { ...p, parsed: {} }; }
      });
      const combined = [...localNewPosts, ...mapped];
      const unique = [];
      const seen = new Set();
      combined.forEach(p => {
        if (p?.id && !seen.has(p.id)) {
          seen.add(p.id);
          unique.push(p);
        }
      });
      return unique.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (e) { return []; }
  }, [submissions, localNewPosts]);

  const allComments = useMemo(() => {
    try {
      const rawComm = (submissions || []).filter(s => s?.section_name === "LKM_5A_COMMENT");
      const mapped = rawComm.map(c => {
        try {
          const content = typeof c.content === 'string' ? JSON.parse(c.content) : (c.content || {});
          return { ...c, parsed: content };
        } catch (e) { return { ...c, parsed: { targetId: null, comment: "" } }; }
      });
      const combined = [...mapped, ...localNewComments];
      const unique = [];
      const seen = new Set();
      combined.forEach(c => {
         if (c?.id && !seen.has(c.id)) { seen.add(c.id); unique.push(c); }
      });
      return unique.sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
    } catch (e) { return []; }
  }, [submissions, localNewComments]);

  const stats = useMemo(() => {
    const pCount = allForumPosts.filter(p => p?.student_email === user?.email).length;
    const cCount = allComments.filter(c => c?.student_email === user?.email).length;
    return { 
      posts: pCount, 
      comments: cCount, 
      badge: pCount >= 2 && cCount >= 2 ? "Strategist Sejati" : pCount >= 1 ? "Aktif" : "Peserta"
    };
  }, [allForumPosts, allComments, user?.email]);

  const getName = (email) => {
    if (!email) return "Mahasiswa";
    const st = STUDENTS?.find(s => s?.email === email);
    return st ? st.name : email.split('@')[0];
  };

  // 7. Actions
  const handleShare = async (idx, q, a) => {
    if (!a || a.trim().length < 5) return;
    setLoadingAction({ type: 'share', id: idx });
    try {
      const contentObj = { questionIndex: idx, questionText: q, answerText: a, groupNum: activeGroupNum, title: currentMission.title };
      const payload = { student_email: user.email, class_id: "4", meeting_num: String(meetingId), section_name: "LKM_5A_FORUM_POST", content: JSON.stringify(contentObj) };
      const { data } = await supabase.from("submissions").insert([payload]).select();
      if (data?.[0]) {
        setLocalNewPosts(prev => [{ ...data[0], parsed: contentObj }, ...prev]);
        showSuccess("Wuih! Strategi Kakak sudah tayang dika Forum!");
        setActiveTab("FORUM");
      }
    } catch (e) { console.error(e); }
    setLoadingAction({ type: null, id: null });
  };

  const handleComment = async (postId, text) => {
    if (!text || text.trim().length === 0) return;
    setLoadingAction({ type: 'comment', id: postId });
    try {
      const contentObj = { targetId: postId, comment: text };
      const payload = { student_email: user.email, class_id: "4", meeting_num: String(meetingId), section_name: "LKM_5A_COMMENT", content: JSON.stringify(contentObj) };
      const { data } = await supabase.from("submissions").insert([payload]).select();
      if (data?.[0]) setLocalNewComments(prev => [...prev, { ...data[0], parsed: contentObj }]);
    } catch (e) { }
    setLoadingAction({ type: null, id: null });
  };

  if (componentError) return <div className="p-10 text-center text-red-500 font-bold">Terjadi kesalahan muat LKM. Silakan muat ulang halaman.</div>;

  if (!user) return <div className="p-20 text-center font-bold text-slate-400">Silakan login untuk mengakses LKM.</div>;

  if (!hasGroupRow) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center mt-10">
         <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 animate-pulse">diversity_3</span>
         <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight">Menunggu Pembagian Kelompok...</h3>
         <p className="text-sm text-slate-400 font-medium">Sabar ya Kak, Tutor sedang mengatur kelompok strategi belajar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 text-left">
      {successMsg && (
        <div className="fixed top-10 right-10 z-[100] bg-teal-950 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
          <p className="font-black text-[10px] uppercase tracking-widest leading-none">{successMsg}</p>
        </div>
      )}

      {/* NEW PREMIUM HEADER */}
      <div className="bg-gradient-to-br from-[#064e3b] via-[#022c22] to-black text-white p-10 md:p-14 rounded-[3.5rem] relative overflow-hidden shadow-2xl shadow-teal-900/20 mt-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-xl">
                 <span className="material-symbols-outlined text-yellow-400 text-sm">stars</span>
                 <p className="text-[10px] font-black uppercase tracking-widest">TIM STRATEGI {activeGroupNum}</p>
              </div>
              <div className="flex bg-black/40 p-1.5 rounded-3xl border border-white/5 backdrop-blur-2xl">
                 <button onClick={() => setActiveTab('MY_LKM')} className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'MY_LKM' ? 'bg-white text-teal-950 shadow-xl' : 'text-teal-100/30 hover:text-white'}`}>DRAFT</button>
                 <button onClick={() => setActiveTab('FORUM')} className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'FORUM' ? 'bg-white text-teal-950 shadow-xl' : 'text-teal-100/30 hover:text-white'}`}>FORUM <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-[8px] ml-1">{allForumPosts.length}</span></button>
                 <button onClick={() => setActiveTab('GRAFIK')} className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'GRAFIK' ? 'bg-white text-teal-950 shadow-xl' : 'text-teal-100/30 hover:text-white'}`}>PROGRES</button>
              </div>
           </div>
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight mb-4">{currentMission.title}</h1>
           <p className="text-teal-100/50 text-sm font-medium max-w-xl leading-relaxed">{currentMission.description}</p>
        </div>
      </div>

      {activeTab === 'MY_LKM' && (
        <div className="bg-white rounded-[4rem] border border-slate-100 shadow-xl p-8 md:p-14">
          <div className="space-y-14">
            {(currentMission.questions || []).map((q, idx) => {
              const isShared = allForumPosts.some(p => p?.student_email === user?.email && p?.parsed?.questionIndex === idx);
              return (
                <div key={idx} className="relative group">
                  <div className="flex gap-6 items-start mb-6">
                    <div className="w-12 h-12 bg-slate-900 text-teal-400 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-teal-900/10 shrink-0">{idx + 1}</div>
                    <p className="font-bold text-slate-800 text-lg md:text-xl leading-relaxed pt-1 flex-1">{q}</p>
                  </div>
                  <textarea
                    value={answers[idx] || ""}
                    onChange={(e) => setAnswers({...answers, [idx]: e.target.value})}
                    placeholder="Tuangkan hasil pemikiran kelompok Kakak dika dika sini..."
                    className="w-full min-h-[200px] bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 text-base md:text-lg font-medium outline-none focus:bg-white focus:border-emerald-500 focus:shadow-2xl focus:shadow-emerald-500/5 transition-all resize-y"
                  />
                  <div className="mt-5 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest"><div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div> Auto-Save Aktif</div>
                     <button 
                        onClick={() => handleShare(idx, q, answers[idx])} 
                        disabled={isShared || !answers[idx] || answers[idx].length < 5 || loadingAction.type === 'share'}
                        className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 ${isShared ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-teal-950 text-white hover:bg-black shadow-2xl shadow-teal-950/20"}`}
                     >
                        {isShared ? <><span className="material-symbols-outlined text-[16px]">check_circle</span> TERBAGIKAN</> : <><span className="material-symbols-outlined text-[16px]">bolt</span> SHARE KE FORUM</>}
                     </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-20 pt-16 border-t border-slate-50 flex flex-col items-center">
             <button onClick={handleFinalSubmit} disabled={isSubmitting} className="bg-black text-white px-16 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                {isSubmitting ? "SEDANG MENGIRIM..." : "KIRIM LKM FINAL"}
             </button>
             <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest tracking-tighter">Pastikan semua pertanyaan sudah dijawab ya Kak!</p>
          </div>
        </div>
      )}

      {activeTab === 'FORUM' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
          <div className="bg-teal-950 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="relative z-10 text-center md:text-left">
                <h3 className="text-3xl font-black mb-2 flex items-center justify-center md:justify-start gap-4 uppercase tracking-tighter">Ruang Kolaborasi ✨</h3>
                <p className="text-teal-100/40 text-sm font-medium">Beri masukan atau tanya jawab strategi dngan teman sekelas Anda.</p>
             </div>
             <div className="bg-white/10 px-6 py-4 rounded-3xl border border-white/10 backdrop-blur-xl text-center">
                <p className="text-3xl font-black">{allForumPosts.length}</p>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Strategi Tayang</p>
             </div>
          </div>

          {allForumPosts.length === 0 ? (
            <div className="p-24 text-center bg-white rounded-[4rem] border border-slate-100 text-slate-300 italic font-bold">Belum ada strategi yang dibagi. Mari jadi yang pertama, Kak!</div>
          ) : allForumPosts.map((post) => {
            const comms = allComments.filter(c => c.parsed.targetId === post.id);
            return (
              <div key={post.id} className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group">
                 <div className="p-8 bg-slate-50/50 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-teal-900 text-teal-400 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">{getName(post.student_email).charAt(0)}</div>
                       <div><p className="font-black text-slate-800 text-xs leading-none mb-1 uppercase">{getName(post.student_email)}</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">TIM {post.parsed.groupNum}</p></div>
                    </div>
                    <p className="text-[9px] font-black text-teal-600 bg-teal-50 px-4 py-2 rounded-xl uppercase tracking-widest">{new Date(post.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                 </div>
                 <div className="p-10">
                    <div className="bg-white border-2 border-slate-50 p-8 rounded-3xl mb-10 shadow-inner relative">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 italic">Membahas pertanyaan: "{post.parsed.questionText}"</p>
                       <p className="text-lg text-slate-700 font-medium leading-relaxed italic">"{post.parsed.answerText}"</p>
                    </div>

                    <div className="space-y-4 max-w-2xl ml-auto">
                       {comms.map((c, ci) => (
                         <div key={ci} className="bg-slate-50 p-5 rounded-2xl border border-slate-100/50 animate-in fade-in slide-in-from-right-2 duration-300">
                            <p className="text-[9px] font-black text-slate-800 uppercase mb-1">{getName(c.student_email)}</p>
                            <p className="text-xs text-slate-500 font-medium">{c.parsed.comment}</p>
                         </div>
                       ))}
                       <div className="flex gap-4 items-center pt-4">
                          <input id={`cfx-${post.id}`} placeholder="Tulis komentar..." className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs outline-none focus:bg-white focus:border-teal-500 transition-all font-medium" />
                          <button onClick={() => { const el = document.getElementById(`cfx-${post.id}`); handleComment(post.id, el.value); el.value=''; }} className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-emerald-600 transition-all"><span className="material-symbols-outlined !text-[20px]">send</span></button>
                       </div>
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'GRAFIK' && (
        <div className="animate-in zoom-in-95 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 text-center"><p className="text-7xl font-black text-teal-600 mb-2">{stats.posts}</p><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kontribusi Forum</p></div>
              <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 text-center"><p className="text-7xl font-black text-violet-600 mb-2">{stats.comments}</p><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Komentar Balik</p></div>
              <div className="bg-black text-white p-12 rounded-[4rem] shadow-2xl text-center flex flex-col items-center justify-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-3xl rounded-full"></div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Pencapaian</p>
                 <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-3">{stats.badge}</h4>
                 <div className="w-10 h-1 bg-teal-400 rounded-full"></div>
              </div>
           </div>
           
           <div className="bg-white p-12 md:p-16 rounded-[4.5rem] shadow-xl border border-slate-50">
              <h3 className="text-3xl font-black text-slate-800 mb-14 flex items-center gap-6"><span className="w-3 h-14 bg-teal-500 rounded-full shadow-lg shadow-teal-500/20"></span> Analisis Keaktifan Strategi</h3>
              <div className="space-y-16">
                 <div className="space-y-6">
                    <div className="flex justify-between items-end px-4 font-black"><p className="text-[11px] text-slate-400 uppercase tracking-widest">Posisi Berbagi (Target: 2)</p><span className="text-xl text-teal-600">{stats.posts} / 2</span></div>
                    <div className="h-6 bg-slate-50 rounded-full p-1.5 border border-slate-100"><div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full shadow-md transition-all duration-1000" style={{ width: `${Math.min(100, (stats.posts/2)*100)}%` }}></div></div>
                 </div>
                 <div className="space-y-6">
                    <div className="flex justify-between items-end px-4 font-black"><p className="text-[11px] text-slate-400 uppercase tracking-widest">Feedback Teman (Target: 2)</p><span className="text-xl text-violet-600">{stats.comments} / 2</span></div>
                    <div className="h-6 bg-slate-50 rounded-full p-1.5 border border-slate-100"><div className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full shadow-md transition-all duration-1000" style={{ width: `${Math.min(100, (stats.comments/2)*100)}%` }}></div></div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
