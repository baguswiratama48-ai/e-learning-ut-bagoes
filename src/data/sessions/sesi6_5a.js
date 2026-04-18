export const Sesi6_5A = {
  id: "5A_S6",
  meetingId: "6",
  classIds: ["4"],
  courseCode: "SPGK4410",
  courseName: "Strategi Pembelajaran",
  sections: [
    {
      name: "Informasi Modul",
      label: "RAT/SAT",
      type: "RATSATV2",
      tutorLabel: "RAT/SAT",
      content: {
        title: "Strategi Pembelajaran - Sesi 6",
        capaian: ["Capaian pembelajaran belum diisi."],
        pokokBahasan: [{ title: "Materi Sesi 6", subs: ["Sub-materi belum diisi"] }],
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
      content: { title: "Materi Sesi 6", sections: [{ title: "Judul Materi", points: [{ label: "Pengantar", text: "Konten materi belum diisi." }] }] }
    },
    {
      name: "Video Pembelajaran",
      type: "VideoEvalV2",
      content: { videoId: "", title: "Video Pembelajaran Sesi 6", evaluationText: "Berikan ulasan video di sini." }
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
      content: { title: "Forum Diskusi / LKM Sesi 6", sections: [{ title: "Instruksi LKM", points: [{ label: "Tugas", text: "Panduan diskusi belum diisi." }] }] }
    },
    {
      name: "Kuis dan Latihan",
      required: true,
      type: "Interactive",
      tutorLabel: "Quiz",
      content: { videoId: "", title: "Quiz / Latihan Sesi 6", evaluationText: "Tuliskan hasil refleksi kuis Anda." }
    },
    {
      name: "Refleksi",
      required: true,
      type: "Interactive",
      content: { title: "Refleksi Sesi 6", sections: [{ title: "Refleksi Diri", points: [{ label: "Umpan Balik", text: "Refleksi belum diisi." }] }] }
    },
    {
      name: "Rangkuman",
      required: true,
      type: "Interactive",
      content: { title: "Rangkuman Sesi 6", sections: [{ title: "Poin Utama", points: [{ label: "Kesimpulan", text: "Rangkuman belum diisi." }] }] }
    }
  ]
};
