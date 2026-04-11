import sys

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add QUIZ_DATA right before InteractiveMindMap
target1 = "const MIND_MAP_DATA = {"

replacement1 = """const QUIZ_DATA = [
  {
    n: 1,
    q: 'Secara literal, istilah "guidance" berasal dari akar kata "guide". Manakah di bawah ini yang merupakan salah satu arti dari kata tersebut?',
    opts: [
      { id: "A", t: "Mengarahkan (to direct)" },
      { id: "B", t: "Memaksa (to force)" },
      { id: "C", t: "Menghukum (to punish)" },
      { id: "D", t: "Menilai (to judge)" },
    ],
    ans: "A",
  },
  {
    n: 2,
    q: "Siapakah tokoh yang mengungkapkan definisi formal bimbingan pada awal abad ke-20 (tahun 1908)?",
    opts: [
      { id: "A", t: "Abraham Maslow" },
      { id: "B", t: "Carl Rogers" },
      { id: "C", t: "Sigmund Freud" },
      { id: "D", t: "Frank Parsons" },
    ],
    ans: "D",
  },
  {
    n: 3,
    q: 'Konseling sering disebut sebagai "jantung hati" dari layanan bimbingan. Apa makna dari istilah tersebut?',
    opts: [
      { id: "A", t: "BK hanya boleh dilakukan melalui konseling individu saja" },
      { id: "B", t: "Keberhasilan BK sangat ditentukan oleh efektivitas hubungan konseling" },
      { id: "C", t: "Konseling adalah layanan yang paling mahal harganya" },
      { id: "D", t: "Konselor hanya bertugas untuk mengobati gangguan mental berat" },
    ],
    ans: "B",
  },
  {
    n: 4,
    q: "Fungsi BK yang berupaya mencegah timbulnya masalah dengan memberikan arahan mengenai risiko perilaku tertentu disebut fungsi...",
    opts: [
      { id: "A", t: "Fungsi Kuratif" },
      { id: "B", t: "Fungsi Adaptasi" },
      { id: "C", t: "Fungsi Preventif" },
      { id: "D", t: "Fungsi Pemahaman" },
    ],
    ans: "C",
  },
  {
    n: 5,
    q: "Manakah yang merupakan tujuan BK dalam aspek akademik (belajar)?",
    opts: [
      { id: "A", t: "Memiliki pemahaman diri terkait minat pekerjaan" },
      { id: "B", t: "Memiliki keterampilan dan teknik belajar yang efektif" },
      { id: "C", t: "Mampu berinteraksi sosial dengan baik di masyarakat" },
      { id: "D", t: "Menghargai keberagaman agama di sekolah" },
    ],
    ans: "B",
  },
  {
    n: 6,
    q: 'Prinsip "Bimbingan ditujukan untuk semua orang" mengandung arti bahwa...',
    opts: [
      { id: "A", t: "Hanya siswa yang nakal yang mendapat bimbingan" },
      { id: "B", t: "Bimbingan diberikan tanpa memandang usia, jenis kelamin, atau status sosial" },
      { id: "C", t: "Bimbingan hanya untuk siswa yang akan lulus sekolah" },
      { id: "D", t: "Guru BK hanya melayani siswa yang berprestasi" },
    ],
    ans: "B",
  },
  {
    n: 7,
    q: "Pengambilan keputusan akhir dalam BK harus berasal dari keinginan pribadi individu sendiri. Hal ini sesuai dengan prinsip...",
    opts: [
      { id: "A", t: "Bimbingan menekankan aspek positif" },
      { id: "B", t: "Bimbingan merupakan usaha bersama" },
      { id: "C", t: "Kemandirian dalam pengambilan keputusan" },
      { id: "D", t: "Bimbingan bersifat berkelanjutan" },
    ],
    ans: "C",
  },
  {
    n: 8,
    q: "Asas yang mengharuskan guru pembimbing menjaga rahasia data atau keterangan konseli agar tidak diketahui orang lain adalah...",
    opts: [
      { id: "A", t: "Asas Kerahasiaan" },
      { id: "B", t: "Asas Keterbukaan" },
      { id: "C", t: "Asas Kesukarelaan" },
      { id: "D", t: "Asas Kemandirian" },
    ],
    ans: "A",
  },
  {
    n: 9,
    q: "Jika seorang konselor merasa tidak mampu menangani masalah konseli karena di luar keahliannya, tindakan yang tepat sesuai asas BK adalah...",
    opts: [
      { id: "A", t: "Membiarkan saja masalah tersebut berlalu" },
      { id: "B", t: "Merujuk konseli kepada pihak yang lebih ahli (Alih Tangan Kasus)" },
      { id: "C", t: "Memaksa konseli untuk menyelesaikan masalahnya sendiri" },
      { id: "D", t: "Menceritakan masalah tersebut kepada guru lain agar dibantu" },
    ],
    ans: "B",
  },
  {
    n: 10,
    q: 'Asas "Tut Wuri Handayani" dalam bimbingan dan konseling menekankan pada...',
    opts: [
      { id: "A", t: "Pemberian hukuman yang mendidik" },
      { id: "B", t: "Penciptaan suasana yang mengayomi dan memberi dorongan" },
      { id: "C", t: "Penggunaan alat tes psikologi yang mahal" },
      { id: "D", t: "Kepatuhan siswa terhadap semua perintah konselor" },
    ],
    ans: "B",
  },
  {
    n: 11,
    q: "Layanan yang membantu peserta didik memahami lingkungan sekolah yang baru agar proses adaptasi berjalan lancar disebut...",
    opts: [
      { id: "A", t: "Layanan Informasi" },
      { id: "B", t: "Layanan Konsultasi" },
      { id: "C", t: "Layanan Mediasi" },
      { id: "D", t: "Layanan Orientasi" },
    ],
    ans: "D",
  },
  {
    n: 12,
    q: "Apa perbedaan utama antara Bimbingan Kelompok dan Konseling Kelompok menurut materi?",
    opts: [
      { id: "A", t: "Bimbingan kelompok hanya untuk siswa pintar" },
      { id: "B", t: "Bimbingan kelompok fokus pada informasi umum, konseling kelompok fokus pada masalah pribadi" },
      { id: "C", t: "Bimbingan kelompok dilakukan di kelas, konseling kelompok dilakukan di kantor" },
      { id: "D", t: "Tidak ada perbedaan di antara keduanya" },
    ],
    ans: "B",
  },
  {
    n: 13,
    q: 'Fungsi "Adaptasi" dalam bimbingan konseling membantu guru mata pelajaran dalam hal...',
    opts: [
      { id: "A", t: "Menghukum siswa yang terlambat" },
      { id: "B", t: "Menyesuaikan materi pelajaran dengan kebutuhan dan kemampuan siswa" },
      { id: "C", t: "Mengambil alih tugas guru saat guru berhalangan hadir" },
      { id: "D", t: "Memberikan nilai rapor kepada siswa" },
    ],
    ans: "B",
  },
  {
    n: 14,
    q: 'Asas "Kekinian" dalam bimbingan dan konseling berarti...',
    opts: [
      { id: "A", t: "Konselor harus selalu mengikuti tren terbaru" },
      { id: "B", t: "Mengabaikan sama sekali masa lalu konseli" },
      { id: "C", t: "Fokus pada masalah yang sedang dialami konseli saat ini" },
      { id: "D", t: "Menggunakan alat-alat digital yang sangat modern" },
    ],
    ans: "C",
  },
  {
    n: 15,
    q: "Layanan yang membantu siswa memilih ekstrakurikuler atau program studi yang sesuai dengan bakatnya disebut...",
    opts: [
      { id: "A", t: "Layanan Penguasaan Konten" },
      { id: "B", t: "Layanan Mediasi" },
      { id: "C", t: "Layanan Penempatan dan Penyaluran" },
      { id: "D", t: "Layanan Konseling Individual" },
    ],
    ans: "C",
  },
  {
    n: 16,
    q: "Asas yang menuntut agar layanan BK dilakukan oleh tenaga profesional yang ahli di bidangnya disebut...",
    opts: [
      { id: "A", t: "Asas Kedinamisan" },
      { id: "B", t: "Asas Keahlian" },
      { id: "C", t: "Asas Keterpaduan" },
      { id: "D", t: "Asas Kenormatifan" },
    ],
    ans: "B",
  },
  {
    n: 17,
    q: "Kesehatan mental yang baik adalah tujuan akhir BK. Berikut ciri mental yang sehat adalah...",
    opts: [
      { id: "A", t: "Merasa lebih hebat dari orang lain" },
      { id: "B", t: "Penerimaan diri, rasa syukur, dan ketabahan" },
      { id: "C", t: "Mengikuti hawa nafsu secara bebas" },
      { id: "D", t: "Menolak kenyataan jika menyakitkan" },
    ],
    ans: "B",
  },
  {
    n: 18,
    q: "Layanan penguasaan konten (PKO) bertujuan agar individu mampu menguasai...",
    opts: [
      { id: "A", t: "Kompetensi atau keterampilan tertentu melalui proses belajar" },
      { id: "B", t: "Seluruh rahasia teman sekelasnya" },
      { id: "C", t: "Harta kekayaan yang melimpah" },
      { id: "D", t: "Metode untuk berbohong tanpa ketahuan" },
    ],
    ans: "A",
  },
  {
    n: 19,
    q: "Prinsip bimbingan yang menyatakan bahwa bimbingan berpusat pada individu yang unik berarti...",
    opts: [
      { id: "A", t: "Semua siswa harus diperlakukan sama persis tanpa pengecualian" },
      { id: "B", t: "Pendekatan bimbingan harus disesuaikan dengan kebutuhan tiap individu" },
      { id: "C", t: "Konselor hanya fokus pada satu siswa paling populer" },
      { id: "D", t: "Siswa tidak perlu berinteraksi dengan orang lain" },
    ],
    ans: "B",
  },
  {
    n: 20,
    q: "Manakah pernyataan yang paling tepat mengenai hubungan antara Bimbingan dan Konseling?",
    opts: [
      { id: "A", t: "Bimbingan dan Konseling adalah dua hal yang tidak berhubungan" },
      { id: "B", t: "Konseling adalah salah satu teknik atau layanan inti dalam bimbingan" },
      { id: "C", t: "Bimbingan hanya untuk anak kecil, konseling untuk dewasa" },
      { id: "D", t: "Konseling tidak lebih penting daripada bimbingan" },
    ],
    ans: "B",
  },
];

const MIND_MAP_DATA = {"""

