export const MIND_MAP_DATA = {
  zones: [
    {
      id: "etimologi",
      label: "Etimologi (Inggris)",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      id: "asas",
      label: "Asas-Asas BK",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      id: "layanan",
      label: "Jenis Layanan",
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
    },
  ],
  items: [
    {
      id: "direct",
      label: "To Direct",
      category: "etimologi",
      info: "Tepat! BK berfungsi mengarahkan siswa ke jalan yang benar.",
    },
    {
      id: "pilot",
      label: "To Pilot",
      category: "etimologi",
      info: "Bagus! BK memandu siswa agar tetap pada jalurnya.",
    },
    {
      id: "rahasia",
      label: "Kerahasiaan",
      category: "asas",
      info: "Benar! Ini adalah kode etik utama Konselor.",
    },
    {
      id: "mandiri",
      label: "Kemandirian",
      category: "asas",
      info: "Tepat! Tujuan BK adalah memandirikan siswa.",
    },
    {
      id: "konseling",
      label: "Konseling Individual",
      category: "layanan",
      info: "Betul! Layanan privat satu-lawan-satu.",
    },
    {
      id: "mediasi",
      label: "Mediasi",
      category: "layanan",
      info: "Keren! Membantu menyelesaikan konflik antar siswa.",
    },
  ],
};

export const STUDY_CASE_STAGES = [
  {
    step: 1,
    title: "Membangun Kepercayaan",
    scenario:
      "KASUS DUDI (Bagian 1): Dudi, siswa kelas 4, datang ke Anda dengan mata berkaca-kaca. Ia mengaku sering dipalak dan diancam oleh kakak kelas di kantin. Ia memohon: 'Ibu, tolong bantu aku, tapi jangan lapor ke Guru Piket atau Orang Tua Dudi ya, mereka nanti marah'. Apa langkah awal Anda?",
    options: [
      {
        id: "A",
        t: "Langsung lapor Guru Piket agar pelaku ditangkap",
        correct: false,
      },
      {
        id: "B",
        t: "Menenangkan Dudi & menjamin kerahasiaan ceritanya",
        correct: true,
      },
    ],
  },
  {
    step: 2,
    title: "Menjelaskan Peran Guru BK",
    scenario:
      "KASUS DUDI (Bagian 2): Dudi mulai tenang, tapi ia bertanya: 'Kenapa Ibu mau bantu Dudi? Ibu kan guru matematika, bukan polisi sekolah'. Bagaimana Anda menjelaskan fungsi pembimbingan Anda sesuai materi?",
    options: [
      {
        id: "A",
        t: "Karena ini tugas tambahan yang dipaksa kepala sekolah",
        correct: false,
      },
      {
        id: "B",
        t: "Karena guru juga berfungsi sebagai pembimbing untuk perkembangan mental siswa",
        correct: true,
      },
    ],
  },
  {
    step: 3,
    title: "Menerapkan Asas Kesukarelaan",
    scenario:
      "KASUS DUDI (Bagian 3): Dudi masih takut untuk bercerita lebih detail tentang siapa pelakunya. Sesuai asas kesukarelaan, apa yang Anda lakukan?",
    options: [
      {
        id: "A",
        t: "Menunggu sampai Dudi merasa nyaman & sukarela bercerita tanpa paksaan",
        correct: true,
      },
      {
        id: "B",
        t: "Mengancam akan memberi nilai jelek jika Dudi tidak jujur sekarang",
        correct: false,
      },
    ],
  },
  {
    step: 4,
    title: "Memilih Layanan yang Tepat",
    scenario:
      "KASUS DUDI (Bagian 4): Ternyata banyak siswa lain yang juga dipalak. Anda ingin mengumpulkan mereka untuk memberikan edukasi tentang cara menghadapi bullying secara bersama-sama. Layanan apa ini?",
    options: [
      { id: "A", t: "Layanan Orientasi", correct: false },
      { id: "B", t: "Layanan Bimbingan Kelompok", correct: true },
    ],
  },
  {
    step: 5,
    title: "Asas Alih Tangan Kasus",
    scenario:
      "KASUS DUDI (Bagian 5): Setelah digali, ternyata Dudi mengalami trauma psikis berat (depresi) yang butuh terapi medis. Sebagai guru, apa tindakan profesional Anda?",
    options: [
      {
        id: "A",
        t: "Mengobati sendiri dengan obat-obatan yang ada di UKS",
        correct: false,
      },
      {
        id: "B",
        t: "Melakukan alih tangan kasus kepada psikolog klinis yang lebih ahli",
        correct: true,
      },
    ],
  },
];

