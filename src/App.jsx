import { useState, useEffect, Fragment, useMemo, lazy, Suspense } from "react";
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

// Components
import { StaticContentRenderer } from "./components/StaticContentRenderer";
import InteractiveQuiz from "./components/interactive/InteractiveQuiz";
import InteractiveMindMap from "./components/interactive/InteractiveMindMap";
import InteractiveReflection from "./components/interactive/InteractiveReflection";

// Data & Hooks
import { STUDENTS } from "./data/students";
import { CLASSES, MENUS, FEEDBACK_MESSAGES } from "./data/constants";
import { getSessionConfig, getAllAvailableSessions } from "./data/sessions";
import { useDraft } from "./hooks/useDraft";
import { getPemantikForStudent } from "./utils/helpers";
import { DashboardTutor as DashboardUI } from "./components/DashboardTutor";


// Global configurations and modular components are imported above.


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
function TutorDashboardPage({ user }) {
  const [submissions, setSubmissions] = useState([]);
  const [moduleContent, setModuleContent] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error("Supabase fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "tutor") {
      fetchData();
    }
  }, [user]);

  if (!user || user.role !== "tutor") return <Navigate to="/" />;

  return (
    <DashboardUI 
      submissions={submissions}
      setSubmissions={setSubmissions}
      moduleContent={moduleContent}
      fetchData={fetchData}
      loading={loading}
    />
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
        {(() => {
          let visibleMenus = [...MENUS];
          const isSesi2BK = (id === "1" || id === "2") && meetingId === "2";

          // Request: RAT/SAT, Pertanyaan Pemantik, Materi Pembelajaran, Video Pembelajaran, LKM, Quiz, Rangkuman, Refleksi
          if (isSesi2BK) {
            visibleMenus = [
              "Informasi Modul",
              "Pertanyaan Pemantik",
              "Materi Pembelajaran",
              "Video Pembelajaran",
              "Ayo Diskusi (LKPD)",
              "Kuis dan Latihan",
              "Rangkuman",
              "Refleksi",
              "Pembagian Kelompok"
            ];
          }

          return visibleMenus.map((baseMenu, i) => {
            let menu = baseMenu;
            let label = baseMenu;

            if (isSesi2BK) {
              if (menu === "Informasi Modul") label = "RAT/SAT";
              if (menu === "Ayo Diskusi (LKPD)") label = "LKM (Lembar Kerja Mahasiswa)";
              if (menu === "Kuis dan Latihan") label = "Quiz";
            }

            // Global mapping for Peta Konsep
            if (menu === "Peta Konsep" && isSesi2BK) return null;

            let iconName = "edit_document";
            let colorClass = "bg-blue-50 text-blue-600";

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
            } else if (menu === "Ayo Diskusi (LKPD)") {
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
                key={`${menu}-${i}`}
                to={`/class/${id}/meeting/${meetingId}/section/${encodeURIComponent(menu)}`}
                className="group bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-primary border-opacity-30 hover:shadow-2xl hover:shadow-primary shadow-opacity-10 transition-all duration-300 text-center flex flex-col items-center relative overflow-hidden active:scale-95"
              >
                <div className={`w-16 h-16 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-500 flex items-center justify-center mb-4 shadow-sm relative z-10`}>
                  <span className="material-symbols-outlined text-[32px]">{iconName}</span>
                </div>
                <p className="font-bold text-slate-700 group-hover:text-primary text-[13px] md:text-sm leading-tight transition-colors relative z-10">
                  {label}
                </p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary bg-opacity-5 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            );
          });
        })()}
      </div>
    </div>
  );
}

