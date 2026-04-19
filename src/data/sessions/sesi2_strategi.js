export const Sesi2_Strategi = {
  id: "5a-sesi2",
  classId: "5a",
  // classIds diperlukan agar getSessionConfig di index.js bisa menemukannya
  classIds: ["5a"], 
  meetingId: 2,
  title: "Strategi Pembelajaran di SD",
  sections: [
    {
      name: "Informasi Modul",
      type: "RATSAT",
      content: {
        title: "RAT / SAT - Strategi Pembelajaran",
        courseCode: "PDGK4105",
        courseName: "Strategi Pembelajaran di SD",
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
        // Memecah menjadi 3 grup agar sistem mendeteksi ada 3 pertanyaan wajib pengerjaan berurutan
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
        title: "Materi Strategi Kontemporer",
        subtitle: "Inovasi dan Kreativitas Pembelajaran",
        sections: [
          {
            letter: "A",
            title: "Hakikat Strategi Kontemporer",
            description: "Pendekatan pembelajaran yang menyesuaikan dangan perkembangan zaman.",
            points: [
              {
                label: "Prinsip Utama",
                text: "Berpusat pada siswa (Student Centered Learning), kolaboratif, dan memanfaatkan teknologi."
              }
            ],
            examples: [
              "Penggunaan aplikasi interaktif dalam menjelaskan siklus air."
            ]
          }
        ],
        evaluationQuestion: "Dari materi strategi kontemporer ini, strategi mana yang paling mungkin Anda terapkan di kelas esok hari?",
        minWords: 10
      }
    }
  ]
};