export const QUIZ_DATA = [
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
    q: "Asas bimbingan dan konseling yang menuntut agar tenaga pembimbing (konselor) bekerja secara teratur dan berencana adalah ...",
    opts: [
      { id: "A", t: "Asas keterbukaan" },
      { id: "B", t: "Asas kemandirian" },
      { id: "C", t: "Asas keterpaduan" },
      { id: "D", t: "Asas kedinamisan" },
    ],
    ans: "C",
  },
  {
    n: 3,
    q: "Layanan yang membantu peserta didik dalam memahami dan menilai bakat serta minat mereka adalah ...",
    opts: [
      { id: "A", t: "Layanan orientasi" },
      { id: "B", t: "Layanan penempatan dan penyaluran" },
      { id: "C", t: "Layanan konseling perorangan" },
      { id: "D", t: "Layanan bimbingan kelompok" },
    ],
    ans: "B",
  },
  {
    n: 4,
    q: "Fungsi bimbingan yang berusaha menghasilkan tercegahnya atau terhindarnya peserta didik dari berbagai permasalahan adalah fungsi ...",
    opts: [
      { id: "A", t: "Pemahaman" },
      { id: "B", t: "Pencegahan" },
      { id: "C", t: "Pengentasan" },
      { id: "D", t: "Pemeliharaan dan pengembangan" },
    ],
    ans: "B",
  },
  {
    n: 5,
    q: "Tugas perkembangan yang paling menonjol pada masa usia sekolah dasar menurut Robert J. Havighurst adalah ...",
    opts: [
      { id: "A", t: "Mencapai kemandirian emosional" },
      { id: "B", t: "Belajar bergaul dengan teman sebaya" },
      { id: "C", t: "Mempersiapkan karier ekonomi" },
      { id: "D", t: "Membentuk hubungan baru yang matang" },
    ],
    ans: "B",
  },
];

export const REFLECTION_QUESTIONS_DATA = {
  1: [
    "Jika pelajaran hari ini adalah makanan, itu jadi apa? Jelaskan kenapa.",
    "Kalau materi hari ini jadi film, judulnya apa?",
    "Seberapa “nyantol” materi hari ini di otakmu? (skala 1–10 + alasan)",
    "Bagian mana yang bikin kamu bilang: “Oh ternyata gitu!”",
    "Kalau kamu jadi guru, bagian mana yang akan kamu jelaskan ulang?",
    "Pilih emoji yang menggambarkan perasaanmu hari ini 😊😵😴🔥, jelaskan!",
    "Satu kata untuk menggambarkan pembelajaran hari ini?",
    "Apa hal paling sederhana yang kamu dapat, tapi ternyata penting?",
    "Kalau materi ini kamu ajarkan ke adik kelas, kamu mulai dari mana?",
    "Apa yang ingin kamu sampaikan untuk pak Bagus Panca Wiratama, S.Pd., M.Pd."
  ],
  2: [
    "Jika pelajaran hari ini adalah makanan, itu jadi apa? Jelaskan kenapa.",
    "Kalau materi hari ini jadi film, judulnya apa?",
    "Seberapa “nyantol” materi hari ini di otakmu? (skala 1–10 + alasan)",
    "Bagian mana yang bikin kamu bilang: “Oh ternyata gitu!”",
    "Kalau kamu jadi guru, bagian mana yang akan kamu jelaskan ulang?",
    "Pilih emoji yang menggambarkan perasaanmu hari ini 😊😵😴🔥, jelaskan!",
    "Satu kata untuk menggambarkan pembelajaran hari ini?",
    "Apa hal paling sederhana yang kamu dapat, tapi ternyata penting?",
    "Kalau materi ini kamu ajarkan ke adik kelas, kamu mulai dari mana?",
    "Apa yang ingin kamu sampaikan untuk pak Bagus Panca Wiratama, S.Pd., M.Pd."
  ],
  3: [
    "Satu kata untuk pembelajaran hari ini!",
  ],
  4: [
    "Materi atau konsep apa yang paling melekat di ingatan Anda dari sesi pembelajaran hari ini?",
    "Menurut Anda, bagian mana dari aktivitas hari ini yang paling menantang dan mengapa?",
    "Sampaikan pesan, saran, atau kesan Anda terhadap bimbingan Pak Bagus Panca Wiratama, S.Pd., M.Pd. hari ini!"
  ],
  default: [
    "Apa manfaat materi hari ini untuk profesi keguruan Anda?",
    "Bagaimana Anda akan menerapkan ilmu ini di sekolah nanti?",
    "Apakah durasi tutorial hari ini sudah cukup efektif?",
    "Sebutkan satu hal yang ingin Anda tanyakan lebih lanjut di sesi depan!",
    "Apa kesan Anda terhadap bimbingan Bapak Bagus hari ini?",
  ],
};
