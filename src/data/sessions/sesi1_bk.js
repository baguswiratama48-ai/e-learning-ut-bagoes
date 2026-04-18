export const Sesi1_BK = {
  id: "BK_S1",
  meetingId: "1",
  classIds: ["1", "2"],
  sections: [
    {
      name: "Informasi Modul",
      tutorLabel: "RAT/SAT",
      required: false,
      type: "RATSATV2",
      content: {
        title: "Bimbingan Konseling di SD",
        description: "Selamat datang di Sesi 1! Mari kita pelajari Hakikat, Fungsi, dan Prinsip Bimbingan Konseling di SD.",
        documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      }
    },
    {
      name: "Pertanyaan Pemantik",
      tutorLabel: "Pemantik",
      required: true,
      type: "PemantikV2",
      content: {
        title: "Pemantik Sesi 1 BK",
        questions: [
          "Menurut pemahaman Anda, apa perbedaan mendasar bimbingan dan konseling?",
          "Mengapa guru SD perlu memahami prinsip-prinsip BK dalam mengelola kelas?",
          "Sebutkan salah satu fungsi BK yang paling relevan dengan kondisi siswa di sekolah Anda."
        ]
      }
    },
    {
      name: "Materi Pembelajaran",
      tutorLabel: "Materi",
      required: false,
      type: "MateriV2",
      content: {
        title: "Modul 1: Hakikat BK di Sekolah Dasar",
        htmlContent: `<div class="space-y-4 text-slate-700 leading-relaxed text-justify">
          <p>Sesi ini menjelaskan mengenai hakikat bimbingan konseling, peran guru dalam bimbingan, serta berbagai fungsi dan prinsip yang mendasari layanan BK di SD.</p>
        </div>`
      }
    },
    {
      name: "Video Pembelajaran",
      tutorLabel: "Video",
      required: false,
      type: "VideoEvalV2",
      content: {
        title: "Video Pengenalan BK di SD",
        description: "Simak video ini untuk memahami bagaimana layanan BK dapat membantu perkembangan siswa.",
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
