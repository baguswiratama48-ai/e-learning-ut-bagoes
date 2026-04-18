export const Sesi1_6A = {
  id: "sesi1_6a",
  meetingId: "1",
  classIds: ["3"], // Class 6A Sesi 1
  sections: [
    {
      name: "Informasi Modul",
      tutorLabel: "Orientasi",
      required: false,
      type: "RATSATV2",
      content: {
        title: "Orientasi Penanganan Anak Berkebutuhan Khusus",
        description: "Selamat datang di Sesi 1! Pada sesi ini kita akan membahas Hakikat Perkembangan Anak yang Bersifat Nonnormatif.",
        documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
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
          "Menurut Anda, apa yang membedakan perkembangan nonnormatif dengan kelainan/abnormal secara medis?",
          "Bagaimana cetak biru biologis atau genetik memengaruhi perkembangan anak?",
          "Ceritakan pengalaman Anda ketika mengobservasi anak dengan perkembangan nonnormatif."
        ]
      }
    },
    {
      name: "Materi Pembelajaran",
      tutorLabel: "Materi",
      required: false,
      type: "MateriV2",
      content: {
        title: "Materi Sesi 1: Hakikat Perkembangan Anak yang Bersifat Nonnormatif",
        htmlContent: `<div class="space-y-4">
          <p>Dalam sesi ini, kita membahas model medis, penyimpangan dari rata-rata, dan penyimpangan dari ideal terkait kelainan/abnormal pada anak.</p>
          <p>Faktor yang memengaruhi antara lain cetak biru biologis (genetik) dan konteks sosial (lingkungan).</p>
        </div>`
      }
    },
    {
      name: "Video Pembelajaran",
      tutorLabel: "Video",
      required: false,
      type: "VideoEvalV2",
      content: {
        title: "Observasi Perkembangan Nonnormatif",
        description: "Simak video ini dan catat poin-poin penting mengenai cara identifikasi melalui obeservasi anak.",
        youtubeId: "J8_T6lH2n7U" // Dummy placeholder
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
      name: "Refleksi",
      tutorLabel: "Refleksi",
      required: true,
      type: "Interactive",
      content: null
    }
  ]
};
