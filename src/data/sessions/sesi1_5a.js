export const Sesi1_5A = {
  id: "5A_S1",
  meetingId: "1",
  classIds: ["4"],
  sections: [
    {
      name: "Informasi Modul",
      tutorLabel: "Informasi",
      required: false,
      type: "RATSATV2",
      content: {
        title: "Informasi Modul 1: Strategi Pembelajaran Kontemporer",
        description: "Selamat datang di Sesi 1! Mari kita pelajari Strategi Pembelajaran di Sekolah Dasar.",
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
        title: "Modul 1: Hakikat Strategi Pembelajaran",
        htmlContent: `<div class="space-y-4 text-slate-700 leading-relaxed text-justify">
          <p>Dalam sesi ini, kita akan membahas mengenai konsep dasar strategi pembelajaran, klasifikasi strategi pembelajaran, serta kriteria pemilihan strategi.</p>
        </div>`
      }
    },
    {
      name: "Pertanyaan Pemantik",
      tutorLabel: "Pemantik",
      required: true,
      type: "PemantikV2",
      content: {
        title: "Diskusi Pemantik Sesi 1",
        questions: [
          "Menurut Anda, apa perbedaan mendasar antara strategi, metode, dan teknik pembelajaran?",
          "Mengapa seorang guru perlu merencanakan strategi pembelajaran sebelum masuk kelas?",
          "Ceritakan pengalaman Anda saat menemui strategi pembelajaran yang sangat berkesan."
        ]
      }
    },
    {
      name: "Video Pembelajaran",
      tutorLabel: "Video",
      required: false,
      type: "VideoEvalV2",
      content: {
        title: "Video Inovasi Pembelajaran",
        description: "Simak video ini untuk melihat contoh penerapan strategi pembelajaran yang kreatif.",
        youtubeId: "J8_T6lH2n7U" 
      }
    },
    {
      name: "Ayo Diskusi (LKPD)",
      tutorLabel: "Diskusi",
      required: true,
      type: "Interactive",
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
