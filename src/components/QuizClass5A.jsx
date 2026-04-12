import React, { useState, useEffect } from 'react';

const QUIZ_QUESTIONS = [
  {
    n: 1,
    q: 'Belajar adalah proses perubahan perilaku yang relatif permanen. Apa pemicu utama perubahan tersebut?',
    opts: [
      { id: "A", t: "Bakat bawaan sejak lahir" },
      { id: "B", t: "Pengalaman dan interaksi dengan lingkungan" },
      { id: "C", t: "Pertumbuhan usia secara fisik" },
      { id: "D", t: "Instruksi searah dari guru" }
    ],
    ans: "B"
  },
  {
    n: 2,
    q: 'Salah satu ciri belajar adalah bersifat "sadar dan bertujuan". Apa makna dari ciri tersebut?',
    opts: [
      { id: "A", t: "Belajar terjadi secara kebetulan" },
      { id: "B", t: "Belajar hanya dilakukan saat berada di dalam kelas" },
      { id: "C", t: "Individu menyadari proses dan memiliki target yang ingin dicapai" },
      { id: "D", t: "Belajar tidak memerlukan konsentrasi tinggi" }
    ],
    ans: "C"
  },
  {
    n: 3,
    q: 'Dalam pembelajaran modern, guru berperan sebagai "fasilitator". Apa tugas utama seorang fasilitator?',
    opts: [
      { id: "A", t: "Memberikan ceramah dari awal sampai akhir sesi" },
      { id: "B", t: "Menciptakan kondisi agar siswa aktif dan mudah memahami materi" },
      { id: "C", t: "Menentukan jawaban yang mutlak benar bagi siswa" },
      { id: "D", t: "Menghukum siswa yang tidak bisa menjawab pertanyaan" }
    ],
    ans: "B"
  },
  {
    n: 4,
    q: 'Komponen pembelajaran yang berfungsi sebagai subjek sekaligus objek belajar adalah...',
    opts: [
      { id: "A", t: "Guru" },
      { id: "B", t: "Siswa" },
      { id: "C", t: "Materi" },
      { id: "D", t: "Media" }
    ],
    ans: "B"
  },
  {
    n: 5,
    q: 'Mengapa komponen "Tujuan" dianggap sebagai pilar utama dalam perencanaan pembelajaran?',
    opts: [
      { id: "A", t: "Agar guru terlihat pintar di depan siswa" },
      { id: "B", t: "Sebagai alat untuk memberikan nilai rapor" },
      { id: "C", t: "Menentukan arah, sasaran, dan evaluasi ketercapaian belajar" },
      { id: "D", t: "Karena tujuan sudah ditentukan oleh kementerian" }
    ],
    ans: "C"
  },
  {
    n: 6,
    q: 'Prinsip belajar yang menekankan pentingnya dorongan kemauan untuk mencapai target disebut...',
    opts: [
      { id: "A", t: "Prinsip Perhatian dan Motivasi" },
      { id: "B", t: "Prinsip Pengulangan" },
      { id: "C", t: "Prinsip Tantangan" },
      { id: "D", t: "Prinsip Perbedaan Individual" }
    ],
    ans: "A"
  },
  {
    n: 7,
    q: 'Siswa harus melakukan sendiri dan mengalami sendiri proses belajar. Hal ini sesuai dengan prinsip...',
    opts: [
      { id: "A", t: "Asosiasi" },
      { id: "B", t: "Keterlibatan Langsung" },
      { id: "C", t: "Kesiapan Fisik" },
      { id: "D", t: "Penguatan" }
    ],
    ans: "B"
  },
  {
    n: 8,
    q: '"Law of Exercise" dari Thorndike menekankan bahwa belajar akan lebih berhasil jika dilakukan...',
    opts: [
      { id: "A", t: "Sekali saja dengan sangat keras" },
      { id: "B", t: "Hanya saat menjelang ujian" },
      { id: "C", t: "Melalui proses pengulangan dan latihan rutin" },
      { id: "D", t: "Sambil mendengarkan musik" }
    ],
    ans: "C"
  },
  {
    n: 9,
    q: 'Pemberian materi yang memiliki hambatan untuk diatasi siswa bertujuan untuk memicu gairah belajar. Ini disebut prinsip...',
    opts: [
      { id: "A", t: "Prinsip Balikan" },
      { id: "B", t: "Prinsip Perbedaan" },
      { id: "C", t: "Prinsip Tantangan" },
      { id: "D", t: "Prinsip Keaktifan" }
    ],
    ans: "C"
  },
  {
    n: 10,
    q: 'Siswa akan lebih bersemangat jika segera mengetahui hasil pekerjaannya benar atau salah. Hal ini menerapkan prinsip...',
    opts: [
      { id: "A", t: "Balikan dan Penguatan" },
      { id: "B", t: "Diferensiasi" },
      { id: "C", t: "Keaktifan Jasmani" },
      { id: "D", t: "Orientasi Tujuan" }
    ],
    ans: "A"
  },
  {
    n: 11,
    q: 'Sudut pandang terhadap proses pembelajaran yang masih bersifat sangat umum disebut...',
    opts: [
      { id: "A", t: "Teknik" },
      { id: "B", t: "Metode" },
      { id: "C", t: "Pendekatan" },
      { id: "D", t: "Strategi" }
    ],
    ans: "C"
  },
  {
    n: 12,
    q: 'Rencana terstruktur (plan) yang mencakup sasaran, metode, dan sumber daya disebut...',
    opts: [
      { id: "A", t: "Gaya Mengajar" },
      { id: "B", t: "Strategi Pembelajaran" },
      { id: "C", t: "Alat Peraga" },
      { id: "D", t: "Rencana Evaluasi" }
    ],
    ans: "B"
  },
  {
    n: 13,
    q: 'Manakah pernyataan yang benar mengenai hubungan Strategi dan Metode?',
    opts: [
      { id: "A", t: "Strategi lebih spesifik daripada metode" },
      { id: "B", t: "Metode adalah 'plan', Strategi adalah 'action'" },
      { id: "C", t: "Strategi adalah 'plan of operation', Metode adalah 'a way in achieving'" },
      { id: "D", t: "Tidak ada perbedaan antara strategi dan metode" }
    ],
    ans: "C"
  },
  {
    n: 14,
    q: 'Strategi di mana guru menyajikan materi secara utuh dan siswa tinggal menghafalnya disebut strategi...',
    opts: [
      { id: "A", t: "Heuristik" },
      { id: "B", t: "Ekspositori" },
      { id: "C", t: "Inkuiri" },
      { id: "D", t: "PBL" }
    ],
    ans: "B"
  },
  {
    n: 15,
    q: 'Strategi yang menuntut siswa menemukan sendiri konsep tanpa diberitahu sebelumnya oleh guru disebut...',
    opts: [
      { id: "A", t: "Discovery Learning" },
      { id: "B", t: "Direct Instruction" },
      { id: "C", t: "Lecturing" },
      { id: "D", t: "Demonstration" }
    ],
    ans: "A"
  },
  {
    n: 16,
    q: 'Faktor Guru sangat menentukan pemilihan strategi karena berkaitan dengan...',
    opts: [
      { id: "A", t: "Gaji yang diterima guru" },
      { id: "B", t: "Latar belakang pendidikan dan kemampuan mengajar guru" },
      { id: "C", t: "Usia pensiun guru" },
      { id: "D", t: "Jumlah jam mengajar guru per minggu" }
    ],
    ans: "B"
  },
  {
    n: 17,
    q: 'Kurikulum atau Bahan Pelajaran memengaruhi strategi karena...',
    opts: [
      { id: "A", t: "Bahan yang sulit butuh strategi yang lebih mendalam" },
      { id: "B", t: "Setiap buku paket harus habis dibaca" },
      { id: "C", t: "Hanya materi matematika yang butuh strategi" },
      { id: "D", t: "Guru tidak boleh menambah materi sendiri" }
    ],
    ans: "A"
  },
  {
    n: 18,
    q: 'Cara spesifik atau operasional yang digunakan guru dalam mengajar pada saat itu disebut...',
    opts: [
      { id: "A", t: "Visi Misi" },
      { id: "B", t: "Model" },
      { id: "C", t: "Teknik Pembelajaran" },
      { id: "D", t: "Kurikulum" }
    ],
    ans: "C"
  },
  {
    n: 19,
    q: 'Urutan hierarki pembelajaran dari yang paling luas ke paling spesifik adalah...',
    opts: [
      { id: "A", t: "Teknik > Metode > Strategi > Pendekatan" },
      { id: "B", t: "Strategi > Pendekatan > Metode > Teknik" },
      { id: "C", t: "Pendekatan > Strategi > Metode > Teknik" },
      { id: "D", t: "Metode > Teknik > Strategi > Pendekatan" }
    ],
    ans: "C"
  },
  {
    n: 20,
    q: 'Pemanfaatan media dalam pembelajaran bertujuan sebagai...',
    opts: [
      { id: "A", t: "Hiasan di dalam kelas" },
      { id: "B", t: "Alat bantu untuk memperjelas pesan atau konsep" },
      { id: "C", t: "Pengganti peran guru sepenuhnya" },
      { id: "D", t: "Syarat akreditasi sekolah saja" }
    ],
    ans: "B"
  }
];

