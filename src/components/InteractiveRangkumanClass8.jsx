import React, { useState, useEffect } from "react";

export default function InteractiveRangkumanClass8({ user, classId, meetingId, submissions, onComplete, status }) {
  const draftKey = `rangkuman_draft_8_${user?.email}_${classId}_${meetingId}`;

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return {
      card1: "",
      card2: "",
      card3: ""
    };
  });

  const [activeTab, setActiveTab] = useState("card1");

  useEffect(() => {
    localStorage.setItem(draftKey, JSON.stringify(cards));
  }, [cards, draftKey]);

  // Hitung jumlah kata real
  const countWords = (text) => text.trim().split(/\s+/).filter(word => word.length > 0).length;
  
  const w1 = countWords(cards.card1);
  const w2 = countWords(cards.card2);
  const w3 = countWords(cards.card3);
  const totalWords = w1 + w2 + w3;

  const isLocked = totalWords < 200 || w1 === 0 || w2 === 0 || w3 === 0;

  // Jika sudah kumpul
  if (status) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-200 shadow-md text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-emerald-500 to-emerald-700 opacity-10"></div>
           <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/30 relative">
              <span className="material-symbols-outlined text-5xl text-white">stylus_note</span>
           </div>
           <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Rangkuman Diserahkan!</h2>
           <p className="text-slate-500 font-medium mb-10 leading-relaxed max-w-md mx-auto">
             Jurnal Jurnal Sintesis Terpandu Anda telah berhasil disimpan di dalam Dasbor Tutor untuk dievaluasi kualitatif.
           </p>

           <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner max-w-sm mx-auto">
              <p className="text-emerald-600 font-black text-4xl mb-1">{totalWords || status.content?.match(/TOTAL KATA: (\d+)/)?.[1] || "200+"}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Kata Terangkum</p>
           </div>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (isLocked) return;
    if (!window.confirm("Rangkuman Anda akan dikunci permanen dan dikirim ke Tutor. Lanjutkan?")) return;
    
    const reportText = `[RANGKUMAN MODUL PENGGANTI TEST]\nTOTAL KATA: ${totalWords} Kata\n\n=== BAGIAN 1: Konsep Dasar Bimbingan Konseling ===\n${cards.card1}\n\n=== BAGIAN 2: Karakteristik Siswa SD ===\n${cards.card2}\n\n=== BAGIAN 3: Perkembangan Fisik-Motorik ===\n${cards.card3}`;
    
    onComplete(reportText);
    localStorage.removeItem(draftKey);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Informative Header (CP) */}
      <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-bl-[100%] opacity-50"></div>
         <div className="flex items-center gap-3 mb-4">
             <span className="material-symbols-outlined text-indigo-600 text-3xl">auto_stories</span>
             <h2 className="text-2xl font-black text-slate-800">Jurnal Sintesis Terpandu</h2>
         </div>
         <p className="text-slate-600 mb-6 font-medium leading-relaxed max-w-2xl">
            Tulis ulang materi modul ke dalam bahasamu sendiri untuk mengukur sejauh mana kamu memahami konsep. **Sistem merekam ketikanmu seketika (Auto-Save)**.
         </p>
         
         <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/50">
             <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Capaian Pembelajaran</p>
             <ul className="text-sm text-slate-700 space-y-2 font-medium">
                 <li className="flex items-start gap-2">
                     <span className="text-indigo-400 mt-0.5">•</span> 
                     Menguraikan konsep dasar komponen program layanan bimbingan dan konseling.
                 </li>
                 <li className="flex items-start gap-2">
                     <span className="text-indigo-400 mt-0.5">•</span> 
                     Menganalisis & mengevaluasi tugas perkembangan peserta didik di lingkungan SD.
                 </li>
             </ul>
         </div>
      </div>

      {/* Floating Counter */}
      <div className="sticky top-4 z-20 bg-slate-900/90 backdrop-blur-md rounded-[2rem] p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl shadow-indigo-900/10">
          <div className="flex items-center gap-3 w-full md:w-auto px-4">
             <div className="flex-1">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Ketikan:</span>
                    <span className={`text-lg font-black ${totalWords >= 200 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {totalWords} <span className="text-xs text-slate-500">/ 200 Kata</span>
                    </span>
                 </div>
                 <div className="h-1.5 w-64 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${totalWords >= 200 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${Math.min((totalWords/200)*100, 100)}%`}}></div>
                 </div>
             </div>
          </div>
          <button 
             onClick={handleSubmit}
             disabled={isLocked}
             className={`w-full md:w-auto px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all ${isLocked ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' : 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/25 hover:scale-105 active:scale-95'}`}
          >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              {isLocked ? 'KUMPUL TERKUNCI' : 'KUMPULKAN KE TUTOR'}
          </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-2 bg-slate-100 rounded-3xl overflow-x-auto hide-scrollbar">
          <button 
             onClick={() => setActiveTab("card1")}
             className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'card1' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
              Bagian 1: Konsep Dasar BK
              {w1 > 0 && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
          </button>
          <button 
             onClick={() => setActiveTab("card2")}
             className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'card2' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
              Bagian 2: Karakter Siswa 
              {w2 > 0 && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
          </button>
          <button 
             onClick={() => setActiveTab("card3")}
             className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'card3' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
              Bagian 3: Fisik & Motorik
              {w3 > 0 && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
          </button>
      </div>

      {/* Text Area Card 1 */}
      {activeTab === "card1" && (
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-right-4 duration-300">
             <h3 className="font-black text-lg text-slate-800 mb-2">Konsep & Jenis Layanan BK</h3>
             <p className="text-sm font-medium text-slate-500 mb-6">Uraikan konsep dasar Bimbingan Konseling di Sekolah Dasar beserta jenis-jenis layanannya berdasarkan pemahaman mandiri.</p>
             <textarea 
                value={cards.card1}
                onChange={(e) => setCards({...cards, card1: e.target.value})}
                placeholder="Mulai mengetik rangkuman di sini..."
                className="w-full min-h-[250px] p-6 bg-yellow-50/50 hover:bg-yellow-50 focus:bg-white transition-colors rounded-3xl border border-yellow-200 focus:border-indigo-400 outline-none resize-y text-slate-700 leading-relaxed custom-scrollbar"
             ></textarea>
          </div>
      )}

      {/* Text Area Card 2 */}
      {activeTab === "card2" && (
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-right-4 duration-300">
             <h3 className="font-black text-lg text-slate-800 mb-2">Karakteristik Perkembangan Siswa SD</h3>
             <p className="text-sm font-medium text-slate-500 mb-6">Apa sajakah tugas-tugas perkembangan peserta didik di SD? Uraikan berdasar rujukan yang kamu pelajari.</p>
             <textarea 
                value={cards.card2}
                onChange={(e) => setCards({...cards, card2: e.target.value})}
                placeholder="Mulai mengetik rangkuman di sini..."
                className="w-full min-h-[250px] p-6 bg-pink-50/50 hover:bg-pink-50 focus:bg-white transition-colors rounded-3xl border border-pink-200 focus:border-indigo-400 outline-none resize-y text-slate-700 leading-relaxed custom-scrollbar"
             ></textarea>
          </div>
      )}

      {/* Text Area Card 3 */}
      {activeTab === "card3" && (
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm animate-in slide-in-from-right-4 duration-300">
             <h3 className="font-black text-lg text-slate-800 mb-2">Perkembangan Fisik-Motorik</h3>
             <p className="text-sm font-medium text-slate-500 mb-6">Ceritakan bagaimana kondisi fisik-motorik siswa SD beserta upaya bimbingan pendidik untuk hal tersebut.</p>
             <textarea 
                value={cards.card3}
                onChange={(e) => setCards({...cards, card3: e.target.value})}
                placeholder="Mulai mengetik rangkuman di sini..."
                className="w-full min-h-[250px] p-6 bg-sky-50/50 hover:bg-sky-50 focus:bg-white transition-colors rounded-3xl border border-sky-200 focus:border-indigo-400 outline-none resize-y text-slate-700 leading-relaxed custom-scrollbar"
             ></textarea>
          </div>
      )}

    </div>
  );
}
