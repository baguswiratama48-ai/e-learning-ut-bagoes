function DashboardTutor({ user }) {
  const [submissions, setSubmissions] = useState([]);
  const [moduleContent, setModuleContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');
  const [unlocking, setUnlocking] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState('1');
  const [groupCount, setGroupCount] = useState(4);
  const [generating, setGenerating] = useState(false);

  if (!user || user.role !== 'tutor') return <Navigate to="/" />;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: subs, error: errSubs } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
      const { data: mods, error: errMods } = await supabase.from('module_content').select('*').order('page_num', { ascending: true });
      if (errSubs) throw errSubs;
      if (errMods) throw errMods;
      setSubmissions(subs || []);
      setModuleContent(mods || []);
    } catch (err) {
      console.log("Supabase fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleUnlock = async (studentEmail, sectionName) => {
    const key = `${studentEmail}_${sectionName}`;
    setUnlocking(key);
    try {
      await supabase.from('submissions').delete().eq('student_email', studentEmail).eq('section_name', sectionName);
      await supabase.from('submissions').delete().eq('student_email', studentEmail).eq('section_name', `TUTOR_FEEDBACK_${sectionName}`);
      await fetchData();
    } catch(err) { console.log(err); } finally { setUnlocking(null); }
  };

  const handleStarFeedback = async (studentEmail, classId, meetingNum, sectionName, stars) => {
    try {
      const feedbackName = `TUTOR_FEEDBACK_${sectionName}`;
      setSubmissions(prev => {
        const withoutOld = prev.filter(s => !(s.student_email === studentEmail && s.section_name === feedbackName));
        return [...withoutOld, { student_email: studentEmail, class_id: classId, meeting_num: meetingNum, section_name: feedbackName, content: String(stars) }];
      });
      await supabase.from('submissions').delete().eq('student_email', studentEmail).eq('section_name', feedbackName);
      await supabase.from('submissions').insert([{ student_email: studentEmail, class_id: classId, meeting_num: meetingNum, section_name: feedbackName, content: String(stars) }]);
    } catch(err) { console.log(err); }
  };
  
  const handleGenerateGroups = async () => {
    if (!activeTab || activeTab === 'record_m1') return;
    setGenerating(true);
    try {
      const classStudents = STUDENTS.filter(s => s.classId === activeTab);
      if (classStudents.length === 0) return;
      const shuffled = [...classStudents];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const groups = Array.from({ length: groupCount }, (_, i) => ({ group_num: i + 1, members: [] }));
      shuffled.forEach((student, index) => {
        groups[index % groupCount].members.push({ nim: student.nim, name: student.name, email: student.email });
      });
      const sectionName = "GENERATED_GROUPS";
      const payload = { student_email: 'SYSTEM_GROUP', class_id: activeTab, meeting_num: selectedMeeting, section_name: sectionName, content: JSON.stringify(groups) };
      await supabase.from('submissions').delete().eq('student_email', 'SYSTEM_GROUP').eq('class_id', activeTab).eq('meeting_num', selectedMeeting).eq('section_name', sectionName);
      const { error } = await supabase.from('submissions').insert([payload]);
      if (error) throw error;
      alert(`Berhasil mengacak ${classStudents.length} mahasiswa ke dalam ${groupCount} kelompok untuk Pertemuan ${selectedMeeting}!`);
      await fetchData();
    } catch (err) { console.log(err); alert("Gagal mengacak kelompok."); } finally { setGenerating(false); }
  };

  const handleResetGroups = async () => {
    if (!activeTab || activeTab === 'record_m1') return;
    if (!confirm(`Apakah Anda yakin ingin menghapus pembagian kelompok?`)) return;
    setGenerating(true);
    try {
      await supabase.from('submissions').delete().eq('student_email', 'SYSTEM_GROUP').eq('class_id', activeTab).eq('meeting_num', selectedMeeting).eq('section_name', 'GENERATED_GROUPS');
      alert(`Berhasil mereset kelompok.`);
      await fetchData();
    } catch (err) { console.log(err); alert("Gagal mereset kelompok."); } finally { setGenerating(false); }
  };

  const CLASS_TABS = [
    { id: '1', label: 'Kelas 8B' }, { id: '2', label: 'Kelas 8C' }, { id: '3', label: 'Kelas 6A' },
    { id: '4', label: 'Kelas 5A' }, { id: 'demo', label: 'Demo' }, { id: 'record_m1', label: '📂 Record Modul 1' }
  ];

  const studentList = activeTab === 'demo' ? STUDENTS.filter(s => s.email === 'demo@ecampus.ut.ac.id').slice(0, 1) : STUDENTS.filter(s => s.classId === activeTab && s.email !== 'demo@ecampus.ut.ac.id');
  const [expandedStudent, setExpandedStudent] = useState(null);
  const toggleStudent = (email) => setExpandedStudent(expandedStudent === email ? null : email);

  return (
    <div className="py-8 min-h-[70vh] px-4">
      <h2 className="font-headline font-bold text-3xl text-primary mb-1">Monitoring Keaktifan</h2>
      <p className="text-slate-500 mb-6 font-medium italic text-sm">Monitoring real-time aktivitas dan jawaban mahasiswa per kelas.</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {CLASS_TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-500'}`}>
            {tab.label}
          </button>
        ))}
        <button onClick={fetchData} className="ml-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-400 hover:border-primary text-sm font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">refresh</span> Refresh
        </button>
      </div>

      {activeTab !== 'demo' && activeTab !== 'record_m1' && (
        <div className="mb-8 p-6 bg-gradient-to-r from-primary to-[#1a2169] rounded-[2.5rem] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <span className="material-symbols-outlined text-3xl">group_add</span>
              </div>
              <div>
                 <h3 className="font-bold text-lg leading-tight">Generator Kelompok Acak</h3>
                 <p className="text-white text-opacity-60 text-[10px] font-medium uppercase tracking-wider">Acak kelompok berbeda untuk setiap sesi mahasiswa</p>
              </div>
           </div>
           
           <div className="flex flex-wrap items-center gap-4 bg-white bg-opacity-10 p-2 rounded-2xl backdrop-blur-sm border border-white border-opacity-10">
              <div className="px-3 border-r border-white border-opacity-10">
                 <p className="text-[10px] font-black opacity-40 uppercase mb-1">Sesi Pertemuan</p>
                 <select value={selectedMeeting} onChange={e => setSelectedMeeting(e.target.value)} className="bg-transparent font-bold text-sm outline-none cursor-pointer">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={String(n)} className="text-slate-800">Pertemuan {n}</option>)}
                 </select>
              </div>
              <div className="px-3 border-r border-white border-opacity-10">
                 <p className="text-[10px] font-black opacity-40 uppercase mb-1">Jumlah Kelompok</p>
                 <input type="number" min="2" max="20" value={groupCount} onChange={e => setGroupCount(parseInt(e.target.value))} className="bg-transparent font-bold text-sm outline-none w-10 text-center" />
              </div>
              <div className="flex gap-2">
                 <button onClick={handleGenerateGroups} disabled={generating} className="bg-yellow-400 text-primary px-6 py-2.5 rounded-xl font-black text-xs shadow-lg disabled:opacity-50 flex items-center gap-2">
                    {generating ? '...' : 'ACAK SEKARANG'} <span className="material-symbols-outlined text-sm">casino</span>
                 </button>
                 <button onClick={handleResetGroups} disabled={generating} className="bg-red-500 bg-opacity-10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl font-black text-xs transition-all border border-red-500 border-opacity-20 flex items-center gap-2 disabled:opacity-50">
                    <span className="material-symbols-outlined text-sm">delete_sweep</span>
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-20 bg-slate-50">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-slate-400 font-bold">Memuat Data...</p>
          </div>
        ) : activeTab === 'record_m1' ? (
           <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <h3 className="text-2xl font-headline font-bold text-slate-800">Manajemen Konten Modul 1</h3>
                    <p className="text-sm text-slate-500 font-medium">Hasil transkripsi dari Pustaka UT</p>
                 </div>
              </div>
              {moduleContent.length === 0 ? (
                 <div className="bg-slate-50 border-2 border-dashed rounded-3xl p-20 text-center text-slate-500 italic">Belum ada konten.</div>
              ) : (
                 <div className="space-y-6">
                    {['materi', 'rangkuman', 'soal_latihan'].map(type => {
                       const items = moduleContent.filter(m => m.content_type === type);
                       if (items.length === 0) return null;
                       return (
                          <div key={type} className="space-y-4">
                             <h4 className="flex items-center gap-2 text-primary font-black uppercase text-xs bg-primary bg-opacity-5 px-4 py-2 rounded-lg w-fit">{type.replace('_', ' ')}</h4>
                             <div className="grid grid-cols-1 gap-4">
                                {items.map((item, mi) => (
                                   <div key={mi} className="bg-white border-l-4 border-l-primary border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                      <p className="text-xs font-bold text-primary opacity-50 uppercase tracking-tighter">HALAMAN {item.page_num}</p>
                                      <h5 className="font-bold text-slate-800 text-lg">{item.section_title}</h5>
                                      <div className="bg-slate-50 p-6 rounded-2xl border text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-wrap font-serif mt-4">{item.body_text}</div>
                                   </div>
                                ))}
                             </div>
                          </div>
                       );
                    })}
                 </div>
              )}
           </div>
        ) : (
           <div className="p-0">
             {(activeTab === '1' || activeTab === '2') && (
                <div className="p-8 bg-slate-50 bg-opacity-50 border-b border-slate-100">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                         <span className="material-symbols-outlined text-3xl">hub</span>
                      </div>
                      <div>
                         <h3 className="text-xl font-headline font-black text-slate-800 leading-tight">Rekapitulasi LKPD Kelompok</h3>
                         <p className="text-xs text-slate-500 font-medium tracking-tight">Hasil pengerjaan per tim (Sesi {selectedMeeting})</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(() => {
                         const groupSubs = submissions.filter(s => s.class_id === activeTab && s.meeting_num === selectedMeeting && s.student_email.startsWith('GROUP_LKPD_'));
                         const sysGrp = submissions.find(s => s.student_email === 'SYSTEM_GROUP' && s.class_id === activeTab && s.meeting_num === selectedMeeting);
                         const allGroups = sysGrp ? JSON.parse(sysGrp.content) : [];
                         if (allGroups.length === 0) return <div className="col-span-full py-10 text-center text-slate-400 font-bold">Kelompok belum dibuat.</div>;
                         return allGroups.map((g, i) => {
                            const sub = groupSubs.find(s => s.student_email.endsWith(`_G${g.group_num}`));
                            return (
                               <div key={i} className={`bg-white rounded-3xl p-6 border-2 transition-all ${sub ? 'border-emerald-100 shadow-lg' : 'border-slate-100 opacity-60'}`}>
                                  <div className="flex justify-between items-start mb-4">
                                     <h4 className="font-black text-slate-800 flex items-center gap-2">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${sub ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-50'}`}>{g.group_num}</span>
                                        Kelompok {g.group_num}
                                     </h4>
                                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${sub ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{sub ? 'Sudah Kirim' : 'Belum Kirim'}</span>
                                  </div>
                                  {sub && (
                                     <div className="space-y-4">
                                        <div className="bg-slate-50 px-4 py-2 rounded-2xl">
                                           <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Skor Game</p>
                                           <p className="font-black text-primary text-xl">{(sub.content.match(/SKOR GAME: (\d+)/) || [])[1] || '0'} / 100</p>
                                        </div>
                                        <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                                           <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-2">Jawaban Kasus</p>
                                           <p className="text-xs font-bold text-slate-700 italic leading-relaxed">"{sub.content.split('JAWABAN KASUS SISWA A: ')[1] || 'Tidak ada jawaban'}"</p>
                                        </div>
                                     </div>
                                  )}
                               </div>
                            );
                         });
                      })()}
                   </div>
                </div>
             )}

             <div className="overflow-x-auto p-8">
                <div className="mb-4 flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary">person</span>
                   <h3 className="text-lg font-headline font-black text-slate-800">Daftar Mahasiswa (Individu)</h3>
                </div>
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-primary text-white uppercase tracking-wider font-bold">
                      <th className="px-4 py-4 w-10 text-center">No</th>
                      <th className="px-4 py-4">Mahasiswa</th>
                      <th className="px-4 py-4 text-center">Jawaban</th>
                      <th className="px-4 py-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {studentList.map((student, index) => {
                      const studentSubs = submissions.filter(s => s.student_email === student.email);
                      const actualAnswers = studentSubs.filter(s => !s.section_name.startsWith("TUTOR_FEEDBACK_"));
                      return (
                        <Fragment key={index}>
                          <tr className={index % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50 hover:bg-slate-50'}>
                            <td className="px-4 py-4 font-bold text-slate-400 text-center">{index + 1}</td>
                            <td className="px-4 py-4">
                              <p className="font-bold text-slate-800 uppercase leading-none mb-1">{student.name}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{student.nim}</p>
                            </td>
                            <td className="px-4 py-4 text-center">
                               <span className="inline-block bg-primary bg-opacity-10 text-primary font-bold px-3 py-1 rounded-full text-xs">{actualAnswers.length}</span>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <button onClick={() => toggleStudent(student.email)} className="bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-md hover:bg-[#1a2169] transition-all">
                                {expandedStudent === student.email ? 'Tutup' : 'Cek'}
                              </button>
                            </td>
                          </tr>
                          {expandedStudent === student.email && (
                            <tr className="bg-slate-50">
                              <td colSpan={5} className="p-6">
                                {actualAnswers.length === 0 ? (
                                  <p className="text-center text-slate-400 italic text-xs font-bold py-4">Belum ada jawaban.</p>
                                ) : (
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {actualAnswers.map((answer, i) => {
                                      const tutorFb = studentSubs.find(s => s.section_name === `TUTOR_FEEDBACK_${answer.section_name}`);
                                      const curStars = tutorFb ? parseInt(tutorFb.content) : 0;
                                      return (
                                        <div key={i} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between">
                                          <div>
                                            <p className="text-[10px] font-bold text-primary uppercase bg-primary bg-opacity-10 px-2 py-0.5 rounded inline-block mb-2">{answer.section_name}</p>
                                            <div className="bg-slate-50 border p-2.5 rounded-lg mb-3">
                                              <p className="text-[11px] font-medium text-slate-700 italic">"{answer.content}"</p>
                                            </div>
                                          </div>
                                          <div className="pt-2 border-t flex justify-between items-center">
                                            <div className="flex gap-0.5">
                                              {[1,2,3,4,5].map(star => (
                                                <button key={star} onClick={() => handleStarFeedback(student.email, student.classId, answer.meeting_num || '1', answer.section_name, star)} className={`text-[18px] ${star <= curStars ? 'text-yellow-400' : 'text-slate-300'}`}>
                                                  <span className="material-symbols-outlined fill-1 text-[18px]">star</span>
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
