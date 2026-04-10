import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch8() {
  const content = [
    {
      module_num: 1,
      section_title: 'LATIHAN & RANGKUMAN KEGIATAN BELAJAR 3',
      sub_title: 'Peran Guru dalam Bimbingan di SD',
      content_type: 'rangkuman',
      page_num: 28,
      body_text: `Petunjuk Jawaban Latihan:\n1) Untuk menjawab pertanyaan tentang asas "Kekinian" dalam bimbingan dan konseling, Anda dapat menjelaskan terlebih dahulu makna dari asas tersebut. Kemudian, uraikan mengapa pendekatan yang sesuai dengan perkembangan zaman penting dalam memberikan layanan bimbingan dan konseling yang efektif. Gunakan contoh konkret dari praktik bimbingan dan konseling di sekolah untuk memperjelas jawaban.\n2) Saat menjelaskan peran asas "Keterpaduan", mulailah dengan memahami konsep keterpaduan dalam layanan bimbingan dan konseling. Uraikan bagaimana kerja sama antara guru, orang tua, dan pihak lain dapat meningkatkan efektivitas layanan.\n3) Jabarkan pandangan Anda tentang kasus tersebut dalam konteks bimbingan dan konseling. Berikan alasan mengapa dalam beberapa kasus, guru BK perlu mengalihkan penanganan kepada pihak yang lebih kompeten, seperti psikolog atau tenaga profesional lainnya. Gunakan situasi yang umum terjadi di sekolah sebagai ilustrasi untuk menunjukkan pentingnya asas ini dalam mendukung kesejahteraan peserta didik.\n\nRangkuman:\nAsas-asas bimbingan dan konseling, seperti kerahasiaan, kesukarelaan, keterbukaan, dan kekinian, merupakan landasan utama yang mendukung efektivitas layanan tersebut. Kerahasiaan menekankan pentingnya menjaga kerahasiaan informasi peserta didik untuk membangun kepercayaan, sementara kesukarelaan dan keterbukaan menciptakan lingkungan yang mendukung bagi peserta didik untuk berbagi masalah mereka dengan guru pembimbing. Asas kekinian menegaskan perlunya menangani masalah saat ini dengan tepat dan relevan, sementara asas kemandirian mendorong peserta didik untuk menjadi mandiri dan tidak tergantung pada orang lain. Asas kegiatan menekankan pentingnya partisipasi aktif peserta didik dalam mencapai tujuan bimbingan, sementara asas kedinamisan mendorong perubahan positif dan inovasi dalam perilaku. Asas keterpaduan dan kenormatifan menekankan integrasi aspek-aspek kepribadian dan kepatuhan pada norma yang berlaku. Selain itu, asas keahlian dan alih tangan menegaskan pentingnya profesionalisme dalam layanan bimbingan dan kemampuan untuk mengalihkan kasus yang di luar kewenangan. Asas terakhir, tut wuri handayani, menekankan pentingnya menciptakan lingkungan yang aman dan mendukung bagi peserta didik.\n\nSementara itu, dalam pemikiran Yusuf & Nurihsan (2019) dan Purnomo & Kurdie (2017), penekanan pada asas-asas yang sama memberikan arahan yang serupa dalam praktik bimbingan dan konseling. Dalam kedua pandangan tersebut, kerahasiaan, kesukarelaan, keterbukaan, kekinian, kemandirian, dan kedinamisan tetap menjadi fokus utama. Demikian pula, asas keterpaduan, kenormatifan, keahlian, alih tangan, dan tut wuri handayani memiliki peran penting dalam memastikan layanan bimbingan dan konseling yang efektif. Penekanan pada aspek-aspek ini tidak hanya mencerminkan kebutuhan praktis dalam memberikan layanan yang berkualitas tetapi juga mencerminkan nilai-nilai etis dan profesionalisme yang mendasarinya. Keseluruhan, pemahaman dan penerapan asas-asas ini secara holistik dan terkoordinasi adalah kunci bagi kesuksesan dalam penyelenggaraan bimbingan dan konseling yang efektif.`
    },
    {
      module_num: 1,
      section_title: 'TES FORMATIF 3',
      sub_title: 'Materi: Peran Guru & Asas-Asas BK',
      content_type: 'soal_latihan',
      page_num: 29,
      body_text: `Pilihlah satu jawaban yang paling tepat!\n\n1) Asas kesukarelaan dalam bimbingan dan konseling mengimplikasikan.... \nA. keterbukaan individu dalam menerima masukan dari pihak luar\nB. kemandirian individu dalam menyelesaikan masalah\nC. kerelaan individu dalam mengungkapkan masalah kepada pembimbing\nD. keterlibatan individu dalam kegiatan bimbingan\n\n2) Yang menjadi fokus utama dalam asas keterbukaan dalam bimbingan dan konseling adalah.... \nA. membuka diri untuk menerima masukan dari pihak luar\nB. membangkitkan rasa mandiri pada individu yang dibimbing\nC. menerima bantuan secara sukarela dari pembimbing\nD. bersikap terbuka dan jujur dalam memecahkan masalah yang dihadapi\n\n3) Asas kekinian dalam bimbingan dan konseling menekankan pentingnya mengatasi masalah yang sedang dialami saat ini oleh individu. Yang tidak termasuk dalam aspek ini adalah.... \nA. menangani masalah masa lalu\nB. memberikan bantuan tanpa menunda-nunda\nC. menangani masalah masa depan\nD. mengatasi masalah yang relevan dengan situasi sekarang\n\n4) Tujuan dari asas kemandirian dalam bimbingan dan konseling adalah agar individu tidak tergantung pada.... \nA. pembimbing\nB. keluarga\nC. teman\nD. semua jawaban benar`
    },
    {
      module_num: 1,
      section_title: 'TES FORMATIF 3 (Lanjutan)',
      sub_title: 'Materi: Peran Guru & Asas-Asas BK',
      content_type: 'soal_latihan',
      page_num: 30,
      body_text: `5) Asas kedinamisan dalam bimbingan dan konseling menuntut adanya perubahan positif dalam perilaku individu. Yang tidak termasuk dalam penjelasan ini adalah.... \nA. melakukan inovasi dan pembaruan yang lebih baik\nB. menghindari melakukan hal-hal yang sama secara monoton\nC. mengarah pada kemajuan\nD. menekankan kegiatan bimbingan yang dilakukan\n\n6) Yang menjadi tujuan dari asas keterpaduan dalam bimbingan dan konseling adalah.... \nA. menciptakan keselarasan dalam perkembangan individu\nB. memadukan berbagai aspek kepribadian peserta didik\nC. menjaga kerahasiaan informasi\nD. memberikan bantuan tanpa menunda-nunda\n\n7) Asas kenormatifan dalam bimbingan dan konseling harus sesuai dengan norma-norma yang berlaku. Norma yang tidak disebutkan dalam penjelasan tersebut adalah norma.... \nA. agama\nB. hukum\nC. ilmu\nD. budaya\n\n8) Yang menjadi syarat utama dalam asas keahlian dalam bimbingan dan konseling adalah.... \nA. kegiatan yang teratur dan sistematis\nB. penggunaan teknik dan alat yang sesuai\nC. pengalihan konseli kepada petugas atau lembaga lain jika diperlukan\nD. pemahaman terhadap norma-norma yang berlaku\n\n9) Aspek yang menekankan pentingnya menjaga informasi peserta didik agar tidak terungkap kepada pihak lain adalah.... \nA. kesukarelaan\nB. keterbukaan\nC. kemandirian\nD. kerahasiaan`
    },
    {
      module_num: 1,
      section_title: 'TES FORMATIF 3 (Akhir)',
      sub_title: 'Materi: Peran Guru & Asas-Asas BK',
      content_type: 'soal_latihan',
      page_num: 31,
      body_text: `10) Asas tut wuri handayani dalam bimbingan dan konseling menekankan pentingnya menciptakan hubungan yang baik antara pembimbing dan yang dibimbing. Yang bukan merupakan ciri dari hubungan yang baik tersebut adalah.... \nA. lingkungan yang aman\nB. teladan yang diberikan\nC. dorongan untuk tetap bergantung pada pembimbing\nD. kesempatan untuk berkembang\n\nCocokkanlah jawaban Anda dengan Kunci Jawaban Tes Formatif 3 yang terdapat di bagian akhir modul ini. Hitunglah jawaban yang benar. Kemudian, gunakan rumus berikut untuk mengetahui tingkat penguasaan Anda terhadap materi Kegiatan Belajar 3.\n\nRumus Tingkat Penguasaan = (Jumlah Jawaban yang Benar / Jumlah Soal) x 100\n\nArti tingkat penguasaan:\n- <70% : kurang\n- 70% - 79% : cukup\n- 80% - 89% : baik\n- 90% - 100% : baik sekali\n\nApabila mencapai tingkat penguasaan 80% atau lebih, Anda dapat meneruskan dengan Kegiatan Belajar 4. Bagus! Jika masih di bawah 80%, Anda harus mengulangi materi Kegiatan Belajar 3, terutama bagian yang belum dikuasai.`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 8 (Pages 28-31)');
  } catch (err) {
    console.error('Error in batch 8:', err);
  }
}

insertBatch8();
