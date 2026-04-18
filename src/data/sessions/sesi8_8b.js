export const Sesi8_8B = {
  id: "8B_S8",
  meetingId: "8",
  classIds: ["1"],
  courseCode: "SPGK4307",
  courseName: "BK di SD",
  sections: [
    {
      name: "Informasi Modul",
      label: "RAT/SAT",
      type: "RATSATV2",
      tutorLabel: "RAT/SAT",
      content: {
        title: "BK di SD - Sesi 8",
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
      name: "Ayo Diskusi (LKPD)",
      type: "MateriV2",
      tutorLabel: "LKM",
      content: { title: "Forum Diskusi / LKM Sesi 8", sections: [{ title: "Instruksi LKM", points: [{ label: "Tugas", text: "Panduan diskusi belum diisi." }] }] }
    },
    {
      name: "Kuis dan Latihan",
      required: true,
      type: "VideoEvalV2",
      tutorLabel: "Quiz",
      content: { videoId: "", title: "Quiz / Latihan Sesi 8", evaluationText: "Tuliskan hasil refleksi kuis Anda." }
    },
    {
      name: "Rangkuman",
      required: true,
      type: "MateriV2",
      content: { title: "Rangkuman Sesi 8", sections: [{ title: "Poin Utama", points: [{ label: "Kesimpulan", text: "Rangkuman belum diisi." }] }] }
    },
    {
      name: "Refleksi",
      required: true,
      type: "MateriV2",
      content: { title: "Refleksi Sesi 8", sections: [{ title: "Refleksi Diri", points: [{ label: "Umpan Balik", text: "Refleksi belum diisi." }] }] }
    }
  ]
};
