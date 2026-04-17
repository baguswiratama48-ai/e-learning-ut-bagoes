import React, { useState } from "react";
import { REFLECTION_QUESTIONS_DATA } from "../../data/interactiveData";

export default function InteractiveReflection({
  user,
  classId,
  meetingId,
  submissions,
  onComplete,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const questions = REFLECTION_QUESTIONS_DATA[classId] || REFLECTION_QUESTIONS_DATA.default;

  // Periksa apakah refleksi sudah pernah dikerjakan sebelumnya
  const statusRow = (submissions || []).find(
    (s) => s.student_email === user.email && s.section_name === "Refleksi",
  );

  const groupRow = (submissions || []).find(
    (s) =>
      s.student_email === "SYSTEM_GROUP" &&
      s.section_name === "GENERATED_GROUPS" &&
      String(s.meeting_num) === String(meetingId),
  );
  const groups = groupRow ? JSON.parse(groupRow.content) : null;
  const myGroup = groups?.find((g) =>
    g.members.some((m) => m.email === user.email),
  );

  const progress = ((currentIdx + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
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
    const content = questions.map(
      (q, i) => `Pertanyaan ${i + 1}: ${q}\nJawaban: ${answers[i] || "-"}`,
    ).join("\n\n");
    await onComplete(content);
    setLoading(false);
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
                dari {questions.length}
              </span>
            </h4>
          </div>
          <p className={`text-sm font-bold ${classId === "3" ? "text-fuchsia-600" : classId === "4" ? "text-teal-600" : "text-indigo-600"}`}>
            {Math.round(progress)}%
          </p>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${classId === "3" ? "bg-fuchsia-600" : classId === "4" ? "bg-teal-600" : "bg-indigo-600"}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {myGroup && (
        <div className={`bg-white border rounded-[2.5rem] p-6 shadow-sm flex items-center justify-between gap-4 animate-in slide-in-from-top duration-700 ${classId === "3" ? "border-fuchsia-100 ring-8 ring-fuchsia-500/5" : classId === "4" ? "border-teal-100 ring-8 ring-teal-500/5" : "border-indigo-100 ring-8 ring-indigo-500/5"}`}>
            <div className="flex items-center gap-4">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 ${classId === "3" ? "bg-fuchsia-600" : classId === "4" ? "bg-teal-600" : "bg-indigo-600"}`}>
                  <span className="material-symbols-outlined">diversity_3</span>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Kolaborasi Aktif</p>
                  <p className="text-sm font-bold text-slate-700 truncate max-w-[150px] md:max-w-none">Kelompok {myGroup.group_num}</p>
               </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 shrink-0">
               <span className="material-symbols-outlined text-amber-500 text-sm">stars</span>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                  Ketua: <span className="text-slate-800">{myGroup.members.find(m => m.isLeader)?.name || "N/A"}</span>
               </p>
            </div>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 min-h-[450px] flex flex-col relative overflow-hidden">
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${classId === "3" ? "bg-fuchsia-50 text-fuchsia-600" : classId === "4" ? "bg-teal-50 text-teal-600" : "bg-indigo-50 text-indigo-600"}`}>
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed mb-6">
            {classId === "3" && currentIdx === 4 ? (
              <span>
                Bagaimana kesan Anda terhadap bimbingan dan cara penyampaian materi oleh <span className="text-yellow-500 font-black">Bapak Bagus Panca Wiratama, S.Pd., M.Pd.</span> selama tutorial ini? Apa harapan atau saran Anda untuk beliau agar sesi berikutnya semakin luar biasa?
              </span>
            ) : (
              questions[currentIdx]
            )}
          </h3>

          <textarea
            value={answers[currentIdx] || ""}
            onChange={(e) =>
              setAnswers({ ...answers, [currentIdx]: e.target.value })
            }
            placeholder={currentIdx === 4 && classId === "3" ? "Tuliskan kesan & pesan Anda untuk Pak Bagus..." : "Ketik refleksi Anda secara mendalam di sini..."}
            className={`flex-1 min-h-[200px] p-6 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-4 outline-none transition-all resize-none text-slate-700 leading-relaxed font-medium ${classId === "3" ? "focus:border-fuchsia-500 focus:ring-fuchsia-500 focus:ring-opacity-10" : classId === "4" ? "focus:border-teal-500 focus:ring-teal-500 focus:ring-opacity-10" : "focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-10"}`}
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

            {currentIdx === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={loading || !answers[currentIdx]?.trim()}
                className={`w-full md:w-auto px-8 py-3 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${classId === "3" ? "bg-fuchsia-600 hover:bg-fuchsia-700" : classId === "4" ? "bg-teal-600 hover:bg-teal-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {loading ? "MENGIRIM..." : "KIRIM REFLEKSI FINAL"}
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answers[currentIdx]?.trim()}
                className="w-full md:w-auto px-8 py-3 bg-slate-800 text-white rounded-xl font-bold shadow-md hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
