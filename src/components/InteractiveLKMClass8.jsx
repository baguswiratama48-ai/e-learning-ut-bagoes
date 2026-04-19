import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { STUDENTS } from '../data/students';

const TASKS = {
  1: {
    title: "Konsep Karakteristik dan Tugas Perkembangan Sekolah Dasar",
    questions: [
      "Jenis Layanan Bimbingan dan Konseling: Layanan Orientasi",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Informasi",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Pembelajaran",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Penempatan dan Penyaluran",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Penguasaan Konten",
      "Tugas Perkembangan peserta didik di SD menurut Yusuf (2016:69)",
      "Fase peserta didik membutuhkan kemampuan intelektual dan kognitif pada usia SD (6-12 tahun)"
    ]
  },
  2: {
    title: "Perkembangan Fisik - Motorik dan Upaya Bimbingannya",
    questions: [
      "Jenis Layanan Bimbingan dan Konseling: Layanan Konseling Individual",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Bimbingan Kelompok",
      "Pengertian perkembangan fisik",
      "Empat komponen utama perkembangan fisik seseorang",
      "Aspek - aspek perkembangan fisik individu, dan Jabarkan aspek struktur fisik",
      "Faktor yang mendorong keterampilan motorik yang memungkinkan peran serta orang tua dan guru dalam mengarahkannya",
      "Uraikan tabel perkembangan fisik masa kanak - kanak akhir"
    ]
  },
  3: {
    title: "Perkembangan Kognitif dan Bahasa Serta Upaya Bimbingannya",
    questions: [
      "Jenis Layanan Bimbingan dan Konseling: Layanan Konseling Kelompok",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Konsultasi",
      "Jenis Layanan Bimbingan dan Konseling: Layanan Mediasi",
      "Uraikan 4 tahap utama perkembangan kognitif individu",
      "Identifikasi 5 karakteristik utama bahasa",
      "Uraikan tahapan perkembangan bahasa pada anak"
    ]
  },
  4: {
    title: "Perkembangan Sosial, Emosi, dan Moral Serta Upaya Bimbingannya",
    questions: [
      "Pengertian perkembangan sosial",
      "Uraikan karakteristik anak SD dalam perilaku yang direalisasikan dalam bentuk tindakan",
      "Sebutkan karakteristik perkembangan sosial pada jenjang SD kelas rendah dan kelas tinggi",
      "Uraikan tentang perkembangan emosi",
      "Uraikan perkembangan dan ciri - ciri emosi peserta didik di SD",
      "Pengertian perkembangan moral",
      "Jelaskan 3 tingkatan klasifikasi perkembangan moral"
    ]
  }
};

