import React from 'react';
import { Link } from 'react-router-dom';
import { FEEDBACK_MESSAGES } from '../data/mockData';
import { LkpdClass6A } from './LkpdClass6A';
import { LkpdClass5A } from './LkpdClass5A';
import QuizClass5A from './QuizClass5A';
import { getSessionConfig } from '../data/sessions';
import { RATSATTemplate, VideoEvalTemplate, PemantikTemplate } from './SectionTemplates';

export const StaticContentRenderer = ({ 
  sectionName, 
  id, 
  meetingId, 
  user, 
  status, 
  tutorFeedback, 
  content, 
  setContent, 
  loading, 
  handleAction,
  pemantikAnswers,
  setPemantikAnswers,
  getPemantikForStudent,
  cls,
  courseCode,
  COURSE_DATA,
  submissions,
  handleSubmit
}) => {
  // --- SESSION DISPATCHER (NUEVO) ---
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
  }

  // --- DEKLARASI GLOBAL (LEGACY) ---
  const systemGroupRow = submissions.find(
    (s) =>
      s.student_email === "SYSTEM_GROUP" &&
      String(s.class_id) === String(id) &&
      String(s.meeting_num) === String(meetingId),
  );
  const groups = systemGroupRow ? JSON.parse(systemGroupRow.content) : [];

  // --- PRIORITAS KELAS 5A (SPGK4410) ---
  if (sectionName === "Informasi Modul" && id === "4") {
    return (
      <div className="space-y-10 md:space-y-16 pb-10">
        {/* Hero Section */}
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

  // ... rest of the legacy code will follow or be cleaned up
  return (
    <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed">
      <h3 className="text-xl font-black text-slate-400">Konten Belum Tersedia untuk Sesi Ini</h3>
      <p className="text-sm text-slate-400 mt-2">Silakan hubungi Tutor untuk informasi lebih lanjut.</p>
    </div>
  );
};
