export const sesi1_bk = {
  id: "sesi1_bk",
  meetingId: "1",
  classId: ["1", "2"], // 8B and 8C
  sections: [
    {
      name: "Informasi Modul",
      tutorLabel: "RAT/SAT",
      required: false,
      type: "RATSATV2",
      content: {
        title: "Orientasi Bimbingan Konseling di SD",
        description: "Selamat datang di Sesi 1! Mari kita pelajari Modul 1.",
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
        htmlContent: "<div>Peta Konsep Modul 1. Tinjau struktur materi yang akan dipelajari.</div>"
      }
    },
    {
      name: "Pertanyaan Pemantik",
      tutorLabel: "Pemantik",
      required: true,
      type: "PemantikV2",
      content: {
        title: "Pertanyaan Pemantik Modul 1",
        questions: ["Apa pemahaman Anda tentang Bimbingan Konseling di SD?"]
      }
    },
    {
      name: "Materi Pembelajaran",
      tutorLabel: "Materi",
      required: false,
      type: "MateriV2",
      content: {
        title: "Materi Pembelajaran Modul 1",
        htmlContent: "<div>Modul 1: Hakikat, Fungsi, dan Prinsip Bimbingan Konseling.</div>"
      }
    },
    {
      name: "Video Pembelajaran",
      tutorLabel: "Video",
      required: false,
      type: "VideoEvalV2",
      content: {
        title: "Video Penjelasan Modul 1",
        description: "Silakan simak dan pahami video berikut.",
        youtubeId: "J8_T6lH2n7U" 
      }
    },
    {
      name: "Pembagian Kelompok",
      tutorLabel: "Kelompok",
      required: false,
      type: "Interactive",
      content: null
    },
    {
      name: "Ayo Diskusi (LKPD)", // MindMap
      tutorLabel: "LKPD MindMap",
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
      name: "Rangkuman",
      tutorLabel: "Rangkuman",
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
