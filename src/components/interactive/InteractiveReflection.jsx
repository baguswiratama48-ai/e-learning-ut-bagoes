import React, { useState, useEffect } from "react";
import { REFLECTION_QUESTIONS_DATA } from "../../data/interactiveData";

export default function InteractiveReflection({
  user,
  classId,
  meetingId,
  submissions,
  onComplete,
}) {
  const draftKey = `refleksi_draft_${user?.email}_${classId}_${meetingId}`;
  
  const [currentIdx, setCurrentIdx] = useState(() => {
     const saved = localStorage.getItem(draftKey + '_idx');
     return saved ? parseInt(saved, 10) : 0;
  });
  
  const [answers, setAnswers] = useState(() => {
     const saved = localStorage.getItem(draftKey + '_answers');
     if (saved) {
         try { return JSON.parse(saved); } catch (e) {}
     }
     return {};
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      localStorage.setItem(draftKey + '_idx', currentIdx);
  }, [currentIdx, draftKey]);

  useEffect(() => {
      localStorage.setItem(draftKey + '_answers', JSON.stringify(answers));
  }, [answers, draftKey]);

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
    localStorage.removeItem(draftKey + '_idx');
    localStorage.removeItem(draftKey + '_answers');
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

  // Question Decorator to make it more "Friendly & Professional"
  const getQuestionDecoration = (idx) => {
    const q = questions[idx] || "";
    if (q.includes("makanan")) return { icon: "restaurant", color: "text-orange-500", bg: "bg-orange-50" };
    if (q.includes("film")) return { icon: "movie", color: "text-purple-500", bg: "bg-purple-50" };
    if (q.includes("nyantol")) return { icon: "lightbulb", color: "text-yellow-500", bg: "bg-yellow-50" };
    if (q.includes("Oh ternyata gitu")) return { icon: "auto_awesome", color: "text-blue-500", bg: "bg-blue-50" };
    if (q.includes("guru")) return { icon: "school", color: "text-emerald-500", bg: "bg-emerald-50" };
    if (q.includes("emoji")) return { icon: "mood", color: "text-pink-500", bg: "bg-pink-50" };
    if (q.includes("Satu kata")) return { icon: "sell", color: "text-cyan-500", bg: "bg-cyan-50" };
    if (q.includes("sederhana")) return { icon: "eco", color: "text-green-500", bg: "bg-green-50" };
    if (q.includes("adik kelas")) return { icon: "group", color: "text-teal-500", bg: "bg-teal-50" };
    if (q.includes("Bagus")) return { icon: "favorite", color: "text-rose-500", bg: "bg-rose-50" };
    return { icon: "psychology", color: "text-indigo-500", bg: "bg-indigo-50" };
  };

  const decor = getQuestionDecoration(currentIdx);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Progress Header */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
              Refleksi Sesi {meetingId}
            </p>
            <h4 className="font-black text-2xl text-slate-800">
               Pesan & Kesan 
               <span className="text-slate-300 ml-2 font-medium">
                 ({currentIdx + 1}/{questions.length})
               </span>
            </h4>
          </div>
          <p className="text-lg font-black text-indigo-600">
            {Math.round(progress)}%
          </p>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-indigo-500 to-purple-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {myGroup && (
        <div className="bg-white border border-indigo-100 ring-8 ring-indigo-500/5 rounded-[2.5rem] p-6 shadow-sm flex items-center justify-between gap-4 animate-in slide-in-from-top duration-700">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 bg-indigo-600 shadow-lg shadow-indigo-200">
                  <span className="material-symbols-outlined">diversity_3</span>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Kolaborasi Aktif</p>
                  <p className="text-sm font-bold text-slate-700">Kelompok {myGroup.group_num}</p>
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
      <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[500px] flex flex-col relative overflow-hidden transition-all duration-500">
        <div className={`absolute top-0 right-0 w-64 h-64 ${decor.bg} rounded-bl-full opacity-20 -mr-20 -mt-20 transition-all duration-700`}></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-4 mb-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${decor.bg} ${decor.color} transition-all duration-500`}>
              <span className="material-symbols-outlined text-3xl">{decor.icon}</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-100 to-transparent"></div>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-8">
            {currentIdx === 9 ? (
              <span>
                Apa yang ingin Anda sampaikan untuk <span className="text-indigo-600 underline decoration-yellow-400 decoration-4 underline-offset-8">Bapak Bagus Panca Wiratama, S.Pd., M.Pd?</span>
              </span>
            ) : (
              questions[currentIdx]
            )}
          </h3>

          {/* Interactive Scale 1-10 for Question 3 (index 2) */}
          {currentIdx === 2 && (
            <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in zoom-in duration-500">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    const currentText = answers[currentIdx] || "";
                    // Regex to check if it already starts with "SKALA: X -"
                    const cleanText = currentText.replace(/^SKALA: \d+ - /, "");
                    setAnswers({ ...answers, [currentIdx]: `SKALA: ${num} - ${cleanText}` });
                  }}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-black transition-all ${
                    (answers[currentIdx] || "").startsWith(`SKALA: ${num} -`)
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110"
                      : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}

          {/* Interactive Emojis for Question 6 (index 5) */}
          {currentIdx === 5 && (
            <div className="flex gap-4 mb-6 animate-in fade-in zoom-in duration-500">
              {["😊", "😵", "😴", "🔥"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    const currentText = answers[currentIdx] || "";
                    const cleanText = currentText.replace(/^EMOJI: .*? - /, "");
                    setAnswers({ ...answers, [currentIdx]: `EMOJI: ${emoji} - ${cleanText}` });
                  }}
                  className={`text-3xl md:text-4xl p-4 rounded-2xl transition-all ${
                    (answers[currentIdx] || "").startsWith(`EMOJI: ${emoji} -`)
                      ? "bg-pink-100 scale-110 shadow-md ring-2 ring-pink-400"
                      : "bg-slate-50 hover:bg-slate-100 grayscale-[0.5] hover:grayscale-0"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <textarea
            value={(answers[currentIdx] || "")
              .replace(/^SKALA: \d+ - /, "")
              .replace(/^EMOJI: .*? - /, "")}
            onChange={(e) => {
               const val = e.target.value;
               const prefixMatch = (answers[currentIdx] || "").match(/^(SKALA: \d+ - |EMOJI: .*? - )/);
               const prefix = prefixMatch ? prefixMatch[0] : "";
               setAnswers({ ...answers, [currentIdx]: prefix + val });
            }}
            placeholder={
              currentIdx === 2 ? "Berikan alasan kenapa kamu memilih angka tersebut..." :
              currentIdx === 5 ? "Jelaskan kenapa perasaanmu seperti itu hari ini..." :
              "Tuangkan pikiranmu di sini secara santai dan jujur..."
            }
            className="flex-1 min-h-[220px] p-8 rounded-[2rem] border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none text-slate-700 text-lg leading-relaxed font-medium placeholder:text-slate-300 shadow-inner"
          ></textarea>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-10 pt-8 border-t border-slate-50">
            <button
              onClick={handleBack}
              disabled={currentIdx === 0}
              className="w-full md:w-auto px-8 py-4 rounded-2xl font-black text-slate-400 border border-transparent hover:bg-slate-50 hover:text-slate-600 disabled:opacity-0 transition-all flex items-center justify-center gap-2 tracking-widest text-xs"
            >
              <span className="material-symbols-outlined text-sm font-black">arrow_back_ios</span>
              KEMBALI
            </button>

            {currentIdx === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={loading || !answers[currentIdx]?.trim()}
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
              >
                {loading ? "MENGIRIM..." : "SELESAI & KUMPUL"}
                <span className="material-symbols-outlined text-xl">verified</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answers[currentIdx]?.trim()}
                className="w-full md:w-auto px-12 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                LANJUTKAN
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
