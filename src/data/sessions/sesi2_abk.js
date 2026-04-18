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
        title: "Anak Dengan Gangguan Perilaku",
        subtitle: "Autism, ADD/ADHD, dan ODD",
        evaluationQuestion: "Apa saja jenis Anak Dengan Gangguan Perilaku yang anda ketahui dari materi tadi?",
        minWords: 15, // Disesuaikan agar tetap ringkas di HP
        sections: [
          {
            letter: "A",
            title: "Anak dengan Gangguan Autism",
            description: "Memahami hakikat dan spektrum gangguan autisme pada anak.",
            points: [
              {
                label: "Pengertian Autism",
                text: "Autism adalah suatu gangguan perkembangan yang berat sehingga dimasukkan ke dalam kelompok Pervasive Development Disorder (PDD). Ditandai dengan adanya kelainan pada fungsi sosial, bahasa, komunikasi, dan perilaku yang tidak biasa.",
                items: [
                  "Autistic Spectrum Disorder (ASD): Variasi bentuk dan tingkat keparahan (ringan sampai berat).",
                  "Kelainan fungsi sosial & komunikasi.",
                  "Minat yang tidak biasa (Mash & Wolfe, 2005)."
                ]
              }
            ]
          },
          {
            letter: "B",
            title: "Anak Penyandang ADD/ADHD",
            description: "Gangguan pemusatan perhatian dan hiperaktivitas.",
            points: [
              {
                label: "Pengertian & Diagnosis",
                text: "ADD/ADHD merupakan akronim dari Attention Deficit (Hyperactivity) Disorder. Di Indonesia dikenal sebagai GPPH (Gangguan Pemusatan Perhatian dan Hiperaktivitas).",
                items: [
                  "Diagnosis: Riwayat medis, wawancara klinis, kuesioner, dan observasi.",
                  "Komponen Utama: Inattention, Hiperaktif, dan Impulsif."
                ]
              },
              {
                label: "Karakteristik Utama",
                text: "Gejala yang sering muncul pada anak ADD/ADHD mencakup masalah perilaku dan interaksi.",
                items: [
                  "Inattention: Ceroboh, sulit fokus, mudah lupa.",
                  "Hiperaktif: Tidak bisa diam, banyak bicara.",
                  "Impulsif: Menjawab sebelum selesai, sulit menunggu giliran."
                ]
              },
              {
                label: "Penyebab & Penanganan",
                text: "Meliputi faktor biologis, neurologis, dan lingkungan.",
                items: [
                  "Penanganan: Medikasi (obat) dan Manajemen Perilaku.",
                  "Tim: Psikolog, Neurolog, Terapis, Orang Tua, dan Guru."
                ]
              }
            ]
          },
          {
            letter: "C",
            title: "Anak Penyandang ODD",
            description: "Oppositional Defiant Disorder (Gangguan perilaku menentang).",
            points: [
              {
                label: "Pengertian ODD",
                text: "ODD adalah gangguan perilaku mengganggu (disruptive behavior) yang ditandai dengan ketidakpatuhan dan menentang otoritas.",
                items: [
                  "Ciri utama: Perilaku bermusuhan, negatif, dan menentang orang dewasa.",
                  "Diagnosis jika terjadi minimal 6 bulan."
                ]
              },
              {
                label: "Karakteristik & Penanganan",
                text: "Gejala meliputi mudah marah, suka berdebat, dan menolak aturan.",
                items: [
                  "Penyebab: Biologis, Psikososial (pola asuh), dan Sosial.",
                  "Penanganan: Training keterampilan kognitif dan manajemen perilaku orang tua."
                ]
              }
            ]
          },
          {
            letter: "D",
            title: "Rangkuman",
            description: "Poin-poin inti penanganan gangguan perilaku.",
            points: [
              {
                label: "Kesimpulan Inti",
                text: "Gangguan perilaku (Autism, ADHD, ODD) memerlukan identifikasi yang tepat dan kerja sama antara guru dan orang tua.",
                items: [
                  "ODD = Ketidakpatuhan & Sikap Bermusuhan.",
                  "ADD/ADHD = Masalah Perhatian & Hiperaktivitas.",
                  "Penanganan: Medikasi, Terapi, dan Pelatihan Orang Tua."
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
