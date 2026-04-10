import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://postgres:sb_secret_g7DAi-3P9eGzrZSvhhJeAQ_I0BYxD2X@db.qlxjbwuaxgbdooyupvnx.supabase.co:5432/postgres'
});

async function insertContent() {
  const content = [
    {
      module_num: 1,
      section_title: 'KONSEP DASAR BIMBINGAN DAN KONSELING DI SEKOLAH DASAR',
      sub_title: 'Kegiatan Belajar 1: Hakikat Bimbingan dan Konseling',
      content_type: 'materi',
      page_num: 4,
      body_text: `Sebagai bagian dari pekerjaan profesional, konseling memiliki banyak aspek yang signifikan. Beberapa faktor mendorong pengembangan konseling di Indonesia, termasuk: (1) Faktor internal individu, terutama selama periode perkembangan yang penting, seperti masa remaja, yang penuh dengan perubahan dan rentan terhadap berbagai pengaruh dari dalam maupun luar diri; (2) Faktor eksternal individu, seperti era globalisasi, yang ditandai oleh peningkatan teknologi, yang memiliki efek baik atau buruk. Dampak ini sangat beragam dan memengaruhi berbagai aspek kehidupan, sehingga sangat penting untuk dapat menyesuaikan diri dengan perubahan (Masdudi, 2015).\n\nLebih lanjut, Pietroiesa et al. (1980) mengidentifikasi beberapa karakteristik konseling profesional, antara lain sebagai berikut:\n1. Konseling adalah sebuah relasi profesional yang dijalin oleh seorang konselor yang telah terlatih dalam bidangnya.\n2. Dalam relasi profesional tersebut, konseli memperoleh pengetahuan tentang cara membuat keputusan, menyelesaikan masalah, dan mengadopsi sikap atau perilaku baru.\n3. Hubungan yang profesional tersebut terbentuk atas kesepakatan sukarela antara konseli dan konselor.\n\nMenurut American School Counselor Association (ASCA), konseling adalah pertemuan tatap muka yang rahasia di mana konselor menerima dan memberi kesempatan kepada konseli, sementara mereka menggunakan pengetahuan dan kemampuan mereka untuk membantu konseli mengatasi masalahnya (Yusuf & Nurihsan, 2019). Menurut Shertzer (2007) konseling adalah proses yang terjadi dalam hubungan antara seseorang yang menghadapi masalah yang sulit diatasi dan seorang profesional yang telah dilatih serta memiliki pengalaman untuk membantu konseli menyelesaikan masalahnya.`
    },
    {
        module_num: 1,
        section_title: 'KONSEP DASAR BIMBINGAN DAN KONSELING DI SEKOLAH DASAR',
        sub_title: 'Kegiatan Belajar 1: Hakikat Bimbingan dan Konseling',
        content_type: 'materi',
        page_num: 5,
        body_text: `Individu pribadi adalah mereka yang mampu mengelola dirinya sendiri, waktu, dan energi dengan bijaksana serta siap menghadapi bahaya ekonomi, psikologis, dan fisik. Mereka menunjukkan kemampuan untuk mengenali, mendefinisikan, dan menyelesaikan masalah. Selain itu, mereka menunjukkan konsistensi dalam peran-perannya yang berbeda. Mereka memiliki kemampuan berpikir kreatif dan unik. Selain itu, mereka memiliki kemampuan untuk mengontrol dorongan mereka dan memberikan reaksi yang tepat terhadap frustrasi, konflik, dan ketidakjelasan.\n\nBerdasarkan definisi tentang konseling sebelumnya, dapat disimpulkan bahwa konseling adalah suatu usaha langsung untuk membantu individu atau konseli mengambil tanggung jawab atas berbagai masalah atau situasi tertentu. Berbagai definisi tentang bimbingan dan konseling yang telah diberikan oleh para pakar sebelumnya menunjukkan bahwa bimbingan dan konseling melibatkan pemberian bantuan secara berkelanjutan dan terstruktur kepada individu. Proses ini dilakukan oleh seorang profesional yang telah menjalani pelatihan khusus, dengan tujuan membantu individu memahami diri mereka sendiri dan lingkungan sekitarnya, serta membantu mereka mengarahkan dan menyesuaikan diri dengan lingkungan tersebut untuk mengoptimalkan potensi mereka, baik untuk kepentingan pribadi maupun masyarakat.\n\nBimbingan dan konseling di lingkup pendidikan sangatlah penting karena dengan adanya layanan tersebut peserta didik dapat terfasilitasi dengan baik untuk mengembangkan potensi yang dimilikinya. Tidak hanya itu, dengan layanan tersebut siswa akan merasa terbantu dalam penyelesaian masalah yang sedang darinya alami atau rasakan. Keefektifan dalam pelaksanaan layanan juga dapat menunjang peserta didik untuk meningkatkan kualitas hidup mereka, karena permasalahan seperti masalah emosional, perilaku yang mengganggu, sosial dalam hal pertemanan atau hubungan dengan lingkungan dan keluarga juga dapat terfasilitasi dengan baik.\n\nSebagai konselor atau guru pembimbing, kita harus memiliki kompetensi yang mumpuni karena dengan kompetensi yang kita miliki, kita dapat membantu peserta didik dengan optimal, misalnya dalam hal pemahaman yang mendalam terhadap permasalahan yang dialami peserta didik agar dapat memberikan bantuan yang sesuai. Konselor harus dapat menjadi teman yang baik bagi konselinya, agar konseli tercipta rasa percaya dan aman dengan adanya proses interaksi yang baik. Dalam kata lain, dengan adanya layanan bimbingan dan konseling bisa menjadi alat untuk menyejahterakan peserta didik tanpa memandang latar belakang yang beragam.`
    }
  ];

  try {
    for (const item of content) {
      await pool.query(
        'INSERT INTO module_content (module_num, section_title, sub_title, content_type, body_text, page_num) VALUES ($1, $2, $3, $4, $5, $6)',
        [item.module_num, item.section_title, item.sub_title, item.content_type, item.body_text, item.page_num]
      );
    }
    console.log('Successfully inserted content for pages 4 and 5.');
  } catch (err) {
    console.error('Error inserting content:', err);
  } finally {
    await pool.end();
  }
}

insertContent();
