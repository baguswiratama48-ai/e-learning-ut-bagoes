import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { STUDENTS } from '../data/students';

const TASKS = {
  1: {
    title: "Anak Dengan Gangguan Autism",
    questions: [
      "Pengertian Autism",
      "Sejarah autism",
      "Penyebab Autism",
      "Karakter utama anak dengan ganguan autism",
      "karakter tambahan anak dengan ganguan autism",
      "Strategi Anak dengan ganguan autism",
      "Pihak yang terlibat dalam penangan anak dengan ganguan autisme",
      "Penangan anak dengan ganguan autism oleh guru"
    ]
  },
  2: {
    title: "Anak Penyandang ADD/ADHD",
    questions: [
      "Pengertian ADD/ADHD",
      "Karakteristik anak dengan ADD/ADHD",
      "Penyebab ADD /ADHD",
      "Penangan Ganguan Prilaku ADD/ADHD",
      "Pihak Yang terlibat dalam penanganan anak penyandang ADD/ADHD"
    ]
  },
  3: {
    title: "Anak Penyandang ODD",
    questions: [
      "Pengertian gangguan Perilaku ODD",
      "Karakteristik anak dengan ganguan Prilaku ODD",
      "Penyebab gangguan Prilaku ODD",
      "Penanganan Ganguan Prilaku ODD",
      "Pihak yang berkaitan dengan penanganan anak penyandang ODD"
    ]
  },
  4: {
    title: "Anak Penyandang Intellectual Disability (ID)",
    questions: [
      "Pengertian Intellectual Disability",
      "Klasifikasi Intellectual Disability",
      "Karatkertistik anak dengan Intellectual Disability",
      "Penyebab ganguan Intellectual Disability",
      "Strategi penanganan anak dengan Intellectual Disability",
      "Pihak yang berperan dalam penanganan anak dengan Intellectual Disability"
    ]
  },
  5: {
    title: "Anak Dengan Down Syndrom (DS)",
    questions: [
      "Pengertian Down Syndrom",
      "Penyebab Down Syndrom",
      "Karateristik anak dengan Down Syndrom",
      "Strategi penanganan anak dengan Down Syndrom",
      "Pihak yang berperan dalam penanganan anak dengan Down Syndrom"
    ]
  }
};

