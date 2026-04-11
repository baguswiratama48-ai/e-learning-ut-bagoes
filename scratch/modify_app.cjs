const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');
const lines = content.split(/\r?\n/);

const replacement = `function InteractiveMindMap({ user, classId, meetingId, onComplete, submissions }) {
  const [placedItems, setPlacedItems] = React.useState({});
  const [gameState, setGameState] = React.useState('INTRO'); // INTRO, PLAYING, CHALLENGE, FINISHED
  const [score, setScore] = React.useState(0);
  const [feedback, setFeedback] = React.useState(null);
  const [feedbackType, setFeedbackType] = React.useState('correct'); // 'correct' | 'wrong'
  const [isLandscape, setIsLandscape] = React.useState(window.innerWidth > window.innerHeight);
  const [dragging, setDragging] = React.useState(null);
  const [wrongItem, setWrongItem] = React.useState(null);
  const [allDone, setAllDone] = React.useState(false);
  const [challengeAnswer, setChallengeAnswer] = React.useState(null);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  React.useEffect(() => {
    const check = () => setIsLandscape(window.innerWidth > window.innerHeight);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const groupRow = submissions.find(s => s.student_email === 'SYSTEM_GROUP' && s.section_name === 'GENERATED_GROUPS');
  const groups = groupRow ? JSON.parse(groupRow.content) : null;
  const myGroup = groups?.find(g => g.members.some(m => m.email === user.email));

  const totalItems = MIND_MAP_DATA.items.length;
  const placedCount = Object.keys(placedItems).length;
  const progressPct = Math.round((placedCount / totalItems) * 100);

  const handleDrop = (itemId, zoneId) => {
    const item = MIND_MAP_DATA.items.find(i => i.id === itemId);
    if (!item || placedItems[itemId]) return;
    if (item.category === zoneId) {
      const newPlaced = { ...placedItems, [itemId]: zoneId };
      setPlacedItems(newPlaced);
      setScore(prev => prev + 10);
      setFeedbackType('correct');
      setFeedback(item.info);
      setTimeout(() => setFeedback(null), 3000);
      if (Object.keys(newPlaced).length === totalItems) {
        setAllDone(true);
      }
    } else {
      setFeedbackType('wrong');
      setFeedback('Salah kategori! Diskusikan kembali dengan teman kelompokmu.');
      setWrongItem(itemId);
      setTimeout(() => { setFeedback(null); setWrongItem(null); }, 1500);
    }
  };

  const handleTouchDrop = (itemId, e) => {
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const zoneId = el?.closest('[data-zone]')?.getAttribute('data-zone');
    if (zoneId) handleDrop(itemId, zoneId);
  };

  // === SCREEN: Rotate prompt ===
  if (!isLandscape) {
    return (
      <div className="fixed inset-0 z-[100] bg-primary text-white flex flex-col items-center justify-center p-10 text-center">
        <span className="material-symbols-outlined text-8xl animate-bounce mb-6">screen_rotation</span>
        <h2 className="text-2xl font-black mb-3">Putar Layar Anda!</h2>
        <p className="opacity-70 font-medium max-w-xs">Gunakan mode <strong>Lanskap (Miring)</strong> agar Mind Map terlihat jelas dan mudah dimainkan.</p>
      </div>
    );
  }

  // === SCREEN: Intro ===
  if (gameState === 'INTRO') {
    return (
      <div className="fixed inset-0 z-[70] bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary bg-opacity-5 rounded-full -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400 bg-opacity-10 rounded-full -ml-16 -mb-16"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-3xl flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-4xl">auto_stories</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">LKPD Interaktif</p>
                <h2 className="text-2xl font-black text-slate-800 leading-tight">MISI ARSITEK EKOSISTEM BK</h2>
              </div>
            </div>
            <p className="text-slate-500 font-medium mb-8 text-sm leading-relaxed">
              Halo, Calon Guru Profesional! Tugasmu adalah menyusun Mind Map BK yang berantakan menjadi utuh kembali bersama tim.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { n: '1', icon: 'drag_pan', text: 'Perhatikan 3 cabang: Etimologi, Asas, dan Jenis Layanan.' },
                { n: '2', icon: 'touch_app', text: 'Tekan & geser bubble kata ke lingkaran cabang yang tepat (Drag & Drop). Bubble salah akan kembali otomatis.' },
                { n: '3', icon: 'info', text: 'Setiap jawaban benar memunculkan info singkat. Baca untuk memperdalam pemahaman!' },
                { n: '4', icon: 'send', text: 'Jika semua bubble terpasang, tekan KIRIM dan screenshot hasilnya sebagai bukti.' },
              ].map(s => (
                <div key={s.n} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex-shrink-0 flex items-center justify-center font-black text-xs">{s.n}</span>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5">{s.icon}</span>
                    <p className="text-sm font-semibold text-slate-600">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {myGroup && (
              <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 p-4 rounded-2xl flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary">group</span>
                <p className="text-sm font-bold text-primary">Kelompok {myGroup.group_num} — {myGroup.members.length} anggota</p>
              </div>
            )}
            <button onClick={() => setGameState('PLAYING')} className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-20 flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">rocket_launch</span> MULAI MISI!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === SCREEN: Final Challenge ===
  if (gameState === 'CHALLENGE') {
    return (
      <div className="fixed inset-0 z-[60] bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] p-8 md:p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-red-100 rounded-3xl flex items-center justify-center"><span className="material-symbols-outlined text-3xl text-red-500">crisis_alert</span></div>
            <div>
              <p className="text-[10px] font-black uppercase text-red-500 tracking-widest">TANTANGAN AKHIR</p>
              <h2 className="text-2xl font-black text-slate-800">Studi Kasus</h2>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-6">
            <p className="text-xs font-black text-amber-600 uppercase tracking-widest mb-2">Skenario:</p>
            <p className="text-base font-semibold text-slate-700 leading-relaxed italic">
              "Seorang siswa ketakutan menceritakan bahwa ia menjadi korban bullying karena tidak ingin teman-temannya tahu. Namun, ia butuh bantuan segera."
            </p>
          </div>
          <p className="text-sm font-bold text-slate-500 mb-5 uppercase tracking-tight">Pilih kombinasi elemen yang PALING TEPAT:</p>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {[
              { id: 'A', label: 'Layanan Mediasi & Asas Keterbukaan', correct: false, desc: 'Mediasi untuk konflik antar pihak, bukan untuk korban yang butuh privasi.' },
              { id: 'B', label: 'Konseling Individual & Asas Kerahasiaan', correct: true, desc: 'Tepat! Konseling Individual menjaga privasi, Asas Kerahasiaan menjamin keamanan siswa.' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setChallengeAnswer(opt)}
                disabled={challengeAnswer !== null}
                className={\`p-5 rounded-2xl border-2 text-left transition-all font-semibold text-sm \${challengeAnswer === null ? 'border-slate-200 hover:border-primary hover:bg-primary hover:bg-opacity-5' : opt.correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : challengeAnswer?.id === opt.id ? 'border-red-400 bg-red-50 text-red-700' : 'border-slate-200 opacity-50'}\`}
              >
                <div className="flex items-center gap-3">
                  <span className={\`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-black text-xs \${challengeAnswer === null ? 'bg-slate-100 text-slate-600' : opt.correct ? 'bg-emerald-500 text-white' : challengeAnswer?.id === opt.id ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-400'}\`}>{opt.id}</span>
                  {opt.label}
                </div>
                {challengeAnswer !== null && (
                  <p className={\`mt-2 text-xs pl-11 \${opt.correct ? 'text-emerald-700' : 'text-slate-500'}\`}>{opt.desc}</p>
                )}
              </button>
            ))}
          </div>
          {challengeAnswer !== null && (
            <button
              onClick={() => onComplete(score + (challengeAnswer.correct ? 40 : 10), challengeAnswer.label)}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-20 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">send</span> KIRIM HASIL LKPD
            </button>
          )}
        </div>
      </div>
    );
  }

  // === SCREEN: Main Game ===
  return (
    <div className="relative w-full bg-white rounded-[3rem] overflow-hidden border-4 border-slate-100 shadow-2xl flex flex-col" style={{ minHeight: '580px' }}>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-100 w-full">
        <div className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500 rounded-full" style={{ width: \`\${progressPct}%\` }}></div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className={\`absolute top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300 px-8 py-3 rounded-full font-black text-sm shadow-2xl flex items-center gap-3 \${feedbackType === 'correct' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}\`}>
          <span className="material-symbols-outlined">{feedbackType === 'correct' ? 'verified' : 'cancel'}</span>
          {feedback}
        </div>
      )}

      {/* Header */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => setGameState('INTRO')} className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">info</span>
          </button>
          <div>
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">LKPD Mind Map BK</p>
            <p className="text-sm font-black text-slate-700">{myGroup ? \`Kelompok \${myGroup.group_num}\` : 'Individu'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Progress</p>
            <p className="text-sm font-black text-primary">{placedCount} / {totalItems} bubble</p>
          </div>
          <div className="bg-white shadow-sm border border-slate-100 px-4 py-2 rounded-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-500 text-lg fill-1">stars</span>
            <span className="font-black text-slate-800 text-lg">{score}</span>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden" style={{ minHeight: '380px' }}>
        {/* SVG lines from center to zones */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {[[-150, 20], [150, 20], [0, -160]].map(([x, y], i) => (
            <line key={i} x1="50%" y1="50%" x2={\`calc(50% + \${x}px)\`} y2={\`calc(50% + \${y}px)\`}
              stroke="#e2e8f0" strokeWidth="3" strokeDasharray="8,6" />
          ))}
        </svg>

        {/* Center Node */}
        <div className="absolute w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white font-black text-center text-xs p-3 shadow-2xl z-10 ring-8 ring-blue-50 bg-opacity-100">
          MIND MAP<br />BK
        </div>

        {/* Drop Zones */}
        {MIND_MAP_DATA.zones.map((zone, idx) => {
          const positions = [
            { left: 'calc(50% - 230px)', top: 'calc(50% - 80px)' },
            { left: 'calc(50% + 90px)', top: 'calc(50% - 80px)' },
            { left: 'calc(50% - 80px)', top: 'calc(50% - 230px)' },
          ];
          const pos = positions[idx];
          const placedInZone = Object.entries(placedItems).filter(([_, zid]) => zid === zone.id);
          return (
            <div
              key={zone.id}
              data-zone={zone.id}
              onDragOver={e => e.preventDefault()}
              onDrop={() => dragging && handleDrop(dragging, zone.id)}
              className={\`absolute w-40 h-40 rounded-full border-[3px] border-dashed flex flex-col items-center justify-center transition-all duration-300 \${zone.bgColor} \${zone.color.replace('bg-', 'border-')} bg-opacity-40\`}
              style={{ ...pos, zIndex: 5 }}
            >
              <div className={\`px-3 py-1 rounded-xl \${zone.color} text-white text-[8px] font-black uppercase tracking-wider shadow-md mb-2\`}>
                {zone.label}
              </div>
              <div className="flex flex-wrap justify-center gap-1 px-2 max-w-full">
                {placedInZone.map(([iid]) => {
                  const item = MIND_MAP_DATA.items.find(i => i.id === iid);
                  return (
                    <span key={iid} className={\`px-2 py-0.5 rounded-lg \${zone.color} text-white text-[8px] font-black shadow animate-in zoom-in duration-300\`}>
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dock Tray */}
      <div className="bg-slate-900 px-6 py-5 flex flex-col items-center gap-3">
        <p className="text-white text-opacity-40 text-[9px] font-black uppercase tracking-[0.2em]">
          {allDone ? '✅ SEMUA TERPASANG — TEKAN KIRIM!' : \`Sisa \${totalItems - placedCount} bubble — Geser ke cabang yang tepat\`}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {MIND_MAP_DATA.items.filter(i => !placedItems[i.id]).map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={() => setDragging(item.id)}
              onDragEnd={() => setDragging(null)}
              onTouchEnd={(e) => handleTouchDrop(item.id, e)}
              className={\`px-5 py-2.5 rounded-full bg-white text-primary font-black text-xs cursor-grab active:cursor-grabbing hover:bg-yellow-400 transition-all shadow-lg flex items-center gap-2 select-none \${wrongItem === item.id ? 'animate-[shake_0.4s_ease-in-out] bg-red-100' : ''}\`}
              style={{ touchAction: 'none' }}
            >
              <span className="material-symbols-outlined text-sm">drag_indicator</span>
              {item.label}
            </div>
          ))}
        </div>
        {allDone && (
          <button
            onClick={() => setGameState('CHALLENGE')}
            className="mt-1 px-10 py-3 bg-yellow-400 text-slate-900 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2">
            <span className="material-symbols-outlined">emoji_events</span> LANJUT KE TANTANGAN AKHIR
          </button>
        )}
      </div>

      <style>{\`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          60% { transform: translateX(8px); }
        }
      \`}</style>
    </div>
  );
}`;

const newLines = [
  ...lines.slice(0, 132), 
  replacement, 
  ...lines.slice(586)
];

fs.writeFileSync('src/App.jsx', newLines.join('\\n'));
console.log('File updated successfully.');
