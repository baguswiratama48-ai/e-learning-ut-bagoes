export const Sesi2_Strategi = {
  id: "5a-sesi2",
  classIds: ["4"], 
  meetingId: 2,
  title: "Strategi Pembelajaran di SD",
  sections: [
    {
      name: "Informasi Modul",
      type: "RATSATV2",
      content: {
        title: "RAT / SAT - Strategi Pembelajaran",
        courseCode: "SPGK4410",
        courseName: "Strategi Pembelajaran Kontemporer di SD",
        sks: "4",
        description: "Modul ini membahas tentang hakikat belajar dan karakteristik perkembangan serta pembelajaran di Sekolah Dasar.",
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
        evaluationQuestion: "Belajar menurut anda itu apa? (Gunakan minimal 10 kata untuk menjelaskan pandangan Anda)",
        minWords: 10
      }
    },
    {
      name: "Pertanyaan Pemantik",
      required: true,
      type: "PemantikV2",
      content: {
        required: 3,
        groups: [
          [
            "1. Seorang siswa kelas 2 SD terlihat cepat memahami pelajaran saat menggunakan gambar dan permainan, tetapi kesulitan saat hanya mendengarkan penjelasan guru.\n\n👉 Menurut Anda, bagaimana proses belajar yang sedang terjadi pada siswa tersebut?"
          ],
          [
            "2. Di kelas 5, beberapa siswa mulai aktif bertanya dan berpendapat, tetapi ada juga yang masih pasif dan bergantung pada arahan guru.\n\n👉 Bagaimana Anda menjelaskan perbedaan karakteristik dan tahap perkembangan siswa dalam kasus ini?"
          ],
          [
            "3. Seorang guru mengajar dangan metode ceramah terus-menerus, sehingga siswa terlihat bosan dan kurang terlibat dalam pembelajaran.\n\n👉 Menurut Anda, bagaimana seharusnya pembelajaran di SD dirancang agar sesuai dangan karakteristik siswa?"
          ]
        ]
      }
    },
    {
      name: "Materi Pembelajaran",
      type: "MateriV2",
      content: {
        title: "Proses Belajar & Perkembangan Siswa",
        subtitle: "Memahami Karakteristik Siswa Sekolah Dasar",
        sections: [
          {
            letter: "A",
            title: "Teori-Teori Belajar Utama",
            description: "Memahami landasan psikologis bagaimana seorang siswa memperoleh pengetahuan.",
            points: [
              {
                label: "Teori Disiplin Mental",
                text: "Setiap anak lahir dangan daya-daya tertentu seperti daya mengingat, memecahkan masalah, mencurahkan pendapat, dan menghafal."
              },
              {
                label: "Teori Behaviorisme",
                text: "Perkembangan ditentukan lingkungan (keluarga, sekolah, masyarakat). Mencakup teori koneksionisme, kondisioning, dan penguatan."
              },
              {
                label: "Teori Insight",
                text: "Belajar melalui proses eksploratif, imajinatif, dan kreatif. Siswa berpartisipasi aktif dalam mempelajari kejadian alam."
              },
              {
                label: "Teori Gestalt/Organismik",
                text: "Manusia berhubungan timbal balik dangan lingkungan secara utuh. Siswa diajak memecahkan masalah dangan metode ilmiah."
              },
              {
                label: "Konstruktivisme",
                text: "Pengetahun dibangun secara aktif oleh siswa sendiri melalui pengalaman nyata."
              }
            ]
          },
          {
            letter: "B",
            title: "Tipe & Hasil Belajar",
            description: "Klasifikasi ragam aktivitas belajar dan kompetensi yang dihasilkan.",
            points: [
              {
                label: "8 Tipe Belajar Gagne",
                text: "Mulai dari belajar isyarat, stimulus-respon, perangkaian, perkaitan verbal, diskriminasi, konsep, aturan, hingga pemecahan masalah."
              },
              {
                label: "Hasil Belajar Utama",
                items: [
                  "Kognitif: Pemecahan masalah & berpikir logis.",
                  "Psikomotor: Tindakan fisik & kegiatan perseptual.",
                  "Keterampilan Interaktif: Kemampuan sosial & kepemimpinan.",
                  "Keterampilan Reaktif: Sikap, kebijaksanaan, rasa, & self-control."
                ]
              }
            ]
          },
          {
            letter: "C",
            title: "Tahapan Perkembangan Siswa SD",
            description: "Perubahan yang dialami anak usia SD dalam berbagai aspek kehidupan.",
            points: [
              {
                label: "Hasi Belajar Berpikir Kritis",
                items: [
                  "Kemampuan membaca dan mengamati informasi.",
                  "Membuat pertanyaan dari apa yang dibaca.",
                  "Mengkaji dari sudut persamaan atau perbedaan.",
                  "Melakukan kajian secara menyeluruh."
                ]
              },
              {
                label: "Aspek Perkembangan",
                items: [
                  "Fisik & Ekspresif: Berat, tinggi, motorik, & hobi seni.",
                  "Sosial & Bahasa: Kerjasama, empati, & kalimat kompleks.",
                  "Kognitif & Moral: Operasional konkrit & kemandirian moral."
                ]
              }
            ]
          },
          {
            letter: "D",
            title: "Aspek Inteligensi (Multiple Intelligences)",
            description: "Tujuh jenis kecerdasan utama yang mungkin dimiliki oleh siswa SD.",
            points: [
              {
                label: "Inteligensi Akademik",
                text: "Linguistik (bahasa) dan Logis-Matematis (pola & kategori)."
              },
              {
                label: "Inteligensi Seni & Ruang",
                text: "Spasial (visual), Musik (irama), dan Fisik-Kinestetik (olahraga/seni)."
              },
              {
                label: "Inteligensi Personal",
                text: "Intrapribadi (pemahaman diri) dan Interpribadi (pemahaman orang lain)."
              }
            ]
          }
        ],
        evaluationQuestion: "Setelah mempelajari materi perkembangan dan inteligensi di atas, bagaimana cara Anda merancang materi yang bisa mengakomodasi berbagai tipe kecerdasan siswa di kelas Anda?",
        minWords: 20
      }
    },
    {
      name: "Video Pembelajaran",
      type: "VideoEvalV2",
      content: {
        title: "Implementasi Strategi Kontemporer",
        evaluationText: "Tuliskan ringkasan inovasi pembelajaran yang Anda temukan dalam video ini.",
        videoId: "J8_T6lH2n7U",
        minWords: 20
      }
    },
    {
      name: "Pembagian Kelompok",
      type: "Interactive",
      content: null
    },
    {
      name: "LKPD (Lembar Kerja Peserta Didik)",
      type: "Interactive",
      content: null
    },
    {
      name: "Kuis dan Latihan",
      type: "Interactive",
      content: null
    },
    {
      name: "Refleksi",
      type: "Interactive",
      content: null
    },
    {
      name: "Rangkuman",
      type: "Interactive",
      content: null
    }
  ]
};
