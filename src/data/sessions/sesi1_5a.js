export const Sesi1_5A = {
  id: "5A_S1",
  meetingId: "1",
  classIds: ["4"],
  sections: [
    {
      name: "Informasi Modul",
      tutorLabel: "RAT/SAT",
      required: false,
      type: "RATSATV2",
      content: {
        title: "Strategi Pembelajaran Kontemporer di SD",
        description: "Selamat datang di Sesi 1! Mari kita pelajari Strategi Pembelajaran di Sekolah Dasar.",
        documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      }
    },
    {
      name: "Pertanyaan Pemantik",
      tutorLabel: "Pemantik",
      required: true,
      type: "PemantikV2",
      content: {
        title: "Diskusi Pemantik Strategi Pembelajaran",
        questions: [
          "Menurut Anda, apa tantangan terbesar guru dalam menerapkan strategi pembelajaran kontemporer?",
          "Bagaimana membedakan antara strategi, metode, dan teknik pembelajaran?",
          "Strategi apa yang paling sering Anda gunakan saat mengajar di kelas?"
        ]
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
          <p>Dalam sesi ini, kita membahas mengenai konsep dasar strategi pembelajaran, klasifikasi strategi pembelajaran, serta kriteria pemilihan strategi yang tepat untuk siswa SD.</p>
        </div>`
      }
    },
    {
      name: "Video Pembelajaran",
      tutorLabel: "Video",
      required: false,
      type: "VideoEvalV2",
      content: {
        title: "Inovasi Strategi Pembelajaran",
        description: "Simak video ini untuk mendapatkan inspirasi strategi mengajar yang menyenangkan.",
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
      tutorLabel: "Quiz",
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
