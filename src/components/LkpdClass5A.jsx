import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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
  const [currentStage, setCurrentStage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'success', 'error'
  const [showCelebration, setShowCelebration] = useState(false);

  const STORAGE_KEY = `lkpd_5a_draft_${user.email}_${meetingId}`;

  // 1. Get Group Info (Same logic as 6A)
  const groupRow = initialSubmissions.find(
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

  // 4. Submit logic
  const handleSaveToCloud = async (stage) => {
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
      alert("Gagal menyimpan ke server. Draft Anda tetap aman di browser ini.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentMission = MISSIONS.find(m => m.id === currentStage);

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
         <div className="bg-black/20 p-8 rounded-3xl border border-white/10 max-w-xl mx-auto text-left">
            <p className="text-[10px] font-black uppercase text-teal-200 mb-4 tracking-widest">Rangkuman Misi Anda:</p>
            <div className="space-y-4">
               {MISSIONS.map(m => (
                 <div key={m.id} className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-teal-300">verified</span>
                   <span className="text-sm font-bold opacity-90">{m.title} Completed</span>
                 </div>
               ))}
            </div>
         </div>
         <button 
           onClick={() => setShowCelebration(false)} 
           className="mt-12 bg-white text-teal-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors"
         >
           TUTUP & LIHAT HASIL
         </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10 mt-8">
      
      {/* PROGRESS TRACKER */}
      <div className="bg-slate-50 p-6 md:p-8 rounded-[3rem] border border-slate-200/50 shadow-inner">
         <div className="flex justify-between items-center mb-6 px-4">
            <h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Progress Misi Explorer</h4>
            <span className="text-teal-600 font-black text-xs md:text-sm">{currentStage} / 4 Misi</span>
         </div>
         <div className="flex gap-2 md:gap-4 px-2">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`h-3 flex-1 rounded-full transition-all duration-500 shadow-sm ${
                  s < currentStage ? 'bg-teal-500' : 
                  s === currentStage ? 'bg-teal-500 animate-pulse' : 'bg-slate-200'
                }`}
              ></div>
            ))}
         </div>
      </div>

      {/* CONTENT MISSION */}
      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-teal-900/5 p-8 md:p-14 border border-slate-100 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-teal-50 rounded-full -mr-40 -mt-40 transition-colors group-hover:bg-teal-100"></div>
         
         <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-16 h-16 bg-teal-900 text-teal-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="material-symbols-outlined text-3xl">{currentMission.icon}</span>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-teal-600 tracking-[0.2em] mb-1">{currentMission.subtitle}</p>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{currentMission.title}</h2>
               </div>
            </div>

            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl mb-12 italic border-l-4 border-teal-500 pl-6">
               "{currentMission.description}"
            </p>

            <div className="space-y-8 md:space-y-12">
               {/* TYPE: Tasks (Quiz style) */}
               {currentMission.tasks && currentMission.tasks.map((task, idx) => (
                  <div key={task.id} className="bg-slate-50 p-6 md:p-10 rounded-[2.5rem] border border-slate-100 group/task transition-all hover:bg-white hover:shadow-xl hover:border-teal-200">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Challenge {idx+1}</p>
                     <h4 className="font-bold text-slate-800 text-base md:text-xl mb-8 leading-snug">{task.q}</h4>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {task.options.map((opt, oi) => (
                          <button
                            key={oi}
                            onClick={() => setAnswers({...answers, [task.id]: oi})}
                            className={`p-5 rounded-2xl text-sm font-bold border transition-all text-left flex items-center gap-3 ${
                              answers[task.id] === oi 
                              ? 'bg-teal-900 text-white border-teal-900 shadow-xl' 
                              : 'bg-white text-slate-600 border-slate-100 hover:border-teal-300'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${answers[task.id] === oi ? 'bg-teal-400 text-teal-900' : 'bg-slate-100 text-slate-400'}`}>
                               {String.fromCharCode(65 + oi)}
                            </span>
                            {opt}
                          </button>
                        ))}
                     </div>
                  </div>
               ))}

               {/* TYPE: Open Questions (Analysis) */}
               {currentMission.questions && currentMission.questions.map((q, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm focus-within:border-teal-500 transition-all">
                     <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-4">Analisis Strategi {idx+1}</p>
                     <h4 className="font-bold text-slate-800 text-base md:text-lg mb-6">{q}</h4>
                     <textarea
                        value={answers[`mission3_${idx}`] || ""}
                        onChange={(e) => setAnswers({...answers, [`mission3_${idx}`]: e.target.value})}
                        placeholder="Tuliskan hasil analisis kritis Anda di sini..."
                        className="w-full min-h-[160px] bg-slate-50 border-none rounded-2xl p-6 text-sm md:text-base font-medium text-slate-700 focus:bg-white focus:ring-0 outline-none transition-all resize-none"
                     ></textarea>
                  </div>
               ))}

               {/* TYPE: Design Prompts (Project style) */}
               {currentMission.prompts && (
                  <div className="space-y-6">
                     <div className="bg-teal-900 text-white p-8 rounded-[2.5rem] mb-10 flex items-center gap-6 shadow-2xl">
                         <span className="material-symbols-outlined text-5xl opacity-40">design_services</span>
                         <div>
                            <h4 className="font-black text-xl uppercase tracking-tight mb-1 font-headline">Rancangan PjBL Master</h4>
                            <p className="text-teal-100 text-opacity-70 text-xs">Penuhi langkah-langkah di bawah untuk menuntaskan misi.</p>
                         </div>
                     </div>
                     {currentMission.prompts.map((p, idx) => (
                        <div key={idx} className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4 italic">{p}</label>
                           <textarea
                              value={answers[`mission4_${idx}`] || ""}
                              onChange={(e) => setAnswers({...answers, [`mission4_${idx}`]: e.target.value})}
                              className="w-full min-h-[120px] bg-white border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:border-teal-500 outline-none transition-all resize-none"
                              placeholder="..."
                           ></textarea>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            {/* ACTION FOOTER */}
            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="text-center md:text-left">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Status Misi</p>
                  <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    {saveStatus === 'saving' ? (
                       <><span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span> Mengirim data ke server...</>
                    ) : saveStatus === 'success' ? (
                       <><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Misi tersimpan dan sinkron!</>
                    ) : (
                       <><span className="w-2 h-2 bg-slate-200 rounded-full"></span> Menunggu perintah kirim...</>
                    )}
                  </p>
               </div>

               <div className="flex gap-4 w-full md:w-auto">
                  {currentStage > 1 && (
                     <button 
                        onClick={() => setCurrentStage(currentStage - 1)}
                        className="flex-1 md:flex-none border-2 border-slate-200 text-slate-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                     >
                       KEMBALI
                     </button>
                  )}
                  <button
                    onClick={() => handleSaveToCloud(currentStage)}
                    disabled={isSubmitting}
                    className="flex-1 md:flex-none bg-[#0a2e2b] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-teal-900/20 disabled:opacity-50"
                  >
                    {currentStage === 4 ? "SELESAIKAN MISI FINAL" : "SIMPAN & LANJUT MISI"}
                    <span className="material-symbols-outlined text-sm font-black animate-pulse">
                      {currentStage === 4 ? 'workspace_premium' : 'arrow_forward'}
                    </span>
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* TUTOR TIP */}
      <div className="bg-amber-50 border border-amber-200 p-8 rounded-[3rem] flex items-start gap-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 opacity-20 rounded-full -mr-16 -mt-16"></div>
         <div className="w-14 h-14 bg-amber-400 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <span className="material-symbols-outlined text-3xl">lightbulb</span>
         </div>
         <div>
            <h4 className="font-black text-amber-900 text-lg mb-1">Tips dari Tutor:</h4>
            <p className="text-amber-800/70 text-sm font-medium leading-relaxed">
               Jangan terburu-buru! <span className="text-amber-900 font-bold uppercase tracking-tight italic">Mission 3 & 4</span> sangat krusial bagi nilai akhir tutorial Anda. Pastikan setiap alasan logis merujuk pada materi yang telah kita bahas di menu <span className="bg-amber-200 px-2 rounded font-black text-[10px]">MATERI PEMBELAJARAN</span>.
            </p>
         </div>
      </div>

    </div>
  );
};
