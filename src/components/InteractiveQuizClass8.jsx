import React, { useState, useEffect, useMemo } from "react";

// Generated Data
const QUIZ_DATA = [
  {
    "topic": "Soal tes formatif 1",
    "questions": [
      {
        "text": "Tujuan utama dari layanan orientasi adalah ....",
        "options": [
          "memberikan informasi tentang lingkungan sekolah",
          "membantu individu beradaptasi dengan lingkungan baru",
          "memberikan informasi tentang kehidupan sosial",
          "mengatasi masalah pribadi peserta didik"
        ],
        "answer": 1
      },
      {
        "text": "Menurut penjelasan dalam teks, tujuan layanan informasi adalah ....",
        "options": [
          "memberikan informasi tentang kehidupan pribadi peserta didik",
          "membantu peserta didik memahami lingkungan baru",
          "menyelesaikan masalah dalam kondisi peserta didik",
          "memberikan informasi yang diperlukan untuk membuat keputusan"
        ],
        "answer": 3
      },
      {
        "text": "Fungsi utama dari layanan pembelajaran adalah ....",
        "options": [
          "membantu peserta didik mengatasi hambatan belajar",
          "memberikan informasi tentang lingkungan sekolah",
          "menyelesaikan masalah dalam kondisi peserta didik",
          "meningkatkan kesadaran akan gaya hidup peserta didik"
        ],
        "answer": 0
      },
      {
        "text": "Tujuan dari layanan penempatan dan penyaluran adalah ....",
        "options": [
          "membantu peserta didik memahami lingkungan baru",
          "mengatasi masalah pribadi peserta didik secara individu",
          "mencegah ketidaksesuaian antara bakat individu dan lingkungan",
          "membantu peserta didik mendapatkan lingkungan yang cocok untuk mengembangkan potensi mereka"
        ],
        "answer": 3
      },
      {
        "text": "Yang dimaksud dengan layanan penguasaan konten adalah ....",
        "options": [
          "memberikan informasi tentang lingkungan sekolah",
          "membantu peserta didik memahami kompetensi yang berguna",
          "mengatasi masalah pribadi peserta didik secara individu",
          "memberikan informasi yang diperlukan untuk membuat keputusan"
        ],
        "answer": 1
      },
      {
        "text": "Tujuan dari layanan konseling individual adalah ....",
        "options": [
          "memberikan informasi tentang lingkungan sekolah",
          "mengatasi masalah pribadi peserta didik secara individu",
          "membantu peserta didik memahami kompetensi yang berguna",
          "meningkatkan kesadaran akan gaya hidup peserta didik"
        ],
        "answer": 1
      },
      {
        "text": "Tujuan utama dari layanan bimbingan kelompok adalah ....",
        "options": [
          "membantu peserta didik memahami lingkungan baru",
          "mengatasi masalah pribadi peserta didik secara individu",
          "membentuk kelompok yang lebih besar, kuat, dan mandiri",
          "memberikan informasi yang diperlukan untuk membuat keputusan"
        ],
        "answer": 2
      },
      {
        "text": "Tujuan layanan konseling kelompok adalah ....",
        "options": [
          "membantu peserta didik memahami lingkungan baru",
          "meningkatkan kesadaran akan gaya hidup peserta didik",
          "menciptakan lingkungan belajar yang positif",
          "membantu konseli secara individu dengan bantuan kelompok"
        ],
        "answer": 3
      },
      {
        "text": "Tujuan utama dari layanan konsultasi adalah ....",
        "options": [
          "memberikan informasi tentang lingkungan sekolah",
          "membantu peserta didik memahami lingkungan baru",
          "mengatasi masalah pribadi peserta didik secara individu",
          "membantu individu dan pihak lain untuk mengidentifikasi dan mengatasi masalah yang menghambat efektivitas peserta didik atau sekolah"
        ],
        "answer": 3
      },
      {
        "text": "Fungsi layanan mediasi dalam konteks konseling adalah ....",
        "options": [
          "membantu individu beradaptasi dengan lingkungan baru",
          "membantu konseli secara individu dengan bantuan kelompok",
          "menyelesaikan masalah pribadi peserta didik secara individu",
          "menjadi perantara dalam menyelesaikan konflik antara pihak-pihak yang terlibat"
        ],
        "answer": 3
      }
    ]
  },
  {
    "topic": "Soal tes formatif 2",
    "questions": [
      {
        "text": "Yang dimaksud dengan perkembangan adalah ....",
        "options": [
          "proses pengajaran kepada individu di kehidupan sehari-hari",
          "transformasi yang timbul akibat pematangan dan pengalaman",
          "fase kehidupan yang dilalui oleh setiap individu",
          "bertambahnya ukuran dan jumlah sel individu"
        ],
        "answer": 1
      },
      {
        "text": "Berdasarkan pembahasan sebelumnya, yang menjadi fokus layanan bimbingan dan konseling adalah ....",
        "options": [
          "prestasi akademis peserta didik",
          "keterampilan fisik peserta didik",
          "pencapaian tugas perkembangan peserta didik",
          "perilaku sosial peserta didik"
        ],
        "answer": 2
      },
      {
        "text": "Usia 6-12 tahun disebut sebagai masa sekolah dikarenakan ....",
        "options": [
          "pertumbuhan dan perkembangan rohani yang matang",
          "peserta didik sudah mampu untuk membaca, menulis, dan berhitung",
          "peserta didik sudah memperoleh keterampilan dasar",
          "jasmani dan rohani yang dimiliki oleh peserta didik sudah cukup matang untuk menerima pengajaran secara formal"
        ],
        "answer": 3
      },
      {
        "text": "Tugas perkembangan yang berkaitan dengan nilai-nilai agama adalah ....",
        "options": [
          "mempelajari keterampilan fisik sederhana",
          "belajar bergaul dan bekerja dalam kelompok",
          "mengembangkan kata hati, moral, dan nilai-nilai",
          "belajar menjadi pribadi yang mandiri"
        ],
        "answer": 2
      },
      {
        "text": "Inti dari tugas perkembangan \"Belajar menjadi pribadi yang mandiri\" adalah ....",
        "options": [
          "peserta didik mampu berdiri sendiri dan mengendalikan diri",
          "peserta didik mampu mengembangkan keterampilan fisik",
          "peserta didik mampu membangun hidup yang sehat",
          "peserta didik mampu memilih sikap hidup terhadap kelompok"
        ],
        "answer": 0
      },
      {
        "text": "Yang menjadi fokus pada masa kelas-kelas rendah di SD adalah ....",
        "options": [
          "kecenderungan membanding-bandingkan diri sendiri",
          "sikap tunduk kepada peraturan permainan tradisional",
          "minat terhadap kehidupan praktis sehari-hari",
          "memandang nilai sebagai ukuran prestasi"
        ],
        "answer": 1
      },
      {
        "text": "Yang menjadi ciri individu pada masa kelas-kelas tinggi di SD adalah ....",
        "options": [
          "minat kepada hal-hal dan mata pelajaran khusus",
          "keinginan untuk membandingkan pekerjaan praktis",
          "gemar membentuk kelompok sebaya",
          "semua jawaban benar"
        ],
        "answer": 3
      },
      {
        "text": "Tugas perkembangan yang berkaitan dengan sosialisasi adalah ....",
        "options": [
          "mempelajari keterampilan fisik sederhana",
          "belajar bergaul dan bekerja dalam kelompok",
          "membangun hidup yang sehat",
          "belajar menjadi pribadi yang mandiri"
        ],
        "answer": 1
      },
      {
        "text": "Yang menjadi dampak kegagalan dalam menyelesaikan tugas-tugas perkembangan adalah ....",
        "options": [
          "kecenderungan membanding-bandingkan diri sendiri",
          "meremehkan dari pihak lain dan hambatan di fase selanjutnya",
          "minat terhadap kehidupan praktis sehari-hari",
          "sikap tunduk kepada peraturan permainan tradisional"
        ],
        "answer": 1
      },
      {
        "text": "Peran pendidik dalam mengembangkan konsep hidup peserta didik di kehidupan sehari-hari adalah ....",
        "options": [
          "memberikan bimbingan untuk banyak melihat, mendengar, dan mengalami sesuatu yang bermanfaat untuk peningkatan ilmu",
          "memberikan arahan kepada peserta didik untuk bersifat positif di kelompok sosial",
          "membantu peserta didik merencanakan masa sekarang dan masa yang akan datang",
          "membimbing peserta didik agar dapat berhubungan dengan norma-norma agama yang menyangkut penerimaan dan penghargaan terhadap peraturan"
        ],
        "answer": 3
      }
    ]
  },
  {
    "topic": "Soal tes formatif 3",
    "questions": [
      {
        "text": "Yang dimaksud dengan perkembangan fisik adalah ....",
        "options": [
          "pertumbuhan dan perubahan pada tubuh seseorang",
          "transformasi emosional",
          "kematangan intelektual",
          "evolusi psikologis"
        ],
        "answer": 1
      },
      {
        "text": "Aspek pokok yang terlibat dalam perkembangan fisik individu menurut Kuhlen dan Thompson adalah ....",
        "options": [
          "pertumbuhan, emosi, dan moral",
          "sistem saraf, otot-otot, kelenjar endokrin, dan struktur fisik/tubuh",
          "kecerdasan, kemampuan motorik, dan kesehatan",
          "sosialisasi, psikomotorik, dan tingkah laku"
        ],
        "answer": 2
      },
      {
        "text": "Yang menyebabkan kesederhanaan pada akhir masa kanak-kanak menurut Hurlock adalah ....",
        "options": [
          "pertumbuhan otot yang dominan",
          "peningkatan berat badan yang cepat",
          "kecenderungan memakai pakaian serupa tanpa pertimbangan",
          "perubahan pada sistem saraf"
        ],
        "answer": 3
      },
      {
        "text": "Rata-rata pertambahan tinggi badan peserta didik SD setiap tahunnya adalah ....",
        "options": [
          "1-2 inci",
          "2-3 inci",
          "3-4 inci",
          "4-5 inci"
        ],
        "answer": 2
      },
      {
        "text": "Perhatikan Gambar 2.1 pada Kegiatan Belajar 2 ini. Apakah yang menjadi fokus dari gambar tersebut adalah ....",
        "options": [
          "kesederhanaan pada akhir masa kanak-kanak",
          "pertumbuhan berat badan dan tinggi badan",
          "perbandingan otot-lemak",
          "pertambahan jumlah sel pada peserta didik"
        ],
        "answer": 0
      },
      {
        "text": "Yang menjadi ciri utama masa kanak-kanak menurut Hurlock adalah ....",
        "options": [
          "kecenderungan bermain dan bergerak",
          "ukuran kepala yang lebih besar",
          "dominasi jaringan lemak pada tubuh",
          "kesederhanaan dalam berpakaian"
        ],
        "answer": 1
      },
      {
        "text": "Berdasarkan Tabel 2.1 pada Kegiatan Belajar 2, apa yang menjadi karakteristik perkembangan fisik pada masa kanak-kanak akhir ....",
        "options": [
          "tinggi badan menurun",
          "perubahan pada wajah dan kepala",
          "peningkatan berat badan yang signifikan",
          "dominasi jaringan otot"
        ],
        "answer": 3
      },
      {
        "text": "Yang menjadi perhatian orang tua terkait pertumbuhan peserta didik SD adalah ....",
        "options": [
          "pertumbuhan kaki lebih cepat daripada bagian atas tubuh",
          "kesederhanaan yang mencolok",
          "peningkatan berat badan yang bervariasi",
          "dominasi jaringan lemak"
        ],
        "answer": 1
      },
      {
        "text": "Yang terjadi pada pertumbuhan lemak dan otot selama fase akhir masa kanak-kanak adalah ....",
        "options": [
          "pertumbuhan lemak lebih cepat daripada otot",
          "pertumbuhan otot lebih cepat daripada lemak",
          "pertumbuhan lemak dan otot seimbang",
          "tidak ada perubahan pada pertumbuhan lemak dan otot"
        ],
        "answer": 1
      },
      {
        "text": "Di bawah ini yang bukan faktor yang mendukung perkembangan motorik siswa adalah ....",
        "options": [
          "pertumbuhan dan perkembangan sistem saraf",
          "pertumbuhan otot",
          "pertumbuhan gigi",
          "perubahan struktur jasmani"
        ],
        "answer": 3
      }
    ]
  },
  {
    "topic": "Soal tes formatif 4",
    "questions": [
      {
        "text": "Yang menjadi ciri utama tahap sensorimotor pada perkembangan kognitif menurut Jean Piaget adalah ....",
        "options": [
          "kemampuan mengklasifikasikan objek berdasarkan ciri-ciri tertentu",
          "dominasi pengamatan yang egosentris",
          "penggunaan kemampuan sensorik dan tindakan motorik yang intensif terhadap dunia sekitarnya",
          "kemampuan merenungkan pemikiran sendiri"
        ],
        "answer": 2
      },
      {
        "text": "Di usia berapa periode pra-konseptual pada tahap pra-operasional umumnya terjadi pada anak ....",
        "options": [
          "0-2 tahun",
          "2-4 tahun",
          "4-7 tahun",
          "7-11 tahun"
        ],
        "answer": 1
      },
      {
        "text": "Yang menandai periode intuitif pada tahap kognitif praoperasional adalah ....",
        "options": [
          "kemampuan mengklasifikasikan objek berdasarkan ciri-ciri tertentu",
          "orientasi diri yang memusat pada pandangan dunianya sendiri",
          "penggunaan sensorimotor yang intensif terhadap dunia sekitarnya",
          "kemampuan merenungkan pemikiran sendiri"
        ],
        "answer": 1
      },
      {
        "text": "Yang menjadi fokus pada tahap operasional konkret adalah ....",
        "options": [
          "pemikiran logis yang menggantikan pemikiran intuitif",
          "kemampuan menerapkan cara berpikir untuk menangani masalah dari berbagai kategori",
          "dominasi pengamatan yang bersifat egosentris",
          "penggunaan sensorimotor yang intensif terhadap dunia sekitarnya"
        ],
        "answer": 0
      },
      {
        "text": "Perhatikan!\n1. Berpikir logis untuk menangani masalah.\n2. Berpikir secara abstrak.\n3. Mampu menggunakan logika pada objek fisik saja.\n4. Memiliki sifat yang egosentris.\nDi bawah ini yang merupakan karakteristik tahap operasional formal adalah ....",
        "options": [
          "2 dan 4",
          "1, 2, dan 4",
          "1, 2, dan 3",
          "benar semua"
        ],
        "answer": 2
      },
      {
        "text": "Yang dimaksud dengan displacement dalam perkembangan bahasa adalah ....",
        "options": [
          "kemampuan individu untuk menghasilkan kalimat bermakna yang terbatas",
          "kemampuan berbicara dengan menggunakan kosakata yang dimiliki",
          "kemampuan untuk menggunakan bahasa dalam mengomunikasikan informasi mengenai tempat dan waktu yang lain",
          "kemampuan anak berbicara seperti orang dewasa"
        ],
        "answer": 0
      },
      {
        "text": "Manakah yang bukan karakteristik utama bahasa ....",
        "options": [
          "kata-kata (Words)",
          "urutan kata-kata",
          "infivity generativy",
          "displacement"
        ],
        "answer": 1
      },
      {
        "text": "Berapakah jumlah kata yang harus dikuasai oleh anak pada usia 12 tahun?",
        "options": [
          "10.000 kata",
          "25.000 kata",
          "40.000 kata",
          "50.000 kata"
        ],
        "answer": 1
      },
      {
        "text": "Apa yang dimaksud dengan infivity generativy dalam karakteristik bahasa?",
        "options": [
          "kemampuan peserta didik berbicara dalam waktu yang relatif lama",
          "kemampuan individu dalam menghasilkan sejumlah kalimat bermakna terbatas",
          "penggunaan bahasa untuk mengomunikasikan informasi tentang tempat dan waktu yang lain",
          "kemampuan peserta didik berbicara seperti orang dewasa"
        ],
        "answer": 1
      },
      {
        "text": "Pada usia berapa anak seharusnya mampu menyerap 20.000 – 24.000 kata ....",
        "options": [
          "6 tahun",
          "8 tahun",
          "10 tahun",
          "12 tahun"
        ],
        "answer": 2
      }
    ]
  },
  {
    "topic": "Soal tes formatif 5",
    "questions": [
      {
        "text": "Pada usia berapa peserta didik mulai memahami konsep emosi yang rumit, seperti cemburu, bahagia, sedih, dan kehilangan ....",
        "options": [
          "5-6 tahun",
          "7-8 tahun",
          "9-10 tahun",
          "11-12 tahun"
        ],
        "answer": 0
      },
      {
        "text": "Yang menjadi konsekuensi dari fase perkembangan sosial peserta didik SD adalah ....",
        "options": [
          "kesenangan dalam berperan",
          "dorongan untuk berkembang dari posisi dependent ke posisi independent",
          "keterampilan emosional yang matang",
          "kemampuan untuk berpikir abstrak"
        ],
        "answer": 1
      },
      {
        "text": "Tahap perkembangan moral yang berkaitan dengan orientasi hukum dan ketertiban adalah ....",
        "options": [
          "pra-konvensional",
          "konvensional",
          "pasca-konvensional",
          "pra-konvensional dan konvensional"
        ],
        "answer": 1
      },
      {
        "text": "Peran teman sebaya pada perkembangan sosial peserta didik SD adalah ....",
        "options": [
          "hanya sebagai sumber kesenangan",
          "membantu dalam pengembangan aspek perkembangan anak",
          "tidak memiliki pengaruh pada perkembangan sosial",
          "hanya penting pada jenjang kelas tinggi"
        ],
        "answer": 1
      },
      {
        "text": "Berikut yang merupakan tahap perkembangan emosi pada usia 11-12 tahun adalah ....",
        "options": [
          "pengendalian emosi yang kurang baik",
          "kesulitan mengungkapkan perasaan secara verbal",
          "paham mengenai norma dan nilai yang berlaku",
          "cenderung menghindari konflik emosi"
        ],
        "answer": 2
      },
      {
        "text": "Perhatikan!\n1. Agresi\n2. Berselisih\n3. Mementingkan diri sendiri\n4. Bermain peran\n5. Pembangkangan\nBerdasarkan pilihan di atas, yang bukan konsekuensi dari perkembangan sosial pada usia SD adalah ....",
        "options": [
          "1 dan 3",
          "2 dan 4",
          "1 dan 5",
          "1, 2, dan 4"
        ],
        "answer": 2
      },
      {
        "text": "Aktivitas manakah yang dapat dilakukan pendidik/konselor untuk meningkatkan perkembangan sosial anak? Apakah aktivitas bermain peran, pemutaran film, dan aktivitas sejenisnya membantu perkembangan sosial anak di SD?",
        "options": [
          "bermain peran",
          "pemutaran film edukatif",
          "bermain video games",
          "permainan berkelompok"
        ],
        "answer": 2
      },
      {
        "text": "Yang menjadi orientasi anak manis pada tahap perkembangan moral pra-konvensional adalah ....",
        "options": [
          "membuat kesepakatan antar-pribadi",
          "menghormati otoritas dan memelihara ketertiban sosial",
          "orientasi hukuman dan kepatuhan",
          "orientasi realistis-instrumental"
        ],
        "answer": 0
      },
      {
        "text": "Konsekuensi dari sifat egosentris untuk peserta didik adalah ....",
        "options": [
          "kematangan kemampuan kognitif peserta didik",
          "kesulitan dalam menyelesaikan masalah abstrak",
          "perkembangan emosi yang stabil",
          "orientasi pada hukum dan ketertiban"
        ],
        "answer": 1
      },
      {
        "text": "Yang dimaksud dengan tahap operasional formal dalam perkembangan kognitif anak adalah ....",
        "options": [
          "periode sensitif terhadap rangsangan suara dan situasi berbahaya",
          "pola pikir yang mirip dengan orang dewasa",
          "kemampuan mengklasifikasikan angka-angka",
          "keinginan terhadap hal-hal drama dan berkhayal"
        ],
        "answer": 1
      }
    ]
  }
];

