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
function DashboardTutor({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [submissions, setSubmissions] = useState([]);
  const [moduleContent, setModuleContent] = useState([]);
  const [unlocking, setUnlocking] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState("1");
  const [groupCount, setGroupCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm("");
  }, [activeTab]);

  const handleUnlock = async (studentEmail, sectionName) => {
    const key = `${studentEmail}_${sectionName}`;
    setUnlocking(key);
    try {
      let deleteQuery = supabase
        .from("submissions")
        .delete()
        .eq("student_email", studentEmail);
        
      if (activeTab === "4" && (sectionName.startsWith("LKPD_5A_STAGE_") || sectionName === "LKPD (Lembar Kerja Peserta Didik)")) {
        deleteQuery = deleteQuery.or(`section_name.ilike.LKPD_5A_STAGE_%,section_name.eq."LKPD (Lembar Kerja Peserta Didik)"`);
      } else {
        deleteQuery = deleteQuery.eq("section_name", sectionName);
      }
      
      await deleteQuery;

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
        const groupIndex = index % groupCount;
        groups[groupIndex].members.push({
          nim: student.nim,
          name: student.name,
          email: student.email,
          isLeader: groups[groupIndex].members.length === 0, // First person becomes leader by default
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

      // Delete old if exists for this meeting (using robust filters)
      const { error: deleteError } = await supabase
        .from("submissions")
        .delete()
        .eq("student_email", "SYSTEM_GROUP")
        .eq("class_id", String(activeTab))
        .eq("meeting_num", String(selectedMeeting));

      if (deleteError) throw deleteError;

      const { error: insertError } = await supabase.from("submissions").insert([payload]);
      if (insertError) throw insertError;

      alert(
        `Berhasil mengacak ${classStudents.length} mahasiswa ke dalam ${groupCount} kelompok untuk Pertemuan ${selectedMeeting}!`,
      );
      await fetchData();
    } catch (err) {
      console.error("DEBUG_GENERATE:", err);
      alert(`Gagal mengacak kelompok: ${err.message || "Unknown Error"}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleSetLeader = async (groupNum, newLeaderEmail) => {
    if (!activeTab || activeTab === "record_m1") return;
    setGenerating(true);
    try {
      const systemGroupRow = submissions.find(
        (s) =>
          s.student_email === "SYSTEM_GROUP" &&
          String(s.class_id) === String(activeTab) &&
          String(s.meeting_num) === String(selectedMeeting),
      );
      if (!systemGroupRow) return;

      const groups = JSON.parse(systemGroupRow.content);
      const groupToUpdate = groups.find((g) => g.group_num === groupNum);
      if (groupToUpdate) {
        groupToUpdate.members.forEach((m) => {
          m.isLeader = m.email === newLeaderEmail;
        });
      }

      const { error: updateError } = await supabase
        .from("submissions")
        .update({ content: JSON.stringify(groups) })
        .eq("id", systemGroupRow.id);

      if (updateError) throw updateError;

      await fetchData();
      alert("Berhasil memperbarui Ketua Kelompok! Jawaban Ketua kini tayang di Pusat Diskusi.");
    } catch (err) {
      console.error("DEBUG_LEADER:", err);
      alert(`Gagal memperbarui Ketua: ${err.message || "Unknown Error"}`);
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
  ];


  const studentList = (() => {
    let filtered = STUDENTS.filter(
      (s) => s.classId === activeTab && s.email !== "demo@ecampus.ut.ac.id",
    );
    if (activeTab === "demo") {
      filtered = STUDENTS.filter((s) => s.email === "demo@ecampus.ut.ac.id").slice(
        0,
        1,
      );
    }

    // 1. Search Filter
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.nim.includes(searchTerm),
      );
    }

    // 2. Sorting A-Z
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  })();

  const totalPages = Math.ceil(studentList.length / pageSize);
  const paginatedStudents = studentList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

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
            {(activeTab === "1" || activeTab === "2" || activeTab === "3" || activeTab === "4") && (
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
                      Hasil pengerjaan {activeTab === "4" ? "Misi Explorer" : "Mind Map & Studi Kasus"} per tim (Sesi{" "}
                      {selectedMeeting})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(() => {
                    const groupSubs = submissions.filter(
                      (s) =>
                        String(s.class_id) === String(activeTab) &&
                        String(s.meeting_num) === String(selectedMeeting) &&
                        s.student_email.startsWith("GROUP_LKPD_"),
                    );

                    // Temukan sistem grup untuk tahu total kelompok seharusnya
                    const systemGroupRow = submissions.find(
                      (s) =>
                        s.student_email === "SYSTEM_GROUP" &&
                        String(s.class_id) === String(activeTab) &&
                        String(s.meeting_num) === String(selectedMeeting),
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
                          String(s.class_id) === String(activeTab) &&
                          String(s.meeting_num) === String(selectedMeeting) &&
                          (s.section_name === "LKPD (Lembar Kerja Peserta Didik)" || s.section_name === "LKPD_6A_DISCUSSION" || s.section_name.startsWith("LKPD_5A_STAGE_")) &&
                          members.some((m) => m.email === s.student_email),
                      );

                      const uniqueEmails = new Set(memberSubs.map(s => s.student_email));
                      const isEveryoneDone =
                        members.length > 0 &&
                        uniqueEmails.size === members.length;
                      const averageScore = isEveryoneDone
                        ? (activeTab === "3" || activeTab === "4" 
                            ? 100 
                            : Math.round(
                                memberSubs.reduce((acc, s) => {
                                  const score = parseInt(
                                    (s.content.match(
                                      new RegExp("SKOR GAME: (\\d+)"),
                                    ) || [])[1] || "0",
                                  );
                                  return acc + score;
                                }, 0) / members.length,
                              ))
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
                                      let deleteQuery = supabase
                                        .from("submissions")
                                        .delete()
                                        .eq("class_id", activeTab)
                                        .eq("meeting_num", selectedMeeting)
                                        .in("student_email", emailsToDelete);
                                        
                                      if (activeTab === "4") {
                                        deleteQuery = deleteQuery.ilike("section_name", "LKPD_5A_STAGE_%");
                                      } else {
                                        deleteQuery = deleteQuery.eq("section_name", "LKPD (Lembar Kerja Peserta Didik)");
                                      }
                                      
                                      await deleteQuery;
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
                                {uniqueEmails.size} / {members.length} Terkirim
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
                                  let score = null;
                                  if (sub) {
                                    if (activeTab === "3") {
                                      score = "SELESAI";
                                    } else if (activeTab === "4") {
                                      const mStages = memberSubs.filter(s => s.student_email === m.email).map(s => {
                                         const match = s.section_name.match(/STAGE_(\d+)/);
                                         return match ? parseInt(match[1]) : 0;
                                      });
                                      const maxStage = Math.max(0, ...mStages);
                                      score = maxStage === 4 ? "TUNTAS" : maxStage > 0 ? `MISI ${maxStage}` : null;
                                    } else {
                                      score = (sub.content.match(
                                        new RegExp("SKOR GAME: (\\d+)"),
                                      ) || [])[1] || "0";
                                    }
                                  }

                                  return (
                                    <div
                                      key={mi}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => handleSetLeader(g.group_num, m.email)}
                                          disabled={generating}
                                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${m.isLeader ? 'bg-yellow-400 text-white shadow-sm ring-2 ring-yellow-400 ring-offset-1' : 'bg-slate-200 text-slate-400 hover:bg-yellow-100 hover:text-yellow-500'}`}
                                          title={m.isLeader ? "Ketua Kelompok (Hak Posting Topik)" : "Jadikan Ketua Kelompok"}
                                        >
                                          <span className="material-symbols-outlined text-[12px] font-black">{m.isLeader ? 'stars' : 'star'}</span>
                                        </button>
                                        <p className={`text-xs font-bold truncate max-w-[120px] ${m.isLeader ? 'text-slate-800' : 'text-slate-600'}`}>
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
                                  const content = activeTab === "4" 
                                    ? memberSubs.map(s => `[${s.section_name}]\n${s.content}`).join("\n\n---\n\n")
                                    : memberSubs[0].content;
                                  alert(
                                    `REFERENSI JAWABAN (Awal):\n\n${content}`,
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
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    person
                  </span>
                  <h3 className="text-lg font-headline font-black text-slate-800">
                    Daftar Mahasiswa (Individu)
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input
                      type="text"
                      placeholder="Cari nama atau NIM..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:border-primary outline-none transition-all w-full md:w-64"
                    />
                  </div>

                  {/* Page Size Selector */}
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Per Baris:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(parseInt(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="bg-transparent text-xs font-bold outline-none cursor-pointer text-primary"
                    >
                      {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
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
                  {paginatedStudents.map((student, index) => {
                    const studentSubs = submissions.filter(
                      (s) => s.student_email === student.email,
                    );
                    // Filter out "TUTOR_FEEDBACK" rows to get pure answers
                    const actualAnswers = studentSubs.filter(
                      (s) => !s.section_name.startsWith("TUTOR_FEEDBACK_") && String(s.meeting_num) === String(selectedMeeting),
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
                            {(currentPage - 1) * pageSize + index + 1}
                          </td>
                          <td className="px-4 py-4 border-r">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="font-bold text-slate-800 uppercase leading-none mb-1">
                                  {student.name}
                                </p>
                                <p className="text-[10px] text-slate-400 font-medium tracking-tighter">
                                  {student.nim} • {student.email}
                                </p>
                              </div>
                              {activeTab === "4" && (() => {
                                const mStages = studentSubs.filter(s => s.section_name.startsWith("LKPD_5A_STAGE_")).map(s => {
                                   const match = s.section_name.match(/STAGE_(\d+)/);
                                   return match ? parseInt(match[1]) : 0;
                                });
                                const maxStage = Math.max(0, ...mStages);
                                if (maxStage === 0) return null;
                                return (
                                  <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase flex items-center gap-1 ${maxStage === 4 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                    <span className="material-symbols-outlined text-[12px]">{maxStage === 4 ? 'verified' : 'pending'}</span>
                                    {maxStage === 4 ? 'Tuntas' : `Misi ${maxStage}`}
                                  </div>
                                );
                              })()}
                            </div>
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
                                              {secName === "Kuis dan Latihan" ? (() => {
                                                const scoreMatch = answer.content?.match(/SKOR AKHIR: (\d+)/);
                                                const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
                                                const filled = answer.content?.match(/Terisi: (\d+) dari/)?.[1];
                                                const isPassed = score !== null && score >= 70;
                                                return score !== null ? (
                                                  <div className="flex items-center gap-3">
                                                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 ${isPassed ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                                      <span className="text-white font-black text-lg leading-none">{score}</span>
                                                      <span className="text-white text-[8px] font-bold opacity-80">/ 100</span>
                                                    </div>
                                                    <div>
                                                      <p className={`font-black text-sm ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                        {isPassed ? '✓ LULUS' : '✗ TIDAK LULUS'}
                                                      </p>
                                                      <p className="text-[10px] text-slate-400">Kuis 20 Soal • Terisi: {filled || '?'}/20 soal</p>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <p className="text-xs text-slate-500 italic">{answer.content}</p>
                                                );
                                              })() : secName === "Pertanyaan Pemantik" ? (
                                                <div className="max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
                                                  {answer.content
                                                    .split(/\n\n(?=Pertanyaan \d+:|---|\[Kasus \d+\])/)
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
                                                              /Pertanyaan \d+:\s/g,
                                                              `Q${bi + 1}: `,
                                                            ).replace(/\[Kasus \d+\]\nKonteks: /g, `KASUS ${bi + 1}: `).replace(/^---\n/, '')}
                                                          </p>
                                                          <p className="text-[10px] font-medium text-slate-700 italic border-l-2 border-primary border-opacity-20 pl-1.5 leading-snug whitespace-pre-wrap">
                                                            "{parts[1] || "-"}"
                                                          </p>
                                                        </div>
                                                      );
                                                    })}
                                                </div>
                                              ) : (
                                                <div className="text-[13px] font-bold text-slate-800 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
                                                  {(() => {
                                                    try {
                                                      const parsed = JSON.parse(answer.content);
                                                      
                                                      // Case A: Komentar Diskusi / Chat (Paling Sering Membuat Pusing)
                                                      if (parsed.text) {
                                                        return (
                                                          <div className="p-4 bg-primary bg-opacity-5 rounded-2xl border-l-4 border-primary">
                                                            <span className="material-symbols-outlined text-primary text-sm mb-2 block">format_quote</span>
                                                            <p className="leading-relaxed text-slate-700">"{parsed.text}"</p>
                                                            {parsed.targetGroupNum && (
                                                              <p className="text-[9px] font-black text-primary uppercase mt-3 tracking-widest bg-white px-2 py-0.5 rounded-full w-fit">
                                                                Target: Kelompok {parsed.targetGroupNum}
                                                              </p>
                                                            )}
                                                          </div>
                                                        );
                                                      }

                                                      // Case B: Hasil Misi / Pengerjaan Bertahap (Kelas 5A)
                                                      if (parsed.answers) {
                                                        return (
                                                          <div className="space-y-2">
                                                            {Object.entries(parsed.answers).map(([key, val], idx) => (
                                                              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 group/ans hover:bg-white hover:shadow-sm transition-all">
                                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{key.replace('mission', 'Misi ').replace('_', ' : ')}</p>
                                                                <p className="font-semibold text-slate-700 italic leading-snug">
                                                                  {typeof val === 'object' ? JSON.stringify(val) : val}
                                                                </p>
                                                              </div>
                                                            ))}
                                                          </div>
                                                        );
                                                      }

                                                      // Fallback JSON (Prettified but small)
                                                      return (
                                                        <div className="opacity-40 hover:opacity-100 transition-opacity">
                                                           <pre className="text-[9px] bg-slate-100 p-2 rounded-lg overflow-x-auto">
                                                              {JSON.stringify(parsed, null, 2)}
                                                           </pre>
                                                        </div>
                                                      );
                                                    } catch (e) {
                                                      // Bukan JSON atau Gagal Parse - Tampilkan langsung
                                                      return <p className="italic leading-relaxed text-slate-600 font-medium">"{answer.content}"</p>;
                                                    }
                                                  })()}
                                                </div>
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
                                                  "{FEEDBACK_MESSAGES[curStars]}"
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
                  {paginatedStudents.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-12 text-slate-300 font-bold"
                      >
                        {searchTerm ? "Tidak ada mahasiswa yang cocok dengan pencarian." : "Belum ada data mahasiswa untuk kelas ini."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Halaman <span className="text-primary">{currentPage}</span> dari <span className="text-slate-800">{totalPages}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.max(1, prev - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-white hover:text-primary hover:border-primary disabled:opacity-30 transition-all font-headline"
                    >
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                      Kembali
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.min(totalPages, prev + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-4 py-2 bg-slate-900 border border-slate-900 rounded-xl text-[10px] font-black uppercase text-white hover:bg-black disabled:opacity-30 transition-all font-headline"
                    >
                      Selanjutnya
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              )}
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
        {MENUS.map((baseMenu, i) => {
          let menu = baseMenu;
          if (menu === "Informasi Modul" && (id === "1" || id === "2") && meetingId === "2") {
            menu = "RAT/SAT";
          }

          let icon = "edit_document";
          let colorClass = "bg-blue-50 text-blue-600";
          let iconName = "edit_document";

          if (menu === "Informasi Modul" || menu === "RAT/SAT") {
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
    return (
      <StaticContentRenderer
        sectionName={sectionName}
        id={id}
        meetingId={meetingId}
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
        COURSE_DATA={COURSE_DATA}
        submissions={submissions}
      />
    );
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
