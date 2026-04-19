import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { STUDENTS } from '../data/students';

/**
 * LkpdClass5A - ULTRA STABLE RECOVERY VERSION
 * Focused on: Zero Blank Screen, Maximum Resilience
 */
export const LkpdClass5A = ({
  user,
  meetingId,
  submissions = [],
  onComplete,
  missions: propMissions,
  config: lkmConfig = {}
}) => {
  // --- BASE STATES ---
  const [activeTab, setActiveTab] = useState("MY_LKM");
  const [answers, setAnswers] = useState({});
  const [localNewPosts, setLocalNewPosts] = useState([]);
  const [localNewComments, setLocalNewComments] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loadingAction, setLoadingAction] = useState({ type: null, id: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- SAFETY FIRST: USER CHECK ---
  if (!user || !user.email) {
    return <div className="p-20 text-center text-slate-400 font-bold">Mohon Login Mahasiswa untuk mengakses LKM.</div>;
  }

  const STORAGE_KEY = `lkpd_5a_v6_draft_${user.email}_${meetingId || '1'}`;

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // --- 1. RESOLVE GROUP (DEFENSIVE) ---
  const { activeGroupNum, hasGroupRow } = useMemo(() => {
    try {
      const gRow = (submissions || []).find(
        (s) => s?.student_email === "SYSTEM_GROUP" && 
               String(s?.meeting_num) === String(meetingId) && 
               String(s?.class_id) === "4"
      );
      
      if (!gRow) return { activeGroupNum: 1, hasGroupRow: false };

      let parsedGroups = [];
      try {
        parsedGroups = typeof gRow.content === 'string' ? JSON.parse(gRow.content) : (gRow.content || []);
      } catch (e) { parsedGroups = []; }

      const targetGroup = (parsedGroups || []).find(g => 
        g?.members?.some(m => m?.email === user.email)
      );
      
      return { 
        activeGroupNum: targetGroup ? targetGroup.group_num : 1, 
        hasGroupRow: true 
      };
    } catch (err) {
      console.error("LKM Crash di Grup:", err);
      return { activeGroupNum: 1, hasGroupRow: false };
    }
  }, [submissions, meetingId, user.email]);

  // --- 2. RESOLVE MISSION DATA (DEFENSIVE) ---
  const currentMission = useMemo(() => {
    const fallback = {
      title: "Strategi Pembelajaran Kontemporer",
      subtitle: `Diskusi Tim ${activeGroupNum}`,
      icon: "groups",
      description: "Menganalisis karakteristik perkembangan siswa dan model pembelajaran di Sekolah Dasar.",
      questions: ["Materi Spesifik belum tersedia. Harap hubungi Tutor atau refresh halaman ini."]
    };

    try {
      if (!propMissions) return fallback;
      const data = propMissions[activeGroupNum] || propMissions[String(activeGroupNum)];
      return data || fallback;
    } catch (e) {
      return fallback;
    }
  }, [propMissions, activeGroupNum]);

  // --- 3. DRAFT PERSISTENCE ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setAnswers(JSON.parse(saved));
    } catch (e) { console.warn("LKM: Gagal muat draf."); }
  }, [STORAGE_KEY]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch (e) {}
  }, [answers, STORAGE_KEY]);

  // --- 4. DATA PROCESSING (FORUM & COMMENTS) ---
  const allForumPosts = useMemo(() => {
    try {
      const dbPosts = (submissions || []).filter(s => s?.section_name === "LKM_5A_FORUM_POST")
        .map(p => {
          try {
            const parsed = typeof p.content === 'string' ? JSON.parse(p.content) : (p.content || {});
            return { ...p, parsed };
          } catch (e) { return { ...p, parsed: {} }; }
        });
      
      const combined = [...localNewPosts, ...dbPosts];
      const result = [];
      const seen = new Set();
      combined.forEach(p => {
        if (p?.id && !seen.has(p.id)) {
          seen.add(p.id);
          result.push(p);
        }
      });
      return result.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (e) { return []; }
  }, [submissions, localNewPosts]);

  const allComments = useMemo(() => {
    try {
      const dbComms = (submissions || []).filter(s => s?.section_name === "LKM_5A_COMMENT")
        .map(c => {
          try {
            const parsed = typeof c.content === 'string' ? JSON.parse(c.content) : (c.content || {});
            return { ...c, parsed };
          } catch (e) { return { ...c, parsed: { targetId: null, comment: "" } }; }
        });
      
      const combined = [...dbComms, ...localNewComments];
      const result = [];
      const seen = new Set();
      combined.forEach(c => {
        if (c?.id && !seen.has(c.id)) { seen.add(c.id); result.push(c); }
      });
      return result.sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
    } catch (e) { return []; }
  }, [submissions, localNewComments]);

  const myStats = useMemo(() => {
    const posts = allForumPosts.filter(p => p?.student_email === user.email).length;
    const comms = allComments.filter(c => c?.student_email === user.email).length;
    return { posts, comms, badge: posts >= 2 && comms >= 2 ? "Strategist Sejati" : posts >= 1 ? "Aktif" : "Eksplorer" };
  }, [allForumPosts, allComments, user.email]);

  const getSafeName = (email) => {
    if (!email) return "Mahasiswa";
    const found = STUDENTS?.find(s => s?.email === email);
    return found ? found.name : email.split('@')[0];
  };

  // --- 5. ACTIONS ---
  const handleShare = async (idx, q, a) => {
    if (!a || a.trim().length < 5) return;
    setLoadingAction({ type: 'share', id: idx });
    try {
      const contentObj = { questionIndex: idx, questionText: q, answerText: a, groupNum: activeGroupNum, title: currentMission.title };
      const payload = { 
        student_email: user.email, 
        class_id: "4", 
        meeting_num: String(meetingId), 
        section_name: "LKM_5A_FORUM_POST", 
        content: JSON.stringify(contentObj) 
      };
      const { data } = await supabase.from("submissions").insert([payload]).select();
      if (data?.[0]) {
        setLocalNewPosts(prev => [{ ...data[0], parsed: contentObj }, ...prev]);
        showSuccess("Wuih! Strategi Anda sudah tayang di Forum!");
        setActiveTab("FORUM");
      }
    } catch (e) { console.error(e); }
    setLoadingAction({ type: null, id: null });
  };

  const handleComment = async (id, txt) => {
    if (!txt || txt.trim().length === 0) return;
    setLoadingAction({ type: 'comment', id });
    try {
      const contentObj = { targetId: id, comment: txt };
      const payload = { 
        student_email: user.email, 
        class_id: "4", 
        meeting_num: String(meetingId), 
        section_name: "LKM_5A_COMMENT", 
        content: JSON.stringify(contentObj) 
      };
      const { data } = await supabase.from("submissions").insert([payload]).select();
      if (data?.[0]) setLocalNewComments(prev => [...prev, { ...data[0], parsed: contentObj }]);
    } catch (e) {}
    setLoadingAction({ type: null, id: null });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    let doc = `LEMBAR KERJA MAHASISWA (LKM)\n\nTopik: ${currentMission.title}\nTim: ${activeGroupNum}\n\n`;
    (currentMission.questions || []).forEach((q, i) => {
      doc += `Tanya ${i+1}: ${q}\nJawab: ${answers[i] || "-"}\n\n`;
    });
    try {
      await onComplete(doc);
      showSuccess("Pekerjaan di LKM terkirim!");
    } catch (e) {}
    setIsSubmitting(false);
  };

  // --- 6. RENDER (PREMIUM & STABLE) ---
  if (!hasGroupRow) {
    return (
      <div className="bg-white border-4 border-dashed border-slate-50 p-20 rounded-[4rem] text-center mt-12 animate-in pulse duration-2000">
         <span className="material-symbols-outlined text-7xl text-slate-100 mb-6 font-black">groups</span>
         <h3 className="text-2xl font-black text-slate-300 mb-2 uppercase tracking-tighter">Kelompok Belum Siap</h3>
         <p className="text-slate-400 text-sm font-medium">Tutor sedang meramu strategi kelompok. Mohon tunggu sebentar ya.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 pb-24 text-left">
      {successMsg && (
        <div className="fixed top-12 right-12 z-[200] bg-black text-white px-10 py-6 rounded-[2.5rem] shadow-2xl flex items-center gap-5 border border-white/10 animate-in slide-in-from-right-20">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
          <p className="font-black text-[11px] uppercase tracking-[0.2em]">{successMsg}</p>
        </div>
      )}

      {/* LUXURY HEADER */}
      <div className="bg-gradient-to-br from-[#022c22] via-[#064e3b] to-black text-white p-12 md:p-16 rounded-[4rem] relative overflow-hidden shadow-2xl mt-10">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14">
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2.5xl backdrop-blur-3xl flex items-center gap-4">
                 <span className="material-symbols-outlined text-yellow-400 text-xl font-bold">workspace_premium</span>
                 <p className="font-black text-[12px] uppercase tracking-[0.2em]">KELOMPOK {activeGroupNum}</p>
              </div>
              <div className="flex bg-black/40 p-2 rounded-3xl border border-white/5 backdrop-blur-2xl shadow-inner">
                 <button onClick={() => setActiveTab('MY_LKM')} className={`px-8 py-4 rounded-2.5xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'MY_LKM' ? 'bg-white text-teal-950 shadow-2xl' : 'text-teal-200/40 hover:text-white'}`}>DRAFT</button>
                 <button onClick={() => setActiveTab('FORUM')} className={`px-8 py-4 rounded-2.5xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'FORUM' ? 'bg-white text-teal-950 shadow-2xl' : 'text-teal-200/40 hover:text-white'}`}>FORUM <span className="ml-2 bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-[8px]">{allForumPosts.length}</span></button>
                 <button onClick={() => setActiveTab('GRAFIK')} className={`px-8 py-4 rounded-2.5xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'GRAFIK' ? 'bg-white text-teal-950 shadow-2xl' : 'text-teal-200/40 hover:text-white'}`}>GRAFIK</button>
              </div>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-6">{currentMission.title}</h1>
           <p className="text-teal-100/40 text-sm md:text-md font-medium max-w-2xl leading-relaxed">{currentMission.description}</p>
        </div>
      </div>

      {activeTab === 'MY_LKM' && (
        <div className="bg-white rounded-[4.5rem] border border-slate-50 shadow-2xl p-10 md:p-16">
          <div className="space-y-16">
            {(currentMission.questions || []).map((q, idx) => {
              const shared = allForumPosts.some(p => p?.student_email === user.email && p?.parsed?.questionIndex === idx);
              return (
                <div key={idx} className="group relative">
                  <div className="flex gap-8 items-start mb-8">
                    <div className="w-14 h-14 bg-slate-900 text-teal-400 rounded-3xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-teal-900/20 shrink-0">{idx + 1}</div>
                    <p className="font-black text-slate-800 text-xl md:text-2xl pt-2 flex-1 tracking-tight leading-tight">{q}</p>
                  </div>
                  <textarea
                    value={answers[idx] || ""}
                    onChange={(e) => setAnswers({...answers, [idx]: e.target.value})}
                    placeholder="Tuangkan hasil kolaborasi di sini..."
                    className="w-full min-h-[220px] bg-slate-50 border border-slate-100 rounded-[3rem] p-10 text-lg md:text-xl font-medium outline-none focus:bg-white focus:border-teal-500 focus:shadow-2xl focus:shadow-teal-500/10 transition-all resize-y"
                  />
                  <div className="mt-6 flex items-center justify-between px-2">
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-3 italic"><div className="w-2 h-2 bg-slate-100 rounded-full"></div> Materi Terenkripsi</span>
                     <button onClick={() => handleShare(idx, q, answers[idx])} disabled={shared || !answers[idx] || answers[idx].length < 5 || loadingAction.type === 'share'} className={`px-10 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.1em] transition-all flex items-center gap-4 ${shared ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-teal-950 text-white hover:bg-black shadow-2xl hover:scale-105 active:scale-95'}`}>
                        {shared ? <><span className="material-symbols-outlined text-[20px]">check_circle</span> TERBAGIKAN</> : <><span className="material-symbols-outlined text-[20px]">share</span> SHARE KE FORUM</>}
                     </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-24 pt-20 border-t border-slate-50 text-center flex flex-col items-center">
             <button onClick={handleFinalSubmit} disabled={isSubmitting} className="bg-black text-white px-20 py-7 rounded-[3rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-90 transition-all">
                {isSubmitting ? "MENGIRIM..." : "SELESAI & KIRIM LKM"}
             </button>
             <p className="mt-8 text-[11px] font-bold text-slate-300 uppercase tracking-widest italic">Periksa kembali jawaban Anda sebelum mengirim ya!</p>
          </div>
        </div>
      )}

      {activeTab === 'FORUM' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-5 duration-700">
          <div className="bg-teal-950 text-white p-14 rounded-[4rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="text-center md:text-left">
                <h3 className="text-4xl font-black mb-3 italic tracking-tighter uppercase">Community Forum 🌍</h3>
                <p className="text-teal-100/30 text-sm font-medium">Bahas strategi dengan teman dan raih skor keaktifan maksimal!</p>
             </div>
             <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-2xl text-center min-w-[200px]">
                <p className="text-5xl font-black mb-1">{allForumPosts.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Diskusi Aktif</p>
             </div>
          </div>

          {allForumPosts.length === 0 ? (
            <div className="p-32 text-center bg-white rounded-[4.5rem] border border-slate-50 text-slate-200 italic font-black text-2xl uppercase tracking-tighter">Diam itu Emas, Tapi Bicara itu Nilai! 💎</div>
          ) : allForumPosts.map((post) => {
            const cms = allComments.filter(c => c.parsed.targetId === post.id);
            return (
              <div key={post.id} className="bg-white rounded-[4rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 group">
                 <div className="p-10 bg-slate-50/40 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-teal-900 text-teal-400 rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-xl">{getSafeName(post.student_email).charAt(0)}</div>
                       <div><p className="font-black text-slate-800 text-sm uppercase leading-none mb-1">{getSafeName(post.student_email)}</p><p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">TIM {post.parsed.groupNum}</p></div>
                    </div>
                    <time className="text-[10px] font-black text-teal-500 uppercase tracking-widest">{new Date(post.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</time>
                 </div>
                 <div className="p-12 md:p-14">
                    <div className="bg-white border-2 border-slate-50 p-10 rounded-[2.5rem] mb-12 shadow-inner">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 italic opacity-70">Topik: "{post.parsed.questionText}"</p>
                       <p className="text-xl text-slate-700 font-medium leading-relaxed italic">"{post.parsed.answerText}"</p>
                    </div>
                    <div className="space-y-5 max-w-3xl ml-auto">
                       {cms.map((cm, ci) => (
                         <div key={ci} className="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                            <p className="text-[10px] font-black text-slate-800 uppercase mb-2 leading-none">{getSafeName(cm.student_email)}</p>
                            <p className="text-sm text-slate-500 font-medium">{cm.parsed.comment}</p>
                         </div>
                       ))}
                       <div className="flex gap-4 items-center pt-6">
                          <input id={`cfg-${post.id}`} placeholder="Tanggapi..." className="flex-1 bg-slate-50 border border-slate-200 rounded-2.5xl px-8 py-5 text-sm outline-none focus:bg-white focus:border-teal-500 transition-all shadow-inner" />
                          <button onClick={() => { const el = document.getElementById(`cfg-${post.id}`); handleComment(post.id, el.value); el.value=''; }} className="w-16 h-16 bg-black text-white rounded-2.5xl flex items-center justify-center shadow-2xl hover:bg-teal-600 transition-all"><span className="material-symbols-outlined">send</span></button>
                       </div>
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'GRAFIK' && (
        <div className="animate-in zoom-in-95 duration-700">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
              <div className="bg-white p-16 rounded-[4.5rem] shadow-sm border border-slate-100 text-center"><p className="text-8xl font-black text-teal-600 mb-3">{myStats.posts}</p><p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Sharing</p></div>
              <div className="bg-white p-16 rounded-[4.5rem] shadow-sm border border-slate-100 text-center"><p className="text-8xl font-black text-violet-600 mb-3">{myStats.comms}</p><p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Ulasan</p></div>
              <div className="bg-[#022c22] text-white p-16 rounded-[4.5rem] shadow-2xl text-center flex flex-col items-center justify-center relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 blur-3xl rounded-full scale-150 group-hover:scale-100 transition-all duration-1000"></div>
                 <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30 mb-4">Rank</p>
                 <h4 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4 italic">{myStats.badge}</h4>
                 <div className="w-12 h-1.5 bg-yellow-400 rounded-full shadow-lg"></div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
