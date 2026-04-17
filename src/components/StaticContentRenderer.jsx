import React from 'react';
import { getSessionConfig } from '../data/sessions';
import { RATSATTemplate, VideoEvalTemplate, PemantikTemplate, MateriTemplate } from './SectionTemplates';

export const StaticContentRenderer = ({ 
  sectionName, 
  id, 
  meetingId, 
  user, 
  status, 
  content, 
  setContent, 
  loading, 
  handleAction,
  pemantikAnswers,
  setPemantikAnswers,
  getPemantikForStudent,
  submissions,
}) => {
  // --- SESSION DISPATCHER ---
  try {
    const sessionConfig = getSessionConfig(id, meetingId);
    
    // Safety check: sessions array must exist
    if (sessionConfig && !Array.isArray(sessionConfig.sections)) {
      console.error("Invalid session config structure:", sessionConfig);
      throw new Error(`Session ${meetingId} exists but 'sections' is missing or not an array.`);
    }

    const targetName = sectionName?.toLowerCase();
    const activeSection = sessionConfig?.sections?.find(s => 
      s.name.toLowerCase() === targetName || 
      s.name === sectionName
    );
  
    if (activeSection) {
      if (activeSection.type === "RATSATV2") {
        return (
          <RATSATTemplate 
            config={activeSection}
            content={content}
            setContent={setContent}
            handleAction={handleAction}
            loading={loading}
            status={status}
          />
        );
      }
      if (activeSection.type === "VideoEvalV2") {
        return (
          <VideoEvalTemplate 
            config={activeSection}
            content={content}
            setContent={setContent}
            handleAction={handleAction}
            loading={loading}
            status={status}
          />
        );
      }
      if (activeSection.type === "PemantikV2") {
        return (
          <PemantikTemplate 
            config={activeSection}
            user={user}
            status={status}
            pemantikAnswers={pemantikAnswers}
            setPemantikAnswers={setPemantikAnswers}
            handleAction={handleAction}
            loading={loading}
            getPemantikForStudent={getPemantikForStudent}
          />
        );
      }
      if (activeSection.type === "MateriV2") {
        return (
          <MateriTemplate 
            config={activeSection}
            content={content}
            setContent={setContent}
            handleAction={handleAction}
            loading={loading}
            status={status}
          />
        );
      }
      
      // If type exists but is not handled above
      console.warn(`Section type '${activeSection.type}' encountered but not matched in dispatcher.`);
    }
  } catch (err) {
    console.error("CRITICAL RENDER ERROR:", err);
    return (
      <div className="p-10 md:p-20 bg-rose-50 border-2 border-rose-200 rounded-[3rem] text-center max-w-2xl mx-auto shadow-2xl">
         <div className="w-20 h-20 bg-rose-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="material-symbols-outlined text-4xl">warning</span>
         </div>
         <h3 className="text-xl md:text-2xl font-black text-rose-900 mb-4">Waduh! Terjadi Kesalahan Render 🛠️</h3>
         <p className="text-sm md:text-base text-rose-700 font-medium leading-relaxed mb-6">
           Ada sedikit kendala saat memuat materi ini. Tutor sudah diberitahu otomatis. Coba segarkan halaman (refresh) atau buka menu lainnya dulu ya!
         </p>
         <div className="bg-white/50 p-4 rounded-2xl text-[10px] text-rose-400 font-mono text-left break-all">
           Error: {err.message}
         </div>
      </div>
    );
  }

  // --- PRIORITAS KELAS 5A (SPGK4410) - Custom Info ---
  if (sectionName === "Informasi Modul" && id === "4") {
    return (
      <div className="space-y-10 md:space-y-16 pb-10">
        <div className="relative bg-gradient-to-br from-teal-900 via-[#134e4a] to-[#0f3b39] rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-14 overflow-hidden shadow-2xl border border-white border-opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400 bg-opacity-10 rounded-full -mr-40 -mt-40 blur-[120px]"></div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-teal-400 text-[#042f2e] px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-teal-400 shadow-opacity-20">
              <span className="material-symbols-outlined text-sm md:text-base">auto_stories</span> Informasi Mata Kuliah
            </span>
            <h1 className="text-3xl md:text-6xl font-headline font-black text-white mb-4 leading-tight">
              Strategi Pembelajaran <br className="hidden md:block" /> Kontemporer di SD
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed">
      <h3 className="text-xl font-black text-slate-400">Konten Belum Tersedia untuk Sesi Ini</h3>
      <p className="text-sm text-slate-400 mt-2">Silakan hubungi Tutor untuk informasi lebih lanjut.</p>
    </div>
  );
};
