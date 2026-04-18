import React, { useState, useEffect } from "react";

export default function RangkumanClass6A({ user, classId, meetingId, submissions, onComplete, status }) {
  const draftKey = `rangkuman_draft_6a_${user?.email}_${classId}_${meetingId}`;

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return { card1: "", card2: "", card3: "", card4: "", card5: "" };
  });

  const [activeTab, setActiveTab] = useState("card1");

  // Auto-save ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem(draftKey, JSON.stringify(cards));
  }, [cards, draftKey]);

  const countWords = (text) => text.trim().split(/\s+/).filter(w => w.length > 0).length;

  const w1 = countWords(cards.card1);
  const w2 = countWords(cards.card2);
  const w3 = countWords(cards.card3);
  const w4 = countWords(cards.card4);
  const w5 = countWords(cards.card5);
  const totalWords = w1 + w2 + w3 + w4 + w5;

  // Semua bagian harus diisi dan total minimal 200 kata
  const isLocked = totalWords < 200 || w1 === 0 || w2 === 0 || w3 === 0 || w4 === 0 || w5 === 0;

  // Jika sudah dikumpulkan
  if (status) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700 mt-10">
        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-200 shadow-md text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 to-indigo-700 opacity-10"></div>
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-500/30 relative">
            <span className="material-symbols-outlined text-5xl text-white">stylus_note</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Rangkuman Diserahkan!</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed max-w-md mx-auto">
            Jurnal Sintesis Terpandu ABK Anda telah berhasil disimpan di Dasbor Tutor untuk dievaluasi.
          </p>
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner max-w-sm mx-auto">
            <p className="text-indigo-600 font-black text-4xl mb-1">
              {status.content?.match(/TOTAL KATA: (\d+)/)?.[1] || totalWords || "200+"}
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Kata Terangkum</p>
          </div>
          <div className="mt-8 bg-white border border-slate-100 rounded-3xl p-6 max-w-2xl mx-auto text-left">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Rekap Rangkuman Anda:</p>
            <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed font-serif">{status.content}</div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (isLocked) return;
    if (!window.confirm("Rangkuman Anda akan dikunci permanen dan dikirim ke Tutor. Lanjutkan?")) return;

    const reportText = `[RANGKUMAN MATERI ABK - KELAS 6A]\nTOTAL KATA: ${totalWords} Kata\n\n=== BAGIAN 1: Anak Dengan Gangguan Autism ===\n${cards.card1}\n\n=== BAGIAN 2: Anak Penyandang ADD/ADHD ===\n${cards.card2}\n\n=== BAGIAN 3: Anak Penyandang ODD ===\n${cards.card3}\n\n=== BAGIAN 4: Anak Penyandang Intellectual Disability (ID) ===\n${cards.card4}\n\n=== BAGIAN 5: Anak Dengan Down Syndrom (DS) ===\n${cards.card5}`;

    onComplete(reportText);
    localStorage.removeItem(draftKey);
  };

  const tabs = [
    { key: "card1", label: "Autism", w: w1, color: "text-rose-600", bg: "bg-rose-50/50", border: "border-rose-200", hint: "Uraikan pengertian, penyebab, karakteristik, dan strategi penanganan anak dengan gangguan Autism." },
    { key: "card2", label: "ADD/ADHD", w: w2, color: "text-orange-600", bg: "bg-orange-50/50", border: "border-orange-200", hint: "Uraikan pengertian, karakteristik, penyebab, dan penanganan anak penyandang ADD/ADHD." },
    { key: "card3", label: "ODD", w: w3, color: "text-amber-600", bg: "bg-amber-50/50", border: "border-amber-200", hint: "Uraikan pengertian, karakteristik, penyebab, dan penanganan anak penyandang ODD." },
    { key: "card4", label: "Intellectual Disability", w: w4, color: "text-indigo-600", bg: "bg-indigo-50/50", border: "border-indigo-200", hint: "Uraikan pengertian, klasifikasi, karakteristik, penyebab, dan strategi penanganan anak dengan ID." },
    { key: "card5", label: "Down Syndrom", w: w5, color: "text-teal-600", bg: "bg-teal-50/50", border: "border-teal-200", hint: "Uraikan pengertian, penyebab, karakteristik, dan strategi penanganan anak dengan Down Syndrom." },
  ];

  const activeTabData = tabs.find(t => t.key === activeTab);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 mt-10 pb-20">

      {/* Header */}
      <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-bl-[100%] opacity-50"></div>
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-indigo-600 text-3xl">auto_stories</span>
          <h2 className="text-2xl font-black text-slate-800">Jurnal Sintesis Terpandu ABK</h2>
        </div>
        <p className="text-slate-600 mb-6 font-medium leading-relaxed max-w-2xl">
          Tulis ulang materi ABK ke dalam bahasamu sendiri untuk mengukur pemahaman Anda terhadap setiap kategori anak berkebutuhan khusus.
        </p>
        <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/50">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Capaian Pembelajaran</p>
          <ul className="text-sm text-slate-700 space-y-2 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">•</span>
              Mengidentifikasi karakteristik dan jenis-jenis ABK secara komprehensif.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">•</span>
              Menganalisis strategi penanganan yang tepat untuk setiap kategori ABK.
            </li>
          </ul>
        </div>
      </div>

      {/* Floating Counter + Submit */}
      <div className="sticky top-4 z-20 bg-slate-900/90 backdrop-blur-md rounded-[2rem] p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 w-full md:w-auto px-4">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Kata:</span>
              <span className={`text-lg font-black ${totalWords >= 200 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {totalWords} <span className="text-xs text-slate-500">/ 200 Kata</span>
              </span>
            </div>
            <div className="h-1.5 w-full md:w-64 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${totalWords >= 200 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                style={{ width: `${Math.min((totalWords / 200) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLocked}
          className={`w-full md:w-auto px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all ${
            isLocked
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 hover:scale-105 active:scale-95'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">publish</span>
          {isLocked ? 'SELESAIKAN SEMUA BAGIAN' : 'KUMPULKAN KE TUTOR'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-2 bg-slate-100 rounded-3xl overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === tab.key ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label.split(" ")[0]}
            {tab.w > 0 && <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>}
          </button>
        ))}
      </div>

      {/* Active Card */}
      {activeTabData && (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-right-4 duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-black text-lg ${activeTabData.color}`}>
              Bagian {tabs.indexOf(activeTabData) + 1}: {activeTabData.label}
            </h3>
            <span className="text-xs font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {activeTabData.w} kata
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-6">{activeTabData.hint}</p>
          <textarea
            value={cards[activeTab]}
            onChange={(e) => setCards({ ...cards, [activeTab]: e.target.value })}
            placeholder="Mulai mengetik rangkuman di sini..."
            className={`w-full min-h-[280px] p-6 ${activeTabData.bg} focus:bg-white transition-colors rounded-3xl border ${activeTabData.border} focus:border-indigo-400 outline-none resize-y text-slate-700 leading-relaxed`}
          ></textarea>
          <div className="mt-3 flex items-center gap-2 text-slate-400">
            <span className="material-symbols-outlined !text-[12px]">save</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Draft tersimpan otomatis di perangkat Anda</span>
          </div>
        </div>
      )}
    </div>
  );
}
