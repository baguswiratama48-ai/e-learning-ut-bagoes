export const Sesi2_Strategi = {
  id: "5a-sesi2",
  classIds: ["4"], 
  meetingId: "2",
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
            description: "Landasan psikologis dalam proses pembelajaran merupakan fondasi absolut bagi seorang pendidik. Pemahaman yang komprehensif terhadap teori-teori belajar memastikan bahwa setiap intervensi pendagogik tidak dilakukan secara sembarangan, melainkan berpijak pada prinsip ilmiah tentang bagaimana manusia mengonstruksi pengetahuannya. Dalam khazanah ilmu pendidikan, terdapat ragam perspektif teoretis yang saling melengkapi. Pertama, Teori Disiplin Mental yang memandang kelulusan kognitif individu ibarat otot yang harus terus dilatih melalui hafalan, ingatan, dan penalaran intensif. Meski terkesan klasik, teori ini berperan kuat dalam membentuk memori jangka panjang. Kedua, Teori Behaviorisme yang dipelopori oleh tokoh-tokoh besar pendidik, menekankan pada perubahan perilaku lahiriah melalui skema stimulus-respons. Menurut pandangan ini, lingkungan seperti keluarga, budaya, dan sekolah menjadi determinan utama karakter seorang anak. Siswa diibaratkan seperti kertas kosong yang siap dibentuk melalui sistem penghargaan (reward) dan penguatan (reinforcement). Ketiga, Teori Insight dan Gestalt yang melihat bahwa belajar adalah proses reorganisasi kognitif yang memicu pemahaman seketika. Manusia tidak bereaksi secara mekanis, melainkan merespons keseluruhan konteks informasi. Keempat, Konstruktivisme yang menjadi tonggak pendidikan modern, di mana belajar dianggap sebagai proses aktif pembentukan makna. Siswa bukanlah wadah pasif yang menampung ceramah guru, melainkan arsitek intelektual yang membongkar-pasang informasi baru berdasarkan pengalaman autentik mereka di dunia nyata.",
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
            description: "Pembelajaran yang efektif adalah pembelajaran yang multidimensional, menyentuh berbagai aspek kapasitas humanis seorang siswa. Dalam menganalisis fenomena belajar, tokoh pendidikan merumuskan hierarki tipe belajar yang merepresentasikan evolusi kognitif manusia. Tahapan ini dimulai dari proses paling primitif seperti belajar isyarat (signal learning) yang bersifat instingtif, diikuti oleh stimulus-respons di mana anak mengaitkan suatu tindakan dengan konsekuensi tertentu. Hierarki kemudian berevolusi menuju kemampuan perangkaian motorik, asosiasi verbal yang memampukan anak berbahasa, hingga kemampuan tingkat tinggi seperti diskriminasi (membedakan konsep yang mirip), pembentukan konsep abstrak, pemahaman aturan hukum alam maupun sosial, hingga akhirnya bermuara pada kemampuan esensial yaitu pemecahan masalah (problem solving). Setiap guru dituntut mampu menyadari di anak tangga mana siswanya sedang berpijak saat mengajar di kelas. Di sisi lain, keberhasilan dari semua hierarki tersebut akan menelurkan taksonomi hasil belajar yang spesifik dan terukur secara akademis. Hasil belajar ini tidak sekadar bertumpu pada nilai raport di atas kertas, melainkan manifestasi nyata dalam bentuk Keterampilan Kognitif (berpikir logis, analitis, dan rasional), Keterampilan Psikomotor (penguasaan gerak jasmani, koordinasi fisik, dan eksekusi perseptual yang kompleks), Keterampilan Interaktif (kecerdasan bersosialisasi, kerja sama tim, komunikasi efektif, serta kepemimpinan), serta Keterampilan Reaktif (pengendalian diri, regulasi emosi, pembentukan sikap arif, kebijaksanaan, dan empati terdalam terhadap sesama manusia).",
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
            description: "Menyelami karakteristik perkembangan anak usia Sekolah Dasar (SD) berarti berusaha memahami transisi paling dramatis dalam rentang masa kanak-kanak manusia. Siswa SD bukanlah orang dewasa dalam skala mini; mereka secara mutlak merupakan individu-individu unik dengan pola pertumbuhan dan perkembangan yang memiliki ritme, imajinasi, dan tantangannya sendiri. Secara kognitif, anak usia SD pada umumnya berada dalam fase transisi krusial dari Pra-Operasional menuju Operasional Konkret. Pada masa tersebut, kemampuan daya logika analitik anak mulai bangkit secara substansial, namun mereka masih sangat terikat pada benda-benda fisik, manipulasi langsung secara spasial, dan konteks visual yang sungguh nyata. Mereka pastinya akan kesulitan memproses konsep-konsep filosofis abstrak tanpa didampingi alat peraga atau eksperimen langsung. Di luar domain kemampuan otak (kognitif), perkembangan realitas sosial dan spektrum emosional anak SD juga mengalami lonjakan hebat. Pada siswa di kelompok kelas tinggi (kelas 4 sampai 6), para siswa mulai melepaskan diri dari dinding egosentrisme absolut. Validasi dari sahabat dan teman sekelas (peer group) perlahan menjadi jauh lebih berharga dibandingkan sekadar mematuhi instruksi kaku orang tua. Kondisi emosional ini menuntut kearifan guru untuk senantiasa meramu pembelajaran berbasis kolaborasi alih-alih kompetisi tegang. Memahami fase perkembangan inilah yang menciptakan ruh pedagogik sesungguhnya.",
            points: [
              {
                label: "Hasil Belajar Berpikir Kritis",
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
            description: "Memiliki pemahaman tradisional yang terus-menerus membelenggu kreativitas dunia pendidikan adalah gagasan sempit bahwa kecerdasan hanya sahih diukur melalui kemampuan berhitung matematika dan hafalan gramatika bahasa. Namun, revolusi pemikiran di era pembelajaraan modern berhasil meledakkan paradigma lapuk tersebut dengan menegaskan konsep esensial mengenai Kecerdasan Majemuk (Multiple Intelligences). Pendekatan ini meyakinkan kita bahwasanya, sungguh tidak ada anak yang sama sekali bodoh; karena setiap individu cilik dilahirkan membawa rancangan potensi kecerdasannya masing-masing yang menunggu ruang untuk mekar. Di ekosistem ruang kelas SD, ragam kecerdasan tersebut bermanifestasi dalam bermacam dimensi fundamental. Inteligensi Akademik menaungi Linguistik (vokalisasi kata, bercerita, dan merangkai diksi persuasi) bersamaan dengan area Logis-Matematis (kepiawaian mendedah pola, bilangan, dan presisi akurasi komputasi). Menyusul kemudian Inteligensi Seni dan Ruang, mencakup Spasial-Visual (mata arsitek melihat manipulasi bentuk maupun dimensi), kepekaan Musikal (daya dengar terhadap ritme dan harmonisasi semesta), serta sentuhan ajaib Fisik-Kinestetik (keahlian olahragawan atau gerak luwes penari balet). Melengkapi itu semua, fondasi Inteligensi Personal terbagi atas determinasi Intrapersonal (kekuatan menyelami emosi pribadi, bermeditasi, dan sadar kelamahan diri) serta pesona panggung Interpersonal (karakter kepemimpinan luhur, mediasi diplomasi, empati hangat, serta negosiator ulung). Semuanya harus diharmoniskan secara menyeluruh.",
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
        evaluationQuestion: "Setelah kalian mempelajari materi diatas, menurut mu mana tipe belajar dan hasil belajar yang bisa kalian terapkan di kelas?",
        minWords: 20
      }
    },
    {
      name: "Video Pembelajaran",
      type: "VideoEvalV2",
      content: {
        title: "Praktik Strategi Pembelajaran di SD",
        evaluationText: "Setelah menyimak video di atas, menurut Anda bagaimana strategi guru dalam video tersebut dapat meningkatkan keterlibatan siswa di kelas? Jelaskan analisis Anda!",
        videoId: "btcFxsfoeuU",
        minWords: 20
      }
    },
    {
      name: "Pembagian Kelompok",
      type: "Interactive",
      content: null
    },
    {
      name: "LKM",
      type: "Interactive",
      content: {
        type: "GROUP_DISCUSSION",
        missions: {
          "5": {
            title: "Belajar Kolaboratif (Collaborative Learning)",
            subtitle: "Tugas Diskusi Kelompok 5",
            icon: "diversity_1",
            description: "Menganalisis hakikat dan manfaat dari pola belajar kolaboratif dika ekosistem pembelajaran SD.",
            questions: [
               "Jelaskan menurut pendapat kelompok Anda, apa hakikat sebenarnya dari Belajar Kolaboratif?",
               "Sebutkan dan jelaskan minimal 3 manfaat nyata dari Belajar Kolaboratif bagi siswa SD."
            ]
          },
          "4": {
            title: "Belajar Quantum (Quantum Learning)",
            subtitle: "Tugas Diskusi Kelompok 4",
            icon: "wb_sunny",
            description: "Mendalami hakikat, prinsip, dan manfaat dari pendekatan Quantum Learning dika kelas.",
            questions: [
               "Bagaimana Hakikat Belajar Quantum dibedakan dangan model belajar konvensional?",
               "Uraikan Prinsip Utama Pembelajaran Quantum yang harus dikuasai guru.",
               "Apa saja Manfaat Belajar Quantum yang paling dirasakan oleh siswa?"
            ]
          },
          "3": {
            title: "Belajar Kooperatif (Cooperative Learning)",
            subtitle: "Tugas Diskusi Kelompok 3",
            icon: "groups_3",
            description: "Menganalisis hakikat dan prinsip utama yang mendasari keberhasilan Belajar Kooperatif.",
            questions: [
               "Jelaskan Hakikat Belajar Kooperatif dangan kalimat kelompok Anda sendiri.",
               "Sebutkan 5 Prinsip Utama Belajar Kooperatif yang menjamin kerjasama tim yang sehat.",
               "Uraikan Manfaat Belajar Kooperatif dalam meningkatkan kecerdasan sosial siswa."
            ]
          },
          "2": {
            title: "Belajar Tematik & Batasan Kooperatif",
            subtitle: "Tugas Diskusi Kelompok 2",
            icon: "topic",
            description: "Mengevaluasi keterbatasan model kooperatif dan mendalami esensi Pembelajaran Tematik dika kurikulum SD.",
            questions: [
               "Apa saja Keterbatasan Pembelajaran Kooperatif yang sering ditemui di lapangan?",
               "Jelaskan Hakikat & Prinsip Belajar Tematik.",
               "Mengapa Pembelajaran Tematik sangan diperlukan di SD? Berikan 3 alasan kuat.",
               "Sebutkan Karakteristik dan Manfaat utama dari Pembelajaran Tematik."
            ]
          },
          "1": {
            title: "Rumpun Model Mengajar",
            subtitle: "Tugas Diskusi Kelompok 1",
            icon: "account_tree",
            description: "Melakukan klasifikasi dan identifikasi berbagai rumpun model mengajar beserta jumlahnya.",
            questions: [
               "Sebutkan 6 Model yang masuk dika Rumpun Model Sosial.",
               "Sebutkan 8 Model yang masuk dika Rumpun Model Pemrosesan Informasi.",
               "Sebutkan 2 Model yang masuk dika Rumpun Modal Personal.",
               "Sebutkan 3 Model yang masuk dika Dua Rumpun Model Sistem Perilaku."
            ]
          }
        }
      }
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
