import React from 'react';

/**
 * Premium Card with subtle shadow and border
 */
export const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-slate-100 rounded-[2rem] md:rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${className}`}>
    {children}
  </div>
);

/**
 * Specialized Hero for Section Headers
 */
export const SectionHero = ({ title, subtitle, category, icon, gradient = "from-indigo-900 via-[#312e81] to-[#1e1b4b]" }) => (
  <div className={`relative bg-gradient-to-br ${gradient} rounded-[2rem] md:rounded-[4rem] p-8 md:p-14 overflow-hidden shadow-2xl border border-white border-opacity-10 mb-8 md:mb-12`}>
    <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-[0.05] rounded-full -mr-40 -mt-40 blur-[120px]"></div>
    <div className="relative z-10">
      {category && (
        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 border border-white/10">
          <span className="material-symbols-outlined text-sm md:text-base">{icon || 'auto_stories'}</span> {category}
        </span>
      )}
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline font-black text-white mb-4 leading-tight tracking-tighter">
        {title}
      </h1>
      {subtitle && (
        <p className="text-white/60 text-sm md:text-lg font-medium max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

/**
 * Mobile-responsive Input Area with Word Counter
 */
export const InputArea = ({ 
  value, 
  onChange, 
  placeholder, 
  minWords = 0, 
  label = "Ketik jawaban Anda disini...",
  loading = false,
  onSave,
  status = null 
}) => {
  const wordCount = value.trim() ? value.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
  const isEnough = wordCount >= minWords;

  if (status) {
    return (
      <Card className="bg-slate-900 border-white/5 p-8 md:p-14 text-white">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          <span className="material-symbols-outlined text-[14px]">verified</span> Terkirim
        </div>
        <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-[2rem] border border-white/10">
          <p className="text-sm md:text-lg text-slate-100 leading-relaxed font-serif italic text-justify">
            "{status.content}"
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-[2.2rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="relative w-full min-h-[250px] md:min-h-[400px] bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-10 text-sm md:text-base text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none font-medium leading-relaxed text-justify shadow-inner"
        ></textarea>
        <div className="absolute bottom-6 right-8 flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
          <p className={`text-[10px] font-black tracking-widest ${isEnough ? "text-emerald-600" : "text-slate-400"}`}>
            {wordCount} {minWords > 0 ? `/ ${minWords}` : ""} KATA
          </p>
          {isEnough ? (
            <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse"></div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">info</span> Jawaban disimpan otomatis sebagai draft
        </p>
        <button
          onClick={() => onSave(value)}
          disabled={loading || !isEnough}
          className="w-full md:w-auto min-w-[250px] bg-slate-900 text-white font-black py-4 px-10 rounded-2xl hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-xl flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
        >
          {loading ? "MENGIRIM..." : "KIRIM SEKARANG"}
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </div>
    </div>
  );
};
