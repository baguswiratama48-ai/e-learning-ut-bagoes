import React from 'react';
import { Card, SectionHero, InputArea } from './base/BaseComponents';

/**
 * Templat untuk RAT/SAT (Informasi Silabus/Modul)
 */
export const RATSATTemplate = ({ config, content, setContent, handleAction, loading, status }) => {
  const { 
    title, 
    courseCode, 
    courseName, 
    sks, 
    description, 
    capaianUmum,
    capaianKhusus,
    pokokBahasan, 
    evaluationQuestion 
  } = config.content;

  return (
    <div className="space-y-8 md:space-y-12 pb-10 animate-in fade-in duration-700">
      <SectionHero title={title || "Informasi Modul"} category="RAT / SAT" icon="auto_stories" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-indigo-500 mb-2 opacity-50">book</span>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Mata Kuliah</span>
          <p className="font-bold text-slate-800 leading-tight">{courseName || "-"}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-indigo-500 mb-2 opacity-50">qr_code</span>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Kode MK</span>
          <p className="font-bold text-slate-800 leading-tight">{courseCode || "-"}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-indigo-500 mb-2 opacity-50">database</span>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Bobot SKS</span>
          <p className="font-bold text-slate-800 leading-tight">{sks || "-"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 md:gap-12">
        {description && (
          <Card className="p-8 md:p-14 overflow-hidden relative">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-500">description</span>
              Deskripsi Singkat
            </h3>
            <div className="text-slate-600 text-sm md:text-base leading-relaxed font-medium text-justify whitespace-pre-line">
               {description}
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <Card className="p-8 md:p-12 border-l-[12px] border-l-indigo-500">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-500">emoji_events</span>
              Capaian Pembelajaran
            </h3>
            <div className="space-y-8">
              {capaianUmum && (
                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">Capaian Umum</h4>
                  <p className="text-slate-700 text-sm md:text-base font-bold italic leading-relaxed">{capaianUmum}</p>
                </div>
              )}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Capaian Khusus</h4>
                <ul className="space-y-4 text-slate-700 text-sm md:text-base font-semibold">
                  {(capaianKhusus || []).map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 border-opacity-50">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-600">account_tree</span>
              Sub Pokok Bahasan
            </h3>
            <div className="space-y-6">
              {(pokokBahasan || []).map((pb, i) => (
                <div key={i} className={i > 0 ? "pt-6 border-t border-slate-200" : ""}>
                   <h4 className="font-black text-slate-800 text-lg mb-3 flex items-center gap-2">
                     <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                     {pb.title}
                   </h4>
                   <ul className="space-y-3 text-slate-600 text-sm md:text-base font-medium pl-4">
                      {(pb.subs || []).map((sub, si) => (
                        <li key={si} className="flex gap-3 items-center">
                          <span className="w-2 h-2 rounded-sm bg-indigo-200 shrink-0 rotate-45"></span> {sub}
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {evaluationQuestion && (
        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h3 className="text-xl md:text-3xl font-black text-slate-800 mb-4 uppercase tracking-tighter">Ayo Berdiskusi 💬</h3>
            <p className="text-slate-500 text-sm md:text-lg font-medium italic leading-relaxed px-4 italic">"{evaluationQuestion}"</p>
          </div>
          <div className="max-w-2xl mx-auto px-4">
            <InputArea 
              value={content} onChange={setContent} onSave={handleAction}
              loading={loading} status={status} minWords={config.content.minWords || 0}
              placeholder="Tuliskan pemikiran atau jawaban Anda di sini..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Template for Video Evaluation
 */
export const VideoEvalTemplate = ({ config, content, setContent, handleAction, loading, status }) => {
  return (
    <div className="space-y-8 md:space-y-12">
      <Card className="overflow-hidden">
        <div className="aspect-video">
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${config.content.videoId}`} frameBorder="0" allowFullScreen></iframe>
        </div>
      </Card>
      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-14 text-white">
        <h3 className="text-lg md:text-2xl font-black mb-6 text-center">{config.content.evaluationText}</h3>
        <InputArea value={content} onChange={setContent} onSave={handleAction} loading={loading} status={status} minWords={config.content.minWords} />
      </div>
    </div>
  );
};

/**
 * Template for Pertanyaan Pemantik (Slide-based with Sticky Navigation)
 */
export const PemantikTemplate = ({ config, user, status, pemantikAnswers, setPemantikAnswers, handleAction, loading, getPemantikForStudent, meetingId, id }) => {
  const questions = getPemantikForStudent(user.nim || "0", config.content.groups);
  
  const SLIDE_KEY = `pemantik_idx_${user.email}_${id}_${meetingId}`;
  const [activeIdx, setActiveIdx] = React.useState(() => {
    const saved = localStorage.getItem(SLIDE_KEY);
    return saved ? parseInt(saved) : 0;
  });

  React.useEffect(() => {
    localStorage.setItem(SLIDE_KEY, activeIdx.toString());
  }, [activeIdx, SLIDE_KEY]);

  const onSubmit = () => {
    const combined = questions.map((q, i) => `Pertanyaan ${i + 1}: ${q}\nJawaban: ${pemantikAnswers[i] || "-"}`).join("\n\n");
    handleAction(combined);
    localStorage.removeItem(SLIDE_KEY);
  };

  const currentQ = questions[activeIdx];
  const isLast = activeIdx === (questions.length - 1);

  if (!questions || questions.length === 0) return (
    <div className="p-10 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
       <p className="text-slate-400 font-bold">No questions available for this session.</p>
    </div>
  );

  return (
    <div className="pb-32">
      <SectionHero 
        title="Pertanyaan Pemantik"
        subtitle="Analisis kasus di bawah ini untuk mengasah pemahaman Anda."
        category="Guided Reflection"
        icon="tips_and_updates"
        gradient="from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
      />

      {status ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="md:col-span-2 bg-emerald-500 p-8 rounded-[2.5rem] text-white flex items-center gap-6 mb-6">
               <span className="material-symbols-outlined text-4xl">verified</span>
               <div>
                  <h4 className="font-black text-xl uppercase italic">Jawaban Terkirim!</h4>
                  <p className="text-sm opacity-90">Karya Anda telah tercatat di Dasbor Tutor.</p>
               </div>
            </div>
            {questions.map((q, i) => {
              const answersArray = (status?.content || "").split(/\n\n(?=Pertanyaan \d+:)/);
              const myBlock = answersArray.find(a => a?.startsWith(`Pertanyaan ${i+1}:`)) || "";
              const myAns = myBlock.split("\nJawaban: ")[1] || "-";
              return (
                <Card key={i} className="p-8 border-t-4 border-indigo-500">
                  <p className="text-xs font-black text-indigo-400 mb-2 uppercase">Kasus {i+1}</p>
                  <p className="font-black text-slate-800 mb-4 leading-relaxed">{q}</p>
                  <div className="bg-slate-50 p-6 rounded-2xl italic text-slate-600 text-sm">"{myAns}"</div>
                </Card>
              );
            })}
        </div>
      ) : (
        <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Progress Header */}
          <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">{activeIdx + 1}</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kasus dari {questions.length}</span>
             </div>
             <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${((activeIdx + 1) / questions.length) * 100}%` }}></div>
             </div>
          </div>

          {/* Current Question Area */}
          <div className="bg-white border-2 border-slate-100 p-8 md:p-14 rounded-[3rem] shadow-xl shadow-slate-200/50">
             <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-10 leading-relaxed text-left font-headline">
               {currentQ}
             </h3>
             <textarea
               value={pemantikAnswers[activeIdx] || ""}
               onChange={(e) => {
                 const newAns = [...pemantikAnswers];
                 newAns[activeIdx] = e.target.value;
                 setPemantikAnswers(newAns);
               }}
               placeholder="Ketik analisis Anda di sini..."
               className="w-full min-h-[250px] bg-slate-50 border-2 border-slate-50 rounded-[2rem] p-8 text-sm md:text-xl text-slate-700 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none shadow-inner"
             ></textarea>
          </div>

          {/* Sticky Navigation Bar (Footer) */}
          <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
             <div className="max-w-4xl mx-auto flex gap-4">
                {activeIdx > 0 && (
                  <button 
                    onClick={() => setActiveIdx(activeIdx - 1)}
                    className="flex-1 bg-slate-100 text-slate-500 font-black py-5 rounded-2xl hover:bg-slate-200 transition-all text-xs uppercase"
                  >
                    Kembali
                  </button>
                )}
                
                {isLast ? (
                  <button 
                    onClick={onSubmit}
                    disabled={loading}
                    className="flex-[3] bg-emerald-500 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all text-xs uppercase flex items-center justify-center gap-2"
                  >
                    {loading ? "MENGIRIM..." : "KIRIM KE TUTOR"}
                    <span className="material-symbols-outlined text-sm">verified</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => setActiveIdx(activeIdx + 1)}
                    className="flex-[3] bg-slate-900 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-indigo-600 transition-all text-xs uppercase flex items-center justify-center gap-2"
                  >
                    SOAL BERIKUTNYA
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Template for Structured Learning Material
 */
export const MateriTemplate = ({ config, content, setContent, handleAction, loading, status }) => {
  if (!config?.content) return null;
  return (
    <div className="space-y-12 pb-20">
      <SectionHero title={config.content.title || "Materi Pembelajaran"} icon="menu_book" />
      <div className="max-w-5xl mx-auto space-y-20">
        {(config.content.sections || []).map((section, sidx) => (
          <div key={sidx} className="px-4">
            <h3 className="text-2xl md:text-4xl font-black text-slate-800 mb-8">{section.title}</h3>
            {section.description && (
              <div className="bg-slate-50 p-6 rounded-3xl border-l-8 border-slate-300 mb-10 italic text-slate-600">{section.description}</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {(section.points || []).map((pt, pidx) => (
                  <Card key={pidx} className="p-6">
                    <h4 className="font-black text-indigo-600 mb-2 uppercase text-sm">{pt.label}</h4>
                    <p className="text-slate-600 text-sm">{pt.text}</p>
                  </Card>
                ))}
              </div>
              {section.examples && (
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white h-full">
                  <h4 className="font-black text-lg mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-yellow-400">lightbulb</span> Contoh</h4>
                  <div className="space-y-4">
                    {section.examples.map((ex, i) => <p key={i} className="text-sm opacity-90 p-4 bg-white/5 rounded-xl border border-white/10">{ex}</p>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <div className="bg-indigo-600 rounded-[3rem] p-10 text-white text-center">
          <h3 className="text-2xl font-black mb-6">Refleksi Materi</h3>
          <p className="text-white/70 italic mb-8 italic">"{config.content.evaluationQuestion}"</p>
          <InputArea value={content} onChange={setContent} onSave={handleAction} loading={loading} status={status} minWords={config.content.minWords || 20} />
        </div>
      </div>
    </div>
  );
};
