export const Sesi2_ABK = {
  id: "ABK_S2",
  meetingId: "2",
  classIds: ["3"],
  courseCode: "SPDA4401",
  courseName: "Penanganan Anak Berkebutuhan Khusus",
  sections: [
    {
      name: "Informasi Modul",
      label: "RAT/SAT",
      type: "RATSATV2",
      content: {
        title: "Penanganan Anak Berkebutuhan Khusus",
        capaian: [
          "Mahasiswa mampu mengidentifikasi karakteristik anak berkebutuhan khusus.",
          "Mahasiswa mampu merancang strategi penanganan awal untuk anak dengan hambatan belajar."
        ],
        pokokBahasan: [
          {
            title: "Hakikat Anak Berkebutuhan Khusus",
            subs: [
              "Definisi dan Klasifikasi ABK", 
              "Prinsip Dasar Layanan Pendidikan ABK"
            ]
          }
        ],
        evaluationQuestion: "Tuliskan harapan Anda setelah mempelajari modul penanganan ABK ini."
      }
    },
    {
      name: "Materi Pembelajaran",
      type: "MateriV2",
      content: {
        title: "Materi Penanganan ABK",
        subtitle: "Konsep Dasar dan Identifikasi",
        sections: [
          {
            letter: "A",
            title: "Identifikasi ABK di Kelas Inklusif",
            description: "Proses awal menemukenali hambatan belajar pada siswa.",
            points: [
              {
                label: "Tujuan Identifikasi",
                text: "Memberikan layanan yang sesuai kebutuhan siswa.",
                items: [
                  "Menemukan hambatan belajar",
                  "Menentukan jenis bantuan",
                  "Rujukan ke tenaga ahli jika diperlukan"
                ]
              }
            ]
          }
        ]
      }
    },
    {
      name: "Pertanyaan Pemantik",
      type: "PemantikV2",
      content: {
        required: 6,
        groups: [
          ["Apa tantangan terbesar guru saat menghadapi ABK di kelas umum?", "Mengapa label negatif harus dihindari saat identifikasi ABK?", "Bagaimana cara melibatkan orang tua dalam penanganan ABK?", "Apakah inklusi selalu menjadi solusi terbaik?", "Apa yang Anda lakukan jika ada siswa yang diduga lamban belajar?"],
          ["Bagaimana modifikasi kurikulum dilakukan untuk ABK?", "Apa perbedaan antara integrasi dan inklusi?", "Mengapa aksesibilitas fisik penting di sekolah?", "Bagaimana cara membangun empati siswa lain terhadap ABK?", "Siapa saja tim ahli yang terlibat dalam penanganan ABK?"],
          ["Apa saja ciri umum anak dengan hambatan penglihatan?", "Bagaimana cara berkomunikasi dengan anak hambatan pendengaran?", "Apa itu ADHD dan bagaimana penanganannya di kelas?", "Mengapa deteksi dini sangat krusial?", "Bagaimana peran lingkungan dalam perkembangan ABK?"],
          ["Apa itu IEP (Individualized Education Program)?", "Bagaimana cara menilai hasil belajar ABK?", "Apa saja media pembelajaran adaptif?", "Mengapa fleksibilitas guru sangat diperlukan?", "Bagaimana menangani perilaku tantrum di kelas?"],
          ["Bagaimana menciptakan iklim kelas yang ramah ABK?", "Apa pentingnya kolaborasi antar guru?", "Bagaimana cara memberikan penguatan positif pada ABK?", "Apa dampak sosial bagi ABK yang tidak tertangani?", "Bagaimana prospek masa depan ABK di era inklusif?"],
          ["Apa kesimpulan Anda tentang hak pendidikan bagi ABK?", "Bagaimana cara mengatasi stigma masyarakat terhadap ABK?", "Apa harapan Anda untuk sistem pendidikan inklusif di Indonesia?", "Bagaimana teknologi membantu pembelajaran ABK?", "Apa langkah kecil yang bisa Anda lakukan mulai besok?"],
        ],
      },
    },
    {
      name: "Video Pembelajaran",
      type: "VideoEvalV2",
      content: {
        videoId: "kUqjWvY5XpY", // Contoh ID video ABK
        title: "Pendidikan Inklusif dan Penanganan ABK",
        category: "Materi ABK",
        evaluationText: "Tuliskan resume singkat mengenai poin-poin utama dari video pendidikan inklusif tersebut.",
        minWords: 100,
      },
    },
    {
      name: "Ayo Diskusi",
      type: "MateriV2",
      tutorLabel: "LKM",
      content: { title: "Forum Diskusi / LKM Sesi 2", sections: [{ title: "Tugas Diskusi", points: [{ label: "Topik", text: "Diskusikan penanganan ABK di sekolah inklusi." }] }] }
    },
    {
      name: "Kuis dan Latihan",
      type: "VideoEvalV2",
      tutorLabel: "Quiz",
      content: { videoId: "", title: "Quiz Sesi 2", evaluationText: "Berikan ulasan kuis Anda." }
    },
    {
      name: "Rangkuman",
      type: "MateriV2",
      content: { title: "Rangkuman Sesi 2", sections: [{ title: "Kesimpulan", points: [{ label: "Poin Utama", text: "Rangkuman materi ABK." }] }] }
    },
    {
      name: "Refleksi",
      type: "MateriV2",
      content: { title: "Refleksi Sesi 2", sections: [{ title: "Refleksi Diri", points: [{ label: "Ulasan", text: "Apa yang Anda pelajari hari ini?" }] }] }
    }
  ],
};
