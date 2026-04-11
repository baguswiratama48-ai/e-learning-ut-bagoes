import { useState, useEffect, Fragment } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { supabase } from "./supabaseClient";

// Mock Data
const CLASSES = [
  { id: "1", title: "SPGK4307 | Bimbingan Konseling di SD Kelas 8B" },
  { id: "2", title: "SPGK4307 | Bimbingan Konseling di SD Kelas 8C" },
  { id: "3", title: "SPDA4401 | Penanganan Anak Berkebutuhan Khusus Kelas 6A" },
  {
    id: "4",
    title: "SPGK4410 | Strategi Pembelajaran Kontemporer di SD Kelas 5A",
  },
];

const STUDENTS = [
  {
    nim: "855734487",
    name: "IKE DIA PRENTIKA",
    email: "855734487@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "855883951",
    name: "INTAN TRI KUSUMAWATI",
    email: "855883951@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856602599",
    name: "KHOIRUN NISA",
    email: "856602599@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856607265",
    name: "INDRA RAHMAN",
    email: "856607265@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856608339",
    name: "KURNIA RAHMAWATI",
    email: "856608339@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856609197",
    name: "INDAH SETIANINGSIH",
    email: "856609197@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856789129",
    name: "FENTI NUR SAFITRI",
    email: "856789129@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856789182",
    name: "FAHRIN RISANDINI",
    email: "856789182@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856789208",
    name: "FINKY ARIYANTI",
    email: "856789208@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856789981",
    name: "KHANIF FARIS FADHILA",
    email: "856789981@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856790259",
    name: "FINA ANGGRAINI",
    email: "856790259@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856790306",
    name: "IKE FAJAR AISAH",
    email: "856790306@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856790345",
    name: "EVIRA LUKIANA",
    email: "856790345@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856790424",
    name: "INDAH MUSTIKA SARI",
    email: "856790424@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856790757",
    name: "FITRY INDAH SARI",
    email: "856790757@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856790843",
    name: "JENNY VIOLLA",
    email: "856790843@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856790882",
    name: "FERI KIRANA HANDAYANI",
    email: "856790882@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856790961",
    name: "FRANCISKUS TANUERIT",
    email: "856790961@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856791806",
    name: "DIMAS PRATAMA",
    email: "856791806@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856793301",
    name: "INNES KUSUMAWATI",
    email: "856793301@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856795161",
    name: "IRMA SURYANI",
    email: "856795161@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856795219",
    name: "HAIDILA RAHMAH",
    email: "856795219@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856796432",
    name: "ICA JUNITA",
    email: "856796432@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856796765",
    name: "INTAN WIDIAWATI",
    email: "856796765@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856797591",
    name: "ICHO FERDINAN",
    email: "856797591@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "856799556",
    name: "EVA RIYANTI",
    email: "856799556@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "860098532",
    name: "SARI ROHANA INDAH",
    email: "860098532@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "860101687",
    name: "YULIANTI RISTIANA",
    email: "860101687@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "855734527",
    name: "DELA SINTAWATI",
    email: "855734527@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "855734534",
    name: "ERIN ARDANATA",
    email: "855734534@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "855883983",
    name: "DISKA FINDANI",
    email: "855883983@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856603085",
    name: "DERIANA",
    email: "856603085@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856603157",
    name: "DERIANI",
    email: "856603157@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856607756",
    name: "ELVA YULIANA",
    email: "856607756@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856610217",
    name: "ENDANG ANDARA PUTRI MULIA",
    email: "856610217@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856789136",
    name: "DENI IRAWAN",
    email: "856789136@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856789143",
    name: "DENI SAPUTRA",
    email: "856789143@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856789222",
    name: "DWITASARI",
    email: "856789222@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856789261",
    name: "DEVI YULIA PRATIWI",
    email: "856789261@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856789849",
    name: "DINA ANISA",
    email: "856789849@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856789999",
    name: "DIAH PUTRI AFIFAH",
    email: "856789999@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856790187",
    name: "DEWI ERMAWATI",
    email: "856790187@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856790241",
    name: "DITA ANGGRAENI",
    email: "856790241@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856790488",
    name: "DHEA ARTIKA NOVENTIANA",
    email: "856790488@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856790764",
    name: "ELENA FAJAR DWIANA",
    email: "856790764@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856792585",
    name: "EKA MAYA PUSPITA",
    email: "856792585@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856793397",
    name: "DEVA SYAHRONI",
    email: "856793397@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856796679",
    name: "DESI NATALIA",
    email: "856796679@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856796837",
    name: "DESNA FITRIANA",
    email: "856796837@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "856797971",
    name: "DWI MARIA",
    email: "856797971@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "878235739",
    name: "ANGGI OCTAVIANA",
    email: "878235739@ecampus.ut.ac.id",
    classId: "1",
  },
  // === AKUN UJICOBA (DUMMY) - bisa dipakai masuk ke semua kelas ===
  {
    nim: "000000000",
    name: "MAHASISWA DEMO",
    email: "demo@ecampus.ut.ac.id",
    classId: "1",
  },
  {
    nim: "000000000",
    name: "MAHASISWA DEMO",
    email: "demo@ecampus.ut.ac.id",
    classId: "2",
  },
  {
    nim: "000000000",
    name: "MAHASISWA DEMO",
    email: "demo@ecampus.ut.ac.id",
    classId: "3",
  },
  {
    nim: "000000000",
    name: "MAHASISWA DEMO",
    email: "demo@ecampus.ut.ac.id",
    classId: "4",
  },
];

const MENUS = [
  "Informasi Modul",
  "Pertanyaan Pemantik",
  "Materi Pembelajaran",
  "Video Pembelajaran",
  "Pembagian Kelompok",
  "LKPD (Lembar Kerja Peserta Didik)",
  "Kuis dan Latihan",
  "Refleksi",
  "Rangkuman",
];

const PEMANTIK_GROUPS = [
  [
    "Pernahkah Anda melihat siswa SD mengalami kesulitan belajar atau masalah perilaku? Menurut Anda, siapa yang seharusnya membantu mereka dan bagaimana caranya?",
    "Mengapa siswa sekolah dasar tidak cukup hanya diajar materi pelajaran saja?",
    "Apa yang mungkin terjadi jika kebutuhan emosional dan sosial siswa diabaikan di sekolah?",
    "Menurut Anda, apakah semua siswa membutuhkan bantuan yang sama? Mengapa demikian?",
    "Bagaimana peran guru dalam membantu perkembangan siswa selain mengajar di kelas?",
  ],
  [
    "Jika Anda membantu seorang siswa yang memiliki masalah, hal apa yang harus Anda perhatikan agar bantuan tersebut tidak merugikan siswa?",
    "Apakah semua masalah siswa boleh diselesaikan dengan cara yang sama? Mengapa?",
    "Bagaimana cara memperlakukan setiap siswa agar mereka merasa dihargai dan dipahami?",
    "Mengapa penting menjaga kerahasiaan masalah siswa? Apa dampaknya jika tidak dijaga?",
    "Dalam membantu siswa, apakah kita boleh memaksakan kehendak kita? Mengapa?",
  ],
  [
    "Apa yang harus dijaga agar siswa merasa aman dan percaya saat menceritakan masalahnya?",
    "Mengapa hubungan antara guru dan siswa perlu dilandasi rasa percaya?",
    "Bagaimana sikap seorang guru agar siswa mau terbuka tentang masalahnya?",
    "Menurut Anda, apa yang membuat bantuan kepada siswa bisa berjalan efektif?",
    "Jika seorang siswa tidak mau terbuka, apa yang sebaiknya dilakukan oleh guru?",
  ],
];

const FEEDBACK_MESSAGES = {
  1: "Jawaban masih sangat kurang. Mohon pelajari kembali materi modul dengan teliti ya. Tetap semangat!",
  2: "Masih banyak yang perlu diperbaiki. Coba baca ulang modulnya dengan lebih teliti ya.",
  3: "Sudah cukup baik, namun jawaban bisa lebih dielaborasi lagi. Jangan ragu untuk memperluas pemahamanmu.",
  4: "Bagus sekali! Pemahamanmu sudah sangat baik. Pertahankan prestasimu.",
  5: "Luar biasa! Jawabanmu sangat tepat, struktural, dan inspiratif. Teruskan semangat belajarmu!",
};

const getPemantikForStudent = (nim) => {
  const n = parseInt(nim.replace(new RegExp("\\D", "g"), "")) || 0;
  return PEMANTIK_GROUPS.map((group, gi) => group[(n + gi) % group.length]);
};

// Data untuk LKPD Interaktif Mind Map
const QUIZ_DATA = [
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
      {
        id: "A",
        t: "BK hanya boleh dilakukan melalui konseling individu saja",
      },
      {
        id: "B",
        t: "Keberhasilan BK sangat ditentukan oleh efektivitas hubungan konseling",
      },
      { id: "C", t: "Konseling adalah layanan yang paling mahal harganya" },
      {
        id: "D",
        t: "Konselor hanya bertugas untuk mengobati gangguan mental berat",
      },
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
      {
        id: "B",
        t: "Bimbingan diberikan tanpa memandang usia, jenis kelamin, atau status sosial",
      },
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
      {
        id: "B",
        t: "Merujuk konseli kepada pihak yang lebih ahli (Alih Tangan Kasus)",
      },
      { id: "C", t: "Memaksa konseli untuk menyelesaikan masalahnya sendiri" },
      {
        id: "D",
        t: "Menceritakan masalah tersebut kepada guru lain agar dibantu",
      },
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
      {
        id: "B",
        t: "Bimbingan kelompok fokus pada informasi umum, konseling kelompok fokus pada masalah pribadi",
      },
      {
        id: "C",
        t: "Bimbingan kelompok dilakukan di kelas, konseling kelompok dilakukan di kantor",
      },
      { id: "D", t: "Tidak ada perbedaan di antara keduanya" },
    ],
    ans: "B",
  },
  {
    n: 13,
    q: 'Fungsi "Adaptasi" dalam bimbingan konseling membantu guru mata pelajaran dalam hal...',
    opts: [
      { id: "A", t: "Menghukum siswa yang terlambat" },
      {
        id: "B",
        t: "Menyesuaikan materi pelajaran dengan kebutuhan dan kemampuan siswa",
      },
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
      {
        id: "A",
        t: "Kompetensi atau keterampilan tertentu melalui proses belajar",
      },
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
      {
        id: "A",
        t: "Semua siswa harus diperlakukan sama persis tanpa pengecualian",
      },
      {
        id: "B",
        t: "Pendekatan bimbingan harus disesuaikan dengan kebutuhan tiap individu",
      },
      { id: "C", t: "Konselor hanya fokus pada satu siswa paling populer" },
      { id: "D", t: "Siswa tidak perlu berinteraksi dengan orang lain" },
    ],
    ans: "B",
  },
  {
    n: 20,
    q: "Manakah pernyataan yang paling tepat mengenai hubungan antara Bimbingan dan Konseling?",
    opts: [
      {
        id: "A",
        t: "Bimbingan dan Konseling adalah dua hal yang tidak berhubungan",
      },
      {
        id: "B",
        t: "Konseling adalah salah satu teknik atau layanan inti dalam bimbingan",
      },
      {
        id: "C",
        t: "Bimbingan hanya untuk anak kecil, konseling untuk dewasa",
      },
      { id: "D", t: "Konseling tidak lebih penting daripada bimbingan" },
    ],
    ans: "B",
  },
];

