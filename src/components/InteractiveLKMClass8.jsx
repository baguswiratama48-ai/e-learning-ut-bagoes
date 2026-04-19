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

  const groupNumber = myGroupInfo ? myGroupInfo.group_num : 1;
  const draftKey = `lkm_draft_8_${user?.email}_${classId}_${meetingId}`;

  const [activeTab, setActiveTab] = useState("MY_LKM");
  const [loadingAction, setLoadingAction] = useState({ type: null, id: null });

  // REAKTIVITAS: State lokal untuk update instan tanpa reload
  const [localNewPosts, setLocalNewPosts] = useState([]);
  const [localNewComments, setLocalNewComments] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Determine Active Missions
  const activeMissionsList = useMemo(() => {
    if (propMissions && lkmConfig?.type === "GROUP_DISCUSSION") {
      const groupMission = propMissions[String(groupNumber)];
      if (groupMission) {
        return [{ ...groupMission, id: 1 }];
      }
      return [];
    }
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

  // Auto-save logic
  useEffect(() => {
    localStorage.setItem(draftKey, JSON.stringify(answers));
  }, [answers, draftKey]);

  // Data merging (Server + Local)
  const allForumPosts = useMemo(() => {
    const fromServer = (submissions || [])
      .filter(s => s.section_name === "LKM_FORUM_POST")
      .map(p => {
        try { return { ...p, parsed: JSON.parse(p.content) }; } catch (e) { return { ...p, parsed: {} }; }
      });
    const combined = [...localNewPosts, ...fromServer];
    const seen = new Set();
    return combined.filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true; })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [submissions, localNewPosts]);

  const allComments = useMemo(() => {
    const fromServer = (submissions || [])
      .filter(s => s.section_name === "LKM_COMMENT")
      .map(c => {
        try { return { ...c, parsed: JSON.parse(c.content) }; } catch (e) { return { ...c, parsed: { targetId: null, comment: "" } }; }
      });
    const combined = [...fromServer, ...localNewComments];
    const seen = new Set();
    return combined.filter(c => { if (seen.has(c.id)) return false; seen.add(c.id); return true; })
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }, [submissions, localNewComments]);

  // Statistik Keaktifan
  const myStats = useMemo(() => {
    const myPosts = allForumPosts.filter(p => p.student_email === user.email).length;
    const myComments = allComments.filter(c => c.student_email === user.email).length;
    const total = myPosts + myComments;

    let badge, badgeColor, badgeDesc;
    if (myPosts >= 1 && myComments >= 10) {
      badge = "Sangat Aktif"; badgeColor = "bg-emerald-500 text-white"; badgeDesc = "Luar biasa! Kontribusimu sangat tinggi di forum ini.";
    } else if (myPosts >= 1 && myComments >= 5) {
      badge = "Aktif"; badgeColor = "bg-blue-600 text-white"; badgeDesc = "Bagus! Kamu memenuhi standar keaktifan diskusi.";
    } else if (total >= 1) {
      badge = "Cukup Aktif"; badgeColor = "bg-amber-400 text-slate-900"; badgeDesc = "Sedikit lagi untuk mencapai target keaktifan.";
    } else {
      badge = "Pasif"; badgeColor = "bg-rose-100 text-rose-600"; badgeDesc = "Yuk bagikan jawaban and beri komentar ke kelompok lain!";
    }

    return { myPosts, myComments, total, badge, badgeColor, badgeDesc };
  }, [allForumPosts, allComments, user.email]);

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
      const parsedContent = {
        questionIndex: idx,
        questionText: currentTask.questions[idx],
        answerText: answerText,
        groupNum: groupNumber
      };
      const payload = {
        student_email: user.email,
        class_id: classId,
        meeting_num: meetingId,
        section_name: "LKM_FORUM_POST",
        content: JSON.stringify(parsedContent)
      };
      const { data } = await supabase.from("submissions").insert([payload]).select();

      const newPost = data?.[0] ?? {
        id: `local_${Date.now()}`,
        student_email: user.email,
        created_at: new Date().toISOString(),
      };
      setLocalNewPosts(prev => [{ ...newPost, parsed: parsedContent }, ...prev]);
      
      showSuccess("✅ Jawaban berhasil dibagikan ke Forum!");
      setActiveTab("FORUM");
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
      const parsedContent = { targetId, comment: commentInput };
      const payload = {
        student_email: user.email,
        class_id: classId,
        meeting_num: meetingId,
        section_name: "LKM_COMMENT",
        content: JSON.stringify(parsedContent)
      };
      const { data } = await supabase.from("submissions").insert([payload]).select();

      const newComment = data?.[0] ?? {
        id: `local_${Date.now()}`,
        student_email: user.email,
        created_at: new Date().toISOString(),
      };
      setLocalNewComments(prev => [...prev, { ...newComment, parsed: parsedContent }]);
      setCommentInputs({ ...commentInputs, [targetId]: "" });
      showSuccess("💬 Komentar berhasil dikirim!");
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim komentar.");
    }
    setLoadingAction({ type: null, id: null });
  };

  const handleFinalSubmit = async () => {
    const answeredCount = answers.filter(a => a.trim().length >= 10).length;
    const isFormComplete = answeredCount >= Math.min(currentTask.questions.length, 6);
    if (!isFormComplete) return;

    let docContent = `LEMBAR KERJA MAHASISWA (LKM)\nTopik Pokok: ${currentTask.title}\nKelompok: ${groupNumber}\n\n`;
    (currentTask.questions || []).forEach((q, idx) => {
      docContent += `Soal ${idx + 1}:\n${q}\n\nJawaban:\n${answers[idx] || "-"}\n\n`;
    });

    await onComplete(docContent);
  };

  if (!groupsData) {
    return (
      <div className="bg-rose-50 border border-rose-200 p-10 rounded-[3rem] text-center flex flex-col items-center mt-10">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6">
          <span className="material-symbols-outlined text-5xl">group_off</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Kelompok Belum Dibentuk</h3>
        <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">Tutor belum melakukan pengacakan kelompok. Anda belum bisa mengerjakan LKM.</p>
      </div>
    );
  }

  if (!myGroupInfo) {
    return (
      <div className="bg-amber-50 border border-amber-200 p-10 rounded-[3rem] text-center flex flex-col items-center mt-10">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mb-6">
          <span className="material-symbols-outlined text-5xl">person_off</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Tidak Ada Kelompok</h3>
        <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">Akun Anda tidak terdaftar dalam kelompok sesi ini. Harap hubungi Tutor.</p>
      </div>
    );
  }

  const answeredCountGlobal = answers.filter(a => a.trim().length >= 10).length;
  const isFormCompleteGlobal = answeredCountGlobal >= Math.min(currentTask.questions.length, 6);
  const remainingRequiredGlobal = Math.max(0, Math.min(currentTask.questions.length, 6) - answeredCountGlobal);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 relative pb-20">
      
      {/* Toast Notifikasi */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
          <p className="font-bold text-sm tracking-tight">{successMsg}</p>
        </div>
      )}

      {/* HEADER TUGAS */}
      <div className="bg-gradient-to-br from-[#1a2169] to-indigo-950 border border-indigo-400/30 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl text-white mt-10">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[200px]">assignment</span>
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-400/30">
              <span className="material-symbols-outlined text-[14px]">groups</span>
              LKM Kelompok {groupNumber}
            </div>

            <div className="flex bg-indigo-950/50 rounded-2xl p-1.5 backdrop-blur-md border border-white/5">
              <button onClick={() => setActiveTab("MY_LKM")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "MY_LKM" ? "bg-white text-indigo-900 shadow-md" : "text-indigo-200 hover:text-white"}`}>TUGAS SAYA</button>
              <button onClick={() => setActiveTab("FORUM")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "FORUM" ? "bg-white text-indigo-900 shadow-md" : "text-indigo-200 hover:text-white"}`}>FORUM DISKUSI <span className="bg-rose-500 text-white px-1.5 py-0.5 rounded-md text-[9px] font-black">{allForumPosts.length}</span></button>
              <button onClick={() => setActiveTab("GRAFIK")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "GRAFIK" ? "bg-white text-indigo-900 shadow-md" : "text-indigo-200 hover:text-white"}`}>📊 GRAFIK</button>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2 leading-tight">{currentTask.title}</h2>
          <p className="text-indigo-200 text-sm font-medium">{activeTab === "MY_LKM" ? "Isi jawaban and bagikan ke forum untuk dinilai Tutor." : activeTab === "FORUM" ? "Beri komentar pada jawaban kelompok lain untuk meningkatkan poin keaktifan." : "Pantau tingkat keaktifan diskusi Anda."}</p>
        </div>
      </div>

      {activeTab === "MY_LKM" && (
        <div className="space-y-6">
          {status ? (
            <div className="bg-white border border-emerald-100 p-8 md:p-12 rounded-[3rem] text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-5xl">verified</span>
              </div>
              <h4 className="text-2xl font-black text-slate-800 mb-2">LKM Berhasil Dikirim!</h4>
              <p className="text-slate-500 text-sm mb-8">Terima kasih atas partisipasi aktif Anda. Anda masih bisa berdiskusi di forum.</p>
              <div className="w-full max-w-2xl bg-slate-50 p-6 rounded-2xl text-left border border-slate-100 italic text-slate-600 text-sm font-serif whitespace-pre-wrap">{status.content}</div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
              <div className="bg-[#fff9eb] border border-[#ffe0a3] p-4 rounded-2xl flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-500">save</span>
                <p className="text-xs text-amber-800 font-bold">Semua ketikan Anda tersimpan otomatis sebagai draft lokal.</p>
              </div>

              {currentTask.questions.map((question, idx) => {
                const isShared = allForumPosts.some(p => p.student_email === user.email && p.parsed.questionIndex === idx);
                const answerMissing = (answers[idx] || "").trim().length < 10;
                return (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 transition-all focus-within:bg-indigo-50/20 focus-within:border-indigo-200 relative">
                    {isShared && <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl rounded-tr-3xl">SUDAH DI FORUM</div>}
                    <div className="flex gap-4 mb-4 items-start pr-20">
                      <div className="w-8 h-8 rounded-lg bg-indigo-900 text-white flex items-center justify-center font-black text-sm shrink-0">{idx + 1}</div>
                      <p className="font-bold text-slate-700 leading-relaxed text-sm md:text-base">{question}</p>
                    </div>
                    <textarea
                      value={answers[idx] || ""}
                      onChange={(e) => { const n = [...answers]; n[idx] = e.target.value; setAnswers(n); }}
                      className="w-full min-h-[140px] bg-white border border-slate-200 rounded-2xl p-5 text-sm md:text-base outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all resize-y"
                      placeholder="Ketik jawaban di sini..."
                    ></textarea>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-lg ${answerMissing ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'}`}>{answerMissing ? "Min 10 karakter" : "Draft Tersimpan"}</span>
                      <button onClick={() => handleShareToForum(idx)} disabled={isShared || answerMissing || loadingAction.type === 'share'} className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${isShared ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-indigo-900 text-white hover:bg-black shadow-lg disabled:opacity-30'}`}>{isShared ? "✅ Tayang di Forum" : "🚀 Bagikan Ke Forum"}</button>
                    </div>
                  </div>
                );
              })}

              <div className="pt-8 border-t border-slate-100 text-center space-y-4">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${isFormCompleteGlobal ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}><span className="material-symbols-outlined text-3xl">{isFormCompleteGlobal ? 'task_alt' : 'lock'}</span></div>
                  <h3 className="text-xl font-black text-slate-800">Kumpul Tugas Akhir</h3>
                  <p className="text-xs text-slate-400 font-medium">Kirim seluruh jawaban kepada Tutor.</p>
                </div>
                {remainingRequiredGlobal > 0 && <p className="text-xs font-black text-rose-500">Kurang {remainingRequiredGlobal} jawaban lagi!</p>}
                <button onClick={handleFinalSubmit} disabled={!isFormCompleteGlobal || loading} className="w-full max-w-sm bg-black text-white px-8 py-5 rounded-2xl font-black tracking-[0.2em] text-xs shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-3">{loading ? "MENGIRIM..." : "KIRIM KE TUTOR"}<span className="material-symbols-outlined font-black">send</span></button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "FORUM" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm text-center">
            <span className="material-symbols-outlined text-6xl text-indigo-200 mb-4 block">groups</span>
            <h3 className="text-xl font-black text-slate-800">Panel Kolaborasi Mahasiswa</h3>
            <p className="text-xs text-slate-400 mt-1">Berikan komentar pada jawaban terpilih dari kelompok lain.</p>
          </div>
          {allForumPosts.map(post => {
            const profile = getStudentProfile(post.student_email);
            const comments = allComments.filter(c => c.parsed.targetId === post.id);
            return (
              <div key={post.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow shadow-sm">
                <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-900 text-white rounded-xl flex items-center justify-center font-black">{profile.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-black text-slate-800 uppercase leading-none mb-1">{profile.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">NIM: {profile.nim} • {new Date(post.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-lg border border-slate-200 text-[9px] font-black text-indigo-500 uppercase tracking-widest">KELOMPOK {post.parsed.groupNum}</div>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Soal:</p>
                    <p className="font-bold text-slate-700 text-sm mb-4">{post.parsed.questionText}</p>
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2 border-t pt-4">Jawaban:</p>
                    <p className="text-sm text-slate-600 leading-relaxed font-serif whitespace-pre-wrap">{post.parsed.answerText}</p>
                  </div>
                  <div className="space-y-4">
                    {comments.map((c, i) => {
                      const cp = getStudentProfile(c.student_email);
                      return (
                        <div key={i} className="flex gap-3 items-start bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50">
                          <div className="w-8 h-8 rounded-full bg-white text-slate-400 border flex items-center justify-center text-[10px] font-black">{cp.name.charAt(0)}</div>
                          <div>
                            <p className="text-[10px] font-black text-slate-600 mb-0.5">{cp.name} <span className="font-medium text-slate-400 ml-1">({cp.nim})</span></p>
                            <p className="text-xs text-slate-700 leading-relaxed">{c.parsed.comment}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex gap-3 pt-2">
                      <input value={commentInputs[post.id] || ""} onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })} placeholder="Berikan komentar bimbingan..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:bg-white focus:border-indigo-400" />
                      <button onClick={() => handleAddComment(post.id)} disabled={!commentInputs[post.id] || loadingAction.type === 'comment'} className="bg-indigo-600 text-white w-12 h-11 rounded-xl shadow-lg flex items-center justify-center hover:bg-black transition-all shrink-0">{loadingAction.type === 'comment' && loadingAction.id === post.id ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="material-symbols-outlined text-[18px]">send</span>}</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "GRAFIK" && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4"><span className="material-symbols-outlined text-2xl">public</span></div>
              <p className="text-4xl font-black text-slate-800 tracking-tighter">{myStats.myPosts}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Postingan Saya</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4"><span className="material-symbols-outlined text-2xl">chat</span></div>
              <p className="text-4xl font-black text-slate-800 tracking-tighter">{myStats.myComments}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Komentar Saya</p>
            </div>
            <div className={`p-8 rounded-[2.5rem] shadow-xl text-center flex flex-col items-center justify-center relative overflow-hidden ${myStats.badgeColor}`}>
               <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12"><span className="material-symbols-outlined text-8xl">military_tech</span></div>
               <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Status Keaktifan</p>
                  <p className="text-2xl font-black tracking-tight mb-2 underline decoration-white/30 underline-offset-4">{myStats.badge}</p>
                  <p className="text-[10px] font-bold opacity-80 leading-tight max-w-[150px] mx-auto">{myStats.badgeDesc}</p>
               </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm text-left">
            <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3"><span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Progress Target Diskusi Aktif</h3>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end"><div className="text-left"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Posting LKM ke Forum (Min 1)</p><p className="text-lg font-black text-slate-800 leading-none">{myStats.myPosts} <span className="text-slate-200">/ 1</span></p></div><span className={`text-[9px] font-black px-3 py-1 rounded-full ${myStats.myPosts >= 1 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{myStats.myPosts >= 1 ? '✓ TERPENUHI' : 'BELUM'}</span></div>
                <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100"><div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${Math.min(100, (myStats.myPosts / 1) * 100)}%` }}></div></div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end"><div className="text-left"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Beri Komentar (Min 5)</p><p className="text-lg font-black text-slate-800 leading-none">{myStats.myComments} <span className="text-slate-200">/ 5</span></p></div><span className={`text-[9px] font-black px-3 py-1 rounded-full ${myStats.myComments >= 5 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{myStats.myComments >= 5 ? '✓ TERPENUHI' : 'BELUM'}</span></div>
                <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100"><div className="h-full bg-rose-500 transition-all duration-1000" style={{ width: `${Math.min(100, (myStats.myComments / 5) * 100)}%` }}></div></div>
              </div>
            </div>
            <div className="mt-12 bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
              <span className="material-symbols-outlined text-indigo-400">speed</span>
              <p className="text-[11px] font-medium text-slate-400 leading-relaxed">Statistik ini dihitung secara otomatis berdasarkan aktivitas Anda di Tab Forum Diskusi. Anda harus memenuhi target minimal agar dianggap "AKTIF" oleh Tutor.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
