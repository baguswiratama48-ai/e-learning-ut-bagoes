import React from 'react';
import { Card, SectionHero, InputArea } from './base/BaseComponents';

/**
 * Template for RAT/SAT (Session Info)
 */
/**
 * Templat untuk RAT/SAT (Informasi Silabus/Modul)
 * Diperbarui untuk mendukung tampilan profesional di mobile dan teks terstruktur.
 */
export const RATSATTemplate = ({ config, content, setContent, handleAction, loading, status }) => {
  const { 
    title, 
    courseCode, 
    courseName, 
    sks, 
    description, 
    capaian, 
    pokokBahasan, 
    evaluationQuestion 
  } = config.content;

  return (
    <div className="space-y-8 md:space-y-12 pb-10 animate-in fade-in duration-700">
      {/* Hero Utama - Judul Sesi */}
      <SectionHero 
        title={title || "Informasi Modul"}
        category="RAT / SAT"
        icon="auto_stories"
      />

      {/* Kartu Informasi Mata Kuliah - Sangat penting untuk identitas modul */}
      {(courseName || courseCode || sks) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-primary transition-all">
            <span className="material-symbols-outlined text-primary mb-2 opacity-50">book</span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Mata Kuliah</span>
            <p className="font-bold text-slate-800 leading-tight">{courseName || "-"}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-primary transition-all">
            <span className="material-symbols-outlined text-primary mb-2 opacity-50">qr_code</span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Kode MK</span>
            <p className="font-bold text-slate-800 leading-tight">{courseCode || "-"}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-primary transition-all">
            <span className="material-symbols-outlined text-primary mb-2 opacity-50">database</span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Bobot SKS</span>
            <p className="font-bold text-slate-800 leading-tight">{sks || "-"}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 md:gap-12">
        {/* Deskripsi Singkat - Perataan rapi dan font profesional untuk mobile */}
        {description && (
          <Card className="p-8 md:p-14 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-500">description</span>
              Deskripsi Singkat
            </h3>
            <div className="text-slate-600 text-sm md:text-base leading-relaxed font-medium text-justify whitespace-pre-line">
               {description}
            </div>
          </Card>
        )}

        {/* Capaian Pembelajaran - Dipisahkan antara Umum dan Khusus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <Card className="p-8 md:p-12 border-l-[12px] border-l-indigo-500 hover:shadow-2xl transition-shadow">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-500">emoji_events</span>
              Capaian Pembelajaran
            </h3>
            
            <div className="space-y-8">
              {/* Capaian Umum - Jika tersedia */}
              {config.content.capaianUmum && (
                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">Capaian Umum</h4>
                  <p className="text-slate-700 text-sm md:text-base font-bold leading-relaxed italic">
                    {config.content.capaianUmum}
                  </p>
                </div>
              )}

              {/* Capaian Khusus */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Capaian Khusus</h4>
                <ul className="space-y-4 text-slate-700 text-sm md:text-base font-semibold">
                  {(config.content.capaianKhusus || config.content.capaian || []).map((item, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Sub Pokok Bahasan */}
          <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-200 border-opacity-50 hover:bg-white transition-colors">
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

      {/* Bagian Evaluasi - Jika ada pertanyaan pemantik khusus di RAT/SAT */}
      {evaluationQuestion && (
        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h3 className="text-xl md:text-3xl font-black text-slate-800 mb-4 uppercase tracking-tighter">
              Ayo Berdiskusi 💬
            </h3>
            <p className="text-slate-500 text-sm md:text-lg font-medium italic leading-relaxed px-4">
              "{evaluationQuestion}"
            </p>
            {config.content.minWords && (
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-4">
                ✏️ Minimal {config.content.minWords} kata untuk dapat mengirim jawaban
              </p>
            )}
          </div>
          <div className="max-w-2xl mx-auto px-4">
            <InputArea 
              value={content}
              onChange={setContent}
              onSave={handleAction}
              loading={loading}
              status={status}
              minWords={config.content.minWords || 0}
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
            <h3 className="text-lg md:text-2xl font-black mb-6 tracking-tight leading-tight">
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
  const videoId = config.content.videoId;
  
  const onSubmit = () => {
    const combined = questions.map((q, i) => `Pertanyaan ${i + 1}: ${q}\nJawaban: ${pemantikAnswers[i]}`).join("\n\n");
    handleAction(combined);
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {videoId && (
        <Card className="overflow-hidden border-none shadow-2xl animate-in zoom-in duration-500">
          <div className="aspect-video relative">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Pemantik Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
             <span className="material-symbols-outlined text-yellow-400 animate-pulse">movie</span>
             <span className="text-[10px] font-black uppercase tracking-widest">Simak video singkat di atas sebelum menjawab</span>
          </div>
        </Card>
      )}

      <SectionHero 
        title="Pertanyaan Pemantik"
        subtitle={`Jawablah ${requiredCount} pertanyaan reflektif di bawah ini untuk memantapkan pemahaman Anda.`}
        category="Guided Reflection"
        icon="tips_and_updates"
        gradient="from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
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
              const answersArray = (status?.content || "").split(/\n\n(?=Pertanyaan \d+:)/);
              const myBlock = answersArray.find(a => a?.startsWith(`Pertanyaan ${i+1}:`)) || "";
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
          <div className="grid grid-cols-1 gap-8 md:gap-16">
            {questions.map((q, i) => (
              <div key={i} className="group bg-white border border-slate-200 p-7 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-sm hover:shadow-xl transition-all focus-within:ring-8 focus-within:ring-indigo-500/5">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center font-black text-xl md:text-3xl shadow-xl shadow-indigo-600/20 group-focus-within:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <div className="h-px flex-grow bg-slate-100"></div>
                </div>
                
                <h3 className="text-lg md:text-3xl font-black text-slate-900 mb-8 md:mb-12 leading-snug md:leading-tight tracking-tight">
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
                  className="w-full min-h-[140px] md:min-h-[200px] bg-slate-50 border border-slate-200 rounded-3xl md:rounded-[2rem] p-6 md:p-10 text-sm md:text-base text-slate-700 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none shadow-inner"
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

/**
 * Template for Structured Learning Material
 */
export const MateriTemplate = ({ config, content, setContent, handleAction, loading, status }) => {
  if (!config?.content) return null;

  return (
    <div className="space-y-12 md:space-y-20 pb-20">
      <SectionHero 
        title={config.content.title || "Materi Pembelajaran"}
        subtitle={config.content.subtitle || ""}
        category="Materi Pembelajaran"
        icon="menu_book"
        gradient="from-[#1e293b] via-[#0f172a] to-[#312e81]"
      />

      <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
        {(config.content.sections || []).map((section, sidx) => (
          <div key={sidx} className="relative group px-4">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] bg-slate-900 shadow-xl shadow-slate-900/20 flex items-center justify-center text-white font-black text-xl md:text-2xl ring-8 ring-slate-50 group-hover:scale-110 transition-transform">
                {section.letter || sidx + 1}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
            </div>

            <h3 className="text-2xl md:text-4xl font-black text-slate-800 mb-8 tracking-tight leading-tight">
              {section.title}
            </h3>

            {/* Section Description */}
            {section.description && (
              <div className="bg-slate-50 p-6 md:p-10 rounded-[2rem] border-l-8 border-slate-300 mb-10 shadow-sm">
                <p className="text-sm md:text-lg text-slate-600 font-medium leading-relaxed italic">
                   {section.description}
                </p>
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.points && (
                <div className="space-y-6">
                  {(section.points || []).map((pt, pidx) => (
                    <div key={pidx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <h4 className="flex items-center gap-2 text-primary font-black text-sm md:text-base mb-3 uppercase tracking-tighter">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        {pt.label}
                      </h4>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                        {pt.text}
                      </p>
                      {pt.items && (
                        <ul className="mt-4 space-y-2 pl-2">
                          {(pt.items || []).map((item, iidx) => (
                            <li key={iidx} className="flex gap-2 items-start text-xs md:text-sm text-slate-500 font-medium">
                              <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-slate-300 shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Examples Column */}
              {section.examples && (
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden h-full shadow-2xl min-h-[300px]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                       <span className="material-symbols-outlined text-yellow-400">lightbulb</span>
                       <h4 className="font-black text-lg md:text-xl tracking-tight uppercase">Contoh di Lapangan</h4>
                    </div>
                    <div className="space-y-6">
                      {(section.examples || []).map((ex, eidx) => (
                        <div key={eidx} className="flex gap-4 items-start bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all">
                           <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-[10px] shrink-0">{eidx+1}</span>
                           <p className="text-xs md:text-sm font-medium leading-relaxed opacity-90">{ex}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Section */}
      <div className="max-w-4xl mx-auto pt-20 border-t border-slate-100 px-4">
        <div className="bg-gradient-to-br from-primary to-[#1a2169] rounded-[3rem] p-10 md:p-16 text-white text-center shadow-2xl shadow-primary/20">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/20">
            <span className="material-symbols-outlined text-4xl text-yellow-400">psychology</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight">Evaluasi Pemahaman 💬</h3>
          <p className="text-sm md:text-lg text-white/70 font-medium mb-12 max-w-2xl mx-auto italic leading-relaxed">
            "{config.content.evaluationQuestion || "Setelah mempelajari seluruh poin di atas, apa kesimpulan atau pelajaran terpenting yang Anda dapatkan?"}"
          </p>
          {config.content.minWords && (
            <p className="text-[11px] font-black uppercase tracking-widest text-white/40 mb-6 -mt-8">
              ✏️ Minimal {config.content.minWords} kata untuk dapat mengirim jawaban
            </p>
          )}
          <div className="max-w-2xl mx-auto">
             <InputArea 
               value={content}
               onChange={setContent}
               onSave={handleAction}
               loading={loading}
               status={status}
               placeholder={config.content.inputPlaceholder || "Ketik refleksi pemahaman Anda disini..."}
               minWords={config.content.minWords || 20}
             />
          </div>
        </div>
      </div>
    </div>
  );
};
