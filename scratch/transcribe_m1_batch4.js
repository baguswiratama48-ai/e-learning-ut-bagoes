import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch4() {
  const content = [
    {
      module_num: 1,
      section_title: 'TES FORMATIF 1',
      sub_title: 'Materi: Hakikat Bimbingan dan Konseling',
      content_type: 'soal_latihan',
      page_num: 14,
      body_text: `Pilihlah satu jawaban yang paling tepat!\n\n1) Apa yang dimaksud dengan istilah "guidance"?\nA. Proses memberikan bantuan terencana kepada individu\nB. Proses mengarahkan dan memandu individu\nC. Pengertian formal bimbingan pada abad ke-20\nD. Konsep konseling yang berkembang sejak awal abad ke-20\n\n2) Siapa yang pertama kali mengemukakan konsep bimbingan secara formal pada awal abad ke-20?\nA. Djumhur dan Moh. Surya\nB. Sunaryo Kartadinata\nC. Frank Parsons\nD. Bimo Walgito\n\n3) Tujuan dari bimbingan adalah....\nA. membantu individu mencapai pemahaman diri dan penerimaan diri\nB. membuat individu menjadi konsisten dalam peran-perannya\nC. mengarahkan individu secara langsung tanpa mempertimbangkan keunikan masing-masing individu\nD. memaksimalkan kemampuan intelektual individu\n\n4) Yang dimaksud dengan konseling adalah....\nA. proses memberikan bantuan terencana kepada individu\nB. hubungan antara dua individu di mana salah satunya dibantu untuk meningkatkan kemampuannya dalam menyesuaikan diri\nC. proses mengarahkan dan memandu individu secara langsung\nD. pendekatan untuk mengelola diri sendiri, waktu, dan energi secara bijaksana\n\n5) Yang menjadi tujuan utama dari layanan bimbingan dan konseling adalah....\nA. memberikan bantuan kepada peserta didik agar mereka dapat menghadapi kehidupan dengan lebih baik\nB. meningkatkan nilai akademik peserta didik\nC. membuat peserta didik menjadi lebih kompetitif\nD. mengurangi tekanan sosial di kalangan peserta didik`
    },
    {
      module_num: 1,
      section_title: 'TES FORMATIF 1 (Lanjutan)',
      sub_title: 'Materi: Hakikat Bimbingan dan Konseling',
      content_type: 'soal_latihan',
      page_num: 15,
      body_text: `6) Tujuan bimbingan dan konseling yang terkait dengan aspek akademik adalah untuk...\nA. memberikan bantuan kepada peserta didik agar mereka dapat menghadapi kehidupan dengan lebih baik\nB. meningkatkan nilai akademik peserta didik\nC. membuat peserta didik menjadi lebih kompetitif\nD. mengurangi tekanan sosial di kalangan peserta didik\n\n7) Fungsi bimbingan dan konseling yang berupaya mencegah berbagai masalah yang mungkin timbul disebut sebagai fungsi....\nA. perbaikan\nB. pemahaman\nC. preventif\nD. adaptasi\n\n8) Yang menjadi tujuan akhir dari bimbingan dan konseling adalah....\nA. meningkatkan prestasi akademik peserta didik\nB. mengurangi tingkat stres peserta didik\nC. memastikan setiap individu memiliki kesehatan mental yang baik\nD. menciptakan lingkungan belajar yang kondusif\n\n9) Salah satu tujuan dari bimbingan dan konseling terkait dengan aspek pribadi-sosial adalah....\nA. memiliki keterampilan untuk menghadapi ujian\nB. mempunyai komitmen yang kuat dalam mengamalkan nilai keagamaan\nC. merencanakan kegiatan untuk menyelesaikan studi\nD. memiliki kemampuan berinteraksi sosial\n\n10) Fungsi bimbingan dan konseling yang bertujuan membantu konseli memperbaiki pola pikir, perasaan, dan tindakan mereka agar menjadi lebih sehat dan produktif disebut sebagai fungsi....\nA. preventif\nB. perbaikan\nC. penyesuaian\nD. fasilitasi`
    },
    {
      module_num: 1,
      section_title: 'KEGIATAN BELAJAR 2: Prinsip-Prinsip Bimbingan dan Konseling',
      sub_title: 'Prinsip Dasar',
      content_type: 'materi',
      page_num: 16,
      body_text: `Cocokkanlah jawaban Anda dengan Kunci Jawaban Tes Formatif 1 yang terdapat di bagian akhir modul ini. Hitunglah jawaban yang benar. Kemudian, gunakan rumus berikut untuk mengetahui tingkat penguasaan Anda terhadap materi Kegiatan Belajar 1.\n\nRumus Tingkat Penguasaan = (Jumlah Jawaban yang Benar / Jumlah Soal) x 100%\n\nArti tingkat penguasaan:\n- < 70% : Kurang\n- 70% - 79% : Cukup\n- 80% - 89% : Baik\n- 90% - 100% : Baik Sekali\n\nApabila mencapai tingkat penguasaan 80% atau lebih, Anda dapat meneruskan dengan Kegiatan Belajar 2. Bagus! Jika masih di bawah 80%, Anda harus mengulangi materi Kegiatan Belajar 1, terutama bagian yang belum dikuasai.`
    },
    {
      module_num: 1,
      section_title: 'D. PRINSIP-PRINSIP BIMBINGAN DAN KONSELING',
      sub_title: 'Kegiatan Belajar 2',
      content_type: 'materi',
      page_num: 17,
      body_text: `Prinsip berasal dari istilah "prisipra", yang merujuk pada awal atau permulaan yang mengarah pada munculnya hal-hal yang lainnya. Prinsip ini merupakan hasil dari penggabungan antara pengalaman praktis yang terarah dan pengetahuan teoritis, yang digunakan sebagai panduan dalam pelaksanaan suatu tujuan yang diinginkan (Halaen, 2002). Prinsip bimbingan dan konseling adalah konsep dasar yang merinci prinsip-prinsip berpikir yang menjadi pedoman atau aturan dalam pelaksanaan program layanan bimbingan. Selain itu, prinsip-prinsip ini dapat digunakan sebagai kerangka kerja dasar atau standar yang harus diikuti saat menjalankan program bimbingan dan konseling di sekolah. Menurut Prayitno (1997), prinsip-prinsip tersebut adalah hasil dari gabungan pemikiran teoretis dan pengalaman praktis yang diformulasikan menjadi panduan, serta menjadi dasar bagi pelaksanaan layanan tersebut.\n\nAda beberapa prinsip dasar yang dianggap sebagai dasar dari layanan bimbingan, baik di sekolah maupun di luar sekolah. Prinsip-prinsip ini berasal dari konsep filosofis tentang kemanusiaan. Prinsip-prinsip tersebut antara lain, sebagai berikut.\n1. Bimbingan ditujukan untuk semua orang. Menurut prinsip ini, bimbingan diberikan kepada semua siswa atau peserta didik, tidak peduli masalah mereka, usia, jenis kelamin, atau status sosial ekonomi mereka, baik anak-anak, remaja, atau dewasa. Dalam situasi ini, bimbingan berfokus pada pencegahan dan pengembangan daripada penyembuhan, dan memprioritaskan teknik kelompok daripada individu.\n2. Bimbingan bersifat individualisasi. Mengakui bahwa setiap individu memiliki keunikan yang berbeda, dan bimbingan bertujuan untuk membantu mereka mengembangkan potensi unik mereka. Prinsip ini menegaskan bahwa pelayanan bimbingan berpusat pada individu, meskipun kadang teknik kelompok juga diterapkan.\n3. Bimbingan menekankan aspek positif. Bimbingan menekankan kekuatan dan kesuksesan yang bertujuan memberikan motivasi, peluang, dan pandangan positif tentang diri sendiri.\n4. Bimbingan merupakan usaha bersama. Guru dan kepala sekolah juga ikut bertanggung jawab dalam proses bimbingan, karena tidak hanya tanggung jawab konselor saja.`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 4 (Pages 14-17)');
  } catch (err) {
    console.error('Error in batch 4:', err);
  }
}

insertBatch4();
