import React, { useState, useEffect } from "react";
import { MIND_MAP_DATA, STUDY_CASE_STAGES } from "../../data/interactiveData";

export default function InteractiveMindMap({
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
  const [isLandscape, setIsLandscape] = useState(true);
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
      s.section_name === "GENERATED_GROUPS" &&
      String(s.meeting_num) === String(meetingId),
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
      setSelectedItem(null);
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
              {challengeStep + 1} / {STUDY_CASE_STAGES.length}
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