text = text.replace(target1, replacement1)

# 2. Add InteractiveQuiz just before InteractiveMindMap
target2 = "function InteractiveMindMap({"

replacement2 = """function InteractiveQuiz({ user, classId, meetingId, submissions, onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { qIndex: "A" }
  const [gameState, setGameState] = useState("INTRO"); // INTRO, PLAYING, FINISHED
  
  // Periksa apakah kuis sudah pernah dikerjakan sebelumnya
  const statusRow = submissions.find(
    (s) =>
      s.student_email === user.email &&
      s.section_name === "Kuis dan Latihan"
  );
  
  if (statusRow && gameState !== "FINISHED") {
    // Jika sudah dikerjakan, bypass ke finished
    setGameState("FINISHED");
    // Parse answers from content (which usually stores JSON if formatted nicely, but here we just show success based on existing submissions)
  }

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
    
    // Kirim sebagai teks laporan json-like agar tutor bisa baca
    const reportText = `[SKOR AKHIR: ${finalScore}/100]\\n(Hasil Kuis Interaktif diselesaikan secara otomatis)\\nTerisi: ${Object.keys(answers).length} dari 20 soal.`;
    
    onComplete(reportText);
  };

  if (statusRow || gameState === "FINISHED") {
    const finalScore = calculateScore();
    const sc = statusRow ? parseInt(statusRow.content.match(/SKOR AKHIR: (\\d+)/)?.[1] || finalScore) : finalScore;
    
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-10 border border-indigo-100 shadow-xl text-center">
        <span className="material-symbols-outlined text-6xl text-yellow-500 mb-4 drop-shadow-md">
          {sc >= 80 ? 'military_tech' : 'workspace_premium'}
        </span>
        <h2 className="text-3xl font-black text-indigo-900 mb-2">KUIS SELESAI</h2>
        <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-8">Hasil Telah Tersimpan</p>
        
        <div className="bg-white rounded-3xl p-8 max-w-sm mx-auto shadow-2xl shadow-indigo-900 shadow-opacity-5 border border-indigo-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <p className="text-sm font-bold text-slate-400 mb-1">Skor Akhir Anda</p>
          <p className={`text-6xl font-black ${sc >= 80 ? 'text-green-500' : 'text-orange-500'}`}>{sc}</p>
          <p className="text-xs font-bold text-slate-300 mt-2">DARI 100 POIN</p>
        </div>
        
        <div className="mt-8">
          <button onClick={() => window.history.back()} className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
            <span className="material-symbols-outlined">arrow_back</span>
            Kembali ke Menu Kelas
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "INTRO") {
    return (
      <div className="bg-white rounded-3xl p-8 border shadow-sm flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-6 drop-shadow-sm">
          <span className="material-symbols-outlined text-4xl">quiz</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-3">KUIS PILIHAN GANDA</h1>
        <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
          Terdapat 20 soal evaluasi pilihan ganda. Di setiap soal, pilih satu jawaban yang Anda anggap paling tepat. Nilai otomatis keluar pada akhir kuis.
        </p>
        <div className="flex bg-slate-50 p-4 rounded-xl gap-6 mb-8 border border-slate-100">
           <div>
             <p className="text-2xl font-black text-slate-700">20</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Soal</p>
           </div>
           <div className="w-px bg-slate-200"></div>
           <div>
             <p className="text-2xl font-black text-slate-700">100</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Poin Maks</p>
           </div>
        </div>
        <button
          onClick={() => setGameState("PLAYING")}
          className="w-full max-w-xs bg-indigo-600 text-white py-4 rounded-xl font-black text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-600 shadow-opacity-30"
        >
          MULAI KUIS SEKARANG
        </button>
      </div>
    )
  }

  const q = QUIZ_DATA[currentIdx];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border shadow-xl shadow-slate-200 shadow-opacity-30 flex flex-col min-h-[500px]">
      {/* Quiz Header */}
      <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 bg-opacity-20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="flex items-center gap-3 relative z-10">
          <span className="material-symbols-outlined">quiz</span>
          <span className="font-bold text-sm tracking-widest uppercase">Kuis Modul 1</span>
        </div>
        <div className="bg-white bg-opacity-20 px-4 py-1.5 rounded-full text-xs font-black tracking-widest">
          SOAL {currentIdx + 1} / {QUIZ_DATA.length}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / QUIZ_DATA.length) * 100}%` }}
        ></div>
      </div>

      {/* Quiz Body */}
      <div className="p-6 md:p-10 flex-1 flex flex-col justify-center">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug mb-8">
          <span className="text-indigo-600 mr-2">{q.n}.</span>{q.q}
        </h3>
        
        <div className="space-y-3">
          {q.opts.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4 group ${
                answers[currentIdx] === opt.id 
                ? "border-indigo-600 bg-indigo-50" 
                : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
              }`}
            >
              <span className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-black text-sm transition-colors ${
                 answers[currentIdx] === opt.id ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600 group-hover:bg-indigo-100"
              }`}>
                {opt.id}
              </span>
              <span className={`font-medium mt-1 leading-relaxed ${answers[currentIdx] === opt.id ? "text-indigo-900" : "text-slate-700"}`}>
                {opt.t}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Footer */}
      <div className="border-t border-slate-100 p-6 bg-slate-50 flex items-center justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentIdx === 0}
          className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">chevron_left</span> SEBELUMNYA
        </button>
        
        {currentIdx === QUIZ_DATA.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < QUIZ_DATA.length}
            className="px-8 py-3 rounded-xl font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600 shadow-opacity-30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:shadow-none"
          >
            KIRIM HASIL <span className="material-symbols-outlined">send</span>
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-3 rounded-xl font-bold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-all flex items-center gap-2"
          >
            SELANJUTNYA <span className="material-symbols-outlined">chevron_right</span>
          </button>
        )}
      </div>
      
      {/* Incomplete warning near submit */}
      {currentIdx === QUIZ_DATA.length - 1 && answeredCount < QUIZ_DATA.length && (
         <p className="text-center text-xs text-red-500 font-bold bg-slate-50 pb-4">
           Masih ada {QUIZ_DATA.length - answeredCount} soal yang terlewat. Gunakan tombol 'Sebelumnya' untuk memeriksa.
         </p>
      )}
    </div>
  );
}

function InteractiveMindMap({"""