const MIND_MAP_DATA = {
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

const COURSE_DATA = {
  SPGK4307: {
    "Informasi Modul": (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <div className="bg-primary bg-opacity-5 p-6 md:p-8 rounded-[2.5rem] border border-primary border-opacity-10">
          <h3 className="text-lg md:text-xl font-black text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">info</span> Mata Kuliah
            SPGK4307
          </h3>
          <p className="font-bold text-slate-800 mb-2">
            Bimbingan Konseling di SD
          </p>
          <p className="text-xs md:text-sm">
            Mata kuliah ini membekali mahasiswa dengan konsep dasar, prinsip,
            asas, dan teknik bimbingan konseling yang relevan untuk diterapkan
            di lingkungan sekolah dasar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-tighter">
              Target Kompetensi
            </h4>
            <ul className="text-xs space-y-2 list-disc pl-4">
              <li>Memahami hakikat bimbingan di SD</li>
              <li>Mampu memberikan pelayanan dasar BK</li>
              <li>Menjaga kode etik profesi guru pembimbing</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-emerald-500 mb-2 text-sm uppercase tracking-tighter">
              Sistem Belajar
            </h4>
            <p className="text-xs leading-relaxed">
              Tutorial Webinar (Tuweb), Diskusi Kelompok, dan Pengerjaan Tugas
              Mandiri melalui LMS yang terintegrasi.
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

const STUDY_CASE_STAGES = [
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
    title: "Dilema Profesional",
    scenario:
      "KASUS DUDI (Bagian 2): Saat Anda sedang konseling dengan Dudi, Guru Kelasnya memaksa meminta catatan pembicaraan tersebut untuk data rapor perilaku. Padahal Dudi belum bersedia jika gurunya tahu. Apa sikap Anda?",
    options: [
      { id: "A", t: "Memberikan catatan demi kelancaran rapor", correct: false },
      { id: "B", t: "Menolak halus demi menjaga Asas Kerahasiaan", correct: true },
    ],
  },
  {
    step: 3,
    title: "Penanganan Trauma",
    scenario:
      "KASUS DUDI (Bagian 3): Dudi mulai sering menangis di kelas dan tidak fokus belajar. Ia butuh bantuan mendalam untuk memulihkan kepercayaan dirinya secara privat. Layanan mana yang harus Anda berikan?",
    options: [
      { id: "A", t: "Konseling Individual di ruangan yang aman", correct: true },
      { id: "B", t: "Bimbingan Kelompok bersama teman-temannya", correct: false },
    ],
  },
  {
    step: 4,
    title: "Kasus Berat",
    scenario:
      "KASUS DUDI (Bagian 4): Ternyata aksi pemalakan tersebut disertai kekerasan fisik yang membahayakan nyawa Dudi. Sebagai guru SD, Anda merasa ini di luar wewenang sekolah. Apa prosedur BK yang tepat?",
    options: [
      { id: "A", t: "Melakukan Alih Tangan Kasus (Referral) ke Ahli", correct: true },
      { id: "B", t: "Mencoba menangani sendiri sampai tuntas", correct: false },
    ],
  },
  {
    step: 5,
    title: "Evaluasi & Komitmen",
    scenario:
      "KASUS DUDI (Bagian 5): Setelah ditangani, Dudi kembali ceria namun masih ada rasa takut jika sendirian. Sebagai Guru Profesional, apa komitmen jangka panjang kelompok Anda untuk Dudi?",
    options: [
      { id: "A", t: "Memantau perkembangan (Follow Up) berkala", correct: true },
      { id: "B", t: "Menganggap kasus selesai karena Dudi sudah masuk", correct: false },
    ],
  },
];

const REFLECTION_QUESTIONS = [
  "Setelah mengikuti sesi hari ini, apa satu pemahaman baru mengenai hakikat Bimbingan dan Konseling yang menurut Anda paling menantang namun sangat penting untuk diterapkan di SD?",
  "Dari semua materi yang sudah kita diskusikan (Etimologi, Asas, dan Jenis Layanan), bagian mana yang membuat Anda merasa paling siap untuk menjadi guru yang mengayomi siswa?",
  "Bagaimana perasaan Anda belajar menggunakan fitur interaktif (Kuis 20 Soal & Games Mind Map) hari ini? Apakah membantu Anda lebih cepat paham dibandingkan metode biasa?",
  "Apa satu janji atau komitmen pribadi Anda untuk terus meningkatkan kesehatan mental siswa di masa depan setelah mendapatkan ilmu dari pertemuan ini?",
  "Ceritakan pak Bagus Panca Wiratama, S.Pd., M.Pd. itu seperti apa? (Tuliskan kesan Anda mengenai cara beliau mengajar, memberikan motivasi, atau inspirasi yang Anda dapatkan selama sesi bimbingan beliau).",
];

function InteractiveQuiz({
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

    // Kirim sebagai teks laporan json-like agar tutor bisa baca
    const reportText = `[SKOR AKHIR: ${finalScore}/100]\n(Hasil Kuis Interaktif diselesaikan secara otomatis)\nTerisi: ${Object.keys(answers).length} dari 20 soal.`;

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
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dari 100 Poin</p>
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
          Ujilah pemahaman Anda mengenai materi Modul 1 melalui 20 butir soal pilihan ganda. 
          Pastikan Anda telah mempelajari seluruh materi sebelum memulai.
        </p>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <p className="text-2xl font-black text-slate-800">20</p>
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
      {/* Header */}
      <div className="bg-white px-8 py-6 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">menu_book</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Evaluasi</p>
            <p className="font-bold text-slate-800">Modul 1: BK di SD</p>
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

      {/* Progress Line */}
      <div className="w-full h-1 bg-slate-50">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / QUIZ_DATA.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Body */}
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

      {/* Footer Nav */}
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


function InteractiveReflection({
  user,
  classId,
  meetingId,
  submissions,
  onComplete,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  // Periksa apakah refleksi sudah pernah dikerjakan sebelumnya
  const statusRow = submissions.find(
    (s) => s.student_email === user.email && s.section_name === "Refleksi",
  );

  const progress = ((currentIdx + 1) / REFLECTION_QUESTIONS.length) * 100;

  const handleNext = () => {
    if (currentIdx < REFLECTION_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const content = REFLECTION_QUESTIONS.map(
      (q, i) => `Pertanyaan ${i + 1}: ${q}\nJawaban: ${answers[i] || "-"}`,
    ).join("\n\n");
    onComplete(content);
  };

  if (statusRow) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 p-10 md:p-16 rounded-3xl text-center shadow-sm animate-in fade-in zoom-in duration-700">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <span className="material-symbols-outlined text-5xl text-emerald-600">
            verified
          </span>
        </div>
        <h3 className="text-3xl font-black text-slate-800 mb-2 tracking-tight uppercase">
          Refleksi Terkirim
        </h3>
        <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed mb-10">
          Terima kasih atas refleksi mendalam Anda. Masukan ini sangat berharga untuk terus meningkatkan kualitas sesi bimbingan kita.
        </p>
        <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-2xl text-emerald-700 text-sm font-bold">
           <span className="material-symbols-outlined text-lg">check_circle</span>
           Telah Selesai & Terdata
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Progress Header */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Refleksi Pembelajaran
            </p>
            <h4 className="font-bold text-xl text-slate-800">
              Pertanyaan {currentIdx + 1}{" "}
              <span className="text-slate-400 font-medium text-base">
                dari {REFLECTION_QUESTIONS.length}
              </span>
            </h4>
          </div>
          <p className="text-sm font-bold text-indigo-600">
            {Math.round(progress)}%
          </p>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 min-h-[450px] flex flex-col relative overflow-hidden">
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined">description</span>
            </div>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed mb-6">
            {REFLECTION_QUESTIONS[currentIdx]}
          </h3>

          <textarea
            value={answers[currentIdx] || ""}
            onChange={(e) =>
              setAnswers({ ...answers, [currentIdx]: e.target.value })
            }
            placeholder="Ketik refleksi Anda secara mendalam di sini..."
            className="flex-1 min-h-[200px] p-6 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-10 outline-none transition-all resize-none text-slate-700 leading-relaxed font-medium"
          ></textarea>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={handleBack}
              disabled={currentIdx === 0}
              className="w-full md:w-auto px-6 py-3 rounded-xl font-bold text-slate-500 border border-transparent hover:bg-slate-50 hover:text-slate-700 disabled:opacity-0 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
              SEBELUMNYA
            </button>

            {currentIdx === REFLECTION_QUESTIONS.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={loading || !answers[currentIdx]?.trim()}
                className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-indigo-600"
              >
                {loading ? "MENGIRIM..." : "KIRIM REFLEKSI FINAL"}
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answers[currentIdx]?.trim()}
                className="w-full md:w-auto px-8 py-3 bg-slate-800 text-white rounded-xl font-bold shadow-md hover:bg-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                SELANJUTNYA
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InteractiveMindMap({
  user,
  classId,
  meetingId,
  onComplete,
  submissions,
}) {
  const [placedItems, setPlacedItems] = useState({});
  const [gameState, setGameState] = useState("INTRO");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [feedbackType, setFeedbackType] = useState("correct");
  const [isLandscape, setIsLandscape] = useState(true); // Default true agar tidak terblokir
  const [selectedItem, setSelectedItem] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [wrongItem, setWrongItem] = useState(null);
  const [allDone, setAllDone] = useState(false);
  const [challengeStep, setChallengeStep] = useState(0);
  const [challengeSelections, setChallengeSelections] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const check = () => setIsLandscape(window.innerWidth > window.innerHeight);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const groupRow = submissions.find(
    (s) =>
      s.student_email === "SYSTEM_GROUP" &&
      s.section_name === "GENERATED_GROUPS",
  );
  const groups = groupRow ? JSON.parse(groupRow.content) : null;
  const myGroup = groups?.find((g) =>
    g.members.some((m) => m.email === user.email),
  );

  const totalItems = MIND_MAP_DATA.items.length;
  const placedCount = Object.keys(placedItems).length;
  const progressPct = Math.round((placedCount / totalItems) * 100);

  const handleDrop = (itemId, zoneId) => {
    const item = MIND_MAP_DATA.items.find((i) => i.id === itemId);
    if (!item || placedItems[itemId]) return;
    if (item.category === zoneId) {
      const newPlaced = { ...placedItems, [itemId]: zoneId };
      setPlacedItems(newPlaced);
      setScore((prev) => prev + 10);
      setFeedbackType("correct");
      setFeedback(item.info);
      setTimeout(() => setFeedback(null), 3000);
      if (Object.keys(newPlaced).length === totalItems) setAllDone(true);
      setSelectedItem(null); // Reset selection after successful drop
    } else {
      setFeedbackType("wrong");
      setFeedback(
        "Salah kategori! Diskusikan kembali dengan teman kelompokmu.",
      );
      setWrongItem(itemId);
      setTimeout(() => {
        setFeedback(null);
        setWrongItem(null);
      }, 1500);
    }
  };

  const handleTouchDrop = (itemId, e) => {
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const zoneId = el?.closest("[data-zone]")?.getAttribute("data-zone");
    if (zoneId) handleDrop(itemId, zoneId);
  };

  // Hapus pembatasan Lanskap agar bisa dibuka di Potrait

  if (gameState === "INTRO") {
    return (
      <div className="fixed inset-0 z-[70] bg-slate-900 overflow-y-auto w-full h-full">
        <div className="min-h-full flex items-center justify-center w-full p-4 md:p-6">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300 my-auto">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-3xl flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-4xl">
                    auto_stories
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">
                    LKPD Interaktif
                  </p>
                  <h2 className="text-2xl font-black text-slate-800 leading-tight">
                    MISI ARSITEK EKOSISTEM BK
                  </h2>
                </div>
              </div>
              <p className="text-slate-500 font-medium mb-8 text-sm leading-relaxed">
                Halo, Calon Guru Profesional! Tugasmu adalah menyusun Mind Map
                BK yang berantakan menjadi utuh kembali bersama tim.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  {
                    n: "1",
                    icon: "drag_pan",
                    text: "Perhatikan 3 cabang: Etimologi, Asas, dan Jenis Layanan.",
                  },
                  {
                    n: "2",
                    icon: "touch_app",
                    text: "Tekan & geser bubble kata ke lingkaran cabang yang tepat (Drag & Drop).",
                  },
                  {
                    n: "3",
                    icon: "info",
                    text: "Setiap jawaban benar memunculkan info singkat.",
                  },
                  {
                    n: "4",
                    icon: "send",
                    text: "Jika semua terpasang, tekan KIRIM dan screenshot hasilnya.",
                  },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex-shrink-0 flex items-center justify-center font-black text-xs">
                      {s.n}
                    </span>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5">
                        {s.icon}
                      </span>
                      <p className="text-sm font-semibold text-slate-600">
                        {s.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {myGroup && (
                <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 p-4 rounded-2xl flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">
                    group
                  </span>
                  <p className="text-sm font-bold text-primary">
                    Kelompok {myGroup.group_num} — {myGroup.members.length}{" "}
                    anggota
                  </p>
                </div>
              )}
              <div className="flex flex-col-reverse md:flex-row gap-3 mt-4">
                <button
                  onClick={() => window.history.back()}
                  className="w-full md:w-1/3 bg-slate-100 text-slate-500 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  KEMBALI
                </button>
                <button
                  onClick={() => setGameState("PLAYING")}
                  className="w-full md:w-2/3 bg-primary text-white py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-20 flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">
                    rocket_launch
                  </span>{" "}
                  MULAI MISI!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "CHALLENGE") {
    const currentChallenge = STUDY_CASE_STAGES[challengeStep];
    const userAns = challengeSelections[challengeStep];

    if (isSuccess) {
      return (
        <div className="fixed inset-0 z-[80] bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-xl w-full shadow-2xl text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
              <span className="material-symbols-outlined text-6xl">
                check_circle
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">
              MISI BERHASIL!
            </h2>
            <p className="text-slate-500 font-medium mb-8">
              Luar biasa! Analisis kelompok Anda sangat tajam. Hasil LKPD telah
              berhasil terkirim ke sistem Bapak Bagus Panca Wiratama.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.history.back()}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-20 flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">home</span>
                KEMBALI KE KELAS
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-[60] bg-black bg-opacity-80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-[3rem] p-6 md:p-10 max-w-2xl w-full shadow-2xl animate-in slide-in-from-bottom duration-500 my-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-red-500">
                  forum
                </span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-red-500 tracking-widest">
                  Diskusi Kelompok
                </p>
                <h2 className="text-xl font-black text-slate-800">
                  Tantangan Tahap {challengeStep + 1}
                </h2>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-black text-slate-400">
              {challengeStep + 1} / 5
            </div>
          </div>

          <div className="bg-slate-50 border-l-4 border-red-500 p-6 rounded-2xl mb-8">
            <p className="text-base font-bold text-slate-700 leading-relaxed">
              {currentChallenge.scenario}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {currentChallenge.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() =>
                  setChallengeSelections({
                    ...challengeSelections,
                    [challengeStep]: opt,
                  })
                }
                disabled={userAns !== undefined}
                className={`p-6 rounded-2xl border-2 text-left transition-all font-bold text-base flex items-center gap-4 ${userAns === undefined ? "border-slate-100 hover:border-primary hover:bg-primary hover:bg-opacity-5" : userAns.id === opt.id ? "border-primary bg-primary bg-opacity-5 text-primary shadow-lg shadow-primary shadow-opacity-10" : "opacity-40 border-slate-100"}`}
              >
                <span
                  className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-black ${userAns === undefined ? "bg-slate-100 text-slate-400" : userAns.id === opt.id ? "bg-primary text-white scale-110" : "bg-slate-50 text-slate-300"}`}
                >
                  {opt.id}
                </span>
                {opt.t}
                {userAns?.id === opt.id && (
                  <span className="material-symbols-outlined ml-auto text-primary animate-in zoom-in duration-300">
                    radio_button_checked
                  </span>
                )}
              </button>
            ))}
          </div>

          {userAns && (
            <div className="animate-in fade-in slide-in-from-top duration-300">
              {challengeStep < STUDY_CASE_STAGES.length - 1 ? (
                <button
                  onClick={() => setChallengeStep(challengeStep + 1)}
                  className="w-full bg-slate-800 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
                >
                  LANJUT KE TAHAP {challengeStep + 2}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              ) : (
                <button
                  onClick={async () => {
                    setIsSubmitting(true);
                    try {
                      const finalReport = STUDY_CASE_STAGES.map((s, idx) => {
                        const sel = challengeSelections[idx];
                        return `T${s.step}: ${sel.t} (${sel.correct ? "TEPAT" : "KURANG TEPAT"})`;
                      }).join("\n");

                      await onComplete(score, finalReport);
                      setIsSuccess(true);
                    } catch (err) {
                      alert("Terjadi kesalahan, mohon coba lagi.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-30 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="material-symbols-outlined">send</span>
                  )}
                  {isSubmitting ? "MENGIRIM..." : "KIRIM HASIL LKPD"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full bg-white rounded-[3rem] overflow-hidden border-4 border-slate-100 shadow-2xl flex flex-col"
      style={{ minHeight: "580px" }}
    >
      <div className="h-2 bg-slate-100 w-full">
        <div
          className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500 rounded-full"
          style={{ width: `${progressPct}%` }}
        ></div>
      </div>
      {feedback && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-6">
          <div
            className={`animate-in zoom-in duration-300 px-10 py-6 rounded-[2.5rem] font-black text-lg shadow-2xl flex flex-col items-center gap-4 text-center backdrop-blur-md border-4 ${feedbackType === "correct" ? "bg-emerald-500 bg-opacity-90 text-white border-emerald-400" : "bg-red-500 bg-opacity-90 text-white border-red-400"}`}
          >
            <span className="material-symbols-outlined text-6xl drop-shadow-lg">
              {feedbackType === "correct" ? "verified" : "cancel"}
            </span>
            <p className="max-w-xs">{feedback}</p>
          </div>
        </div>
      )}
      <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGameState("INTRO")}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm"
            title="Info Misi"
          >
            <span className="material-symbols-outlined text-xl">info</span>
          </button>
          <div className="hidden xs:block">
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">
              LKPD Mind Map
            </p>
            <p className="text-xs font-black text-slate-700 leading-none">
              {myGroup ? `Kelompok ${myGroup.group_num}` : "Individu"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
              Progress
            </p>
            <p className="text-sm font-black text-primary">
              {placedCount} / {totalItems}
            </p>
          </div>
          <div className="bg-white shadow-sm border border-slate-100 px-4 py-2 rounded-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-500 text-lg fill-1">
              stars
            </span>
            <span className="font-black text-slate-800 text-lg">{score}</span>
          </div>
        </div>
      </div>
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "480px" }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-50 md:opacity-100"
          style={{ zIndex: 0 }}
        >
          {[
            [-150, 20],
            [150, 20],
            [0, -160],
          ].map(([x, y], i) => (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke="#e2e8f0"
              strokeWidth="3"
              strokeDasharray="8,6"
            />
          ))}
        </svg>
        <div className="absolute w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white font-black text-center text-xs p-3 shadow-2xl z-10 ring-8 ring-blue-50 bg-opacity-100">
          MIND MAP
          <br />
          BK
        </div>
        {MIND_MAP_DATA.zones.map((zone, idx) => {
          const positions = [
            { left: "calc(50% - 220px)", top: "calc(50% - 50px)" },
            { left: "calc(50% + 80px)", top: "calc(50% - 50px)" },
            { left: "calc(50% - 70px)", top: "calc(50% - 180px)" },
          ];
          const pos = positions[idx];
          const placedInZone = Object.entries(placedItems).filter(
            ([_, zid]) => zid === zone.id,
          );
          return (
            <div
              key={zone.id}
              data-zone={zone.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragging && handleDrop(dragging, zone.id)}
              onClick={() => selectedItem && handleDrop(selectedItem, zone.id)}
              className={`absolute w-32 h-32 md:w-40 md:h-40 rounded-full border-[3px] border-dashed flex flex-col items-center justify-center transition-all duration-300 ${zone.bgColor} ${zone.color.replace("bg-", "border-")} bg-opacity-40 ${selectedItem ? "ring-4 ring-yellow-400 animate-pulse cursor-pointer" : ""}`}
              style={{ ...pos, zIndex: 5 }}
            >
              <div
                className={`pointer-events-none px-3 py-1 rounded-xl ${zone.color} text-white text-[8px] font-black uppercase tracking-wider shadow-md mb-2`}
              >
                {zone.label}
              </div>
              <div className="flex flex-wrap justify-center gap-1 px-2 max-w-full">
                {placedInZone.map(([iid]) => {
                  const item = MIND_MAP_DATA.items.find((i) => i.id === iid);
                  return (
                    <span
                      key={iid}
                      className={`px-2 py-0.5 rounded-lg ${zone.color} text-white text-[8px] font-black shadow animate-in zoom-in duration-300`}
                    >
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-slate-900 px-6 py-5 flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-3">
          {MIND_MAP_DATA.items
            .filter((i) => !placedItems[i.id])
            .map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDragging(item.id)}
                onDragEnd={() => setDragging(null)}
                onTouchEnd={(e) => handleTouchDrop(item.id, e)}
                onClick={() =>
                  setSelectedItem(selectedItem === item.id ? null : item.id)
                }
                className={`px-5 py-2.5 rounded-full bg-white text-primary font-black text-xs cursor-grab active:cursor-grabbing hover:bg-yellow-400 transition-all shadow-lg flex items-center gap-2 select-none border-2 ${selectedItem === item.id ? "border-yellow-400 scale-110 shadow-yellow-200" : "border-transparent"} ${wrongItem === item.id ? "animate-[shake_0.4s_ease-in-out] bg-red-100" : ""}`}
                style={{ touchAction: "none" }}
              >
                <span className="material-symbols-outlined text-sm">
                  {selectedItem === item.id ? "check_circle" : "drag_indicator"}
                </span>
                {item.label}
              </div>
            ))}
        </div>
        {allDone && (
          <button
            onClick={() => setGameState("CHALLENGE")}
            className="mt-1 px-10 py-3 bg-yellow-400 text-slate-900 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2"
          >
            <span className="material-symbols-outlined">emoji_events</span>{" "}
            LANJUT TANTANGAN AKHIR
          </button>
        )}
      </div>
      <style>{`@keyframes shake {0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 60% { transform: translateX(8px); }}`}</style>
    </div>
  );
}

function Home({ navigate, onLoginTutor }) {
  return (
    <div className="space-y-6">
      <section className="mb-8 text-center pt-8">
        <img
          src="/ut-logo.png"
          alt="Universitas Terbuka"
          className="w-24 h-auto mx-auto mb-4 drop-shadow-md object-contain"
        />
        <h2 className="font-headline font-extrabold text-3xl md:text-5xl text-primary tracking-tight mb-4">
          E-Learning <span className="text-yellow-400">Bagoes</span>
        </h2>
        <div className="font-body text-md text-on-surface-variant max-w-2xl mx-auto px-4 mb-8 space-y-2">
          <p className="font-bold text-slate-800 text-lg">
            Selamat datang di E-Learning Bagoes.
          </p>
          <p className="leading-relaxed">
            Aplikasi pembelajaran mandiri yang lebih mudah, terarah, dan lebih{" "}
            <span className="italic font-bold text-primary">“Bagoes”</span>.
          </p>
          <p className="text-primary font-extrabold italic text-sm mt-3">
            “Dengan E-Learning Bagoes Kuliah Jadi Lebih Bagoes”
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-2xl font-bold text-primary">4</p>
            <p className="text-[10px] uppercase font-bold text-slate-400">
              Kelas Aktif
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-2xl font-bold text-yellow-500">8</p>
            <p className="text-[10px] uppercase font-bold text-slate-400">
              Pertemuan
            </p>
          </div>
        </div>
      </section>

      <div className="bg-primary bg-opacity-5 p-6 rounded-3xl border border-primary border-opacity-10">
        <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">rocket_launch</span> Mulai
          Belajar
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Akses modul pembelajaran dan kerjakan tugas tepat waktu.
        </p>
        <Link
          to="/classes"
          className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary shadow-opacity-20"
        >
          Lihat Daftar Kelas
        </Link>
      </div>

      <div className="mt-12 text-center pb-10">
        <button
          onClick={() => navigate("/login-tutor")}
          className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined">badge</span> Akses Dasbor
          Tutor
        </button>
      </div>
    </div>
  );
}

function ClassesList() {
  return (
    <div className="space-y-6 pb-20">
      <h2 className="font-headline font-bold text-2xl text-primary mb-6 pt-4 flex items-center gap-3">
        <span className="material-symbols-outlined bg-primary text-white p-1.5 rounded-lg text-sm">
          import_contacts
        </span>
        Daftar Kelas Anda
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CLASSES.map((c) => (
          <Link
            key={c.id}
            to={`/class/${c.id}`}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary border-opacity-30 transition-all group flex items-center justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
            <div className="pl-2">
              <div className="flex items-center gap-2 mb-2 block text-primary font-semibold text-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">
                  school
                </span>{" "}
                Kelas Aktif
              </div>
              <h3 className="font-headline font-bold text-lg text-slate-800 group-hover:text-primary transition-colors">
                {c.title}
              </h3>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              arrow_forward_ios
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Biodata({ user, profileData }) {
  if (!user) return <Navigate to="/classes" />;

  return (
    <div className="max-w-md mx-auto py-8 pb-24">
      <h2 className="font-headline font-bold text-2xl text-primary mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined bg-primary text-white p-1.5 rounded-lg text-sm">
          person
        </span>
        Biodata Mahasiswa
      </h2>
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-slate-50 overflow-hidden">
            {profileData.photo ? (
              <img
                src={profileData.photo}
                alt="Foto Profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-4xl text-slate-400">
                account_circle
              </span>
            )}
          </div>
          <h3 className="font-headline font-bold text-xl text-slate-800">
            {profileData.fullName || "Alexander Bagoes"}
          </h3>
          <p className="text-sm font-semibold text-primary">
            Mahasiswa Universitas Terbuka
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400 text-sm">Email</span>
            <span className="text-slate-700 font-bold text-sm">
              {profileData.email}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400 text-sm">NIM</span>
            <span className="text-slate-700 font-bold text-sm">
              {profileData.nim}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400 text-sm">TTL</span>
            <span className="text-slate-700 font-bold text-sm">
              {profileData.ttl || "-"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400 text-sm">No WhatsApp</span>
            <span className="text-slate-700 font-bold text-sm">
              {profileData.whatsapp || "-"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400 text-sm">Program Studi</span>
            <span className="text-slate-700 font-bold text-sm">
              {profileData.prodi || "-"}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400 text-sm">Semester</span>
            <span className="text-slate-700 font-bold text-sm">
              {profileData.semester || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Salut</span>
            <span className="text-slate-700 font-bold text-sm">
              {profileData.pokjar}
            </span>
          </div>
        </div>
        <Link
          to="/edit-biodata"
          className="w-full mt-8 bg-primary text-white font-bold py-3 rounded-xl text-sm shadow-md block text-center"
        >
          Edit Biodata
        </Link>
      </div>
    </div>
  );
}

function EditBiodata({ user, profileData, setProfileData }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...profileData });

  if (!user) return <Navigate to="/classes" />;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfileData(formData);
    navigate("/biodata");
  };

  return (
    <div className="max-w-md mx-auto py-8 pb-24 px-4">
      <h2 className="font-headline font-bold text-2xl text-primary mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined bg-primary text-white p-1.5 rounded-lg text-sm">
          edit
        </span>
        Edit Biodata
      </h2>
      <form
        onSubmit={handleSave}
        className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-5"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-slate-100 rounded-full mb-4 flex items-center justify-center border-4 border-slate-50 overflow-hidden relative group">
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Foto Profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-4xl text-slate-400">
                account_circle
              </span>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white">
                photo_camera
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Upload Foto Mahasiswa
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={formData.fullName}
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-500 font-semibold text-sm outline-none cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-500 font-semibold text-sm outline-none cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            NIM
          </label>
          <input
            type="text"
            value={formData.nim}
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-500 font-semibold text-sm outline-none cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Tempat & Tanggal Lahir (TTL)
          </label>
          <input
            type="text"
            value={formData.ttl}
            onChange={(e) => setFormData({ ...formData, ttl: e.target.value })}
            placeholder="Contoh: Belitang, 12-05-2004"
            className="w-full px-4 py-2.5 rounded-xl border bg-white focus:border-primary focus:ring-1 text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            No WhatsApp
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) =>
              setFormData({ ...formData, whatsapp: e.target.value })
            }
            placeholder="08XXXXXXXXXX"
            className="w-full px-4 py-2.5 rounded-xl border bg-white focus:border-primary focus:ring-1 text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Program Studi
          </label>
          <input
            type="text"
            value={formData.prodi}
            onChange={(e) =>
              setFormData({ ...formData, prodi: e.target.value })
            }
            placeholder="Ketik Program Studi"
            className="w-full px-4 py-2.5 rounded-xl border bg-white focus:border-primary focus:ring-1 text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Semester
          </label>
          <input
            type="number"
            value={formData.semester}
            onChange={(e) =>
              setFormData({ ...formData, semester: e.target.value })
            }
            placeholder="Pilih Semester"
            className="w-full px-4 py-2.5 rounded-xl border bg-white focus:border-primary focus:ring-1 text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Salut
          </label>
          <input
            type="text"
            value={formData.pokjar}
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-500 font-semibold text-sm outline-none cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-[#1a2169] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary shadow-opacity-25 mt-4"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

function LoginTutor({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes("@ut.ac.id")) {
      setError("Gunakan email resmi Tutor UT (@ut.ac.id).");
      return;
    }
    onLogin({ email, role: "tutor" });
    navigate("/tutor-dashboard");
  };

  return (
    <div className="max-w-md mx-auto pt-6 pb-20 px-4">
      <Link
        to="/"
        className="inline-flex items-center text-primary font-bold mb-8 hover:underline bg-primary-fixed bg-opacity-30 px-3 py-1 rounded-full text-sm"
      >
        <span className="material-symbols-outlined text-sm mr-1">
          arrow_back
        </span>{" "}
        Kembali
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <img
            src="/ut-logo.png"
            alt="UT Logo"
            className="w-16 h-auto mx-auto mb-4 object-contain"
          />
          <h2 className="font-headline font-bold text-2xl text-primary mb-2">
            Portal Tutor
          </h2>
          <p className="text-sm text-slate-500">
            Masuk untuk menilai hasil kerjaan tugas mahasiswa.
          </p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">error</span> {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Email Tutor
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tutor@ut.ac.id"
              className="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:border-primary focus:ring-1"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                className="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:border-primary focus:ring-1"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1 bg-opacity-2 -translate-y-1 bg-opacity-2 text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            Masuk Dasbor
          </button>
        </form>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nim, setNim] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const cls = CLASSES.find((c) => c.id === id);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes("@ecampus.ut.ac.id")) {
      setError("Email harus @ecampus.ut.ac.id");
      return;
    }
    if (nim.length < 5) {
      setError("NIM minimal 5 karakter.");
      return;
    }

    const inputEmail = email.trim().toLowerCase();
    const inputNim = nim.trim();

    // Attempt to find student in our database
    const student = STUDENTS.find(
      (s) => s.email.toLowerCase() === inputEmail && s.nim === inputNim,
    );

    if (student) {
      // If student belongs to a different class, warn them (except for demo account)
      if (student.classId !== id && student.email !== "demo@ecampus.ut.ac.id") {
        const targetClass = CLASSES.find((c) => c.id === student.classId);
        setError(
          `Gagal: Mahasiswa ini terdaftar di ${targetClass?.title || "kelas lain"}. Tidak bisa masuk kelas ini.`,
        );
        return;
      }
      onLogin({
        email: student.email,
        nim: student.nim,
        role: "student",
        classId: id,
      });
    } else {
      // If not in database at all, reject it for ALL classes.
      // Now all 4 classes are strictly protected.
      setError("Data tidak cocok. Cek kembali NIM dan Email untuk kelas ini.");
      return;
    }

    navigate(`/class/${id}/meetings`);
  };

  return (
    <div className="max-w-md mx-auto pt-6 pb-20 px-4">
      <Link
        to="/"
        className="inline-flex items-center text-primary font-bold mb-8 hover:underline bg-primary-fixed bg-opacity-30 px-3 py-1 rounded-full text-sm"
      >
        <span className="material-symbols-outlined text-sm mr-1">
          arrow_back
        </span>{" "}
        Kembali
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <img
            src="/ut-logo.png"
            alt="UT Logo"
            className="w-16 h-auto mx-auto mb-4 object-contain"
          />
          <h2 className="font-headline font-bold text-2xl text-primary mb-2">
            Akses Kelas
          </h2>
          <p className="text-sm font-semibold text-slate-600 bg-slate-50 p-2 rounded-lg">
            {cls?.title}
          </p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-[18px]">error</span>{" "}
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Email Mahasiswa
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mhs@ecampus.ut.ac.id"
              className="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:border-primary focus:ring-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              NIM Mahasiswa
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="masukan nim mahasiswa"
                className="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:border-primary focus:ring-1 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1 bg-opacity-2 -translate-y-1 bg-opacity-2 text-slate-400"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-[#1a2169] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg mt-2"
          >
            Masuk ke Kelas
          </button>
        </form>
      </div>
    </div>
  );
}

function DashboardTutor({ user }) {
  const [submissions, setSubmissions] = useState([]);
  const [moduleContent, setModuleContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [unlocking, setUnlocking] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState("1");
  const [groupCount, setGroupCount] = useState(4);
  const [generating, setGenerating] = useState(false);

  if (!user || user.role !== "tutor") return <Navigate to="/" />;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: subs, error: errSubs } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });
      const { data: mods, error: errMods } = await supabase
        .from("module_content")
        .select("*")
        .order("page_num", { ascending: true });
      if (errSubs) throw errSubs;
      if (errMods) throw errMods;
      setSubmissions(subs || []);
      setModuleContent(mods || []);
    } catch (err) {
      console.log("Supabase fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUnlock = async (studentEmail, sectionName) => {
    const key = `${studentEmail}_${sectionName}`;
    setUnlocking(key);
    try {
      await supabase
        .from("submissions")
        .delete()
        .eq("student_email", studentEmail)
        .eq("section_name", sectionName);
      // Let's also delete the feedback if they are resetting the answer
      await supabase
        .from("submissions")
        .delete()
        .eq("student_email", studentEmail)
        .eq("section_name", `TUTOR_FEEDBACK_${sectionName}`);
      await fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setUnlocking(null);
    }
  };

  const handleStarFeedback = async (
    studentEmail,
    classId,
    meetingNum,
    sectionName,
    stars,
  ) => {
    try {
      const feedbackName = `TUTOR_FEEDBACK_${sectionName}`;
      // Optimistic update so UI updates immediately
      setSubmissions((prev) => {
        const withoutOld = prev.filter(
          (s) =>
            !(
              s.student_email === studentEmail &&
              s.section_name === feedbackName
            ),
        );
        return [
          ...withoutOld,
          {
            student_email: studentEmail,
            class_id: classId,
            meeting_num: meetingNum,
            section_name: feedbackName,
            content: String(stars),
          },
        ];
      });

      await supabase
        .from("submissions")
        .delete()
        .eq("student_email", studentEmail)
        .eq("section_name", feedbackName);
      await supabase.from("submissions").insert([
        {
          student_email: studentEmail,
          class_id: classId,
          meeting_num: meetingNum,
          section_name: feedbackName,
          content: String(stars),
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGenerateGroups = async () => {
    if (!activeTab || activeTab === "record_m1") return;
    setGenerating(true);
    try {
      // Include all students in the class (excluding demo account for groups)
      const classStudents = STUDENTS.filter(
        (s) => s.classId === activeTab && s.email !== "demo@ecampus.ut.ac.id",
      );
      if (classStudents.length === 0) return;

      // Shuffle using Fisher-Yates
      const shuffled = [...classStudents];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Split into groups
      const groups = Array.from({ length: groupCount }, (_, i) => ({
        group_num: i + 1,
        members: [],
      }));

      shuffled.forEach((student, index) => {
        groups[index % groupCount].members.push({
          nim: student.nim,
          name: student.name,
          email: student.email,
        });
      });

      const sectionName = "GENERATED_GROUPS";
      // Save/Upsert to submissions table
      // We use a special student_email 'SYSTEM_GROUP' to store this session data
      const payload = {
        student_email: "SYSTEM_GROUP",
        class_id: activeTab,
        meeting_num: selectedMeeting,
        section_name: sectionName,
        content: JSON.stringify(groups),
      };

      // Delete old if exists for this meeting
      await supabase
        .from("submissions")
        .delete()
        .eq("student_email", "SYSTEM_GROUP")
        .eq("class_id", activeTab)
        .eq("meeting_num", selectedMeeting)
        .eq("section_name", sectionName);

      const { error } = await supabase.from("submissions").insert([payload]);
      if (error) throw error;

      alert(
        `Berhasil mengacak ${classStudents.length} mahasiswa ke dalam ${groupCount} kelompok untuk Pertemuan ${selectedMeeting}!`,
      );
      await fetchData();
    } catch (err) {
      console.log(err);
      alert("Gagal mengacak kelompok.");
    } finally {
      setGenerating(false);
    }
  };

  const handleResetGroups = async () => {
    if (!activeTab || activeTab === "record_m1") return;
    if (
      !confirm(
        `Apakah Anda yakin ingin menghapus pembagian kelompok untuk Pertemuan ${selectedMeeting}? Semua data kelompok sesi ini akan hilang.`,
      )
    )
      return;

    setGenerating(true);
    try {
      await supabase
        .from("submissions")
        .delete()
        .eq("student_email", "SYSTEM_GROUP")
        .eq("class_id", activeTab)
        .eq("meeting_num", selectedMeeting)
        .eq("section_name", "GENERATED_GROUPS");

      alert(`Berhasil mereset kelompok untuk Pertemuan ${selectedMeeting}.`);
      await fetchData();
    } catch (err) {
      console.log(err);
      alert("Gagal mereset kelompok.");
    } finally {
      setGenerating(false);
    }
  };

  const CLASS_TABS = [
    { id: "1", label: "Kelas 8B" },
    { id: "2", label: "Kelas 8C" },
    { id: "3", label: "Kelas 6A" },
    { id: "4", label: "Kelas 5A" },
    { id: "demo", label: "Demo" },
    { id: "record_m1", label: "📂 Record Modul 1" },
  ];

  const getStudentList = () => {
    if (activeTab === "demo")
      return STUDENTS.filter((s) => s.email === "demo@ecampus.ut.ac.id").slice(
        0,
        1,
      );
    return STUDENTS.filter(
      (s) => s.classId === activeTab && s.email !== "demo@ecampus.ut.ac.id",
    );
  };

  const studentList = getStudentList();
  const [expandedStudent, setExpandedStudent] = useState(null);

  const toggleStudent = (email) => {
    if (expandedStudent === email) setExpandedStudent(null);
    else setExpandedStudent(email);
  };

  return (
    <div className="py-8 min-h-[70vh] px-4">
      <h2 className="font-headline font-bold text-3xl text-primary mb-1">
        Monitoring Keaktifan
      </h2>
      <p className="text-slate-500 mb-6 font-medium italic text-sm">
        Monitoring real-time aktivitas dan jawaban mahasiswa per kelas.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {CLASS_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-lg shadow-primary shadow-opacity-30 scale-105"
                : "bg-white border border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
            }`}
          >
            {tab.label}
            <span
              className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white bg-opacity-20" : "bg-slate-100"}`}
            >
              {tab.id === "demo"
                ? "1"
                : STUDENTS.filter(
                    (s) =>
                      s.classId === tab.id &&
                      s.email !== "demo@ecampus.ut.ac.id",
                  ).length}
            </span>
          </button>
        ))}
        <button
          onClick={fetchData}
          className="ml-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary text-sm font-bold flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>{" "}
          Refresh
        </button>
      </div>

      {/* Group Generator Tool - Only for real classes */}
      {activeTab !== "demo" && activeTab !== "record_m1" && (
        <div className="mb-8 p-6 bg-gradient-to-r from-primary to-[#1a2169] rounded-[2.5rem] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <span className="material-symbols-outlined text-3xl">
                group_add
              </span>
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                Generator Kelompok Acak
              </h3>
              <p className="text-white text-opacity-60 text-[10px] font-medium uppercase tracking-wider">
                Acak kelompok berbeda untuk setiap sesi mahasiswa
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white bg-opacity-10 p-2 rounded-2xl backdrop-blur-sm border border-white border-opacity-10">
            <div className="px-3 border-r border-white border-opacity-10">
              <p className="text-[10px] font-black opacity-40 uppercase mb-1">
                Sesi Pertemuan
              </p>
              <select
                value={selectedMeeting}
                onChange={(e) => setSelectedMeeting(e.target.value)}
                className="bg-transparent font-bold text-sm outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={String(n)} className="text-slate-800">
                    Pertemuan {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-3 border-r border-white border-opacity-10">
              <p className="text-[10px] font-black opacity-40 uppercase mb-1">
                Jumlah Kelompok
              </p>
              <input
                type="number"
                min="2"
                max="20"
                value={groupCount}
                onChange={(e) => setGroupCount(parseInt(e.target.value))}
                className="bg-transparent font-bold text-sm outline-none w-10 text-center"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleGenerateGroups}
                disabled={generating}
                className="bg-yellow-400 text-primary px-6 py-2.5 rounded-xl font-black text-xs hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-lg shadow-yellow-400 shadow-opacity-20 disabled:opacity-50"
              >
                {generating ? "..." : "ACAK SEKARANG"}
                {!generating && (
                  <span className="material-symbols-outlined text-sm">
                    casino
                  </span>
                )}
              </button>
              <button
                onClick={handleResetGroups}
                disabled={generating}
                className="bg-red-500 bg-opacity-10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 border border-red-500 border-opacity-20 disabled:opacity-50"
                title="Reset atau Hapus Kelompok"
              >
                <span className="material-symbols-outlined text-sm">
                  delete_sweep
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-20 bg-slate-50">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-slate-400 font-bold">Memuat Data...</p>
          </div>
        ) : activeTab === "record_m1" ? (
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-headline font-bold text-slate-800">
                  Manajemen Konten Modul 1
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Hasil transkripsi dari Pustaka UT (Halaman 4{"-"}47)
                </p>
              </div>
              <div className="bg-primary bg-opacity-5 px-4 py-2 rounded-xl border border-primary border-opacity-10 flex items-center gap-4">
                <div className="text-center border-r pr-4">
                  <p className="text-[10px] uppercase font-black text-slate-400">
                    Total Bagian
                  </p>
                  <p className="font-bold text-primary">
                    {moduleContent.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-black text-slate-400">
                    Status
                  </p>
                  <p className="font-bold text-green-500 font-mono text-[11px]">
                    DRAFTING
                  </p>
                </div>
              </div>
            </div>

            {moduleContent.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed rounded-3xl p-20 text-center">
                <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">
                  edit_note
                </span>
                <p className="text-slate-500 font-medium italic">
                  Belum ada konten yang ditranskripsi. Saya sedang mulai
                  mengetik hasil screenshot...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {["materi", "rangkuman", "soal_latihan"].map((type) => {
                  const items = moduleContent.filter(
                    (m) => m.content_type === type,
                  );
                  if (items.length === 0) return null;
                  return (
                    <div key={type} className="space-y-4">
                      <h4 className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-[0.2em] bg-primary bg-opacity-5 px-4 py-2 rounded-lg w-fit">
                        <span className="material-symbols-outlined text-[18px]">
                          {type === "materi"
                            ? "auto_stories"
                            : type === "rangkuman"
                              ? "summarize"
                              : "quiz"}
                        </span>
                        {type.replace("_", " ")}
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        {items.map((item, mi) => (
                          <div
                            key={mi}
                            className="bg-white border-l-4 border-l-primary border-opacity-30 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <p className="text-xs font-bold text-primary opacity-50 uppercase tracking-tighter">
                                  HALAMAN {item.page_num}
                                </p>
                                <h5 className="font-bold text-slate-800 text-lg">
                                  {item.section_title}
                                </h5>
                                {item.sub_title && (
                                  <p className="text-sm font-medium text-slate-500">
                                    {item.sub_title}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-wrap font-serif">
                              {item.body_text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="p-0">
            {/* Rekapitulasi LKPD Kelompok Section */}
            {(activeTab === "1" || activeTab === "2") && (
              <div className="p-8 bg-slate-50 bg-opacity-50 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                    <span className="material-symbols-outlined text-3xl">
                      hub
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-headline font-black text-slate-800 leading-tight">
                      Rekapitulasi LKPD Kelompok
                    </h3>
                    <p className="text-xs text-slate-500 font-medium tracking-tight">
                      Hasil pengerjaan Mind Map & Studi Kasus per tim (Sesi{" "}
                      {selectedMeeting})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(() => {
                    const groupSubs = submissions.filter(
                      (s) =>
                        s.class_id === activeTab &&
                        s.meeting_num === selectedMeeting &&
                        s.student_email.startsWith("GROUP_LKPD_"),
                    );

                    // Temukan sistem grup untuk tahu total kelompok seharusnya
                    const systemGroupRow = submissions.find(
                      (s) =>
                        s.student_email === "SYSTEM_GROUP" &&
                        s.class_id === activeTab &&
                        s.meeting_num === selectedMeeting,
                    );
                    const allGroups = systemGroupRow
                      ? JSON.parse(systemGroupRow.content)
                      : [];

                    if (allGroups.length === 0) {
                      return (
                        <div className="col-span-full py-10 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm">
                          Kelompok belum dibuat untuk sesi ini.
                        </div>
                      );
                    }

                    return allGroups.map((g, i) => {
                      const members = g.members;
                      const memberSubs = submissions.filter(
                        (s) =>
                          s.class_id === activeTab &&
                          s.meeting_num === selectedMeeting &&
                          s.section_name === "LKPD (Lembar Kerja Peserta Didik)" &&
                          members.some((m) => m.email === s.student_email),
                      );

                      const isEveryoneDone =
                        members.length > 0 &&
                        memberSubs.length === members.length;
                      const averageScore = isEveryoneDone
                        ? Math.round(
                            memberSubs.reduce((acc, s) => {
                              const score = parseInt(
                                (s.content.match(
                                  new RegExp("SKOR GAME: (\\d+)"),
                                ) || [])[1] || "0",
                              );
                              return acc + score;
                            }, 0) / members.length,
                          )
                        : null;

                      return (
                        <div
                          key={i}
                          className={`bg-white rounded-3xl p-6 border-2 transition-all flex flex-col ${isEveryoneDone ? "border-emerald-200 shadow-xl shadow-emerald-500 shadow-opacity-5" : "border-slate-100 shadow-sm"}`}
                        >
                          <div className="flex justify-between items-start mb-6">
                            <h4 className="font-black text-slate-800 flex items-center gap-2">
                              <span
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${isEveryoneDone ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}
                              >
                                {g.group_num}
                              </span>
                              Kelompok {g.group_num}
                            </h4>
                            {isEveryoneDone ? (
                              <button
                                onClick={async () => {
                                  if (
                                    confirm(
                                      `RESET KELOMPOK ${g.group_num}? Seluruh data pengerjaan anggota tim ini akan dihapus.`,
                                    )
                                  ) {
                                    setUnlocking(`RESET_G${g.group_num}`);
                                    try {
                                      const emailsToDelete = members.map(
                                        (m) => m.email,
                                      );
                                      await supabase
                                        .from("submissions")
                                        .delete()
                                        .eq("class_id", activeTab)
                                        .eq("meeting_num", selectedMeeting)
                                        .eq(
                                          "section_name",
                                          "LKPD (Lembar Kerja Peserta Didik)",
                                        )
                                        .in("student_email", emailsToDelete);
                                      fetchData();
                                    } finally {
                                      setUnlocking(null);
                                    }
                                  }
                                }}
                                className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                title="Reset Kelompok"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  refresh
                                </span>
                              </button>
                            ) : (
                              <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                {memberSubs.length} / {members.length} Terkirim
                              </span>
                            )}
                          </div>

                          <div className="flex-1 space-y-4 mb-6">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                Laporan Anggota
                              </p>
                              <div className="space-y-3">
                                {members.map((m, mi) => {
                                  const sub = memberSubs.find(
                                    (s) => s.student_email === m.email,
                                  );
                                  const score = sub
                                    ? (sub.content.match(
                                        new RegExp("SKOR GAME: (\\d+)"),
                                      ) || [])[1] || "0"
                                    : null;

                                  return (
                                    <div
                                      key={mi}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                        <p className="text-xs font-bold text-slate-600 truncate max-w-[120px]">
                                          {m.name}
                                        </p>
                                      </div>
                                      {score ? (
                                        <span className="text-xs font-black text-emerald-600">
                                          {score}
                                        </span>
                                      ) : (
                                        <span className="text-[9px] font-black text-slate-300 uppercase">
                                          PENDING
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {isEveryoneDone && (
                              <div className="bg-emerald-500 p-4 rounded-2xl text-white shadow-lg shadow-emerald-500 shadow-opacity-20 animate-in zoom-in duration-500">
                                <div className="flex justify-between items-center mb-1">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">
                                    Nilai Kolektif
                                  </p>
                                  <span className="material-symbols-outlined text-sm">
                                    verified
                                  </span>
                                </div>
                                <p className="text-2xl font-black">
                                  {averageScore}{" "}
                                  <span className="text-sm font-medium opacity-60">
                                    Avg
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-slate-50">
                            <button
                              onClick={() => {
                                // Tampilkan detail jawaban kasus yang pertama kirim sebagai referensi tim
                                if (memberSubs.length > 0) {
                                  alert(
                                    `REFERENSI JAWABAN KASUS (Awal):\n\n${memberSubs[0].content}`,
                                  );
                                }
                              }}
                              className="w-full py-2.5 rounded-xl border border-slate-200 text-[10px] font-black text-slate-500 uppercase flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                            >
                              <span className="material-symbols-outlined text-sm">
                                visibility
                              </span>
                              Cek Konten
                            </button>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            <div className="overflow-x-auto p-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
                <h3 className="text-lg font-headline font-black text-slate-800">
                  Daftar Mahasiswa (Individu)
                </h3>
              </div>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-primary text-white uppercase tracking-wider font-bold">
                    <th className="px-4 py-4 w-10 text-center border-r border-white border-opacity-10">
                      No
                    </th>
                    <th className="px-4 py-4 border-r border-white border-opacity-10">
                      Mahasiswa
                    </th>
                    <th className="px-4 py-4 border-r border-white border-opacity-10 text-center">
                      Jumlah Jawaban Mhs
                    </th>
                    <th className="px-4 py-4 text-center">Aksi Tutor</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {studentList.map((student, index) => {
                    const studentSubs = submissions.filter(
                      (s) => s.student_email === student.email,
                    );
                    // Filter out "TUTOR_FEEDBACK" rows to get pure answers
                    const actualAnswers = studentSubs.filter(
                      (s) => !s.section_name.startsWith("TUTOR_FEEDBACK_"),
                    );

                    return (
                      <Fragment key={index}>
                        <tr
                          className={
                            index % 2 === 0
                              ? "bg-white hover:bg-slate-50"
                              : "bg-slate-50 bg-opacity-50 hover:bg-slate-50"
                          }
                        >
                          <td className="px-4 py-4 font-bold text-slate-400 text-center border-r">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4 border-r">
                            <p className="font-bold text-slate-800 uppercase leading-none mb-1">
                              {student.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium tracking-tighter">
                              {student.nim} • {student.email}
                            </p>
                          </td>
                          <td className="px-4 py-4 border-r text-center">
                            <span className="inline-block bg-primary bg-opacity-10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                              {actualAnswers.length} Jawaban
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => toggleStudent(student.email)}
                              className="bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-md hover:bg-[#1a2169] transition-all flex items-center justify-center gap-1 mx-auto"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                {expandedStudent === student.email
                                  ? "expand_less"
                                  : "expand_more"}
                              </span>
                              {expandedStudent === student.email
                                ? "Tutup Detail"
                                : "Beri Penilaian & Cek Jawaban"}
                            </button>
                          </td>
                        </tr>
                        {expandedStudent === student.email && (
                          <tr className="bg-slate-50 border-b-2 border-slate-200">
                            <td colSpan={5} className="p-0">
                              <div className="p-6">
                                {actualAnswers.length === 0 ? (
                                  <p className="text-center text-slate-400 italic text-xs font-bold py-4">
                                    Mahasiswa ini belum mengirim jawaban apapun.
                                  </p>
                                ) : (
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {actualAnswers.map((answer, i) => {
                                      const secName = answer.section_name;
                                      const tutorFb = studentSubs.find(
                                        (s) =>
                                          s.section_name ===
                                          `TUTOR_FEEDBACK_${secName}`,
                                      );
                                      const curStars = tutorFb
                                        ? parseInt(tutorFb.content)
                                        : 0;
                                      const isUnlocking =
                                        unlocking ===
                                        `${student.email}_${secName}`;

                                      return (
                                        <div
                                          key={i}
                                          className="bg-white border rounded-xl p-4 shadow-sm relative group hover:border-primary border-opacity-30 transition-all flex flex-col justify-between"
                                        >
                                          <div>
                                            <div className="flex justify-between items-start mb-2">
                                              <p className="text-[10px] font-bold text-primary uppercase bg-primary bg-opacity-10 px-2 py-0.5 rounded inline-block">
                                                {secName}
                                              </p>
                                              <button
                                                onClick={() =>
                                                  handleUnlock(
                                                    student.email,
                                                    secName,
                                                  )
                                                }
                                                disabled={isUnlocking}
                                                className="text-[9px] text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded px-1.5 py-0.5 font-bold transition-all disabled:opacity-30"
                                                title="Hapus jawaban agar mahasiswa bisa mengulang"
                                              >
                                                {isUnlocking
                                                  ? "..."
                                                  : "🔓 Reset atau Hapus"}
                                              </button>
                                            </div>
                                            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg mb-3">
                                              {secName ===
                                              "Pertanyaan Pemantik" ? (
                                                <div className="max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
                                                  {answer.content
                                                    .split("\n\n")
                                                    .map((block, bi) => {
                                                      const parts =
                                                        block.split(
                                                          "\nJawaban: ",
                                                        );
                                                      return (
                                                        <div
                                                          key={bi}
                                                          className="mb-2 last:mb-0"
                                                        >
                                                          <p className="text-[9px] text-slate-400 leading-tight mb-0.5">
                                                            {parts[0]?.replace(
                                                              `Pertanyaan ${bi + 1}: `,
                                                              `Q${bi + 1}: `,
                                                            )}
                                                          </p>
                                                          <p className="text-[10px] font-medium text-slate-700 italic border-l-2 border-primary border-opacity-20 pl-1.5 leading-snug">
                                                            "{parts[1] || "-"}"
                                                          </p>
                                                        </div>
                                                      );
                                                    })}
                                                </div>
                                              ) : (
                                                <p className="text-[11px] font-medium text-slate-700 italic max-h-[120px] overflow-y-auto custom-scrollbar pr-1">
                                                  "{answer.content}"
                                                </p>
                                              )}
                                            </div>
                                          </div>

                                          <div className="pt-2 border-t">
                                            <div className="flex justify-between items-center">
                                              <div className="flex items-center gap-2">
                                                <p className="text-[10px] font-bold text-slate-700 uppercase">
                                                  Nilai Anda:
                                                </p>
                                                {curStars > 0 && (
                                                  <span className="text-[8px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                    <span className="material-symbols-outlined text-[10px]">
                                                      check_circle
                                                    </span>
                                                    Tersimpan Otomatis
                                                  </span>
                                                )}
                                              </div>
                                              <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                  <button
                                                    key={star}
                                                    onClick={() =>
                                                      handleStarFeedback(
                                                        student.email,
                                                        student.classId,
                                                        answer.meeting_num ||
                                                          "1",
                                                        secName,
                                                        star,
                                                      )
                                                    }
                                                    className={`text-[20px] transition-transform hover:scale-125 ${
                                                      star <= curStars
                                                        ? "text-yellow-400 drop-shadow-sm"
                                                        : "text-slate-300"
                                                    }`}
                                                  >
                                                    <span className="material-symbols-outlined fill-1 text-[18px]">
                                                      star
                                                    </span>
                                                  </button>
                                                ))}
                                              </div>
                                            </div>
                                            {curStars > 0 && (
                                              <div className="mt-2 bg-yellow-50 border border-yellow-100 p-2 rounded-md">
                                                <p className="text-[9px] text-yellow-700 italic leading-snug">
                                                  "{FEEDBACK_MESSAGES[curStars]}
                                                  "
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                  {studentList.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-12 text-slate-300 font-bold"
                      >
                        Belum ada data mahasiswa untuk kelas ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Meetings({ user }) {
  const { id } = useParams();
  const cls = CLASSES.find((c) => c.id === id);
  const meetingsList = Array.from({ length: 8 }, (_, i) => i + 1);

  if (!user || user.role !== "student") return <Navigate to={`/class/${id}`} />;

  return (
    <div className="pb-10 pt-4 px-4">
      <div className="flex items-center gap-3 mb-6 bg-primary bg-opacity-30 p-4 rounded-2xl border border-primary border-opacity-10">
        <div className="bg-white p-2 rounded-xl text-primary shadow-sm">
          <span className="material-symbols-outlined">menu_book</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
            Mata Kuliah
          </p>
          <h2 className="font-headline font-bold text-sm md:text-base text-slate-800 leading-tight truncate">
            {cls?.title}
          </h2>
        </div>
      </div>
      <h3 className="font-headline font-bold text-xl text-slate-800 mb-5">
        Modul Pembelajaran (8 Pertemuan)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {meetingsList.map((num) => (
          <Link
            key={num}
            to={`/class/${id}/meeting/${num}`}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
          >
            <span className="inline-block bg-yellow-400 text-primary text-[10px] font-bold px-2 py-1 rounded mb-3">
              SESI {num}
            </span>
            <h4 className="font-headline font-bold text-lg text-slate-800 mb-1">
              Pertemuan {num}
            </h4>
            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-slate-400">Materi & Tugas</p>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ClassMenu({ user }) {
  const { id, meetingId } = useParams();
  if (!user || user.role !== "student") return <Navigate to={`/class/${id}`} />;

  return (
    <div className="pt-2 pb-10 px-4">
      <Link
        to={`/class/${id}/meetings`}
        className="inline-flex items-center text-slate-500 font-bold mb-6 text-sm bg-white border px-4 py-2 rounded-full shadow-sm hover:bg-slate-50"
      >
        <span className="material-symbols-outlined text-sm mr-2">
          arrow_back
        </span>{" "}
        Daftar Pertemuan
      </Link>
      <div className="bg-gradient-to-br from-primary to-[#232c94] text-white p-8 rounded-3xl shadow-xl mb-8">
        <span className="bg-yellow-400 text-primary text-[10px] font-bold px-2 py-1 rounded">
          SESI {meetingId}
        </span>
        <h2 className="font-headline font-bold text-2xl md:text-3xl mt-2 mb-2">
          Menu Pembelajaran
        </h2>
        <p className="text-white text-opacity-60 text-sm">
          Pilih modul yang ingin Anda pelajari atau kerjakan sekarang.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MENUS.map((menu, i) => {
          let icon = "edit_document";
          let colorClass = "bg-blue-50 text-blue-600";
          let iconName = "edit_document";

          if (menu === "Informasi Modul") {
            iconName = "info";
            colorClass = "bg-sky-50 text-sky-600";
          } else if (menu === "Pertanyaan Pemantik") {
            iconName = "tips_and_updates";
            colorClass = "bg-amber-50 text-amber-600";
          } else if (menu === "Materi Pembelajaran") {
            iconName = "menu_book";
            colorClass = "bg-emerald-50 text-emerald-600";
          } else if (menu === "Video Pembelajaran") {
            iconName = "play_circle";
            colorClass = "bg-rose-50 text-rose-600";
          } else if (menu === "LKPD (Lembar Kerja Peserta Didik)") {
            iconName = "assignment";
            colorClass = "bg-indigo-50 text-indigo-600";
          } else if (menu === "Kuis dan Latihan") {
            iconName = "extension";
            colorClass = "bg-violet-50 text-violet-600";
          } else if (menu === "Refleksi") {
            iconName = "psychology";
            colorClass = "bg-fuchsia-50 text-fuchsia-600";
          } else if (menu === "Rangkuman") {
            iconName = "summarize";
            colorClass = "bg-slate-100 text-slate-600";
          } else if (menu === "Pembagian Kelompok") {
            iconName = "groups";
            colorClass = "bg-teal-50 text-teal-600";
          }

          return (
            <Link
              key={i}
              to={`/class/${id}/meeting/${meetingId}/section/${encodeURIComponent(menu)}`}
              className="group bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-primary border-opacity-30 hover:shadow-2xl hover:shadow-primary shadow-opacity-10 transition-all duration-300 text-center flex flex-col items-center relative overflow-hidden active:scale-95"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-500 flex items-center justify-center mb-4 shadow-sm relative z-10`}
              >
                <span className="material-symbols-outlined text-[32px]">
                  {iconName}
                </span>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary text-[13px] md:text-sm leading-tight transition-colors relative z-10">
                {menu}
              </p>

              {/* Subtle background decoration on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary bg-opacity-5 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SectionPage({ user }) {
  const { id, meetingId, sectionName } = useParams();
  const cls = CLASSES.find((c) => c.id === id);
  const courseCode = cls?.title.split("|")[0].trim();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [pemantikAnswers, setPemantikAnswers] = useState(["", "", ""]);
  const [tutorFeedback, setTutorFeedback] = useState(null);

  const isInput = [
    "Tugas",
    "Catatan",
    "LKPD",
    "Latihan",
    "Kuis",
    "Refleksi",
    "Rangkuman",
  ].some((p) => sectionName?.includes(p));

  useEffect(() => {
    setStatus(null);
    setTutorFeedback(null);
    if (!user) return;
    const fetchStatus = async () => {
      // If we are looking for Pertanyaan Pemantik, fetch that and its tutor feedback
      const sectionNamesToFetch = [
        sectionName,
        `TUTOR_FEEDBACK_${sectionName}`,
      ];

      // Fetch personal answers + system-generated groups
      const { data } = await supabase
        .from("submissions")
        .select("*")
        .or(`student_email.eq.${user.email},student_email.eq.SYSTEM_GROUP`)
        .eq("class_id", id)
        .eq("meeting_num", meetingId)
        .in("section_name", [...sectionNamesToFetch, "GENERATED_GROUPS"]);

      if (data && data.length > 0) {
        setSubmissions(data);
        const _status = data.find(
          (d) =>
            d.student_email === user.email && d.section_name === sectionName,
        );
        const _feedback = data.find(
          (d) => d.section_name === `TUTOR_FEEDBACK_${sectionName}`,
        );
        if (_status) setStatus(_status);
        if (_feedback) setTutorFeedback(_feedback);
      }
    };
    fetchStatus();
  }, [user, sectionName, id, meetingId]);

  const handleAction = async (val) => {
    if (!val || !val.trim()) return;
    setLoading(true);
    try {
      const payload = {
        student_email: user.email,
        class_id: id,
        meeting_num: meetingId,
        section_name: sectionName,
        content: val,
      };
      const { data, error } = await supabase
        .from("submissions")
        .insert([payload])
        .select();
      if (!error && data && data.length > 0) {
        setStatus(data[0]);
        setSubmissions((prev) => [...prev, data[0]]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "student") return <Navigate to={`/class/${id}`} />;

  const renderStaticContent = () => {
    if (sectionName === "Video Pembelajaran" && id === "3") {
      const videoId = "g1xgaTWoOiM";
      return (
        <div className="space-y-10 md:space-y-12 pb-10">
          {/* Video Player Card */}
          <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden group">
            <div className="aspect-video relative">
              <iframe
                className="w-full h-full relative z-10"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video Pembelajaran"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-primary bg-opacity-5 animate-pulse"></div>
            </div>
            <div className="p-6 md:p-10 bg-slate-50 border-t items-center flex flex-col md:flex-row justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500 shadow-opacity-30">
                  <span className="material-symbols-outlined text-2xl md:text-3xl font-black">
                    play_circle
                  </span>
                </div>
                <div>
                  <p className="font-black text-slate-800 text-base md:text-xl leading-tight">
                    Video Pembelajaran Utama
                  </p>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                    SPDA4401 | Kelas 6A
                  </p>
                </div>
              </div>
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto text-xs font-black text-white uppercase bg-slate-900 px-8 py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900 shadow-opacity-10 flex items-center justify-center gap-2"
              >
                Tonton di YouTube
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>

          {/* Evaluation Section */}
          <div className="bg-[#1e293b] text-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden border border-white border-opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary bg-opacity-20 rounded-full -mr-48 -mt-48 blur-[120px]"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <span className="w-2 h-2 bg-slate-900 rounded-full animate-pulse"></span>
                Evaluasi Video
              </div>
              <h4 className="font-headline font-black text-2xl md:text-4xl text-white mb-6 leading-tight uppercase tracking-tighter text-center">
                Apa yang kamu pelajari dari video ini?
              </h4>
              <p className="text-slate-400 text-sm md:text-base font-medium mb-10 leading-relaxed text-center">
                Tuangkan pemahaman Anda setelah menonton tayangan di atas dalam bentuk rangkuman singkat dan jelas di bawah ini.
              </p>

              {status ? (
                <div className="w-full bg-white bg-opacity-5 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] border border-white border-opacity-10 shadow-inner text-left">
                  <p className="text-[9px] md:text-[10px] text-yellow-400 font-black uppercase tracking-widest mb-4 opacity-70">Laporan Belajar Anda:</p>
                  <div className="bg-white bg-opacity-5 p-4 rounded-2xl">
                     <p className="text-sm md:text-lg text-slate-200 leading-relaxed italic font-serif opacity-90">"{status.content}"</p>
                  </div>
                  <div className="mt-8 flex items-center gap-3 py-3 px-6 bg-green-500 bg-opacity-20 rounded-2xl border border-green-500 border-opacity-30 w-fit">
                    <span className="material-symbols-outlined text-green-400">check_circle</span>
                    <p className="text-[10px] text-green-400 font-black uppercase tracking-widest">Berhasil Terkirim</p>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-6">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tuliskan analisis Anda di sini..."
                    className="w-full min-h-[180px] md:min-h-[220px] bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 text-sm md:text-lg text-white placeholder:text-slate-600 focus:bg-white focus:bg-opacity-10 focus:border-yellow-400 outline-none transition-all resize-none"
                  ></textarea>
                  <button
                    onClick={() => handleAction(content)}
                    disabled={loading || !content.trim()}
                    className="w-full bg-yellow-400 text-slate-900 font-black py-5 md:py-7 rounded-2xl md:rounded-[2.5rem] hover:bg-yellow-300 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-yellow-400 shadow-opacity-20 flex items-center justify-center gap-3 text-sm md:text-xl tracking-widest uppercase disabled:opacity-30"
                  >
                    {loading ? "MENGIRIM JAWABAN..." : "KIRIM JAWABAN KE TUTOR"}
                    {!loading && <span className="material-symbols-outlined font-black">send</span>}
                  </button>
                </div>
              )}
            </div>
          </div>

          {status && tutorFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-lg shadow-yellow-400 shadow-opacity-40">
                <span className="material-symbols-outlined text-white text-5xl">stars</span>
              </div>
              <div className="text-center md:text-left">
                <p className="font-black text-yellow-700 mb-1 text-xl md:text-3xl uppercase tracking-tighter">Hasil Penilaian</p>
                <p className="text-sm md:text-lg text-yellow-800 mb-6 italic font-medium">"{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || "Tutor telah memberikan penilaian."}"</p>
                <div className="flex justify-center md:justify-start gap-2 text-yellow-500">
                  {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-3xl md:text-4xl fill-1">star</span>
                  ))}
                  {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-3xl md:text-4xl text-slate-200">star</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (sectionName === "Video Pembelajaran" && (id === "1" || id === "2")) {
      const videoId = "GYlmNScMEl4";
      const wordCount = content.trim()
        ? content
            .trim()
            .split(new RegExp("\\s+"))
            .filter((w) => w.length > 0).length
        : 0;
      const isWordCountEnough = wordCount >= 100;

      return (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video Pembelajaran"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 bg-slate-50 border-t items-center flex justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-600 text-[18px]">
                    movie
                  </span>
                </div>
                <p className="font-bold text-slate-800 text-sm">
                  Video Pembelajaran Kelas 8B & 8C
                </p>
              </div>
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-primary uppercase bg-white border px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                Buka di YouTube
              </a>
            </div>
          </div>

          <div className="bg-[#0f172a] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white border-opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary bg-opacity-20 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 bg-opacity-10 rounded-full -ml-24 -mb-24 blur-[80px]"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-headline font-bold text-xl md:text-2xl text-yellow-400 tracking-tight flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-yellow-400 bg-opacity-20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-yellow-400">
                        description
                      </span>
                    </span>
                    Kesimpulan Video
                  </h4>
                  <p className="text-slate-400 text-sm mt-2 font-medium">
                    Susunlah poin-poin penting dari video yang telah Anda
                    tonton.
                  </p>
                </div>
                {!status && (
                  <div
                    className={`px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${isWordCountEnough ? "bg-green-500 bg-opacity-10 border-green-500 border-opacity-30 text-green-400" : "bg-white bg-opacity-5 border-white border-opacity-10 text-slate-400"}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${isWordCountEnough ? "bg-green-500 animate-pulse" : "bg-slate-500"}`}
                    ></span>
                    Syarat: 100 Kata
                  </div>
                )}
              </div>

              {status ? (
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-white border-opacity-10 shadow-inner">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] text-yellow-400 text-opacity-70 border border-yellow-400 border-opacity-30 px-2 py-0.5 rounded-md uppercase font-black tracking-tighter">
                        Laporan Mahasiswa
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-slate-200 leading-[1.8] text-justify italic font-serif">
                      {status.content}
                    </p>
                    <div className="mt-8 flex items-center gap-3 py-3 px-5 bg-green-500 bg-opacity-10 rounded-2xl border border-green-500 border-opacity-20 w-fit">
                      <span className="material-symbols-outlined text-green-400 text-xl font-bold">
                        verified
                      </span>
                      <p className="text-xs text-green-400 font-bold uppercase tracking-widest">
                        Terkirim & Terarsip
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 from-opacity-20 to-primary to-opacity-20 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Masukkan analisis dan kesimpulan Anda di sini (Minimal 100 kata)..."
                      className="relative w-full bg-[#1e293b] bg-opacity-50 border border-white border-opacity-10 rounded-[2rem] p-6 md:p-8 text-sm md:text-base text-white placeholder:text-slate-500 focus:bg-[#1e293b] focus:border-yellow-400 focus:border-opacity-50 outline-none min-h-[300px] resize-none transition-all leading-relaxed text-justify"
                    ></textarea>

                    <div className="absolute bottom-6 right-6 flex items-center gap-3">
                      <p
                        className={`text-xs font-black tracking-tighter transition-colors ${isWordCountEnough ? "text-green-400" : "text-slate-500"}`}
                      >
                        {wordCount.toLocaleString()}{" "}
                        <span className="opacity-50">{" / "} 100 KATA</span>
                      </p>
                      <div className="w-10 h-10 rounded-full bg-black bg-opacity-40 flex items-center justify-center border border-white border-opacity-5">
                        {isWordCountEnough ? (
                          <span className="material-symbols-outlined text-green-400 text-lg">
                            check_circle
                          </span>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-2">
                    <p className="text-[11px] text-slate-500 font-medium italic order-2 md:order-1">
                      * Kesimpulan yang dikirim tidak dapat diubah kembali.
                      Mohon teliti.
                    </p>
                    <button
                      onClick={() => handleAction(content)}
                      disabled={loading || !isWordCountEnough}
                      className="w-full md:w-auto min-w-[240px] bg-yellow-400 text-slate-900 font-black py-4 px-8 rounded-2xl hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-xl shadow-yellow-400 shadow-opacity-10 flex items-center justify-center gap-3 order-1 md:order-2"
                    >
                      {loading ? "MEMPROSES..." : "KIRIM KESIMPULAN VIDEO"}
                      {!loading && isWordCountEnough && (
                        <span className="material-symbols-outlined font-bold">
                          send
                        </span>
                      )}
                    </button>
                  </div>

                  {!isWordCountEnough && content.trim().length > 0 && (
                    <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                      <span className="material-symbols-outlined text-red-400">
                        priority_high
                      </span>
                      <p className="text-xs text-red-300 font-bold uppercase tracking-wider">
                        Kurang {100 - wordCount} kata lagi untuk membuka akses
                        tombol kirim.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {status && tutorFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="material-symbols-outlined text-yellow-500 text-4xl">
                stars
              </span>
              <div>
                <p className="font-bold text-yellow-700 mb-1 text-lg">
                  Nilai Kesimpulan Anda
                </p>
                <p className="text-sm text-yellow-800 mb-3 italic">
                  "
                  {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                    "Tutor telah memberikan penilaian."}
                  "
                </p>
                <div className="flex gap-1 text-yellow-500">
                  {Array(parseInt(tutorFeedback.content))
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined fill-1 text-2xl"
                      >
                        star
                      </span>
                    ))}
                  {Array(5 - parseInt(tutorFeedback.content))
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-slate-300 text-2xl"
                      >
                        star
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (sectionName === "Informasi Modul" && id === "3") {
      return (
        <div className="space-y-10 md:space-y-16 pb-10">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-14 overflow-hidden shadow-2xl border border-white border-opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary bg-opacity-20 rounded-full -mr-40 -mt-40 blur-[120px]"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-yellow-400 shadow-opacity-20">
                <span className="material-symbols-outlined text-sm md:text-base">book</span> Informasi Mata Kuliah
              </span>
              <h1 className="text-3xl md:text-6xl font-headline font-black text-white mb-4 leading-tight">
                Penanganan Anak <br className="hidden md:block" /> Berkebutuhan Khusus
              </h1>
              <div className="flex flex-wrap gap-3 md:gap-4 mt-8">
                <div className="bg-white bg-opacity-10 backdrop-blur-md px-4 py-2 rounded-xl border border-white border-opacity-10 text-white text-xs md:text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-400">code</span> PAUD4208
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-md px-4 py-2 rounded-xl border border-white border-opacity-10 text-white text-xs md:text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400">history_edu</span> 4 SKS
                </div>
              </div>
            </div>
          </div>

          {/* Pengantar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-l-[12px] border-l-primary">
                <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">diversity_1</span>
                  Aspek Perkembangan
                </h3>
                <p className="text-slate-600 font-medium leading-[1.8] text-sm md:text-base text-justify">
                  Setiap aspek perkembangan manusia saling berkaitan antara satu dengan lainnya. Apabila satu aspek perkembangan mengalami masalah atau gangguan maka ada kemungkinan aspek perkembangan lainnya pun akan terpengaruh dan bisa membuat perkembangan secara umum menjadi tidak optimal. 
                </p>
                <div className="mt-6 bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100">
                  <p className="text-xs md:text-sm text-slate-500 italic font-medium leading-relaxed">
                    "Di lembaga PAUD dapat ditemui anak yang tampak ceria, namun terkadang kita melihat anak yang memiliki keseimbangan buruk atau koordinasi motorik yang tidak sempurna."
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-[#1a2169] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-white shadow-xl shadow-indigo-500 shadow-opacity-10">
                <h3 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-3 text-yellow-400">
                  <span className="material-symbols-outlined">child_care</span>
                  Masa Kritis (3-6 Tahun)
                </h3>
                <p className="text-blue-50 text-opacity-90 font-medium leading-[1.8] text-sm md:text-base text-justify">
                  Anak usia prasekolah berada pada masa kritis karena mulai membangun rasa percaya terhadap dunia di sekitarnya. Mereka belajar untuk mandiri, membangun kontrol diri, serta belajar mengambil inisiatif dalam kegiatan sosial.
                </p>
                <p className="mt-6 text-yellow-200 text-xs md:text-sm font-bold flex items-center gap-2">
                   <span className="material-symbols-outlined text-sm">priority_high</span> Pendidik PAUD wajib mengidentifikasi gangguan sedini mungkin.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                 <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary bg-opacity-10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-primary font-black">inventory_2</span>
                 </div>
                 <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-800">Struktur BMP</h3>
                    <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Buku Materi Pokok PAUD4208</p>
                 </div>
              </div>
              
              <div className="space-y-4 md:space-y-6 flex-1">
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                  Informasi ini dirancang agar mahasiswa dapat mengidentifikasi dan mengambil tindakan yang tepat dalam penanganan anak berkebutuhan khusus secara mandiri maupun kolaboratif.
                </p>

                <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-slate-100 mt-auto">
                    <h4 className="font-black text-slate-800 text-xs md:text-sm mb-4 uppercase tracking-tighter flex items-center gap-2 border-b border-slate-200 pb-3">
                        <span className="material-symbols-outlined text-sm">list_alt</span> Ringkasan 12 Modul:
                    </h4>
                    <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {[
                            "M1: Anak dengan Perkembangan Nonnormatif",
                            "M2: Anak dengan Gangguan Fisik",
                            "M3: Anak dengan Gangguan Panca Indra",
                            "M4: Anak dengan Gangguan Autism",
                            "M5: Anak dengan Gangguan Perilaku",
                            "M6: Anak dengan Gangguan Belajar",
                            "M7: Anak dengan Gangguan Bahasa",
                            "M8: Anak dengan Gangguan Emosi",
                            "M9: Masalah Rutinitas Harian",
                            "M10: Gangguan Attachment",
                            "M11: Maltreatment pada Anak",
                            "M12: Kerjasama Penanganan"
                        ].map((modul, i) => (
                            <div key={i} className="flex gap-3 items-center group cursor-default">
                                <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-primary text-[10px] font-black flex flex-shrink-0 items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">{i+1}</span>
                                <span className="text-[11px] md:text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors uppercase">{modul}</span>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full List Grid (Visual Accent) */}
          <section className="space-y-6 md:space-y-10">
             <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-4xl font-headline font-black text-slate-800 uppercase tracking-tighter">Detail Kurikulum Modul</h2>
                <p className="text-xs md:text-sm text-slate-400 font-medium">Kompetensi yang akan dipelajari di mata kuliah PAUD4208</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  "Perkembangan Nonnormatif", "Gangguan Fisik", "Gangguan Panca Indra", "Gangguan Autism",
                  "Gangguan Perilaku", "Gangguan Belajar", "Gangguan Bahasa", "Gangguan Emosi",
                  "Rutinitas Harian", "Gangguan Attachment", "Maltreatment", "Kerjasama Penanganan"
                ].map((name, i) => (
                  <div key={i} className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary transition-all group flex flex-col items-center text-center">
                     <span className="text-primary font-black text-xl md:text-2xl mb-2 opacity-20 group-hover:opacity-100 transition-opacity">{String(i+1).padStart(2, '0')}</span>
                     <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-1 group-hover:text-primary">Modul {i+1}</p>
                     <p className="text-[10px] md:text-xs font-bold text-slate-700 leading-tight">{name}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Verification Section */}
          <div className="mt-10 md:mt-20 pt-10 border-t border-slate-100 flex flex-col items-center">
            {!status ? (
              <div className="w-full max-w-xl">
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-yellow-200 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-3 md:mb-4">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    Konfirmasi Pemahaman
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-800 mb-1 md:mb-2 text-center uppercase">
                    Evaluasi Struktur Modul
                  </h3>
                </div>

                <div className="bg-white border-2 border-primary border-opacity-10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-xl shadow-primary shadow-opacity-5">
                  <label className="block text-[11px] md:text-sm font-black text-primary uppercase tracking-tight mb-3 md:mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">question_answer</span>
                    Pertanyaan:
                  </label>
                  <p className="text-base md:text-lg font-bold text-slate-800 mb-6 md:mb-8 leading-snug">
                    Modul mana yang menurutmu menantang?
                  </p>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Contoh: Modul 4 tentang Autism, karena..."
                    className="w-full min-h-[120px] md:min-h-[150px] bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl p-4 md:p-6 text-[11px] md:text-sm focus:bg-white focus:border-primary focus:ring-1 outline-none transition-all resize-none mb-4 md:mb-8"
                  ></textarea>

                  <button
                    onClick={() => handleAction(content)}
                    disabled={loading || !content.trim()}
                    className="w-full bg-primary text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl hover:bg-[#1a2169] transition-all flex items-center justify-center gap-2 md:gap-3 group disabled:opacity-50 shadow-lg shadow-primary shadow-opacity-20 text-xs md:text-base tracking-widest"
                  >
                    {loading ? "MENGIRIM..." : "KIRIM ANALISIS MODUL"}
                    {!loading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm md:text-base font-bold">send</span>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xl bg-[#1e293b] text-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-slate-900 shadow-opacity-20 flex flex-col items-center text-center border border-white border-opacity-10">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-primary shadow-opacity-40">
                  <span className="material-symbols-outlined text-2xl md:text-4xl">check</span>
                </div>
                <h3 className="text-lg md:text-2xl font-black mb-2 text-yellow-400 uppercase tracking-tighter">Analisis Modul Terdaftar!</h3>
                <p className="text-slate-400 text-[11px] md:text-sm font-medium mb-6 md:mb-8 leading-relaxed">
                  Tutor akan meninjau jawaban Anda. Silakan lanjut ke menu Pertanyaan Pemantik atau Materi Pembelajaran.
                </p>
                <div className="bg-white bg-opacity-5 px-5 py-4 md:px-8 md:py-6 rounded-2xl w-full border border-white border-opacity-5 text-left">
                  <p className="text-[9px] md:text-[10px] font-black uppercase text-blue-400 mb-2 tracking-widest">Opini Anda:</p>
                  <p className="text-[11px] md:text-xs italic font-medium opacity-80 leading-relaxed">"{status.content}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (sectionName === "Informasi Modul") {

      const modulContent = COURSE_DATA[courseCode]?.[sectionName];
      return (
        <div className="space-y-10">
          {modulContent ? (
            modulContent
          ) : (
            <div className="bg-slate-50 border-2 border-dashed rounded-[3rem] p-16 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">
                library_books
              </span>
              <h3 className="text-xl font-black text-slate-400">
                Informasi Modul Segera Hadir
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Konten untuk mata kuliah {courseCode} sedang dalam proses
                transkripsi oleh tim Tutor.
              </p>
            </div>
          )}

          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 bg-opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400 uppercase tracking-tighter flex items-center gap-2">
              <span className="material-symbols-outlined">quiz</span> Pertanyaan
              Verifikasi
            </h4>
            <p className="text-sm mb-6 leading-relaxed font-medium">
              Sebutkan Judul 6 Modul yang ada di Mata Kuliah SPGK4307 {"/"}{" "}
              Bimbingan Konseling di SD
            </p>

            {status ? (
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 p-4 rounded-xl border border-white border-opacity-20">
                  <p className="text-[10px] text-white text-opacity-50 uppercase font-bold mb-2">
                    Jawaban Anda:
                  </p>
                  <p className="text-sm italic">"{status.content}"</p>
                  <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">
                      verified
                    </span>{" "}
                    Terkirim ke Tutor
                  </div>
                </div>
                {/* Tutor feedback removed from inside the forms box */}
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ketik jawaban Anda di sini..."
                  className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl p-4 text-sm focus:bg-white bg-opacity-10 focus:border-yellow-400 outline-none min-h-[120px]"
                ></textarea>
                <button
                  onClick={() => handleAction(content)}
                  disabled={loading || !content.trim()}
                  className="w-full bg-yellow-400 text-slate-900 font-bold py-3 rounded-xl hover:bg-yellow-300 transition-all disabled:opacity-50"
                >
                  {loading ? "Mengirim..." : "Kirim Jawaban"}
                </button>
              </div>
            )}
          </div>

          {status && tutorFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 shadow-sm mt-8">
              <span className="material-symbols-outlined text-yellow-500 text-4xl">
                stars
              </span>
              <div>
                <p className="font-bold text-yellow-700 mb-1 text-lg">
                  Nilai dari Tutor
                </p>
                <p className="text-sm text-yellow-800 mb-3 italic">
                  "
                  {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                    "Tutor telah memberikan penilaian."}
                  "
                </p>
                <div className="flex gap-1 text-yellow-500">
                  {Array(parseInt(tutorFeedback.content))
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined fill-1 text-2xl"
                      >
                        star
                      </span>
                    ))}
                  {Array(5 - parseInt(tutorFeedback.content))
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-slate-300 text-2xl"
                      >
                        star
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (sectionName === "Pertanyaan Pemantik" && id === "3") {
      const cases = [
        {
          id: 1,
          title: "Kasus 1",
          icon: "nightlight",
          color: "indigo",
          content: "Seorang ibu bercerita dalam sebuah arisan bahwa anaknya sekarang ini jika tidur tidak mau sendiri, padahal sebelumnya dia hanya ditemani sebentar sebelum tertidur. Tapi sekarang harus ditemani terus menerus, kalau ditinggal akan berteriak-teriak dan menangis seperti ketakutan. “Aku sampe susah nafas karena dipeluk kencang betul” kata sang ibu.",
          question: "Apa pertanyaan pertama yang akan anda ajukan?"
        },
        {
          id: 2,
          title: "Kasus 2",
          icon: "family_restroom",
          color: "rose",
          content: "“Wah kesel bener aku sama anakku” kata seorang bapak mengenai anak laki-lakinya. Masa tadi malam waktu kami makan bersama, tiba-tiba dia bilang mau jadi perempuan saja, karena jadi anak laki-laki itu “enggak” enak karena kalo main sering kasar. Memang selama ini saya tahu dia dekat sekali dengan ibunya, bahkan secara berkelakar saya selalu bilang dia sebagai “anak mama”. Tapi seumur hidup saya tidak pernah terpikirkan dan tidak akan pernah mengizinkan kalau anak laki-laki saya ingin jadi perempuan.",
          question: "Apa pertanyaan pertama yang akan anda ajukan?"
        }
      ];

      const allAnswered = pemantikAnswers[0]?.trim().length > 0 && pemantikAnswers[1]?.trim().length > 0;
      const combinedContent = cases
        .map((c, i) => `[${c.title}]\nKonteks: ${c.content}\nJawaban: ${pemantikAnswers[i]}`)
        .join("\n\n---\n\n");

      return (
        <div className="space-y-6 md:space-y-12 pb-10">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-[#1e1e2e] to-[#2d2d4a] p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden border border-white border-opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-indigo-500 bg-opacity-20 rounded-full -mr-32 -mt-32 md:-mr-40 md:-mt-40 blur-[80px] md:blur-[100px]"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest mb-4 md:mb-6">
                <span className="material-symbols-outlined text-xs md:text-base">clinical_notes</span> Studi Kasus Psikopatologi
              </span>
              <h1 className="text-2xl md:text-5xl font-headline font-black mb-3 md:mb-4 leading-tight uppercase tracking-tighter">
                Pertanyaan <br /> Pemantik
              </h1>
              <p className="text-slate-400 text-xs md:text-base font-medium max-w-xl leading-relaxed italic opacity-80 md:opacity-100">
                "Memahami dinamika emosi dan perilaku anak melalui sudut pandang profesional."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-10">
            {cases.map((item, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] md:rounded-[3.5rem] shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all group border-l-[8px] md:border-l-[16px]" style={{ borderLeftColor: item.id === 1 ? '#6366f1' : '#f43f5e' }}>
                <div className="p-5 md:p-12">
                  <div className="flex items-start justify-between mb-6 md:mb-10">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg`} style={{ backgroundColor: item.id === 1 ? '#6366f1' : '#f43f5e' }}>
                         <span className="material-symbols-outlined text-2xl md:text-3xl font-black">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-2xl font-black text-slate-800 uppercase tracking-tight">{item.title}</h3>
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 md:mt-1">Skenario Analisis</p>
                      </div>
                    </div>
                    <div className="hidden md:flex flex-col items-end">
                       <span className="text-4xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">0{item.id}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 md:p-10 rounded-[1.2rem] md:rounded-[2.5rem] border border-slate-100 mb-6 md:mb-10 relative">
                    <span className="absolute -top-3 left-4 md:-top-4 md:left-6 text-3xl md:text-5xl text-slate-200 font-serif leading-none italic opacity-50">“</span>
                    <p className="text-xs md:text-lg text-slate-600 leading-relaxed md:leading-[1.8] font-medium text-justify">
                      {item.content}
                    </p>
                    <span className="absolute -bottom-6 right-4 md:-bottom-10 md:right-6 text-3xl md:text-5xl text-slate-200 font-serif leading-none italic opacity-50 transform rotate-180">“</span>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-1.5 h-6 md:w-2 md:h-8 rounded-full bg-primary bg-opacity-20"></div>
                       <h4 className="font-black text-slate-800 text-[11px] md:text-base uppercase tracking-widest">{item.question}</h4>
                    </div>

                    {status ? (
                      <div className="bg-white border-2 border-slate-50 p-5 md:p-8 rounded-[1.2rem] md:rounded-[2rem] shadow-inner relative">
                         <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-3">Analisis Anda:</p>
                         <p className="text-xs md:text-base text-slate-700 italic font-serif leading-relaxed">
                           "{status.content.split("\n\n---\n\n")[i]?.split("Jawaban: ")[1] || "Jawaban belum tersedia."}"
                         </p>
                         <div className="absolute top-4 right-4 md:top-6 md:right-6">
                            <span className="material-symbols-outlined text-green-500 text-lg md:text-2xl">verified</span>
                         </div>
                      </div>
                    ) : (
                      <textarea
                        value={pemantikAnswers[i] || ""}
                        onChange={(e) => {
                          const updated = [...pemantikAnswers];
                          updated[i] = e.target.value;
                          setPemantikAnswers(updated);
                        }}
                        placeholder="Ketik pertanyaan atau langkah pertama Anda di sini..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-3xl p-5 md:p-8 text-xs md:text-base focus:bg-white focus:border-indigo-400 focus:ring-1 outline-none transition-all min-h-[100px] md:min-h-[150px] resize-none shadow-sm"
                      ></textarea>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!status && (
            <div className="pt-6 md:pt-10 flex flex-col items-center">
               <button
                  onClick={() => handleAction(combinedContent)}
                  disabled={loading || !allAnswered}
                  className="w-full max-w-xl bg-slate-900 text-white font-black py-4 md:py-7 rounded-[1.2rem] md:rounded-[2.5rem] hover:bg-black md:hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 shadow-2xl shadow-indigo-500 shadow-opacity-20 flex items-center justify-center gap-3 md:gap-4 text-xs md:text-xl tracking-widest uppercase group"
               >
                  {loading ? "MENGIRIM ANALISIS..." : "KIRIM SEMUA ANALISIS"}
                  {!loading && <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform text-sm md:text-base">send</span>}
               </button>
               {!allAnswered && (
                 <p className="text-[10px] md:text-xs font-bold text-rose-500 mt-4 animate-pulse">Mohon analisis kedua kasus sebelum mengirim jawaban.</p>
               )}
            </div>
          )}

          {status && tutorFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 md:p-12 rounded-[1.5rem] md:rounded-[4rem] flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-[1.2rem] md:rounded-3xl flex items-center justify-center shadow-lg shadow-yellow-400 shadow-opacity-40">
                <span className="material-symbols-outlined text-white text-3xl md:text-5xl">stars</span>
              </div>
              <div className="text-center md:text-left">
                <p className="font-black text-yellow-700 mb-1 text-lg md:text-3xl uppercase tracking-tighter leading-tight">Feedback Analisis Kasus</p>
                <p className="text-xs md:text-lg text-yellow-800 mb-4 md:mb-6 italic font-medium">"{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || "Tutor telah memberikan penilaian."}"</p>
                <div className="flex justify-center md:justify-start gap-1 md:gap-2 text-yellow-500">
                  {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-2xl md:text-4xl fill-1">star</span>
                  ))}
                  {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-2xl md:text-4xl text-slate-200">star</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (
      sectionName === "Pertanyaan Pemantik" &&
      (cls?.classId === "1" || cls?.classId === "2" || ["1", "2"].includes(id))
    ) {
      const questions = getPemantikForStudent(user.nim || "0");
      const allAnswered = pemantikAnswers.every((a) => a.trim().length > 0);
      const combinedContent = questions
        .map(
          (q, i) => `Pertanyaan ${i + 1}: ${q}\nJawaban: ${pemantikAnswers[i]}`,
        )
        .join("\n\n");

      return (
        <div className="space-y-6">
          <div className="bg-primary bg-opacity-5 p-5 rounded-2xl border border-primary border-opacity-10">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                tips_and_updates
              </span>{" "}
              Pertanyaan Pemantik
            </p>
            <p className="text-sm text-slate-600 font-medium">
              Jawablah 3 pertanyaan di bawah ini sesuai dengan pemahaman Anda.
              Pertanyaan bersifat pribadi dan berbeda untuk setiap mahasiswa.
            </p>
          </div>

          {status ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex items-center gap-3">
                <span className="material-symbols-outlined text-green-500 text-3xl">
                  check_circle
                </span>
                <div>
                  <p className="font-bold text-green-700">
                    Jawaban Sudah Terkirim ke Tutor
                  </p>
                  <p className="text-xs text-green-600">
                    Jawaban Anda telah disimpan dan tidak bisa diubah kecuali
                    tutor membuka kembali.
                  </p>
                </div>
              </div>

              {/* Tutor feedback shifted to bottom */}

              {questions.map((q, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-2xl p-5 shadow-sm"
                >
                  <p className="text-xs font-bold text-primary uppercase mb-2">
                    Pertanyaan {i + 1}
                  </p>
                  <p className="text-sm font-medium text-slate-700 mb-3">{q}</p>
                  <div className="bg-slate-50 p-3 rounded-xl border-l-4 border-primary border-opacity-30">
                    <p className="text-sm text-slate-600 italic">
                      "
                      {pemantikAnswers[i] ||
                        status.content
                          .split("\n\n")
                          [i]?.split("Jawaban: ")[1] ||
                        "-"}
                      "
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {q}
                    </p>
                  </div>
                  <textarea
                    value={pemantikAnswers[i]}
                    onChange={(e) => {
                      const updated = [...pemantikAnswers];
                      updated[i] = e.target.value;
                      setPemantikAnswers(updated);
                    }}
                    placeholder="Tulis jawaban Anda di sini..."
                    className="w-full bg-slate-50 border rounded-xl p-4 text-sm focus:bg-white focus:border-primary outline-none transition-all min-h-[100px] resize-none"
                  />
                </div>
              ))}
              <button
                onClick={() => handleAction(combinedContent)}
                disabled={loading || !allAnswered}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary shadow-opacity-20 hover:bg-[#1a2169] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Mengirim..."
                  : !allAnswered
                    ? "Lengkapi Semua Jawaban Terlebih Dahulu"
                    : "Kirim Semua Jawaban"}
              </button>
            </div>
          )}

          {status && tutorFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 shadow-sm mt-8">
              <span className="material-symbols-outlined text-yellow-500 text-4xl">
                stars
              </span>
              <div>
                <p className="font-bold text-yellow-700 mb-1 text-lg">
                  Nilai dari Tutor
                </p>
                <p className="text-sm text-yellow-800 mb-3 italic">
                  "
                  {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                    "Tutor telah memberikan penilaian."}
                  "
                </p>
                <div className="flex gap-1 text-yellow-500">
                  {Array(parseInt(tutorFeedback.content))
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined fill-1 text-2xl"
                      >
                        star
                      </span>
                    ))}
                  {Array(5 - parseInt(tutorFeedback.content))
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-slate-300 text-2xl"
                      >
                        star
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (sectionName === "Materi Pembelajaran" && (id === "1" || id === "2")) {
      return (
        <div className="space-y-12 pb-10">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#0c3352] to-[#1a4a6e] rounded-[3rem] p-10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 bg-opacity-10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
            <div className="relative z-10 text-center">
              <span className="inline-block bg-yellow-400 text-primary text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest shadow-lg shadow-yellow-400 shadow-opacity-20">
                Modul Utama
              </span>
              <h1 className="text-3xl md:text-5xl font-headline font-black text-white mb-4 leading-tight">
                Konsep Dasar Bimbingan {"&"} Konseling (BK)
              </h1>
              <p className="text-blue-100 text-opacity-70 max-w-2xl mx-auto text-sm md:text-base font-medium">
                Ringkasan materi pembelajaran yang disusun secara sistematis
                untuk pemahaman mendalam tentang layanan BK di sekolah dasar.
              </p>
            </div>
          </div>

          {/* Section 1: Pengertian, Fungsi, & Tujuan */}
          <section className="space-y-6">
            <h2 className="text-2xl font-headline font-black text-primary flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">
                01
              </span>
              Pengertian, Fungsi, {"&"} Tujuan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Guidance */}
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all border-l-8 border-l-blue-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-3xl">
                      explore
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800">
                      Guidance
                    </h3>
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-tighter">
                      Bimbingan (To Guide)
                    </p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    "To Direct (Mengarahkan)",
                    "To Pilot (Memandu)",
                    "To Manage (Mengelola)",
                    "To Steer (Menyetir)",
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-blue-50 bg-opacity-50 p-2 rounded-xl border border-blue-100 border-opacity-50"
                    >
                      <span className="material-symbols-outlined text-blue-500 text-sm">
                        check_circle
                      </span>
                      <span className="text-sm font-semibold text-slate-600">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed italic border-t pt-4">
                  Terminologi: Proses bantuan berkelanjutan untuk mencapai
                  pemahaman dan realisasi diri sesuai potensi.
                </p>
              </div>

              {/* Counseling */}
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all border-l-8 border-l-emerald-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <span className="material-symbols-outlined text-3xl">
                      psychology
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800">
                      Counseling
                    </h3>
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-tighter">
                      Konseling (Face-to-Face)
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Hubungan profesional (
                  <span className="font-bold text-emerald-600">
                    professional relationship
                  </span>
                  ) atau tatap muka yang bertujuan meningkatkan kemampuan{" "}
                  <span className="italic font-bold">self-adjustment</span>{" "}
                  (penyesuaian diri) secara efektif terhadap diri dan
                  lingkungan.
                </p>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <p className="text-xs font-bold text-emerald-800 uppercase mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      info
                    </span>{" "}
                    Fokus Utama
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">
                    Pengembangan kemampuan adaptasi siswa dalam menghadapi
                    tantangan personal dan akademis.
                  </p>
                </div>
              </div>
            </div>

            {/* Fungsi BK Grid */}
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10">
              <h4 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  grid_view
                </span>{" "}
                Fungsi Bimbingan dan Konseling
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  {
                    icon: "visibility",
                    title: "Pemahaman",
                    desc: "Memahami karakteristik siswa",
                  },
                  {
                    icon: "shield",
                    title: "Preventif",
                    desc: "Pencegahan masalah",
                  },
                  {
                    icon: "healing",
                    title: "Perbaikan",
                    desc: "Pemecahan masalah (Kuratif)",
                  },
                  {
                    icon: "auto_awesome",
                    title: "Pemeliharaan",
                    desc: "Mengembangkan potensi optimal",
                  },
                  {
                    icon: "volunteer_activism",
                    title: "Fasilitasi",
                    desc: "Memberikan kemudahan tumbuh",
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center group hover:border-primary transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary bg-opacity-5 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        {f.icon}
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 text-xs mb-1">
                      {f.title}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-tight font-medium">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Aspek Tujuan */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2 px-2">
                <span className="material-symbols-outlined text-primary">
                  target
                </span>{" "}
                3 Aspek Tujuan (Tugas Perkembangan)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Pribadi-Sosial",
                    color: "bg-indigo-600",
                    desc: "Toleransi, jujur, interaksi sosial, dan resolusi konflik.",
                  },
                  {
                    title: "Akademik (Belajar)",
                    color: "bg-amber-500",
                    desc: "Sikap belajar positif, motivasi tinggi, dan keterampilan efektif.",
                  },
                  {
                    title: "Karier",
                    color: "bg-rose-500",
                    desc: "Pemahaman potensi diri dan perencanaan masa depan logis.",
                  },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                  >
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 ${a.color} opacity-5 rounded-full -mr-10 -mt-10`}
                    ></div>
                    <div
                      className={`w-8 h-1 ${a.color} rounded-full mb-4`}
                    ></div>
                    <h5 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">
                      {a.title}
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {a.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Prinsip-Prinsip */}
          <section className="space-y-6">
            <h2 className="text-2xl font-headline font-black text-primary flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">
                02
              </span>
              Prinsip-Prinsip Dasar BK
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  t: "Bimbingan untuk Semua",
                  d: "Melayani semua tanpa memandang latar belakang sosial.",
                },
                {
                  t: "Individualisasi",
                  d: "Menitikberatkan pada keunikan setiap individu.",
                },
                {
                  t: "Menekankan Aspek Positif",
                  d: "Fokus pada kekuatan dan keberhasilan siswa.",
                },
                {
                  t: "Usaha Bersama",
                  d: 'Tanggung jawab kolektif seluruh elemen sekolah {"&"} orang tua.',
                },
                {
                  t: "Pengambilan Keputusan Mandiri",
                  d: "Mampu memilih jalan secara bertanggung jawab.",
                },
                {
                  t: "Lintas Aspek Kehidupan",
                  d: "Mencakup masyarakat, keluarga, dan dunia kerja.",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 bg-white border border-slate-100 rounded-3xl items-start hover:border-yellow-400 transition-all"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 bg-opacity-10 text-yellow-600 text-[10px] flex items-center justify-center font-black">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">
                      {p.t}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Asas-Asas */}
          <section className="bg-primary p-8 md:p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white bg-opacity-5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-headline font-black mb-10 flex items-center gap-4">
                <span className="material-symbols-outlined text-yellow-400 text-4xl">
                  verified_user
                </span>
                Asas-Asas (Kode Etik BK)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    t: "Kerahasiaan",
                    icon: "lock",
                    d: "Data konseli tidak boleh diketahui pihak lain.",
                  },
                  {
                    t: "Kesukarelaan",
                    icon: "favorite",
                    d: "Ikuti layanan tanpa paksaan (kemauan sendiri).",
                  },
                  {
                    t: "Keterbukaan",
                    icon: "campaign",
                    d: "Jujur dan terbuka dalam memberi informasi.",
                  },
                  {
                    t: "Kekinian",
                    icon: "event",
                    d: "Fokus pada masalah saat ini (here and now).",
                  },
                  {
                    t: "Kemandirian",
                    icon: "person_celebrate",
                    d: "Menjadi pribadi mandiri tanpa bergantung.",
                  },
                  {
                    t: "Keahlian",
                    icon: "workspace_premium",
                    d: "Dilakukan secara profesional oleh ahli terlatih.",
                  },
                  {
                    t: "Alih Tangan",
                    icon: "forward_to_inbox",
                    d: "Merujuk ke ahli lain jika di luar wewenang.",
                  },
                  {
                    t: "Tut Wuri Handayani",
                    icon: "star",
                    d: "Mengayomi, teladan, dan memberi dorongan.",
                  },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-10 p-6 rounded-3xl hover:bg-white bg-opacity-20 transition-all"
                  >
                    <span className="material-symbols-outlined text-yellow-400 mb-3">
                      {a.icon}
                    </span>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tighter">
                      {a.t}
                    </h4>
                    <p className="text-[10px] text-white text-opacity-60 font-medium leading-normal">
                      {a.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Jenis Layanan */}
          <section className="space-y-6">
            <h2 className="text-2xl font-headline font-black text-primary flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">
                04
              </span>
              Jenis-Jenis Layanan Konkret
            </h2>
            <div className="bg-white border rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x">
                {[
                  {
                    t: "Layanan Orientasi",
                    d: "Pengenalan lingkungan sekolah baru.",
                  },
                  {
                    t: "Layanan Informasi",
                    d: "Pemberian data pendidikan, jabatan, dan sosial.",
                  },
                  {
                    t: "Layanan Pembelajaran",
                    d: "Mengembangkan sikap dan kebiasaan belajar benar.",
                  },
                  {
                    t: "Layanan Penempatan",
                    d: "Memilih jurusan atau ekskul sesuai bakat.",
                  },
                  {
                    t: "Penguasaan Konten",
                    d: "Membantu penguasaan kompetensi tertentu.",
                  },
                  {
                    t: "Konseling Individual",
                    d: "Tatap muka mendalam untuk masalah perorangan.",
                  },
                  {
                    t: "Konseling Kelompok",
                    d: "Dinamika kelompok untuk pemecahan masalah.",
                  },
                  {
                    t: 'Konsultasi {"&"} Mediasi',
                    d: 'Membantu pihak ketiga (ortu) {"&"} selesaikan konflik.',
                  },
                ].map((l, i) => (
                  <div
                    key={i}
                    className="p-6 flex items-center gap-5 group hover:bg-slate-50 transition-all"
                  >
                    <span className="text-xl font-black text-slate-100 group-hover:text-primary transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{l.t}</p>
                      <p className="text-xs text-slate-400 font-medium">
                        {l.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Verification Button Section */}
          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center">
            {!status ? (
              <div className="w-full max-w-xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full border border-yellow-200 text-[10px] font-black uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    Konfirmasi Pemahaman
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">
                    Evaluasi Materi
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    Tuliskan jawaban Anda untuk pertanyaan di bawah ini untuk
                    mengirimkan laporan belajar ke tutor.
                  </p>
                </div>

                <div className="bg-white border-2 border-primary border-opacity-10 rounded-[2.5rem] p-8 shadow-xl shadow-primary shadow-opacity-5">
                  <label className="block text-sm font-black text-primary uppercase tracking-tight mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      question_answer
                    </span>
                    Pertanyaan Verifikasi:
                  </label>
                  <p className="text-lg font-bold text-slate-800 mb-6 leading-snug">
                    Apa Pengertian, Fungsi, dan Tujuan Bimbingan dan Konseling?
                  </p>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Ketik jawaban lengkap Anda di sini..."
                    className="w-full min-h-[150px] bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm focus:bg-white focus:border-primary focus:ring-1 outline-none transition-all resize-none mb-6"
                  ></textarea>

                  <button
                    onClick={() => handleAction(content)}
                    disabled={loading || !content.trim()}
                    className="w-full bg-[#1e293b] text-white font-black py-5 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                  >
                    {loading ? "MENGIRIM JAWABAN..." : "KIRIM JAWABAN KE TUTOR"}
                    {!loading && (
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        send
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xl bg-green-500 text-white p-8 rounded-[2.5rem] shadow-xl shadow-green-500 shadow-opacity-20 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl">
                    done_all
                  </span>
                </div>
                <h3 className="text-xl font-black mb-1">Jawaban Terkirim!</h3>
                <p className="text-white text-opacity-80 text-sm font-medium mb-6">
                  Laporan belajar Anda telah masuk ke sistem. Silakan tunggu
                  feedback/nilai dari tutor.
                </p>
                <div className="bg-white bg-opacity-10 px-6 py-4 rounded-2xl w-full border border-white border-opacity-10 text-left">
                  <p className="text-[10px] font-black uppercase text-white text-opacity-40 mb-1">
                    Jawaban Anda:
                  </p>
                  <p className="text-xs italic font-serif opacity-90">
                    "{status.content}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (sectionName === "Materi Pembelajaran" && id === "3") {
      return (
        <div className="space-y-10 md:space-y-12 pb-10">
        <div className="space-y-10 md:space-y-12 pb-10">
          {/* Header Silabus */}
          <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden shadow-2xl border border-white border-opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 bg-opacity-20 rounded-full -mr-48 -mt-48 blur-[120px]"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6">
                <span className="material-symbols-outlined text-sm md:text-base">auto_stories</span> Silabus Mata Kuliah
              </span>
              <h1 className="text-3xl md:text-6xl font-headline font-black text-white mb-4 leading-tight tracking-tighter uppercase">
                SPDA4401 <br /> <span className="text-yellow-400">Penanganan Anak BK</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-xl font-medium max-w-2xl leading-relaxed italic">
                Ringkasan alur pembelajaran Modul 1 sampai Modul 3 untuk persiapan Tutorial Tatap Muka (TTM).
              </p>
            </div>
          </div>

          {/* Grid Modul */}
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {/* Modul 1 */}
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all border-t-[12px] border-indigo-500">
               <div className="p-8 md:p-14">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-50 pb-8">
                     <div className="flex items-center gap-5">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner">
                           <span className="material-symbols-outlined text-4xl font-black">psychology</span>
                        </div>
                        <div>
                           <h2 className="text-[10px] md:text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">Modul 01</h2>
                           <h3 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">Hakikat Perkembangan Anak <br className="hidden md:block"/> Bersifat Nonnormatif</h3>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                     {/* KB 1 */}
                     <div className="space-y-6">
                        <div className="flex items-center gap-3">
                           <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">01</span>
                           <h4 className="font-black text-slate-800 text-sm md:text-base uppercase tracking-wider">Kegiatan Belajar 1</h4>
                        </div>
                        <div className="pl-11 space-y-4">
                           <p className="text-sm md:text-base font-bold text-slate-600 border-l-2 border-indigo-200 pl-4 py-1 italic">Hakikat Perkembangan Perkembangan Anak yang Bersifat Nonnormatif</p>
                           <ul className="space-y-3">
                              {[
                                 "Pengertian",
                                 "Apakah yang Disebut Kelainan atau Abnormal?",
                                 "a. Model Medis (Medical Model)",
                                 "b. Penyimpangan dari Rata-rata",
                                 "c. Penyimpangan dari Ideal",
                                 "Ciri-ciri Anak dengan Perkembangan Nonnormatif"
                              ].map((item, id) => (
                                 <li key={id} className="text-xs md:text-sm text-slate-500 font-medium flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                                    {item}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>

                     {/* KB 2 */}
                     <div className="space-y-6">
                        <div className="flex items-center gap-3">
                           <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">02</span>
                           <h4 className="font-black text-slate-800 text-sm md:text-base uppercase tracking-wider">Kegiatan Belajar 2</h4>
                        </div>
                        <div className="pl-11 space-y-6">
                           <div className="space-y-4">
                              <p className="text-xs md:text-sm font-black text-indigo-600 flex items-center gap-2 uppercase tracking-tight">
                                 <span className="material-symbols-outlined text-sm">filter_alt</span>
                                 A. Faktor Memengaruhi & Identifikasi
                              </p>
                              <ul className="space-y-3 pl-4 border-l-2 border-slate-100">
                                 {["Cetak Biru Biologis", "Genetik atau Lingkungan", "Konteks Sosial"].map((f, idx) => (
                                    <li key={idx} className="text-[11px] md:text-xs text-slate-500 font-bold">• {f}</li>
                                 ))}
                              </ul>
                           </div>
                           <div className="space-y-4">
                              <p className="text-xs md:text-sm font-black text-indigo-600 flex items-center gap-2 uppercase tracking-tight">
                                 <span className="material-symbols-outlined text-sm">search_check</span>
                                 B. Cara Identifikasi & Penanganan
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                 {["Wawancara", "Kuesioner", "Observasi"].map((way, idx) => (
                                    <div key={idx} className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                                       <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase">{way}</p>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Modul 2 */}
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all border-t-[12px] border-emerald-500">
               <div className="p-8 md:p-14">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-50 pb-8">
                     <div className="flex items-center gap-5">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shadow-inner">
                           <span className="material-symbols-outlined text-4xl font-black">blind</span>
                        </div>
                        <div>
                           <h2 className="text-[10px] md:text-xs font-black text-emerald-500 uppercase tracking-widest mb-1">Modul 02</h2>
                           <h3 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">Anak Dengan <br /> Gangguan Fisik</h3>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                     {/* KB 1 */}
                     <div className="bg-emerald-50 bg-opacity-30 p-6 md:p-8 rounded-[2rem] border border-emerald-100">
                        <h4 className="font-black text-emerald-900 text-xs md:text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                           <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[9px]">1</span>
                           Anak dengan Cerebral Palsy
                        </h4>
                        <ul className="grid grid-cols-1 gap-4">
                           {[
                              { t: "Batasan CP", i: "straighten" },
                              { t: "Tipe-tipe CP", i: "category" },
                              { t: "Karakteristik", i: "clinical_notes" },
                              { t: "Strategi Penanganan", i: "handyman" }
                           ].map((item, idx) => (
                              <li key={idx} className="flex items-center gap-3 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-emerald-100">
                                 <span className="material-symbols-outlined text-emerald-500 text-sm md:text-base">{item.i}</span>
                                 <span className="text-[11px] md:text-xs font-bold text-slate-700">{item.t}</span>
                              </li>
                           ))}
                        </ul>
                     </div>

                     {/* KB 2 */}
                     <div className="p-2 md:p-4">
                        <h4 className="font-black text-slate-800 text-xs md:text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                           <span className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center text-[9px]">2</span>
                           Anak yang Rentan Sakit
                        </h4>
                        <div className="space-y-6">
                           <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                              <p className="text-[10px] font-black text-emerald-500 uppercase mb-2">Poin Pembahasan:</p>
                              <ul className="space-y-3">
                                 <li className="text-[11px] md:text-xs font-semibold text-slate-600 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    Pengertian Anak Rentan Sakit
                                 </li>
                                 <li className="text-[11px] md:text-xs font-semibold text-slate-600 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    Penyakit yang Umum Diderita Anak
                                 </li>
                                 <li className="text-[11px] md:text-xs font-semibold text-slate-600 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    Karakteristik & Penanganan
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Modul 3 */}
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all border-t-[12px] border-amber-500">
               <div className="p-8 md:p-14">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-50 pb-8">
                     <div className="flex items-center gap-5">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center shadow-inner">
                           <span className="material-symbols-outlined text-4xl font-black">visibility</span>
                        </div>
                        <div>
                           <h2 className="text-[10px] md:text-xs font-black text-amber-500 uppercase tracking-widest mb-1">Modul 03</h2>
                           <h3 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">Anak Dengan <br /> Gangguan Panca Indra</h3>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                     {[
                        { 
                          title: "Gangguan Pendengaran", 
                          icon: "hear_threshold",
                          items: ["Batasan & Penggolongan", "Identifikasi Anak", "Karakteristik Anak", "Strategi Penanganan"]
                        },
                        { 
                          title: "Gangguan Penglihatan", 
                          icon: "visibility_off",
                          items: ["Batasan Gangguan", "Identifikasi Anak", "Karakteristik Anak", "Strategi Penanganan"]
                        }
                     ].map((kb, idx) => (
                        <div key={idx} className="relative group">
                           <div className="absolute inset-0 bg-amber-500 bg-opacity-0 group-hover:bg-opacity-5 rounded-[2rem] transition-all -m-4"></div>
                           <h4 className="font-black text-amber-900 text-xs md:text-sm uppercase tracking-widest mb-5 flex items-center gap-3">
                              <span className="material-symbols-outlined text-xl">{kb.icon}</span>
                              KB {idx + 1}: {kb.title}
                           </h4>
                           <div className="grid grid-cols-1 gap-3">
                              {kb.items.map((item, i) => (
                                 <div key={i} className="flex items-center gap-3 py-2 border-b border-amber-100">
                                    <span className="text-[9px] font-black text-amber-400">0{i+1}</span>
                                    <span className="text-[11px] md:text-xs font-bold text-slate-600">{item}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* HIDDEN DETAILED CONTENT (AS REQUESTED) */}
          {false && (
            <>
              {/*
              [KONTEN DETAIL MODUL 1 DISINI]
              (Disembunyikan agar kode tetap bersih namun bisa diakses jika dibutuhkan)
              */}
            </>
          )}

          {/* Materi Pengayaan Section */}
          <section className="space-y-6 md:space-y-8 mt-12">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
               <span className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg md:text-xl shadow-lg shadow-indigo-600 shadow-opacity-20">
                 <span className="material-symbols-outlined">video_library</span>
               </span>
               <div>
                  <h2 className="text-lg md:text-2xl font-black text-indigo-900 leading-tight uppercase tracking-tight">Materi Pengayaan</h2>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Tayangan Visual Pendukung</p>
               </div>
            </div>

            <div className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden group">
               <div className="aspect-video relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl">
                  <iframe
                    className="w-full h-full relative z-10"
                    src={`https://www.youtube.com/embed/L9CWP3bNFA8`}
                    title="Materi Pengayaan"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 bg-indigo-900 bg-opacity-5 animate-pulse"></div>
               </div>
               <div className="mt-6 flex items-center gap-3 px-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <p className="text-xs md:text-sm text-slate-500 font-bold italic">Tonton video pengayaan di atas sebagai referensi tambahan sebelum menjawab pertanyaan evaluasi.</p>
               </div>
            </div>
          </section>

          {/* Verification Section */}
          <div className="mt-10 md:mt-20 pt-10 border-t border-slate-100 flex flex-col items-center">
            {!status ? (
              <div className="w-full max-w-xl">
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-yellow-200 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-3 md:mb-4">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    Konfirmasi Pemahaman
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-800 mb-1 md:mb-2">
                    Evaluasi Materi
                  </h3>
                  <p className="text-[11px] md:text-sm text-slate-500 font-medium">
                    Tuliskan jawaban Anda untuk pertanyaan di bawah ini untuk mengirimkan laporan belajar ke tutor.
                  </p>
                </div>

                <div className="bg-white border-2 border-primary border-opacity-10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-primary shadow-opacity-5">
                  <label className="block text-[11px] md:text-sm font-black text-primary uppercase tracking-tight mb-3 md:mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">question_answer</span>
                    Pertanyaan Verifikasi:
                  </label>
                  <p className="text-base md:text-lg font-bold text-slate-800 mb-4 md:mb-6 leading-snug">
                    Apa yang dimaksud dengan perkembangan normatif dan nonnormatif?
                  </p>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Ketik jawaban lengkap Anda di sini..."
                    className="w-full min-h-[120px] md:min-h-[150px] bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl p-4 md:p-5 text-[11px] md:text-sm focus:bg-white focus:border-primary focus:ring-1 outline-none transition-all resize-none mb-4 md:mb-6"
                  ></textarea>

                  <button
                    onClick={() => handleAction(content)}
                    disabled={loading || !content.trim()}
                    className="w-full bg-primary text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl hover:bg-[#1a2169] transition-all flex items-center justify-center gap-2 md:gap-3 group disabled:opacity-50 shadow-lg shadow-primary shadow-opacity-20 text-xs md:text-base tracking-widest"
                  >
                    {loading ? "MENGIRIM JAWABAN..." : "KIRIM JAWABAN KE TUTOR"}
                    {!loading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm md:text-base">send</span>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xl bg-green-500 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-green-500 shadow-opacity-20 flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <span className="material-symbols-outlined text-2xl md:text-4xl">done_all</span>
                </div>
                <h3 className="text-lg md:text-xl font-black mb-1">Jawaban Terkirim!</h3>
                <p className="text-white text-opacity-80 text-[11px] md:text-sm font-medium mb-4 md:mb-6">
                  Laporan belajar Anda telah masuk ke sistem. Silakan tunggu feedback/nilai dari tutor.
                </p>
                <div className="bg-white bg-opacity-10 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl w-full border border-white border-opacity-10 text-left">
                  <p className="text-[9px] md:text-[10px] font-black uppercase text-white text-opacity-40 mb-1">Jawaban Anda:</p>
                  <p className="text-[11px] md:text-xs italic font-serif opacity-90">"{status.content}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (sectionName === "Pembagian Kelompok") {
      const groupRow = submissions.find(
        (s) =>
          s.student_email === "SYSTEM_GROUP" &&
          s.section_name === "GENERATED_GROUPS",
      );
      const groups = groupRow ? JSON.parse(groupRow.content) : null;
      const myGroup = groups?.find((g) =>
        g.members.some((m) => m.email === user.email),
      );

      if (!groups) {
        return (
          <div className="bg-slate-50 border-2 border-dashed rounded-[3rem] p-20 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-slate-200 rotate-3 border border-slate-100">
              <span className="material-symbols-outlined text-5xl text-primary animate-pulse">
                pending_actions
              </span>
            </div>
            <h3 className="text-2xl font-headline font-black text-slate-800 mb-3 tracking-tight">
              Kelompok Belum Dibuat Oleh Tutor
            </h3>
            <p className="text-sm text-slate-500 max-w-sm font-medium leading-relaxed italic">
              Mohon bersabar, tutor Anda sedang memproses pembagian tim untuk
              sesi diskusi ini. Silakan refresh halaman atau tunggu instruksi
              selanjutnya.
            </p>
          </div>
        );
      }

      return (
        <div className="space-y-10">
          {myGroup ? (
            <div className="bg-gradient-to-br from-primary to-[#1a2169] rounded-[3.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white bg-opacity-5 rounded-full -mr-40 -mt-40 blur-3xl"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-yellow-400 shadow-opacity-20">
                  <span className="material-symbols-outlined text-sm animate-bounce">
                    stars
                  </span>{" "}
                  Informasi Kelompok Anda
                </div>
                <h1 className="text-4xl md:text-6xl font-headline font-black mb-4">
                  Kelompok {myGroup.group_num}
                </h1>
                <p className="text-blue-100 text-opacity-60 font-medium max-w-xl text-sm md:text-base leading-relaxed">
                  Anda telah terdaftar di Kelompok {myGroup.group_num} untuk
                  Pertemuan {meetingId}. Silakan berdiskusi dan berkolaborasi
                  dengan rekan tim Anda di bawah ini.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-[3rem] text-center">
              <p className="font-bold text-yellow-800">
                Nama Anda tidak ditemukan dalam daftar kelompok sesi ini. Mohon
                hubungi tutor.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((g, i) => (
              <div
                key={i}
                className={`bg-white border rounded-[2.5rem] p-8 shadow-sm transition-all ${myGroup?.group_num === g.group_num ? "ring-4 ring-primary ring-offset-4 border-primary scale-[1.02] shadow-2xl relative" : "hover:border-slate-300 group"}`}
              >
                {myGroup?.group_num === g.group_num && (
                  <div className="absolute -top-4 left-1 bg-opacity-2 -translate-x-1 bg-opacity-2 bg-primary text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                    Tim Anda
                  </div>
                )}
                <div className="flex justify-between items-start mb-6">
                  <h3
                    className={`text-xl font-headline font-black flex items-center gap-3 ${myGroup?.group_num === g.group_num ? "text-primary" : "text-slate-400 group-hover:text-slate-600"}`}
                  >
                    <span
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${myGroup?.group_num === g.group_num ? "bg-primary text-white shadow-lg shadow-primary shadow-opacity-30" : "bg-slate-100 text-slate-400"}`}
                    >
                      {g.group_num}
                    </span>
                    Kelompok {g.group_num}
                  </h3>
                  <div className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    {g.members.length} Orang
                  </div>
                </div>
                <div className="space-y-4">
                  {g.members.map((m, mi) => (
                    <div
                      key={mi}
                      className={`flex items-center gap-4 p-3 rounded-2xl border transition-all ${m.email === user.email ? "bg-primary bg-opacity-5 border-primary border-opacity-20" : "border-slate-50 group-hover:border-slate-100 bg-slate-50 bg-opacity-50"}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${m.email === user.email ? "bg-primary text-white" : "bg-white text-slate-400 border border-slate-200"}`}
                      >
                        {mi + 1}
                      </div>
                      <div className="overflow-hidden flex-1">
                        <p
                          className={`font-bold text-xs truncate ${m.email === user.email ? "text-primary" : "text-slate-700"}`}
                        >
                          {m.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-medium">
                          {m.nim}
                        </p>
                      </div>
                      {m.email === user.email && (
                        <span className="material-symbols-outlined text-primary text-lg ml-auto">
                          person
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-blue-50 p-10 rounded-3xl text-center text-slate-400 font-medium">
        Baca instruksi modul untuk bagian ini.
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await supabase.from("submissions").insert([
        {
          student_email: user.email,
          class_id: id,
          meeting_num: meetingId,
          section_name: sectionName,
          content,
        },
      ]);
      setSuccess(true);
      setContent("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border shadow-sm min-h-[60vh] mt-4 mb-10 mx-4">
      <Link
        to={`/class/${id}/meeting/${meetingId}`}
        className="inline-flex items-center text-slate-400 font-bold mb-8 text-sm hover:text-primary"
      >
        <span className="material-symbols-outlined text-sm mr-1">
          arrow_back
        </span>{" "}
        Kembali
      </Link>
      <h2 className="font-headline font-bold text-2xl md:text-3xl text-primary mb-6">
        {sectionName}
      </h2>
      {!isInput ? (
        renderStaticContent()
      ) : (id === "1" || id === "2") && sectionName === "Kuis dan Latihan" ? (
        <div className="space-y-6">
          <InteractiveQuiz
            user={user}
            classId={id}
            meetingId={meetingId}
            submissions={submissions}
            onComplete={(content) => handleAction(content)}
          />
          {tutorFeedback && (
             <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-500">
               <span className="material-symbols-outlined text-yellow-500 text-4xl">
                 stars
               </span>
               <div>
                 <p className="font-bold text-yellow-700 mb-1 text-lg">
                   Nilai dari Tutor
                 </p>
                 <p className="text-sm text-yellow-800 mb-1 italic">
                   "
                   {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                     tutorFeedback.content}
                   "
                 </p>
               </div>
             </div>
           )}
        </div>
      ) : (id === "1" || id === "2") &&
        sectionName === "LKPD (Lembar Kerja Peserta Didik)" ? (
        <div className="space-y-4">
          <InteractiveMindMap
            user={user}
            classId={id}
            meetingId={meetingId}
            submissions={submissions}
            onComplete={async (totalScore, caseAnswer) => {
              setLoading(true);
              try {
                // Get group info for collective submission
                const groupRow = submissions.find(
                  (s) =>
                    s.student_email === "SYSTEM_GROUP" &&
                    s.section_name === "GENERATED_GROUPS",
                );
                const groups = groupRow ? JSON.parse(groupRow.content) : null;
                const myGroup = groups?.find((g) =>
                  g.members.some((m) => m.email === user.email),
                );

                const payload = {
                  student_email: user.email, // Sekarang simpan per individu mahasiswa
                  class_id: id,
                  meeting_num: meetingId,
                  section_name: sectionName,
                  content: `SKOR GAME: ${totalScore} per 100\nJAWABAN KASUS SISWA A: ${caseAnswer}`,
                };

                await supabase.from("submissions").insert([payload]);
                setSuccess(true);
                alert(`Luar biasa! Laporan individu Anda berhasil dikirim.`);
              } catch (err) {
                console.log(err);
              } finally {
                setLoading(false);
              }
            }}
          />
        </div>
      ) : sectionName === "Refleksi" ? (
        <div className="space-y-6">
          <InteractiveReflection
            user={user}
            classId={id}
            meetingId={meetingId}
            submissions={submissions}
            onComplete={(content) => handleAction(content)}
          />
          {tutorFeedback && (
             <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-500">
               <span className="material-symbols-outlined text-yellow-500 text-4xl">
                 stars
               </span>
               <div>
                 <p className="font-bold text-yellow-700 mb-1 text-lg">
                   Nilai dari Tutor
                 </p>
                 <p className="text-sm text-yellow-800 mb-1 italic">
                   "
                   {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                     tutorFeedback.content}
                   "
                 </p>
               </div>
             </div>
           )}
        </div>
      ) : (id === "1" || id === "2") && sectionName === "Rangkuman" ? (
        <div className="space-y-8">
          {/* Header Instruksi */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl border border-white border-opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary bg-opacity-20 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
            <div className="relative z-10">
               <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-yellow-400 shadow-opacity-20">
                  <span className="material-symbols-outlined text-sm">assignment</span> Tugas Rangkuman
               </div>
               <h3 className="text-2xl md:text-3xl font-black mb-4">Buatlah Rangkuman Modul 1</h3>
               <div className="bg-rose-500 bg-opacity-10 border border-rose-500 border-opacity-30 p-4 rounded-2xl flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-rose-500 animate-pulse">block</span>
                  <p className="text-sm font-black text-rose-400 uppercase tracking-tighter">Jangan Menggunakan AI!!</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "KB 1: Pengertian, Fungsi, dan Tujuan BK",
                    "KB 2: Prinsip-Prinsip BK",
                    "KB 3: Asas-Asas BK",
                    "KB 4: Jenis-Jenis Layanan BK"
                  ].map((kb, idx) => (
                    <div key={idx} className="bg-white bg-opacity-5 border border-white border-opacity-10 p-4 rounded-2xl flex items-center gap-3">
                       <span className="w-8 h-8 rounded-xl bg-white bg-opacity-10 flex items-center justify-center text-[10px] font-black">{idx+1}</span>
                       <p className="text-xs font-bold text-slate-300">{kb}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {status ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 p-8 md:p-12 rounded-[3rem] text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl text-green-500 mb-4">verified</span>
                <h4 className="text-xl font-black text-slate-800 mb-2">Rangkuman Berhasil Dikirim</h4>
                <p className="text-sm text-slate-500 font-medium mb-8">Terima kasih. Rangkuman Anda telah terekam dan siap dinilai oleh Tutor.</p>
                <div className="bg-white p-8 rounded-3xl w-full text-left shadow-sm border border-green-100 max-w-2xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Isi Rangkuman Anda:</p>
                  <p className="text-sm text-slate-700 leading-relaxed italic text-justify whitespace-pre-wrap">"{status.content}"</p>
                </div>
              </div>
              {tutorFeedback && (
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-500">
                  <span className="material-symbols-outlined text-yellow-500 text-4xl">
                    stars
                  </span>
                  <div>
                    <p className="font-bold text-yellow-700 mb-1 text-lg">
                      Nilai dari Tutor
                    </p>
                    <p className="text-sm text-yellow-800 mb-1 italic">
                      "
                      {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                        tutorFeedback.content}
                      "
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-slate-900 rounded-[2.5rem] blur opacity-10 group-focus-within:opacity-40 transition duration-1000"></div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Ketik rangkuman Anda di sini... (Harap ketik manual, jangan copy-paste hasil AI)"
                    className="relative w-full min-h-[400px] bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 md:p-10 text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-primary outline-none transition-all leading-relaxed text-justify shadow-inner"
                  ></textarea>

                  <div className="absolute bottom-6 right-8 flex items-center gap-4 bg-white bg-opacity-80 backdrop-blur-md px-4 py-2 rounded-2xl border shadow-sm">
                     <p className={`text-xs font-black tracking-tighter transition-colors ${content.trim().split(/\s+/).filter(w => w.length > 0).length >= 200 ? "text-green-600" : "text-slate-400"}`}>
                        {content.trim().split(/\s+/).filter(w => w.length > 0).length} / 200 KATA
                     </p>
                     {content.trim().split(/\s+/).filter(w => w.length > 0).length >= 200 ? (
                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                     ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse"></div>
                     )}
                  </div>
               </div>

               <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
                  <p className="text-[11px] text-slate-400 font-medium italic order-2 md:order-1 flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">info</span>
                     Rangkuman yang sudah dikirim tidak dapat diubah kembali.
                  </p>
                  <button
                    onClick={() => handleAction(content)}
                    disabled={loading || content.trim().split(/\s+/).filter(w => w.length > 0).length < 200}
                    className="w-full md:w-auto min-w-[280px] bg-primary text-white font-black py-5 px-10 rounded-2xl hover:bg-[#1a2169] hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-xl shadow-primary shadow-opacity-20 flex items-center justify-center gap-3 order-1 md:order-2"
                  >
                    {loading ? "MENGIRIM..." : "KIRIM RANGKUMAN"}
                    <span className="material-symbols-outlined font-black">send</span>
                  </button>
               </div>

               {content.trim().length > 0 && content.trim().split(/\s+/).filter(w => w.length > 0).length < 200 && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                     <span className="material-symbols-outlined text-amber-500">priority_high</span>
                     <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">
                        Kurang {200 - content.trim().split(/\s+/).filter(w => w.length > 0).length} kata lagi untuk mengaktifkan tombol kirim.
                     </p>
                  </div>
               )}
            </div>
          )}
        </div>
      ) : status ? (
        <div className="space-y-6">
          <div className="bg-green-50 text-green-700 p-6 md:p-10 rounded-3xl text-center flex flex-col items-center border border-green-200">
            <span className="material-symbols-outlined text-5xl mb-4 text-green-500">
              check_circle
            </span>
            <p className="font-bold text-xl mb-4">
              Jawaban Anda Sudah Terkirim!
            </p>
            <div className="bg-white p-6 rounded-2xl w-full text-left shadow-sm border border-green-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                Jawaban Anda:
              </p>
              <p className="text-sm text-slate-700 whitespace-pre-wrap italic">
                "{status.content}"
              </p>
            </div>
          </div>
          {tutorFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4">
              <span className="material-symbols-outlined text-yellow-500 text-4xl">
                stars
              </span>
              <div>
                <p className="font-bold text-yellow-700 mb-1 text-lg">
                  Nilai dari Tutor
                </p>
                <p className="text-sm text-yellow-800 mb-3 italic">
                  "
                  {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                    "Tutor telah memberikan penilaian."}
                  "
                </p>
                <div className="flex gap-1 text-yellow-500">
                  {Array(parseInt(tutorFeedback.content))
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined fill-1 text-2xl"
                      >
                        star
                      </span>
                    ))}
                  {Array(5 - parseInt(tutorFeedback.content))
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-slate-300 text-2xl"
                      >
                        star
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis jawaban Anda..."
            className="w-full min-h-[300px] p-6 rounded-2xl border bg-slate-50 focus:bg-white focus:border-primary outline-none transition-all resize-none"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary shadow-opacity-20 hover:bg-[#1a2169] transition-all"
          >
            {loading ? "Sedang Mengirim..." : "Kirim Jawaban"}
          </button>
        </form>
      )}
      <div className="mt-10 pt-6 border-t border-slate-100">
        <Link
          to={`/class/${id}/meeting/${meetingId}`}
          className="inline-flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-primary bg-slate-50 hover:bg-primary bg-opacity-5 px-5 py-3 rounded-xl border border-slate-200 hover:border-primary transition-all"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>{" "}
          Kembali ke Menu Pembelajaran
        </Link>
      </div>
    </div>
  );
}

function Layout({ user, onLogin, onLogout }) {
  const location = useLocation();
  const isDashboard = location.pathname.includes("tutor-dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fbff] text-slate-800 font-body relative">
      <header className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-lg w-full px-5 py-3 border-b border-slate-100 flex justify-center">
        <div className="flex justify-between items-center w-full max-w-screen-xl">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/ut-logo.png"
              alt="UT Logo"
              className="w-9 h-auto object-contain"
            />
            <h1 className="font-headline font-bold text-xl tracking-tight text-primary">
              E-Learning <span className="text-yellow-500">Bagoes</span>
            </h1>
          </Link>
          {user && (
            <button
              onClick={onLogout}
              className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100"
            >
              Logout
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 w-full max-w-screen-xl mx-auto mt-4 px-2">
        <Routes>
          <Route path="/" element={<Home navigate={useNavigate()} />} />
          <Route path="/classes" element={<ClassesList />} />
          <Route
            path="/biodata"
            element={
              <Biodata user={user} profileData={user?.profileData || {}} />
            }
          />
          <Route
            path="/edit-biodata"
            element={
              <EditBiodata
                user={user}
                profileData={user?.profileData || {}}
                setProfileData={user?.setProfileData}
              />
            }
          />
          <Route
            path="/login-tutor"
            element={<LoginTutor onLogin={onLogin} />}
          />
          <Route
            path="/tutor-dashboard"
            element={<DashboardTutor user={user} />}
          />
          <Route path="/class/:id" element={<Login onLogin={onLogin} />} />
          <Route
            path="/class/:id/meetings"
            element={<Meetings user={user} />}
          />
          <Route
            path="/class/:id/meeting/:meetingId"
            element={<ClassMenu user={user} />}
          />
          <Route
            path="/class/:id/meeting/:meetingId/section/:sectionName"
            element={<SectionPage user={user} />}
          />
        </Routes>
      </main>
      <footer className="w-full text-center py-8 border-t bg-white mt-auto pb-28 md:pb-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <p className="text-slate-500 text-[11px] font-extrabold uppercase tracking-[0.2em] mb-1">
            Universitas Terbuka
          </p>
          <p className="text-primary text-xs font-bold uppercase mb-2">
            Salut Nusa Indah Belitang
          </p>
          <p className="text-slate-400 text-[10px] font-medium">
            &copy; 2026 Bagoes Panca Wiratama. All rights reserved.
          </p>
        </div>
      </footer>
      {!isDashboard && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white border-t border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
          <Link
            to="/"
            className={`flex flex-col items-center flex-1 py-1 ${location.pathname === "/" ? "text-primary" : "text-slate-300"}`}
          >
            <span className="material-symbols-outlined text-[28px]">home</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              Beranda
            </span>
          </Link>
          <Link
            to={
              user?.role === "student"
                ? `/class/${user.classId}/meetings`
                : "/classes"
            }
            className={`flex flex-col items-center flex-1 py-1 ${location.pathname.startsWith("/class") ? "text-primary" : "text-slate-300"}`}
          >
            <span className="material-symbols-outlined text-[28px]">
              import_contacts
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              Kelas
            </span>
          </Link>
          <Link
            to="/biodata"
            className={`flex flex-col items-center flex-1 py-1 ${location.pathname.startsWith("/biodata") || location.pathname.startsWith("/edit") ? "text-primary" : "text-slate-300"}`}
          >
            <span className="material-symbols-outlined text-[28px]">
              person
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              Biodata
            </span>
          </Link>
        </nav>
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("elearning_user");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (userData) => {
    const studentInfo = STUDENTS.find(
      (s) => s.nim === userData.nim || s.email === userData.email,
    );
    const profileData = {
      photo: null,
      fullName: studentInfo ? studentInfo.name : "Alexander Bagoes",
      email: userData.email,
      nim: userData.nim || "045123987",
      ttl: "Belitang, 12-05-2004",
      whatsapp: "081234567890",
      prodi: 'PGSD - Bi { " / " } AKP',
      semester: "8",
      pokjar: "Salut Nusa Indah Belitang",
    };
    const newUser = { ...userData, profileData };
    setUser(newUser);
    localStorage.setItem("elearning_user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("elearning_user");
  };

  // Create a version of user that includes the reactive setter for components
  const userWithSetter = user
    ? {
        ...user,
        setProfileData: (newData) => {
          setUser((prev) => {
            const updated = { ...prev, profileData: newData };
            localStorage.setItem("elearning_user", JSON.stringify(updated));
            return updated;
          });
        },
      }
    : null;

  return (
    <Routes>
      <Route
        path="*"
        element={
          <Layout
            user={userWithSetter}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        }
      />
    </Routes>
  );
}
