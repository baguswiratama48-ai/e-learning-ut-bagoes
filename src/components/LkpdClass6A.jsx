import React, { useState, useEffect } from 'react';

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
    // Scroll to top when loaded to ensure they see the header
    window.scrollTo(0, 0);
  }, []);

  if (!groupRow || allGroups.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 p-10 rounded-[2.5rem] text-center">
         <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 animate-bounce">group_add</span>
         <h3 className="font-black text-xl text-slate-800 mb-2">Tutor Belum Membagi Kelompok</h3>
         <p className="text-slate-500 font-medium text-sm">Harap tunggu sampai Tutor Anda mengacak kelompok untuk sesi pertemuan ini sebelum dapat memulai Misi Pencarian Materi LKPD Anda.</p>
      </div>
    );
  }

  if (!myGroup && user.email !== "demo@ecampus.ut.ac.id") {
    // Fallback if somehow they are not in a group
    return (
      <div className="bg-white border border-red-100 bg-red-50 p-10 rounded-[2.5rem] text-center text-red-600">
         <span className="material-symbols-outlined text-4xl mb-4">error</span>
         <h3 className="font-black text-xl mb-2">Anda tidak terdaftar di kelompok manapun.</h3>
      </div>
    );
  }

  // Jika demo account, kasih ke kelompok 1 by default
  const activeGroupNum = myGroup ? myGroup.group_num : 1;

  // Render Form sesuai Modul (Grup 1 = Modul 1, dst)
  const renderForm = () => {
    if (activeGroupNum === 1) {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
            <h4 className="font-black text-indigo-900 mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-indigo-500">menu_book</span> Misi Kelompok 1 (Modul 1)</h4>
            <p className="text-xs font-medium text-indigo-700 leading-relaxed mb-6">Diskusikan dan ketik pemahaman kalian tentang Hakikat Perkembangan Anak yang Bersifat Nonnormatif dan Cara Identifikasinya.</p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">1. Menurut kalian, Apa Pengertian Anak dengan Perkembangan Nonnormatif?</label>
                <textarea 
                  className="w-full bg-white border border-indigo-200 rounded-xl p-4 text-sm focus:border-indigo-500 focus:ring-1 outline-none min-h-[100px]"
                  placeholder="Ketik jawaban di sini..."
                  value={formData.q1 || ""}
                  onChange={(e) => setFormData({...formData, q1: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">2. Jelaskan Kelainan dari sudut pandang Model Medis, Penyimpangan Rata-rata, & Ideal!</label>
                <textarea 
                  className="w-full bg-white border border-indigo-200 rounded-xl p-4 text-sm focus:border-indigo-500 focus:ring-1 outline-none min-h-[120px]"
                  placeholder="Ketik jawaban di sini..."
                  value={formData.q2 || ""}
                  onChange={(e) => setFormData({...formData, q2: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">3. Apa saja cara paling efektif untuk mengidentifikasi anak tersebut? (Wawancara, Kuesioner, Observasi)</label>
                <textarea 
                  className="w-full bg-white border border-indigo-200 rounded-xl p-4 text-sm focus:border-indigo-500 focus:ring-1 outline-none min-h-[120px]"
                  placeholder="Ketik jawaban di sini..."
                  value={formData.q3 || ""}
                  onChange={(e) => setFormData({...formData, q3: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeGroupNum === 2) {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
            <h4 className="font-black text-emerald-900 mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500">accessible_forward</span> Misi Kelompok 2 (Modul 2)</h4>
            <p className="text-xs font-medium text-emerald-700 leading-relaxed mb-6">Diskusikan dan ketik pemahaman kalian tentang Anak dengan Gangguan Fisik (Cerebral Palsy dan Anak Rentan Sakit).</p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">1. Sebutkan dan jelaskan batasan serta tipe-tipe Cerebral Palsy!</label>
                <textarea 
                  className="w-full bg-white border border-emerald-200 rounded-xl p-4 text-sm focus:border-emerald-500 focus:ring-1 outline-none min-h-[100px]"
                  placeholder="Ketik jawaban di sini..."
                  value={formData.q1 || ""}
                  onChange={(e) => setFormData({...formData, q1: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">2. Bagaimana Karakteristik Anak dengan Cerebral Palsy dan Strategi Penanganannya?</label>
                <textarea 
                  className="w-full bg-white border border-emerald-200 rounded-xl p-4 text-sm focus:border-emerald-500 focus:ring-1 outline-none min-h-[120px]"
                  placeholder="Ketik jawaban di sini..."
                  value={formData.q2 || ""}
                  onChange={(e) => setFormData({...formData, q2: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">3. Jelaskan pengertian Anak Rentan Sakit dan penyakit yang umum diderita anak!</label>
                <textarea 
                  className="w-full bg-white border border-emerald-200 rounded-xl p-4 text-sm focus:border-emerald-500 focus:ring-1 outline-none min-h-[100px]"
                  placeholder="Ketik jawaban di sini..."
                  value={formData.q3 || ""}
                  onChange={(e) => setFormData({...formData, q3: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
            <h4 className="font-black text-rose-900 mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-rose-500">visibility</span> Misi Kelompok 3 (Modul 3)</h4>
            <p className="text-xs font-medium text-rose-700 leading-relaxed mb-6">Diskusikan dan ketik pemahaman kalian tentang Anak dengan Gangguan Panca Indra (Pendengaran dan Penglihatan).</p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">1. Jelaskan Batasan dan Penggolongan Gangguan Pendengaran!</label>
                <textarea 
                  className="w-full bg-white border border-rose-200 rounded-xl p-4 text-sm focus:border-rose-500 focus:ring-1 outline-none min-h-[100px]"
                  placeholder="Ketik jawaban di sini..."
                  value={formData.q1 || ""}
                  onChange={(e) => setFormData({...formData, q1: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">2. Bagaimana strategi penanganan untuk Anak dengan Gangguan Pendengaran?</label>
                <textarea 
                  className="w-full bg-white border border-rose-200 rounded-xl p-4 text-sm focus:border-rose-500 focus:ring-1 outline-none min-h-[100px]"
                  placeholder="Ketik jawaban di sini..."
                  value={formData.q2 || ""}
                  onChange={(e) => setFormData({...formData, q2: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">3. Sebutkan identifikasi dan karakteristik Anak dengan Gangguan Penglihatan serta strategi penanganannya!</label>
                <textarea 
                  className="w-full bg-white border border-rose-200 rounded-xl p-4 text-sm focus:border-rose-500 focus:ring-1 outline-none min-h-[120px]"
                  placeholder="Ketik jawaban di sini..."
                  value={formData.q3 || ""}
                  onChange={(e) => setFormData({...formData, q3: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleAction = () => {
    // Validate if at least partially filled
    if (!formData.q1 || !formData.q2 || !formData.q3) {
      alert("Harap lengkapi semua poin pertanyaan sebelum mengirim!");
      return;
    }
    const finalPayload = JSON.stringify({
      groupNum: activeGroupNum,
      answers: formData
    });
    onComplete(finalPayload);
  };

  // Kumpulkan semua submission dari kelompok lain
  const otherSubmissions = submissions.filter(
    (s) => s.section_name === "LKPD (Lembar Kerja Peserta Didik)" && s.student_email !== "SYSTEM_GROUP" && s.meeting_num === meetingId
  );

  return (
    <div className="space-y-12 pb-10">
      
      {/* HEADER INFO */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden border-b-8 border-b-yellow-400">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
         <div className="relative z-10">
            <h1 className="font-headline font-black text-2xl md:text-4xl mb-4 tracking-tight leading-tight">Misi Investigasi Modul Kelas 6A</h1>
            <p className="text-slate-400 text-sm md:text-base font-medium max-w-2xl leading-relaxed mb-8">
              Kalian telah dibagi menjadi 3 Kelompok. Silakan selesaikan misi pencarian materi sesuai dengan Modul yang ditugaskan ke kelompok kalian. Setelah selesai, kalian dapat mempelajari dan mempresentasikan hasil kerja kelompok lain di bawah.
            </p>
            <div className="inline-flex flex-wrap items-center gap-3 bg-white bg-opacity-10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white border-opacity-10">
               <span className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-slate-900 shrink-0">
                  {activeGroupNum}
               </span>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Posisi Kamu Saat Ini</p>
                  <p className="font-bold text-sm">Anggota Kelompk {activeGroupNum} (Modul {activeGroupNum})</p>
               </div>
            </div>
         </div>
      </div>

      {/* FORM INPUT AREA */}
      {!status ? (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 shadow-opacity-40 p-6 md:p-10 border border-slate-100 relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-slate-900 rounded-l-3xl"></div>
          {renderForm()}
          <hr className="my-8 border-slate-100" />
          <button 
             onClick={handleAction}
             disabled={loading}
             className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-xl disabled:opacity-50"
          >
             KIRIM MISI KELOMPOK {activeGroupNum}
             <span className="material-symbols-outlined text-yellow-400">send</span>
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 p-8 md:p-12 rounded-3xl text-center shadow-inner relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 bg-opacity-10 blur-xl rounded-full"></div>
           <span className="material-symbols-outlined text-6xl text-emerald-500 mb-4 relative z-10">task_alt</span>
           <h3 className="font-black text-2xl text-emerald-900 mb-2 relative z-10">Misi Kelompok 1 Selesai!</h3>
           <p className="text-emerald-700 font-medium text-sm md:text-base relative z-10 max-w-xl mx-auto">
             Jawaban kamu telah terekam di sistem. Sekarang, tinjau hasil kerja teman-temanmu di kelompok lain di bawah ini untuk bahan diskusi.
           </p>
        </div>
      )}

      {/* GALLERY OF SUBMISSIONS */}
      <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-6 md:p-10 mt-16">
         <div className="text-center mb-10">
            <h2 className="font-headline font-black text-2xl text-slate-800 flex items-center justify-center gap-3 mb-2">
               <span className="material-symbols-outlined text-3xl text-indigo-500">explore</span>
               Pusat Data Presentasi
            </h2>
            <p className="text-slate-500 text-sm font-medium">Baca dan kritisi hasil penelitian kelompok lain di sini.</p>
         </div>

         {otherSubmissions.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
               <span className="material-symbols-outlined text-slate-300 text-4xl mb-3">hourglass_empty</span>
               <p className="text-slate-500 font-medium text-sm">Belum ada kelompok satupun yang mengumpulkan tugas.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3].map(gNum => {
                  const subsForThisGroup = otherSubmissions.filter(s => {
                    try {
                       const parsed = JSON.parse(s.content);
                       return parsed.groupNum === gNum;
                    } catch(e) { return false; }
                  });

                  if(subsForThisGroup.length === 0) {
                     return (
                       <div key={gNum} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm opacity-60">
                          <h4 className="font-black text-slate-400 mb-2">Kelompok {gNum}</h4>
                          <p className="text-xs text-slate-400 font-medium italic">Sedang Mengerjakan...</p>
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
                          const authorName = author.split('@')[0]; // Simple name extraction

                          return (
                            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="border-b border-slate-50 pb-4 mb-4">
                                   <div className="flex items-center gap-2 mb-1">
                                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black shrink-0">{gNum}</span>
                                      <h4 className="font-black text-slate-800 text-sm">Kelompok {gNum}</h4>
                                   </div>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase">Oleh: Mahasiswa {authorName}</p>
                                </div>
                                <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                   {Object.keys(data).map((k, itx) => (
                                      <div key={k}>
                                         <p className="text-xs font-black text-slate-600 mb-1">Pertanyaan {itx+1}</p>
                                         <p className="text-xs text-slate-500 font-serif leading-relaxed text-justify bg-slate-50 p-3 rounded-xl border border-slate-100">{data[k]}</p>
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
