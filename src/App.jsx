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

function InteractiveMindMap({
  user,
  classId,
  meetingId,
  onComplete,
  submissions,
}) {
  const [placedItems, setPlacedItems] = React.useState({});
  const [gameState, setGameState] = React.useState("INTRO");
  const [score, setScore] = React.useState(0);
  const [feedback, setFeedback] = React.useState(null);
  const [feedbackType, setFeedbackType] = React.useState("correct");
  const [isLandscape, setIsLandscape] = React.useState(
    window.innerWidth > window.innerHeight,
  );
  const [dragging, setDragging] = React.useState(null);
  const [wrongItem, setWrongItem] = React.useState(null);
  const [allDone, setAllDone] = React.useState(false);
  const [challengeAnswer, setChallengeAnswer] = React.useState(null);

  React.useEffect(() => {
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

  if (!isLandscape) {
    return (
      <div className="fixed inset-0 z-[100] bg-primary text-white flex flex-col items-center justify-center p-10 text-center">
        <span className="material-symbols-outlined text-8xl animate-bounce mb-6">
          screen_rotation
        </span>
        <h2 className="text-2xl font-black mb-3">Putar Layar Anda!</h2>
        <p className="opacity-70 font-medium max-w-xs">
          Gunakan mode <strong>Lanskap (Miring)</strong> agar Mind Map terlihat
          jelas.
        </p>
      </div>
    );
  }

  if (gameState === "INTRO") {
    return (
      <div className="fixed inset-0 z-[70] bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
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
              Halo, Calon Guru Profesional! Tugasmu adalah menyusun Mind Map BK
              yang berantakan menjadi utuh kembali bersama tim.
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
            <button
              onClick={() => setGameState("PLAYING")}
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-20 flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">rocket_launch</span>{" "}
              MULAI MISI!
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "CHALLENGE") {
    return (
      <div className="fixed inset-0 z-[60] bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] p-8 md:p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-red-100 rounded-3xl flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-red-500">
                crisis_alert
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-red-500 tracking-widest">
                TANTANGAN AKHIR
              </p>
              <h2 className="text-2xl font-black text-slate-800">
                Studi Kasus
              </h2>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-6">
            <p className="text-xs font-black text-amber-600 uppercase tracking-widest mb-2">
              Skenario:
            </p>
            <p className="text-base font-semibold text-slate-700 leading-relaxed italic">
              "Seorang siswa ketakutan menceritakan bahwa ia menjadi korban
              bullying karena tidak ingin teman-temannya tahu. Namun, ia butuh
              bantuan segera."
            </p>
          </div>
          <p className="text-sm font-bold text-slate-500 mb-5 uppercase tracking-tight">
            Pilih kombinasi elemen yang PALING TEPAT:
          </p>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {[
              {
                id: "A",
                label: "Layanan Mediasi & Asas Keterbukaan",
                correct: false,
                desc: "Mediasi untuk konflik antar pihak.",
              },
              {
                id: "B",
                label: "Konseling Individual & Asas Kerahasiaan",
                correct: true,
                desc: "Tepat! Menjaga privasi siswa.",
              },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setChallengeAnswer(opt)}
                disabled={challengeAnswer !== null}
                className={`p-5 rounded-2xl border-2 text-left transition-all font-semibold text-sm ${challengeAnswer === null ? "border-slate-200 hover:border-primary hover:bg-primary hover:bg-opacity-5" : opt.correct ? "border-emerald-500 bg-emerald-50 text-emerald-800" : challengeAnswer?.id === opt.id ? "border-red-400 bg-red-50 text-red-700" : "border-slate-200 opacity-50"}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-black text-xs ${challengeAnswer === null ? "bg-slate-100 text-slate-600" : opt.correct ? "bg-emerald-500 text-white" : challengeAnswer?.id === opt.id ? "bg-red-500 text-white" : "bg-slate-100 text-slate-400"}`}
                  >
                    {opt.id}
                  </span>
                  {opt.label}
                </div>
              </button>
            ))}
          </div>
          {challengeAnswer !== null && (
            <button
              onClick={() =>
                onComplete(
                  score + (challengeAnswer.correct ? 40 : 10),
                  challengeAnswer.label,
                )
              }
              className="w-full bg-primary text-white py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-20 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">send</span> KIRIM
              HASIL LKPD
            </button>
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
        <div
          className={`absolute top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300 px-8 py-3 rounded-full font-black text-sm shadow-2xl flex items-center gap-3 ${feedbackType === "correct" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}
        >
          <span className="material-symbols-outlined">
            {feedbackType === "correct" ? "verified" : "cancel"}
          </span>
          {feedback}
        </div>
      )}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGameState("INTRO")}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">info</span>
          </button>
          <div>
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
              LKPD Mind Map BK
            </p>
            <p className="text-sm font-black text-slate-700">
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
        style={{ minHeight: "380px" }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
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
            { left: "calc(50% - 230px)", top: "calc(50% - 80px)" },
            { left: "calc(50% + 90px)", top: "calc(50% - 80px)" },
            { left: "calc(50% - 80px)", top: "calc(50% - 230px)" },
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
              className={`absolute w-40 h-40 rounded-full border-[3px] border-dashed flex flex-col items-center justify-center transition-all duration-300 ${zone.bgColor} ${zone.color.replace("bg-", "border-")} bg-opacity-40`}
              style={{ ...pos, zIndex: 5 }}
            >
              <div
                className={`px-3 py-1 rounded-xl ${zone.color} text-white text-[8px] font-black uppercase tracking-wider shadow-md mb-2`}
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
                className={`px-5 py-2.5 rounded-full bg-white text-primary font-black text-xs cursor-grab active:cursor-grabbing hover:bg-yellow-400 transition-all shadow-lg flex items-center gap-2 select-none ${wrongItem === item.id ? "animate-[shake_0.4s_ease-in-out] bg-red-100" : ""}`}
                style={{ touchAction: "none" }}
              >
                <span className="material-symbols-outlined text-sm">
                  drag_indicator
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

    if (
      sectionName === "Informasi Modul" &&
      COURSE_DATA[courseCode]?.[sectionName]
    ) {
      return (
        <div className="space-y-10">
          {COURSE_DATA[courseCode][sectionName]}

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

                const submissionId = myGroup
                  ? `GROUP_LKPD_${id}_${meetingId}_G${myGroup.group_num}`
                  : user.email;

                const payload = {
                  student_email: submissionId,
                  class_id: id,
                  meeting_num: meetingId,
                  section_name: sectionName,
                  content: `SKOR GAME: ${totalScore} per 100\nJAWABAN KASUS SISWA A: ${caseAnswer}`,
                };

                await supabase.from("submissions").insert([payload]);
                setSuccess(true);
                if (myGroup)
                  alert(
                    `Keren! Hasil kelompok ${myGroup.group_num} berhasil disimpan.`,
                  );
              } catch (err) {
                console.log(err);
              } finally {
                setLoading(false);
              }
            }}
          />
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
