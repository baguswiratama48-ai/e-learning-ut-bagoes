export const Sesi1_6A = {
  id: "6A_S1",
  meetingId: "1",
  classIds: ["3"],
  sections: [
    {
      name: "Informasi Modul",
      tutorLabel: "Informasi", // Not RAT/SAT for Sesi 1
      required: false,
      type: "RATSATV2",
      content: {
        title: "Informasi Modul 1: Penanganan Anak Berkebutuhan Khusus",
        description: "Selamat datang di Sesi 1! Mari kita pelajari Hakikat Perkembangan Anak yang Bersifat Nonnormatif.",
        documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      }
    },
    {
      name: "Peta Konsep",
      tutorLabel: "Peta",
      required: false,
      type: "MateriV2",
      content: {
        title: "Peta Konsep Modul 1",
        htmlContent: `<div class="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
          <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">Peta Konsep Modul 1 Sedang Diproses</p>
        </div>`
      }
    },
    {
      name: "Materi Pembelajaran",
      tutorLabel: "Materi",
      required: false,
      type: "MateriV2",
      content: {
        title: "Materi Sesi 1: Hakikat Perkembangan Anak yang Bersifat Nonnormatif",
        htmlContent: `<div class="space-y-4 text-slate-700 leading-relaxed text-justify">
          <p>Dalam sesi ini, kita akan membahas mengenai hakikat perkembangan anak yang bersifat nonnormatif, mencakup model medis, penyimpangan dari rata-rata, hingga penyimpangan dari ideal.</p>
          <p>Serta faktor-fakor yang memengaruhinya seperti cetak biru biologis (genetik) dan konteks sosial (lingkungan).</p>
        </div>`
      }
    },
    {
      name: "Pertanyaan Pemantik",
      tutorLabel: "Pemantik",
      required: true,
      type: "PemantikV2",
      content: {
        title: "Pertanyaan Pemantik Sesi 1",
        questions: [
          "Menurut Anda, apa yang membedakan perkembangan nonnormatif dengan kelainan/abnormal secara medis?",
          "Bagaimana cetak biru biologis atau genetik memengaruhi perkembangan anak?",
          "Ceritakan pengalaman Anda ketika mengobservasi anak dengan perkembangan nonnormatif."
        ]
      }
    },
    {
      name: "Video Pembelajaran",
      tutorLabel: "Video",
      required: false,
      type: "VideoEvalV2",
      content: {
        title: "Video Identifikasi ABK",
        description: "Simak video ini untuk memahami cara identifikasi awal anak dengan kebutuhan khusus.",
        youtubeId: "J8_T6lH2n7U" 
      }
    },
    {
      name: "Ayo Diskusi (LKPD)",
      tutorLabel: "Diskusi",
      required: true,
      type: "Interactive", // This will trigger LkpdClass6A in App.jsx
      content: null
    },
    {
      name: "Kuis dan Latihan",
      tutorLabel: "Latihan",
      required: true,
      type: "Interactive",
      content: null
    },
    {
      name: "Refleksi",
      tutorLabel: "Refleksi",
      required: true,
      type: "Interactive",
      content: null
    }
  ]
};
