import React from 'react';
import { Card, SectionHero, InputArea } from './base/BaseComponents';

/**
 * Templat untuk RAT/SAT (Informasi Silabus/Modul)
 */
export const RATSATTemplate = ({ config, content, setContent, handleAction, loading, status }) => {
  if (!config?.content) return null;
  const { title, courseCode, courseName, sks, description, capaianUmum, capaianKhusus, capaian, pokokBahasan, evaluationQuestion } = config.content;
  
  // Support for legacy "capaian" field used in Sesi 1
  const displayCapaian = capaianKhusus || capaian || [];

  return (
    <div className="space-y-6 md:space-y-12 pb-10 animate-in fade-in duration-500">
      <SectionHero title={title || "Informasi Modul"} category="RAT / SAT" icon="auto_stories" />

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Mata Kuliah', val: courseName, icon: 'book' },
          { label: 'Kode MK', val: courseCode, icon: 'qr_code' },
          { label: 'SKS', val: sks, icon: 'database' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-indigo-500 mb-1 opacity-40 text-sm">{item.icon}</span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.label}</span>
            <p className="font-bold text-slate-800 text-sm leading-tight">{item.val || "-"}</p>
          </div>
        ))}
      </div>

      <Card className="p-6 md:p-12">
        <h3 className="text-lg md:text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-500 text-xl">description</span>
          Deskripsi
        </h3>
        <p className="text-slate-600 text-xs md:text-base leading-relaxed text-justify whitespace-pre-line font-medium">{description}</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-l-8 border-l-indigo-500">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-500 text-xl">emoji_events</span>
            Target Belajar
          </h3>
          {capaianUmum && (
            <div className="bg-indigo-50 p-4 rounded-xl mb-6">
              <p className="text-slate-700 text-xs md:text-sm font-bold italic">{capaianUmum}</p>
            </div>
          )}
          <ul className="space-y-3">
            {displayCapaian.map((item, i) => (
              <li key={i} className="flex gap-3 text-xs md:text-sm font-semibold text-slate-600">
                <span className="material-symbols-outlined text-indigo-500 text-sm">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
          <h3 className="text-lg font-black text-slate-800 mb-4 tracking-tight">Materi Pokok</h3>
          {(pokokBahasan || []).map((pb, i) => (
            <div key={i} className="mb-6 last:mb-0">
               <h4 className="font-bold text-slate-800 text-sm mb-2">{pb.title}</h4>
               <ul className="space-y-1.5 pl-4">
                  {(pb.subs || []).map((sub, si) => (
                    <li key={si} className="text-[11px] md:text-sm text-slate-500 flex gap-2 items-center italic font-medium">
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span> {sub}
                    </li>
                  ))}
               </ul>
            </div>
          ))}
        </div>
      </div>

      {evaluationQuestion && (
        <div className="pt-10 border-t border-slate-100 text-center">
          <h3 className="text-lg md:text-2xl font-black text-slate-800 mb-4">Ayo Berdiskusi💬</h3>
          <p className="text-slate-500 text-xs md:text-lg italic px-4 mb-8">"{evaluationQuestion}"</p>
          <div className="max-w-xl mx-auto">
            <InputArea value={content} onChange={setContent} onSave={handleAction} loading={loading} status={status} />
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
    <div className="space-y-6 md:space-y-12">
      <Card className="overflow-hidden bg-black">
        <div className="aspect-video">
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${config.content.videoId}`} frameBorder="0" allowFullScreen></iframe>
        </div>
      </Card>
      <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-12 text-white text-center">
        <h3 className="text-base md:text-xl font-bold mb-6">{config.content.evaluationText}</h3>
        <InputArea value={content} onChange={setContent} onSave={handleAction} loading={loading} status={status} minWords={config.content.minWords} />
      </div>
    </div>
  );
};

/**
 * Template for Pertanyaan Pemantik (Mobile Optimized)
 */
export const PemantikTemplate = ({ config, user, status, pemantikAnswers, setPemantikAnswers, handleAction, loading, getPemantikForStudent, meetingId, id }) => {
  // Support for legacy "questions" array if "groups" is missing (used in Sesi 1)
  const questions = config.content.groups 
    ? getPemantikForStudent(user.nim || "0", config.content.groups)
    : (config.content.questions || []);
  
  const SLIDE_KEY = `pemantik_idx_${user.email}_${id}_${meetingId}`;
  const [activeIdx, setActiveIdx] = React.useState(() => {
    const saved = localStorage.getItem(SLIDE_KEY);
    return saved ? parseInt(saved) : 0;
  });

  React.useEffect(() => {
    localStorage.setItem(SLIDE_KEY, activeIdx.toString());
  }, [activeIdx, SLIDE_KEY]);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[activeIdx];
  const isLast = activeIdx === (questions.length - 1);

  const onSubmit = () => {
    const combined = questions.map((q, i) => `Pertanyaan ${i + 1}: ${q}\nJawaban: ${pemantikAnswers[i] || "-"}`).join("\n\n");
    handleAction(combined);
    localStorage.removeItem(SLIDE_KEY);
  };

  return (
    <div className="space-y-6 md:space-y-12 pb-20">
      <SectionHero title="Studi Kasus" subtitle="Analisis kasus nyata untuk menguji pemahaman Anda." icon="tips_and_updates" gradient="from-slate-900 to-indigo-900" />

      {status ? (
        <div className="space-y-6">
          <div className="bg-emerald-500 p-6 rounded-3xl text-white flex items-center gap-4">
             <span className="material-symbols-outlined text-3xl">verified</span>
             <div>
                <p className="font-black text-sm uppercase italic">Terima Kasih!</p>
                <p className="text-xs opacity-90">Analisis pengerjaan Anda telah tersimpan.</p>
             </div>
          </div>
          {questions.map((q, i) => {
            const answersArray = (status?.content || "").split(/\n\n(?=Pertanyaan \d+:)/);
            const myBlock = answersArray.find(a => a?.startsWith(`Pertanyaan ${i+1}:`)) || "";
            const myAns = myBlock.split("\nJawaban: ")[1] || "-";
            return (
              <Card key={i} className="p-6 border-l-4 border-indigo-500">
                <p className="text-[10px] font-black text-indigo-400 mb-2 uppercase tracking-widest">KASUS {i+1}</p>
                <p className="font-bold text-slate-800 text-sm mb-4 leading-relaxed">{q}</p>
                <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 italic">"{myAns}"</div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
          {/* Header Progress */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">{activeIdx + 1}</div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Soal {activeIdx + 1} dari {questions.length}</span>
             </div>
             <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${((activeIdx + 1)/questions.length)*100}%` }}></div>
             </div>
          </div>

          {/* Question Card */}
          <div className="bg-white border border-slate-200 p-6 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
             <h3 className="text-base md:text-2xl font-black text-slate-800 mb-8 leading-relaxed text-left">
               {currentQ}
             </h3>
             <textarea
               value={pemantikAnswers[activeIdx] || ""}
               onChange={(e) => {
                 const newAns = [...pemantikAnswers];
                 newAns[activeIdx] = e.target.value;
                 setPemantikAnswers(newAns);
               }}
               placeholder="Tuliskan analisis Anda di sini..."
               className="w-full min-h-[180px] md:min-h-[300px] bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm md:text-lg text-slate-700 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none shadow-inner leading-relaxed"
             ></textarea>
          </div>

          {/* Persistent Navigation (In-flow for keyboard safety) */}
          <div className="flex flex-col gap-3 py-4">
             <div className="flex gap-3">
                {activeIdx > 0 && (
                  <button onClick={() => setActiveIdx(activeIdx - 1)} className="flex-1 bg-white border border-slate-200 text-slate-400 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
                    Kembali
                  </button>
                )}
                
                {isLast ? (
                  <button onClick={onSubmit} disabled={loading} className="flex-[2] bg-emerald-500 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                    {loading ? "PROSES..." : "KIRIM KE TUTOR"}
                  </button>
                ) : (
                  <button onClick={() => setActiveIdx(activeIdx + 1)} className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-900/20 active:scale-95 transition-all">
                    SOAL BERIKUTNYA
                  </button>
                )}
             </div>
             <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">
               <span className="material-symbols-outlined text-[10px] text-emerald-400 inline-block align-middle mr-1">security</span>
               Auto-save aktif: Jawaban Anda aman jika keluar
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Template for Materi
 */
export const MateriTemplate = ({ config, content, setContent, handleAction, loading, status }) => {
  if (!config?.content) return null;
  return (
    <div className="space-y-10 pb-20">
      <SectionHero title={config.content.title || "Materi"} icon="menu_book" />
      
      {/* Support for legacy "htmlContent" used in Sesi 1 */}
      {config.content.htmlContent && !config.content.sections && (
        <Card className="p-6 md:p-12">
          <div 
            className="prose prose-slate max-w-none text-slate-600 text-sm md:text-lg leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: config.content.htmlContent }}
          />
        </Card>
      )}

      {config.content.sections && (
        <div className="max-w-4xl mx-auto space-y-10">
          {config.content.sections.map((section, sidx) => (
          <div key={sidx} className="px-4">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(section.points || []).map((pt, pidx) => (
                <Card key={pidx} className="p-5">
                   <h4 className="text-[10px] font-black text-indigo-500 mb-2 uppercase">{pt.label}</h4>
                   <p className="text-xs text-slate-600 leading-relaxed font-medium">{pt.text}</p>
                   {pt.items && (
                      <ul className="mt-3 space-y-1">
                        {pt.items.map((item, i) => (
                          <li key={i} className="text-[10px] text-slate-500 flex items-center gap-2 italic">
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-xl mx-auto px-4 mt-20 bg-indigo-600 p-8 rounded-[2.5rem] text-white text-center">
        <h3 className="text-xl font-black mb-4 italic">Refleksi Materi</h3>
        <p className="text-xs opacity-70 mb-8 italic">"{config.content.evaluationQuestion}"</p>
        <InputArea value={content} onChange={setContent} onSave={handleAction} loading={loading} status={status} />
      </div>
    </div>
  );
};
