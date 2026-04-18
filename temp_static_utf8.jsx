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
         <h3 className="text-xl md:text-2xl font-black text-rose-900 mb-4">Waduh! Terjadi Kesalahan Render ≡ƒ¢á∩╕Å</h3>
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

  if (sectionName === "Pembagian Kelompok") {
    const groupRow = (submissions || []).find(s => s.student_email === "SYSTEM_GROUP" && s.section_name === "GENERATED_GROUPS");
    const groups = groupRow ? JSON.parse(groupRow.content) : null;
    
    if (!groups) {
      return (
        <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed">
          <div className="w-20 h-20 bg-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-slate-400">group_off</span>
          </div>
          <h3 className="text-xl font-black text-slate-400 uppercase tracking-tight">Kelompok Belum Dibentuk</h3>
          <p className="text-sm text-slate-400 mt-2">Silakan tunggu instruksi dari Tutor untuk sesi ini.</p>
        </div>
      );
    }

    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
         <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-4xl text-teal-400">groups</span>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-black mb-1">Daftar Kelompok Belajar</h3>
                    <p className="text-white/60 font-medium">Sesi {meetingId} - Silakan cek anggota kelompok Anda di bawah.</p>
                </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group, gidx) => {
              const myMemberData = group.members.find(m => m.email === user.email);
              const isMyGroup = !!myMemberData;
              
              return (
                <div key={gidx} className={`bg-white rounded-[2.5rem] p-8 border-2 transition-all ${isMyGroup ? 'border-primary shadow-2xl shadow-primary/20 scale-[1.02]' : 'border-slate-100 shadow-xl shadow-slate-200/50'}`}>
                   <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${isMyGroup ? 'bg-primary' : 'bg-slate-300'}`}>
                         {group.group_num}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Group Number</span>
                        <h5 className={`font-black uppercase tracking-tight ${isMyGroup ? 'text-primary' : 'text-slate-800'}`}>KELOMPOK {group.group_num}</h5>
                      </div>
                   </div>
                   <div className="space-y-3">
                      {group.members.map((member, midx) => (
                        <div key={midx} className={`flex items-center justify-between p-4 rounded-2xl border ${member.email === user.email ? 'bg-primary/5 border-primary/20' : member.isLeader ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
                           <div className="flex items-center gap-4 overflow-hidden">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${member.isLeader ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                 {midx + 1}
                              </div>
                              <span className={`text-sm font-bold truncate ${member.email === user.email ? 'text-primary' : 'text-slate-700'}`}>{member.name}</span>
                           </div>
                           <div className="flex gap-2 shrink-0">
                             {member.isLeader ? (
                               <span className="bg-amber-400 text-[9px] font-black text-white px-2.5 py-1 rounded-full shadow-sm">KETUA</span>
                             ) : (
                               <span className="bg-slate-200 text-[9px] font-black text-slate-500 px-2.5 py-1 rounded-full border border-slate-300 shadow-sm">ANGGOTA</span>
                             )}
                             {member.email === user.email && (
                               <span className="bg-primary text-[9px] font-black text-white px-2.5 py-1 rounded-full shadow-sm uppercase animate-pulse">Anda</span>
                             )}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              );
            })}
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
