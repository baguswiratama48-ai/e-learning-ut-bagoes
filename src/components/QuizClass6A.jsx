import React, { useState, useEffect, useMemo } from "react";

// ============================================================
// BANK SOAL KELAS 6A ABK — SESI 2
// Total: 30 soal (25 soal ditampilkan per mahasiswa, diacak via seed)
//
// Tipe soal:
//   type: "pilgan"      → Pilihan Ganda A/B/C/D, answer: 0-3
//   type: "benar_salah" → Benar(0) atau Salah(1)
// ============================================================
const QUIZ_DATA = [
  // ── Soal 1–12: Pilihan Ganda (Autism) ─────────────────────
  {
    type: "pilgan",
    text: "Gangguan autism memiliki variasi dalam bentuk dan tingkat keparahan, sehingga autism biasa disebut sebagai ....",
    options: [
      "pervasive development disorder",
      "autistic disorder",
      "autistic spectrum disorder",
      "early infantile autism",
    ],
    answer: 2,
  },
  {
    type: "pilgan",
    text: "Anak autism dengan tingkat intelegensi rendah, nonverbal, dan sering menyakiti diri sendiri tergolong ....",
    options: [
      "early infantile autism",
      "low functioning autism",
      "high functioning autism",
      "severe autism",
    ],
    answer: 1,
  },
  {
    type: "pilgan",
    text: "Untuk menentukan ukuran tingkat keparahan autism, digunakan suatu checklist yang disebut ....",
    options: [
      "childhood autism rating scale",
      "children autism rating scale",
      "measurement to autistic children",
      "scale for autistic children",
    ],
    answer: 0,
  },
  {
    type: "pilgan",
    text: "Orang pertama yang meneliti tentang kasus autism pada anak adalah ....",
    options: [
      "Eugene Bleuler",
      "Leo Kanner",
      "Rutter",
      "Mash & Wolfe",
    ],
    answer: 1,
  },
  {
    type: "pilgan",
    text: "Di bawah ini yang bukan merupakan karakteristik utama autism adalah ....",
    options: [
      "kesulitan dalam interaksi sosial",
      "kesulitan dalam komunikasi",
      "adanya perilaku dan minat yang kaku-berulang",
      "adanya kelainan sensorik",
    ],
    answer: 3,
  },
  {
    type: "pilgan",
    text: "Pola perilaku yang stereotype dan repetitive ditunjukkan oleh perilaku berikut ini..",
    options: [
      "melihat dengan sudut mata",
      "handflapping",
      "penggunaan bahasa aneh dalam berbicara",
      "lebih suka bermain dengan benda daripada dengan teman",
    ],
    answer: 1,
  },
  {
    type: "pilgan",
    text: "Sehubungan dengan keterbatasan komunikasinya, Anak dengan gangguan autism sering dikira ....",
    options: [
      "nakal",
      "gila",
      "tuli",
      "lumpuh",
    ],
    answer: 2,
  },
  {
    type: "pilgan",
    text: "Di bawah ini termasuk dalam kesulitan interaksi sosial, kecuali ....",
    options: [
      "tidak ada kontak mata saat diajak bicara",
      "tidak dapat mempertahankan percakapan dengan orang lain",
      "tidak mampu menggunakan ekspresi wajah yang sesuai dengan percakapan",
      "tidak bisa membangun hubungan emosional yang timbal balik dengan orang lain",
    ],
    answer: 1,
  },
  {
    type: "pilgan",
    text: "Beberapa anak autism marah dan protes saat dipeluk. Hal ini disebabkan oleh ....",
    options: [
      "anak memiliki hypersensitivitas",
      "anak memiliki hyposensitivitas",
      "anak tidak mengenal orang yang memeluknya",
      "anak tidak tertarik pada manusia",
    ],
    answer: 0,
  },
  {
    type: "pilgan",
    text: "Dari hasil tes inteligensi, anak autism memiliki taraf kecerdasan ....",
    options: [
      "di bawah rata-rata",
      "di atas rata-rata",
      "genius/gifted",
      "bervariasi, mulai Intelectual Disabilities sampai genius",
    ],
    answer: 3,
  },
  {
    type: "pilgan",
    text: "Permasalahan belajar yang sering muncul pada anak autism adalah ....",
    options: [
      "ketidakmampuan mengerjakan soal yang diberikan",
      "konsentrasi belajar, karena hanya fokus pada apa yang menjadi minatnya",
      "sering berlarian dan mengganggu teman",
      "sering bicara sendiri",
    ],
    answer: 1,
  },
  {
    type: "pilgan",
    text: "Apa yang dimaksud dengan autism savant?",
    options: [
      "anak autism yang memiliki banyak permasalahan perkembangan",
      "anak autism yang memiliki inteligensi di taraf rata-rata",
      "anak autism yang memiliki kemampuan tinggi yang jauh di atas rata-rata orang kebanyakan pada area tertentu",
      "anak autism yang tidak memiliki masalah belajar",
    ],
    answer: 2,
  },

  // ── Soal 13–17: Benar / Salah ─────────────────────────────
  {
    type: "benar_salah",
    text: "Penanganan Anak dengan gangguan autism ditujukan untuk mengejar keterlambatan perkembangan yang dialaminya.",
    answer: 0, // Benar
  },
  {
    type: "benar_salah",
    text: "Fokus utama penanganan pada Anak dengan gangguan autism diarahkan untuk meningkatkan kemampuan motorik dan kognitifnya.",
    answer: 1, // Salah
  },
  {
    type: "benar_salah",
    text: "Rudi dan Nita adalah dua orang anak berusia 5 tahun yang sama-sama telah didiagnosa sebagai anak dengan gangguan autism. Karena keduanya memiliki usia dan masalah yang sama, maka penanganan yang dilakukan untuk mereka sebaiknya sama.",
    answer: 1, // Salah
  },
  {
    type: "benar_salah",
    text: "Metode terapi ABA bagi penanganan anak dengan gangguan autism disebut juga dengan metode lovass",
    answer: 0, // Benar
  },
  {
    type: "benar_salah",
    text: "Dikarenakan memiliki masalah dalam hal komunikasi dan sosialisasi, maka anak dengan gangguan autism tidak dapat bersekolah di sekolah umum",
    answer: 1, // Salah
  },

  // ── Soal 18–30: Pilihan Ganda (Autism & ADD/ADHD) ─────────
  {
    type: "pilgan",
    text: "Saat yang paling tepat untuk melakukan penanganan pada anak dengan gangguan autism adalah ....",
    options: [
      "sebelum satu tahun",
      "balita",
      "5 tahun",
      "Kapan saja",
    ],
    answer: 1,
  },
  {
    type: "pilgan",
    text: "Deteksi dan penanganan dini pada anak-anak dengan gangguan autism penting dilakukan agar ....",
    options: [
      "anak segera mendapat penanganan yang tepat untuk membantu perkembangannya",
      "orang tua tidak terlalu 'shock' mendengar anaknya autism",
      "anak dapat segera diberi tahu bahwa ia memiliki gangguan autism sehingga ia tidak malu dengan keadaannya",
      "obat-obatan yang tepat dapat segera diberikan kepada anak sehingga ia cepat sembuh",
    ],
    answer: 0,
  },
  {
    type: "pilgan",
    text: "Hal-hal di bawah ini dapat dilakukan oleh guru dalam menangani anak dengan gangguan autism di dalam kelas, kecuali ....",
    options: [
      "Belajar menyelami emosi anak sehingga ia dapat merespons emosi dengan tepat",
      "Terus memberikan stimulasi pada anak",
      "Melatih insting sosial dan mengajarkan interaksi sosial",
      "Membuat anak merasa nyaman dengan keadaannya sehingga ia dapat bergaul secara baik dengan teman-temannya.",
    ],
    answer: 3,
  },
  {
    type: "pilgan",
    text: "Salah satu ciri dari anak penyandang ADD/ADHD adalah ....",
    options: [
      "banyak bertanya",
      "aktif",
      "sering meninggalkan tempat duduk di kelas",
      "semua benar",
    ],
    answer: 2,
  },
  {
    type: "pilgan",
    text: "Salah satu ciri dari simptom inattention dari gangguan ADD/ADHD adalah ....",
    options: [
      "sering tidak mendengar instruksi selesai dibacakan",
      "sering tidak melaksanakan tugas yang diberikan",
      "sering lupa kejadian yang terjadi sehari hari",
      "tidak bisa menunggu antrian",
    ],
    answer: 2,
  },
  {
    type: "pilgan",
    text: "Salah satu ciri dari simptom hiperaktif dari gangguan ADD/ADHD adalah ....",
    options: [
      "sering menjawab pertanyaan yang belum selesai",
      "sulit menunggu giliran",
      "berbicara berlebihan",
      "sering menginterupsi pembicaraan atau percakapan orang lain",
    ],
    answer: 2,
  },
  {
    type: "pilgan",
    text: "Salah satu ciri dari simptom impulsif dari gangguan ADD/ADHD adalah ....",
    options: [
      "sulit menunggu giliran",
      "kesulitan untuk melakukan aktivitas santai atau bermain dengan tenang",
      "selalu siap bergerak atau tampak digerakkan oleh motor",
      "berbicara berlebihan",
    ],
    answer: 0,
  },
  {
    type: "pilgan",
    text: "Salah satu faktor lingkungan penyebab gangguan ADD/ADHD adalah ....",
    options: [
      "ibu merokok saat mengandung",
      "konsumsi alkohol saat mengandung",
      "tinggal di gedung yang tua",
      "semua benar",
    ],
    answer: 3,
  },
  {
    type: "pilgan",
    text: "Salah satu pernyataan yang tepat dari penegakan diagnosa ADD/ADHD tipe predominantly inattention adalah ....",
    options: [
      "gangguan sudah mulai ada pada usia 5 tahun",
      "simptom inattentive setidaknya sudah berlangsung selama 6 bulan",
      "setidaknya memiliki 6 atau lebih simptom inattentive",
      "B dan C benar",
    ],
    answer: 2,
  },
  {
    type: "pilgan",
    text: "Anak-anak dengan ADD/ADHD tipe predominantly inattentive seringkali mendapat penilaian yang salah dimana mereka dianggap sebagai anak dengan gangguan ....",
    options: [
      "emosi",
      "belajar",
      "mental",
      "semua benar",
    ],
    answer: 1,
  },
  {
    type: "pilgan",
    text: "Masalah akademis yang terjadi pada anak-anak ADD/ADHD tipe predominantly hiperaktif-impulsif disebabkan oleh ....",
    options: [
      "sulitnya menyaring stimulus yang penting dan tidak penting",
      "mengutamakan kecepatan dibandingkan keakuratan dalam mengerjakan tugas",
      "tidak mau mendengarkan instruksi sampai selesai",
      "B dan C benar",
    ],
    answer: 3,
  },
  {
    type: "pilgan",
    text: "Treatment yang paling tepat untuk anak-anak penyandang ADD/ADHD adalah ....",
    options: [
      "program manajemen perilaku",
      "penanganan menggunakan obat-obatan",
      "training orang tua dan guru",
      "kombinasi program manajemen perilaku dan obat-obatan",
    ],
    answer: 3,
  },
  {
    type: "pilgan",
    text: "Guru adalah pihak yang penting dalam penanganan anak penyandang ADD/ADHD karena ....",
    options: [
      "dapat menasihati anak untuk bisa berperilaku adaptif di sekolah",
      "bisa memotivasi anak untuk bisa rajin belajar",
      "menjadi partner psikolog dan terapis melatihkan keterampilan atau perilaku yang ingin dibentuk",
      "semua benar",
    ],
    answer: 2,
  },
];

