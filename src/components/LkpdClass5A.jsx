import React, { useState } from 'react';

/**
 * LkpdClass5A - TOTAL STABILITY VERSION
 * This is a simplified version to fix the White Screen Error.
 */
export const LkpdClass5A = ({
  user,
  meetingId,
  submissions = [],
  onComplete,
  missions: propMissions
}) => {
  const [answers, setAnswers] = useState({});

  if (!user) return <div className="p-10 text-center">Silakan Login Kembali.</div>;

  // Simple Fallback Questions
  const questions = [
    "1. Apa hakikat belajar kolaboratif menurut pendapat Anda?",
    "2. Apa manfaat belajar kolaboratif bagi siswa SD?"
  ];

  const handleSubmit = () => {
    onComplete(JSON.stringify(answers));
  };

  return (
    <div className="p-8 md:p-12 bg-white rounded-[3rem] shadow-xl text-left animate-in fade-in duration-500 mt-10">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Lembar Kerja Mahasiswa (LKM)</h2>
        <p className="text-slate-400 font-medium">Sesi 2: Strategi Pembelajaran di SD</p>
      </div>

      <div className="space-y-10">
        {questions.map((q, i) => (
          <div key={i} className="space-y-4">
            <p className="font-bold text-slate-700 text-lg">{q}</p>
            <textarea
              className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl min-h-[150px] outline-none focus:border-primary transition-all"
              placeholder="Ketik jawaban di sini..."
              value={answers[i] || ""}
              onChange={(e) => setAnswers({...answers, [i]: e.target.value})}
            />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={handleSubmit}
          className="bg-primary text-white px-12 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all"
        >
          KIRIM JAWABAN
        </button>
      </div>
    </div>
  );
};
