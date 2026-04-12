import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Ensure this path is correct

const MODUL_1_QUESTIONS = [
  "Pengertian Hakikat Perkembangan Anak yang Bersifat Nonnormatif",
  "Penjelasan Kelainan/Abnormal: Model Medis (Medical Model)",
  "Penjelasan Kelainan/Abnormal: Penyimpangan dari Rata-rata",
  "Penjelasan Kelainan/Abnormal: Penyimpangan dari Ideal",
  "Ciri-ciri Anak dengan Perkembangan Nonnormatif",
  "Faktor yang Memengaruhi: Cetak Biru Biologis",
  "Faktor yang Memengaruhi: Genetik atau Lingkungan",
  "Faktor yang Memengaruhi: Konteks Sosial",
  "Cara Identifikasi dan Penanganan: Wawancara",
  "Cara Identifikasi dan Penanganan: Kuesioner",
  "Cara Identifikasi dan Penanganan: Observasi"
];

const MODUL_2_QUESTIONS = [
  "Batasan Cerebral Palsy",
  "Tipe-tipe Cerebral Palsy",
  "Karakteristik Anak dengan Cerebral Palsy",
  "Strategi Penanganan Anak dengan Cerebral Palsy",
  "Pengertian Anak yang Rentan Sakit",
  "Penyakit yang Umum Diderita Anak: Karakteristik Anak dan Penanganannya"
];

const MODUL_3_QUESTIONS = [
  "Batasan dan Penggolongan Gangguan Pendengaran",
  "Identifikasi Anak dengan Gangguan Pendengaran",
  "Karakteristik Anak dengan Gangguan Pendengaran",
  "Strategi Penanganan Anak dengan Gangguan Pendengaran",
  "Batasan Gangguan Penglihatan",
  "Identifikasi Anak dengan Gangguan Penglihatan",
  "Karakteristik Anak dengan Gangguan Penglihatan",
  "Strategi Penanganan Anak dengan Gangguan Penglihatan"
];