text = text.replace(target2, replacement2)

# 3. Add routing in SectionPage
target3 = """    if (
      sectionName === "LKPD (Lembar Kerja Peserta Didik)" &&
      COURSE_DATA[courseCode]?.[sectionName]
    ) {
      return (
        <div className="space-y-4">
          <InteractiveMindMap
            user={user}
            classId={id}
            meetingId={meetingId}
            submissions={submissions}
            onComplete={handleAction}
          />
        </div>
      );
    }"""

replacement3 = """    if (
      sectionName === "LKPD (Lembar Kerja Peserta Didik)" &&
      COURSE_DATA[courseCode]?.[sectionName]
    ) {
      return (
        <div className="space-y-4">
          <InteractiveMindMap
            user={user}
            classId={id}
            meetingId={meetingId}
            submissions={submissions}
            onComplete={handleAction}
          />
        </div>
      );
    }

    if (
      sectionName === "Kuis dan Latihan" &&
      (["1", "2"].includes(cls?.classId) || ["1", "2"].includes(id) || id === "demo")
    ) {
      return (
        <div className="space-y-4">
          <InteractiveQuiz
            user={user}
            classId={id}
            meetingId={meetingId}
            submissions={submissions}
            onComplete={handleAction}
          />
        </div>
      );
    }"""

text = text.replace(target3, replacement3)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Added InteractiveQuiz successfully!")
