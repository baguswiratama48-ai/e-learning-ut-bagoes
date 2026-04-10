import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch11() {
  const content = [
    {
      module_num: 1,
      section_title: 'LATIHAN & RANGKUMAN KEGIATAN BELAJAR 4',
      sub_title: 'Jenis-Jenis Layanan BK',
      content_type: 'rangkuman',
      page_num: 40,
      body_text: `Petunjuk Jawaban Latihan:\n1) Jelaskan terlebih dahulu apa yang dimaksud dengan layanan orientasi. Berikan alasan mengapa layanan ini penting bagi peserta didik, terutama dalam membantu mereka memahami lingkungan sekolah, aturan, serta berbagai peluang yang tersedia.\n2) Berikan penjawaban yang lengkap tentang bagaimana layanan ini membantu peserta didik dalam memperoleh data atau referensi yang akurat sebelum mengambil keputusan penting. Jelaskan juga jenis informasi yang biasanya diberikan dan bagaimana dampaknya terhadap perkembangan pribadi maupun akademik peserta didik.\n3) Saat membahas peran dan tujuan layanan pembelajaran, paparkan bagaimana layanan ini dirancang untuk membantu peserta didik dalam meningkatkan keterampilan belajar mereka. Kaitkan dengan dukungan yang diberikan dalam menghadapi tantangan akademik dan bagaimana hal ini berkontribusi terhadap perkembangan mereka secara keseluruhan.\n\nRangkuman:\nLayanan orientasi menyediakan pemahaman tentang situasi dan lingkungan sekolah, sementara layanan informasi memberikan pemahaman tentang diri sendiri dan aspek sosial. Layanan pembelajaran membantu dalam proses pembelajaran, sedangkan layanan penempatan menitikberatkan pada penempatan peserta didik. Layanan penguasaan konten bertujuan membantu pemahaman kompetensi yang berguna. Konseling individual dan kelompok membantu peserta didik dalam menyelesaikan masalah pribadi atau bersama, sedangkan konsultasi memberikan wawasan tentang kondisi sekolah. Layanan mediasi bertujuan untuk menyelesaikan konflik atau memperbaiki hubungan antara peserta didik.`
    },
    {
      module_num: 1,
      section_title: 'TES FORMATIF 4',
      sub_title: 'Materi: Jenis-Jenis Layanan BK',
      content_type: 'soal_latihan',
      page_num: 41,
      body_text: `Pilihlah satu jawaban yang paling tepat!\n\n1) Tujuan utama dari layanan orientasi adalah.... \nA. memberikan informasi tentang lingkungan sekolah\nB. membantu individu beradaptasi dengan lingkungan baru\nC. memberikan informasi tentang kehidupan sosial\nD. mengatasi masalah pribadi peserta didik\n\n2) Menurut penjelasan dalam teks, tujuan layanan informasi adalah.... \nA. memberikan informasi tentang kehidupan pribadi peserta didik\nB. membantu peserta didik memahami lingkungan baru\nC. menyelesaikan masalah dalam kondisi peserta didik\nD. memberikan informasi yang diperlukan untuk membuat keputusan\n\n3) Fungsi utama dari layanan pembelajaran adalah.... \nA. membantu peserta didik mengatasi hambatan belajar\nB. memberikan informasi tentang lingkungan sekolah\nC. menyelesaikan masalah dalam kondisi peserta didik\nD. meningkatkan kesadaran akan gaya hidup peserta didik\n\n4) Tujuan dari layanan penempatan dan penyaluran adalah.... \nA. membantu peserta didik memahami lingkungan baru\nB. mengatasi masalah pribadi didik secara individu\nC. mencegah ketidaksesuaian antara bakat individu dan lingkungan\nD. memberikan informasi yang diperlukan untuk membuat keputusan untuk mengembangkan potensi mereka\n\n5) Yang dimaksud dengan layanan penguasaan konten adalah.... \nA. memberikan informasi tentang lingkungan sekolah\nB. membantu peserta didik memahami kompetensi yang berguna\nC. mengatasi masalah pribadi didik secara individu\nD. memberikan informasi yang diperlukan untuk membuat keputusan\n\n6) Tujuan dari layanan konseling individual adalah.... \nA. memberikan informasi tentang lingkungan sekolah\nB. mengatasi masalah pribadi peserta didik secara individu\nC. membantu peserta didik memahami kompetensi yang berguna\nD. meningkatkan kesadaran akan gaya hidup peserta didik\n\n7) Tujuan utama dari layanan bimbingan kelompok adalah.... \nA. membantu peserta didik memahami lingkungan baru\nB. mengatasi masalah pribadi peserta didik secara individu\nC. membentuk kelompok yang lebih besar, kuat, dan mandiri\nD. memberikan informasi yang diperlukan untuk membuat keputusan\n\n8) Tujuan layanan konseling kelompok adalah.... \nA. memberikan informasi tentang lingkungan baru\nB. mengatasi masalah pribadi peserta didik secara individu\nC. menciptakan lingkungan belajar yang positif\nD. membantu konseli secara individu dengan bantuan kelompok`
    },
    {
      module_num: 1,
      section_title: 'TES FORMATIF 4 (Akhir)',
      sub_title: 'Materi: Jenis-Jenis Layanan BK',
      content_type: 'soal_latihan',
      page_num: 42,
      body_text: `9) Tujuan utama dari layanan konsultasi adalah.... \nA. memberikan informasi tentang lingkungan sekolah\nB. membantu peserta didik memahami lingkungan baru\nC. mengatasi masalah pribadi peserta didik secara individu\nD. membantu individu dan pihak lain untuk mengidentifikasi dan mengatasi masalah yang menghambat efektivitas didik atau sekolah\n\n10) Fungsi layanan mediasi dalam konteks konseling adalah.... \nA. membantu individu beradaptasi dengan lingkungan baru\nB. membantu konseli secara individu dengan bantuan kelompok\nC. menyelesaikan masalah pribadi peserta didik secara individu\nD. menjadi perantara dalam menyelesaikan konflik antara pihak-pihak yang terlibat\n\nCocokkanlah jawaban Anda dengan Kunci Jawaban Tes Formatif 4 yang terdapat di bagian akhir modul ini. Hitunglah jawaban yang benar. Kemudian, gunakan rumus berikut untuk mengetahui tingkat penguasaan Anda terhadap materi Kegiatan Belajar 4.\n\nRumus Tingkat Penguasaan = (Jumlah Jawaban yang Benar / Jumlah Soal) x 100\n\nArti tingkat penguasaan:\n- <70% : kurang\n- 70% - 79% : cukup\n- 80% - 89% : baik\n- 90% - 100% : baik sekali\n\nApabila mencapai tingkat penguasaan 80% atau lebih, Anda dapat meneruskan dengan modul selanjutnya. Bagus! Jika masih di bawah 80%, Anda harus mengulangi materi Kegiatan Belajar 4, terutama bagian yang belum dikuasai.`
    },
    {
      module_num: 1,
      section_title: 'KUNCI JAWABAN TES FORMATIF',
      sub_title: 'Modul 1',
      content_type: 'materi',
      page_num: 43,
      body_text: `Kunci Jawaban Tes Formatif\n\nTes Formatif 1:\n1) B\n2) C\n3) A\n4) B\n5) A\n6) B\n7) C\n8) C\n9) B\n10) B\n\nTes Formatif 2:\n1) B\n2) D\n3) B\n4) B\n5) D\n6) B\n7) D\n8) A\n9) D\n10) A\n\nTes Formatif 3:\n1) C\n2) D\n3) A\n4) D\n5) D\n6) A\n7) D\n8) B\n9) D\n10) C\n\nTes Formatif 4:\n1) B\n2) D\n3) A\n4) C\n5) B\n6) B\n7) C\n8) D\n9) D\n10) D`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 11 (Pages 40-43)');
  } catch (err) {
    console.error('Error in batch 11:', err);
  }
}

insertBatch11();
