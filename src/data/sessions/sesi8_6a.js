export const Sesi8_6A = {
  id: "6A_S8",
  meetingId: "8",
  classIds: ["3"],
  courseCode: "SPDA4401",
  courseName: "ABK",
  sections: [
    {
      name: "Informasi Modul",
      label: "RAT/SAT",
      type: "RATSATV2",
      tutorLabel: "RAT/SAT",
      content: {
        title: "ABK - Sesi 8",
        capaian: ["Capaian pembelajaran belum diisi."],
        pokokBahasan: [{ title: "Materi Sesi 8", subs: ["Sub-materi belum diisi"] }],
        evaluationQuestion: "Apa target Anda di sesi ini?"
      }
    },
    {
      name: "Pertanyaan Pemantik",
      required: true,
      type: "PemantikV2",
      content: { required: 6, groups: [["Placeholder Pertanyaan 1", "Placeholder Pertanyaan 2", "Placeholder Pertanyaan 3", "Placeholder Pertanyaan 4", "Placeholder Pertanyaan 5"]] }
    },
    {
      name: "Materi Pembelajaran",
      type: "MateriV2",
      content: { title: "Materi Sesi 8", sections: [{ title: "Judul Materi", points: [{ label: "Pengantar", text: "Konten materi belum diisi." }] }] }
    },
    {
      name: "Video Pembelajaran",
      type: "VideoEvalV2",
      content: { videoId: "", title: "Video Pembelajaran Sesi 8", evaluationText: "Berikan ulasan video di sini." }
    },
        {
      name: "Pembagian Kelompok",
      type: "GroupsV2",
    },
    {
      name: "Ayo Diskusi (LKPD)",
      required: true,
      type: "Interactive",
      tutorLabel: "LKM",
      content: { title: "Forum Diskusi / LKM Sesi 8", sections: [{ title: "Instruksi LKM", points: [{ label: "Tugas", text: "Panduan diskusi belum diisi." }] }] }
    },
    {
      name: "Kuis dan Latihan",
      required: true,
      type: "Interactive",
      tutorLabel: "Quiz",
      content: { videoId: "", title: "Quiz / Latihan Sesi 8", evaluationText: "Tuliskan hasil refleksi kuis Anda." }
    },
    {
      name: "Refleksi",
      required: true,
      type: "Interactive",
      content: { title: "Refleksi Sesi 8", sections: [{ title: "Refleksi Diri", points: [{ label: "Umpan Balik", text: "Refleksi belum diisi." }] }] }
    },
    {
      name: "Rangkuman",
      required: true,
      type: "Interactive",
      content: { title: "Rangkuman Sesi 8", sections: [{ title: "Poin Utama", points: [{ label: "Kesimpulan", text: "Rangkuman belum diisi." }] }] }
    }
  ]
};
