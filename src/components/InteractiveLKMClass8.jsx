import React, { useState, useMemo } from 'react';

const TASKS = {
  1: {
    title: "Konsep Karakteristik dan Tugas Perkembangan Sekolah Dasar",
    questions: [
      "Jenis Layanan Bimbingan dan Konseling: Layanan Orientasi",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Informasi",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Pembelajaran",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Penempatan dan Penyaluran",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Penguasaan Konten",
      "Tugas Perkembangan peserta didik di SD menurut Yusuf (2016:69)",
      "Fase peserta didik membutuhkan kemampuan intelektual dan kognitif pada usia SD (6-12 tahun)"
    ]
  },
  2: {
    title: "Perkembangan Fisik - Motorik dan Upaya Bimbingannya",
    questions: [
      "Jenis Layanan Bimbingan dan Konseling: Layanan Konseling Individual",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Bimbingan Kelompok",
      "Pengertian perkembangan fisik",
      "Empat komponen utama perkembangan fisik seseorang",
      "Aspek - aspek perkembangan fisik individu, dan Jabarkan aspek struktur fisik",
      "Faktor yang mendorong keterampilan motorik yang memungkinkan peran serta orang tua dan guru dalam mengarahkannya",
      "Uraikan tabel perkembangan fisik masa kanak - kanak akhir"
    ]
  },
  3: {
    title: "Perkembangan Kognitif dan Bahasa Serta Upaya Bimbingannya",
    questions: [
      "Jenis Layanan Bimbingan dan Konseling: Layanan Konseling Kelompok",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Konsultasi",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Mediasi",
      "Uraikan 4 tahap utama perkembangan kognitif individu",
      "Identifikasi 5 karakteristik utama bahasa",
      "Uraikan tahapan perkembangan bahasa pada anak"
    ]
  },
  4: {
    title: "Perkembangan Sosial, Emosi, dan Moral Serta Upaya Bimbingannya",
    questions: [
      "Pengertian perkembangan sosial",
      "Uraikan karakteristik anak SD dalam perilaku yang direalisasikan dalam bentuk tindakan",
      "Sebutkan karakteristik perkembangan sosial pada jenjang SD kelas rendah dan kelas tinggi",
      "Uraikan tentang perkembangan emosi",
      "Uraikan perkembangan dan ciri - ciri emosi peserta didik di SD",
      "Pengertian perkembangan moral",
      "Jelaskan 3 tingkatan klasifikasi perkembangan moral"
    ]
  }
};

