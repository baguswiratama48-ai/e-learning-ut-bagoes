export const Sesi2_Strategi = {
  id: "STRAT_S2",
  meetingId: "2",
  classIds: ["4"],
  courseCode: "SPGK4410",
  courseName: "Strategi Pembelajaran Kontemporer di SD",
  sections: [
    {
      name: "Informasi Modul",
      label: "RAT/SAT",
      type: "RATSATV2",
      content: {
        title: "Pembelajaran di Sekolah Dasar",
        capaianUmum: "Mahasiswa dapat meningkatkan kemampuan professional sehingga mampu mengembangkan pengetahuan dan keterampilan dalam mengelola pembelajaran di SD",
        capaianKhusus: [
          "Mahasiswa dapat menjelaskan karakteristik pembelajaran di SD"
        ],
        pokokBahasan: [
          {
            title: "Pembelajaran di Sekolah Dasar",
            subs: [
              "Pengertian Belajar",
              "Karakteristik, proses belajar dan tahapan perkembangan siswa Sekolah Dasar",
              "Karakteristik pembelajaran di Sekolah dasar"
            ]
          }
        ],
        evaluationQuestion: "Belajar menurut anda itu apa? (Gunakan minimal 20 kata untuk menjelaskan pandangan Anda)",
        minWords: 20
      }
    },
    {
      name: "Pertanyaan Pemantik",
      required: true,
      type: "PemantikV2",
      content: {
        required: 6,
        groups: [
          [
            "Mengapa kreativitas guru menjadi kunci dalam strategi pembelajaran kontemporer?",
            "Bagaimana cara mengintegrasikan teknologi dalam pembelajaran secara efektif?",
            "Apa tantangan terbesar dalam menerapkan model pembelajaran berpusat pada siswa?",
            "Bagaimana strategi Anda dalam menghadapi keberagaman gaya belajar di kelas?",
            "Apa peran umpan balik dalam meningkatkan hasil belajar siswa secara berkelanjutan?",
            "Bagaimana Anda merancang evaluasi yang otentik dalam konteks SD?"
          ]
        ]
      }
    },
    {
      name: "Materi Pembelajaran",
      type: "MateriV2",
      content: {
        title: "Materi Strategi Kontemporer",
        subtitle: "Inovasi dan Kreativitas Pembelajaran",
        sections: [
          {
            letter: "A",
            title: "Hakikat Strategi Kontemporer",
            description: "Pendekatan pembelajaran yang menyesuaikan dengan perkembangan zaman.",
            points: [
              {
                label: "Prinsip Utama",
                text: "Interaktivitas dan kemandirian belajar.",
                items: [
                  "Kolaboratif",
                  "Berbasis Masalah",
                  "Pemanfaatan Multimedia"
                ]
              }
            ]
          }
        ]
      }
    },
    {
      name: "Video Pembelajaran",
      type: "VideoEvalV2",
      content: {
        videoId: "6V-1C9Cj6X0",
        title: "Inovasi Strategi Pembelajaran di Era Digital",
        category: "Materi Strategi",
        evaluationText: "Tuliskan pendapat Anda mengenai salah satu strategi inovatif yang dipaparkan dalam video tersebut.",
        minWords: 100,
      },
    },
    {
      name: "Pembagian Kelompok",
      type: "GroupsV2"
    },
    {
      name: "Ayo Diskusi (LKPD)",
      required: true,
      type: "Interactive",
      tutorLabel: "LKM",
      content: { title: "Forum Diskusi / LKM Sesi 2", sections: [{ title: "Tugas Diskusi", points: [{ label: "Target", text: "Diskusikan penerapan strategi pembelajaran kontemporer." }] }] }
    },
    {
      name: "Kuis dan Latihan",
      required: true,
      type: "Interactive",
      tutorLabel: "Quiz",
      content: { videoId: "", title: "Quiz Sesi 2", evaluationText: "Berikan ulasan tugas kuis Anda." }
    },
    {
      name: "Refleksi",
      required: true,
      type: "Interactive",
      content: { title: "Refleksi Sesi 2", sections: [{ title: "Refleksi Diri", points: [{ label: "Ulasan", text: "Apa pelajaran paling berharga dari sesi ini?" }] }] }
    },
    {
      name: "Rangkuman",
      required: true,
      type: "Interactive",
      content: { title: "Rangkuman Sesi 2", sections: [{ title: "Point Utama", points: [{ label: "Kesimpulan", text: "Rangkuman materi strategi kontemporer." }] }] }
    }
  ],
};
