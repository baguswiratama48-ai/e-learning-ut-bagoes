export const Sesi1_6A = {
  id: "6A_S1",
  meetingId: "1",
  classIds: ["3"],
  sections: [
    {
      name: "Informasi Modul",
      tutorLabel: "RAT/SAT",
      required: false,
      type: "RATSATV2",
      content: {
        title: "Penanganan Anak Berkebutuhan Khusus",
        description: "Selamat datang di Sesi 1! Mari kita pelajari Hakikat Perkembangan Anak yang Bersifat Nonnormatif.",
        documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
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
      name: "Materi Pembelajaran",
      tutorLabel: "Materi",
      required: false,
      type: "MateriV2",
      content: {
        title: "Materi Sesi 1: Hakikat Perkembangan Anak yang Bersifat Nonnormatif",
        htmlContent: `<div class="space-y-4 text-slate-700 leading-relaxed text-justify">
          <p>Dalam sesi ini, kita akan membahas mengenai hakikat perkembangan anak yang bersifat nonnormatif, mencakup model medis, penyimpangan dari rata-rata, hingga penyimpangan dari ideal.</p>
          <p>Serta faktor-faktor yang memengaruhinya seperti cetak biru biologis (genetik) dan konteks sosial (lingkungan).</p>
        </div>`
      }
    },
    {
      name: "Video Pembelajaran",
      tutorLabel: "Video",
      required: false,
      type: "VideoEvalV2",
      content: {
        title: "Simak Video Identifikasi ABK",
        description: "Perhatikan poin-poin penting dalam mengidentifikasi anak dengan kebutuhan khusus.",
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
      name: "Refleksi",
      tutorLabel: "Refleksi",
      required: true,
      type: "Interactive",
      content: null
    }
  ]
};
