export const Sesi2_BK = {
  id: "BK_S2",
  meetingId: "2",
  classIds: ["1", "2"],
  courseCode: "SPGK4307",
  courseName: "Bimbingan Konseling di SD",
  sections: [
    {
      name: "Informasi Modul",
      label: "RAT/SAT",
      type: "RATSATV2",
      content: {
        title: "Bimbingan dan Konseling di SD",
        capaian: [
          "Mahasiswa mampu menguraikan konsep dasar komponen program layanan bimbingan dan konseling di SD.",
          "Mahasiswa mampu menguraikan karakteristik peserta didik dan mampu menganalisis serta mengevaluasi tugas perkembangan peserta didik Sekolah Dasar (SD)."
        ],
        pokokBahasan: [
          {
            title: "Hakikat Bimbingan dan Konseling",
            subs: [
              "Konsep Dasar Bimbingan dan Konseling di Sekolah Dasar", 
              "Jenis-jenis layanan Bimbingan dan Konseling"
            ]
          },
          {
            title: "Karakteristik & Tugas Perkembangan Peserta Didik di SD",
            subs: [
              "Konsep Karakteristik dan Tugas", 
              "Perkembangan Sekolah Dasar", 
              "Perkembangan Fisik-Motorik dan Upaya Bimbingannya"
            ]
          }
        ],
        evaluationQuestion: "Setelah mempelajari RAT/SAT ini, tuliskan satu harapan utama Anda untuk proses pembelajaran bimbingan konseling di kelas ini."
      }
    },
    {
      name: "Materi Pembelajaran",
      type: "MateriV2",
      content: {
        title: "Materi Bimbingan dan Konseling di SD",
        subtitle: "Konsep Dasar, Jenis Layanan, dan Karakteristik Peserta Didik",
        sections: [
          {
            letter: "A",
            title: "Konsep Dasar Bimbingan dan Konseling di SD",
            description: "Bimbingan dan Konseling (BK) di SD adalah proses bantuan kepada peserta didik agar berkembang optimal (pribadi, sosial, belajar, dan karier) sesuai tahap perkembangannya.",
            points: [
              {
                label: "Tujuan BK di SD",
                text: "Membantu siswa mengenal diri serta mengembangkan potensi.",
                items: [
                  "Membantu siswa mengenal diri",
                  "Mengembangkan potensi",
                  "Mengatasi masalah sederhana",
                  "Membentuk karakter positif sejak dini"
                ]
              },
              {
                label: "Komponen Program",
                text: "Kerangka layanan BK terpadu di sekolah dasar.",
                items: [
                  "Layanan Dasar → Untuk semua siswa (contoh: pembiasaan disiplin)",
                  "Layanan Responsif → Menangani masalah langsung (contoh: siswa berkelahi)",
                  "Perencanaan Individual → Membantu perencanaan masa depan",
                  "Dukungan Sistem → Kerja sama guru, orang tua, sekolah"
                ]
              }
            ],
            examples: [
              "Guru memberi bimbingan cara berteman",
              "Konselor membantu siswa yang sering menyendiri",
              "Program pembiasaan disiplin pagi"
            ]
          },
          {
            letter: "B",
            title: "Jenis-Jenis Layanan Bimbingan dan Konseling",
            description: "Membantu perkembangan siswa dari berbagai aspek melalui berbagai bentuk intervensi.",
            points: [
              {
                label: "Jenis Layanan Utama",
                text: "Bentuk bantuan langsung kepada siswa.",
                items: [
                  "Orientasi → Pengenalan lingkungan sekolah",
                  "Informasi → Info belajar, kesehatan, aturan",
                  "Pembelajaran → Cara belajar efektif",
                  "Penempatan & Penyaluran → Ekstrakurikuler sesuai minat",
                  "Penguasaan Konten → Keterampilan (komunikasi, disiplin)"
                ]
              },
              {
                label: "Layanan Intervensi & Konsultasi",
                text: "Pendalaman masalah and mediasi.",
                items: [
                  "Konseling Individual → Masalah pribadi siswa",
                  "Bimbingan Kelompok → Diskusi topik umum",
                  "Konseling Kelompok → Penyelesaian masalah bersama",
                  "Konsultasi → Guru/orang tua minta saran",
                  "Mediasi → Menyelesaikan konflik siswa"
                ]
              }
            ]
          },
          {
            letter: "C",
            title: "Karakteristik Peserta Didik SD",
            description: "Ciri khas siswa usia 6–12 tahun dalam aspek fisik, kognitif, sosial, dan emosional.",
            points: [
              {
                label: "Karakteristik Umum",
                text: "Sifat dominan anak pada masa sekolah dasar.",
                items: [
                  "Suka bermain dan bergerak",
                  "Mulai berpikir logis sederhana",
                  "Senang bekerja dalam kelompok",
                  "Emosi belum stabil",
                  "Membutuhkan pengakuan/penghargaan"
                ]
              }
            ],
            examples: [
              "Siswa cepat bosan → perlu metode variatif",
              "Suka kompetisi → cocok diberi reward",
              "Mudah meniru → perlu keteladanan guru"
            ]
          },
          {
            letter: "D",
            title: "Konsep Karakteristik dan Tugas Perkembangan",
            description: "Tugas yang harus dicapai anak sesuai usia agar berkembang secara normal.",
            points: [
              {
                label: "Tugas Perkembangan Utama",
                text: "Kompetensi dasar yang harus dikuasai di masa SD.",
                items: [
                  "Belajar membaca, menulis, berhitung",
                  "Belajar bergaul dengan teman",
                  "Mengembangkan sikap disiplin",
                  "Mengenal peran diri (laki-laki/perempuan)",
                  "Mengembangkan moral dan nilai"
                ]
              },
              {
                label: "Aspek-Aspek Perkembangan",
                text: "Detail perkembangan kognitif hingga moral.",
                items: [
                  "Kognitif: Mulai berpikir logis (Tahap operasional konkret). Contoh: Memahami sebab-akibat sederhana.",
                  "Sosial: Mulai butuh teman dan kelompok. Contoh: Bermain bersama.",
                  "Emosional: Masih labil, mudah marah/sedih. Perlu bimbingan pengendalian emosi.",
                  "Moral: Mulai memahami benar-salah. Perlu pembiasaan nilai."
                ]
              }
            ]
          },
          {
            letter: "F",
            title: "Perkembangan Fisik-Motorik dan Upaya Bimbingannya",
            description: "Perkembangan tubuh dan kemampuan gerak anak yang mendukung kemandirian.",
            points: [
              {
                label: "Ciri-ciri & Masalah",
                text: "Kondisi fisik dan tantangan yang sering muncul.",
                items: [
                  "Ciri: Aktif bergerak, koordinasi motorik berkembang, suka aktivitas fisik.",
                  "Masalah: Kurang aktif / terlalu aktif, koordinasi lemah, mudah lelah."
                ]
              },
              {
                label: "Upaya Bimbingan",
                text: "Tindakan guru untuk mendukung perkembangan fisik.",
                items: [
                  "Memberi kegiatan olahraga",
                  "Mengatur waktu belajar dan bermain",
                  "Memberi aktivitas motorik (senam, permainan)",
                  "Memantau kesehatan siswa"
                ]
              }
            ],
            examples: [
              "Siswa hiperaktif → diarahkan ke kegiatan olahraga",
              "Siswa lemah motorik → latihan sederhana bertahap"
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
          [
            "Jika semua guru sudah mengajar dengan baik, mengapa layanan Bimbingan dan Konseling masih diperlukan di SD?",
            "Apa yang akan terjadi pada perkembangan siswa jika sekolah tidak memiliki layanan BK?",
            "Menurut Anda, apakah peran guru kelas di SD sudah mencakup fungsi konselor? Jelaskan dengan alasan!",
            "Bagaimana membedakan antara “mengajar”, “mendidik”, dan “membimbing” dalam konteks SD?",
            "Jika seorang siswa bermasalah secara emosional, siapa yang paling bertanggung jawab: guru, orang tua, atau konselor? Mengapa?",
          ],
          [
            "Mengapa layanan BK tidak cukup hanya dengan konseling individu saja?",
            "Dalam kondisi apa layanan bimbingan kelompok lebih efektif dibandingkan konseling individu?",
            "Bagaimana Anda menentukan layanan BK yang tepat untuk siswa yang sama tetapi memiliki masalah berbeda?",
            "Apa dampak jika layanan BK diberikan tanpa memahami kebutuhan siswa?",
            "Jika Anda menjadi guru, layanan apa yang paling sering Anda gunakan di SD dan mengapa?",
          ],
          [
            "Mengapa memahami karakteristik siswa SD menjadi kunci keberhasilan pembelajaran dan bimbingan?",
            "Apa akibatnya jika guru memberikan tuntutan yang tidak sesuai dengan tahap perkembangan siswa?",
            "Apakah semua siswa SD memiliki karakteristik yang sama? Jelaskan dengan contoh nyata!",
            "Bagaimana cara guru menyesuaikan pendekatan pembelajaran dengan perbedaan karakteristik siswa?",
            "Jika ada siswa yang “tidak sesuai” dengan tugas perkembangannya, apa yang harus dilakukan?",
          ],
          [
            "Mengapa tugas perkembangan harus dicapai secara bertahap?",
            "Apa hubungan antara kegagalan mencapai tugas perkembangan dengan masalah perilaku siswa?",
            "Bagaimana Anda mengidentifikasi bahwa seorang anak sudah atau belum mencapai tugas perkembangannya?",
            "Apakah tugas perkembangan bersifat mutlak untuk semua anak? Mengapa?",
            "Jika seorang anak berkembang lebih cepat atau lebih lambat dari teman sebayanya, bagaimana seharusnya guru bersikap?",
          ],
          [
            "Mengapa masa SD sering disebut sebagai “masa dasar” dalam kehidupan anak?",
            "Apa dampak jangka panjang jika perkembangan di usia SD tidak optimal?",
            "Bagaimana lingkungan sekolah mempengaruhi perkembangan sosial dan emosional siswa?",
            "Menurut Anda, mana yang lebih berpengaruh: faktor keluarga atau sekolah? Jelaskan!",
            "Jika Anda merancang sekolah ideal, aspek perkembangan apa yang paling Anda prioritaskan?",
          ],
          [
            "Mengapa perkembangan fisik-motorik mempengaruhi kemampuan belajar siswa?",
            "Bagaimana cara membedakan antara keterlambatan motorik dan sekadar perbedaan individu?",
            "Apa peran guru dalam membantu siswa dengan perkembangan motorik yang kurang optimal?",
            "Jika sekolah hanya fokus pada akademik, apa dampaknya terhadap perkembangan fisik siswa?",
            "Bagaimana bentuk layanan BK yang bisa mendukung perkembangan fisik-motorik siswa?",
          ],
        ],
      },
    },
    {
      name: "Video Pembelajaran",
      type: "VideoEvalV2",
      content: {
        videoId: "lEWK8NMHtEs",
        title: "Perkembangan Peserta Didik di SD",
        category: "Materi Bimbingan Konseling",
        evaluationText: "Susunlah poin-poin penting dari video yang telah Anda tonton.",
        minWords: 100,
      },
    },
    {
      name: "Ayo Diskusi",
      type: "MateriV2",
      tutorLabel: "LKM",
      content: { title: "Forum Diskusi / LKM Sesi 2", sections: [{ title: "Tugas Diskusi", points: [{ label: "Topik", text: "Diskusikan perkembangan fisik motorik anak SD." }] }] }
    },
    {
      name: "Kuis dan Latihan",
      type: "VideoEvalV2",
      tutorLabel: "Quiz",
      content: { videoId: "", title: "Quiz Sesi 2", evaluationText: "Berikan ulasan tugas kuis Anda." }
    },
    {
      name: "Rangkuman",
      type: "MateriV2",
      content: { title: "Rangkuman Sesi 2", sections: [{ title: "Kesimpulan", points: [{ label: "Poin Penting", text: "Isi rangkuman BK Sesi 2." }] }] }
    },
    {
      name: "Refleksi",
      type: "MateriV2",
      content: { title: "Refleksi Sesi 2", sections: [{ title: "Ulasan Diri", points: [{ label: "Refleksi", text: "Apa kesan Anda pada sesi ini?" }] }] }
    }
  ],
};
