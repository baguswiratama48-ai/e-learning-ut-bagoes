import React from 'react';
import { Card, SectionHero, InputArea } from './base/BaseComponents';

/**
 * Template for RAT/SAT (Session Info)
 */
export const RATSATTemplate = ({ config, content, setContent, handleAction, loading, status }) => {
  return (
    <div className="space-y-10 md:space-y-16 pb-10">
      <SectionHero 
        title={`Informasi Sesi: ${config.content.title}`}
        category={`Informasi Modul`}
        icon="auto_stories"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <Card className="p-8 md:p-12 border-l-[12px] border-l-indigo-500">
           <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-500">task_alt</span>
              Capaian Pembelajaran
            </h3>
            <ul className="space-y-4 text-slate-700 text-sm md:text-base font-medium">
              {config.content.capaian.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-indigo-500 shrink-0">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
        </Card>

        <div className="bg-slate-50 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-slate-200 border-opacity-50">
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-indigo-600">format_list_bulleted</span>
            Pokok Bahasan
          </h3>
          <div className="space-y-6">
            {config.content.pokokBahasan.map((pb, i) => (
              <div key={i} className={i > 0 ? "pt-4 border-t border-slate-200" : ""}>
                 <h4 className="font-bold text-slate-800 text-lg mb-2">{pb.title}</h4>
                 <ul className="space-y-2 text-slate-600 text-sm font-medium">
                    {pb.subs.map((sub, si) => (
                      <li key={si} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-indigo-400 shrink-0"></span> {sub}
                      </li>
                    ))}
                 </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-10 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h3 className="text-xl md:text-3xl font-black text-slate-800 mb-4 uppercase tracking-tighter">
            Evaluasi Pemahaman 💬
          </h3>
          <p className="text-slate-500 text-sm md:text-base font-medium italic">
            "{config.content.evaluationQuestion}"
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <InputArea 
            value={content}
            onChange={setContent}
            onSave={handleAction}
            loading={loading}
            status={status}
            placeholder="Ketik jawaban evaluasi Anda disini..."
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Template for Video Evaluation
 */
export const VideoEvalTemplate = ({ config, content, setContent, handleAction, loading, status }) => {
  return (
    <div className="space-y-8 md:space-y-12">
      <Card className="group">
        <div className="aspect-video relative">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${config.content.videoId}`}
            title={config.content.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4 md:p-8 bg-slate-50 border-t flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="material-symbols-outlined text-[24px]">play_circle</span>
            </div>
            <div>
              <p className="font-black text-slate-800 text-lg leading-tight">
                {config.content.title}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{config.content.category}</p>
            </div>
          </div>
          <a
            href={`https://youtu.be/${config.content.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-black text-slate-700 uppercase bg-white border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-100 transition-all shadow-sm flex items-center gap-2"
          >
            Buka di YouTube
          </a>
        </div>
      </Card>

      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-14 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 opacity-10 rounded-full blur-[120px]"></div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
              Tugas Ringkasan
            </div>
            <h3 className="text-2xl md:text-4xl font-black mb-4 tracking-tighter uppercase leading-tight">
              {config.content.evaluationText}
            </h3>
            
            <InputArea 
              value={content}
              onChange={setContent}
              onSave={handleAction}
              loading={loading}
              status={status}
              minWords={config.content.minWords}
              placeholder={`Tuliskan kesimpulan minimal ${config.content.minWords} kata...`}
            />
        </div>
      </div>
    </div>
  );
};

/**
 * Template for Pertanyaan Pemantik (Case Studies / Random Reflection)
 */
export const PemantikTemplate = ({ config, user, status, pemantikAnswers, setPemantikAnswers, handleAction, loading, getPemantikForStudent }) => {
  const questions = getPemantikForStudent(user.nim || "0", config.content.groups);
  const requiredCount = config.content.required;
  const allAnswered = pemantikAnswers.every(a => a?.trim().length > 0);
  
  const onSubmit = () => {
    const combined = questions.map((q, i) => `Pertanyaan ${i + 1}: ${q}\nJawaban: ${pemantikAnswers[i]}`).join("\n\n");
    handleAction(combined);
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <SectionHero 
        title="Pertanyaan Pemantik"
        subtitle={`Jawablah ${requiredCount} pertanyaan reflektif di bawah ini untuk memantapkan pemahaman Anda.`}
        category="Guided Reflection"
        icon="tips_and_updates"
        gradient="from-indigo-50/50 via-slate-50 to-blue-50"
      />

      {status ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="lg:col-span-2 bg-emerald-500 p-8 md:p-14 rounded-[3rem] text-white shadow-xl shadow-emerald-500/20 flex flex-col md:flex-row items-center gap-6 md:gap-10">
               <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-[2rem] flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-5xl font-bold">verified</span>
               </div>
               <div className="text-center md:text-left">
                  <h4 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-2">Refleksi Disimpan!</h4>
                  <p className="text-sm md:text-lg text-emerald-100 font-medium opacity-90 max-w-xl italic">
                    Jawaban Anda telah tersimpan. Tutor akan memberikan feedback segera di Dashboard ini.
                  </p>
               </div>
            </div>

            {questions.map((q, i) => {
              const answersArray = status.content.split(/\n\n(?=Pertanyaan \d+:)/);
              const myBlock = answersArray.find(a => a.startsWith(`Pertanyaan ${i+1}:`)) || "";
              const myAns = myBlock.split("\nJawaban: ")[1] || "-";

              return (
                <Card key={i} className="p-8 md:p-10 border-t-8 border-t-indigo-500/20 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg">
                      {i + 1}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question {i+1}</span>
                  </div>
                  <p className="text-base md:text-xl font-black text-slate-800 mb-8 leading-snug">
                    {q}
                  </p>
                  <div className="mt-auto bg-slate-50 p-6 md:p-8 rounded-[2rem] border-l-8 border-indigo-500">
                    <p className="text-sm md:text-base text-slate-600 italic leading-relaxed font-serif font-medium">
                      "{myAns}"
                    </p>
                  </div>
                </Card>
              );
            })}
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 gap-10 md:gap-16">
            {questions.map((q, i) => (
              <div key={i} className="group bg-white border border-slate-200 p-8 md:p-14 rounded-[3rem] md:rounded-[4rem] shadow-sm hover:shadow-xl transition-all focus-within:ring-8 focus-within:ring-indigo-500/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center font-black text-2xl md:text-3xl shadow-xl shadow-indigo-600/20 group-focus-within:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <div className="h-px flex-grow bg-slate-100"></div>
                </div>
                
                <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-10 md:mb-12 leading-tight tracking-tighter">
                  {q}
                </h3>
                
                <textarea
                  value={pemantikAnswers[i] || ""}
                  onChange={(e) => {
                    const newAns = [...pemantikAnswers];
                    newAns[i] = e.target.value;
                    setPemantikAnswers(newAns);
                  }}
                  placeholder="Ketik jawaban reflektif Anda disini..."
                  className="w-full min-h-[150px] md:min-h-[200px] bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-10 text-slate-700 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none shadow-inner"
                ></textarea>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 pt-10">
              <button
                onClick={onSubmit}
                disabled={loading || !allAnswered}
                className="w-full md:w-auto min-w-[350px] bg-indigo-600 text-white font-black py-6 px-12 rounded-[2rem] hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 text-xs tracking-[0.2em] uppercase disabled:opacity-20"
              >
                {loading ? "MENGIRIM JAWABAN..." : "KIRIM SEMUA JAWABAN"}
                <span className="material-symbols-outlined">send</span>
              </button>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">lock</span> Jawaban disimpan otomatis dan dikirim secara bersamaan
              </p>
          </div>
        </div>
      )}
    </div>
  );
};
