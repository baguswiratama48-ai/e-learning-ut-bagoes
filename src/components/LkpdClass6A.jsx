import React, { useState, useEffect } from 'react';

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
  status,
  submissions,
  onComplete,
  loading
}) => {
  const [formData, setFormData] = useState({});

  // Temukan Grup
  const groupRow = submissions.find(
    (s) => s.student_email === "SYSTEM_GROUP" && s.meeting_num === meetingId
  );
  
  const allGroups = groupRow ? JSON.parse(groupRow.content) : [];
  
  // Mahasiswa saat ini ada di grup mana?
  const myGroup = allGroups.find(g => 
    g.members.some(m => m.email === user.email)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!groupRow || allGroups.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 p-10 rounded-[2.5rem] text-center mt-10">
         <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 animate-bounce">group_add</span>
         <h3 className="font-black text-xl text-slate-800 mb-2">Tutor Belum Membagi Kelompok</h3>
         <p className="text-slate-500 font-medium text-sm">Harap tunggu sampai Tutor Anda mengacak kelompok untuk sesi pertemuan ini sebelum dapat memulai Misi Pencarian Materi LKPD Anda.</p>
      </div>
    );
  }

  if (!myGroup && user.email !== "demo@ecampus.ut.ac.id") {
    // Fallback if somehow they are not in a group
    return (
      <div className="bg-white border border-red-100 bg-red-50 p-10 rounded-[2.5rem] text-center text-red-600 mt-10">
         <span className="material-symbols-outlined text-4xl mb-4">error</span>
         <h3 className="font-black text-xl mb-2">Anda tidak terdaftar di kelompok manapun.</h3>
      </div>
    );
  }

  // Jika demo account, kasih ke kelompok 1 by default
  const activeGroupNum = myGroup ? myGroup.group_num : 1;

  const currentQuestions = activeGroupNum === 1 
     ? MODUL_1_QUESTIONS 
     : activeGroupNum === 2 
        ? MODUL_2_QUESTIONS 
        : MODUL_3_QUESTIONS;

  const handleAction = () => {
    // Validate if ALL strictly filled
    const isAllFilled = currentQuestions.every(q => formData[q] && formData[q].trim().length > 0);
    
    if (!isAllFilled) {
      alert("Harap isi seluruh kolom materi yang ditugaskan sebelum mengirim laporan kelompok Anda!");
      return;
    }
    const finalPayload = JSON.stringify({
      groupNum: activeGroupNum,
      answers: formData
    });
    onComplete(finalPayload);
  };

  const otherSubmissions = submissions.filter(
    (s) => s.section_name === "LKPD (Lembar Kerja Peserta Didik)" && s.student_email !== "SYSTEM_GROUP" && s.meeting_num === meetingId
  );

  return (
    <div className="space-y-8 md:space-y-12 pb-10">
      
      {/* HEADER INFO */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border-b-8 border-b-yellow-400 mt-8">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
         <div className="relative z-10">
            <h1 className="font-headline font-black text-2xl md:text-4xl mb-3 tracking-tight leading-tight">Misi Kelompok {activeGroupNum} (Modul {activeGroupNum})</h1>
            <p className="text-slate-400 text-xs md:text-sm font-medium max-w-2xl leading-relaxed mb-6">
              Silakan isi bahan materi spesifik sesuai bagian kelompok kalian di bawah ini dengan berdiskusi. Laporan ini wajib diisi utuh sebagai bahan catatan lintas pandang untuk kelompok lain.
            </p>
            <div className="inline-flex flex-wrap items-center gap-3 bg-white bg-opacity-10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white border-opacity-10">
               <span className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-slate-900 shrink-0 text-xl">
                  {activeGroupNum}
               </span>
               <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Posisi Kamu Saat Ini</p>
                  <p className="font-bold text-xs">Anggota Kelompok {activeGroupNum}</p>
               </div>
            </div>
         </div>
      </div>

      {/* FORM INPUT AREA */}
      {!status ? (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 shadow-opacity-40 p-5 md:p-8 border border-slate-100 relative">
          <div className={`absolute top-0 left-0 w-2 h-full rounded-l-3xl ${activeGroupNum === 1 ? 'bg-indigo-500' : activeGroupNum === 2 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
          <div className="space-y-6">
             {currentQuestions.map((questionText, idx) => (
                <div key={idx} className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100">
                   <label className="block text-xs md:text-sm font-bold text-slate-800 mb-3 leading-snug">
                     <span className="inline-block bg-white text-slate-500 px-2.5 py-1 rounded-lg text-[10px] font-black mr-2 border border-slate-200">{idx+1}</span>
                     {questionText}
                   </label>
                   <textarea 
                     className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:border-primary focus:ring-1 outline-none min-h-[100px] text-slate-700"
                     placeholder="Ketik penjelasan mendalam dari modul di sini..."
                     value={formData[questionText] || ""}
                     onChange={(e) => setFormData({...formData, [questionText]: e.target.value})}
                   ></textarea>
                </div>
             ))}
          </div>
          <hr className="my-8 border-slate-100" />
          <button 
             onClick={handleAction}
             disabled={loading}
             className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-xl disabled:opacity-50 text-sm md:text-base"
          >
             KIRIM MISI KELOMPOK {activeGroupNum}
             <span className="material-symbols-outlined text-yellow-400">send</span>
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 p-8 md:p-12 rounded-3xl text-center shadow-inner relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 bg-opacity-10 blur-xl rounded-full"></div>
           <span className="material-symbols-outlined text-6xl text-emerald-500 mb-4 relative z-10">task_alt</span>
           <h3 className="font-black text-2xl text-emerald-900 mb-2 relative z-10">Tugas Kelompok {activeGroupNum} Selesai!</h3>
           <p className="text-emerald-700 font-medium text-sm md:text-base relative z-10 max-w-xl mx-auto leading-relaxed">
             Materi Anda telah terekam aman di sistem. Sekarang, tinjau hasil penelitian silang dari teman-temanmu di kelompok lainnya di bawah ini.
           </p>
        </div>
      )}

      {/* GALLERY OF SUBMISSIONS */}
      <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-5 md:p-10 mb-20 md:mb-10 mt-10 shadow-sm">
         <div className="text-center mb-8 md:mb-12">
            <h2 className="font-headline font-black text-xl md:text-3xl text-slate-800 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-3">
               <span className="material-symbols-outlined text-4xl text-primary mb-2 md:mb-0">explore</span>
               Pusat Data Lintas Kelompok
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium px-4">Di sini Anda bisa mempelajari ringkasan materi dari kelompok spesialis modul lain.</p>
         </div>

         {otherSubmissions.length === 0 ? (
            <div className="text-center bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
               <span className="material-symbols-outlined text-slate-300 text-5xl mb-4">hourglass_empty</span>
               <p className="text-slate-500 font-medium text-sm">Belum ada mahasiswa yang mengumpulkan tugas untuk dipelajari.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
               {[1, 2, 3].map(gNum => {
                  const subsForThisGroup = otherSubmissions.filter(s => {
                    try {
                       const parsed = JSON.parse(s.content);
                       return parsed.groupNum === gNum;
                    } catch(e) { return false; }
                  });

                  if(subsForThisGroup.length === 0) {
                     return (
                       <div key={gNum} className="bg-white p-6 rounded-3xl border-2 border-dashed border-slate-200 shadow-sm opacity-50 text-center">
                          <h4 className="font-black text-slate-400 mb-2 text-lg">Kelompok {gNum}</h4>
                          <span className="material-symbols-outlined text-slate-300 text-3xl mb-2">more_horiz</span>
                          <p className="text-xs text-slate-400 font-medium italic">Menunggu anggota kelompok {gNum} mengumpulkan materinya...</p>
                       </div>
                     );
                  }

                  return (
                    <div key={gNum} className="space-y-6">
                       {subsForThisGroup.map((sub, idx) => {
                          let data;
                          try {
                            data = JSON.parse(sub.content).answers;
                          } catch(e) { data = {}; }
                          
                          // Look for author's name
                          const author = submissions.find(m => m.student_email === sub.student_email)?.student_email || sub.student_email;
                          const authorName = author.split('@')[0];

                          return (
                            <div key={idx} className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                                <div className="border-b border-slate-50 pb-4 mb-4">
                                   <div className="flex items-center gap-2 mb-1.5">
                                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${gNum === 1 ? 'bg-indigo-100 text-indigo-600' : gNum === 2 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>{gNum}</span>
                                      <h4 className="font-black text-slate-800 text-base">Modul {gNum}</h4>
                                   </div>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sumber Laporan: {authorName}</p>
                                </div>
                                <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-3">
                                   {Object.keys(data).map((k, itx) => (
                                      <div key={itx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                         <p className="text-[10px] md:text-xs font-black text-slate-700 mb-2 leading-relaxed">{k}</p>
                                         <p className="text-xs text-slate-600 font-serif leading-relaxed text-justify">{data[k]}</p>
                                      </div>
                                   ))}
                                </div>
                            </div>
                          );
                       })}
                    </div>
                  );
               })}
            </div>
         )}
      </div>

    </div>
  );
};
