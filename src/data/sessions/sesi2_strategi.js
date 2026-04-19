export const Sesi2_Strategi = {
  id: "5a-sesi2",
  classIds: ["4"], 
  meetingId: 2,
  title: "Strategi Pembelajaran di SD",
  sections: [
    {
      name: "Informasi Modul",
      type: "RATSAT",
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
            "3. Seorang guru mengajar dengan metode ceramah terus-menerus, sehingga siswa terlihat bosan dan kurang terlibat dalam pembelajaran.\n\n👉 Menurut Anda, bagaimana seharusnya pembelajaran di SD dirancang agar sesuai dengan karakteristik siswa?"
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
                text: "Setiap anak lahir dengan daya mengingat, memecahkan masalah, dan menghafal yang bisa dilatih serta ditransfer."
              },
              {
                label: "Teori Behaviorisme",
                text: "Perkembangan ditentukan lingkungan (keluarga, sekolah, masyarakat). Mencakup koneksionisme, kondisioning, dan penguatan."
              },
              {
                label: "Teori Insight",
                text: "Belajar melalui proses eksploratif, imajinatif, dan kreatif. Siswa berpartisipasi aktif dalam berpikir tingkat tinggi."
              },
              {
                label: "Teori Gestalt/Organismik",
                text: "Manusia berhubungan timbal balik dangan lingkungan secara utuh. Siswa diajak memecahkan masalah dangan metode ilmiah."
              },
              {
                label: "Konstruktivisme",
                text: "Pengetahuan tidak diberikan begitu saja, melainkan dibangun sendiri secara aktif oleh siswa."
              }
            ]
          },
          {
            letter: "B",
            title: "Tipe, Hasil, & Keterampilan Belajar",
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
                  "Interaktif: Keterampilan sosial & kepemimpinan.",
                  "Reaktif: Sikap, kebijaksanaan, & self-control."
                ]
              },
              {
                label: "Indikator Berpikir Kritis/Ilmiah",
                items: [
                  "Kemampuan membaca dan mengamati informasi.",
                  "Kemampuan membuat pertanyaan kritis dari bacaan.",
                  "Mampu mengkaji persamaan atau perbedaan.",
                  "Melakukan kajian secara menyeluruh (holistik)."
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
                label: "Fisik & Ekspresif",
                text: "Perkembangan tinggi, berat badan, motorik, serta minat bermain dan hobi berdasarkan gender."
              },
              {
                label: "Sosial & Bahasa",
                text: "Munculnya kerjasama, empati, hingga penggunaan bahasa yang lebih halus, kompleks, dan kalimat panjang."
              },
              {
                label: "Kognitif (Operasional Konkrit)",
                text: "Mampu menyelesaikan tugas menggabungkan, menghubungkan, memisahkan, menyusun, melipat, dan membagi."
              },
              {
                label: "Moral & Kebutuhan",
                text: "Kemampuan bertindak menjadi orang baik menurut pandangan orang lain serta pemenuhan aspek psiko-biologis."
              }
            ]
          },
          {
            letter: "D",
            title: "Aspek Inteligensi (Multiple Intelligences)",
            description: "Setiap siswa memiliki potensi kecerdasan yang berbeda-beda.",
            points: [
              {
                label: "Linguistik & Logis-Matematis",
                text: "Kecerdasan menggunakan bahasa dan berpikir logis melalui pola, hubungan, serta kategori."
              },
              {
                label: "Spasial & Musik",
                text: "Kemampuan mempersepsi dunia ruang visual serta mempertunjukkan atau mengubah musik."
              },
              {
                label: "Fisik-Kinestetik",
                text: "Kemampuan motorik halus dan kasar dalam bidang olahraga maupun seni."
              },
              {
                label: "Intrapribadi & Interpribadi",
                text: "Memahami perasaan/gagasan diri sendiri (Intra) serta memahami motivasi/tempramen orang lain (Inter)."
              }
            ]
          }
        ],
        evaluationQuestion: "Setelah mempelajari materi perkembangan dan inteligensi di atas, bagaimana cara Anda merancang materi yang bisa mengakomodasi berbagai tipe kecerdasan siswa di kelas Anda?",
        minWords: 20
      }
    }
  ]
};