export const LkpdClass6A = ({ user, classId, meetingId, submissions, onComplete, status, loading }) => {
  // Parsing group
  const groupRow = (submissions || []).find(s => s.student_email === "SYSTEM_GROUP" && s.section_name === "GENERATED_GROUPS" && String(s.meeting_num) === String(meetingId));
  const groupsData = groupRow ? JSON.parse(groupRow.content) : null;

  const myGroupInfo = useMemo(() => {
    if (!groupsData) return null;
    return groupsData.find(g => g.members.some(m => m.email === user.email));
  }, [groupsData, user.email]);

  const groupNumber = myGroupInfo ? myGroupInfo.group_num : 1;
  // Rotasi 5 tugas
  const taskKey = ((groupNumber - 1) % 5) + 1; 
  const currentTask = TASKS[taskKey];

  // Local Storage Draft ID
  const draftKey = `lkm_draft_6a_${user?.email}_${classId}_${meetingId}`;

  const [activeTab, setActiveTab] = useState("MY_LKM");
  const [answers, setAnswers] = useState(() => {
     const saved = localStorage.getItem(draftKey);
     if (saved) {
         try { return JSON.parse(saved); } catch(e) {}
     }
     return Array(currentTask.questions.length).fill("");
  });

  const [commentInputs, setCommentInputs] = useState({});
  const [loadingAction, setLoadingAction] = useState({ type: null, id: null });

  // State lokal untuk post & komentar baru — dikombinasikan dengan props submissions
  // sehingga setelah submit tidak perlu reload halaman dan tetap di tab FORUM
  const [localNewPosts, setLocalNewPosts] = useState([]);
  const [localNewComments, setLocalNewComments] = useState([]);

  // Tambah notifikasi sukses tanpa interrupt (ganti alert)
  const [successMsg, setSuccessMsg] = useState(null);
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Save to local storage automatically
  useEffect(() => {
     localStorage.setItem(draftKey, JSON.stringify(answers));
  }, [answers, draftKey]);

  // Validations: Minimal 5 soal untuk bisa submit (mengantisipasi tugas yang pendek)
  const answeredCount = answers.filter(a => a.trim().length >= 10).length;
  const isFormComplete = answeredCount >= Math.min(currentTask.questions.length, 5);
  const remainingRequired = Math.max(0, Math.min(currentTask.questions.length, 5) - answeredCount);

  // Gabungkan data dari props (submissions) + local new posts/comments
  // sehingga tampilan update langsung tanpa reload halaman
  const allForumPosts = useMemo(() => {
    const fromServer = (submissions || [])
      .filter(s => s.section_name === "LKM_6A_FORUM_POST")
      .map(p => { try { return { ...p, parsed: JSON.parse(p.content) }; } catch(e) { return {...p, parsed: {}};} });
    // Gabungkan dengan post baru dari local state
    const combined = [...localNewPosts, ...fromServer];
    // Deduplikasi berdasarkan id
    const seen = new Set();
    return combined.filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true; })
      .sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  }, [submissions, localNewPosts]);

  const allComments = useMemo(() => {
    const fromServer = (submissions || [])
      .filter(s => s.section_name === "LKM_6A_COMMENT")
      .map(c => { try { return { ...c, parsed: JSON.parse(c.content) }; } catch(e) { return {...c, parsed: {targetId: null, comment: ""}};} });
    // Gabungkan dengan komentar baru dari local state
    const combined = [...fromServer, ...localNewComments];
    const seen = new Set();
    return combined.filter(c => { if (seen.has(c.id)) return false; seen.add(c.id); return true; })
      .sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
  }, [submissions, localNewComments]);

  const getStudentProfile = (email) => {
    const student = STUDENTS.find(s => s.email === email);
    if (student) return { name: student.name, nim: student.nim };
    const parts = email.split('@')[0].split('.');
    return { name: parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '), nim: "N/A" };
  };

  const getStudentGroup = (email) => {
    if (!groupsData) return null;
    const g = groupsData.find(grp => grp.members.some(m => m.email === email));
    return g ? g.group_num : null;
  };

  const handleShareToForum = async (idx) => {
     const answerText = answers[idx];
     if(!answerText || answerText.trim().length < 10) return;
     
     setLoadingAction({ type: 'share', id: idx });
     try {
         const parsedContent = { 
             questionIndex: idx, 
             questionText: currentTask.questions[idx], 
             answerText: answerText,
             groupNum: groupNumber
         };
         const payload = {
            student_email: user.email,
            class_id: classId,
            meeting_num: meetingId,
            section_name: "LKM_6A_FORUM_POST",
            content: JSON.stringify(parsedContent)
         };
         const { data } = await supabase.from("submissions").insert([payload]).select();

         // Tambah ke local state agar langsung tampil tanpa reload
         const newPost = data?.[0] ?? {
           id: `local_${Date.now()}`,
           student_email: user.email,
           created_at: new Date().toISOString(),
           section_name: "LKM_6A_FORUM_POST",
         };
         setLocalNewPosts(prev => [{ ...newPost, parsed: parsedContent }, ...prev]);

         showSuccess('✅ Jawaban berhasil dibagikan ke forum!');
         setActiveTab('FORUM'); // pindah ke tab forum otomatis
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
            class_id: classId,
            meeting_num: meetingId,
            section_name: "LKM_6A_COMMENT",
            content: JSON.stringify(parsedContent)
         };
         const { data } = await supabase.from("submissions").insert([payload]).select();

         // Tambah ke local state agar komentar langsung tampil tanpa reload
         // Mahasiswa tetap di tab FORUM untuk bisa berkomentar lagi
         const newComment = data?.[0] ?? {
           id: `local_${Date.now()}`,
           student_email: user.email,
           created_at: new Date().toISOString(),
           section_name: "LKM_6A_COMMENT",
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

  const handleFinalSubmit = async () => {
    if (!isFormComplete) return;
    
    let docContent = `LEMBAR KERJA MAHASISWA (LKM) ABK\nTopik Pokok: ${currentTask.title}\nKelompok: ${groupNumber}\n\n`;
    currentTask.questions.forEach((q, idx) => {
      docContent += `Soal ${idx + 1}:\n${q}\n\nJawaban:\n${answers[idx] || "-"}\n\n`;
    });

    await onComplete(docContent);
  };

  if (!groupsData) {
    return (
      <div className="bg-rose-50 border border-rose-200 p-10 rounded-[3rem] text-center flex flex-col items-center mt-10">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6">
          <span className="material-symbols-outlined text-5xl">group_off</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Kelompok Belum Dibentuk</h3>
        <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">
          Tutor belum melakukan pengacakan kelompok untuk Sesi 2 ini. Anda belum bisa mengerjakan LKM.
        </p>
      </div>
    );
  }

  if (!myGroupInfo) {
    return (
      <div className="bg-amber-50 border border-amber-200 p-10 rounded-[3rem] text-center flex flex-col items-center mt-10">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mb-6">
          <span className="material-symbols-outlined text-5xl">person_off</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Tidak Ada Kelompok</h3>
        <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">
          Akun Anda tidak terdaftar dalam kelompok sesi ini. Harap hubungi Tutor Bapak Bagus.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20 relative">

      {/* Toast Notifikasi Sukses — muncul di pojok kanan atas, auto-hilang 3 detik */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-4 duration-300 border border-white/10">
          <span className="text-lg">{successMsg.charAt(0)}</span>
          <p className="font-bold text-sm">{successMsg.slice(2)}</p>
        </div>
      )}
      
      {/* HEADER TUGAS */}
      <div className="bg-gradient-to-br from-[#1e293b] to-slate-900 border border-slate-700 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl text-white mt-10">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none text-yellow-400">
          <span className="material-symbols-outlined text-[200px]">psychology</span>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
             <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               <span className="material-symbols-outlined text-[14px]">groups</span>
               LKM ABK Kelompok {groupNumber}
             </div>
             
             {/* Tabs Toggle */}
             <div className="flex bg-slate-800 rounded-2xl p-1.5 backdrop-blur-md">
               <button
                  onClick={() => setActiveTab("MY_LKM")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "MY_LKM" ? "bg-white text-slate-900 shadow-md scale-100" : "text-slate-400 hover:text-white"}`}
               >
                  LKM SAYA (DRAFT)
               </button>
               <button
                  onClick={() => setActiveTab("FORUM")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "FORUM" ? "bg-white text-slate-900 shadow-md scale-100" : "text-slate-400 hover:text-white"}`}
               >
                  FORUM DISKUSI <span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded-md text-[9px] font-black">{allForumPosts.length}</span>
               </button>
             </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2 leading-tight">
            {currentTask.title}
          </h2>
          <p className="text-slate-400 text-sm font-medium">
             {activeTab === "MY_LKM" ? "Analisis topik ABK kelompok Anda dan simpan jawaban per soal." : "Tanggapi hasil analisis dari kelompok ABK lainnya."}
          </p>
        </div>
      </div>

      {activeTab === "MY_LKM" && (
        <div className="space-y-6">
          {status ? (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 p-8 md:p-12 rounded-[3rem] text-center flex flex-col items-center shadow-xl shadow-indigo-100/50">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-inner text-indigo-500">
                <span className="material-symbols-outlined text-6xl">verified</span>
              </div>
              <h4 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Tugas LKM ABK Terkirim!</h4>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Anda telah menyelesaikan tugas pencarian materi ABK. Silakan pantau Tab <b>Forum Diskusi</b> untuk melihat tanggapan teman sejawat.
              </p>
              <div className="bg-white p-6 md:p-8 rounded-3xl w-full text-left shadow-sm border border-indigo-100 max-w-3xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ringkasan Pengiriman Akhir:</p>
                <div className="text-sm text-slate-700 leading-relaxed font-medium font-serif whitespace-pre-wrap">{status.content}</div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 text-slate-800 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
              
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl flex items-start md:items-center gap-3">
                 <span className="material-symbols-outlined text-indigo-500 mt-1 md:mt-0 !text-[20px]">info</span>
                 <p className="text-xs text-indigo-700 font-bold leading-relaxed">
                   Setiap jawaban otomatis tersimpan di browser. Anda harus mengisi minimal 5 soal untuk dapat mengirim tugas akhir ke Tutor.
                 </p>
              </div>

              {currentTask.questions.map((question, idx) => {
                const isShared = allForumPosts.some(p => p.student_email === user.email && p.parsed.questionIndex === idx);
                const answerMissing = (answers[idx] || "").trim().length < 10;

                return (
                 <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 transition-colors focus-within:bg-white focus-within:border-indigo-400 relative">
                   {isShared && (
                       <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl rounded-tr-3xl flex items-center gap-1 shadow-md">
                           <span className="material-symbols-outlined !text-[12px]">public</span> Tayang di Forum
                       </div>
                   )}
                   <div className="flex gap-4 mb-4 items-start pr-12">
                     <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md">
                       {idx + 1}
                     </div>
                     <p className="font-bold text-slate-700 leading-relaxed mt-1 text-sm md:text-base">{question}</p>
                   </div>
                   
                   <div className="relative mb-4">
                       <textarea
                         value={answers[idx] || ""}
                         onChange={(e) => {
                           const newAnswers = [...answers];
                           newAnswers[idx] = e.target.value;
                           setAnswers(newAnswers);
                         }}
                         className="w-full min-h-[140px] bg-white border border-slate-200 rounded-2xl p-5 text-sm md:text-base outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-y placeholder:text-slate-300"
                         placeholder="Uraikan jawaban Anda di sini..."
                         autoComplete="off"
                         spellCheck={false}
                       ></textarea>
                   </div>

                   <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                       <div className="flex items-center gap-2 self-start md:self-center">
                           {answerMissing ? (
                              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold">Harap isi &gt; 10 karakter</span>
                           ) : (
                              <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                 <span className="material-symbols-outlined !text-[14px]">save</span>Draft Tersimpan
                              </span>
                           )}
                       </div>
                       
                       <button 
                           onClick={() => handleShareToForum(idx)}
                           disabled={isShared || answerMissing || loadingAction.type === 'share'}
                           className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${isShared ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:scale-[1.02] shadow-md hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100'}`}
                       >
                           {loadingAction.type === 'share' && loadingAction.id === idx ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                           ) : isShared ? (
                                <><span className="material-symbols-outlined !text-[18px]">check_circle</span> Sudah di Forum</>
                           ) : (
                                <><span className="material-symbols-outlined !text-[18px]">share</span> Bagikan Ke Forum</>
                           )}
                       </button>
                   </div>
                 </div>
                );
              })}

              {/* GLOBAL SUBMIT SECTION */}
              <div className="pt-8 mt-4 border-t-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${isFormComplete ? 'bg-emerald-100 text-emerald-600 shadow-inner' : 'bg-rose-100 text-rose-500 shadow-inner'}`}>
                    <span className="material-symbols-outlined text-3xl">{isFormComplete ? 'task_alt' : 'priority_high'}</span>
                </div>
                <div>
                   <h3 className="text-xl font-black text-slate-800 mb-1">Kirim Jawaban Final</h3>
                   <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
                     Jika minimal 5 nomor sudah diisi, Anda bisa mengumpulkan LKM ini secara resmi kepada Tutor.
                   </p>
                </div>
                {remainingRequired > 0 && (
                     <p className="text-sm font-bold text-rose-500 animate-pulse mt-2">
                        Kurang {remainingRequired} jawaban lagi untuk dapat mengirim tugas.
                     </p>
                )}
                <button
                    onClick={handleFinalSubmit}
                    disabled={!isFormComplete || loading}
                    className="w-full max-w-sm bg-gradient-to-r from-slate-800 to-black text-white px-8 py-5 rounded-2xl font-black tracking-widest uppercase text-xs mt-4 shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                >
                  {loading ? "MENGIRIM..." : "KIRIM TUGAS AKHIR KE TUTOR"}
                  {!loading && <span className="material-symbols-outlined font-black">send</span>}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "FORUM" && (
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
             <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-400">forum</span> Ruang Kolaborasi Materi ABK
             </h3>
             <p className="text-indigo-200 text-xs font-medium max-w-xl">
               Lihat cuplikan jawaban dari kelompok lain. Berikan tanggapan atau pertanyaan untuk mendalami setiap kategori ABK.
             </p>
          </div>

          {allForumPosts.map((post) => {
             const postGroupNum = post.parsed.groupNum || getStudentGroup(post.student_email) || '?';
             const profile = getStudentProfile(post.student_email);
             const postComments = allComments.filter(c => c.parsed.targetId === post.id);

             return (
               <div key={post.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                 <div className="bg-slate-50 border-b border-slate-200 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-lg">
                       {profile.name.charAt(0)}
                     </div>
                     <div>
                       <div className="flex items-center gap-2 mb-0.5">
                           <p className="font-black text-slate-800 uppercase tracking-tight text-sm leading-none">{profile.name}</p>
                           <span className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded text-[8px] font-black">{profile.nim}</span>
                       </div>
                       <p className="text-[10px] text-slate-400 font-medium">
                          {new Date(post.created_at).toLocaleString('id-ID', {dateStyle: 'medium', timeStyle: 'short'})}
                       </p>
                     </div>
                   </div>
                   <div className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-[9px] font-black shrink-0 self-start md:self-center">
                     TOPIK KELOMPOK {postGroupNum}
                   </div>
                 </div>

                 <div className="p-5 md:p-8 space-y-6">
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">
                        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-2">Soal Diskusi:</p>
                        <p className="font-bold text-slate-700 mb-4 text-sm">{post.parsed.questionText}</p>
                        
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2 border-t border-slate-50 pt-4">Jawaban Publik:</p>
                        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-indigo-200">
                           {post.parsed.answerText}
                        </div>
                    </div>

                    <div className="space-y-4">
                      {postComments.length > 0 && (
                        <div className="space-y-3 mb-6">
                          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <span className="material-symbols-outlined !text-[12px]">chat</span> Komentar ({postComments.length})
                          </h4>
                          {postComments.map((c, cIdx) => {
                            const cProfile = getStudentProfile(c.student_email);
                            return (
                             <div key={cIdx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex gap-3">
                               <div className="w-8 h-8 rounded-lg bg-white text-slate-400 flex items-center justify-center text-xs font-black shrink-0 border border-slate-200 uppercase">
                                 {cProfile.name.charAt(0)}
                               </div>
                               <div>
                                 <p className="text-[10px] font-black text-slate-600 mb-1">{cProfile.name} • <span className="font-medium text-slate-400">{cProfile.nim}</span></p>
                                 <p className="text-xs text-slate-700 font-medium leading-relaxed">{c.parsed.comment}</p>
                               </div>
                             </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="flex gap-3 items-start pt-2">
                        <textarea
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})}
                          placeholder="Berikan tanggapan..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-xs outline-none focus:bg-white focus:border-indigo-400 transition-all min-h-[50px] resize-y"
                        ></textarea>
                        
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentInputs[post.id] || loadingAction.type === 'comment'}
                          className="bg-indigo-600 text-white w-12 h-12 rounded-2xl shadow-md hover:bg-slate-900 transition-all flex items-center justify-center shrink-0"
                        >
                          {loadingAction.type === 'comment' && loadingAction.id === post.id ? (
                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                             <span className="material-symbols-outlined text-[18px]">send</span>
                          )}
                        </button>
                      </div>
                    </div>
                 </div>
               </div>
             );
          })}
        </div>
      )}
    </div>
  );
};
