import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { STUDENTS } from '../data/students';

/**
 * LkpdClass5A - FIX VERSION: NO MORE MULTIPLE CHOICE
 * Strictly for Discussion & Forum Sharing
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

  const STORAGE_KEY = `lkpd_5a_v3_draft_${user.email}_${meetingId}`;

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // 1. Group Logic
  const groupRow = (initialSubmissions || []).find(
    (s) => s.student_email === "SYSTEM_GROUP" && String(s.meeting_num) === String(meetingId) && String(s.class_id) === "4"
  );
  const allGroups = groupRow ? JSON.parse(groupRow.content) : [];
  const myGroup = allGroups.find(g => g.members.some(m => m.email === user.email));
  const activeGroupNum = myGroup ? myGroup.group_num : 1;

  // 2. Mission Logic (Strictly Discussion-based)
  const currentMission = useMemo(() => {
    // If we have propMissions (from Sesi 2 Strategi)
    if (propMissions && (lkmConfig.type === "GROUP_DISCUSSION" || lkmConfig.type === "Interactive")) {
      const groupData = propMissions[activeGroupNum];
      if (groupData) return groupData;
    }
    
    // Emergency Fallback to Mission Group 5 if data is missing or wrong meeting mapped
    return {
      title: "Strategi Pembelajaran Kelompok",
      subtitle: `Tugas Diskusi Kelompok ${activeGroupNum}`,
      icon: "groups",
      description: "Diskusikan hakikat dan prinsip model pembelajaran yang ditugaskan kepada kelompok Anda.",
      questions: ["Materi belum termapping sempurna. Harap refresh atau hubungi Tutor."]
    };
  }, [propMissions, activeGroupNum, lkmConfig]);

  // 3. Draft Sync
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setAnswers(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, [meetingId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  // 4. Forum Processing
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

  // Stats for the "Grafik" Tab
  const myStats = useMemo(() => {
    const pCount = allForumPosts.filter(p => p.student_email === user.email).length;
    const cCount = allComments.filter(c => c.student_email === user.email).length;
    return { 
      posts: pCount, 
      comments: cCount, 
      total: pCount + cCount,
      badge: pCount >= 2 && cCount >= 2 ? "Strategist Sejati" : pCount >= 1 ? "Aktif" : "Pemula"
    };
  }, [allForumPosts, allComments, user.email]);

  const getStudentName = (email) => {
    const st = STUDENTS.find(s => s.email === email);
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
      showSuccess('✅ Jawaban Anda kini tersedia di Forum Diskusi!');
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
    let finalDoc = `LEMBAR KERJA MAHASISWA (LKM) - STRATEGI PEMBELAJARAN\nTopik: ${currentMission.title}\nKelompok: ${activeGroupNum}\n\n`;
    (currentMission.questions || []).forEach((q, i) => {
       finalDoc += `Q${i+1}: ${q}\nJ: ${answers[i] || "-"}\n\n`;
    });
    try {
      await onComplete(finalDoc);
      showSuccess('🏆 LKM Strategi berhasil terkirim!');
    } catch (e) { console.error(e); }
    setIsSubmitting(false);
  };

  if (!groupRow) {
    return <div className="p-20 text-center bg-slate-50 border-2 border-dashed rounded-[3rem] mt-10">
      <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 animate-bounce">group_work</span>
      <h3 className="text-xl font-bold text-slate-700">Menunggu Tutor membagi Kelompok...</h3>
    </div>;
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20 text-left">
      
      {successMsg && (
        <div className="fixed top-8 right-8 z-[100] bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 border border-white/10">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <p className="font-black text-xs uppercase tracking-widest">{successMsg}</p>
        </div>
      )}

      {/* HEADER 6A STYLE */}
      <div className="bg-gradient-to-br from-teal-950 via-teal-900 to-black text-white p-10 md:p-14 rounded-[3.5rem] relative overflow-hidden shadow-2xl mt-12">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[160px]">architecture</span>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3">
              <span className="material-symbols-outlined text-yellow-400">military_tech</span>
              <span className="text-[10px] font-black uppercase tracking-widest">TIM STRATEGI {activeGroupNum}</span>
            </div>
            <div className="flex bg-black/40 p-1.5 rounded-2.5xl backdrop-blur-md border border-white/5">
              <button onClick={() => setActiveTab('MY_LKM')} className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'MY_LKM' ? 'bg-white text-teal-900 shadow-xl' : 'text-teal-200/40 hover:text-white'}`}>DRAFT LKM</button>
              <button onClick={() => setActiveTab('FORUM')} className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'FORUM' ? 'bg-white text-teal-900 shadow-xl' : 'text-teal-200/40 hover:text-white'}`}>FORUM DISKUSI <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-[8px]">{allForumPosts.length}</span></button>
              <button onClick={() => setActiveTab('GRAFIK')} className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'GRAFIK' ? 'bg-white text-teal-900 shadow-xl' : 'text-teal-200/40 hover:text-white'}`}>GRAFIK AKTIVITAS</button>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none mb-4">{currentMission.title}</h1>
          <p className="text-teal-100/50 text-sm font-medium max-w-xl">{currentMission.description}</p>
        </div>
      </div>

      {activeTab === 'MY_LKM' && (
        <div className="bg-white border border-slate-100 rounded-[3.5rem] shadow-xl p-10 md:p-14">
          <div className="flex items-center gap-5 mb-14">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-[1.5rem] flex items-center justify-center shadow-inner"><span className="material-symbols-outlined text-3xl font-black">{currentMission.icon || 'quiz'}</span></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Misi Kelompok {activeGroupNum}</p>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{currentMission.title}</h2>
            </div>
          </div>

          <div className="space-y-12">
            {(currentMission.questions || []).map((q, idx) => {
              const isShared = allForumPosts.some(p => p.student_email === user.email && p.parsed.questionIndex === idx);
              return (
                <div key={idx} className="relative group">
                  <div className="flex gap-6 items-start mb-6">
                    <div className="w-12 h-12 bg-slate-900 text-teal-400 rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shadow-teal-900/10 shrink-0">{idx + 1}</div>
                    <p className="font-bold text-slate-800 text-lg leading-relaxed pt-1 flex-1">{q}</p>
                  </div>
                  <textarea
                    value={answers[idx] || ""}
                    onChange={(e) => setAnswers({...answers, [idx]: e.target.value})}
                    placeholder="Tuangkan hasil diskusi kelompok Anda di sini..."
                    className="w-full min-h-[180px] bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-base md:text-lg font-medium outline-none focus:bg-white focus:border-teal-500 focus:shadow-2xl transition-all resize-y"
                  />
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Tersimpan di Browser</span>
                    <button 
                      onClick={() => handleShare(idx, q, answers[idx])} 
                      disabled={isShared || !answers[idx] || answers[idx].length < 5}
                      className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase transition-all flex items-center gap-2 ${isShared ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default" : "bg-teal-900 text-white hover:bg-black shadow-xl"}`}
                    >
                      {isShared ? <><span className="material-symbols-outlined !text-[16px]">public</span> TAYANG DI FORUM</> : <><span className="material-symbols-outlined !text-[16px]">share</span> BAGIKAN KE FORUM</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-20 pt-14 border-t border-slate-50 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-6 shadow-inner"><span className="material-symbols-outlined text-[48px]">verified</span></div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 uppercase tracking-tight">Kirim Jawaban Final?</h3>
            <p className="text-slate-400 text-sm font-medium mb-10 max-w-sm">Setelah Kakak yakin, kirim hasil diskusi ini ke Tutor untuk penilaian final mata kuliah ini.</p>
            <button onClick={handleFinalSubmit} disabled={isSubmitting} className="bg-gradient-to-r from-teal-950 to-black text-white px-14 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.03] transition-all bg-[length:200%_auto] hover:bg-right active:scale-95">
              {isSubmitting ? "MENGIRIM..." : "KIRIM SEKARANG"}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'FORUM' && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-teal-500 opacity-5 rounded-full blur-[80px]"></div>
            <h3 className="text-3xl font-black mb-3 flex items-center gap-4"><span className="material-symbols-outlined text-yellow-400">hub</span> Global Discussion Hub</h3>
            <p className="text-slate-400 text-sm font-medium">Beri masukan atau tanya jawab strategi dngan kelompok lain dika dika dika Forum Kelas 5A.</p>
          </div>
          
          {allForumPosts.length === 0 ? (
            <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-100 text-slate-400 italic font-medium">Belum ada strategi yang dibagikan. Jadilah tim pertama!</div>
          ) : allForumPosts.map((post) => {
            const hasDrafted = (answers[post.parsed.questionIndex] || "").length > 0;
            const comments = allComments.filter(c => c.parsed.targetId === post.id);
            return (
              <div key={post.id} className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all group">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-900 text-teal-400 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">{getStudentName(post.student_email).charAt(0)}</div>
                    <div><p className="font-black text-slate-800 text-xs leading-none mb-1 uppercase">{getStudentName(post.student_email)}</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">TIM {post.parsed.groupNum}</p></div>
                  </div>
                  <span className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-[9px] font-black text-teal-600 uppercase tracking-widest">{post.parsed.title}</span>
                </div>
                <div className="p-10">
                   <div className="bg-teal-50/30 border-l-4 border-teal-500 p-8 rounded-2xl mb-10">
                      <p className="text-[9px] font-black text-teal-600 uppercase tracking-widest mb-4">PERTANYAAN: "{post.parsed.questionText}"</p>
                      <p className="text-lg text-slate-700 italic font-medium leading-relaxed">"{post.parsed.answerText}"</p>
                   </div>
                   
                   <div className="space-y-4">
                      {comments.map((c, ci) => (
                        <div key={ci} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group/comm animate-in fade-in slide-in-from-left-2 duration-300">
                           <p className="text-[9px] font-black text-slate-800 uppercase mb-1">{getStudentName(c.student_email)}</p>
                           <p className="text-xs text-slate-500 font-medium">{c.parsed.comment}</p>
                        </div>
                      ))}
                      <div className="flex gap-4 items-center pt-4">
                        <input id={`c-${post.id}`} placeholder="Tulis masukan untuk kelompok ini..." className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:bg-white focus:border-teal-500 transition-all font-medium" />
                        <button onClick={() => { const el = document.getElementById(`c-${post.id}`); handleComment(post.id, el.value); el.value = ''; }} className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-emerald-600 transition-colors"><span className="material-symbols-outlined text-[20px]">send</span></button>
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
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
               <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 text-center"><p className="text-6xl font-black text-teal-600 mb-1">{myStats.posts}</p><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Post Forum</p></div>
               <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 text-center"><p className="text-6xl font-black text-violet-600 mb-1">{myStats.comments}</p><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Komentar Balik</p></div>
               <div className="bg-teal-900 text-white p-10 rounded-[3.5rem] shadow-2xl text-center flex flex-col items-center justify-center">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 leading-none">Status Rank</p>
                  <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-3">{myStats.badge}</h4>
                  <div className="w-8 h-1 bg-yellow-400 rounded-full"></div>
               </div>
           </div>
           
           <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-xl border border-slate-100">
              <h3 className="text-3xl font-black text-slate-800 mb-14 flex items-center gap-6 leading-none"><span className="w-3 h-14 bg-emerald-500 rounded-full shadow-lg"></span> Monitoring Aktivitas Kolaboratif</h3>
              <div className="space-y-14">
                 <div className="space-y-5">
                    <div className="flex justify-between items-end px-2"><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Sharing Strategi (Target: 2)</p><span className="text-lg font-black text-teal-600">{myStats.posts} / 2</span></div>
                    <div className="h-5 bg-slate-50 rounded-full p-1.5 border border-slate-100 shadow-inner"><div className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full shadow-lg transition-all duration-1000 ease-out" style={{ width: `${Math.min(100, (myStats.posts / 2) * 100)}%` }}></div></div>
                 </div>
                 <div className="space-y-5">
                    <div className="flex justify-between items-end px-2"><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Diskusi Peer Review (Target: 2)</p><span className="text-lg font-black text-violet-600">{myStats.comments} / 2</span></div>
                    <div className="h-5 bg-slate-50 rounded-full p-1.5 border border-slate-100 shadow-inner"><div className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full shadow-lg transition-all duration-1000 ease-out" style={{ width: `${Math.min(100, (myStats.comments / 2) * 100)}%` }}></div></div>
                 </div>
              </div>
              <div className="mt-16 bg-teal-50/50 p-8 rounded-[2.5rem] border border-teal-100 flex items-start gap-6">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-md shrink-0"><span className="material-symbols-outlined text-3xl">emoji_objects</span></div>
                 <p className="text-sm font-medium text-teal-800 leading-relaxed px-2">Tips Utama: Semakin tinggi aktivitas Kakak dika dika dika Forum, semakin tinggi peluang untuk mendapatkan skor keaktifan maksimal dika Tutorial ini. Yuk raih badge <span className="font-black text-teal-950 uppercase tracking-tighter">Strategist Sejati</span> dangan aktif berdiskusi!</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