export default function QuizClass5A({ user, meetingId, onComplete, submissions }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [gameState, setGameState] = useState("INTRO"); // INTRO, PLAYING, FINISHED
  const [showExplanation, setShowExplanation] = useState(false);

  // Cek apakah sudah pernah mengerjakan
  const statusRow = submissions?.find(
    (s) => s.student_email === user.email && s.section_name === "Kuis dan Latihan"
  );

  useEffect(() => {
    if (statusRow) {
      setGameState("FINISHED");
    }
  }, [statusRow]);

  useEffect(() => {
    if (gameState === "INTRO") {
      // Acak soal saat mulai
      const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
    }
  }, [gameState]);

  const handleStart = () => {
    setGameState("PLAYING");
  };

  const handleSelect = (ansId) => {
    setAnswers({ ...answers, [currentIdx]: ansId });
  };

  const nextQuestion = () => {
    if (currentIdx < shuffledQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    shuffledQuestions.forEach((q, idx) => {
      if (answers[idx] === q.ans) score += 5; // 20 soal * 5 = 100
    });
    return score;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setGameState("FINISHED");
    const reportText = `[SKOR AKHIR: ${finalScore}/100]\n(Hasil Kuis Interaktif diselesaikan secara otomatis)\nTerisi: ${Object.keys(answers).length} dari 20 soal.`;
    if (onComplete) onComplete(reportText);
  };

  if (gameState === "INTRO") {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-emerald-50 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full -mr-16 -mt-16"></div>
          <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-emerald-500">assignment</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4">Misi Evaluasi</h2>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            Siapkan diri Anda untuk 20 tantangan pilihan ganda mengenai konsep Belajar & Pembelajaran.
            <br/><span className="text-emerald-500 font-bold">Setiap jawaban benar bernilai 5 poin.</span>
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black uppercase text-slate-400">Durasi</p>
              <p className="font-bold text-slate-700">Santai</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black uppercase text-slate-400">Total Soal</p>
              <p className="font-bold text-slate-700">20 Butir</p>
            </div>
          </div>
          <button 
            onClick={handleStart}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-emerald-200 active:scale-95"
          >
            MULAI SEKARANG
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "FINISHED" || statusRow) {
    const finalScore = calculateScore();
    const dbScore = statusRow?.content?.match(/SKOR AKHIR: (\d+)/)?.[1];
    const scoreToShow = dbScore ? parseInt(dbScore) : finalScore;
    const isPassed = scoreToShow >= 70;
    const correct = Math.round(scoreToShow / 5);
    const wrong = 20 - correct;

    return (
      <div className="max-w-2xl mx-auto py-10 px-4 animate-in zoom-in duration-500">
        <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-emerald-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white">
            <span className="material-symbols-outlined text-5xl text-emerald-500">
              {isPassed ? 'workspace_premium' : 'auto_awesome'}
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Evaluasi Selesai!</h2>
          <p className="text-slate-500 mb-8 font-medium">Berikut adalah pencapaian Anda hari ini:</p>
          
          {/* Score Box */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 mb-6 relative group cursor-default">
             <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-all rounded-[2.5rem]"></div>
             <p className="text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase mb-1">Skor Akhir</p>
             <h3 className="text-7xl font-black text-white mb-2">{scoreToShow}</h3>
             <p className="text-slate-400 text-xs font-semibold">dari 100 poin</p>
          </div>

          {/* Summary Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <p className="text-2xl font-black text-emerald-600">{correct}</p>
              <p className="text-[10px] font-bold text-emerald-500 uppercase">Benar</p>
            </div>
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
              <p className="text-2xl font-black text-red-500">{wrong}</p>
              <p className="text-[10px] font-bold text-red-400 uppercase">Salah</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-2xl font-black text-slate-700">20</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Soal</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm mb-6 ${
            isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            <span className="material-symbols-outlined text-base">{isPassed ? 'check_circle' : 'info'}</span>
            {isPassed ? 'LULUS — Nilai di atas KKM 70' : 'PERLU PERBAIKAN — Nilai di bawah KKM 70'}
          </div>

          <p className="text-sm font-medium text-slate-400">
            Nilai Anda telah tersimpan secara otomatis<br/>di Dashboard Tutor SPGK4410.
          </p>
        </div>
      </div>
    );
  }

  const q = shuffledQuestions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-24">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <h4 className="font-black text-emerald-500 uppercase text-[10px] tracking-widest">Pertanyaan {currentIdx + 1} s/d 20</h4>
          <p className="font-black text-slate-300 text-xs font-mono">{Math.round(((currentIdx + 1) / 20) * 100)}%</p>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentIdx + 1) / 20) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 mb-6 min-h-[400px] flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-10 leading-snug">
          {q?.q}
        </h3>

        <div className="space-y-4 flex-1">
          {q?.opts.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`w-full p-5 rounded-2xl text-left transition-all flex items-center gap-4 group relative overflow-hidden ${
                answers[currentIdx] === opt.id 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 border-transparent' 
                : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-emerald-300 hover:bg-white'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                answers[currentIdx] === opt.id ? 'bg-white bg-opacity-20 text-white' : 'bg-white text-emerald-500 shadow-sm'
              }`}>
                {opt.id}
              </div>
              <p className="font-semibold text-sm leading-relaxed">{opt.t}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {currentIdx === shuffledQuestions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!answers[currentIdx]}
            className="flex-1 bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            SUBMIT JAWABAN <span className="material-symbols-outlined">send</span>
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            disabled={!answers[currentIdx]}
            className="flex-1 bg-emerald-500 text-white font-black py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            LANJUT <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
}