// Seeded Random Generator Functions
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
  return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}

function getSeededRandom(seed) {
  let a = cyrb128(seed)[0];
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function shuffleArray(array, randFunc) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(randFunc() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function InteractiveQuizClass8({ user, classId, meetingId, submissions, onComplete }) {
  // Generate the 25 specific questions for this user
  const finalQuestions = useMemo(() => {
    if (!user?.email) return [];
    
    // Seed using user's email + class details so it's consistent
    const randFunc = getSeededRandom(`${user.email}_${classId}_${meetingId}`);
    
    let selected = [];
    QUIZ_DATA.forEach(formatif => {
       const shuffledFormatif = shuffleArray(formatif.questions, randFunc);
       const fiveSelected = shuffledFormatif.slice(0, 5).map(q => ({...q, source: formatif.topic}));
       selected.push(...fiveSelected);
    });
    
    // Final master shuffle
    return shuffleArray(selected, randFunc);
  }, [user, classId, meetingId]);

  const draftKey = `quiz_draft_8_${user?.email}_${classId}_${meetingId}`;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState(() => {
     const saved = localStorage.getItem(draftKey);
     if (saved) {
         try { return JSON.parse(saved); } catch(e) {}
     }
     return {};
  });
  const [gameState, setGameState] = useState("INTRO"); 

  useEffect(() => {
     if(Object.keys(answers).length > 0) {
         localStorage.setItem(draftKey, JSON.stringify(answers));
     }
  }, [answers, draftKey]);

  // Periksa apakah kuis sudah pernah disubmit sebelumnya
  const statusRow = (submissions || []).find(
    (s) => s.student_email === user.email && s.section_name === "Kuis dan Latihan"
  );

  useEffect(() => {
    if (statusRow && gameState !== "FINISHED") {
      setGameState("FINISHED");
    }
  }, [statusRow, gameState]);

  const handleSelect = (idx, ansIdx) => {
    setAnswers({ ...answers, [idx]: ansIdx });
  };

  const calculateScore = () => {
    let score = 0;
    finalQuestions.forEach((q, idx) => {
      if (answers[idx] === q.answer) score += 4; // 25 soal * 4 = 100
    });
    return score;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setGameState("FINISHED");

    const reportText = `[SKOR AKHIR: ${finalScore}/100]\n(Hasil Kuis Tes Formatif 1-5 diselesaikan secara otomatis)\nTerisi: ${Object.keys(answers).length} dari 25 soal.\n\nDetail Pilihan:\n` + JSON.stringify(answers);

    onComplete(reportText);
    localStorage.removeItem(draftKey);
  };

  if (statusRow || gameState === "FINISHED") {
    const finalScore = calculateScore();
    const sc = statusRow
      ? parseInt(
          statusRow.content.match(/SKOR AKHIR: (\d+)/)?.[1] || finalScore,
        )
      : finalScore;

    // Build the stored answers from the payload
    let savedAnswers = answers;
    if (statusRow && Object.keys(answers).length === 0) {
       try {
           const jsonStr = statusRow.content.split('Detail Pilihan:\n')[1];
           if (jsonStr) savedAnswers = JSON.parse(jsonStr);
       } catch(e) {}
    }

    return (
      <div className="space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 to-[#1a2169] opacity-10"></div>
            
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-8 relative shadow-xl shadow-indigo-500/30">
              <span className="material-symbols-outlined text-5xl text-white">
                {sc >= 80 ? "military_tech" : sc >= 60 ? "thumb_up" : "menu_book"}
              </span>
            </div>
            
            <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Kuis Formatif Selesai</h2>
            <p className="text-slate-500 font-medium mb-10">
              Hasil pengerjaan Anda telah tersimpan permanen dan otomatis direkap ke Dasbor Tutor.
            </p>

            <div className="bg-slate-50 rounded-[2rem] p-10 max-w-sm mx-auto border border-slate-100 relative mb-10 shadow-inner">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                Pencapaian Skor Total
              </p>
              <p className={`text-7xl font-black tracking-tighter ${sc >= 80 ? "text-emerald-500" : sc >= 60 ? "text-amber-500" : "text-rose-500"}`}>
                {sc}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <span>Dari 100 Poin</span>
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
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
                        <div key={i} className={`p-6 rounded-3xl border-2 transition-all ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 font-black shadow-sm ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                    <span className="material-symbols-outlined text-lg">{isCorrect ? 'check' : 'close'}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Soal {i + 1} • {q.source}</p>
                                    <p className="font-bold text-slate-800 text-sm mb-4 leading-relaxed whitespace-pre-wrap">{q.text}</p>
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest min-w-[60px]">Jawaban:</span>
                                            <span className={`text-sm font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600 line-through opacity-80'}`}>
                                                {didAnswer ? q.options[ans] : "- Kosong -"}
                                            </span>
                                        </div>
                                        {!isCorrect && (
                                            <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-rose-200/50">
                                                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest min-w-[60px]">Kunci:</span>
                                                <span className="text-sm font-bold text-emerald-700">
                                                    {q.options[q.answer]}
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

  if (gameState === "INTRO") {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-200 shadow-sm flex flex-col items-center text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-gradient-to-br from-[#1a2169] to-indigo-700 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-600/30 transform rotate-3">
          <span className="material-symbols-outlined text-4xl transform -rotate-3">auto_awesome</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">KUIS FORMATIF ACAK</h1>
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
          Sistem telah mengundi 25 soal khusus untuk Anda secara acak dari 5 jenis Tes Formatif. Anda tidak dapat menyontek atau bertukar jawaban dengan teman. 
        </p>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
            <p className="text-3xl font-black text-indigo-600 mb-1">25</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Soal Acak</p>
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

  // PLAYING STATE
  const currentQ = finalQuestions[currentIdx];
  const totalQ = finalQuestions.length;
  const progressPct = ((currentIdx) / totalQ) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner Progress */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm sticky top-4 z-10 flex items-center justify-between gap-6">
         <div className="flex-1">
             <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                 <span>Progres Pengerjaan</span>
                 <span className="text-indigo-600">{currentIdx + 1} / {totalQ}</span>
             </div>
             <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPct}%`}}></div>
             </div>
         </div>
         <div className="hidden md:flex bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex-col items-center justify-center">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Terjawab</span>
             <span className="text-lg font-black text-indigo-600 leading-none">{answeredCount}</span>
         </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-md">
         <div className="mb-8">
            <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-4">
                Soal Ke-{currentIdx + 1}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed whitespace-pre-wrap">
                {currentQ.text}
            </h2>
         </div>

         <div className="space-y-4">
             {currentQ.options.map((opt, oIdx) => {
                 const isSelected = answers[currentIdx] === oIdx;
                 return (
                     <button
                        key={oIdx}
                        onClick={() => handleSelect(currentIdx, oIdx)}
                        className={`w-full flex items-center justify-start text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 ${isSelected ? 'bg-indigo-50 border-indigo-500 shadow-md scale-[1.01]' : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
                     >
                         <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 mr-4 ${isSelected ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-300 text-slate-400'}`}>
                             {String.fromCharCode(65 + oIdx)}
                         </div>
                         <span className={`text-sm md:text-base font-medium ${isSelected ? 'text-indigo-800 font-bold' : 'text-slate-600'}`}>
                             {opt}
                         </span>
                     </button>
                 );
             })}
         </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex gap-4 w-full md:w-auto">
             <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-4 rounded-2xl font-bold hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
             >
                 <span className="material-symbols-outlined text-sm">arrow_back</span>
                 Sebelumnnya
             </button>
             {currentIdx < totalQ - 1 && (
                 <button
                    onClick={() => setCurrentIdx(Math.min(totalQ - 1, currentIdx + 1))}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1a2169] text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-800 transition-all shadow-md"
                 >
                     Selanjutnya
                     <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </button>
             )}
         </div>

         {currentIdx === totalQ - 1 && (
             <button
                 onClick={() => {
                     if(answeredCount < totalQ) {
                         if(!window.confirm(`Anda baru menjawab ${answeredCount} dari ${totalQ} soal. Yakin ingin mengumpulkan?`)) return;
                     }
                     handleSubmit();
                 }}
                 className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-2xl font-black tracking-widest text-sm shadow-xl shadow-green-500/30 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
             >
                 <span className="material-symbols-outlined">send</span>
                 KIRIM & LIHAT HASIL
             </button>
         )}
      </div>

      {/* Pagination Grid for quick jump */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mt-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Navigasi Cepat</p>
          <div className="flex flex-wrap justify-center gap-2">
              {finalQuestions.map((_, i) => {
                  const isAnswered = answers[i] !== undefined;
                  const isCurrent = i === currentIdx;
                  return (
                      <button
                         key={i}
                         onClick={() => setCurrentIdx(i)}
                         className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${isCurrent ? 'ring-4 ring-indigo-200 bg-indigo-600 text-white scale-110' : isAnswered ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                      >
                          {i + 1}
                      </button>
                  );
              })}
          </div>
      </div>
    </div>
  );
}
