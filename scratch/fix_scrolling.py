import sys

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

target1 = """      <div className="fixed inset-0 z-[70] bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="relative z-10">"""

replacement1 = """      <div className="fixed inset-0 z-[70] bg-slate-900 overflow-y-auto w-full h-full">
        <div className="min-h-full flex items-center justify-center w-full p-4 md:p-6">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300 my-auto">
            <div className="relative z-10">"""

target2 = """            <button
              onClick={() => setGameState("PLAYING")}
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-20 flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">rocket_launch</span>{" "}
              MULAI MISI!
            </button>
          </div>
        </div>
      </div>"""

replacement2 = """            <div className="flex flex-col-reverse md:flex-row gap-3 mt-4">
              <button
                onClick={() => window.history.back()}
                className="w-full md:w-1/3 bg-slate-100 text-slate-500 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                KEMBALI
              </button>
              <button
                onClick={() => setGameState("PLAYING")}
                className="w-full md:w-2/3 bg-primary text-white py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary shadow-opacity-20 flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">rocket_launch</span>{" "}
                MULAI MISI!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>"""

text = text.replace(target1, replacement1)
text = text.replace(target2, replacement2)

# Also check for !isLandscape screen, maybe add "Kembali" there too
target3 = """  if (!isLandscape) {
    return (
      <div className="fixed inset-0 z-[100] bg-primary text-white flex flex-col items-center justify-center p-10 text-center">
        <span className="material-symbols-outlined text-8xl animate-bounce mb-6">
          screen_rotation
        </span>
        <h2 className="text-2xl font-black mb-3">Putar Layar Anda!</h2>
        <p className="opacity-70 font-medium max-w-xs">
          Gunakan mode <strong>Lanskap (Miring)</strong> agar Mind Map terlihat
          jelas.
        </p>
      </div>
    );
  }"""

replacement3 = """  if (!isLandscape) {
    return (
      <div className="fixed inset-0 z-[100] bg-primary text-white flex flex-col items-center justify-center p-10 text-center overflow-y-auto h-full w-full">
        <div className="min-h-full flex flex-col items-center justify-center w-full my-auto py-10">
          <span className="material-symbols-outlined text-[6rem] md:text-8xl animate-bounce mb-6">
            screen_rotation
          </span>
          <h2 className="text-2xl font-black mb-3">Putar Layar Anda!</h2>
          <p className="opacity-70 font-medium max-w-xs mb-8">
            Gunakan mode <strong>Lanskap (Miring)</strong> penuh agar area kerja Mind Map terlihat dengan sempurna.
          </p>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Kembali Saja
          </button>
        </div>
      </div>
    );
  }"""

text = text.replace(target3, replacement3)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replacement Complete")
