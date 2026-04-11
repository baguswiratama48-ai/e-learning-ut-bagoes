import { useState, useEffect, Fragment } from 'react'
import { Routes, Route, Link, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

// Mock Data
const CLASSES = [
  { id: '1', title: 'SPGK4307 | Bimbingan Konseling di SD Kelas 8B' },
  { id: '2', title: 'SPGK4307 | Bimbingan Konseling di SD Kelas 8C' },
  { id: '3', title: 'SPDA4401 | Penanganan Anak Berkebutuhan Khusus Kelas 6A' },
  { id: '4', title: 'SPGK4410 | Strategi Pembelajaran Kontemporer di SD Kelas 5A' }
];

const STUDENTS = [
  { nim: '855734487', name: 'IKE DIA PRENTIKA', email: '855734487@ecampus.ut.ac.id', classId: '2' },
  { nim: '855883951', name: 'INTAN TRI KUSUMAWATI', email: '855883951@ecampus.ut.ac.id', classId: '2' },
  { nim: '856602599', name: 'KHOIRUN NISA', email: '856602599@ecampus.ut.ac.id', classId: '2' },
  { nim: '856607265', name: 'INDRA RAHMAN', email: '856607265@ecampus.ut.ac.id', classId: '2' },
  { nim: '856608339', name: 'KURNIA RAHMAWATI', email: '856608339@ecampus.ut.ac.id', classId: '2' },
  { nim: '856609197', name: 'INDAH SETIANINGSIH', email: '856609197@ecampus.ut.ac.id', classId: '2' },
  { nim: '856789129', name: 'FENTI NUR SAFITRI', email: '856789129@ecampus.ut.ac.id', classId: '2' },
  { nim: '856789182', name: 'FAHRIN RISANDINI', email: '856789182@ecampus.ut.ac.id', classId: '2' },
  { nim: '856789208', name: 'FINKY ARIYANTI', email: '856789208@ecampus.ut.ac.id', classId: '2' },
  { nim: '856789981', name: 'KHANIF FARIS FADHILA', email: '856789981@ecampus.ut.ac.id', classId: '2' },
  { nim: '856790259', name: 'FINA ANGGRAINI', email: '856790259@ecampus.ut.ac.id', classId: '2' },
  { nim: '856790306', name: 'IKE FAJAR AISAH', email: '856790306@ecampus.ut.ac.id', classId: '2' },
  { nim: '856790345', name: 'EVIRA LUKIANA', email: '856790345@ecampus.ut.ac.id', classId: '2' },
  { nim: '856790424', name: 'INDAH MUSTIKA SARI', email: '856790424@ecampus.ut.ac.id', classId: '2' },
  { nim: '856790757', name: 'FITRY INDAH SARI', email: '856790757@ecampus.ut.ac.id', classId: '2' },
  { nim: '856790843', name: 'JENNY VIOLLA', email: '856790843@ecampus.ut.ac.id', classId: '2' },
  { nim: '856790882', name: 'FERI KIRANA HANDAYANI', email: '856790882@ecampus.ut.ac.id', classId: '2' },
  { nim: '856790961', name: 'FRANCISKUS TANUERIT', email: '856790961@ecampus.ut.ac.id', classId: '2' },
  { nim: '856791806', name: 'DIMAS PRATAMA', email: '856791806@ecampus.ut.ac.id', classId: '2' },
  { nim: '856793301', name: 'INNES KUSUMAWATI', email: '856793301@ecampus.ut.ac.id', classId: '2' },
  { nim: '856795161', name: 'IRMA SURYANI', email: '856795161@ecampus.ut.ac.id', classId: '2' },
  { nim: '856795219', name: 'HAIDILA RAHMAH', email: '856795219@ecampus.ut.ac.id', classId: '2' },
  { nim: '856796432', name: 'ICA JUNITA', email: '856796432@ecampus.ut.ac.id', classId: '2' },
  { nim: '856796765', name: 'INTAN WIDIAWATI', email: '856796765@ecampus.ut.ac.id', classId: '2' },
  { nim: '856797591', name: 'ICHO FERDINAN', email: '856797591@ecampus.ut.ac.id', classId: '2' },
  { nim: '856799556', name: 'EVA RIYANTI', email: '856799556@ecampus.ut.ac.id', classId: '2' },
  { nim: '860098532', name: 'SARI ROHANA INDAH', email: '860098532@ecampus.ut.ac.id', classId: '2' },
  { nim: '860101687', name: 'YULIANTI RISTIANA', email: '860101687@ecampus.ut.ac.id', classId: '2' },
  { nim: '855734527', name: 'DELA SINTAWATI', email: '855734527@ecampus.ut.ac.id', classId: '1' },
  { nim: '855734534', name: 'ERIN ARDANATA', email: '855734534@ecampus.ut.ac.id', classId: '1' },
  { nim: '855883983', name: 'DISKA FINDANI', email: '855883983@ecampus.ut.ac.id', classId: '1' },
  { nim: '856603085', name: 'DERIANA', email: '856603085@ecampus.ut.ac.id', classId: '1' },
  { nim: '856603157', name: 'DERIANI', email: '856603157@ecampus.ut.ac.id', classId: '1' },
  { nim: '856607756', name: 'ELVA YULIANA', email: '856607756@ecampus.ut.ac.id', classId: '1' },
  { nim: '856610217', name: 'ENDANG ANDARA PUTRI MULIA', email: '856610217@ecampus.ut.ac.id', classId: '1' },
  { nim: '856789136', name: 'DENI IRAWAN', email: '856789136@ecampus.ut.ac.id', classId: '1' },
  { nim: '856789143', name: 'DENI SAPUTRA', email: '856789143@ecampus.ut.ac.id', classId: '1' },
  { nim: '856789222', name: 'DWITASARI', email: '856789222@ecampus.ut.ac.id', classId: '1' },
  { nim: '856789261', name: 'DEVI YULIA PRATIWI', email: '856789261@ecampus.ut.ac.id', classId: '1' },
  { nim: '856789849', name: 'DINA ANISA', email: '856789849@ecampus.ut.ac.id', classId: '1' },
  { nim: '856789999', name: 'DIAH PUTRI AFIFAH', email: '856789999@ecampus.ut.ac.id', classId: '1' },
  { nim: '856790187', name: 'DEWI ERMAWATI', email: '856790187@ecampus.ut.ac.id', classId: '1' },
  { nim: '856790241', name: 'DITA ANGGRAENI', email: '856790241@ecampus.ut.ac.id', classId: '1' },
  { nim: '856790488', name: 'DHEA ARTIKA NOVENTIANA', email: '856790488@ecampus.ut.ac.id', classId: '1' },
  { nim: '856790764', name: 'ELENA FAJAR DWIANA', email: '856790764@ecampus.ut.ac.id', classId: '1' },
  { nim: '856792585', name: 'EKA MAYA PUSPITA', email: '856792585@ecampus.ut.ac.id', classId: '1' },
  { nim: '856793397', name: 'DEVA SYAHRONI', email: '856793397@ecampus.ut.ac.id', classId: '1' },
  { nim: '856796679', name: 'DESI NATALIA', email: '856796679@ecampus.ut.ac.id', classId: '1' },
  { nim: '856796837', name: 'DESNA FITRIANA', email: '856796837@ecampus.ut.ac.id', classId: '1' },
  { nim: '856797971', name: 'DWI MARIA', email: '856797971@ecampus.ut.ac.id', classId: '1' },
  { nim: '878235739', name: 'ANGGI OCTAVIANA', email: '878235739@ecampus.ut.ac.id', classId: '1' },
  // === AKUN UJICOBA (DUMMY) - bisa dipakai masuk ke semua kelas ===
  { nim: '000000000', name: 'MAHASISWA DEMO', email: 'demo@ecampus.ut.ac.id', classId: '1' },
  { nim: '000000000', name: 'MAHASISWA DEMO', email: 'demo@ecampus.ut.ac.id', classId: '2' },
  { nim: '000000000', name: 'MAHASISWA DEMO', email: 'demo@ecampus.ut.ac.id', classId: '3' },
  { nim: '000000000', name: 'MAHASISWA DEMO', email: 'demo@ecampus.ut.ac.id', classId: '4' }
];

const MENUS = [
  "Informasi Modul", "Pertanyaan Pemantik",
  "Materi Pembelajaran", "Video Pembelajaran",
  "Pembagian Kelompok", "LKPD (Lembar Kerja Peserta Didik)", 
  "Kuis dan Latihan", "Refleksi", "Rangkuman"
];

const PEMANTIK_GROUPS = [
  [
    "Pernahkah Anda melihat siswa SD mengalami kesulitan belajar atau masalah perilaku? Menurut Anda, siapa yang seharusnya membantu mereka dan bagaimana caranya?",
    "Mengapa siswa sekolah dasar tidak cukup hanya diajar materi pelajaran saja?",
    "Apa yang mungkin terjadi jika kebutuhan emosional dan sosial siswa diabaikan di sekolah?",
    "Menurut Anda, apakah semua siswa membutuhkan bantuan yang sama? Mengapa demikian?",
    "Bagaimana peran guru dalam membantu perkembangan siswa selain mengajar di kelas?"
  ],
  [
    "Jika Anda membantu seorang siswa yang memiliki masalah, hal apa yang harus Anda perhatikan agar bantuan tersebut tidak merugikan siswa?",
    "Apakah semua masalah siswa boleh diselesaikan dengan cara yang sama? Mengapa?",
    "Bagaimana cara memperlakukan setiap siswa agar mereka merasa dihargai dan dipahami?",
    "Mengapa penting menjaga kerahasiaan masalah siswa? Apa dampaknya jika tidak dijaga?",
    "Dalam membantu siswa, apakah kita boleh memaksakan kehendak kita? Mengapa?"
  ],
  [
    "Apa yang harus dijaga agar siswa merasa aman dan percaya saat menceritakan masalahnya?",
    "Mengapa hubungan antara guru dan siswa perlu dilandasi rasa percaya?",
    "Bagaimana sikap seorang guru agar siswa mau terbuka tentang masalahnya?",
    "Menurut Anda, apa yang membuat bantuan kepada siswa bisa berjalan efektif?",
    "Jika seorang siswa tidak mau terbuka, apa yang sebaiknya dilakukan oleh guru?"
  ]
];

const FEEDBACK_MESSAGES = {
  1: "Jawaban masih sangat kurang. Mohon pelajari kembali materi modul dengan teliti ya. Tetap semangat!",
  2: "Masih banyak yang perlu diperbaiki. Coba baca ulang modulnya dengan lebih teliti ya.",
  3: "Sudah cukup baik, namun jawaban bisa lebih dielaborasi lagi. Jangan ragu untuk memperluas pemahamanmu.",
  4: "Bagus sekali! Pemahamanmu sudah sangat baik. Pertahankan prestasimu.",
  5: "Luar biasa! Jawabanmu sangat tepat, struktural, dan inspiratif. Teruskan semangat belajarmu!"
};

const getPemantikForStudent = (nim) => {
  const n = parseInt(nim.replace(new RegExp('\\D', 'g'), '')) || 0;
  return PEMANTIK_GROUPS.map((group, gi) => group[(n + gi) % group.length]);
};

// Data untuk LKPD Interaktif Mind Map
const MIND_MAP_DATA = {
  zones: [
    { id: 'etimologi', label: 'Etimologi (Inggris)', color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    { id: 'asas', label: 'Asas-Asas BK', color: 'bg-emerald-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { id: 'layanan', label: 'Jenis Layanan', color: 'bg-yellow-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' }
  ],
  items: [
    { id: 'direct', label: 'To Direct', category: 'etimologi', info: 'Tepat! BK berfungsi mengarahkan siswa ke jalan yang benar.' },
    { id: 'pilot', label: 'To Pilot', category: 'etimologi', info: 'Bagus! BK memandu siswa agar tetap pada jalurnya.' },
    { id: 'rahasia', label: 'Kerahasiaan', category: 'asas', info: 'Benar! Ini adalah kode etik utama Konselor.' },
    { id: 'mandiri', label: 'Kemandirian', category: 'asas', info: 'Tepat! Tujuan BK adalah memandirikan siswa.' },
    { id: 'konseling', label: 'Konseling Individual', category: 'layanan', info: 'Betul! Layanan privat satu-lawan-satu.' },
    { id: 'mediasi', label: 'Mediasi', category: 'layanan', info: 'Keren! Membantu menyelesaikan konflik antar siswa.' }
  ]
};

function InteractiveMindMap({ user, classId, meetingId, onComplete, submissions }) {
  const [placedItems, setPlacedItems] = useState({}); // { itemId: zoneId }
  const [gameState, setGameState] = useState('PLAYING'); // PLAYING, CASE_STUDY, FINISHED
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isLandscape, setIsLandscape] = useState(true);
  const [dragging, setDragging] = useState(null);
  const [shake, setShake] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true);

  // Fungsi Inisial Nama
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  useEffect(() => {
    const checkOrientation = () => setIsLandscape(window.innerWidth > window.innerHeight);
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  // Temukan Info Kelompok
  const groupRow = submissions.find(s => s.student_email === 'SYSTEM_GROUP' && s.section_name === 'GENERATED_GROUPS');
  const groups = groupRow ? JSON.parse(groupRow.content) : null;
  const myGroup = groups?.find(g => g.members.some(m => m.email === user.email));

  const handleDrop = (itemId, zoneId) => {
    const item = MIND_MAP_DATA.items.find(i => i.id === itemId);
    if (item.category === zoneId) {
      setPlacedItems(prev => ({ ...prev, [itemId]: zoneId }));
      setScore(prev => prev + 10);
      setFeedback(item.info);
      setTimeout(() => setFeedback(null), 3000);
      
      // Cek apakah semua sudah selesai (6 kepingan)
      if (Object.keys(placedItems).length + 1 === MIND_MAP_DATA.items.length) {
         setTimeout(() => setGameState('CASE_STUDY'), 2000);
      }
    } else {
      setShake(itemId);
      setTimeout(() => setShake(null), 500);
    }
  };

  if (!isLandscape) {
    return (
      <div className="fixed inset-0 z-[100] bg-primary text-white flex flex-col items-center justify-center p-10 text-center">
        <span className="material-symbols-outlined text-7xl animate-bounce mb-6">screen_rotation</span>
        <h2 className="text-2xl font-black mb-2">Putar Layar Anda</h2>
        <p className="opacity-70 font-medium">Gunakan mode Landscape (Miring) untuk pengalaman Mind Map terbaik.</p>
      </div>
    );
  }

  if (gameState === 'CASE_STUDY') {
    return (
      <div className="fixed inset-0 z-[60] bg-opacity-60 bg-black backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-3xl flex items-center justify-center text-yellow-600">
                 <span className="material-symbols-outlined text-4xl">emoji_objects</span>
              </div>
              <h2 className="text-3xl font-black text-slate-800">Final Challenge!</h2>
           </div>
           
           <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] mb-10">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Kasus Pendek:</p>
              <p className="text-xl font-medium text-slate-700 leading-relaxed italic">"Siswa A sering termenung di pojok kelas karena masalah keluarga yang membuatnya tidak fokus belajar."</p>
           </div>
           
           <p className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-tight">Pilih 1 Jenis Layanan yang paling pas:</p>
           <div className="grid grid-cols-2 gap-4 text-center">
              <button onClick={() => onComplete(score + 40, 'Konseling Individual')} className="bg-primary text-white py-5 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all text-sm uppercase">Konseling Individual</button>
              <button onClick={() => alert('Kurang tepat, Orientasi biasanya untuk perkenalan awal.')} className="bg-slate-100 text-slate-400 py-5 rounded-2xl font-black hover:bg-slate-200 transition-all text-sm uppercase">Orientasi Masalah</button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[600px] w-full bg-white rounded-[3rem] overflow-hidden border-4 border-slate-100 shadow-2xl flex flex-col">

       {/* Tutorial Overlay */}
       {showTutorial && (
         <div className="fixed inset-0 z-[70] bg-opacity-90 bg-slate-900 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white rounded-[2.5rem] p-10 max-w-xl w-full shadow-2xl animate-in fade-in zoom-in duration-300 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary bg-opacity-5 rounded-full -mr-16 -mt-16"></div>
               <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
                     <span className="material-symbols-outlined text-5xl">auto_stories</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mb-2">Misi Kelompok!</h2>
                  <p className="text-slate-500 font-medium mb-8">Halo Mahasiswa! Mari susun Peta Pikiran BK (Bimbingan Konseling) bersama rekan tim Anda.</p>
                  
                  <div className="space-y-4 text-left mb-10">
                     <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl">
                        <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex-shrink-0 flex items-center justify-center font-black text-xs">1</span>
                        <p className="text-sm font-bold text-slate-600">Geser (Drag) gelembung teks di bawah ke Cabang (Zona) yang benar sesuai materi (Skor 60).</p>
                     </div>
                     <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl">
                        <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex-shrink-0 flex items-center justify-center font-black text-xs">2</span>
                        <p className="text-sm font-bold text-slate-600">Setelah lengkap, pecahkan Studi Kasus yang muncul untuk raih skor tambahan (Skor 40).</p>
                     </div>
                     <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl">
                        <span className="w-8 h-8 rounded-full bg-yellow-500 text-white flex-shrink-0 flex items-center justify-center font-black text-xs">3</span>
                        <p className="text-sm font-bold text-slate-600">Pastikan skor mencapai 100 sebelum kelompok menekan tombol Kirim.</p>
                     </div>
                  </div>

                  <button onClick={() => setShowTutorial(false)} className="w-full bg-primary text-white py-5 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-20">SAYA MENGERTI, MULAI!</button>
               </div>
            </div>
         </div>
       )}

       {/* UI Header */}
       <div className="p-6 bg-slate-50 bg-opacity-80 backdrop-blur-sm border-b border-slate-100 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase text-primary text-opacity-40 tracking-widest leading-none mb-1">Collaborative LKPD</p>
                <div className="flex items-center gap-3">
                   <h4 className="font-headline font-black text-slate-800">
                      {myGroup ? `Kelompok ${myGroup.group_num}` : 'Individu'}
                   </h4>
                   {myGroup && (
                     <div className="flex -space-x-1.5">
                        {myGroup.members.map((m, i) => (
                           <div key={i} className="w-7 h-7 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-[9px] font-black text-primary leading-none ring-1 ring-slate-200 transition-transform hover:-translate-y-1 cursor-help group-avatar relative" title={m.name}>
                              {getInitials(m.name)}
                              {/* Tooltip Name */}
                              <div className="absolute -bottom-8 left-1 bg-opacity-2 -translate-x-1 bg-opacity-2 bg-slate-800 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover-avatar:opacity-100 whitespace-nowrap z-[100] font-medium pointer-events-none transition-opacity">
                                 {m.name}
                              </div>
                           </div>
                        ))}
                     </div>
                   )}
                </div>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setShowTutorial(true)} className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm">
                <span className="material-symbols-outlined text-xl">info</span>
             </button>
             <div className="bg-white shadow-sm border border-slate-100 px-6 py-2 rounded-2xl flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-500 text-xl font-bold fill-1">stars</span>
                <span className="font-black text-slate-800 text-xl">{score}</span>
             </div>
          </div>
       </div>

       {/* Feedback Pop-up Overlay */}
       {feedback && (
         <div className="absolute top-24 left-1 bg-opacity-2 -translate-x-1 bg-opacity-2 z-50 animate-in slide-in-from-top duration-300">
            <div className="bg-emerald-500 text-white px-8 py-3 rounded-full font-black text-sm shadow-xl flex items-center gap-3">
               <span className="material-symbols-outlined">verified</span> {feedback}
            </div>
         </div>
       )}

       {/* Game Board */}
       <div className="flex-1 p-10 relative flex items-center justify-center min-h-[450px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
             {MIND_MAP_DATA.zones.map((zone, idx) => {
                const angles = [190, 350, 270]; // Adjusted angles: Left, Right, Up (actually down but y is inverted)
                const dist = isLandscape ? 260 : 200;
                const rad = (angles[idx] * Math.PI) / 180;
                const tx = 50 + (Math.cos(rad) * dist) / 10; // Simple percentage based logic for SVG center
                const ty = 50 + (Math.sin(rad) * dist) / 10;
                return (
                   <line key={idx} x1="50%" y1="50%" x2={`${tx}%`} y2={`${ty}%`} stroke="currentColor" strokeWidth="4" strokeDasharray="8,8" className={zone.textColor} />
                );
             })}
          </svg>
          
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Center Node */}
             <div className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full flex items-center justify-center text-white font-black text-center p-4 shadow-2xl z-10 ring-8 ring-blue-50 ring-opacity-50">
                <span className="text-xs md:text-sm">MIND MAP BK</span>
             </div>

             {/* Zones */}
             {MIND_MAP_DATA.zones.map((zone, idx) => {
                const angles = [190, 350, 270]; 
                const dist = isLandscape ? 260 : 200;
                const rad = (angles[idx] * Math.PI) / 180;
                const x = Math.cos(rad) * dist;
                const y = Math.sin(rad) * dist;
                
                return (
                  <div 
                    key={zone.id}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => dragging && handleDrop(dragging, zone.id)}
                    className={`absolute w-44 h-44 md:w-56 md:h-56 rounded-full border-[3px] border-dashed animate-[pulse_5s_infinite] flex flex-col items-center justify-start pt-6 transition-all ${zone.bgColor} ${zone.color.replace('bg-', 'border-') + " bg-opacity-40"}`}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                     <div className={`p-2.5 px-5 rounded-2xl ${zone.color} text-white text-[9px] font-black uppercase tracking-widest mb-3 shadow-lg -mt-2`}>
                        {zone.label}
                     </div>
                     <div className="flex flex-wrap justify-center gap-1.5 px-3 min-h-[40px] w-full items-center">
                        {Object.entries(placedItems).filter(([_, zid]) => zid === zone.id).map(([iid]) => {
                           const item = MIND_MAP_DATA.items.find(i => i.id === iid);
                           return (
                             <div key={iid} className={`px-3 py-1.5 rounded-xl text-white font-black text-[9px] shadow-md animate-in zoom-in duration-300 ${zone.color} border border-white border-opacity-20`}>
                                {item.label}
                             </div>
                           );
                        })}
                     </div>
                  </div>
                );
             })}
          </div>
       </div>

       {/* Dock Tray (Mobile Friendly) */}
       <div className="bg-slate-900 p-8 flex flex-col items-center gap-4 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <p className="text-white text-opacity-40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Geser Bubble ke Cabang yang Tepat</p>
          <div className="flex flex-wrap justify-center gap-4">
             {MIND_MAP_DATA.items.filter(i => !placedItems[i.id]).map(item => (
                <div 
                  key={item.id}
                  draggable
                  onDragStart={() => setDragging(item.id)}
                  onDragEnd={() => setDragging(null)}
                  onClick={() => {
                     // Click support for mobile as alternative to drag
                     const zone = prompt(`Pilih Kategori untuk ${item.label}:\n1. Etimologi\n2. Asas\n3. Layanan`);
                     if (zone === '1') handleDrop(item.id, 'etimologi');
                     else if (zone === '2') handleDrop(item.id, 'asas');
                     else if (zone === '3') handleDrop(item.id, 'layanan');
                  }}
                  className={`px-8 py-3 rounded-full bg-white text-primary font-black text-sm cursor-grab active:cursor-grabbing hover:bg-yellow-400 transition-all shadow-xl shadow-black shadow-opacity-20 flex items-center gap-3 ${shake === item.id ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                >
                   <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
                   {item.label}
                </div>
             ))}
          </div>
          {MIND_MAP_DATA.items.filter(i => !placedItems[i.id]).length === 0 && (
            <p className="text-emerald-400 font-bold text-sm animate-pulse flex items-center gap-2">
               <span className="material-symbols-outlined">check_circle</span> MIND MAP SELESAI! MENUNGGU CHALLENGE...
            </p>
          )}
       </div>

       <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
       `}</style>
    </div>
  );
}

const COURSE_DATA = {
  'SPGK4307': {
    'Informasi Modul': (
      <div className="space-y-6 text-justify leading-relaxed text-slate-700">
        <section>
          <h3 className="font-bold text-lg text-primary mb-3">Tinjauan Mata Kuliah</h3>
          <p>
            Mata kuliah ini dirancang untuk memberikan pemahaman mendalam kepada mahasiswa mengenai konsep dasar, pendekatan, dan implementasi Bimbingan Konseling (BK) di Sekolah Dasar (SD). Modul 1 membahas konsep dasar BK, termasuk tujuan, fungsi, dan prinsip-prinsip yang relevan dengan kebutuhan peserta didik di tingkat SD. Modul 2 fokus pada karakteristik peserta didik, termasuk tugas perkembangan yang harus dicapai, sehingga mahasiswa dapat memahami kebutuhan dan tantangan yang dihadapi oleh anak usia sekolah dasar dalam proses perkembangan mereka.
          </p>
          <p className="mt-4">
            Dalam praktiknya, mata kuliah ini juga memberikan keterampilan teknis melalui Modul 3 yang membahas teknik asesmen dan pengumpulan data kebutuhan peserta didik. Modul ini membantu mahasiswa memahami cara menganalisis kebutuhan siswa sebagai dasar untuk merancang layanan BK yang efektif. Selanjutnya, Modul 4 dan 5 memberikan panduan tentang perencanaan dan pelaksanaan layanan BK di SD. Mahasiswa akan belajar menyusun program BK yang sesuai dengan karakteristik peserta didik serta bagaimana mengimplementasikan program tersebut secara optimal dalam lingkungan sekolah.
          </p>
          <p className="mt-4 text-justify">
            Sebagai penutup, Modul 6 mengajarkan bagaimana melakukan penilaian, evaluasi, pelaporan, dan tindak lanjut terhadap layanan BK yang telah diberikan. Hal ini bertujuan untuk memastikan efektivitas layanan dan memberikan perbaikan berkelanjutan sesuai dengan hasil evaluasi. Mata kuliah ini bertujuan membekali mahasiswa dengan pengetahuan, keterampilan, dan sikap profesional untuk menjadi konselor yang efektif dalam membantu peserta didik SD mencapai perkembangan optimal baik secara akademik maupun personal.
          </p>
        </section>

        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-lg text-primary mb-3">Tujuan Instruksional Umum</h3>
          <p>
            Setelah mengikuti mata kuliah ini, mahasiswa S1 PGSD diharapkan mampu menganalisis kebutuhan dan mengaplikasikan prinsip-prinsip serta strategi layanan BK bagi peserta didik SD.
          </p>
        </section>

        <section>
          <h3 className="font-bold text-lg text-primary mb-3">Tujuan Instruksional Khusus</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Mahasiswa mampu menguraikan konsep dasar (pengertian, hakikat, tujuan, prinsip, asas, bidang, dan komponen program) bimbingan dan konseling di SD.</li>
            <li>Mahasiswa mampu menguraikan karakteristik peserta didik dan mampu menganalisis serta mengevaluasi tugas perkembangan peserta didik di SD.</li>
            <li>Mahasiswa mampu menguraikan konsep teknik asesmen dan mampu memanfaatkan data hasil asesmen kebutuhan peserta didik di SD.</li>
            <li>Mahasiswa mampu merencanakan program bimbingan dan konseling di SD.</li>
            <li>Mahasiswa mampu melaksanakan program bimbingan dan konseling di SD.</li>
            <li>Mahasiswa mampu menilai, mengevaluasi, membuat pelaporan dan tindak lanjut layanan BK di SD.</li>
          </ul>
        </section>

        <section className="border-l-4 border-yellow-400 pl-4 py-2">
          <h3 className="font-bold text-lg text-primary mb-3">Struktur Modul</h3>
          <p className="mb-2 italic text-sm">Untuk menguasai seluruh kompetensi tersebut, bahan ajar mata kuliah ini disusun dalam enam modul sebagai berikut:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-semibold">
            <div className="bg-white p-3 rounded-lg border">Modul 1 : Konsep Dasar BK di SD</div>
            <div className="bg-white p-3 rounded-lg border">Modul 2 : Karakteristik Peserta Didik</div>
            <div className="bg-white p-3 rounded-lg border">Modul 3 : Teknik Asesmen</div>
            <div className="bg-white p-3 rounded-lg border">Modul 4 : Perencanaan BK</div>
            <div className="bg-white p-3 rounded-lg border">Modul 5 : Pelaksanaan BK</div>
            <div className="bg-white p-3 rounded-lg border">Modul 6 : Penilaian & Evaluasi</div>
          </div>
        </section>

        <section>
          <h3 className="font-bold text-lg text-primary mb-3">Petunjuk Mempelajari Modul</h3>
          <div className="space-y-3">
            {[
              "Kajilah isi modul secara keseluruhan diawali dengan membaca pendahuluan.",
              "Bacalah dengan cermat dan teliti setiap uraian dan contoh dalam masing-masing kegiatan belajar.",
              "Jawablah dengan tepat pertanyaan dan kerjakan soal latihan secara maksimal dengan memperhatikan rambu-rambu atau perintah soal secara utuh.",
              "Kerjakan sendiri tes formatif dengan tuntas, kemudian lihatlah kunci jawaban untuk mengetahui tingkat pencapaian pemahaman Anda.",
              "Pelajari kembali bagian modul yang belum Anda kuasai.",
              "Carilah buku acuan yang tercantum dalam daftar pustaka untuk memperdalam kajian dalam modul ini."
            ].map((text, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">{idx + 1}</span>
                <p className="text-sm">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 bg-[#0c3352] rounded-3xl px-4">
          <h3 className="font-bold text-base text-white mb-1 text-center">Peta Kompetensi</h3>
          <p className="text-yellow-400 text-xs font-bold text-center mb-8">Bimbingan dan Konseling di SD / SPGK4307 / 2 SKS</p>

          <div className="flex flex-col items-center w-full gap-0">
            <div className="w-full bg-[#1a4a6e] text-white p-4 rounded-2xl text-xs font-bold text-center shadow-md border-2 border-yellow-400">
              Setelah mengikuti mata kuliah ini, mahasiswa S1 PGSD diharapkan mampu menganalisis kebutuhan dan mengaplikasikan prinsip-prinsip serta strategi layanan BK bagi peserta didik SD.
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-5 bg-white bg-opacity-40"></div>
              <span className="text-white text-opacity-60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-3 rounded-xl text-xs text-center shadow">
              Mahasiswa mampu menilai, mengevaluasi, membuat pelaporan dan tindak lanjut layanan BK di SD.
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-5 bg-white bg-opacity-40"></div>
              <span className="text-white text-opacity-60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-3 rounded-xl text-xs text-center shadow">
              Mahasiswa mampu melaksanakan program bimbingan dan konseling (BK) di SD.
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-5 bg-white bg-opacity-40"></div>
              <span className="text-white text-opacity-60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-3 rounded-xl text-xs text-center shadow">
              Mahasiswa mampu merencanakan program bimbingan dan konseling di SD.
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-5 bg-white bg-opacity-40"></div>
              <span className="text-white text-opacity-60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-3 rounded-xl text-xs text-center shadow">
              Mahasiswa mampu menguraikan konsep teknik asesmen dan mampu memanfaatkan data hasil asesmen kebutuhan peserta didik di SD.
            </div>
            <div className="w-full flex flex-col items-center py-1">
              <div className="w-px h-4 bg-white bg-opacity-40"></div>
              <div className="w-3 bg-opacity-4 h-px bg-white bg-opacity-40"></div>
            </div>
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="bg-[#1a4a6e] text-white p-3 rounded-xl text-[10px] text-center shadow flex items-center justify-center">
                Mahasiswa mampu menguraikan karakteristik peserta didik SD.
              </div>
              <div className="bg-[#1a4a6e] text-white p-3 rounded-xl text-[10px] text-center shadow flex items-center justify-center">
                Mahasiswa mampu menganalisis dan mengevaluasi tugas perkembangan peserta didik SD.
              </div>
            </div>
            <div className="w-full flex flex-col items-center py-1">
              <div className="w-3 bg-opacity-4 h-px bg-white bg-opacity-40"></div>
              <div className="w-px h-4 bg-white bg-opacity-40"></div>
              <span className="text-white text-opacity-60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-4 rounded-2xl text-xs text-center shadow-lg ring-2 ring-yellow-400 ring-opacity-40">
              Mahasiswa mampu menguraikan konsep dasar (pengertian, hakikat, tujuan, prinsip, asas, bidang, dan komponen program layanan Bimbingan dan Konseling (BK) di SD).
            </div>
          </div>
          <p className="text-[9px] text-center text-white text-opacity-40 mt-6 italic">Sumber: Bahan Ajar SPGK4307 Universitas Terbuka</p>
        </section>

        <footer className="pt-6 border-t font-medium text-center italic">
          <p>"Pada akhirnya, keberhasilan Anda dalam belajar akan ditentukan oleh usaha Anda sendiri. Aturlah waktu sebaik-baiknya, berdiskusilah dengan teman sejawat dan tutor."</p>
          <p className="text-primary mt-2 not-italic font-bold">Selamat belajar.</p>
        </footer>
      </div>
    )
  }
};

function Home({ navigate, onLoginTutor }) {
  return (
    <div className="space-y-6">
      <section className="mb-8 text-center pt-8">
        <img src="/ut-logo.png" alt="Universitas Terbuka" className="w-24 h-auto mx-auto mb-4 drop-shadow-md object-contain" />
        <h2 className="font-headline font-extrabold text-3xl md:text-5xl text-primary tracking-tight mb-4">
          E-Learning <span className="text-yellow-400">Bagoes</span>
        </h2>
        <div className="font-body text-md text-on-surface-variant max-w-2xl mx-auto px-4 mb-8 space-y-2">
          <p className="font-bold text-slate-800 text-lg">Selamat datang di E-Learning Bagoes.</p>
          <p className="leading-relaxed">Aplikasi pembelajaran mandiri yang lebih mudah, terarah, dan lebih <span className="italic font-bold text-primary">“Bagoes”</span>.</p>
          <p className="text-primary font-extrabold italic text-sm mt-3">“Dengan E-Learning Bagoes Kuliah Jadi Lebih Bagoes”</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
           <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-2xl font-bold text-primary">4</p>
              <p className="text-[10px] uppercase font-bold text-slate-400">Kelas Aktif</p>
           </div>
           <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-2xl font-bold text-yellow-500">8</p>
              <p className="text-[10px] uppercase font-bold text-slate-400">Pertemuan</p>
           </div>
        </div>
      </section>

      <div className="bg-primary bg-opacity-5 p-6 rounded-3xl border border-primary border-opacity-10">
        <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">rocket_launch</span> Mulai Belajar
        </h3>
        <p className="text-sm text-slate-600 mb-6">Akses modul pembelajaran dan kerjakan tugas tepat waktu.</p>
        <Link to="/classes" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary shadow-opacity-20">
          Lihat Daftar Kelas
        </Link>
      </div>

      <div className="mt-12 text-center pb-10">
        <button onClick={() => navigate('/login-tutor')} className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors">
          <span className="material-symbols-outlined">badge</span> Akses Dasbor Tutor
        </button>
      </div>
    </div>
  )
}

function ClassesList() {
  return (
    <div className="space-y-6 pb-20">
      <h2 className="font-headline font-bold text-2xl text-primary mb-6 pt-4 flex items-center gap-3">
         <span className="material-symbols-outlined bg-primary text-white p-1.5 rounded-lg text-sm">import_contacts</span>
         Daftar Kelas Anda
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CLASSES.map(c => (
          <Link key={c.id} to={`/class/${c.id}`} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary border-opacity-30 transition-all group flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
            <div className="pl-2">
              <div className="flex items-center gap-2 mb-2 block text-primary font-semibold text-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">school</span> Kelas Aktif
              </div>
              <h3 className="font-headline font-bold text-lg text-slate-800 group-hover:text-primary transition-colors">{c.title}</h3>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward_ios</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Biodata({ user, profileData }) {
  if (!user) return <Navigate to="/classes" />;

  return (
    <div className="max-w-md mx-auto py-8 pb-24">
      <h2 className="font-headline font-bold text-2xl text-primary mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined bg-primary text-white p-1.5 rounded-lg text-sm">person</span>
        Biodata Mahasiswa
      </h2>
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="text-center mb-8">
           <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-slate-50 overflow-hidden">
              {profileData.photo ? (
                <img src={profileData.photo} alt="Foto Profil" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-4xl text-slate-400">account_circle</span>
              )}
           </div>
           <h3 className="font-headline font-bold text-xl text-slate-800">{profileData.fullName || 'Alexander Bagoes'}</h3>
           <p className="text-sm font-semibold text-primary">Mahasiswa Universitas Terbuka</p>
        </div>

        <div className="space-y-4">
           <div className="flex justify-between border-b border-slate-50 pb-3">
              <span className="text-slate-400 text-sm">Email</span>
              <span className="text-slate-700 font-bold text-sm">{profileData.email}</span>
           </div>
           <div className="flex justify-between border-b border-slate-50 pb-3">
              <span className="text-slate-400 text-sm">NIM</span>
              <span className="text-slate-700 font-bold text-sm">{profileData.nim}</span>
           </div>
           <div className="flex justify-between border-b border-slate-50 pb-3">
              <span className="text-slate-400 text-sm">TTL</span>
              <span className="text-slate-700 font-bold text-sm">{profileData.ttl || '-'}</span>
           </div>
           <div className="flex justify-between border-b border-slate-50 pb-3">
              <span className="text-slate-400 text-sm">No WhatsApp</span>
              <span className="text-slate-700 font-bold text-sm">{profileData.whatsapp || '-'}</span>
           </div>
           <div className="flex justify-between border-b border-slate-50 pb-3">
              <span className="text-slate-400 text-sm">Program Studi</span>
              <span className="text-slate-700 font-bold text-sm">{profileData.prodi || '-'}</span>
           </div>
           <div className="flex justify-between border-b border-slate-50 pb-3">
              <span className="text-slate-400 text-sm">Semester</span>
              <span className="text-slate-700 font-bold text-sm">{profileData.semester || '-'}</span>
           </div>
           <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Salut</span>
              <span className="text-slate-700 font-bold text-sm">{profileData.pokjar}</span>
           </div>
        </div>
        <Link to="/edit-biodata" className="w-full mt-8 bg-primary text-white font-bold py-3 rounded-xl text-sm shadow-md block text-center">
           Edit Biodata
        </Link>
      </div>
    </div>
  )
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
    navigate('/biodata');
  };

  return (
    <div className="max-w-md mx-auto py-8 pb-24 px-4">
      <h2 className="font-headline font-bold text-2xl text-primary mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined bg-primary text-white p-1.5 rounded-lg text-sm">edit</span>
        Edit Biodata
      </h2>
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-5">
        <div className="flex flex-col items-center mb-6">
           <div className="w-24 h-24 bg-slate-100 rounded-full mb-4 flex items-center justify-center border-4 border-slate-50 overflow-hidden relative group">
              {formData.photo ? (
                <img src={formData.photo} alt="Foto Profil" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-4xl text-slate-400">account_circle</span>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="material-symbols-outlined text-white">photo_camera</span>
              </div>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="absolute inset-0 opacity-0 cursor-pointer" />
           </div>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Upload Foto Mahasiswa</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
          <input type="text" value={formData.fullName} readOnly className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-500 font-semibold text-sm outline-none cursor-not-allowed" />
        </div>

        <div>
           <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
           <input type="email" value={formData.email} readOnly className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-500 font-semibold text-sm outline-none cursor-not-allowed" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">NIM</label>
          <input type="text" value={formData.nim} readOnly className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-500 font-semibold text-sm outline-none cursor-not-allowed" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Tempat & Tanggal Lahir (TTL)</label>
          <input type="text" value={formData.ttl} onChange={e => setFormData({...formData, ttl: e.target.value})} placeholder="Contoh: Belitang, 12-05-2004" className="w-full px-4 py-2.5 rounded-xl border bg-white focus:border-primary focus:ring-1 text-sm outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">No WhatsApp</label>
          <input type="tel" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="08XXXXXXXXXX" className="w-full px-4 py-2.5 rounded-xl border bg-white focus:border-primary focus:ring-1 text-sm outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Program Studi</label>
          <input type="text" value={formData.prodi} onChange={e => setFormData({...formData, prodi: e.target.value})} placeholder="Ketik Program Studi" className="w-full px-4 py-2.5 rounded-xl border bg-white focus:border-primary focus:ring-1 text-sm outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Semester</label>
          <input type="number" value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})} placeholder="Pilih Semester" className="w-full px-4 py-2.5 rounded-xl border bg-white focus:border-primary focus:ring-1 text-sm outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Salut</label>
          <input type="text" value={formData.pokjar} readOnly className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-500 font-semibold text-sm outline-none cursor-not-allowed" />
        </div>

        <button type="submit" className="w-full bg-primary hover:bg-[#1a2169] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary shadow-opacity-25 mt-4">
          Simpan Perubahan
        </button>
      </form>
    </div>
  )
}

function LoginTutor({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@ut.ac.id')) {
      setError('Gunakan email resmi Tutor UT (@ut.ac.id).');
      return;
    }
    onLogin({ email, role: 'tutor' });
    navigate('/tutor-dashboard');
  };

  return (
    <div className="max-w-md mx-auto pt-6 pb-20 px-4">
      <Link to="/" className="inline-flex items-center text-primary font-bold mb-8 hover:underline bg-primary-fixed bg-opacity-30 px-3 py-1 rounded-full text-sm">
        <span className="material-symbols-outlined text-sm mr-1">arrow_back</span> Kembali
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <img src="/ut-logo.png" alt="UT Logo" className="w-16 h-auto mx-auto mb-4 object-contain" />
          <h2 className="font-headline font-bold text-2xl text-primary mb-2">Portal Tutor</h2>
          <p className="text-sm text-slate-500">Masuk untuk menilai hasil kerjaan tugas mahasiswa.</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-center gap-2"><span className="material-symbols-outlined">error</span> {error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
           <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Tutor</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tutor@ut.ac.id" className="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:border-primary focus:ring-1" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Masukkan Password" className="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:border-primary focus:ring-1" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1 bg-opacity-2 -translate-y-1 bg-opacity-2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl transition-colors">Masuk Dasbor</button>
        </form>
      </div>
    </div>
  )
}

function Login({ onLogin }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nim, setNim] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const cls = CLASSES.find(c => c.id === id);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@ecampus.ut.ac.id')) {
      setError('Email harus @ecampus.ut.ac.id');
      return;
    }
    if (nim.length < 5) {
      setError('NIM minimal 5 karakter.');
      return;
    }

    const inputEmail = email.trim().toLowerCase();
    const inputNim = nim.trim();

    // Attempt to find student in our database
    const student = STUDENTS.find(s => 
      (s.email.toLowerCase() === inputEmail && s.nim === inputNim)
    );

    if (student) {
      // If student belongs to a different class, warn them
      if (student.classId !== id) {
        const targetClass = CLASSES.find(c => c.id === student.classId);
        setError(`Gagal: Mahasiswa ini terdaftar di ${targetClass?.title || 'kelas lain'}. Tidak bisa masuk kelas ini.`);
        return;
      }
      onLogin({ email: student.email, nim: student.nim, role: 'student', classId: id });
    } else {
      // If not in database at all, reject it for ALL classes.
      // Now all 4 classes are strictly protected.
      setError('Data tidak cocok. Cek kembali NIM dan Email untuk kelas ini.');
      return;
    }
    
    navigate(`/class/${id}/meetings`);
  };

  return (
    <div className="max-w-md mx-auto pt-6 pb-20 px-4">
      <Link to="/" className="inline-flex items-center text-primary font-bold mb-8 hover:underline bg-primary-fixed bg-opacity-30 px-3 py-1 rounded-full text-sm">
        <span className="material-symbols-outlined text-sm mr-1">arrow_back</span> Kembali
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <img src="/ut-logo.png" alt="UT Logo" className="w-16 h-auto mx-auto mb-4 object-contain" />
          <h2 className="font-headline font-bold text-2xl text-primary mb-2">Akses Kelas</h2>
          <p className="text-sm font-semibold text-slate-600 bg-slate-50 p-2 rounded-lg">{cls?.title}</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-center gap-2 transition-all"><span className="material-symbols-outlined text-[18px]">error</span> {error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Mahasiswa</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="mhs@ecampus.ut.ac.id" className="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:border-primary focus:ring-1 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">NIM Mahasiswa</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={nim} onChange={e => setNim(e.target.value)} placeholder="masukan nim mahasiswa" className="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:border-primary focus:ring-1 text-sm" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1 bg-opacity-2 -translate-y-1 bg-opacity-2 text-slate-400">
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-[#1a2169] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg mt-2">Masuk ke Kelas</button>
        </form>
      </div>
    </div>
  )
}

function DashboardTutor({ user }) {
  const [submissions, setSubmissions] = useState([]);
  const [moduleContent, setModuleContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');
  const [unlocking, setUnlocking] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState('1');
  const [groupCount, setGroupCount] = useState(4);
  const [generating, setGenerating] = useState(false);

  if (!user || user.role !== 'tutor') return <Navigate to="/" />;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: subs, error: errSubs } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
      const { data: mods, error: errMods } = await supabase.from('module_content').select('*').order('page_num', { ascending: true });
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

  useEffect(() => { fetchData(); }, []);

  const handleUnlock = async (studentEmail, sectionName) => {
    const key = `${studentEmail}_${sectionName}`;
    setUnlocking(key);
    try {
      await supabase.from('submissions')
        .delete()
        .eq('student_email', studentEmail)
        .eq('section_name', sectionName);
      // Let's also delete the feedback if they are resetting the answer
      await supabase.from('submissions')
        .delete()
        .eq('student_email', studentEmail)
        .eq('section_name', `TUTOR_FEEDBACK_${sectionName}`);
      await fetchData();
    } catch(err) {
      console.log(err);
    } finally {
      setUnlocking(null);
    }
  };

  const handleStarFeedback = async (studentEmail, classId, meetingNum, sectionName, stars) => {
    try {
      const feedbackName = `TUTOR_FEEDBACK_${sectionName}`;
      // Optimistic update so UI updates immediately
      setSubmissions(prev => {
        const withoutOld = prev.filter(s => !(s.student_email === studentEmail && s.section_name === feedbackName));
        return [...withoutOld, { student_email: studentEmail, class_id: classId, meeting_num: meetingNum, section_name: feedbackName, content: String(stars) }];
      });
      
      await supabase.from('submissions')
        .delete()
        .eq('student_email', studentEmail)
        .eq('section_name', feedbackName);
      await supabase.from('submissions').insert([{
        student_email: studentEmail,
        class_id: classId,
        meeting_num: meetingNum,
        section_name: feedbackName,
        content: String(stars)
      }]);
    } catch(err) {
      console.log(err);
    }
  };
  
  const handleGenerateGroups = async () => {
    if (!activeTab || activeTab === 'record_m1') return;
    setGenerating(true);
    try {
      // Include all students in the class (including demo account if for testing)
      const classStudents = STUDENTS.filter(s => s.classId === activeTab);
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
        members: []
      }));

      shuffled.forEach((student, index) => {
        groups[index % groupCount].members.push({
          nim: student.nim,
          name: student.name,
          email: student.email
        });
      });

      const sectionName = "GENERATED_GROUPS";
      // Save/Upsert to submissions table
      // We use a special student_email 'SYSTEM_GROUP' to store this session data
      const payload = {
        student_email: 'SYSTEM_GROUP',
        class_id: activeTab,
        meeting_num: selectedMeeting,
        section_name: sectionName,
        content: JSON.stringify(groups)
      };

      // Delete old if exists for this meeting
      await supabase.from('submissions')
        .delete()
        .eq('student_email', 'SYSTEM_GROUP')
        .eq('class_id', activeTab)
        .eq('meeting_num', selectedMeeting)
        .eq('section_name', sectionName);

      const { error } = await supabase.from('submissions').insert([payload]);
      if (error) throw error;
      
      alert(`Berhasil mengacak ${classStudents.length} mahasiswa ke dalam ${groupCount} kelompok untuk Pertemuan ${selectedMeeting}!`);
      await fetchData();
    } catch (err) {
      console.log(err);
      alert("Gagal mengacak kelompok.");
    } finally {
      setGenerating(false);
    }
  };

  const handleResetGroups = async () => {
    if (!activeTab || activeTab === 'record_m1') return;
    if (!confirm(`Apakah Anda yakin ingin menghapus pembagian kelompok untuk Pertemuan ${selectedMeeting}? Semua data kelompok sesi ini akan hilang.`)) return;
    
    setGenerating(true);
    try {
      await supabase.from('submissions')
        .delete()
        .eq('student_email', 'SYSTEM_GROUP')
        .eq('class_id', activeTab)
        .eq('meeting_num', selectedMeeting)
        .eq('section_name', 'GENERATED_GROUPS');
      
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
    { id: '1', label: 'Kelas 8B' },
    { id: '2', label: 'Kelas 8C' },
    { id: '3', label: 'Kelas 6A' },
    { id: '4', label: 'Kelas 5A' },
    { id: 'demo', label: 'Demo' },
    { id: 'record_m1', label: '📂 Record Modul 1' }
  ];

  const getStudentList = () => {
    if (activeTab === 'demo') return STUDENTS.filter(s => s.email === 'demo@ecampus.ut.ac.id').slice(0, 1);
    return STUDENTS.filter(s => s.classId === activeTab && s.email !== 'demo@ecampus.ut.ac.id');
  };

  const studentList = getStudentList();
  const [expandedStudent, setExpandedStudent] = useState(null);

  const toggleStudent = (email) => {
    if (expandedStudent === email) setExpandedStudent(null);
    else setExpandedStudent(email);
  };

  return (
    <div className="py-8 min-h-[70vh] px-4">
      <h2 className="font-headline font-bold text-3xl text-primary mb-1">Monitoring Keaktifan</h2>
      <p className="text-slate-500 mb-6 font-medium italic text-sm">Monitoring real-time aktivitas dan jawaban mahasiswa per kelas.</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {CLASS_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg shadow-primary shadow-opacity-30 scale-105'
                : 'bg-white border border-slate-200 text-slate-500 hover:border-primary hover:text-primary'
            }`}
          >
            {tab.label}
            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white bg-opacity-20' : 'bg-slate-100'}`}>
              {tab.id === 'demo' ? '1' : STUDENTS.filter(s => s.classId === tab.id && s.email !== 'demo@ecampus.ut.ac.id').length}
            </span>
          </button>
        ))}
        <button onClick={fetchData} className="ml-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary text-sm font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">refresh</span> Refresh
        </button>
      </div>

      {/* Group Generator Tool - Only for real classes */}
      {activeTab !== 'demo' && activeTab !== 'record_m1' && (
        <div className="mb-8 p-6 bg-gradient-to-r from-primary to-[#1a2169] rounded-[2.5rem] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <span className="material-symbols-outlined text-3xl">group_add</span>
              </div>
              <div>
                 <h3 className="font-bold text-lg leading-tight">Generator Kelompok Acak</h3>
                 <p className="text-white text-opacity-60 text-[10px] font-medium uppercase tracking-wider">Acak kelompok berbeda untuk setiap sesi mahasiswa</p>
              </div>
           </div>
           
           <div className="flex flex-wrap items-center gap-4 bg-white bg-opacity-10 p-2 rounded-2xl backdrop-blur-sm border border-white border-opacity-10">
              <div className="px-3 border-r border-white border-opacity-10">
                 <p className="text-[10px] font-black opacity-40 uppercase mb-1">Sesi Pertemuan</p>
                 <select 
                    value={selectedMeeting} 
                    onChange={e => setSelectedMeeting(e.target.value)}
                    className="bg-transparent font-bold text-sm outline-none cursor-pointer"
                 >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={String(n)} className="text-slate-800">Pertemuan {n}</option>)}
                 </select>
              </div>
              <div className="px-3 border-r border-white border-opacity-10">
                 <p className="text-[10px] font-black opacity-40 uppercase mb-1">Jumlah Kelompok</p>
                 <input 
                    type="number" 
                    min="2" max="20"
                    value={groupCount}
                    onChange={e => setGroupCount(parseInt(e.target.value))}
                    className="bg-transparent font-bold text-sm outline-none w-10 text-center"
                 />
              </div>
              <div className="flex gap-2">
                 <button 
                   onClick={handleGenerateGroups}
                   disabled={generating}
                   className="bg-yellow-400 text-primary px-6 py-2.5 rounded-xl font-black text-xs hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-lg shadow-yellow-400 shadow-opacity-20 disabled:opacity-50"
                 >
                    {generating ? '...' : 'ACAK SEKARANG'}
                    {!generating && <span className="material-symbols-outlined text-sm">casino</span>}
                 </button>
                 <button 
                   onClick={handleResetGroups}
                   disabled={generating}
                   className="bg-red-500 bg-opacity-10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 border border-red-500 border-opacity-20 disabled:opacity-50"
                   title="Reset atau Hapus Kelompok"
                 >
                    <span className="material-symbols-outlined text-sm">delete_sweep</span>
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
        ) : activeTab === 'record_m1' ? (
           <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <h3 className="text-2xl font-headline font-bold text-slate-800">Manajemen Konten Modul 1</h3>
                    <p className="text-sm text-slate-500 font-medium">Hasil transkripsi dari Pustaka UT (Halaman 4{'-'}47)</p>
                 </div>
                <div className="bg-primary bg-opacity-5 px-4 py-2 rounded-xl border border-primary border-opacity-10 flex items-center gap-4">
                    <div className="text-center border-r pr-4">
                       <p className="text-[10px] uppercase font-black text-slate-400">Total Bagian</p>
                       <p className="font-bold text-primary">{moduleContent.length}</p>
                    </div>
                    <div className="text-center">
                       <p className="text-[10px] uppercase font-black text-slate-400">Status</p>
                       <p className="font-bold text-green-500 font-mono text-[11px]">DRAFTING</p>
                    </div>
                 </div>
              </div>

              {moduleContent.length === 0 ? (
                 <div className="bg-slate-50 border-2 border-dashed rounded-3xl p-20 text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">edit_note</span>
                    <p className="text-slate-500 font-medium italic">Belum ada konten yang ditranskripsi. Saya sedang mulai mengetik hasil screenshot...</p>
                 </div>
              ) : (
                 <div className="space-y-6">
                    {['materi', 'rangkuman', 'soal_latihan'].map(type => {
                       const items = moduleContent.filter(m => m.content_type === type);
                       if (items.length === 0) return null;
                       return (
                          <div key={type} className="space-y-4">
                             <h4 className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-[0.2em] bg-primary bg-opacity-5 px-4 py-2 rounded-lg w-fit">
                                <span className="material-symbols-outlined text-[18px]">
                                   {type === 'materi' ? 'auto_stories' : type === 'rangkuman' ? 'summarize' : 'quiz'}
                                </span>
                                {type.replace('_', ' ')}
                             </h4>
                             <div className="grid grid-cols-1 gap-4">
                                {items.map((item, mi) => (
                                   <div key={mi} className="bg-white border-l-4 border-l-primary border-opacity-30 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                      <div className="flex justify-between items-start mb-4">
                                         <div>
                                            <p className="text-xs font-bold text-primary opacity-50 uppercase tracking-tighter">HALAMAN {item.page_num}</p>
                                            <h5 className="font-bold text-slate-800 text-lg">{item.section_title}</h5>
                                            {item.sub_title && <p className="text-sm font-medium text-slate-500">{item.sub_title}</p>}
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
             {(activeTab === '1' || activeTab === '2') && (
                <div className="p-8 bg-slate-50 bg-opacity-50 border-b border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                        <span className="material-symbols-outlined text-3xl">hub</span>
                     </div>
                     <div>
                        <h3 className="text-xl font-headline font-black text-slate-800 leading-tight">Rekapitulasi LKPD Kelompok</h3>
                        <p className="text-xs text-slate-500 font-medium tracking-tight">Hasil pengerjaan Mind Map & Studi Kasus per tim (Sesi {selectedMeeting})</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {(() => {
                        const groupSubs = submissions.filter(s => 
                           s.class_id === activeTab && 
                           s.meeting_num === selectedMeeting && 
                           s.student_email.startsWith('GROUP_LKPD_')
                        );
                        
                        // Temukan sistem grup untuk tahu total kelompok seharusnya
                        const systemGroupRow = submissions.find(s => s.student_email === 'SYSTEM_GROUP' && s.class_id === activeTab && s.meeting_num === selectedMeeting);
                        const allGroups = systemGroupRow ? JSON.parse(systemGroupRow.content) : [];

                        if (allGroups.length === 0) {
                           return <div className="col-span-full py-10 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm">Kelompok belum dibuat untuk sesi ini.</div>;
                        }

                        return allGroups.map((g, i) => {
                           const sub = groupSubs.find(s => s.student_email.endsWith(`_G${g.group_num}`));
                           return (
                              <div key={i} className={`bg-white rounded-3xl p-6 border-2 transition-all ${sub ? 'border-emerald-100 shadow-lg shadow-emerald-500 shadow-opacity-5' : 'border-slate-100 opacity-60'}`}>
                                 <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-black text-slate-800 flex items-center gap-2">
                                       <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${sub ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{g.group_num}</span>
                                       Kelompok {g.group_num}
                                    </h4>
                                    {sub ? (
                                       <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Sudah Kirim</span>
                                    ) : (
                                       <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Belum Kirim</span>
                                    )}
                                 </div>

                                 {sub ? (
                                    <div className="space-y-4">
                                       <div className="flex items-center gap-3">
                                          <div className="flex-1 bg-slate-50 px-4 py-2 rounded-2xl">
                                             <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Skor Game</p>
                                             <p className="font-black text-primary text-xl">
                                                {((sub.content.match(new RegExp('SKOR GAME: (\\d+)')) || [])[1] || '0') + " per 100"}
                                             </p>
                                          </div>
                                       </div>
                                       <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                                          <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-2">Jawaban Kasus</p>
                                          <p className="text-xs font-bold text-slate-700 italic leading-relaxed">
                                             "{sub.content.split('JAWABAN KASUS SISWA A: ')[1] || 'Tidak ada jawaban'}"
                                          </p>
                                       </div>
                                       <p className="text-[9px] text-slate-300 font-medium italic">Dikirim pada: {new Date(sub.created_at).toLocaleString('id-ID')}</p>
                                    </div>
                                 ) : (
                                    <div className="py-6 flex flex-col items-center">
                                       <span className="material-symbols-outlined text-3xl text-slate-200 mb-2">hourglass_empty</span>
                                       <p className="text-[10px] text-slate-400 font-bold uppercase">Menunggu Laporan</p>
                                    </div>
                                 )}
                              </div>
                           );
                        });
                     })()}
                  </div>
               </div>
             )}

             <div className="overflow-x-auto p-8">
               <div className="mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person</span>
                  <h3 className="text-lg font-headline font-black text-slate-800">Daftar Mahasiswa (Individu)</h3>
               </div>
             <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-primary text-white uppercase tracking-wider font-bold">
                  <th className="px-4 py-4 w-10 text-center border-r border-white border-opacity-10">No</th>
                  <th className="px-4 py-4 border-r border-white border-opacity-10">Mahasiswa</th>
                  <th className="px-4 py-4 border-r border-white border-opacity-10 text-center">Jumlah Jawaban Mhs</th>
                  <th className="px-4 py-4 text-center">Aksi Tutor</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {studentList.map((student, index) => {
                  const studentSubs = submissions.filter(s => s.student_email === student.email);
                  // Filter out "TUTOR_FEEDBACK" rows to get pure answers
                  const actualAnswers = studentSubs.filter(s => !s.section_name.startsWith("TUTOR_FEEDBACK_"));

                  return (
                    <Fragment key={index}>
                      <tr className={index % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50 bg-opacity-50 hover:bg-slate-50'}>
                        <td className="px-4 py-4 font-bold text-slate-400 text-center border-r">{index + 1}</td>
                        <td className="px-4 py-4 border-r">
                          <p className="font-bold text-slate-800 uppercase leading-none mb-1">{student.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium tracking-tighter">{student.nim} • {student.email}</p>
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
                               {expandedStudent === student.email ? 'expand_less' : 'expand_more'}
                            </span>
                            {expandedStudent === student.email ? 'Tutup Detail' : 'Beri Penilaian & Cek Jawaban'}
                          </button>
                        </td>
                      </tr>
                      {expandedStudent === student.email && (
                        <tr className="bg-slate-50 border-b-2 border-slate-200">
                          <td colSpan={5} className="p-0">
                             <div className="p-6">
                               {actualAnswers.length === 0 ? (
                                 <p className="text-center text-slate-400 italic text-xs font-bold py-4">Mahasiswa ini belum mengirim jawaban apapun.</p>
                               ) : (
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                   {actualAnswers.map((answer, i) => {
                                     const secName = answer.section_name;
                                     const tutorFb = studentSubs.find(s => s.section_name === `TUTOR_FEEDBACK_${secName}`);
                                     const curStars = tutorFb ? parseInt(tutorFb.content) : 0;
                                     const isUnlocking = unlocking === `${student.email}_${secName}`;

                                     return (
                                       <div key={i} className="bg-white border rounded-xl p-4 shadow-sm relative group hover:border-primary border-opacity-30 transition-all flex flex-col justify-between">
                                         <div>
                                           <div className="flex justify-between items-start mb-2">
                                             <p className="text-[10px] font-bold text-primary uppercase bg-primary bg-opacity-10 px-2 py-0.5 rounded inline-block">{secName}</p>
                                             <button
                                               onClick={() => handleUnlock(student.email, secName)}
                                               disabled={isUnlocking}
                                               className="text-[9px] text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded px-1.5 py-0.5 font-bold transition-all disabled:opacity-30"
                                               title="Hapus jawaban agar mahasiswa bisa mengulang"
                                             >
                                               {isUnlocking ? '...' : '🔓 Reset atau Hapus'}
                                             </button>
                                           </div>
                                           <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg mb-3">
                                             {secName === 'Pertanyaan Pemantik' ? (
                                               <div className="max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
                                                 {answer.content.split('\n\n').map((block, bi) => {
                                                    const parts = block.split('\nJawaban: ');
                                                    return (
                                                      <div key={bi} className="mb-2 last:mb-0">
                                                        <p className="text-[9px] text-slate-400 leading-tight mb-0.5">{parts[0]?.replace(`Pertanyaan ${bi+1}: `, `Q${bi+1}: `)}</p>
                                                        <p className="text-[10px] font-medium text-slate-700 italic border-l-2 border-primary border-opacity-20 pl-1.5 leading-snug">"{parts[1] || '-'}"</p>
                                                      </div>
                                                    );
                                                  })}
                                               </div>
                                             ) : (
                                               <p className="text-[11px] font-medium text-slate-700 italic max-h-[120px] overflow-y-auto custom-scrollbar pr-1">"{answer.content}"</p>
                                             )}
                                           </div>
                                         </div>
                                         
                                         <div className="pt-2 border-t">
                                           <div className="flex justify-between items-center">
                                             <div className="flex items-center gap-2">
                                               <p className="text-[10px] font-bold text-slate-700 uppercase">Nilai Anda:</p>
                                               {curStars > 0 && <span className="text-[8px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><span className="material-symbols-outlined text-[10px]">check_circle</span>Tersimpan Otomatis</span>}
                                             </div>
                                             <div className="flex gap-0.5">
                                               {[1,2,3,4,5].map(star => (
                                                 <button
                                                   key={star}
                                                   onClick={() => handleStarFeedback(student.email, student.classId, answer.meeting_num || '1', secName, star)}
                                                   className={`text-[20px] transition-transform hover:scale-125 ${
                                                     star <= curStars ? 'text-yellow-400 drop-shadow-sm' : 'text-slate-300'
                                                   }`}
                                                 >
                                                   <span className="material-symbols-outlined fill-1 text-[18px]">star</span>
                                                 </button>
                                               ))}
                                             </div>
                                           </div>
                                           {curStars > 0 && (
                                             <div className="mt-2 bg-yellow-50 border border-yellow-100 p-2 rounded-md">
                                               <p className="text-[9px] text-yellow-700 italic leading-snug">"{FEEDBACK_MESSAGES[curStars]}"</p>
                                             </div>
                                           )}
                                         </div>
                                       </div>
                                     )
                                   })}
                                 </div>
                               )}
                             </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })}
                {studentList.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-300 font-bold">Belum ada data mahasiswa untuk kelas ini.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}


function Meetings({ user }) {
  const { id } = useParams();
  const cls = CLASSES.find(c => c.id === id);
  const meetingsList = Array.from({length: 8}, (_, i) => i + 1);

  if (!user || user.role !== 'student') return <Navigate to={`/class/${id}`} />;

  return (
    <div className="pb-10 pt-4 px-4">
      <div className="flex items-center gap-3 mb-6 bg-primary bg-opacity-30 p-4 rounded-2xl border border-primary border-opacity-10">
        <div className="bg-white p-2 rounded-xl text-primary shadow-sm"><span className="material-symbols-outlined">menu_book</span></div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Mata Kuliah</p>
          <h2 className="font-headline font-bold text-sm md:text-base text-slate-800 leading-tight truncate">{cls?.title}</h2>
        </div>
      </div>
      <h3 className="font-headline font-bold text-xl text-slate-800 mb-5">Modul Pembelajaran (8 Pertemuan)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {meetingsList.map(num => (
          <Link key={num} to={`/class/${id}/meeting/${num}`} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <span className="inline-block bg-yellow-400 text-primary text-[10px] font-bold px-2 py-1 rounded mb-3">SESI {num}</span>
            <h4 className="font-headline font-bold text-lg text-slate-800 mb-1">Pertemuan {num}</h4>
            <div className="flex justify-between items-center mt-4">
               <p className="text-xs text-slate-400">Materi & Tugas</p>
               <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ClassMenu({ user }) {
  const { id, meetingId } = useParams();
  if (!user || user.role !== 'student') return <Navigate to={`/class/${id}`} />;

  return (
    <div className="pt-2 pb-10 px-4">
      <Link to={`/class/${id}/meetings`} className="inline-flex items-center text-slate-500 font-bold mb-6 text-sm bg-white border px-4 py-2 rounded-full shadow-sm hover:bg-slate-50">
        <span className="material-symbols-outlined text-sm mr-2">arrow_back</span> Daftar Pertemuan
      </Link>
      <div className="bg-gradient-to-br from-primary to-[#232c94] text-white p-8 rounded-3xl shadow-xl mb-8">
        <span className="bg-yellow-400 text-primary text-[10px] font-bold px-2 py-1 rounded">SESI {meetingId}</span>
        <h2 className="font-headline font-bold text-2xl md:text-3xl mt-2 mb-2">Menu Pembelajaran</h2>
        <p className="text-white text-opacity-60 text-sm">Pilih modul yang ingin Anda pelajari atau kerjakan sekarang.</p>
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
              <div className={`w-16 h-16 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-500 flex items-center justify-center mb-4 shadow-sm relative z-10`}>
                <span className="material-symbols-outlined text-[32px]">{iconName}</span>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary text-[13px] md:text-sm leading-tight transition-colors relative z-10">{menu}</p>
              
              {/* Subtle background decoration on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary bg-opacity-5 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

function SectionPage({ user }) {
  const { id, meetingId, sectionName } = useParams();
  const cls = CLASSES.find(c => c.id === id);
  const courseCode = cls?.title.split('|')[0].trim();
  
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [pemantikAnswers, setPemantikAnswers] = useState(['', '', '']);
  const [tutorFeedback, setTutorFeedback] = useState(null);

  const isInput = ["Tugas", "Catatan", "LKPD", "Latihan", "Kuis", "Refleksi"].some(p => sectionName?.includes(p));

  useEffect(() => {
    setStatus(null);
    setTutorFeedback(null);
    if (!user) return;
    const fetchStatus = async () => {
      // If we are looking for Pertanyaan Pemantik, fetch that and its tutor feedback
      const sectionNamesToFetch = [sectionName, `TUTOR_FEEDBACK_${sectionName}`];

      // Fetch personal answers + system-generated groups
      const { data } = await supabase
        .from('submissions')
        .select('*')
        .or(`student_email.eq.${user.email},student_email.eq.SYSTEM_GROUP`)
        .eq('class_id', id)
        .eq('meeting_num', meetingId)
        .in('section_name', [...sectionNamesToFetch, 'GENERATED_GROUPS']);
        
      if (data && data.length > 0) {
        setSubmissions(data);
        const _status = data.find(d => d.student_email === user.email && d.section_name === sectionName);
        const _feedback = data.find(d => d.section_name === `TUTOR_FEEDBACK_${sectionName}`);
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
        content: val
      };
      const { data, error } = await supabase.from('submissions').insert([payload]).select();
      if (!error && data && data.length > 0) {
        setStatus(data[0]);
        setSubmissions(prev => [...prev, data[0]]);
      }
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'student') return <Navigate to={`/class/${id}`} />;

    const renderStaticContent = () => {
    if (sectionName === "Video Pembelajaran" && (id === '1' || id === '2')) {
      const videoId = "GYlmNScMEl4";
      const wordCount = content.trim() ? content.trim().split(new RegExp('\\s+')).filter(w => w.length > 0).length : 0;
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
                     <span className="material-symbols-outlined text-red-600 text-[18px]">movie</span>
                   </div>
                   <p className="font-bold text-slate-800 text-sm">Video Pembelajaran Kelas 8B & 8C</p>
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
                      <span className="material-symbols-outlined text-yellow-400">description</span>
                    </span>
                    Kesimpulan Video
                  </h4>
                  <p className="text-slate-400 text-sm mt-2 font-medium">Susunlah poin-poin penting dari video yang telah Anda tonton.</p>
                </div>
                {!status && (
                  <div className={`px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${isWordCountEnough ? 'bg-green-500 bg-opacity-10 border-green-500 border-opacity-30 text-green-400' : 'bg-white bg-opacity-5 border-white border-opacity-10 text-slate-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${isWordCountEnough ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></span>
                    Syarat: 100 Kata
                  </div>
                )}
              </div>
              
              {status ? (
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-white border-opacity-10 shadow-inner">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] text-yellow-400 text-opacity-70 border border-yellow-400 border-opacity-30 px-2 py-0.5 rounded-md uppercase font-black tracking-tighter">Laporan Mahasiswa</span>
                    </div>
                    <p className="text-sm md:text-base text-slate-200 leading-[1.8] text-justify italic font-serif">
                       {status.content}
                    </p>
                    <div className="mt-8 flex items-center gap-3 py-3 px-5 bg-green-500 bg-opacity-10 rounded-2xl border border-green-500 border-opacity-20 w-fit">
                      <span className="material-symbols-outlined text-green-400 text-xl font-bold">verified</span>
                      <p className="text-xs text-green-400 font-bold uppercase tracking-widest">Terkirim & Terarsip</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 from-opacity-20 to-primary to-opacity-20 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
                    <textarea 
                      value={content} 
                      onChange={e => setContent(e.target.value)}
                      placeholder="Masukkan analisis dan kesimpulan Anda di sini (Minimal 100 kata)..."
                      className="relative w-full bg-[#1e293b] bg-opacity-50 border border-white border-opacity-10 rounded-[2rem] p-6 md:p-8 text-sm md:text-base text-white placeholder:text-slate-500 focus:bg-[#1e293b] focus:border-yellow-400 focus:border-opacity-50 outline-none min-h-[300px] resize-none transition-all leading-relaxed text-justify"
                    ></textarea>
                    
                    <div className="absolute bottom-6 right-6 flex items-center gap-3">
                       <p className={`text-xs font-black tracking-tighter transition-colors ${isWordCountEnough ? 'text-green-400' : 'text-slate-500'}`}>
                         {wordCount.toLocaleString()} <span className="opacity-50">{ " / " } 100 KATA</span>
                       </p>
                       <div className="w-10 h-10 rounded-full bg-black bg-opacity-40 flex items-center justify-center border border-white border-opacity-5">
                         {isWordCountEnough ? (
                           <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
                         ) : (
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse"></div>
                         )}
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-2">
                    <p className="text-[11px] text-slate-500 font-medium italic order-2 md:order-1">
                      * Kesimpulan yang dikirim tidak dapat diubah kembali. Mohon teliti.
                    </p>
                    <button 
                      onClick={() => handleAction(content)}
                      disabled={loading || !isWordCountEnough}
                      className="w-full md:w-auto min-w-[240px] bg-yellow-400 text-slate-900 font-black py-4 px-8 rounded-2xl hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-xl shadow-yellow-400 shadow-opacity-10 flex items-center justify-center gap-3 order-1 md:order-2"
                    >
                      {loading ? 'MEMPROSES...' : 'KIRIM KESIMPULAN VIDEO'}
                      {!loading && isWordCountEnough && <span className="material-symbols-outlined font-bold">send</span>}
                    </button>
                  </div>
                  
                  {!isWordCountEnough && content.trim().length > 0 && (
                    <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                      <span className="material-symbols-outlined text-red-400">priority_high</span>
                      <p className="text-xs text-red-300 font-bold uppercase tracking-wider">
                        Kurang {100 - wordCount} kata lagi untuk membuka akses tombol kirim.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {status && tutorFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="material-symbols-outlined text-yellow-500 text-4xl">stars</span>
              <div>
                <p className="font-bold text-yellow-700 mb-1 text-lg">Nilai Kesimpulan Anda</p>
                <p className="text-sm text-yellow-800 mb-3 italic">"{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || 'Tutor telah memberikan penilaian.'}"</p>
                <div className="flex gap-1 text-yellow-500">
                  {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined fill-1 text-2xl">star</span>)}
                  {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined text-slate-300 text-2xl">star</span>)}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    if (sectionName === "Informasi Modul" && COURSE_DATA[courseCode]?.[sectionName]) {
      return (
        <div className="space-y-10">
          {COURSE_DATA[courseCode][sectionName]}
          
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 bg-opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400 uppercase tracking-tighter flex items-center gap-2">
              <span className="material-symbols-outlined">quiz</span> Pertanyaan Verifikasi
            </h4>
            <p className="text-sm mb-6 leading-relaxed font-medium">Sebutkan Judul 6 Modul yang ada di Mata Kuliah SPGK4307 {"/"} Bimbingan Konseling di SD</p>
            
            {status ? (
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 p-4 rounded-xl border border-white border-opacity-20">
                  <p className="text-[10px] text-white text-opacity-50 uppercase font-bold mb-2">Jawaban Anda:</p>
                  <p className="text-sm italic">"{status.content}"</p>
                  <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">verified</span> Terkirim ke Tutor
                  </div>
                </div>
                {/* Tutor feedback removed from inside the forms box */}
              </div>
            ) : (
              <div className="space-y-4">
                <textarea 
                  value={content} 
                  onChange={e => setContent(e.target.value)}
                  placeholder="Ketik jawaban Anda di sini..."
                  className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl p-4 text-sm focus:bg-white bg-opacity-10 focus:border-yellow-400 outline-none min-h-[120px]"
                ></textarea>
                <button 
                  onClick={() => handleAction(content)}
                  disabled={loading || !content.trim()}
                  className="w-full bg-yellow-400 text-slate-900 font-bold py-3 rounded-xl hover:bg-yellow-300 transition-all disabled:opacity-50"
                >
                  {loading ? 'Mengirim...' : 'Kirim Jawaban'}
                </button>
              </div>
            )}
          </div>
          
          {status && tutorFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 shadow-sm mt-8">
              <span className="material-symbols-outlined text-yellow-500 text-4xl">stars</span>
              <div>
                <p className="font-bold text-yellow-700 mb-1 text-lg">Nilai dari Tutor</p>
                <p className="text-sm text-yellow-800 mb-3 italic">"{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || 'Tutor telah memberikan penilaian.'}"</p>
                <div className="flex gap-1 text-yellow-500">
                  {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined fill-1 text-2xl">star</span>)}
                  {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined text-slate-300 text-2xl">star</span>)}
                </div>
              </div>
            </div>
          )}

        </div>
      );
    }

    if (sectionName === "Pertanyaan Pemantik" && (cls?.classId === '1' || cls?.classId === '2' || ['1','2'].includes(id))) {
      const questions = getPemantikForStudent(user.nim || '0');
      const allAnswered = pemantikAnswers.every(a => a.trim().length > 0);
      const combinedContent = questions.map((q, i) => `Pertanyaan ${i+1}: ${q}\nJawaban: ${pemantikAnswers[i]}`).join('\n\n');

      return (
        <div className="space-y-6">
          <div className="bg-primary bg-opacity-5 p-5 rounded-2xl border border-primary border-opacity-10">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">tips_and_updates</span> Pertanyaan Pemantik
            </p>
            <p className="text-sm text-slate-600 font-medium">Jawablah 3 pertanyaan di bawah ini sesuai dengan pemahaman Anda. Pertanyaan bersifat pribadi dan berbeda untuk setiap mahasiswa.</p>
          </div>

          {status ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex items-center gap-3">
                <span className="material-symbols-outlined text-green-500 text-3xl">check_circle</span>
                <div>
                  <p className="font-bold text-green-700">Jawaban Sudah Terkirim ke Tutor</p>
                  <p className="text-xs text-green-600">Jawaban Anda telah disimpan dan tidak bisa diubah kecuali tutor membuka kembali.</p>
                </div>
              </div>
              
              {/* Tutor feedback shifted to bottom */}

              {questions.map((q, i) => (
                <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-primary uppercase mb-2">Pertanyaan {i + 1}</p>
                  <p className="text-sm font-medium text-slate-700 mb-3">{q}</p>
                  <div className="bg-slate-50 p-3 rounded-xl border-l-4 border-primary border-opacity-30">
                    <p className="text-sm text-slate-600 italic">"{pemantikAnswers[i] || (status.content.split('\n\n')[i]?.split('Jawaban: ')[1] || '-')}"</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {questions.map((q, i) => (
                <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg shrink-0">{i + 1}</span>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">{q}</p>
                  </div>
                  <textarea
                    value={pemantikAnswers[i]}
                    onChange={e => {
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
                {loading ? 'Mengirim...' : !allAnswered ? 'Lengkapi Semua Jawaban Terlebih Dahulu' : 'Kirim Semua Jawaban'}
              </button>
            </div>
          )}

          {status && tutorFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 shadow-sm mt-8">
              <span className="material-symbols-outlined text-yellow-500 text-4xl">stars</span>
              <div>
                <p className="font-bold text-yellow-700 mb-1 text-lg">Nilai dari Tutor</p>
                <p className="text-sm text-yellow-800 mb-3 italic">"{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || 'Tutor telah memberikan penilaian.'}"</p>
                <div className="flex gap-1 text-yellow-500">
                  {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined fill-1 text-2xl">star</span>)}
                  {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined text-slate-300 text-2xl">star</span>)}
                </div>
              </div>
            </div>
          )}

        </div>
      );
    }

    if (sectionName === "Materi Pembelajaran" && (id === '1' || id === '2')) {
      return (
        <div className="space-y-12 pb-10">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#0c3352] to-[#1a4a6e] rounded-[3rem] p-10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 bg-opacity-10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
            <div className="relative z-10 text-center">
              <span className="inline-block bg-yellow-400 text-primary text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest shadow-lg shadow-yellow-400 shadow-opacity-20">Modul Utama</span>
              <h1 className="text-3xl md:text-5xl font-headline font-black text-white mb-4 leading-tight">Konsep Dasar Bimbingan {"&"} Konseling (BK)</h1>
              <p className="text-blue-100 text-opacity-70 max-w-2xl mx-auto text-sm md:text-base font-medium">Ringkasan materi pembelajaran yang disusun secara sistematis untuk pemahaman mendalam tentang layanan BK di sekolah dasar.</p>
            </div>
          </div>

          {/* Section 1: Pengertian, Fungsi, & Tujuan */}
          <section className="space-y-6">
            <h2 className="text-2xl font-headline font-black text-primary flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">01</span>
              Pengertian, Fungsi, {"&"} Tujuan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Guidance */}
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all border-l-8 border-l-blue-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-3xl">explore</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800">Guidance</h3>
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-tighter">Bimbingan (To Guide)</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {['To Direct (Mengarahkan)', 'To Pilot (Memandu)', 'To Manage (Mengelola)', 'To Steer (Menyetir)'].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 bg-blue-50 bg-opacity-50 p-2 rounded-xl border border-blue-100 border-opacity-50">
                      <span className="material-symbols-outlined text-blue-500 text-sm">check_circle</span>
                      <span className="text-sm font-semibold text-slate-600">{t}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed italic border-t pt-4">Terminologi: Proses bantuan berkelanjutan untuk mencapai pemahaman dan realisasi diri sesuai potensi.</p>
              </div>

              {/* Counseling */}
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all border-l-8 border-l-emerald-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <span className="material-symbols-outlined text-3xl">psychology</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800">Counseling</h3>
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-tighter">Konseling (Face-to-Face)</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Hubungan profesional (<span className="font-bold text-emerald-600">professional relationship</span>) atau tatap muka yang bertujuan meningkatkan kemampuan <span className="italic font-bold">self-adjustment</span> (penyesuaian diri) secara efektif terhadap diri dan lingkungan.
                </p>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                   <p className="text-xs font-bold text-emerald-800 uppercase mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-xs">info</span> Fokus Utama</p>
                   <p className="text-xs text-emerald-700 font-medium">Pengembangan kemampuan adaptasi siswa dalam menghadapi tantangan personal dan akademis.</p>
                </div>
              </div>
            </div>

            {/* Fungsi BK Grid */}
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10">
              <h4 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">grid_view</span> Fungsi Bimbingan dan Konseling
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: 'visibility', title: 'Pemahaman', desc: 'Memahami karakteristik siswa' },
                  { icon: 'shield', title: 'Preventif', desc: 'Pencegahan masalah' },
                  { icon: 'healing', title: 'Perbaikan', desc: 'Pemecahan masalah (Kuratif)' },
                  { icon: 'auto_awesome', title: 'Pemeliharaan', desc: 'Mengembangkan potensi optimal' },
                  { icon: 'volunteer_activism', title: 'Fasilitasi', desc: 'Memberikan kemudahan tumbuh' }
                ].map((f, i) => (
                  <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center group hover:border-primary transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-primary bg-opacity-5 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">{f.icon}</span>
                    </div>
                    <p className="font-bold text-slate-800 text-xs mb-1">{f.title}</p>
                    <p className="text-[10px] text-slate-400 leading-tight font-medium">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Aspek Tujuan */}
            <div className="space-y-4">
               <h4 className="font-bold text-slate-800 flex items-center gap-2 px-2">
                <span className="material-symbols-outlined text-primary">target</span> 3 Aspek Tujuan (Tugas Perkembangan)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Pribadi-Sosial', color: 'bg-indigo-600', desc: 'Toleransi, jujur, interaksi sosial, dan resolusi konflik.' },
                  { title: 'Akademik (Belajar)', color: 'bg-amber-500', desc: 'Sikap belajar positif, motivasi tinggi, dan keterampilan efektif.' },
                  { title: 'Karier', color: 'bg-rose-500', desc: 'Pemahaman potensi diri dan perencanaan masa depan logis.' }
                ].map((a, i) => (
                  <div key={i} className="relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className={`absolute top-0 right-0 w-20 h-20 ${a.color} opacity-5 rounded-full -mr-10 -mt-10`}></div>
                    <div className={`w-8 h-1 ${a.color} rounded-full mb-4`}></div>
                    <h5 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">{a.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Prinsip-Prinsip */}
          <section className="space-y-6">
            <h2 className="text-2xl font-headline font-black text-primary flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">02</span>
              Prinsip-Prinsip Dasar BK
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { t: 'Bimbingan untuk Semua', d: 'Melayani semua tanpa memandang latar belakang sosial.' },
                 { t: 'Individualisasi', d: 'Menitikberatkan pada keunikan setiap individu.' },
                 { t: 'Menekankan Aspek Positif', d: 'Fokus pada kekuatan dan keberhasilan siswa.' },
                 { t: 'Usaha Bersama', d: 'Tanggung jawab kolektif seluruh elemen sekolah {"&"} orang tua.' },
                 { t: 'Pengambilan Keputusan Mandiri', d: 'Mampu memilih jalan secara bertanggung jawab.' },
                 { t: 'Lintas Aspek Kehidupan', d: 'Mencakup masyarakat, keluarga, dan dunia kerja.' }
               ].map((p, i) => (
                 <div key={i} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-3xl items-start hover:border-yellow-400 transition-all">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 bg-opacity-10 text-yellow-600 text-[10px] flex items-center justify-center font-black">{i+1}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">{p.t}</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{p.d}</p>
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
                <span className="material-symbols-outlined text-yellow-400 text-4xl">verified_user</span>
                Asas-Asas (Kode Etik BK)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { t: 'Kerahasiaan', icon: 'lock', d: 'Data konseli tidak boleh diketahui pihak lain.' },
                   { t: 'Kesukarelaan', icon: 'favorite', d: 'Ikuti layanan tanpa paksaan (kemauan sendiri).' },
                   { t: 'Keterbukaan', icon: 'campaign', d: 'Jujur dan terbuka dalam memberi informasi.' },
                   { t: 'Kekinian', icon: 'event', d: 'Fokus pada masalah saat ini (here and now).' },
                   { t: 'Kemandirian', icon: 'person_celebrate', d: 'Menjadi pribadi mandiri tanpa bergantung.' },
                   { t: 'Keahlian', icon: 'workspace_premium', d: 'Dilakukan secara profesional oleh ahli terlatih.' },
                   { t: 'Alih Tangan', icon: 'forward_to_inbox', d: 'Merujuk ke ahli lain jika di luar wewenang.' },
                   { t: 'Tut Wuri Handayani', icon: 'star', d: 'Mengayomi, teladan, dan memberi dorongan.' }
                 ].map((a, i) => (
                   <div key={i} className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-10 p-6 rounded-3xl hover:bg-white bg-opacity-20 transition-all">
                      <span className="material-symbols-outlined text-yellow-400 mb-3">{a.icon}</span>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-tighter">{a.t}</h4>
                      <p className="text-[10px] text-white text-opacity-60 font-medium leading-normal">{a.d}</p>
                   </div>
                 ))}
              </div>
            </div>
          </section>

          {/* Section 4: Jenis Layanan */}
          <section className="space-y-6">
            <h2 className="text-2xl font-headline font-black text-primary flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">04</span>
              Jenis-Jenis Layanan Konkret
            </h2>
            <div className="bg-white border rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x">
                   {[
                     { t: 'Layanan Orientasi', d: 'Pengenalan lingkungan sekolah baru.' },
                     { t: 'Layanan Informasi', d: 'Pemberian data pendidikan, jabatan, dan sosial.' },
                     { t: 'Layanan Pembelajaran', d: 'Mengembangkan sikap dan kebiasaan belajar benar.' },
                     { t: 'Layanan Penempatan', d: 'Memilih jurusan atau ekskul sesuai bakat.' },
                     { t: 'Penguasaan Konten', d: 'Membantu penguasaan kompetensi tertentu.' },
                     { t: 'Konseling Individual', d: 'Tatap muka mendalam untuk masalah perorangan.' },
                     { t: 'Konseling Kelompok', d: 'Dinamika kelompok untuk pemecahan masalah.' },
                     { t: 'Konsultasi {"&"} Mediasi', d: 'Membantu pihak ketiga (ortu) {"&"} selesaikan konflik.' }
                   ].map((l, i) => (
                     <div key={i} className="p-6 flex items-center gap-5 group hover:bg-slate-50 transition-all">
                        <span className="text-xl font-black text-slate-100 group-hover:text-primary transition-colors">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{l.t}</p>
                          <p className="text-xs text-slate-400 font-medium">{l.d}</p>
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
                     <h3 className="text-xl font-black text-slate-800 mb-2">Evaluasi Materi</h3>
                     <p className="text-sm text-slate-500 font-medium">Tuliskan jawaban Anda untuk pertanyaan di bawah ini untuk mengirimkan laporan belajar ke tutor.</p>
                  </div>

                  <div className="bg-white border-2 border-primary border-opacity-10 rounded-[2.5rem] p-8 shadow-xl shadow-primary shadow-opacity-5">
                     <label className="block text-sm font-black text-primary uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">question_answer</span>
                        Pertanyaan Verifikasi:
                     </label>
                     <p className="text-lg font-bold text-slate-800 mb-6 leading-snug">Apa Pengertian, Fungsi, dan Tujuan Bimbingan dan Konseling?</p>
                     
                     <textarea 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Ketik jawaban lengkap Anda di sini..."
                        className="w-full min-h-[150px] bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm focus:bg-white focus:border-primary focus:ring-1 outline-none transition-all resize-none mb-6"
                     ></textarea>

                     <button 
                        onClick={() => handleAction(content)}
                        disabled={loading || !content.trim()}
                        className="w-full bg-[#1e293b] text-white font-black py-5 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                     >
                        {loading ? 'MENGIRIM JAWABAN...' : 'KIRIM JAWABAN KE TUTOR'}
                        {!loading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>}
                     </button>
                  </div>
               </div>
             ) : (
               <div className="w-full max-w-xl bg-green-500 text-white p-8 rounded-[2.5rem] shadow-xl shadow-green-500 shadow-opacity-20 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                     <span className="material-symbols-outlined text-4xl">done_all</span>
                  </div>
                  <h3 className="text-xl font-black mb-1">Jawaban Terkirim!</h3>
                  <p className="text-white text-opacity-80 text-sm font-medium mb-6">Laporan belajar Anda telah masuk ke sistem. Silakan tunggu feedback/nilai dari tutor.</p>
                  <div className="bg-white bg-opacity-10 px-6 py-4 rounded-2xl w-full border border-white border-opacity-10 text-left">
                     <p className="text-[10px] font-black uppercase text-white text-opacity-40 mb-1">Jawaban Anda:</p>
                     <p className="text-xs italic font-serif opacity-90">"{status.content}"</p>
                  </div>
               </div>
             )}
          </div>
        </div>
      );
    }

    if (sectionName === "Pembagian Kelompok") {
      const groupRow = submissions.find(s => s.student_email === 'SYSTEM_GROUP' && s.section_name === 'GENERATED_GROUPS');
      const groups = groupRow ? JSON.parse(groupRow.content) : null;
      const myGroup = groups?.find(g => g.members.some(m => m.email === user.email));

      if (!groups) {
         return (
           <div className="bg-slate-50 border-2 border-dashed rounded-[3rem] p-20 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-slate-200 rotate-3 border border-slate-100">
                 <span className="material-symbols-outlined text-5xl text-primary animate-pulse">pending_actions</span>
              </div>
              <h3 className="text-2xl font-headline font-black text-slate-800 mb-3 tracking-tight">Kelompok Belum Dibuat Oleh Tutor</h3>
              <p className="text-sm text-slate-500 max-w-sm font-medium leading-relaxed italic">
                 Mohon bersabar, tutor Anda sedang memproses pembagian tim untuk sesi diskusi ini. Silakan refresh halaman atau tunggu instruksi selanjutnya.
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
                      <span className="material-symbols-outlined text-sm animate-bounce">stars</span> Informasi Kelompok Anda
                   </div>
                   <h1 className="text-4xl md:text-6xl font-headline font-black mb-4">Kelompok {myGroup.group_num}</h1>
                   <p className="text-blue-100 text-opacity-60 font-medium max-w-xl text-sm md:text-base leading-relaxed">
                      Anda telah terdaftar di Kelompok {myGroup.group_num} untuk Pertemuan {meetingId}. Silakan berdiskusi dan berkolaborasi dengan rekan tim Anda di bawah ini.
                   </p>
                </div>
             </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-[3rem] text-center">
               <p className="font-bold text-yellow-800">Nama Anda tidak ditemukan dalam daftar kelompok sesi ini. Mohon hubungi tutor.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {groups.map((g, i) => (
               <div key={i} className={`bg-white border rounded-[2.5rem] p-8 shadow-sm transition-all ${myGroup?.group_num === g.group_num ? 'ring-4 ring-primary ring-offset-4 border-primary scale-[1.02] shadow-2xl relative' : 'hover:border-slate-300 group'}`}>
                  {myGroup?.group_num === g.group_num && (
                    <div className="absolute -top-4 left-1 bg-opacity-2 -translate-x-1 bg-opacity-2 bg-primary text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">Tim Anda</div>
                  )}
                  <div className="flex justify-between items-start mb-6">
                    <h3 className={`text-xl font-headline font-black flex items-center gap-3 ${myGroup?.group_num === g.group_num ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      <span className={`w-10 h-10 rounded-2xl flex items-center justify-center ${myGroup?.group_num === g.group_num ? 'bg-primary text-white shadow-lg shadow-primary shadow-opacity-30' : 'bg-slate-100 text-slate-400'}`}>
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
                       <div key={mi} className={`flex items-center gap-4 p-3 rounded-2xl border transition-all ${m.email === user.email ? 'bg-primary bg-opacity-5 border-primary border-opacity-20' : 'border-slate-50 group-hover:border-slate-100 bg-slate-50 bg-opacity-50'}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${m.email === user.email ? 'bg-primary text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
                             {mi + 1}
                          </div>
                          <div className="overflow-hidden flex-1">
                             <p className={`font-bold text-xs truncate ${m.email === user.email ? 'text-primary' : 'text-slate-700'}`}>{m.name}</p>
                             <p className="text-[9px] text-slate-400 font-medium">{m.nim}</p>
                          </div>
                          {m.email === user.email && <span className="material-symbols-outlined text-primary text-lg ml-auto">person</span>}
                       </div>
                     ))}
                  </div>
               </div>
             ))}
          </div>
        </div>
      );
    }

    return <div className="bg-blue-50 p-10 rounded-3xl text-center text-slate-400 font-medium">Baca instruksi modul untuk bagian ini.</div>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await supabase.from('submissions').insert([{
        student_email: user.email, class_id: id, meeting_num: meetingId, section_name: sectionName, content
      }]);
      setSuccess(true);
      setContent('');
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border shadow-sm min-h-[60vh] mt-4 mb-10 mx-4">
       <Link to={`/class/${id}/meeting/${meetingId}`} className="inline-flex items-center text-slate-400 font-bold mb-8 text-sm hover:text-primary"><span className="material-symbols-outlined text-sm mr-1">arrow_back</span> Kembali</Link>
       <h2 className="font-headline font-bold text-2xl md:text-3xl text-primary mb-6">{sectionName}</h2>
       {!isInput ? (
         renderStaticContent()
       ) : status ? (
          <div className="space-y-6">
            <div className="bg-green-50 text-green-700 p-6 md:p-10 rounded-3xl text-center flex flex-col items-center border border-green-200">
              <span className="material-symbols-outlined text-5xl mb-4 text-green-500">check_circle</span>
              <p className="font-bold text-xl mb-4">Jawaban Anda Sudah Terkirim!</p>
              <div className="bg-white p-6 rounded-2xl w-full text-left shadow-sm border border-green-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Jawaban Anda:</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap italic">"{status.content}"</p>
              </div>
            </div>
            {tutorFeedback && (
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4">
                <span className="material-symbols-outlined text-yellow-500 text-4xl">stars</span>
                <div>
                  <p className="font-bold text-yellow-700 mb-1 text-lg">Nilai dari Tutor</p>
                  <p className="text-sm text-yellow-800 mb-3 italic">"{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || 'Tutor telah memberikan penilaian.'}"</p>
                  <div className="flex gap-1 text-yellow-500">
                    {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined fill-1 text-2xl">star</span>)}
                    {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined text-slate-300 text-2xl">star</span>)}
                  </div>
                </div>
              </div>
            )}
          </div>
       ) : (id === '1' || id === '2') && sectionName === "LKPD (Lembar Kerja Peserta Didik)" ? (
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
                  const groupRow = submissions.find(s => s.student_email === 'SYSTEM_GROUP' && s.section_name === 'GENERATED_GROUPS');
                  const groups = groupRow ? JSON.parse(groupRow.content) : null;
                  const myGroup = groups?.find(g => g.members.some(m => m.email === user.email));
                  
                  const submissionId = myGroup 
                    ? `GROUP_LKPD_${id}_${meetingId}_G${myGroup.group_num}`
                    : user.email;

                  const payload = {
                    student_email: submissionId,
                    class_id: id,
                    meeting_num: meetingId,
                    section_name: sectionName,
                    content: `SKOR GAME: ${totalScore} per 100\nJAWABAN KASUS SISWA A: ${caseAnswer}`
                  };
                  
                  await supabase.from('submissions').insert([payload]);
                  setSuccess(true);
                  if (myGroup) alert(`Keren! Hasil kelompok ${myGroup.group_num} berhasil disimpan.`);
                } catch(err) {
                  console.log(err);
                } finally {
                  setLoading(false);
                }
              }}
           />
         </div>
       ) : (
         <form onSubmit={handleSubmit} className="space-y-4">
           <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Tulis jawaban Anda..." className="w-full min-h-[300px] p-6 rounded-2xl border bg-slate-50 focus:bg-white focus:border-primary outline-none transition-all resize-none"></textarea>
           <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary shadow-opacity-20 hover:bg-[#1a2169] transition-all">{loading ? 'Sedang Mengirim...' : 'Kirim Jawaban'}</button>
         </form>
       )}
       <div className="mt-10 pt-6 border-t border-slate-100">
         <Link to={`/class/${id}/meeting/${meetingId}`} className="inline-flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-primary bg-slate-50 hover:bg-primary bg-opacity-5 px-5 py-3 rounded-xl border border-slate-200 hover:border-primary transition-all">
           <span className="material-symbols-outlined text-sm">arrow_back</span> Kembali ke Menu Pembelajaran
         </Link>
       </div>
    </div>
  );
}

function Layout({ user, onLogin, onLogout }) {
  const location = useLocation();
  const isDashboard = location.pathname.includes('tutor-dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fbff] text-slate-800 font-body relative">
      <header className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-lg w-full px-5 py-3 border-b border-slate-100 flex justify-center">
        <div className="flex justify-between items-center w-full max-w-screen-xl">
          <Link to="/" className="flex items-center gap-3">
            <img src="/ut-logo.png" alt="UT Logo" className="w-9 h-auto object-contain" />
            <h1 className="font-headline font-bold text-xl tracking-tight text-primary">E-Learning <span className="text-yellow-500">Bagoes</span></h1>
          </Link>
          {user && (
            <button onClick={onLogout} className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100">Logout</button>
          )}
        </div>
      </header>
      <main className="flex-1 w-full max-w-screen-xl mx-auto mt-4 px-2">
        <Routes>
          <Route path="/" element={<Home navigate={useNavigate()} />} />
          <Route path="/classes" element={<ClassesList />} />
          <Route path="/biodata" element={<Biodata user={user} profileData={user?.profileData || {}} />} />
          <Route path="/edit-biodata" element={<EditBiodata user={user} profileData={user?.profileData || {}} setProfileData={user?.setProfileData} />} />
          <Route path="/login-tutor" element={<LoginTutor onLogin={onLogin} />} />
          <Route path="/tutor-dashboard" element={<DashboardTutor user={user} />} />
          <Route path="/class/:id" element={<Login onLogin={onLogin} />} />
          <Route path="/class/:id/meetings" element={<Meetings user={user} />} />
          <Route path="/class/:id/meeting/:meetingId" element={<ClassMenu user={user} />} />
          <Route path="/class/:id/meeting/:meetingId/section/:sectionName" element={<SectionPage user={user} />} />
        </Routes>
      </main>
      <footer className="w-full text-center py-8 border-t bg-white mt-auto pb-28 md:pb-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <p className="text-slate-500 text-[11px] font-extrabold uppercase tracking-[0.2em] mb-1">Universitas Terbuka</p>
          <p className="text-primary text-xs font-bold uppercase mb-2">Salut Nusa Indah Belitang</p>
          <p className="text-slate-400 text-[10px] font-medium">
            &copy; 2026 Bagoes Panca Wiratama. All rights reserved.
          </p>
        </div>
      </footer>
      {!isDashboard && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white border-t border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
          <Link to="/" className={`flex flex-col items-center flex-1 py-1 ${location.pathname === '/' ? 'text-primary' : 'text-slate-300'}`}>
            <span className="material-symbols-outlined text-[28px]">home</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Beranda</span>
          </Link>
          <Link to={user?.role === 'student' ? `/class/${user.classId}/meetings` : '/classes'} className={`flex flex-col items-center flex-1 py-1 ${location.pathname.startsWith('/class') ? 'text-primary' : 'text-slate-300'}`}>
            <span className="material-symbols-outlined text-[28px]">import_contacts</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Kelas</span>
          </Link>
          <Link to="/biodata" className={`flex flex-col items-center flex-1 py-1 ${location.pathname.startsWith('/biodata') || location.pathname.startsWith('/edit') ? 'text-primary' : 'text-slate-300'}`}>
            <span className="material-symbols-outlined text-[28px]">person</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Biodata</span>
          </Link>
        </nav>
      )}
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('elearning_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (userData) => {
    const studentInfo = STUDENTS.find(s => s.nim === userData.nim || s.email === userData.email);
    const profileData = {
      photo: null,
      fullName: studentInfo ? studentInfo.name : 'Alexander Bagoes',
      email: userData.email,
      nim: userData.nim || '045123987',
      ttl: 'Belitang, 12-05-2004',
      whatsapp: '081234567890',
      prodi: 'PGSD - Bi { " / " } AKP',
      semester: '8',
      pokjar: 'Salut Nusa Indah Belitang'
    };
    const newUser = { ...userData, profileData };
    setUser(newUser);
    localStorage.setItem('elearning_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('elearning_user');
  };

  // Create a version of user that includes the reactive setter for components
  const userWithSetter = user ? {
    ...user,
    setProfileData: (newData) => {
      setUser(prev => {
        const updated = { ...prev, profileData: newData };
        localStorage.setItem('elearning_user', JSON.stringify(updated));
        return updated;
      });
    }
  } : null;

  return (
    <Routes>
      <Route path="*" element={<Layout user={userWithSetter} onLogin={handleLogin} onLogout={handleLogout} />} />
    </Routes>
  );
}
