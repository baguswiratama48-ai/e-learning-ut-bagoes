export const Sesi1_BK = {
  id: "BK_S1",
  meetingId: "1",
  classIds: ["1", "2"],
  sections: [
    {
      name: "Informasi Modul",
      label: "Informasi Modul",
      tutorLabel: "Informasi",
      required: false,
      type: "RATSATV2",
      content: {
        title: "Bimbingan Konseling di SD",
        description: "Selamat datang di Sesi 1! Mari kita pelajari Hakikat, Fungsi, dan Prinsip Bimbingan Konseling di SD.",
        capaian: [
          "Menjelaskan hakikat bimbingan dan konseling",
          "Memahami peran guru dalam layanan BK di SD",
          "Mengidentifikasi fungsi dan prinsip dasar BK"
        ],
        pokokBahasan: [
          {
            title: "Konsep Dasar BK",
            subs: ["Pengertian Bimbingan", "Pengertian Konseling", "Tujuan BK di SD"]
          },
          {
            title: "Landasan BK",
            subs: ["Fungsi-fungsi Layanan", "Prinsip-prinsip BK"]
          }
        ],
        evaluationQuestion: "Mengapa layanan BK di tingkat SD sangat krusial dibandingkan jenjang lainnya?",
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
        title: "Modul 1: Hakikat BK di Sekolah Dasar",
        htmlContent: `<div class="space-y-4 text-slate-700 leading-relaxed text-justify">
          <p>Sesi ini menjelaskan mengenai hakikat bimbingan konseling, peran guru dalam bimbingan, serta berbagai fungsi dan prinsip yang mendasari layanan BK di SD.</p>
        </div>`
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
        ],
        groups:null
      }
    },
    {
      name: "Video Pembelajaran",
      tutorLabel: "Video",
      required: false,
      type: "VideoEvalV2",
      content: {
        title: "Video Layanan BK di SD",
        evaluationText: "Simpulkan peran guru yang anda lihat dalam video tersebut.",
        videoId: "J8_T6lH2n7U" 
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