export const LkpdClass6A = ({
  user,
  meetingId,
  submissions: initialSubmissions,
  classId
}) => {
  const [liveData, setLiveData] = useState([]);
  const [formData, setFormData] = useState({});
  const [loadingItems, setLoadingItems] = useState({});
  const [syncStatus, setSyncStatus] = useState({}); // 'draft', 'syncing', 'saved', 'error'
  const [commentInputs, setCommentInputs] = useState({});

  const STORAGE_KEY = `lkpd_draft_${user.email}_${meetingId}`;

  // 1. Load Draft from LocalStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, [meetingId]);

  // Save to LocalStorage whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  // 1. Dapatkan Grup & Ketua
  const groupRow = initialSubmissions.find(
    (s) => s.student_email === "SYSTEM_GROUP" && String(s.meeting_num) === String(meetingId)
  );
  const allGroups = groupRow ? JSON.parse(groupRow.content) : [];
  const myGroup = allGroups.find(g => g.members.some(m => m.email === user.email));
  const activeGroupNum = myGroup ? myGroup.group_num : 1;
  const isLeader = myGroup 
    ? myGroup.members.find(m => m.email === user.email)?.isLeader === true 
    : user.email === "demo@ecampus.ut.ac.id"; // demo is leader of group 1

  const currentQuestions = activeGroupNum === 1 ? MODUL_1_QUESTIONS : activeGroupNum === 2 ? MODUL_2_QUESTIONS : MODUL_3_QUESTIONS;

  // 2. Local fetcher for Discussion
  const fetchLiveDiscussions = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('class_id', classId || '3')
        .eq('meeting_num', meetingId)
        .in('section_name', ['LKPD_6A_DISCUSSION']);
      if (data) setLiveData(data);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLiveDiscussions();
    const interval = setInterval(fetchLiveDiscussions, 10000); // auto refresh every 10s
    return () => clearInterval(interval);
  }, [meetingId, classId]);

  if (!groupRow || allGroups.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 p-10 rounded-[2.5rem] text-center mt-10">
         <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 animate-bounce">group_add</span>
         <h3 className="font-black text-xl text-slate-800 mb-2">Tutor Belum Membagi Kelompok</h3>
         <p className="text-slate-500 font-medium text-sm">Harap tunggu sampai Tutor Anda mengacak kelompok untuk sesi pertemuan ini sebelum dapat memulai Misi Pencarian Materi LKPD Anda.</p>
      </div>
    );
  }

  // --- Handlers ---
  const handlePostAnswer = async (questionText, qIdx) => {
    const val = formData[questionText];
    if (!val || val.trim().length === 0) return;
    
    setSyncStatus(prev => ({...prev, [questionText]: 'syncing'}));
    
    const payload = {
      student_email: user.email,
      class_id: String(classId || '3'),
      meeting_num: String(meetingId),
      section_name: 'LKPD_6A_DISCUSSION',
      content: JSON.stringify({
        type: 'answer',
        groupNum: activeGroupNum,
        questionId: questionText,
        text: val,
        authorName: user.name || user.email.split('@')[0],
        timestamp: new Date().toISOString()
      })
    };

    try {
      // Check if already posted by this group for this question
      const existing = liveData.find(d => {
         try {
            const p = JSON.parse(d.content);
            return p.type === 'answer' && p.groupNum === activeGroupNum && p.questionId === questionText;
         } catch(e){return false;}
      });

      if (existing) {
         await supabase.from('submissions').update({content: payload.content}).eq('id', existing.id);
      } else {
         await supabase.from('submissions').insert([payload]);
      }
      
      setSyncStatus(prev => ({...prev, [questionText]: 'saved'}));
      await fetchLiveDiscussions();
    } catch(err) {
      console.error(err);
      setSyncStatus(prev => ({...prev, [questionText]: 'error'}));
      alert("Gagal mem-posting ke server. Jangan khawatir, jawaban Anda tetap tersimpan di browser ini (Draft). Silakan coba klik SIMPAN lagi.");
    } finally {
      setLoadingItems(prev => ({...prev, [questionText]: false}));
    }
  };

  const handlePostComment = async (targetGroupNum, questionId) => {
    const key = `${targetGroupNum}_${questionId}`;
    const txt = commentInputs[key];
    if (!txt || txt.trim().length === 0) return;

    const payload = {
      student_email: user.email,
      class_id: classId || '3',
      meeting_num: meetingId,
      section_name: 'LKPD_6A_DISCUSSION',
      content: JSON.stringify({
        type: 'comment',
        targetGroupNum: targetGroupNum,
        questionId: questionId,
        text: txt,
        authorName: user.name || user.email.split('@')[0],
        authorGroup: activeGroupNum || 0,
        timestamp: new Date().toISOString()
      })
    };

    try {
      await supabase.from('submissions').insert([payload]);
      setCommentInputs({...commentInputs, [key]: ''});
      await fetchLiveDiscussions();
    } catch (e) {
      alert("Gagal mengirim komentar.");
    }
  };

  // --- Rendering Helpers ---
  // Get all parsed data
  const parsedData = liveData.map(d => {
    try { return { ...d, _p: JSON.parse(d.content) } } 
    catch(e) { return null }
  }).filter(Boolean);

  const getMyAnswerText = (groupNum, questionId) => {
     const ansRow = parsedData.find(d => d._p.type === 'answer' && d._p.groupNum === groupNum && d._p.questionId === questionId && d.student_email === user.email);
     return ansRow ? ansRow._p.text : null;
  };

  const getLeaderAnswerText = (groupNum, questionId) => {
     const g = allGroups.find(x => x.group_num === groupNum);
     if (!g) return null;
     const leader = g.members.find(m => m.isLeader);
     const leaderEmail = leader ? leader.email : null;

     const ansRow = parsedData.find(d => d._p.type === 'answer' && d._p.groupNum === groupNum && d._p.questionId === questionId && d.student_email === leaderEmail);
     return ansRow ? ansRow._p.text : null;
  };

  const getComments = (groupNum, questionId) => {
     return parsedData.filter(d => d._p.type === 'comment' && d._p.targetGroupNum === groupNum && d._p.questionId === questionId)
                      .sort((a,b) => new Date(a._p.timestamp) - new Date(b._p.timestamp));
  };


  return (
    <div className="space-y-8 md:space-y-12 pb-10">
      
      {/* HEADER INFO */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border-b-8 border-b-yellow-400 mt-8">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
         <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div>
              <h1 className="font-headline font-black text-2xl md:text-4xl mb-3 tracking-tight leading-tight">Misi Kelompok {activeGroupNum} (Modul {activeGroupNum})</h1>
              <p className="text-slate-400 text-xs md:text-sm font-medium max-w-2xl leading-relaxed mb-6">
                Ini adalah ruang diskusi terpadu. Semua anggota <span className="font-bold text-white">wajib mengisi seluruh poin materi</span> di bawah ini sebagai tugas individu. Namun, <span className="text-yellow-400 font-black">HANYA JAWABAN KETUA</span> yang akan dipublikasikan ke Pusat Data untuk didiskusikan lintas kelompok.
              </p>
              <div className="inline-flex flex-wrap items-center gap-3 bg-white bg-opacity-10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white border-opacity-10">
                <span className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-slate-900 shrink-0 text-xl">
                    {activeGroupNum}
                </span>
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Role / Jabatan Anda</p>
                    <p className="font-bold text-xs flex items-center gap-1">
                      {isLeader ? <><span className="material-symbols-outlined text-sm text-yellow-400">workspace_premium</span> Ketua Kelompok {activeGroupNum}</> : `Anggota Kelompok ${activeGroupNum}`}
                    </p>
                </div>
              </div>
            </div>
            {!isLeader && (
              <div className="bg-slate-800 bg-opacity-50 border border-slate-700 px-5 py-4 rounded-2xl w-full md:w-auto">
                 <p className="text-slate-300 font-bold mb-1 text-sm"><span className="material-symbols-outlined text-sm inline-block translate-y-0.5">info</span> Info Tayangan Publik</p>
                 <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">Tugas Anda hanya dinilai oleh Tutor. Hanya Jawaban Ketua Kelompok yang akan rilis ke tayangan publik.</p>
              </div>
            )}
         </div>
      </div>

      {/* TUGAS UTAMA (Hanya Ketua yang bisa isi) */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 shadow-opacity-40 p-5 md:p-8 border border-slate-100 relative">
        <div className={`absolute top-0 left-0 w-2 h-full rounded-l-3xl ${activeGroupNum === 1 ? 'bg-indigo-500' : activeGroupNum === 2 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
        <div className="mb-6 flex justify-between items-center">
            <h3 className="font-black text-xl text-slate-800">Draft Pengerjaan Topik Modul {activeGroupNum}</h3>
            {isLeader ? (
               <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full animate-pulse flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">public</span> Jawaban Anda Akan Tayang ke Publik</span>
            ) : (
               <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full flex items-center gap-1">Tugas Pribadi (Privat)</span>
            )}
        </div>
        
        <div className="space-y-6">
            {currentQuestions.map((questionText, idx) => {
               const savedAnswer = getMyAnswerText(activeGroupNum, questionText);
               const status = syncStatus[questionText] || (savedAnswer ? 'saved' : 'none');

               return (
                <div key={idx} className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100 relative group transition-all hover:shadow-md">
                  <label className="block text-xs md:text-sm font-bold text-slate-800 mb-3 leading-snug flex items-center gap-2">
                    <span className="inline-block bg-white text-slate-500 px-2.5 py-1 rounded-lg text-[10px] font-black border border-slate-200">{idx+1}</span>
                    {questionText}
                  </label>

                  <div className="relative">
                    <textarea
                      value={formData[questionText] || savedAnswer || ""}
                      onChange={(e) => {
                        setFormData({ ...formData, [questionText]: e.target.value });
                        setSyncStatus({ ...syncStatus, [questionText]: 'draft' });
                      }}
                      placeholder="Tuliskan hasil temuan materi Anda di sini..."
                      className={`w-full min-h-[160px] p-5 rounded-2xl border transition-all resize-none text-slate-700 text-sm md:text-base leading-relaxed font-medium outline-none ${
                        status === 'error' ? 'border-rose-300 bg-rose-50' : 
                        status === 'saved' ? 'border-emerald-100 bg-white' : 
                        'border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                      }`}
                    ></textarea>
                    
                    {/* Status Indicators overlay */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                       {status === 'draft' && (
                         <span className="flex items-center gap-1 text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-md border border-slate-200 animate-pulse">
                            <span className="material-symbols-outlined text-[12px]">edit_note</span> DRAFT DI BROWSER
                         </span>
                       )}
                       {status === 'syncing' && (
                         <span className="flex items-center gap-1 text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                            <span className="material-symbols-outlined text-[12px] animate-spin">sync</span> SEDANG MENGIRIM...
                         </span>
                       )}
                       {status === 'saved' && (
                         <span className="flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                            <span className="material-symbols-outlined text-[12px]">check_circle</span> TERSEDIA DI SERVER
                         </span>
                       )}
                       {status === 'error' && (
                         <span className="flex items-center gap-1 text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-100 shadow-sm">
                            <span className="material-symbols-outlined text-[12px]">error</span> GAGAL SIMPAN
                         </span>
                       )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end items-center gap-4">
                    {status === 'error' && (
                       <p className="text-[10px] font-bold text-rose-500 animate-bounce">Tulisannya aman (ada di browser), silakan klik SIMPAN lagi ↑</p>
                    )}
                    <button
                      onClick={() => handlePostAnswer(questionText, idx)}
                      disabled={loadingItems[questionText] || status === 'syncing'}
                      className={`px-8 py-2.5 rounded-xl font-black text-[10px] tracking-widest flex items-center gap-2 transform active:scale-95 transition-all shadow-md group-hover:shadow-lg ${
                        status === 'saved' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200' 
                        : status === 'error'
                        ? 'bg-rose-600 text-white hover:bg-rose-700'
                        : 'bg-slate-900 text-white hover:bg-black'
                      }`}
                    >
                      {status === 'syncing' ? "SEDANG MENGIRIM..." : status === 'saved' ? "PERBARUI JAWABAN" : "SIMPAN KE SERVER"}
                      <span className="material-symbols-outlined text-sm font-black">
                        {status === 'saved' ? 'verified' : 'cloud_upload'}
                      </span>
                    </button>
                  </div>
                </div>
            )})}
        </div>
      </div>

      {/* GALLERY OF DISCUSSIONS (INTERACTIVE THREAD) */}
      <div className="bg-indigo-50 bg-opacity-50 border border-indigo-100 rounded-[2.5rem] p-5 md:p-10 mt-16 shadow-inner">
         <div className="text-center mb-10 md:mb-12">
            <h2 className="font-headline font-black text-2xl md:text-3xl text-indigo-900 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-3">
               <span className="material-symbols-outlined text-4xl text-indigo-500 mb-2 md:mb-0">forum</span>
               Pusat Diskusi LKPD
            </h2>
            <p className="text-indigo-700 text-xs md:text-sm font-medium px-4">Ruang debat dan tanya jawab silang antar Modul 1, 2, dan 3.</p>
         </div>

         <div className="space-y-16">
            {[1, 2, 3].map(gNum => {
               const questionsArray = gNum === 1 ? MODUL_1_QUESTIONS : gNum === 2 ? MODUL_2_QUESTIONS : MODUL_3_QUESTIONS;
               const answersByThisGroup = parsedData.filter(d => d._p.type === 'answer' && d._p.groupNum === gNum);
               
               if (answersByThisGroup.length === 0) {
                  return (
                    <div key={gNum} className="text-center bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm opacity-60">
                       <h4 className="font-black text-indigo-800 text-lg mb-2">Modul {gNum} (Kelompok {gNum})</h4>
                       <p className="text-sm text-slate-400 font-medium ita">Kelompok ini belum mem-posting topik apapun ke panel diskusi.</p>
                    </div>
                  );
               }

               return (
                 <div key={gNum} className="space-y-6">
                    <div className="flex items-center gap-4 mb-2">
                       <span className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl font-black text-xl text-indigo-600 shadow-sm border border-indigo-100">M{gNum}</span>
                       <div>
                         <h3 className="font-black text-2xl text-slate-800">Materi Modul {gNum}</h3>
                         <p className="text-sm font-medium text-slate-500">Dipresentasikan oleh Kelompok {gNum}</p>
                       </div>
                    </div>
                    
                    {questionsArray.map((qText, qIdx) => {
                       const postContent = getLeaderAnswerText(gNum, qText);
                       if (!postContent) return null; // Skip if leader hasn't posted

                       const comments = getComments(gNum, qText);
                       const leaderNode = allGroups.find(x => x.group_num === gNum)?.members.find(m => m.isLeader);
                       const postAuthorName = leaderNode ? leaderNode.name : "Ketua Kelompok";

                       return (
                         <div key={qIdx} className="bg-white rounded-3xl border border-indigo-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
                            {/* LEFT SIDE: POST */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 bg-white md:border-r border-indigo-50 border-b md:border-b-0">
                               <div className="flex items-center gap-2 mb-4">
                                  <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-indigo-600">record_voice_over</span></span>
                                  <div>
                                     <p className="font-bold text-xs text-slate-800">{postAuthorName} <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider ml-1">Ketua Kel. {gNum}</span></p>
                                     <p className="text-[10px] text-slate-400 font-medium">Memposting Topik Utama</p>
                                  </div>
                               </div>
                               <h4 className="font-black text-sm text-indigo-900 mb-3 leading-snug break-words">{qText}</h4>
                               <p className="text-sm text-slate-600 font-serif leading-relaxed text-justify whitespace-pre-line">{postContent}</p>
                            </div>

                            {/* RIGHT SIDE: THREAD */}
                            <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col">
                               <p className="text-xs font-black uppercase text-slate-400 mb-4 tracking-widest flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">forum</span> Komentar & Diskusi ({comments.length})</p>
                               
                               <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[300px] custom-scrollbar pr-2">
                                  {comments.map((c, ci) => (
                                     <div key={ci} className={`p-4 rounded-2xl ${c._p.authorGroup === gNum ? 'bg-indigo-100 bg-opacity-50 ml-6 border border-indigo-200' : 'bg-white border border-slate-200 mr-6 shadow-sm'}`}>
                                        <div className="flex items-center gap-1.5 mb-1.5">
                                           <span className="material-symbols-outlined text-[14px] text-slate-400">person</span>
                                           <p className="text-[10px] font-bold text-slate-700">{c._p.authorName} <span className="font-medium opacity-60">(Kelompok {c._p.authorGroup})</span></p>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed font-serif break-words">{c._p.text}</p>
                                     </div>
                                  ))}
                                  {comments.length === 0 && <p className="text-[10px] font-bold italic text-slate-400 text-center py-6">Jadilah yang pertama mengkritisi presentasi ini...</p>}
                               </div>

                               <div className="flex gap-2">
                                  <input 
                                     type="text" 
                                     placeholder={`Tanggapi tulisan / tanya ke ketua kelompok ${gNum}...`}
                                     className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-indigo-500 focus:ring-1 outline-none"
                                     value={commentInputs[`${gNum}_${qText}`] || ""}
                                     onChange={e => setCommentInputs({...commentInputs, [`${gNum}_${qText}`]: e.target.value})}
                                     onKeyDown={e => e.key === 'Enter' && handlePostComment(gNum, qText)}
                                  />
                                  <button 
                                     onClick={() => handlePostComment(gNum, qText)}
                                     className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                                  >
                                     <span className="material-symbols-outlined text-[16px]">send</span>
                                  </button>
                               </div>
                            </div>
                         </div>
                       );
                    })}
                 </div>
               );
            })}
         </div>
      </div>

    </div>
  );
};