function SectionPage({ user }) {
  const { id, meetingId, sectionName } = useParams();
  const cls = CLASSES.find((c) => c.id === id);
  const courseCode = cls?.title.split("|")[0].trim();

  // Integrated useDraft for auto-save functionality
  const [content, setContent] = useDraft(`draft_${user?.email}_${id}_${meetingId}_${sectionName}`, "");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [pemantikAnswers, setPemantikAnswers] = useState(Array((id === "1" || id === "2") ? 6 : 3).fill(""));
  const [tutorFeedback, setTutorFeedback] = useState(null);

  const isInput = [
    "Tugas",
    "Catatan",
    "LKPD",
    "Latihan",
    "Kuis",
    "Refleksi",
    "Rangkuman",
    "Pertanyaan",
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
        ...(id === "4" ? ["LKPD_5A_STAGE_1", "LKPD_5A_STAGE_2", "LKPD_5A_STAGE_3", "LKPD_5A_STAGE_4"] : [])
      ];

      // Fetch personal answers + system-generated groups + everyone's LKPD for class 6A cross-visibility
      let query = supabase
        .from("submissions")
        .select("*")
        .eq("class_id", id)
        .eq("meeting_num", meetingId)
        .in("section_name", [...sectionNamesToFetch, "GENERATED_GROUPS", "DISCUSSION_LKPD"]);
        
      if (!((id === "3" || id === "4") && sectionName === "LKPD (Lembar Kerja Peserta Didik)")) {
        query = query.or(`student_email.eq.${user.email},student_email.eq.SYSTEM_GROUP`);
      }

      const { data } = await query;

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

  function renderStaticContent() {
    try {
      return (
        <StaticContentRenderer
          sectionName={sectionName}
          id={String(id)}
          meetingId={String(meetingId)}
          user={user}
          status={status}
          tutorFeedback={tutorFeedback}
          content={content}
          setContent={setContent}
          loading={loading}
          handleAction={handleAction}
          pemantikAnswers={pemantikAnswers}
          setPemantikAnswers={setPemantikAnswers}
          getPemantikForStudent={getPemantikForStudent}
          cls={cls}
          courseCode={courseCode}
          submissions={submissions}
        />
      );
    } catch (err) {
      console.error("Renderer Failure:", err);
      return <div className="p-10 bg-red-50 text-red-500 rounded-3xl">Gagal memuat konten. Mohon refresh halaman.</div>;
    }
  }


  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-24">
      <div className="flex items-center gap-3 mb-8">
        <Link
          to={`/class/${id}/meeting/${meetingId}`}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div>
          <h2 className="font-headline font-black text-2xl text-slate-800 leading-tight">{sectionName}</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Pertemuan {meetingId} • {courseCode}
          </p>
        </div>
      </div>

      {!isInput || (["3", "4"].includes(id) && ["LKPD (Lembar Kerja Peserta Didik)", "Kuis dan Latihan"].includes(sectionName)) ? (
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
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4">
              <span className="material-symbols-outlined text-yellow-500 text-4xl">stars</span>
              <div>
                <p className="font-bold text-yellow-700 mb-1 text-lg">Nilai dari Tutor</p>
                <p className="text-sm text-yellow-800 mb-1 italic">
                  "{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || tutorFeedback.content}"
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (id === "1" || id === "2") && sectionName === "LKPD (Lembar Kerja Peserta Didik)" ? (
        <div className="space-y-4">
          <InteractiveMindMap
            user={user}
            classId={id}
            meetingId={meetingId}
            submissions={submissions}
            onComplete={async (totalScore, caseAnswer) => {
              setLoading(true);
              try {
                const payload = {
                  student_email: user.email,
                  class_id: id,
                  meeting_num: meetingId,
                  section_name: sectionName,
                  content: `SKOR GAME: ${totalScore} per 100\nJAWABAN KASUS SISWA A: ${caseAnswer}`,
                };
                await supabase.from("submissions").insert([payload]);
                setSuccess(true);
                alert("Luar biasa! Laporan individu Anda berhasil dikirim.");
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
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4">
              <span className="material-symbols-outlined text-yellow-500 text-4xl">stars</span>
              <div>
                <p className="font-bold text-yellow-700 mb-1 text-lg">Nilai dari Tutor</p>
                <p className="text-sm text-yellow-800 mb-1 italic">
                  "{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || tutorFeedback.content}"
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (id === "1" || id === "2") && sectionName === "Rangkuman" ? (
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <span className="material-symbols-outlined text-sm">assignment</span> Tugas Rangkuman
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">Buatlah Rangkuman Modul 1</h3>
              <div className="bg-rose-500 bg-opacity-10 border border-rose-500 border-opacity-30 p-4 rounded-2xl flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-rose-500 animate-pulse">block</span>
                <p className="text-sm font-black text-rose-400 uppercase tracking-tighter">Jangan Menggunakan AI!!</p>
              </div>
            </div>
          </div>
          {status ? (
            <div className="bg-green-50 border border-green-200 p-8 rounded-[3rem] text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-5xl text-green-500 mb-4">verified</span>
              <h4 className="text-xl font-black text-slate-800 mb-2">Rangkuman Berhasil Dikirim</h4>
              <div className="bg-white p-8 rounded-3xl w-full text-left shadow-sm border border-green-100 max-w-2xl mt-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Isi Rangkuman Anda:</p>
                <p className="text-sm text-slate-700 leading-relaxed italic text-justify whitespace-pre-wrap">"{status.content}"</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ketik rangkuman Anda di sini... (Harap ketik manual, jangan copy-paste hasil AI)"
                  className="w-full min-h-[400px] bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 md:p-10 text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-primary outline-none transition-all leading-relaxed text-justify shadow-inner"
                ></textarea>
                <div className="absolute bottom-6 right-8 flex items-center gap-2 bg-white bg-opacity-80 backdrop-blur-md px-4 py-2 rounded-2xl border shadow-sm">
                  <p className={`text-xs font-black tracking-tighter transition-colors ${content.trim().split(/\s+/).filter(w => w.length > 0).length >= 200 ? "text-green-600" : "text-slate-400"}`}>
                    {content.trim().split(/\s+/).filter(w => w.length > 0).length} / 200 KATA
                  </p>
                  {content.trim().split(/\s+/).filter(w => w.length > 0).length >= 200
                    ? <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    : <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse"></div>
                  }
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
                  className="w-full md:w-auto min-w-[280px] bg-primary text-white font-black py-5 px-10 rounded-2xl hover:bg-[#1a2169] hover:scale-105 active:scale-95 transition-all disabled:opacity-30 shadow-xl flex items-center justify-center gap-3 order-1 md:order-2"
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
        <div className="bg-green-50 text-green-700 p-6 md:p-10 rounded-3xl text-center flex flex-col items-center border border-green-200">
          <span className="material-symbols-outlined text-5xl mb-4 text-green-500">check_circle</span>
          <p className="font-bold text-xl mb-2">Jawaban Anda Sudah Terkirim!</p>
          <p className="text-sm font-medium opacity-70">Jawaban sedang ditinjau oleh Tutor.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis jawaban Anda..."
            className="w-full min-h-[300px] p-6 rounded-2xl border bg-slate-50 focus:bg-white focus:border-primary outline-none transition-all resize-none"
          ></textarea>
          <button
            onClick={() => handleAction(content)}
            disabled={loading || !content.trim()}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary shadow-opacity-20 hover:bg-[#1a2169] transition-all"
          >
            {loading ? "Sedang Mengirim..." : "Kirim Jawaban"}
          </button>
        </div>
      )}

      {/* Universal Tutor Feedback Display */}
      {tutorFeedback && (
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 p-6 md:p-8 rounded-3xl flex items-center gap-5 shadow-sm animate-in fade-in duration-500">
          <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-yellow-500 text-3xl">stars</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-yellow-700 mb-1 text-lg uppercase tracking-tight">Nilai dari Tutor</p>
            <p className="text-sm text-yellow-800 font-semibold italic leading-relaxed">
              "{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || tutorFeedback.content}"
            </p>
          </div>
        </div>
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
            element={<TutorDashboardPage user={user} />}
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
