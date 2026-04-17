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
  const sessionConfig = getSessionConfig(id, meetingId);
  const activeSection = sessionConfig?.sections.find(s => s.name === sectionName);

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