export default function InteractiveLKMClass8({
  user,
  classId,
  meetingId,
  submissions,
  onComplete,
  status,
  loading,
  missions: propMissions,
  config: lkmConfig = {}
}) {
  // Parsing group
  const groupRow = (submissions || []).find(s => s.student_email === "SYSTEM_GROUP" && s.section_name === "GENERATED_GROUPS" && String(s.meeting_num) === String(meetingId));
  const groupsData = groupRow ? JSON.parse(groupRow.content) : null;

  const myGroupInfo = useMemo(() => {
    if (!groupsData) return null;
    return groupsData.find(g => g.members.some(m => m.email === user.email));
  }, [groupsData, user.email]);

  const [activeTab, setActiveTab] = useState("MY_LKM");
  const [loadingAction, setLoadingAction] = useState({ type: null, id: null });

  // 4. Determine Active Missions
  const activeMissionsList = useMemo(() => {
    // If we have prop missions and it's a group-based discussion
    if (propMissions && lkmConfig.type === "GROUP_DISCUSSION") {
      // Find the mission for THIS specific group
      const groupMission = propMissions[groupNumber];
      if (groupMission) {
        // Formulate a mission object consistent with LKM rendering
        // Use group-specific questions if available, or the mission title/questions
        return [{ ...groupMission, id: 1 }];
      }
      return [];
    }
    // Fallback or legacy support (though we are moving to dynamic)
    return propMissions ? Object.values(propMissions) : [];
  }, [propMissions, groupNumber, lkmConfig]);

  const currentTask = activeMissionsList[0] || { title: "Tugas Diskusi Belum Tersedia", questions: [] };

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return Array(currentTask?.questions?.length || 0).fill("");
  });

  const [commentInputs, setCommentInputs] = useState({});

  // Save to local storage automatically
  useEffect(() => {
    localStorage.setItem(draftKey, JSON.stringify(answers));
  }, [answers, draftKey]);

  // Validations
  const answeredCount = answers.filter(a => a.trim().length >= 10).length;
  const isFormComplete = answeredCount >= Math.min(currentTask.questions.length, 6);
  const remainingRequired = Math.max(0, Math.min(currentTask.questions.length, 6) - answeredCount);

  // Data fetching from props (submissions)
  const allForumPosts = useMemo(() => {
    return (submissions || [])
      .filter(s => s.section_name === "LKM_FORUM_POST")
      .map(p => {
        try { return { ...p, parsed: JSON.parse(p.content) }; } catch (e) { return { ...p, parsed: {} }; }
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [submissions]);

  const allComments = useMemo(() => {
    return (submissions || [])
      .filter(s => s.section_name === "LKM_COMMENT")
      .map(c => {
        try { return { ...c, parsed: JSON.parse(c.content) }; } catch (e) { return { ...c, parsed: { targetId: null, comment: "" } }; }
      })
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }, [submissions]);

  // Helper funcs
  const getStudentProfile = (email) => {
    const student = STUDENTS.find(s => s.email === email);
    if (student) return { name: student.name, nim: student.nim };
    const parts = email.split('@')[0].split('.');
    return { name: parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '), nim: "N/A" };
  };

  const getStudentGroup = (email) => {
    if (!groupsData) return null;
    const g = groupsData.find(grp => grp.members.some(m => m.email === email));
    return g ? g.group_num : null;
  };

  const handleShareToForum = async (idx) => {
    const answerText = answers[idx];
    if (!answerText || answerText.trim().length < 10) return;

    setLoadingAction({ type: 'share', id: idx });
    try {
      const payload = {
        student_email: user.email,
        class_id: classId,
        meeting_num: meetingId,
        section_name: "LKM_FORUM_POST",
        content: JSON.stringify({
          questionIndex: idx,
          questionText: currentTask.questions[idx],
          answerText: answerText,
          groupNum: groupNumber
        })
      };
      await supabase.from("submissions").insert([payload]);
      alert('Berhasil dibagikan ke forum diskusi!');
      window.location.reload(); // Quick refresh to pull new data via App.jsx
    } catch (err) {
      console.error(err);
      alert('Gagal membagikan.');
    }
    setLoadingAction({ type: null, id: null });
  };

  const handleAddComment = async (targetId) => {
    const commentInput = commentInputs[targetId];
    if (!commentInput || commentInput.trim().length === 0) return;

    setLoadingAction({ type: 'comment', id: targetId });
    try {
      const payload = {
        student_email: user.email,
        class_id: classId,
        meeting_num: meetingId,
        section_name: "LKM_COMMENT",
        content: JSON.stringify({ targetId, comment: commentInput })
      };
      await supabase.from("submissions").insert([payload]);
      setCommentInputs({ ...commentInputs, [targetId]: "" });
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim komentar.");
    }
    setLoadingAction({ type: null, id: null });
  };

  const handleFinalSubmit = async () => {
    if (!isFormComplete) return;

    let docContent = `LEMBAR KERJA MAHASISWA (LKM)\nTopik Pokok: ${currentTask.title}\nKelompok: ${groupNumber}\n\n`;
    (currentTask.questions || []).forEach((q, idx) => {
      docContent += `Soal ${idx + 1}:\n${q}\n\nJawaban:\n${answers[idx]}\n\n`;
    });

    await onComplete(docContent);
  };

  if (!groupsData) {
    return (
      <div className="bg-rose-50 border border-rose-200 p-10 rounded-[3rem] text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6">
          <span className="material-symbols-outlined text-5xl">group_off</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Kelompok Belum Dibentuk</h3>
        <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">
          Tutor belum melakukan pengacakan kelompok. Anda belum bisa mengerjakan LKM.
        </p>
      </div>
    );
  }

  if (!myGroupInfo) {
    return (
      <div className="bg-amber-50 border border-amber-200 p-10 rounded-[3rem] text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mb-6">
          <span className="material-symbols-outlined text-5xl">person_off</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Tidak Ada Kelompok</h3>
        <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">
          Akun Anda tidak terdaftar dalam kelompok sesi ini. Harap hubungi Tutor.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">

      {/* HEADER TUGAS */}
      <div className="bg-gradient-to-br from-[#1a2169] to-indigo-900 border border-indigo-500/30 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-indigo-900/20 text-white">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[200px]">assignment</span>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-400/30">
              <span className="material-symbols-outlined text-[14px]">groups</span>
              LKM Kelompok {groupNumber}
            </div>

            {/* Tabs Toggle */}
            <div className="flex bg-indigo-950/50 rounded-2xl p-1.5 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("MY_LKM")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "MY_LKM" ? "bg-white text-[#1a2169] shadow-md scale-100" : "text-indigo-200 hover:text-white"}`}
              >
                LKM SAYA (DRAFT)
              </button>
              <button
                onClick={() => setActiveTab("FORUM")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "FORUM" ? "bg-white text-[#1a2169] shadow-md scale-100" : "text-indigo-200 hover:text-white"}`}
              >
                FORUM DISKUSI <span className="bg-rose-500 text-white px-1.5 py-0.5 rounded-md text-[9px] font-black">{allForumPosts.length}</span>
              </button>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2 leading-tight">
            {currentTask.title}
          </h2>
          <p className="text-indigo-200 text-sm font-medium">
            {activeTab === "MY_LKM" ? "Isi dan simpan jawaban per soal. Anda dapat membagikan hasil diskusi tertentu ke forum." : "Beri tanggapan/komentar yang membangun pada jawaban spesifik teman Anda."}
          </p>
        </div>
      </div>

      {activeTab === "MY_LKM" && (
        <div className="space-y-6">
          {status ? (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-8 md:p-12 rounded-[3rem] text-center flex flex-col items-center shadow-xl shadow-green-100/50">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner text-green-500">
                <span className="material-symbols-outlined text-6xl">verified</span>
              </div>
              <h4 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Seluruh Jawaban Berhasil Dikirim Ke Tutor</h4>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                LKM final Anda telah diserahkan. Anda masih bisa melihat dan berdiskusi di Tab <b>Forum Diskusi</b>.
              </p>
              <div className="bg-white p-6 md:p-8 rounded-3xl w-full text-left shadow-sm border border-green-100 max-w-3xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Arsip Pengiriman Akhir:</p>
                <div className="text-sm text-slate-700 leading-relaxed font-medium font-serif whitespace-pre-wrap">{status.content}</div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 text-slate-800 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start md:items-center gap-3">
                <span className="material-symbols-outlined text-amber-500 mt-1 md:mt-0 !text-[20px]">lightbulb</span>
                <p className="text-xs text-amber-700 font-bold leading-relaxed">
                  Setiap huruf yang Anda ketik <b>otomatis tersimpan di perangkat (Draft)</b>. Anda dapat membagikan jawaban suatu nomor secara spesifik ke <b>Forum Diskusi</b> dengan menekan tombol bagikan di bawah masing-masing kotak.
                </p>
              </div>

              {(currentTask.questions || []).map((question, idx) => {
                const isShared = allForumPosts.some(p => p.student_email === user.email && p.parsed.questionIndex === idx);
                const answerMissing = (answers[idx] || "").trim().length < 10;

                return (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 transition-colors focus-within:bg-indigo-50/30 focus-within:border-indigo-200 relative">
                    {isShared && (
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl rounded-tr-3xl flex items-center gap-1 shadow-md">
                        <span className="material-symbols-outlined !text-[12px]">public</span> Dibagikan
                      </div>
                    )}
                    <div className="flex gap-4 mb-4 items-start pr-12">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md">
                        {idx + 1}
                      </div>
                      <p className="font-bold text-slate-700 leading-relaxed mt-1 text-sm md:text-base">{question}</p>
                    </div>

                    <div className="relative mb-4">
                      <textarea
                        value={answers[idx]}
                        onChange={(e) => {
                          const newAnswers = [...answers];
                          newAnswers[idx] = e.target.value;
                          setAnswers(newAnswers);
                        }}
                        className="w-full min-h-[140px] bg-white border border-slate-200 rounded-2xl p-5 text-sm md:text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-y placeholder:text-slate-300"
                        placeholder="Uraikan jawaban Anda di sini..."
                        autoComplete="off"
                        spellCheck={false}
                      ></textarea>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 self-start md:self-center">
                        {answerMissing ? (
                          <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-lg text-xs font-bold">Harap isi &gt; 10 karakter</span>
                        ) : (
                          <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined !text-[14px]">save</span> Tersimpan Lokal
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleShareToForum(idx)}
                        disabled={isShared || answerMissing || loadingAction.type === 'share'}
                        className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${isShared ? 'bg-green-50 text-green-600 border border-green-200 cursor-not-allowed' : 'bg-[#1a2169] text-white hover:scale-[1.02] shadow-md hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100'}`}
                      >
                        {loadingAction.type === 'share' && loadingAction.id === idx ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : isShared ? (
                          <><span className="material-symbols-outlined !text-[18px]">check_circle</span> Sudah di Forum</>
                        ) : (
                          <><span className="material-symbols-outlined !text-[18px]">share</span> Bagikan ke Forum</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* GLOBAL SUBMIT SECTION */}
              <div className="pt-8 mt-4 border-t-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${isFormComplete ? 'bg-green-100 text-green-600 shadow-inner' : 'bg-rose-100 text-rose-500 shadow-inner'}`}>
                  <span className="material-symbols-outlined text-3xl">{isFormComplete ? 'task_alt' : 'priority_high'}</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-1">Pengiriman Final LKM</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
                    Jika minimal 6 nomor (atau semua pertanyaan kelompok) sudah diisi dengan baik, tekan tombol ini untuk mengumpulkan kepada Tutor.
                  </p>
                </div>
                {remainingRequired > 0 && (
                  <p className="text-sm font-bold text-rose-500 animate-pulse mt-2">
                    Masih ada {remainingRequired} pertanyaan wajib yang belum lengkap!
                  </p>
                )}
                <button
                  onClick={handleFinalSubmit}
                  disabled={!isFormComplete || loading}
                  className="w-full max-w-sm bg-gradient-to-r from-primary to-[#2a349c] text-white px-8 py-5 rounded-2xl font-black tracking-widest uppercase text-sm mt-4 shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                >
                  {loading ? "MEMPROSES..." : "KIRIM SEMUA KE TUTOR"}
                  {!loading && <span className="material-symbols-outlined font-black">send</span>}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "FORUM" && (
        <div className="space-y-6">
          <div className="bg-white border text-center border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
            <span className="material-symbols-outlined text-5xl text-indigo-300 mb-3 block">forum</span>
            <h3 className="text-xl font-black text-slate-800">Ruang Diskusi Panel LKM</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">Tanggapi cuplikan jawaban yang dibagikan oleh kelompok lain. Setiap komentar terekam secara akademik atas nama NIM dari mahasiswa pengirim.</p>
          </div>

          {allForumPosts.map((post) => {
            const postGroupNum = post.parsed.groupNum || getStudentGroup(post.student_email) || '?';
            const profile = getStudentProfile(post.student_email);
            const postComments = allComments.filter(c => c.parsed.targetId === post.id);

            return (
              <div key={post.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-lg shadow-slate-200/40 transform transition-all duration-300 hover:shadow-xl">
                <div className="bg-slate-50 border-b border-slate-200 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-black text-xl shadow-md border-2 border-white">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-slate-800 uppercase tracking-tight text-base md:text-lg leading-none">{profile.name}</p>
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[9px] font-black tracking-widest">{profile.nim}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined !text-[12px]">schedule</span>
                        {new Date(post.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                  </div>
                  <div className="bg-indigo-100 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-xl text-xs font-black shrink-0 self-start md:self-center shadow-sm">
                    KELOMPOK {postGroupNum}
                  </div>
                </div>

                <div className="p-5 md:p-8 space-y-6">
                  {/* The Q & A */}
                  <div className="bg-white border-2 border-slate-100 rounded-2xl p-5 shadow-sm">
                    <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined !text-[14px]">quiz</span> Pertanyaan Diskusi
                    </p>
                    <p className="font-bold text-slate-700 mb-4">{post.parsed.questionText}</p>

                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1 border-t border-slate-100 pt-4">
                      <span className="material-symbols-outlined !text-[14px]">menu_book</span> Jawaban Publik
                    </p>
                    <div className="text-sm font-serif text-slate-700 leading-relaxed whitespace-pre-wrap pl-2 border-l-4 border-emerald-200">
                      {post.parsed.answerText}
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="space-y-4 pt-2">
                    {postComments.length > 0 && (
                      <div className="space-y-3 mb-6 bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100 shadow-inner">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-4">
                          <span className="material-symbols-outlined !text-[14px]">forum</span> Komentar Diskusi ({postComments.length})
                        </h4>
                        {postComments.map((c, cIdx) => {
                          const cProfile = getStudentProfile(c.student_email);
                          return (
                            <div key={cIdx} className="bg-white border border-slate-200 p-4 rounded-3xl rounded-tl-sm flex gap-4 w-full md:max-w-3xl shadow-sm">
                              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-black shrink-0 border-2 border-white shadow-sm">
                                {cProfile.name.charAt(0)}
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <p className="text-[11px] font-black text-slate-600 uppercase">{cProfile.name}</p>
                                  <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[8px] font-black border border-slate-200">{cProfile.nim}</span>
                                  <span className="text-[9px] text-slate-400 ml-auto whitespace-nowrap">{new Date(c.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="text-sm text-slate-700 font-medium leading-relaxed">{c.parsed.comment}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Input Comment */}
                    <div className="flex gap-3 items-start">
                      <div className="relative w-full">
                        <textarea
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          placeholder={`Balas jawaban LKM milik ${profile.name}...`}
                          className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 text-sm outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all min-h-[60px] resize-y placeholder:text-slate-400"
                        ></textarea>
                        {/* Quick identifier that they are commenting natively */}
                        <div className="absolute right-3 bottom-3 flex items-center gap-1.5 opacity-40">
                          <span className="bg-slate-200 text-[8px] font-black px-2 py-0.5 rounded text-slate-600">NIM: {getStudentProfile(user.email).nim}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentInputs[post.id] || loadingAction.type === 'comment'}
                        className="bg-primary text-white w-14 h-14 rounded-full shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center shrink-0 mt-1"
                      >
                        {loadingAction.type === 'comment' && loadingAction.id === post.id ? (
                          <div className="w-5 h-5 border-2 border-white border-t-white/30 rounded-full animate-spin"></div>
                        ) : (
                          <span className="material-symbols-outlined text-xl">send</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {allForumPosts.length === 0 && (
            <div className="bg-slate-50 border border-slate-200 border-dashed p-12 rounded-[2.5rem] text-center text-slate-400">
              <span className="material-symbols-outlined text-6xl mb-4 text-slate-300">chat_bubble_outline</span>
              <p className="font-bold text-lg mb-1">Belum Ada Topik Diskusi</p>
              <p className="text-sm max-w-sm mx-auto">Jadilah yang pertama untuk membagikan gagasan Anda dari tab LKM SAYA agar bisa mulai dikomentari!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