export default function InteractiveLKMClass8({ user, classId, meetingId, submissions, onComplete, status, loading }) {
  // Check if group is generated
  const groupRow = (submissions || []).find(s => s.student_email === "SYSTEM_GROUP" && s.section_name === "GENERATED_GROUPS" && String(s.meeting_num) === String(meetingId));
  const groupsData = groupRow ? JSON.parse(groupRow.content) : null;

  const myGroupInfo = useMemo(() => {
    if (!groupsData) return null;
    return groupsData.find(g => g.members.some(m => m.email === user.email));
  }, [groupsData, user.email]);

  const groupNumber = myGroupInfo ? myGroupInfo.group_num : 1;
  const taskKey = ((groupNumber - 1) % 4) + 1; // Maps 1->1, 2->2, 3->3, 4->4, 5->1, etc
  const currentTask = TASKS[taskKey];

  const [answers, setAnswers] = useState(() => Array(currentTask.questions.length).fill(""));

  const isFormComplete = answers.every(a => a.trim().length >= 10);
  const remainingQuestions = answers.filter(a => a.trim().length < 10).length;

  const handleSubmit = async () => {
    if (!isFormComplete) return;
    
    let docContent = `LEMBAR KERJA MAHASISWA (LKM)\nTopik Pokok: ${currentTask.title}\nKelompok: ${groupNumber}\n\n`;
    currentTask.questions.forEach((q, idx) => {
      docContent += `Soal ${idx + 1}: ${q}\nJawaban:\n${answers[idx]}\n\n`;
    });

    await onComplete(docContent);
  };

  if (status) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-8 md:p-12 rounded-[3rem] text-center flex flex-col items-center shadow-xl shadow-green-100/50">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner text-green-500">
          <span className="material-symbols-outlined text-6xl">verified</span>
        </div>
        <h4 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">LKM Berhasil Dikirim</h4>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Tugas LKM Anda telah berhasil direkam oleh sistem dan akan segera dinilai oleh Tutor.
        </p>
        <div className="bg-white p-8 rounded-3xl w-full text-left shadow-sm border border-green-100 max-w-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Pratinjau Pengiriman:</p>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-medium font-mono text-xs">{status.content}</p>
        </div>
      </div>
    );
  }

  if (!groupsData) {
    return (
      <div className="bg-rose-50 border border-rose-200 p-10 rounded-[3rem] text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6">
          <span className="material-symbols-outlined text-5xl">group_off</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Kelompok Belum Dibentuk</h3>
        <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">
          Sistem mendeteksi bahwa Tutor belum melakukan pengacakan kelompok untuk sesi ini. Anda tidak dapat mengerjakan LKM sebelum kelompok ditentukan.
        </p>
        <button onClick={() => window.location.reload()} className="bg-white border-2 border-rose-200 text-rose-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-rose-50 transition-all">
          <span className="material-symbols-outlined">refresh</span> Cek Ulang Status Kelompok
        </button>
      </div>
    );
  }

  if (!myGroupInfo) {
    return (
      <div className="bg-amber-50 border border-amber-200 p-10 rounded-[3rem] text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mb-6">
          <span className="material-symbols-outlined text-5xl">person_off</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Anda Tidak Terdaftar di Kelompok Manapun</h3>
        <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">
          Tutor telah membuat kelompok, tetapi akun Anda tidak terdaftar di dalamnya. Silakan hubungi Tutor Anda untuk pengecekan lebih lanjut.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* HEADER TUGAS */}
      <div className="bg-gradient-to-br from-[#1a2169] to-indigo-900 border border-indigo-500/30 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-indigo-900/20 text-white">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[200px]">assignment</span>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-indigo-400/30">
              <span className="material-symbols-outlined text-[14px]">groups</span>
              LKM Kelompok {groupNumber}
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2 leading-tight">
              {currentTask.title}
            </h2>
            <p className="text-indigo-200 text-sm font-medium">Lengkapi setiap pertanyaan di bawah ini dengan jawaban yang komprehensif.</p>
          </div>
        </div>
      </div>

      {/* FORM LKM */}
      <div className="bg-white rounded-[2.5rem] p-6 text-slate-800 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
         {currentTask.questions.map((question, idx) => (
           <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 transition-colors focus-within:bg-indigo-50/30 focus-within:border-indigo-200">
             <div className="flex gap-4 mb-4 items-start">
               <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md">
                 {idx + 1}
               </div>
               <p className="font-bold text-slate-700 leading-relaxed mt-1">{question}</p>
             </div>
             <div className="relative">
                <textarea
                  value={answers[idx]}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[idx] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  className="w-full min-h-[120px] bg-white border border-slate-200 rounded-2xl p-5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-y placeholder:text-slate-400"
                  placeholder="Ketik uraian atau jawaban Anda di sini minimal 10 karakter..."
                ></textarea>
                <div className="absolute right-3 bottom-3 flex items-center gap-1 bg-white/80 px-2 py-1 rounded-lg backdrop-blur text-[10px] font-bold text-slate-400 border border-slate-100">
                  {answers[idx].trim().length < 10 ? (
                     <><span className="text-rose-500">{answers[idx].trim().length}</span> / 10</>
                  ) : (
                     <><span className="material-symbols-outlined text-green-500 text-[14px]">check_circle</span> OK</>
                  )}
                </div>
             </div>
           </div>
         ))}

         {/* SUBMIT SECTION */}
         <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3 w-full md:w-auto">
             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isFormComplete ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-500'}`}>
                <span className="material-symbols-outlined text-2xl">{isFormComplete ? 'task_alt' : 'priority_high'}</span>
             </div>
             <div>
                <p className="text-sm font-black tracking-tight text-slate-800">{isFormComplete ? 'Semua Pertanyaan Terjawab' : `${remainingQuestions} Pertanyaan Belum Selesai`}</p>
                <p className="text-xs text-slate-500 font-medium">Pastikan semua kolom terisi dengan baik.</p>
             </div>
           </div>

           <button
              onClick={handleSubmit}
              disabled={!isFormComplete || loading}
              className="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-black tracking-tight shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
           >
             {loading ? "MENGIRIM..." : "KIRIM LKM"}
             {!loading && <span className="material-symbols-outlined font-black">send</span>}
           </button>
         </div>
      </div>
    </div>
  );
}
