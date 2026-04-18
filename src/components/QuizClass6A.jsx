import React, { useState, useMemo } from 'react';

// 10 Soal Pool - setiap mahasiswa dapat 5 soal acak berdasarkan NIM/email
const QUESTION_POOL = [
  "Jelaskan apa yang dimaksud dengan 'early infantile autism' menurut Kanner?",
  "Sebutkan 2 hal yang diduga menjadi penyebab biologis dari gangguan autism?",
  "Vaksin apakah yang diduga menyebabkan kemunculan autism pada anak?",
  "Sebutkan istilah baku ADD/ADHD yang telah digunakan di Indonesia!",
  "Sebutkan 3 simptom utama dari gangguan ADD/ADHD!",
  "Selain 3 simptom utama sebutkan kriteria lain yang harus dimiliki untuk dapat mendiagnosa seseorang mengalami ADD/ADHD!",
  "Sebutkan penanganan yang umum diberikan pada anak-anak penyandang ADD/ADHD.",
  "Sebutkan pihak yang perlu terlibat dalam penanganan anak penyandang ADD/ADHD.",
  "Uraikan penyebab dan karakteristik anak Down Syndrome (DS)!",
  "Uraikan strategi penanganan anak dengan Intellectual Disability!"
];

// Hash string sederhana - menghasilkan angka dari email/NIM
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Mengacak array menggunakan seed (Fisher-Yates)
function seededShuffle(arr, seed) {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function QuizClass6A({ user, meetingId, submissions, onComplete }) {
  // Pilih 5 soal acak berdasarkan email mahasiswa
  const myQuestions = useMemo(() => {
    const seed = hashString((user?.email || "default") + String(meetingId));
    const shuffled = seededShuffle(QUESTION_POOL, seed);
    return shuffled.slice(0, 5);
  }, [user?.email, meetingId]);

  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [loading, setLoading] = useState(false);

  // Cek apakah sudah pernah submit
  const existingStatus = (submissions || []).find(
    s => s.student_email === user?.email &&
         String(s.meeting_num) === String(meetingId) &&
         s.section_name === "Kuis dan Latihan"
  );

  const answeredCount = answers.filter(a => a.trim().length >= 5).length;
  const isReady = answeredCount === 5;

  const handleSubmit = async () => {
    if (!isReady || loading) return;
    setLoading(true);
    let content = `KUIS DAN LATIHAN - KELAS 6A ABK\nSesi: ${meetingId}\nMahasiswa: ${user?.name || user?.email}\n\n`;
    myQuestions.forEach((q, i) => {
      content += `Soal ${i + 1}:\n${q}\n\nJawaban:\n${answers[i]}\n\n`;
    });
    await onComplete(content);
    setLoading(false);
  };

  if (existingStatus) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 p-10 rounded-[3rem] text-center flex flex-col items-center mt-10 shadow-xl">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6 text-indigo-600">
          <span className="material-symbols-outlined text-6xl">verified</span>
        </div>
        <h3 className="text-3xl font-black text-slate-800 mb-4">Kuis Sudah Diselesaikan!</h3>
        <p className="text-slate-600 max-w-md mb-8">
          Jawaban Anda telah terkirim ke Tutor. Pantau terus Dasbor untuk melihat feedback.
        </p>
        <div className="bg-white p-6 rounded-3xl w-full max-w-2xl text-left border border-indigo-100 shadow-sm">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Rekap Jawaban Anda:</p>
          <div className="text-sm text-slate-700 leading-relaxed font-serif whitespace-pre-wrap">{existingStatus.content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 mt-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -top-10 opacity-10">
          <span className="material-symbols-outlined text-[200px]">quiz</span>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-5">
            <span className="material-symbols-outlined text-[14px]">quiz</span>
            Kuis dan Latihan — ABK Sesi {meetingId}
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">5 Soal Khusus Untuk Anda</h2>
          <p className="text-slate-400 text-sm font-medium">
            Setiap mahasiswa mendapatkan soal yang berbeda-beda. Jawablah dengan lengkap dan berdasarkan pemahaman Anda.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Progress Jawaban</p>
          <p className="text-sm font-black text-indigo-600">{answeredCount}/5 soal terjawab</p>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(answeredCount / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Soal-soal */}
      <div className="space-y-6">
        {myQuestions.map((question, idx) => {
          const isFilled = (answers[idx] || "").trim().length >= 5;
          return (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 md:p-8 border-2 shadow-sm transition-all duration-300 ${
                isFilled ? "border-indigo-200 bg-indigo-50/20" : "border-slate-200"
              }`}
            >
              <div className="flex gap-4 mb-5 items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow transition-colors ${
                  isFilled ? "bg-indigo-600 text-white" : "bg-slate-800 text-white"
                }`}>
                  {idx + 1}
                </div>
                <p className="font-bold text-slate-800 leading-relaxed text-sm md:text-base mt-1">{question}</p>
              </div>
              <textarea
                value={answers[idx] || ""}
                onChange={(e) => {
                  const updated = [...answers];
                  updated[idx] = e.target.value;
                  setAnswers(updated);
                }}
                className="w-full min-h-[130px] bg-white border border-slate-200 rounded-2xl p-5 text-sm md:text-base outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-y placeholder:text-slate-300"
                placeholder="Tulis jawaban Anda di sini..."
                spellCheck={false}
              />
              {isFilled && (
                <div className="mt-2 flex items-center gap-2 text-emerald-600">
                  <span className="material-symbols-outlined !text-[14px]">check_circle</span>
                  <span className="text-[10px] font-black uppercase">Terjawab</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <div className="pt-6 border-t-2 border-dashed border-slate-200 flex flex-col items-center gap-4 text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isReady ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-500"}`}>
          <span className="material-symbols-outlined text-3xl">{isReady ? "task_alt" : "pending"}</span>
        </div>
        {!isReady && (
          <p className="text-sm font-bold text-amber-600">
            Masih ada {5 - answeredCount} soal yang belum dijawab.
          </p>
        )}
        <button
          onClick={handleSubmit}
          disabled={!isReady || loading}
          className="w-full max-w-sm bg-gradient-to-r from-indigo-700 to-slate-900 text-white px-8 py-5 rounded-2xl font-black tracking-widest uppercase text-xs shadow-xl shadow-indigo-900/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
        >
          {loading ? "MENGIRIM..." : "KIRIM KUIS KE TUTOR"}
          {!loading && <span className="material-symbols-outlined">send</span>}
        </button>
      </div>
    </div>
  );
}
