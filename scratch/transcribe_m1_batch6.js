import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch6() {
  const content = [
    {
      module_num: 1,
      section_title: 'TES FORMATIF 2',
      sub_title: 'Materi: Prinsip-Prinsip Bimbingan dan Konseling',
      content_type: 'soal_latihan',
      page_num: 22,
      body_text: `Pilihlah satu jawaban yang paling tepat!\n\n1) Yang dimaksud dengan "prinsipra" adalah ....\nA. prinsip bimbingan dan konseling\nB. permulaan yang mengarah pada munculnya hal lain\nC. prinsip dasar dalam layanan bimbingan\nD. penggabungan antara pengetahuan teoritis dan pengalaman praktis\n\n2) Fungsi prinsip bimbingan dan konseling adalah....\nA. menjadi panduan dalam mencapai tujuan\nB. menggabungkan pengetahuan teoritis dan pengalaman praktis\nC. menjadi kerangka kerja praktis dalam layanan bimbingan\nD. semua jawaban benar\n\n3) Prinsip dasar bimbingan dan konseling bersifat ....\nA. filosofis\nB. kemanusiaan\nC. logis\nD. emosional\n\n4) Yang bukan merupakan prinsip dasar bimbingan dan konseling adalah ....\nA. bimbingan ditujukan bagi semua individu\nB. bimbingan menekankan aspek negatif\nC. bimbingan bersifat individualisasi\nD. bimbingan terjadi dalam berbagai konteks kehidupan\n\n5) Prinsip bimbingan yang menegaskan bahwa setiap individu memiliki potensi yang lebih besar untuk tumbuh melalui bantuan yang terstruktur dan terencana disebut prinsip ....\nA. bimbingan ditujukan bagi semua individu\nB. bimbingan bersifat individualisasi\nC. bimbingan menekankan aspek positif\nD. layanan bimbingan didasarkan pada keyakinan bahwa setiap individu memiliki potensi yang lebih besar untuk tumbuh melalui bantuan yang terstruktur dan terencana`
    },
    {
      module_num: 1,
      section_title: 'TES FORMATIF 2 (Lanjutan)',
      sub_title: 'Materi: Prinsip-Prinsip Bimbingan dan Konseling',
      content_type: 'soal_latihan',
      page_num: 23,
      body_text: `6) Prinsip bimbingan yang menekankan bahwa bimbingan berfokus pada masa depan peserta didik disebut prinsip ....\nA. bimbingan perkembangan memiliki orientasi yang jelas terhadap tujuan\nB. bimbingan perkembangan berfokus pada masa depan peserta didik\nC. bimbingan perkembangan berusaha membantu perkembangan peserta didik secara langsung\nD. bimbingan perkembangan difokuskan pada individu dalam konteks perubahan sosial budaya yang terjadi\n\n7) Prinsip-prinsip yang berkaitan dengan sasaran layanan bimbingan meliputi ....\nA. pembangunan potensi peserta didik\nB. pengambilan keputusan\nC. melayani semua individu tanpa memandang faktor-faktor tertentu\nD. semua jawaban benar\n\n8) Prinsip-prinsip yang berkaitan dengan permasalahan individu dalam layanan bimbingan membahas ....\nA. pengaruh kondisi mental dan fisik individu\nB. kesenjangan sosial, ekonomi, dan kebudayaan\nC. pembangunan potensi peserta didik\nD. pengambilan keputusan\n\n9) Prinsip-prinsip yang berkaitan dengan program layanan bimbingan menekankan ....\nA. penekanan pada pengambilan keputusan\nB. fleksibilitas program bimbingan\nC. kesesuaian program bimbingan dengan kebutuhan individu\nD. semua jawaban benar`
    },
    {
      module_num: 1,
      section_title: 'KEGIATAN BELAJAR 3: Peran Guru dalam Bimbingan dan Konseling di Sekolah Dasar',
      sub_title: 'Pengantar',
      content_type: 'materi',
      page_num: 24,
      body_text: `Cocokkanlah jawaban Anda dengan Kunci Jawaban Tes Formatif 2 yang terdapat di bagian akhir modul ini. Hitunglah jawaban yang benar. Kemudian, gunakan rumus berikut untuk mengetahui tingkat penguasaan Anda terhadap materi Kegiatan Belajar 2.\n\nRumus Tingkat Penguasaan = (Jumlah Jawaban yang Benar / Jumlah Soal) x 100%\n\nArti tingkat penguasaan:\n- < 70% : Kurang\n- 70% - 79% : Cukup\n- 80% - 89% : Baik\n- 90% - 100% : Baik Sekali\n\nApabila mencapai tingkat penguasaan 80% atau lebih, Anda dapat meneruskan dengan Kegiatan Belajar 3. Bagus! Jika masih di bawah 80%, Anda harus mengulangi materi Kegiatan Belajar 2, terutama bagian yang belum dikuasai.\n\nKEGIATAN BELAJAR 3: Peran Guru dalam Bimbingan dan Konseling di Sekolah Dasar\n\nE. PENGERTIAN GURU KELAS DI SEKOLAH DASAR\n\nGuru kelas di Sekolah Dasar (SD) memainkan peran yang sangat penting dan unik dalam sistem pendidikan dasar. Secara umum, guru kelas adalah pendidik profesional yang memiliki tanggung jawab utama untuk mengelola satu kelas tertentu dan mengajarkan sebagian besar mata pelajaran kepada siswa di kelas tersebut. Berdasarkan Peraturan Menteri Pendidikan Nasional Nomor 16 Tahun 2007 tentang Standar Kualifikasi Akademik dan Kompetensi Guru, guru kelas SD dituntut memiliki kompetensi pedagogik, kepribadian, sosial, dan profesional yang terintegrasi.`
    },
    {
      module_num: 1,
      section_title: 'E. PENGERTIAN GURU KELAS DI SEKOLAH DASAR (Lanjutan)',
      sub_title: 'Peran Guru',
      content_type: 'materi',
      page_num: 25,
      body_text: `Tugas rutin guru kelas di Sekolah Dasar (SD) meliputi perencanaan pembelajaran, pelaksanaan pengajaran, penilaian hasil belajar, serta memberikan bimbingan dan pelatihan bagi siswa. Di samping tugas-tugas tersebut, guru kelas juga berfungsi sebagai penghubung antara sekolah, siswa, dan orang tua. Karena intensitas interaksi yang tinggi antara guru kelas dan siswanya, guru kelas seringkali menjadi figur yang paling memahami karakteristik, kebutuhan, dan permasalahan yang dihadapi oleh masing-masing siswa di kelasnya. Oleh karena itu, peran guru kelas dalam layanan bimbingan dan konseling di SD menjadi sangat strategis dan tidak dapat dipisahkan dari proses belajar mengajar sehari-hari (Ahmadi, 2013).`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 6 (Pages 22-25)');
  } catch (err) {
    console.error('Error in batch 6:', err);
  }
}

insertBatch6();
