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
        title: "Tutorial Ke : 2", // Sesuai permintaan pengguna
        courseName: "Penanganan Anak Berkebutuhan Khusus",
        courseCode: "PAUD4208",
        sks: "4 SKS",
        // Deskripsi Singkat Mata Kuliah - Diketik persis tanpa perubahan
        description: `Mata kuliah Penanganan Anak Berkebutuhan Khusus (PAUD4208) membahas mengenai ragam permasalahan dan hambatan perkembangan yang terjadi pada anak usia dini, seperti : gangguan fisik, gangguan panca indera, gangguan autism, gangguan perilaku, gangguan belajar, gangguan bahasa, permasalahan perkembangan dengan rutinitas harian, gangguan attachment, anak yang mengalamai maltreatment, serta bentuk kerjasama untuk menangani anak nonnnormatif. Mata kuliah ini bermanfaat dalam mengidentifikasi serta mengambil tindakan yang tepat dalam penanganan anak berkebutuhan khusus sesuai dengan kapasitasnya sebagai pendidik dan tenaga kependidikan PAUD. Materi akan dibahas melalui penjelasan materi, pemberian contoh, dan pemecahan masalah. Penilaian terhadap pencapaian kompetensi dilakukan dengan memberikan tugas berupa latihan mengerjakan soal-soal atau kasus mengenai penanganan anak berkebutuhan khusus. Mata kuliah ini sangat erat dengan mata kuliah Psikologi Perkembangan Anak.`,
        // Capaian Pembelajaran - Dipisahkan Umum dan Khusus sesuai permintaan
        capaianUmum: "Melalui mata kuliah Penanganan Anak Berkebutuhan Khusus (PAUD4208) mahasiswa diharapkan mampu menangani anak berkebutuhan khusus dengan perkembangan nonnormatif sesuai dengan kapasitasnya sebagai pendidik dan tenaga kependidikan PAUD.",
        capaianKhusus: [
          "1. Mahasiswa mampu menjelaskan cara menangani anak dengan autism",
          "2. Mahasiswa mampu menjelaskan cara menangani anak dengan ADD/ADHD*",
          "3. Mahasiswa mampu menjelaskan cara menangani anak dengan gangguan inteligensi (ringan, sedang, berat) dan gangguan Down Syndrome"
        ],
        // Sub Pokok Bahasan - Diketik persis
        pokokBahasan: [
          {
            title: "Sub Pokok Bahasan",
            subs: [
              "2.1. Anak penyandang ADD/ADH",
              "2.2. Anak penyandang ODD"
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
      required: true,
      type: "Interactive",
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
      name: "Ayo Diskusi (LKPD)",
      required: true,
      type: "Interactive",
      tutorLabel: "LKM",
      content: { title: "Forum Diskusi / LKM Sesi 2", sections: [{ title: "Tugas Diskusi", points: [{ label: "Topik", text: "Diskusikan penanganan ABK di sekolah inklusi." }] }] }
    },
    {
      name: "Kuis dan Latihan",
      required: true,
      type: "Interactive",
      tutorLabel: "Quiz",
      content: { videoId: "", title: "Quiz Sesi 2", evaluationText: "Berikan ulasan kuis Anda." }
    },
    {
      name: "Rangkuman",
      required: true,
      type: "Interactive",
      content: { title: "Rangkuman Sesi 2", sections: [{ title: "Kesimpulan", points: [{ label: "Poin Utama", text: "Rangkuman materi ABK." }] }] }
    },
    {
      name: "Refleksi",
      required: true,
      type: "Interactive",
      content: { title: "Refleksi Sesi 2", sections: [{ title: "Refleksi Diri", points: [{ label: "Ulasan", text: "Apa yang Anda pelajari hari ini?" }] }] }
    }
  ],
};
