import React from 'react';
import { Link } from 'react-router-dom';
import { FEEDBACK_MESSAGES } from '../data/mockData';
import { LkpdClass6A } from './LkpdClass6A';

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
  if (sectionName === "Pembagian Kelompok") {
    const groupRow = submissions.find(
      (s) => s.student_email === "SYSTEM_GROUP" && String(s.meeting_num) === String(meetingId) && String(s.class_id) === String(cls?.id || '3')
    );
    const groups = groupRow ? JSON.parse(groupRow.content) : [];
    const myGroup = groups.find((g) =>
      g.members.some((m) => m.email === user.email)
    );

    return (
      <div className="space-y-8 pb-10">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-teal-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-sm">groups</span>{" "}
              Daftar Kelompok
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Misi Kolaborasi Tim
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
              Cari nama Anda di dalam daftar kelompok di bawah ini. Diskusikan
              tugas yang diberikan oleh Tutor sesuai dengan pembagian modul
              masing-masing.
            </p>
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 p-16 rounded-[3rem] text-center">
            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 scale-110">
              pending_actions
            </span>
            <h3 className="text-xl font-black text-slate-800 mb-2">
              Belum Ada Pembagian
            </h3>
            <p className="text-slate-400 text-sm font-medium">
              Tutor belum melakukan pembagian kelompok untuk pertemuan ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((g) => {
              const isMyGroup = myGroup?.group_num === g.group_num;
              const moduleLabel =
                id === "3"
                  ? `Modul ${g.group_num}`
                  : `Topik ${g.group_num}`;

              return (
                <div
                  key={g.group_num}
                  className={`relative group bg-white rounded-[2.5rem] p-8 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    isMyGroup
                      ? "border-teal-500 shadow-xl shadow-teal-500 shadow-opacity-10 ring-4 ring-teal-500 ring-opacity-5"
                      : "border-slate-100 shadow-sm hover:border-teal-200"
                  }`}
                >
                  {isMyGroup && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg animate-bounce">
                      Kelompok Anda
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner ${
                        isMyGroup
                          ? "bg-teal-500 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {g.group_num}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Penugasan
                      </p>
                      <p
                        className={`font-black text-sm uppercase ${
                          isMyGroup ? "text-teal-600" : "text-slate-800"
                        }`}
                      >
                        {moduleLabel}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-2">
                      Anggota Tim ({g.members.length})
                    </p>
                    <div className="space-y-3">
                      {g.members.map((m, mi) => (
                        <div key={mi} className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${
                              m.email === user.email
                                ? "bg-teal-500 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {!!m.isLeader ? (
                              <span className="material-symbols-outlined text-sm text-yellow-400">
                                stars
                              </span>
                            ) : (
                              m.name.charAt(0)
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-xs font-bold truncate flex items-center gap-2 ${
                                m.email === user.email
                                  ? "text-teal-600"
                                  : "text-slate-700"
                              }`}
                            >
                              {m.name}
                              {!!m.isLeader && (
                                <span className="bg-yellow-100 text-yellow-700 text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
                                  Ketua
                                </span>
                              )}
                            </p>
                            <p className="text-[9px] text-slate-400 font-medium">
                              {m.nim}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {id === "3" && (
                    <div className="mt-8 pt-6 border-t border-slate-50">
                      <Link
                        to={`/class/${id}/meeting/${meetingId}/section/${encodeURIComponent("LKPD (Lembar Kerja Peserta Didik)")}`}
                        className="w-full bg-slate-50 hover:bg-teal-500 hover:text-white text-slate-400 text-[10px] font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-transparent hover:border-teal-400"
                      >
                        MULAI PENGERJAAN
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (sectionName === "LKPD (Lembar Kerja Peserta Didik)" && id === "3") {
    return (
       <LkpdClass6A 
         user={user}
         meetingId={meetingId}
         status={status}
         submissions={submissions}
         onComplete={handleAction}
         loading={loading}
       />
    );
  }

  if (sectionName === "Video Pembelajaran" && id === "3") {
    const videoId = "g1xgaTWoOiM";
    return (
      <div className="space-y-10 md:space-y-12 pb-10">
        <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden group">
          <div className="aspect-video relative bg-slate-100 flex items-center justify-center">
            <a
              href={`https://youtu.be/${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700 transition-all"
            >
              Tonton di YouTube
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Evaluation Section */}
        <div className="bg-[#1e293b] text-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden border border-white border-opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary bg-opacity-20 rounded-full -mr-48 -mt-48 blur-[120px]"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <span className="w-2 h-2 bg-slate-900 rounded-full animate-pulse"></span>
              Evaluasi Video
            </div>
            <h4 className="font-headline font-black text-2xl md:text-4xl text-white mb-6 leading-tight uppercase tracking-tighter text-center">
              Apa yang kamu pelajari dari video ini?
            </h4>
            <p className="text-slate-400 text-sm md:text-base font-medium mb-10 leading-relaxed text-center">
              Tuangkan pemahaman Anda setelah menonton tayangan di atas dalam bentuk rangkuman singkat dan jelas di bawah ini.
            </p>

            {status ? (
              <div className="w-full bg-white bg-opacity-5 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] border border-white border-opacity-10 shadow-inner text-left">
                <p className="text-[9px] md:text-[10px] text-yellow-400 font-black uppercase tracking-widest mb-4 opacity-70">Laporan Belajar Anda:</p>
                <div className="bg-white bg-opacity-5 p-4 rounded-2xl">
                   <p className="text-sm md:text-lg text-slate-200 leading-relaxed italic font-serif opacity-90">"{status.content}"</p>
                </div>
                <div className="mt-8 flex items-center gap-3 py-3 px-6 bg-green-500 bg-opacity-20 rounded-2xl border border-green-500 border-opacity-30 w-fit">
                  <span className="material-symbols-outlined text-green-400">check_circle</span>
                  <p className="text-[10px] text-green-400 font-black uppercase tracking-widest">Berhasil Terkirim</p>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-6">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan analisis Anda di sini..."
                  className="w-full min-h-[180px] md:min-h-[220px] bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 text-sm md:text-lg text-white placeholder:text-slate-600 focus:bg-white focus:bg-opacity-10 focus:border-yellow-400 outline-none transition-all resize-none"
                ></textarea>
                <button
                  onClick={() => handleAction(content)}
                  disabled={loading || !content.trim()}
                  className="w-full bg-yellow-400 text-slate-900 font-black py-5 md:py-7 rounded-2xl md:rounded-[2.5rem] hover:bg-yellow-300 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-yellow-400 shadow-opacity-20 flex items-center justify-center gap-3 text-sm md:text-xl tracking-widest uppercase disabled:opacity-30"
                >
                  {loading ? "MENGIRIM JAWABAN..." : "KIRIM JAWABAN KE TUTOR"}
                  {!loading && <span className="material-symbols-outlined font-black">send</span>}
                </button>
              </div>
            )}
          </div>
        </div>

        {status && tutorFeedback && (
          <div className="bg-yellow-50 border border-yellow-200 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-lg shadow-yellow-400 shadow-opacity-40">
              <span className="material-symbols-outlined text-white text-5xl">stars</span>
            </div>
            <div className="text-center md:text-left">
              <p className="font-black text-yellow-700 mb-1 text-xl md:text-3xl uppercase tracking-tighter">Hasil Penilaian</p>
              <p className="text-sm md:text-lg text-yellow-800 mb-6 italic font-medium">"{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || "Tutor telah memberikan penilaian."}"</p>
              <div className="flex justify-center md:justify-start gap-2 text-yellow-500">
                {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-3xl md:text-4xl fill-1">star</span>
                ))}
                {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-3xl md:text-4xl text-slate-200">star</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (sectionName === "Video Pembelajaran" && (id === "1" || id === "2")) {
    const videoId = "GYlmNScMEl4";
    const wordCount = content.trim()
      ? content
          .trim()
          .split(new RegExp("\\s+"))
          .filter((w) => w.length > 0).length
      : 0;
    const isWordCountEnough = wordCount >= 100;

    return (
      <div className="space-y-8">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Video Pembelajaran"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-6 bg-slate-50 border-t items-center flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600 text-[18px]">
                  movie
                </span>
              </div>
              <p className="font-bold text-slate-800 text-sm">
                Video Pembelajaran Kelas 8B & 8C
              </p>
            </div>
            <a
              href={`https://youtu.be/${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-primary uppercase bg-white border px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              Buka di YouTube
            </a>
          </div>
        </div>

        <div className="bg-[#0f172a] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white border-opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary bg-opacity-20 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 bg-opacity-10 rounded-full -ml-24 -mb-24 blur-[80px]"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="font-headline font-bold text-xl md:text-2xl text-yellow-400 tracking-tight flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-yellow-400 bg-opacity-20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-yellow-400">
                      description
                    </span>
                  </span>
                  Kesimpulan Video
                </h4>
                <p className="text-slate-400 text-sm mt-2 font-medium">
                  Susunlah poin-poin penting dari video yang telah Anda
                  tonton.
                </p>
              </div>
              {!status && (
                <div
                  className={`px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${isWordCountEnough ? "bg-green-500 bg-opacity-10 border-green-500 border-opacity-30 text-green-400" : "bg-white bg-opacity-5 border-white border-opacity-10 text-slate-400"}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isWordCountEnough ? "bg-green-500 animate-pulse" : "bg-slate-500"}`}
                  ></span>
                  Syarat: 100 Kata
                </div>
              )}
            </div>

            {status ? (
              <div className="space-y-4">
                <div className="bg-white bg-opacity-5 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-white border-opacity-10 shadow-inner">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] text-yellow-400 text-opacity-70 border border-yellow-400 border-opacity-30 px-2 py-0.5 rounded-md uppercase font-black tracking-tighter">
                      Laporan Mahasiswa
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-slate-200 leading-[1.8] text-justify italic font-serif">
                    {status.content}
                  </p>
                  <div className="mt-8 flex items-center gap-3 py-3 px-5 bg-green-500 bg-opacity-10 rounded-2xl border border-green-500 border-opacity-20 w-fit">
                    <span className="material-symbols-outlined text-green-400 text-xl font-bold">
                      verified
                    </span>
                    <p className="text-xs text-green-400 font-bold uppercase tracking-widest">
                      Terkirim & Terarsip
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 from-opacity-20 to-primary to-opacity-20 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Masukkan analisis dan kesimpulan Anda di sini (Minimal 100 kata)..."
                    className="relative w-full bg-[#1e293b] bg-opacity-50 border border-white border-opacity-10 rounded-[2rem] p-6 md:p-8 text-sm md:text-base text-white placeholder:text-slate-500 focus:bg-[#1e293b] focus:border-yellow-400 focus:border-opacity-50 outline-none min-h-[300px] resize-none transition-all leading-relaxed text-justify"
                  ></textarea>

                  <div className="absolute bottom-6 right-6 flex items-center gap-3">
                    <p
                      className={`text-xs font-black tracking-tighter transition-colors ${isWordCountEnough ? "text-green-400" : "text-slate-500"}`}
                    >
                      {wordCount.toLocaleString()}{" "}
                      <span className="opacity-50">{" / "} 100 KATA</span>
                    </p>
                    <div className="w-10 h-10 rounded-full bg-black bg-opacity-40 flex items-center justify-center border border-white border-opacity-5">
                      {isWordCountEnough ? (
                        <span className="material-symbols-outlined text-green-400 text-lg">
                          check_circle
                        </span>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-2">
                  <p className="text-[11px] text-slate-500 font-medium italic order-2 md:order-1">
                    * Kesimpulan yang dikirim tidak dapat diubah kembali.
                    Mohon teliti.
                  </p>
                  <button
                    onClick={() => handleAction(content)}
                    disabled={loading || !isWordCountEnough}
                    className="w-full md:w-auto min-w-[240px] bg-yellow-400 text-slate-900 font-black py-4 px-8 rounded-2xl hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-xl shadow-yellow-400 shadow-opacity-10 flex items-center justify-center gap-3 order-1 md:order-2"
                  >
                    {loading ? "MEMPROSES..." : "KIRIM KESIMPULAN VIDEO"}
                    {!loading && isWordCountEnough && (
                      <span className="material-symbols-outlined font-bold">
                        send
                      </span>
                    )}
                  </button>
                </div>

                {!isWordCountEnough && content.trim().length > 0 && (
                  <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                    <span className="material-symbols-outlined text-red-400">
                      priority_high
                    </span>
                    <p className="text-xs text-red-300 font-bold uppercase tracking-wider">
                      Kurang {100 - wordCount} kata lagi untuk membuka akses
                      tombol kirim.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {status && tutorFeedback && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="material-symbols-outlined text-yellow-500 text-4xl">
              stars
            </span>
            <div>
              <p className="font-bold text-yellow-700 mb-1 text-lg">
                Nilai Kesimpulan Anda
              </p>
              <p className="text-sm text-yellow-800 mb-3 italic">
                "
                {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                  "Tutor telah memberikan penilaian."}
                "
              </p>
              <div className="flex gap-1 text-yellow-500">
                {Array(parseInt(tutorFeedback.content))
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined fill-1 text-2xl"
                    >
                      star
                    </span>
                  ))}
                {Array(5 - parseInt(tutorFeedback.content))
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-slate-300 text-2xl"
                    >
                      star
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (sectionName === "Informasi Modul" && id === "3") {
    return (
      <div className="space-y-10 md:space-y-16 pb-10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-14 overflow-hidden shadow-2xl border border-white border-opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary bg-opacity-20 rounded-full -mr-40 -mt-40 blur-[120px]"></div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-yellow-400 shadow-opacity-20">
              <span className="material-symbols-outlined text-sm md:text-base">book</span> Informasi Mata Kuliah
            </span>
            <h1 className="text-3xl md:text-6xl font-headline font-black text-white mb-4 leading-tight">
              Penanganan Anak <br className="hidden md:block" /> Berkebutuhan Khusus
            </h1>
            <div className="flex flex-wrap gap-3 md:gap-4 mt-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-md px-4 py-2 rounded-xl border border-white border-opacity-10 text-white text-xs md:text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-yellow-400">code</span> PAUD4208
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-md px-4 py-2 rounded-xl border border-white border-opacity-10 text-white text-xs md:text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400">history_edu</span> 4 SKS
              </div>
            </div>
          </div>
        </div>

        {/* Pengantar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-l-[12px] border-l-primary">
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">diversity_1</span>
                Aspek Perkembangan
              </h3>
              <p className="text-slate-600 font-medium leading-[1.8] text-sm md:text-base text-justify">
                Setiap aspek perkembangan manusia saling berkaitan antara satu dengan lainnya. Apabila satu aspek perkembangan mengalami masalah atau gangguan maka ada kemungkinan aspek perkembangan lainnya pun akan terpengaruh dan bisa membuat perkembangan secara umum menjadi tidak optimal. 
              </p>
              <div className="mt-6 bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100">
                <p className="text-xs md:text-sm text-slate-500 italic font-medium leading-relaxed">
                  "Di lembaga PAUD dapat ditemui anak yang tampak ceria, namun terkadang kita melihat anak yang memiliki keseimbangan buruk atau koordinasi motorik yang tidak sempurna."
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-[#1a2169] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-white shadow-xl shadow-indigo-500 shadow-opacity-10">
              <h3 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-3 text-yellow-400">
                <span className="material-symbols-outlined">child_care</span>
                Masa Kritis (3-6 Tahun)
              </h3>
              <p className="text-blue-50 text-opacity-90 font-medium leading-[1.8] text-sm md:text-base text-justify">
                Anak usia prasekolah berada pada masa kritis karena mulai membangun rasa percaya terhadap dunia di sekitarnya. Mereka belajar untuk mandiri, membangun kontrol diri, serta belajar mengambil inisiatif dalam kegiatan sosial.
              </p>
              <p className="mt-6 text-yellow-200 text-xs md:text-sm font-bold flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm">priority_high</span> Pendidik PAUD wajib mengidentifikasi gangguan sedini mungkin.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
               <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary bg-opacity-10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl md:text-4xl text-primary font-black">inventory_2</span>
               </div>
               <div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-800">Struktur BMP</h3>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Buku Materi Pokok PAUD4208</p>
               </div>
            </div>
            
            <div className="space-y-4 md:space-y-6 flex-1">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                Informasi ini dirancang agar mahasiswa dapat mengidentifikasi dan mengambil tindakan yang tepat dalam penanganan anak berkebutuhan khusus secara mandiri maupun kolaboratif.
              </p>

              <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-slate-100 mt-auto">
                  <h4 className="font-black text-slate-800 text-xs md:text-sm mb-4 uppercase tracking-tighter flex items-center gap-2 border-b border-slate-200 pb-3">
                      <span className="material-symbols-outlined text-sm">list_alt</span> Ringkasan 12 Modul:
                  </h4>
                  <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {[
                          "M1: Anak dengan Perkembangan Nonnormatif",
                          "M2: Anak dengan Gangguan Fisik",
                          "M3: Anak dengan Gangguan Panca Indra",
                          "M4: Anak dengan Gangguan Autism",
                          "M5: Anak dengan Gangguan Perilaku",
                          "M6: Anak dengan Gangguan Belajar",
                          "M7: Anak dengan Gangguan Bahasa",
                          "M8: Anak dengan Gangguan Emosi",
                          "M9: Masalah Rutinitas Harian",
                          "M10: Gangguan Attachment",
                          "M11: Maltreatment pada Anak",
                          "M12: Kerjasama Penanganan"
                      ].map((modul, i) => (
                          <div key={i} className="flex gap-3 items-center group cursor-default">
                              <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-primary text-[10px] font-black flex flex-shrink-0 items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">{i+1}</span>
                              <span className="text-[11px] md:text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors uppercase">{modul}</span>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full List Grid (Visual Accent) */}
        <section className="space-y-6 md:space-y-10">
           <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-4xl font-headline font-black text-slate-800 uppercase tracking-tighter">Detail Kurikulum Modul</h2>
              <p className="text-xs md:text-sm text-slate-400 font-medium">Kompetensi yang akan dipelajari di mata kuliah PAUD4208</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                "Perkembangan Nonnormatif", "Gangguan Fisik", "Gangguan Panca Indra", "Gangguan Autism",
                "Gangguan Perilaku", "Gangguan Belajar", "Gangguan Bahasa", "Gangguan Emosi",
                "Rutinitas Harian", "Gangguan Attachment", "Maltreatment", "Kerjasama Penanganan"
              ].map((name, i) => (
                <div key={i} className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary transition-all group flex flex-col items-center text-center">
                   <span className="text-primary font-black text-xl md:text-2xl mb-2 opacity-20 group-hover:opacity-100 transition-opacity">{String(i+1).padStart(2, '0')}</span>
                   <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-1 group-hover:text-primary">Modul {i+1}</p>
                   <p className="text-[10px] md:text-xs font-bold text-slate-700 leading-tight">{name}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Verification Section */}
        <div className="mt-10 md:mt-20 pt-10 border-t border-slate-100 flex flex-col items-center">
          {!status ? (
            <div className="w-full max-w-xl">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-yellow-200 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-3 md:mb-4">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  Konfirmasi Pemahaman
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-800 mb-1 md:mb-2 text-center uppercase">
                  Evaluasi Struktur Modul
                </h3>
              </div>

              <div className="bg-white border-2 border-primary border-opacity-10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-xl shadow-primary shadow-opacity-5">
                <label className="block text-[11px] md:text-sm font-black text-primary uppercase tracking-tight mb-3 md:mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">question_answer</span>
                  Pertanyaan:
                </label>
                <p className="text-base md:text-lg font-bold text-slate-800 mb-6 md:mb-8 leading-snug">
                  Modul mana yang menurutmu menantang?
                </p>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Contoh: Modul 4 tentang Autism, karena..."
                  className="w-full min-h-[120px] md:min-h-[150px] bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl p-4 md:p-6 text-[11px] md:text-sm focus:bg-white focus:border-primary focus:ring-1 outline-none transition-all resize-none mb-4 md:mb-8"
                ></textarea>

                <button
                  onClick={() => handleAction(content)}
                  disabled={loading || !content.trim()}
                  className="w-full bg-primary text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl hover:bg-[#1a2169] transition-all flex items-center justify-center gap-2 md:gap-3 group disabled:opacity-50 shadow-lg shadow-primary shadow-opacity-20 text-xs md:text-base tracking-widest"
                >
                  {loading ? "MENGIRIM..." : "KIRIM ANALISIS MODUL"}
                  {!loading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm md:text-base font-bold">send</span>}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xl bg-[#1e293b] text-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-slate-900 shadow-opacity-20 flex flex-col items-center text-center border border-white border-opacity-10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-primary shadow-opacity-40">
                <span className="material-symbols-outlined text-2xl md:text-4xl">check</span>
              </div>
              <h3 className="text-lg md:text-2xl font-black mb-2 text-yellow-400 uppercase tracking-tighter">Analisis Modul Terdaftar!</h3>
              <p className="text-slate-400 text-[11px] md:text-sm font-medium mb-6 md:mb-8 leading-relaxed">
                Tutor akan meninjau jawaban Anda. Silakan lanjut ke menu Pertanyaan Pemantik atau Materi Pembelajaran.
              </p>
              <div className="bg-white bg-opacity-5 px-5 py-4 md:px-8 md:py-6 rounded-2xl w-full border border-white border-opacity-5 text-left">
                <p className="text-[9px] md:text-[10px] font-black uppercase text-blue-400 mb-2 tracking-widest">Opini Anda:</p>
                <p className="text-[11px] md:text-xs italic font-medium opacity-80 leading-relaxed">"{status.content}"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (sectionName === "Informasi Modul") {
    const modulContent = COURSE_DATA[courseCode]?.[sectionName];
    return (
      <div className="space-y-10">
        {modulContent ? (
          modulContent
        ) : (
          <div className="bg-slate-50 border-2 border-dashed rounded-[3rem] p-16 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">
              library_books
            </span>
            <h3 className="text-xl font-black text-slate-400">
              Informasi Modul Segera Hadir
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Konten untuk mata kuliah {courseCode} sedang dalam proses
              transkripsi oleh tim Tutor.
            </p>
          </div>
        )}

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 bg-opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <h4 className="font-bold text-lg mb-4 text-yellow-400 uppercase tracking-tighter flex items-center gap-2">
            <span className="material-symbols-outlined">quiz</span> Pertanyaan
            Verifikasi
          </h4>
          <p className="text-sm mb-6 leading-relaxed font-medium">
            Sebutkan Judul 6 Modul yang ada di Mata Kuliah SPGK4307 {"/"}{" "}
            Bimbingan Konseling di SD
          </p>

          {status ? (
            <div className="space-y-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-xl border border-white border-opacity-20">
                <p className="text-[10px] text-white text-opacity-50 uppercase font-bold mb-2">
                  Jawaban Anda:
                </p>
                <p className="text-sm italic">"{status.content}"</p>
                <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">
                    verified
                  </span>{" "}
                  Terkirim ke Tutor
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ketik jawaban Anda di sini..."
                className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl p-4 text-sm focus:bg-white bg-opacity-10 focus:border-yellow-400 outline-none min-h-[120px]"
              ></textarea>
              <button
                onClick={() => handleAction(content)}
                disabled={loading || !content.trim()}
                className="w-full bg-yellow-400 text-slate-900 font-bold py-3 rounded-xl hover:bg-yellow-300 transition-all disabled:opacity-50"
              >
                {loading ? "Mengirim..." : "Kirim Jawaban"}
              </button>
            </div>
          )}
        </div>

        {status && tutorFeedback && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 shadow-sm mt-8">
            <span className="material-symbols-outlined text-yellow-500 text-4xl">
              stars
            </span>
            <div>
              <p className="font-bold text-yellow-700 mb-1 text-lg">
                Nilai dari Tutor
              </p>
              <p className="text-sm text-yellow-800 mb-3 italic">
                "
                {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                  "Tutor telah memberikan penilaian."}
                "
              </p>
              <div className="flex gap-1 text-yellow-500">
                {Array(parseInt(tutorFeedback.content))
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined fill-1 text-2xl"
                    >
                      star
                    </span>
                  ))}
                {Array(5 - parseInt(tutorFeedback.content))
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-slate-300 text-2xl"
                    >
                      star
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (sectionName === "Pertanyaan Pemantik" && id === "3") {
    const cases = [
      {
        id: 1,
        title: "Kasus 1",
        icon: "nightlight",
        color: "indigo",
        content: "Seorang ibu bercerita dalam sebuah arisan bahwa anaknya sekarang ini jika tidur tidak mau sendiri, padahal sebelumnya dia hanya ditemani sebentar sebelum tertidur. Tapi sekarang harus ditemani terus menerus, kalau ditinggal akan berteriak-teriak dan menangis seperti ketakutan. “Aku sampe susah nafas karena dipeluk kencang betul” kata sang ibu.",
        question: "Apa pertanyaan pertama yang akan anda ajukan?"
      },
      {
        id: 2,
        title: "Kasus 2",
        icon: "family_restroom",
        color: "rose",
        content: "“Wah kesel bener aku sama anakku” kata seorang bapak mengenai anak laki-lakinya. Masa tadi malam waktu kami makan bersama, tiba-tiba dia bilang mau jadi perempuan saja, karena jadi anak laki-laki itu “enggak” enak karena kalo main sering kasar. Memang selama ini saya tahu dia dekat sekali dengan ibunya, bahkan secara berkelakar saya selalu bilang dia sebagai “anak mama”. Tapi seumur hidup saya tidak pernah terpikirkan dan tidak akan pernah mengizinkan kalau anak laki-laki saya ingin jadi perempuan.",
        question: "Apa pertanyaan pertama yang akan anda ajukan?"
      }
    ];

    const allAnswered = pemantikAnswers[0]?.trim().length > 0 && pemantikAnswers[1]?.trim().length > 0;
    const combinedContent = cases
      .map((c, i) => `[${c.title}]\nKonteks: ${c.content}\nJawaban: ${pemantikAnswers[i]}`)
      .join("\n\n---\n\n");

    return (
      <div className="space-y-6 md:space-y-12 pb-10">
        <div className="bg-gradient-to-br from-[#1e1e2e] to-[#2d2d4a] p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden border border-white border-opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-indigo-500 bg-opacity-20 rounded-full -mr-32 -mt-32 md:-mr-40 md:-mt-40 blur-[80px] md:blur-[100px]"></div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest mb-4 md:mb-6">
              <span className="material-symbols-outlined text-xs md:text-base">clinical_notes</span> Studi Kasus Psikopatologi
            </span>
            <h1 className="text-2xl md:text-5xl font-headline font-black mb-3 md:mb-4 leading-tight uppercase tracking-tighter">
              Pertanyaan <br /> Pemantik
            </h1>
            <p className="text-slate-400 text-xs md:text-base font-medium max-w-xl leading-relaxed italic opacity-80 md:opacity-100">
              "Memahami dinamika emosi dan perilaku anak melalui sudut pandang profesional."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-10">
          {cases.map((item, i) => (
            <div key={i} className="bg-white rounded-[1.5rem] md:rounded-[3.5rem] shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all group border-l-[8px] md:border-l-[16px]" style={{ borderLeftColor: item.id === 1 ? '#6366f1' : '#f43f5e' }}>
              <div className="p-5 md:p-12">
                <div className="flex items-start justify-between mb-6 md:mb-10">
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg`} style={{ backgroundColor: item.id === 1 ? '#6366f1' : '#f43f5e' }}>
                       <span className="material-symbols-outlined text-2xl md:text-3xl font-black">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-black text-slate-800 uppercase tracking-tight">{item.title}</h3>
                      <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 md:mt-1">Skenario Analisis</p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end">
                     <span className="text-4xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">0{item.id}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 md:p-10 rounded-[1.2rem] md:rounded-[2.5rem] border border-slate-100 mb-6 md:mb-10 relative">
                  <span className="absolute -top-3 left-4 md:-top-4 md:left-6 text-3xl md:text-5xl text-slate-200 font-serif leading-none italic opacity-50">“</span>
                  <p className="text-xs md:text-lg text-slate-600 leading-relaxed md:leading-[1.8] font-medium text-justify">
                    {item.content}
                  </p>
                  <span className="absolute -bottom-6 right-4 md:-bottom-10 md:right-6 text-3xl md:text-5xl text-slate-200 font-serif leading-none italic opacity-50 transform rotate-180">“</span>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-6 md:w-2 md:h-8 rounded-full bg-primary bg-opacity-20"></div>
                     <h4 className="font-black text-slate-800 text-[11px] md:text-base uppercase tracking-widest">{item.question}</h4>
                  </div>

                  {status ? (
                    <div className="bg-white border-2 border-slate-50 p-5 md:p-8 rounded-[1.2rem] md:rounded-[2rem] shadow-inner relative">
                       <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-3">Analisis Anda:</p>
                       <p className="text-xs md:text-base text-slate-700 italic font-serif leading-relaxed">
                         "{status.content.split("\n\n---\n\n")[i]?.split("Jawaban: ")[1] || "Jawaban belum tersedia."}"
                       </p>
                       <div className="absolute top-4 right-4 md:top-6 md:right-6">
                          <span className="material-symbols-outlined text-green-500 text-lg md:text-2xl">verified</span>
                       </div>
                    </div>
                  ) : (
                    <textarea
                      value={pemantikAnswers[i] || ""}
                      onChange={(e) => {
                        const updated = [...pemantikAnswers];
                        updated[i] = e.target.value;
                        setPemantikAnswers(updated);
                      }}
                      placeholder="Ketik pertanyaan atau langkah pertama Anda di sini..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-3xl p-5 md:p-8 text-xs md:text-base focus:bg-white focus:border-indigo-400 focus:ring-1 outline-none transition-all min-h-[100px] md:min-h-[150px] resize-none shadow-sm"
                    ></textarea>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!status && (
          <div className="pt-6 md:pt-10 flex flex-col items-center">
             <button
                onClick={() => handleAction(combinedContent)}
                disabled={loading || !allAnswered}
                className="w-full max-w-xl bg-slate-900 text-white font-black py-4 md:py-7 rounded-[1.2rem] md:rounded-[2.5rem] hover:bg-black md:hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 shadow-2xl shadow-indigo-500 shadow-opacity-20 flex items-center justify-center gap-3 md:gap-4 text-xs md:text-xl tracking-widest uppercase group"
             >
                {loading ? "MENGIRIM ANALISIS..." : "KIRIM SEMUA ANALISIS"}
                {!loading && <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform text-sm md:text-base">send</span>}
             </button>
             {!allAnswered && (
               <p className="text-[10px] md:text-xs font-bold text-rose-500 mt-4 animate-pulse">Mohon analisis kedua kasus sebelum mengirim jawaban.</p>
             )}
          </div>
        )}

        {status && tutorFeedback && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 md:p-12 rounded-[1.5rem] md:rounded-[4rem] flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-[1.2rem] md:rounded-3xl flex items-center justify-center shadow-lg shadow-yellow-400 shadow-opacity-40">
              <span className="material-symbols-outlined text-white text-3xl md:text-5xl">stars</span>
            </div>
            <div className="text-center md:text-left">
              <p className="font-black text-yellow-700 mb-1 text-lg md:text-3xl uppercase tracking-tighter leading-tight">Feedback Analisis Kasus</p>
              <p className="text-xs md:text-lg text-yellow-800 mb-4 md:mb-6 italic font-medium">"{FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] || "Tutor telah memberikan penilaian."}"</p>
              <div className="flex justify-center md:justify-start gap-1 md:gap-2 text-yellow-500">
                {Array(parseInt(tutorFeedback.content)).fill(0).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-2xl md:text-4xl fill-1">star</span>
                ))}
                {Array(5 - parseInt(tutorFeedback.content)).fill(0).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-2xl md:text-4xl text-slate-200">star</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (
    sectionName === "Pertanyaan Pemantik" &&
    (cls?.classId === "1" || cls?.classId === "2" || ["1", "2"].includes(id))
  ) {
    const questions = getPemantikForStudent(user.nim || "0");
    const allAnswered = pemantikAnswers.every((a) => a.trim().length > 0);
    const combinedContent = questions
      .map(
        (q, i) => `Pertanyaan ${i + 1}: ${q}\nJawaban: ${pemantikAnswers[i]}`,
      )
      .join("\n\n");

    return (
      <div className="space-y-6">
        <div className="bg-primary bg-opacity-5 p-5 rounded-2xl border border-primary border-opacity-10">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              tips_and_updates
            </span>{" "}
            Pertanyaan Pemantik
          </p>
          <p className="text-sm text-slate-600 font-medium">
            Jawablah 3 pertanyaan di bawah ini sesuai dengan pemahaman Anda.
            Pertanyaan bersifat pribadi dan berbeda untuk setiap mahasiswa.
          </p>
        </div>

        {status ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-green-500 text-3xl">
                check_circle
              </span>
              <div>
                <p className="font-bold text-green-700">
                  Jawaban Sudah Terkirim ke Tutor
                </p>
                <p className="text-xs text-green-600">
                  Jawaban Anda telah disimpan dan tidak bisa diubah kecuali
                  tutor membuka kembali.
                </p>
              </div>
            </div>

            {questions.map((q, i) => (
              <div
                key={i}
                className="bg-white border rounded-2xl p-5 shadow-sm"
              >
                <p className="text-xs font-bold text-primary uppercase mb-2">
                  Pertanyaan {i + 1}
                </p>
                <p className="text-sm font-medium text-slate-700 mb-3">{q}</p>
                <div className="bg-slate-50 p-3 rounded-xl border-l-4 border-primary border-opacity-30">
                  <p className="text-sm text-slate-600 italic">
                    "
                    {pemantikAnswers[i] ||
                      status.content
                        .split("\n\n")
                        [i]?.split("Jawaban: ")[1] ||
                      "-"}
                    "
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {questions.map((q, i) => (
              <div
                key={i}
                className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                    {q}
                  </p>
                </div>
                <textarea
                  value={pemantikAnswers[i]}
                  onChange={(e) => {
                    const updated = [...pemantikAnswers];
                    updated[i] = e.target.value;
                    setPemantikAnswers(updated);
                  }}
                  placeholder="Tulis jawaban Anda di sini..."
                  className="w-full bg-slate-50 border rounded-xl p-4 text-sm focus:bg-white focus:border-primary outline-none transition-all min-h-[100px] resize-none"
                />
              </div>
            ))}
            <button
              onClick={() => handleAction(combinedContent)}
              disabled={loading || !allAnswered}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary shadow-opacity-20 hover:bg-[#1a2169] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading
                ? "Mengirim..."
                : !allAnswered
                  ? "Lengkapi Semua Jawaban Terlebih Dahulu"
                  : "Kirim Semua Jawaban"}
            </button>
          </div>
        )}

        {status && tutorFeedback && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl flex items-center gap-4 shadow-sm mt-8">
            <span className="material-symbols-outlined text-yellow-500 text-4xl">
              stars
            </span>
            <div>
              <p className="font-bold text-yellow-700 mb-1 text-lg">
                Nilai dari Tutor
              </p>
              <p className="text-sm text-yellow-800 mb-3 italic">
                "
                {FEEDBACK_MESSAGES[parseInt(tutorFeedback.content)] ||
                  "Tutor telah memberikan penilaian."}
                "
              </p>
              <div className="flex gap-1 text-yellow-500">
                {Array(parseInt(tutorFeedback.content))
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined fill-1 text-2xl"
                    >
                      star
                    </span>
                  ))}
                {Array(5 - parseInt(tutorFeedback.content))
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-slate-300 text-2xl"
                    >
                      star
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (sectionName === "Materi Pembelajaran" && (id === "1" || id === "2")) {
    return (
      <div className="space-y-12 pb-10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#0c3352] to-[#1a4a6e] rounded-[3rem] p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 bg-opacity-10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
          <div className="relative z-10 text-center">
            <span className="inline-block bg-yellow-400 text-primary text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest shadow-lg shadow-yellow-400 shadow-opacity-20">
              Modul Utama
            </span>
            <h1 className="text-3xl md:text-5xl font-headline font-black text-white mb-4 leading-tight">
              Konsep Dasar Bimbingan {"&"} Konseling (BK)
            </h1>
            <p className="text-blue-100 text-opacity-70 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Ringkasan materi pembelajaran yang disusun secara sistematis
              untuk pemahaman mendalam tentang layanan BK di sekolah dasar.
            </p>
          </div>
        </div>

        {/* Section 1: Pengertian, Fungsi, & Tujuan */}
        <section className="space-y-6">
          <h2 className="text-2xl font-headline font-black text-primary flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-primary bg-opacity-10 flex items-center justify-center text-primary">
              01
            </span>
            Pengertian, Fungsi, {"&"} Tujuan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all border-l-8 border-l-blue-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-3xl">
                    explore
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800">
                    Guidance
                  </h3>
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-tighter">
                    Bimbingan (To Guide)
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  "To Direct (Mengarahkan)",
                  "To Pilot (Memandu)",
                  "To Manage (Mengelola)",
                  "To Steer (Menyetir)",
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-blue-50 bg-opacity-50 p-2 rounded-xl border border-blue-100 border-opacity-50"
                  >
                    <span className="material-symbols-outlined text-blue-500 text-sm">
                      check_circle
                    </span>
                    <span className="text-sm font-semibold text-slate-600">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 leading-relaxed italic border-t pt-4">
                Terminologi: Proses bantuan berkelanjutan untuk mencapai
                pemahaman dan realisasi diri sesuai potensi.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all border-l-8 border-l-emerald-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-3xl">
                    psychology
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800">
                    Counseling
                  </h3>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-tighter">
                    Konseling (Face-to-Face)
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Hubungan profesional (
                <span className="font-bold text-emerald-600">
                  professional relationship
                </span>
                ) atau tatap muka yang bertujuan meningkatkan kemampuan{" "}
                <span className="italic font-bold">self-adjustment</span>{" "}
                (penyesuaian diri) secara efektif terhadap diri dan
                lingkungan.
              </p>
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-800 uppercase mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">
                    info
                  </span>{" "}
                  Fokus Utama
                </p>
                <p className="text-xs text-emerald-700 font-medium">
                  Pengembangan kemampuan adaptasi siswa dalam menghadapi
                  tantangan personal dan akademis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other sections removed for brevity, they follow a similar pattern */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center">
          {!status ? (
            <div className="w-full max-w-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full border border-yellow-200 text-[10px] font-black uppercase tracking-widest mb-4">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  Konfirmasi Pemahaman
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  Evaluasi Materi
                </h3>
              </div>

              <div className="bg-white border-2 border-primary border-opacity-10 rounded-[2.5rem] p-8 shadow-xl shadow-primary shadow-opacity-5">
                <label className="block text-sm font-black text-primary uppercase tracking-tight mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    question_answer
                  </span>
                  Pertanyaan Verifikasi:
                </label>
                <p className="text-lg font-bold text-slate-800 mb-6 leading-snug">
                  Apa Pengertian, Fungsi, dan Tujuan Bimbingan dan Konseling?
                </p>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ketik jawaban lengkap Anda di sini..."
                  className="w-full min-h-[150px] bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm focus:bg-white focus:border-primary focus:ring-1 outline-none transition-all resize-none mb-6"
                ></textarea>

                <button
                  onClick={() => handleAction(content)}
                  disabled={loading || !content.trim()}
                  className="w-full bg-[#1e293b] text-white font-black py-5 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  {loading ? "MENGIRIM JAWABAN..." : "KIRIM JAWABAN KE TUTOR"}
                  {!loading && (
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      send
                    </span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xl bg-green-500 text-white p-8 rounded-[2.5rem] shadow-xl shadow-green-500 shadow-opacity-20 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl">
                  done_all
                </span>
              </div>
              <h3 className="text-xl font-black mb-1">Jawaban Terkirim!</h3>
              <p className="text-white text-opacity-80 text-sm font-medium mb-6">
                Laporan belajar Anda telah masuk ke sistem. Silakan tunggu
                feedback/nilai dari tutor.
              </p>
              <div className="bg-white bg-opacity-10 px-6 py-4 rounded-2xl w-full border border-white border-opacity-10 text-left">
                <p className="text-[10px] font-black uppercase text-white text-opacity-40 mb-1">
                  Jawaban Anda:
                </p>
                <p className="text-xs italic font-serif opacity-90">
                  "{status.content}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (sectionName === "Materi Pembelajaran" && id === "3") {
    return (
      <div className="space-y-8 pb-10">
        <div className="bg-slate-900 rounded-2xl p-8 text-white">
          <h1 className="text-2xl font-black mb-2 uppercase tracking-tight">
            SPDA4401 - PENANGANAN ANAK BK
          </h1>
          <p className="text-slate-400 text-sm font-medium italic">
            Silabus Mata Kuliah Modul 1 sampai Modul 3
          </p>
        </div>

        <div className="space-y-8">
          {/* Modul 1 */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-10 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 bg-opacity-5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-opacity-10 transition-all"></div>
             
             <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-8 gap-4 relative z-10">
                <div>
                   <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                      <span className="material-symbols-outlined text-sm">menu_book</span> MODUL 1
                   </div>
                   <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">Hakikat Perkembangan Anak <br className="hidden md:block"/> yang Bersifat Nonnormatif</h2>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                   <span className="material-symbols-outlined text-3xl text-indigo-500">psychology_alt</span>
                </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10">
                {/* KB 1 */}
                <div className="space-y-5">
                   <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500 shadow-opacity-30">1</span>
                      <h4 className="font-black text-slate-800 text-sm md:text-base uppercase tracking-tight">Kegiatan Belajar 1</h4>
                   </div>
                   <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                     <p className="font-bold text-indigo-900 text-sm mb-4">A. Hakikat Perkembangan Anak yang Bersifat Nonnormatif</p>
                     <ul className="space-y-3 text-sm text-slate-600 font-medium list-none">
                        <li className="flex gap-3 items-start">
                           <span className="text-indigo-400 font-black">1.</span> 
                           <span>Pengertian Dasar</span>
                        </li>
                        <li className="flex gap-3 items-start">
                           <span className="text-indigo-400 font-black">2.</span> 
                           <div>
                              <span>Apakah yang Disebut Kelainan atau Abnormal?</span>
                              <div className="grid gap-2 mt-3 pl-2 border-l-2 border-indigo-100 pb-1">
                                 <div className="flex items-center gap-2 text-xs bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Model Medis</div>
                                 <div className="flex items-center gap-2 text-xs bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Penyimpangan dari Rata-rata</div>
                                 <div className="flex items-center gap-2 text-xs bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Penyimpangan dari Ideal</div>
                              </div>
                           </div>
                        </li>
                        <li className="flex gap-3 items-start">
                           <span className="text-indigo-400 font-black">3.</span> 
                           <span className="leading-relaxed">Ciri-ciri Anak dengan Perkembangan Nonnormatif</span>
                        </li>
                     </ul>
                   </div>
                </div>

                {/* KB 2 */}
                <div className="space-y-5">
                   <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500 shadow-opacity-30">2</span>
                      <h4 className="font-black text-slate-800 text-sm md:text-base uppercase tracking-tight">Kegiatan Belajar 2</h4>
                   </div>
                   
                   <div className="space-y-4">
                     <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center md:text-left">
                       <p className="font-bold text-indigo-900 text-sm mb-4 leading-relaxed">A. Faktor yang Memengaruhi Perkembangan Nonnormatif & Identifikasi Penanganan</p>
                       <div className="flex flex-wrap md:flex-nowrap gap-2 justify-center md:justify-start">
                          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 border border-slate-200 rounded-lg whitespace-nowrap">1. Cetak Biru Biologis</span>
                          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 border border-slate-200 rounded-lg whitespace-nowrap">2. Genetik & Lingkungan</span>
                          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 border border-slate-200 rounded-lg whitespace-nowrap">3. Konteks Sosial</span>
                       </div>
                     </div>
                     <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
                       <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-500 shrink-0"><span className="material-symbols-outlined text-2xl">manage_search</span></div>
                       <div>
                         <p className="font-bold text-indigo-900 text-sm uppercase mb-2">B. Cara Identifikasi</p>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed">Penanganan dapat dilakukan melalui Wawancara mendalam, Kuesioner berstandar, serta Observasi rutin.</p>
                       </div>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Modul 2 */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-10 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative border-l-8 border-l-emerald-500">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 bg-opacity-5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-opacity-10 transition-all"></div>
             
             <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-8 gap-4 relative z-10">
                <div>
                   <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                      <span className="material-symbols-outlined text-sm">accessible_forward</span> MODUL 2
                   </div>
                   <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">Anak dengan <br className="hidden md:block"/> Gangguan Fisik</h2>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                   <span className="material-symbols-outlined text-3xl text-emerald-500">healing</span>
                </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 relative z-10">
                <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">K. Belajar 01</span>
                      <div className="h-px flex-1 bg-emerald-100"></div>
                   </div>
                   <div className="bg-emerald-50 bg-opacity-40 p-6 md:p-8 rounded-3xl border border-emerald-50 h-[85%] hover:bg-opacity-100 transition-colors">
                     <p className="font-bold text-slate-800 text-sm md:text-base mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500">personal_injury</span> Anak dengan Cerebral Palsy</p>
                     <ul className="space-y-3 text-xs md:text-sm text-slate-600 font-medium list-none">
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-lg">radio_button_unchecked</span> Batasan Cerebral Palsy</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-lg">radio_button_unchecked</span> Tipe-tipe Cerebral Palsy</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-lg">radio_button_unchecked</span> Karakteristik Anak Spesifik</li>
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-lg">radio_button_unchecked</span> Strategi Penanganan Inklusif</li>
                     </ul>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">K. Belajar 02</span>
                      <div className="h-px flex-1 bg-emerald-100"></div>
                   </div>
                   <div className="bg-emerald-50 bg-opacity-40 p-6 md:p-8 rounded-3xl border border-emerald-50 h-[85%] hover:bg-opacity-100 transition-colors">
                     <p className="font-bold text-slate-800 text-sm md:text-base mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500">local_hospital</span> Anak yang Rentan Sakit</p>
                     <ul className="space-y-3 text-xs md:text-sm text-slate-600 font-medium list-none">
                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-lg">radio_button_unchecked</span> Pengertian Dasar Penyakit</li>
                        <li className="flex items-start gap-2"><span className="material-symbols-outlined text-emerald-500 text-lg shrink-0">radio_button_unchecked</span> <span className="leading-relaxed">Penyakit yang Umum Diderita Anak: Karakteristik & Penanganannya.</span></li>
                     </ul>
                   </div>
                </div>
             </div>
          </div>

          {/* Modul 3 */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-10 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative border-l-8 border-l-rose-500">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500 bg-opacity-5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-opacity-10 transition-all"></div>
             
             <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-8 gap-4 relative z-10">
                <div>
                   <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                      <span className="material-symbols-outlined text-sm">visibility</span> MODUL 3
                   </div>
                   <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">Anak dengan <br className="hidden md:block"/> Gangguan Panca Indra</h2>
                </div>
                <div className="flex gap-2">
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-2xl text-rose-500">hearing</span>
                   </div>
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-2xl text-rose-500">visibility</span>
                   </div>
                </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 relative z-10">
                {/* Gangguan Pendengaran */}
                <div className="group/item h-full">
                   <div className="bg-gradient-to-br from-white to-rose-50 p-6 md:p-8 rounded-3xl border border-rose-100 shadow-sm h-full hover:shadow-md transition-all">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-rose-500 border border-slate-50">
                        <span className="material-symbols-outlined text-2xl">hearing_disabled</span>
                     </div>
                     <p className="font-black text-rose-900 text-sm md:text-base mb-5 uppercase tracking-tight flex items-center justify-between">
                        Gangguan Pendengaran
                        <span className="text-[10px] bg-rose-200 text-rose-800 px-2 py-1 rounded-md">KB 1</span>
                     </p>
                     <ul className="space-y-4 text-xs md:text-sm text-slate-600 font-medium">
                        <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0 shadow-sm"></div> <p className="leading-snug">Batasan dan Penggolongan Gangguan Pendengaran</p></li>
                        <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0 shadow-sm"></div> <p className="leading-snug">Identifikasi Anak dengan Gangguan Pendengaran</p></li>
                        <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0 shadow-sm"></div> <p className="leading-snug">Karakteristik Anak dengan Gangguan Pendengaran</p></li>
                        <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0 shadow-sm"></div> <p className="leading-snug">Strategi Penanganan Anak secara Interaktif</p></li>
                     </ul>
                   </div>
                </div>

                {/* Gangguan Penglihatan */}
                <div className="group/item h-full">
                   <div className="bg-gradient-to-br from-white to-orange-50 p-6 md:p-8 rounded-3xl border border-orange-100 shadow-sm h-full hover:shadow-md transition-all">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-orange-500 border border-slate-50">
                        <span className="material-symbols-outlined text-2xl">blind</span>
                     </div>
                     <p className="font-black text-orange-900 text-sm md:text-base mb-5 uppercase tracking-tight flex items-center justify-between">
                        Gangguan Penglihatan
                        <span className="text-[10px] bg-orange-200 text-orange-800 px-2 py-1 rounded-md">KB 2</span>
                     </p>
                     <ul className="space-y-4 text-xs md:text-sm text-slate-600 font-medium">
                        <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-orange-400 mt-1 shrink-0 shadow-sm"></div> <p className="leading-snug">Batasan Gangguan Penglihatan secara Medis</p></li>
                        <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-orange-400 mt-1 shrink-0 shadow-sm"></div> <p className="leading-snug">Pedoman Identifikasi Anak dengan Gangguan</p></li>
                        <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-orange-400 mt-1 shrink-0 shadow-sm"></div> <p className="leading-snug">Karakteristik Perkembangan Anak dengan Gangguan</p></li>
                        <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-orange-400 mt-1 shrink-0 shadow-sm"></div> <p className="leading-snug">Strategi Penanganan di Lingkungan Belajar (PAUD)</p></li>
                     </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center">
          {!status ? (
            <div className="w-full max-w-xl">
              <div className="text-center mb-8">
                <h3 className="text-xl font-black text-slate-800 mb-2">Evaluasi Materi</h3>
                <p className="text-sm text-slate-500 font-medium italic">Kira - kira kamu tertarik degan modul berapa?</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan modul yang paling menarik bagi Anda..."
                  className="w-full min-h-[150px] bg-white border border-slate-200 rounded-xl p-4 text-sm focus:border-indigo-500 outline-none transition-all resize-none mb-6 font-medium"
                ></textarea>

                <button
                  onClick={() => handleAction(content)}
                  disabled={loading || !content.trim()}
                  className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  KIRIM JAWABAN
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xl bg-emerald-600 text-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
              <h3 className="text-xl font-black mb-1">Jawaban Terkirim!</h3>
              <p className="text-white text-opacity-80 text-sm font-medium mb-6">
                Laporan belajar Anda telah masuk ke sistem.
              </p>
              <div className="bg-white bg-opacity-10 px-6 py-4 rounded-xl w-full border border-white border-opacity-10 text-left">
                <p className="text-[10px] font-black uppercase text-white text-opacity-40 mb-1">Jawaban Anda:</p>
                <p className="text-xs italic opacity-90">"{status.content}"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback if no specific renderer matches
  return (
    <div className="p-8 text-center text-slate-400">
      Konten tidak ditemukan untuk seksion ini.
    </div>
  );
};
