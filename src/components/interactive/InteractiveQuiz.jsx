import React, { useState, useEffect } from "react";
import { QUIZ_DATA } from "../../data/interactiveData";

export default function InteractiveQuiz({
  user,
  classId,
  meetingId,
  submissions,
  onComplete,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { qIndex: "A" }
  const [gameState, setGameState] = useState("INTRO"); // INTRO, PLAYING, FINISHED

  // Periksa apakah kuis sudah pernah dikerjakan sebelumnya
  const statusRow = submissions.find(
    (s) =>
      s.student_email === user.email && s.section_name === "Kuis dan Latihan",
  );

  useEffect(() => {
    if (statusRow && gameState !== "FINISHED") {
      setGameState("FINISHED");
    }
  }, [statusRow, gameState]);

  const handleSelect = (ansId) => {
    setAnswers((prev) => ({ ...prev, [currentIdx]: ansId }));
  };

  const nextQuestion = () => {
    if (currentIdx < QUIZ_DATA.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_DATA.forEach((q, idx) => {
      if (answers[idx] === q.ans) score += 5; // 20 soal * 5 = 100
    });
    return score;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setGameState("FINISHED");

    const reportText = `[SKOR AKHIR: ${finalScore}/100]\n(Hasil Kuis Interaktif diselesaikan secara otomatis)\nTerisi: ${Object.keys(answers).length} dari ${QUIZ_DATA.length} soal.`;

    onComplete(reportText);
  };

  if (statusRow || gameState === "FINISHED") {
    const finalScore = calculateScore();
    const sc = statusRow
      ? parseInt(
          statusRow.content.match(/SKOR AKHIR: (\d+)/)?.[1] || finalScore,
        )
      : finalScore;

    return (
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-10 md:p-16 text-center shadow-sm animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <span className="material-symbols-outlined text-6xl text-indigo-600">
            {sc >= 80 ? "military_tech" : "school"}
          </span>
          {sc >= 80 && (
             <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white">
                <span className="material-symbols-outlined text-white text-xs font-black">star</span>
             </div>
          )}
        </div>
        
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">
          Evaluasi Selesai
        </h2>
        <p className="text-slate-500 font-medium mb-10">
          Hasil pengerjaan Anda telah terekam di sistem dan dikirim ke Tutor.
        </p>

        <div className="bg-slate-50 rounded-[2.5rem] p-10 max-w-xs mx-auto border border-slate-100 relative mb-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Pencapaian Skor
          </p>
          <p className={`text-7xl font-black ${sc >= 80 ? "text-emerald-500" : "text-orange-500"}`}>
            {sc}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
            <span>Dari 100 Poin</span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
          </div>
        </div>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-6 py-3 rounded-xl transition-all"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Kembali ke Dashboard Kelas
        </button>
      </div>
    );
  }

  if (gameState === "INTRO") {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 md:p-14 border border-slate-200 shadow-sm flex flex-col items-center text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-600 shadow-opacity-20">
          <span className="material-symbols-outlined text-4xl">assignment</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">
          KUIS EVALUASI MODUL
        </h1>
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
          Ujilah pemahaman Anda mengenai materi Modul melalui {QUIZ_DATA.length} butir soal pilihan ganda. 
          Pastikan Anda telah mempelajari seluruh materi sebelum memulai.
        </p>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <p className="text-2xl font-black text-slate-800">{QUIZ_DATA.length}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Soal</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <p className="text-2xl font-black text-slate-800">100</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Skor Maksimal</p>
          </div>
        </div>

        <button
          onClick={() => setGameState("PLAYING")}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-slate-900 shadow-opacity-10"
        >
          MULAI PENGERJAAN
        </button>
      </div>
    );
  }

  const q = QUIZ_DATA[currentIdx];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200 shadow-opacity-20 flex flex-col min-h-[600px] animate-in slide-in-from-bottom-5 duration-700">
      <div className="bg-white px-8 py-6 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">menu_book</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Evaluasi</p>
            <p className="font-bold text-slate-800">{user.classId === "3" ? "Modul 3: ABK" : "Modul 1: BK"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden md:block h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${((currentIdx + 1) / QUIZ_DATA.length) * 100}%` }}
              ></div>
           </div>
           <div className="px-4 py-2 bg-slate-50 rounded-lg text-xs font-black text-slate-600 font-mono">
              SOAL {currentIdx + 1} / {QUIZ_DATA.length}
           </div>
        </div>
      </div>

      <div className="w-full h-1 bg-slate-50">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / QUIZ_DATA.length) * 100}%` }}
        ></div>
      </div>

      <div className="p-8 md:p-16 flex-1 flex flex-col justify-center">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full w-fit mb-6">
          Pertanyaan {currentIdx + 1}
        </span>
        <h3 className="text-xl md:text-3xl font-bold text-slate-800 leading-tight mb-12">
          {q.q}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {q.opts.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-5 group ${
                answers[currentIdx] === opt.id
                  ? "border-indigo-600 bg-indigo-50 shadow-md"
                  : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center font-black transition-all ${
                  answers[currentIdx] === opt.id
                    ? "bg-indigo-600 text-white rotate-6"
                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                }`}
              >
                {opt.id}
              </span>
              <span
                className={`font-bold flex-1 leading-snug ${answers[currentIdx] === opt.id ? "text-indigo-900" : "text-slate-600"}`}
              >
                {opt.t}
              </span>
              {answers[currentIdx] === opt.id && (
                <span className="material-symbols-outlined text-indigo-600 animate-in zoom-in duration-300">check_circle</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentIdx === 0}
          className="h-14 px-8 rounded-2xl font-bold text-slate-400 hover:text-slate-700 disabled:opacity-0 transition-all flex items-center gap-2 uppercase text-xs"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
          Sebelumnya
        </button>

        {currentIdx === QUIZ_DATA.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < QUIZ_DATA.length}
            className="h-14 px-10 rounded-2xl font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600 shadow-opacity-20 transition-all flex items-center gap-3 disabled:opacity-50"
          >
            SELESAI & KIRIM <span className="material-symbols-outlined font-black">verified</span>
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="h-14 px-10 rounded-2xl font-black text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center gap-3 shadow-lg shadow-slate-900 shadow-opacity-10"
          >
            LANJUTKAN <span className="material-symbols-outlined font-black">arrow_forward</span>
          </button>
        )}
      </div>

      {currentIdx === QUIZ_DATA.length - 1 && answeredCount < QUIZ_DATA.length && (
        <div className="bg-orange-50 px-8 py-3 flex items-center justify-center gap-2 text-orange-600">
           <span className="material-symbols-outlined text-sm">warning</span>
           <p className="text-[10px] font-black uppercase tracking-widest">
             Terdeteksi {QUIZ_DATA.length - answeredCount} soal belum terjawab. Harap periksa kembali.
           </p>
        </div>
      )}
    </div>
  );
}
