import { useState, useEffect } from 'react'
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
  "Nama Mata Kuliah", "Informasi Modul", "Pertanyaan Pemantik",
  "Materi Pembelajaran", "Tugas dan Catatan", "Video Pembelajaran",
  "LKPD (Lembar Kerja Peserta Didik)", "Kuis dan Latihan",
  "Refleksi", "Rangkuman"
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

const getPemantikForStudent = (nim) => {
  const n = parseInt(nim.replace(/\D/g, '')) || 0;
  return PEMANTIK_GROUPS.map((group, gi) => group[(n + gi) % group.length]);
};

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
              <div className="w-px h-5 bg-white/40"></div>
              <span className="text-white/60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-3 rounded-xl text-xs text-center shadow">
              Mahasiswa mampu menilai, mengevaluasi, membuat pelaporan dan tindak lanjut layanan BK di SD.
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-5 bg-white/40"></div>
              <span className="text-white/60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-3 rounded-xl text-xs text-center shadow">
              Mahasiswa mampu melaksanakan program bimbingan dan konseling (BK) di SD.
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-5 bg-white/40"></div>
              <span className="text-white/60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-3 rounded-xl text-xs text-center shadow">
              Mahasiswa mampu merencanakan program bimbingan dan konseling di SD.
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="w-px h-5 bg-white/40"></div>
              <span className="text-white/60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-3 rounded-xl text-xs text-center shadow">
              Mahasiswa mampu menguraikan konsep teknik asesmen dan mampu memanfaatkan data hasil asesmen kebutuhan peserta didik di SD.
            </div>
            <div className="w-full flex flex-col items-center py-1">
              <div className="w-px h-4 bg-white/40"></div>
              <div className="w-3/4 h-px bg-white/40"></div>
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
              <div className="w-3/4 h-px bg-white/40"></div>
              <div className="w-px h-4 bg-white/40"></div>
              <span className="text-white/60 material-symbols-outlined text-base -mt-1">arrow_drop_up</span>
            </div>
            <div className="w-full bg-[#1a4a6e] text-white p-4 rounded-2xl text-xs text-center shadow-lg ring-2 ring-yellow-400/40">
              Mahasiswa mampu menguraikan konsep dasar (pengertian, hakikat, tujuan, prinsip, asas, bidang, dan komponen program layanan Bimbingan dan Konseling (BK) di SD).
            </div>
          </div>
          <p className="text-[9px] text-center text-white/40 mt-6 italic">Sumber: Bahan Ajar SPGK4307 Universitas Terbuka</p>
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

      <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
        <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">rocket_launch</span> Mulai Belajar
        </h3>
        <p className="text-sm text-slate-600 mb-6">Akses modul pembelajaran dan kerjakan tugas tepat waktu.</p>
        <Link to="/classes" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20">
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
          <Link key={c.id} to={`/class/${c.id}`} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group flex items-center justify-between relative overflow-hidden">
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
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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

        <button type="submit" className="w-full bg-primary hover:bg-[#1a2169] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/25 mt-4">
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
      <Link to="/" className="inline-flex items-center text-primary font-bold mb-8 hover:underline bg-primary-fixed/30 px-3 py-1 rounded-full text-sm">
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
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
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
      <Link to="/" className="inline-flex items-center text-primary font-bold mb-8 hover:underline bg-primary-fixed/30 px-3 py-1 rounded-full text-sm">
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
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
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
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');
  const [unlocking, setUnlocking] = useState(null);

  if (!user || user.role !== 'tutor') return <Navigate to="/" />;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('submissions').select('*');
      if (error) throw error;
      setSubmissions(data || []);
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

  const handleStarFeedback = async (studentEmail, classId, sectionName, stars) => {
    try {
      await supabase.from('submissions')
        .delete()
        .eq('student_email', studentEmail)
        .eq('section_name', `TUTOR_FEEDBACK_${sectionName}`);
      await supabase.from('submissions').insert([{
        student_email: studentEmail,
        class_id: classId,
        meeting_num: '1',
        section_name: `TUTOR_FEEDBACK_${sectionName}`,
        content: String(stars)
      }]);
      await fetchData();
    } catch(err) {
      console.log(err);
    }
  };


  const CLASS_TABS = [
    { id: '1', label: 'Kelas 8B' },
    { id: '2', label: 'Kelas 8C' },
    { id: '3', label: 'Kelas 6A' },
    { id: '4', label: 'Kelas 5A' },
    { id: 'demo', label: 'Demo' },
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
                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                : 'bg-white border border-slate-200 text-slate-500 hover:border-primary hover:text-primary'
            }`}
          >
            {tab.label}
            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100'}`}>
              {tab.id === 'demo' ? '1' : STUDENTS.filter(s => s.classId === tab.id && s.email !== 'demo@ecampus.ut.ac.id').length}
            </span>
          </button>
        ))}
        <button onClick={fetchData} className="ml-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary text-sm font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">refresh</span> Refresh
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-20 bg-slate-50">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-slate-400 font-bold">Memuat Data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-primary text-white uppercase tracking-wider font-bold">
                  <th className="px-4 py-4 w-10 text-center border-r border-white/10">No</th>
                  <th className="px-4 py-4 border-r border-white/10">Mahasiswa</th>
                  <th className="px-4 py-4 text-center border-r border-white/10">Status Baca (Identitas)</th>
                  <th className="px-4 py-4 border-r border-white/10 text-center">Jumlah Jawaban Mhs</th>
                  <th className="px-4 py-4 text-center">Aksi Tutor</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {studentList.map((student, index) => {
                  const studentSubs = submissions.filter(s => s.student_email === student.email);
                  const readMark = studentSubs.find(s => s.section_name === "Nama Mata Kuliah" && s.content.includes("READ_CONFIRMED"));
                  const unlockKeyRead = `${student.email}_Nama Mata Kuliah`;
                  
                  // Filter out "Nama Mata Kuliah" and "TUTOR_FEEDBACK" rows to get pure answers
                  const actualAnswers = studentSubs.filter(s => s.section_name !== "Nama Mata Kuliah" && !s.section_name.startsWith("TUTOR_FEEDBACK_"));

                  return (
                    <React.Fragment key={index}>
                      <tr className={index % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/50 hover:bg-slate-50'}>
                        <td className="px-4 py-4 font-bold text-slate-400 text-center border-r">{index + 1}</td>
                        <td className="px-4 py-4 border-r">
                          <p className="font-bold text-slate-800 uppercase leading-none mb-1">{student.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium tracking-tighter">{student.nim} • {student.email}</p>
                        </td>
                        <td className="px-4 py-4 text-center border-r max-w-[120px]">
                          {readMark ? (
                            <div className="inline-flex flex-col items-center">
                              <span className="material-symbols-outlined text-green-500 text-[20px]">verified</span>
                              <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">Selesai Membaca</p>
                            </div>
                          ) : (
                            <span className="text-[9px] font-bold text-slate-300 uppercase">Belum Membaca</span>
                          )}
                          {readMark && (
                            <button
                              onClick={() => handleUnlock(student.email, "Nama Mata Kuliah")}
                              disabled={unlocking === unlockKeyRead}
                              className="block mt-2 mx-auto text-[8px] font-bold px-2 py-1 rounded-md bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 disabled:opacity-50"
                            >
                              {unlocking === unlockKeyRead ? '...' : '🔓 Reset'}
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-4 border-r text-center">
                           <span className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
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
                                       <div key={i} className="bg-white border rounded-xl p-4 shadow-sm relative group hover:border-primary/30 transition-all flex flex-col justify-between">
                                         <div>
                                           <div className="flex justify-between items-start mb-2">
                                             <p className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded inline-block">{secName}</p>
                                             <button
                                               onClick={() => handleUnlock(student.email, secName)}
                                               disabled={isUnlocking}
                                               className="text-[9px] text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded px-1.5 py-0.5 font-bold transition-all disabled:opacity-30"
                                               title="Hapus jawaban agar mahasiswa bisa mengulang"
                                             >
                                               {isUnlocking ? '...' : '🔓 Reset/Hapus'}
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
                                                        <p className="text-[10px] font-medium text-slate-700 italic border-l-2 border-primary/20 pl-1.5 leading-snug">"{parts[1] || '-'}"</p>
                                                      </div>
                                                    );
                                                  })}
                                               </div>
                                             ) : (
                                               <p className="text-[11px] font-medium text-slate-700 italic max-h-[120px] overflow-y-auto custom-scrollbar pr-1">"{answer.content}"</p>
                                             )}
                                           </div>
                                         </div>
                                         
                                         <div className="pt-2 border-t flex justify-between items-center">
                                           <p className="text-[9px] font-bold text-slate-400 uppercase">Nilai Anda:</p>
                                           <div className="flex gap-0.5">
                                             {[1,2,3,4,5].map(star => (
                                               <button
                                                 key={star}
                                                 onClick={() => handleStarFeedback(student.email, student.classId, secName, star)}
                                                 className={`text-[20px] transition-transform hover:scale-125 ${
                                                   star <= curStars ? 'text-yellow-400 drop-shadow-sm' : 'text-slate-200'
                                                 }`}
                                               >
                                                 <span className="material-symbols-outlined fill-1 text-[18px]">star</span>
                                               </button>
                                             ))}
                                           </div>
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
                    </React.Fragment>
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
      <div className="flex items-center gap-3 mb-6 bg-primary-fixed/30 p-4 rounded-2xl border border-primary/10">
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
        <p className="text-white/60 text-sm">Pilih modul yang ingin Anda pelajari atau kerjakan sekarang.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {MENUS.map((menu, i) => (
          <Link key={i} to={`/class/${id}/meeting/${meetingId}/section/${encodeURIComponent(menu)}`} className="bg-white p-5 rounded-2xl border border-slate-100 hover:bg-primary group transition-all shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-white/20 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-primary group-hover:text-white">edit_document</span>
            </div>
            <p className="font-bold text-slate-700 group-hover:text-white text-xs md:text-sm leading-tight">{menu}</p>
          </Link>
        ))}
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
  const [pemantikAnswers, setPemantikAnswers] = useState(['', '', '']);
  const [tutorFeedback, setTutorFeedback] = useState(null);

  const isInput = ["Tugas", "Catatan", "LKPD", "Latihan", "Kuis", "Refleksi"].some(p => sectionName?.includes(p));

  useEffect(() => {
    setStatus(null);
    setTutorFeedback(null);
    if (!user) return;
    const fetchStatus = async () => {
      // If we are looking for Pertanyaan Pemantik, fetch that and its tutor feedback
      const sectionNamesToFetch = sectionName === "Pertanyaan Pemantik" 
        ? [sectionName, "TUTOR_FEEDBACK_Pemantik"] 
        : [sectionName];

      const { data } = await supabase
        .from('submissions')
        .select('*')
        .eq('student_email', user.email)
        .eq('class_id', id)
        .eq('meeting_num', meetingId)
        .in('section_name', sectionNamesToFetch);
        
      if (data && data.length > 0) {
        const _status = data.find(d => d.section_name === sectionName);
        const _feedback = data.find(d => d.section_name === "TUTOR_FEEDBACK_Pemantik");
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
      if (!error && data && data.length > 0) setStatus(data[0]);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'student') return <Navigate to={`/class/${id}`} />;

  const renderStaticContent = () => {
    if (sectionName === "Nama Mata Kuliah") {
      return (
        <div className="space-y-8">
          <div className="bg-primary/5 p-10 rounded-3xl text-center border border-primary/10">
            <span className="material-symbols-outlined text-5xl text-primary mb-4">school</span>
            <h3 className="font-headline font-bold text-2xl text-slate-800">{cls?.title}</h3>
          </div>
          
          <div className="bg-white border p-6 rounded-2xl shadow-sm text-center">
            {status ? (
              <div className="text-green-600 font-bold flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
                <p>Mata Kuliah Sudah Dikonfirmasi</p>
                <div className="flex gap-1 text-yellow-400">
                  {Array(5).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined fill-1">star</span>)}
                </div>
                <p className="text-[10px] text-slate-400 font-medium italic mt-2">Feedback bintang 5 otomatis terkirim ke Tutor</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-500 mb-4 font-medium">Klik tombol di bawah untuk menginformasikan ke tutor bahwa Anda sudah membaca dan memahami identitas mata kuliah ini.</p>
                <button 
                  onClick={() => handleAction("[LOG: READ_CONFIRMED_5_STARS]")}
                  disabled={loading}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Mengirim...' : 'Tandai Sudah Membaca'}
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    if (sectionName === "Informasi Modul" && COURSE_DATA[courseCode]?.[sectionName]) {
      return (
        <div className="space-y-10">
          {COURSE_DATA[courseCode][sectionName]}
          
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400 uppercase tracking-tighter flex items-center gap-2">
              <span className="material-symbols-outlined">quiz</span> Pertanyaan Verifikasi
            </h4>
            <p className="text-sm mb-6 leading-relaxed font-medium">Sebutkan Judul 6 Modul yang ada di Mata Kuliah SPGK4307 | Bimbingan Konseling di SD</p>
            
            {status ? (
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <p className="text-[10px] text-white/50 uppercase font-bold mb-2">Jawaban Anda:</p>
                  <p className="text-sm italic">"{status.content}"</p>
                  <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">verified</span> Terkirim ke Tutor
                  </div>
                </div>
                {tutorFeedback && (
                  <div className="bg-yellow-400 p-4 rounded-xl text-slate-900 border border-yellow-500 flex items-center gap-3">
                    <span className="material-symbols-outlined text-yellow-700 text-3xl">stars</span>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Feedback Tutor</p>
                      <div className="flex gap-0.5">
                        {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined fill-1 text-slate-900">star</span>)}
                        {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined text-yellow-600/50">star</span>)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <textarea 
                  value={content} 
                  onChange={e => setContent(e.target.value)}
                  placeholder="Ketik jawaban Anda di sini..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-sm focus:bg-white/10 focus:border-yellow-400 outline-none min-h-[120px]"
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
        </div>
      );
    }

    if (sectionName === "Pertanyaan Pemantik" && (cls?.classId === '1' || cls?.classId === '2' || ['1','2'].includes(id))) {
      const questions = getPemantikForStudent(user.nim || '0');
      const allAnswered = pemantikAnswers.every(a => a.trim().length > 0);
      const combinedContent = questions.map((q, i) => `Pertanyaan ${i+1}: ${q}\nJawaban: ${pemantikAnswers[i]}`).join('\n\n');

      return (
        <div className="space-y-6">
          <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
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
              
              {tutorFeedback && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-yellow-500 text-3xl">stars</span>
                  <div>
                    <p className="font-bold text-yellow-700 mb-1">Feedback Tutor</p>
                    <div className="flex text-yellow-500">
                      {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined fill-1">star</span>)}
                      {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined text-slate-300">star</span>)}
                    </div>
                  </div>
                </div>
              )}

              {questions.map((q, i) => (
                <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-primary uppercase mb-2">Pertanyaan {i + 1}</p>
                  <p className="text-sm font-medium text-slate-700 mb-3">{q}</p>
                  <div className="bg-slate-50 p-3 rounded-xl border-l-4 border-primary/30">
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
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-[#1a2169] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Mengirim...' : !allAnswered ? 'Lengkapi Semua Jawaban Terlebih Dahulu' : 'Kirim Semua Jawaban'}
              </button>
            </div>
          )}
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
       {status ? (
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
                  <div className="flex gap-1 text-yellow-500">
                    {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined fill-1 text-2xl">star</span>)}
                    {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined text-slate-300 text-2xl">star</span>)}
                  </div>
                </div>
              </div>
            )}
          </div>
       ) : isInput ? (
         <form onSubmit={handleSubmit} className="space-y-4">
           <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Tulis jawaban Anda..." className="w-full min-h-[300px] p-6 rounded-2xl border bg-slate-50 focus:bg-white focus:border-primary outline-none transition-all resize-none"></textarea>
           <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-[#1a2169] transition-all">{loading ? 'Sedang Mengirim...' : 'Kirim Jawaban'}</button>
         </form>
       ) : (
         renderStaticContent()
       )}
       <div className="mt-10 pt-6 border-t border-slate-100">
         <Link to={`/class/${id}/meeting/${meetingId}`} className="inline-flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-primary bg-slate-50 hover:bg-primary/5 px-5 py-3 rounded-xl border border-slate-200 hover:border-primary transition-all">
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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg w-full px-5 py-3 border-b border-slate-100 flex justify-center">
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
      prodi: 'PGSD - Bi / AKP',
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