// ============================================================
// Seeded Random Generator (sama seperti logika kelas 8B/8C)
// ============================================================
function cyrb128(str) {
  let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

function getSeededRandom(seed) {
  let a = cyrb128(seed)[0];
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleArray(array, randFunc) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randFunc() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============================================================
// Komponen Utama
// ============================================================
export default function QuizClass6A({ user, meetingId, submissions, onComplete }) {
  // Cek apakah bank soal sudah terisi (min 25 soal)
  const isQuestionBankReady = QUIZ_DATA.length >= 25;

  // Generate 25 soal unik per mahasiswa dari single pool 30 soal, konsisten via seed
  const finalQuestions = useMemo(() => {
    if (!user?.email || !isQuestionBankReady) return [];

    const randFunc = getSeededRandom(`${user.email}_6a_${meetingId}`);
    const shuffled = shuffleArray(QUIZ_DATA, randFunc);
    // Ambil 25 dari 30 soal yang sudah diacak, tandai sumber
    return shuffled.slice(0, 25).map((q) => ({ ...q, source: "ABK Sesi 2" }));
  }, [user, meetingId, isQuestionBankReady]);

  const TOTAL_SOAL = 25;
  const POIN_PER_SOAL = 4; // 25 soal × 4 poin = 100

  const draftKey = `quiz_draft_6a_${user?.email}_${meetingId}`;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });
  const [gameState, setGameState] = useState("INTRO");

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(draftKey, JSON.stringify(answers));
    }
  }, [answers, draftKey]);

  // Cek apakah sudah pernah submit
  const statusRow = (submissions || []).find(
    (s) => s.student_email === user?.email && s.section_name === "Kuis dan Latihan"
  );

  useEffect(() => {
    if (statusRow && gameState !== "FINISHED") {
      setGameState("FINISHED");
    }
  }, [statusRow, gameState]);

  const handleSelect = (qIdx, ansIdx) => {
    setAnswers({ ...answers, [qIdx]: ansIdx });
  };

  const calculateScore = () => {
    let score = 0;
    finalQuestions.forEach((q, idx) => {
      if (answers[idx] === q.answer) score += POIN_PER_SOAL;
    });
    return Math.round(score);
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setGameState("FINISHED");

    const reportText =
      `[SKOR AKHIR: ${finalScore}/100]\n` +
      `(Hasil Kuis ABK Sesi ${meetingId} diselesaikan secara otomatis)\n` +
      `Terisi: ${Object.keys(answers).length} dari ${TOTAL_SOAL} soal.\n\n` +
      `Detail Pilihan:\n` +
      JSON.stringify(answers);

    onComplete(reportText);
    localStorage.removeItem(draftKey);
  };

  // ── STATE: BANK SOAL BELUM SIAP ──────────────────────────────
  if (!isQuestionBankReady) {
    return (
      <div className="max-w-2xl mx-auto bg-amber-50 border-2 border-amber-200 rounded-[2.5rem] p-10 text-center">
        <span className="material-symbols-outlined text-6xl text-amber-400 mb-4 block">pending</span>
        <h2 className="text-2xl font-black text-slate-800 mb-3">Soal Sedang Dipersiapkan</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Bank soal kuis belum tersedia. Tutor sedang mempersiapkan soal-soal untuk sesi ini.
          Silakan cek kembali nanti.
        </p>
      </div>
    );
  }

  // ── STATE: SUDAH SELESAI / SUDAH SUBMIT ──────────────────────
  if (statusRow || gameState === "FINISHED") {
    const finalScore = calculateScore();
    const sc = statusRow
      ? parseInt(statusRow.content.match(/SKOR AKHIR: (\d+)/)?.[1] || finalScore)
      : finalScore;

    let savedAnswers = answers;
    if (statusRow && Object.keys(answers).length === 0) {
      try {
        const jsonStr = statusRow.content.split("Detail Pilihan:\n")[1];
        if (jsonStr) savedAnswers = JSON.parse(jsonStr);
      } catch (e) {}
    }

    return (
      <div className="space-y-8 animate-in fade-in zoom-in duration-700">
        {/* Kartu Skor */}
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 to-[#1a2169] opacity-10" />

          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-8 relative shadow-xl shadow-indigo-500/30">
            <span className="material-symbols-outlined text-5xl text-white">
              {sc >= 80 ? "military_tech" : sc >= 60 ? "thumb_up" : "menu_book"}
            </span>
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Kuis Formatif Selesai</h2>
          <p className="text-slate-500 font-medium mb-10">
            Hasil pengerjaan Anda telah tersimpan dan otomatis direkap ke Dasbor Tutor.
          </p>

          <div className="bg-slate-50 rounded-[2rem] p-10 max-w-sm mx-auto border border-slate-100 relative mb-10 shadow-inner">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Pencapaian Skor Total
            </p>
            <p className={`text-7xl font-black tracking-tighter ${sc >= 80 ? "text-emerald-500" : sc >= 60 ? "text-amber-500" : "text-rose-500"}`}>
              {sc}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>Dari 100 Poin</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
            </div>
          </div>
        </div>

        {/* Rapor Koreksi */}
        <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-500">fact_check</span>
            Rapor Koreksi Jawaban
          </h3>
          <div className="space-y-6">
            {finalQuestions.map((q, i) => {
              const ans = savedAnswers[i];
              const isCorrect = ans === q.answer;
              const didAnswer = ans !== undefined && ans !== null;

              return (
                <div
                  key={i}
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    isCorrect ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 font-black shadow-sm ${
                        isCorrect ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {isCorrect ? "check" : "close"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">
                        Soal {i + 1} • {q.source}
                      </p>
                      <p className="font-bold text-slate-800 text-sm mb-4 leading-relaxed whitespace-pre-wrap">
                        {q.text}
                      </p>
                      <div className="space-y-2">
                        {/* badge tipe soal */}
                        <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-2 ${
                          q.type === "benar_salah"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}>
                          {q.type === "benar_salah" ? "Benar / Salah" : "Pilihan Ganda"}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest min-w-[60px]">
                            Jawaban:
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              isCorrect ? "text-emerald-700" : "text-rose-600 line-through opacity-80"
                            }`}
                          >
                            {!didAnswer
                              ? "— Kosong —"
                              : q.type === "benar_salah"
                              ? ["Benar", "Salah"][ans]
                              : q.options[ans]}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-rose-200/50">
                            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest min-w-[60px]">
                              Kunci:
                            </span>
                            <span className="text-sm font-bold text-emerald-700">
                              {q.type === "benar_salah"
                                ? ["Benar", "Salah"][q.answer]
                                : q.options[q.answer]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── STATE: INTRO ──────────────────────────────────────────────
  if (gameState === "INTRO") {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-200 shadow-sm flex flex-col items-center text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-gradient-to-br from-[#1a2169] to-indigo-700 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-600/30 transform rotate-3">
          <span className="material-symbols-outlined text-4xl transform -rotate-3">auto_awesome</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">KUIS EVALUASI MODUL</h1>
        <p className="text-slate-500 font-medium mb-3 leading-relaxed">
          Sistem telah menyiapkan <span className="font-black text-indigo-600">{TOTAL_SOAL} soal</span> pilihan ganda dari materi ABK.
          Kerjakan dengan teliti dan jujur. Pastikan Anda telah mempelajari seluruh materi sebelum memulai.
        </p>
        <p className="text-xs text-slate-400 font-semibold mb-10 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
          Setiap mahasiswa mendapatkan soal yang diacak secara unik berdasarkan akun Anda.
        </p>

        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
            <p className="text-3xl font-black text-indigo-600 mb-1">{TOTAL_SOAL}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Soal</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
            <p className="text-3xl font-black text-indigo-600 mb-1">100</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Poin Maks</p>
          </div>
        </div>

        <button
          onClick={() => setGameState("PLAYING")}
          className="w-full bg-[#1a2169] text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-800 active:scale-95 transition-all shadow-xl shadow-[#1a2169]/30 flex items-center justify-center gap-2"
        >
          MULAI KERJAKAN SEKARANG
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    );
  }

  // ── STATE: PLAYING ────────────────────────────────────────────
  const currentQ = finalQuestions[currentIdx];
  const totalQ = finalQuestions.length;
  const progressPct = (currentIdx / totalQ) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">

      {/* Progress Bar Sticky */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm sticky top-4 z-10 flex items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
            <span>Progres Pengerjaan</span>
            <span className="text-indigo-600">{currentIdx + 1} / {totalQ}</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <div className="hidden md:flex bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex-col items-center justify-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Terjawab</span>
          <span className="text-lg font-black text-indigo-600 leading-none">{answeredCount}</span>
        </div>
      </div>

      {/* Kartu Soal */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-md">
        <div className="mb-8">
          <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4">
            Soal Ke-{currentIdx + 1} • {currentQ.source}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed whitespace-pre-wrap">
            {currentQ.text}
          </h2>
        </div>

        {/* ── Pilihan Ganda ─────────────────────────────────────────── */}
        {currentQ.type === "pilgan" && (
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const label = ["A", "B", "C", "D"][optIdx];
              const isSelected = answers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(currentIdx, optIdx)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100"
                      : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white rotate-3"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`font-semibold flex-1 leading-snug text-sm md:text-base ${
                      isSelected ? "text-indigo-900" : "text-slate-700"
                    }`}
                  >
                    {opt}
                  </span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-indigo-500 animate-in zoom-in duration-200">
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Benar / Salah ─────────────────────────────────────────── */}
        {currentQ.type === "benar_salah" && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            {["Benar", "Salah"].map((label, optIdx) => {
              const isSelected = answers[currentIdx] === optIdx;
              const colorSelected = optIdx === 0
                ? "border-emerald-500 bg-emerald-50 shadow-emerald-100"
                : "border-rose-500 bg-rose-50 shadow-rose-100";
              const iconName  = optIdx === 0 ? "check_circle" : "cancel";
              const iconColor = optIdx === 0 ? "text-emerald-500" : "text-rose-500";
              const badgeBg   = optIdx === 0 ? "bg-emerald-500" : "bg-rose-500";
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(currentIdx, optIdx)}
                  className={`flex flex-col items-center justify-center gap-3 p-8 rounded-3xl border-2 transition-all font-black text-xl ${
                    isSelected
                      ? `${colorSelected} shadow-lg`
                      : "border-slate-100 hover:border-slate-300 bg-slate-50 hover:bg-white text-slate-400"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-5xl transition-all ${
                      isSelected ? iconColor : "text-slate-300"
                    }`}
                  >
                    {iconName}
                  </span>
                  <span className={isSelected ? (optIdx === 0 ? "text-emerald-700" : "text-rose-700") : "text-slate-500"}>
                    {label}
                  </span>
                  {isSelected && (
                    <span className={`${badgeBg} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full animate-in zoom-in duration-200`}>
                      Dipilih
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigasi */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
          className="h-14 px-8 rounded-2xl font-bold text-slate-400 hover:text-slate-700 disabled:opacity-0 transition-all flex items-center gap-2 uppercase text-xs bg-white border border-slate-200"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
          Sebelumnya
        </button>

        {currentIdx < totalQ - 1 ? (
          <button
            onClick={() => setCurrentIdx((i) => Math.min(totalQ - 1, i + 1))}
            className="h-14 px-10 rounded-2xl font-black text-white bg-[#1a2169] hover:bg-indigo-800 transition-all flex items-center gap-3 shadow-lg"
          >
            LANJUTKAN <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < totalQ}
            className="h-14 px-10 rounded-2xl font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/30 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            SELESAI & KIRIM <span className="material-symbols-outlined">verified</span>
          </button>
        )}
      </div>

      {/* Peringatan soal belum terjawab */}
      {currentIdx === totalQ - 1 && answeredCount < totalQ && (
        <div className="bg-orange-50 border border-orange-200 px-6 py-4 rounded-2xl flex items-center justify-center gap-3 text-orange-600">
          <span className="material-symbols-outlined text-sm">warning</span>
          <p className="text-[11px] font-black uppercase tracking-widest">
            Masih ada {totalQ - answeredCount} soal belum terjawab. Harap periksa kembali sebelum mengirim.
          </p>
        </div>
      )}
    </div>
  );
}
