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

const MENUS = [
  "Beranda", "Nama Mata Kuliah", "Informasi Modul", "Pertanyaan Pemantik",
  "Materi Pembelajaran", "Tugas dan Catatan", "Video Pembelajaran",
  "LKPD (Lembar Kerja Peserta Didik)", "Kuis dan Latihan", "Glosarium",
  "Refleksi", "Rangkuman"
];

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
              <span className="text-slate-400 text-sm">Pokjar</span>
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
          <label className="block text-sm font-bold text-slate-700 mb-1">Pokjar</label>
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
    onLogin({ email, nim, role: 'student', classId: id });
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user || user.role !== 'tutor') return <Navigate to="/" />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: submissions, error } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setData(submissions || []);
      } catch (err) {
        console.log("Supabase fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-8 min-h-[70vh] px-4">
      <h2 className="font-headline font-bold text-3xl text-primary mb-2">Dasbor Tutor</h2>
      <p className="text-slate-500 mb-8 font-medium">Monitoring hasil pengerjaan mahasiswa.</p>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-10">Memuat data...</div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4">Mahasiswa</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4">Sesi</th>
                  <th className="py-3 px-4">Isi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx} className="border-b transition-colors hover:bg-slate-50">
                    <td className="py-3 px-4 text-xs text-slate-400">{new Date(item.created_at).toLocaleString()}</td>
                    <td className="py-3 px-4 font-bold">{item.student_email}</td>
                    <td className="py-3 px-4 text-xs">{CLASSES.find(c => c.id == item.class_id)?.title || item.class_id}</td>
                    <td className="py-3 px-4">P{item.meeting_num}</td>
                    <td className="py-3 px-4 truncate max-w-[200px]">{item.content}</td>
                  </tr>
                ))}
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
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user || user.role !== 'student') return <Navigate to={`/class/${id}`} />;

  const isInput = ["Tugas", "Catatan", "LKPD", "Latihan", "Kuis", "Refleksi"].some(p => sectionName.includes(p));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await supabase.from('submissions').insert([{
        student_email: user.email, class_id: id, meeting_num: meetingId, section_name: sectionName, content
      }]);
      setSuccess(true);
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
       {success ? (
         <div className="bg-green-50 text-green-700 p-10 rounded-3xl text-center flex flex-col items-center">
           <span className="material-symbols-outlined text-5xl mb-4 text-green-500">check_circle</span>
           <p className="font-bold text-xl">Jawaban Berhasil Dikirim!</p>
           <button onClick={() => setSuccess(false)} className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl font-bold">Kirim Lagi</button>
         </div>
       ) : isInput ? (
         <form onSubmit={handleSubmit} className="space-y-4">
           <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Tulis jawaban Anda..." className="w-full min-h-[300px] p-6 rounded-2xl border bg-slate-50 focus:bg-white focus:border-primary outline-none transition-all"></textarea>
           <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20">{loading ? 'Sedang Mengirim...' : 'Kirim Jawaban'}</button>
         </form>
       ) : (
         <div className="bg-blue-50 p-10 rounded-3xl text-center text-slate-400 font-medium">Baca instruksi modul untuk bagian ini.</div>
       )}
    </div>
  )
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
          <p className="text-primary text-xs font-bold uppercase mb-2">Pokjar Nusa Indah Belitang</p>
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
          <Link to="/classes" className={`flex flex-col items-center flex-1 py-1 ${location.pathname.startsWith('/class') ? 'text-primary' : 'text-slate-300'}`}>
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
  const [user, setUser] = useState(null);
  
  // Custom setter for profile data to keep it reactive within the user object
  const setProfileData = (newData) => {
    setUser(prev => ({ ...prev, profileData: newData }));
  };

  const handleLogin = (userData) => {
    // Initialize default profile data on login
    setUser({ 
      ...userData, 
      setProfileData,
      profileData: {
        photo: null,
        fullName: 'Alexander Bagoes',
        email: userData.email,
        nim: userData.nim || '045123987',
        ttl: 'Belitang, 12-05-2004',
        whatsapp: '081234567890',
        prodi: 'PGSD - Bi / AKP',
        semester: '8',
        pokjar: 'Nusa Indah Belitang'
      }
    });
  };

  const handleLogout = () => setUser(null);

  // Wrap the entire app to pass down auth states correctly
  return (
    <Routes>
      <Route path="*" element={<Layout user={user} onLogin={handleLogin} onLogout={handleLogout} />} />
    </Routes>
  );
}
