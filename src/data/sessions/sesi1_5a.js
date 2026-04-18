export const sesi1_5a = {
  id: "sesi1_5a",
  meetingId: "1",
  classIds: ["4"],
  sections: [
    {
      name: "Informasi Modul",
      tutorLabel: "Orientasi",
      required: false,
      type: "RATSATV2",
      content: {
        title: "Orientasi Sesi 1",
        description: "Selamat datang di Sesi 1. Mohon perhatikan materi yang akan dipelajari.",
        documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      }
    },
    {
      name: "Pertanyaan Pemantik",
      tutorLabel: "Pemantik",
      required: true,
      type: "PemantikV2",
      content: {
        title: "Pertanyaan Pemantik",
        questions: ["Apa yang Anda ketahui tentang topik sesi ini?"]
      }
    },
    {
      name: "Materi Pembelajaran",
      tutorLabel: "Materi",
      required: false,
      type: "MateriV2",
      content: {
        title: "Materi Sesi 1",
        htmlContent: "<div>Materi pembelajaran sesi ini.</div>"
      }
    },
    {
      name: "Video Pembelajaran",
      tutorLabel: "Video",
      required: false,
      type: "VideoEvalV2",
      content: {
        title: "Video Pembelajaran",
        description: "Simak video ini.",
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
