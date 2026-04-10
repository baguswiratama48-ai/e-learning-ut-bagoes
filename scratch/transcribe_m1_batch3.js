import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch3() {
  const content = [
    {
      module_num: 1,
      section_title: 'C. FUNGSI BIMBINGAN DAN KONSELING (Penutup)',
      sub_title: 'Hakikat Bimbingan dan Konseling',
      content_type: 'materi',
      page_num: 11,
      body_text: `Bimbingan dan konseling memiliki tujuan dan fungsi yang utama, yaitu bertujuan untuk memberikan bantuan dalam hal pengumpulan data, penyampaian informasi dan petunjuk, serta memfasilitasi komunikasi antara siswa dan berbagai pihak yang terlibat lainnya. Tujuannya adalah untuk menjamin kelancaran dan keberhasilan proses pendidikan serta pencapaian target yang diharapkan dalam lingkungan sekolah yang bersangkutan. Tidak hanya itu, pencapaian kehidupan yang sejahtera juga dapat ditunjang dengan layanan bimbingan dan konseling. Hal tersebut karena peserta didik akan mampu lebih memahami kebutuhan dirinya sendiri dan perencanaan kehidupannya nanti. Dengan adanya layanan tersebut, peserta didik dapat mengatasi hambatan-hambatan yang akan menghambat proses pertumbuhan dan perkembangannya.\n\nKetika tujuan dan fungsi bimbingan dan konseling dapat terimplementasikan dengan baik dalam lingkungan pendidikan, maka konselor atau guru pembimbing dapat membantu peserta didik untuk mencapai kehidupan yang lebih baik. Hal tersebut akan terwujud dengan adanya hubungan yang baik, saling bekerja sama antara konselor dan peserta didik dalam mencapai sesuatu seperti perubahan yang positif dalam diri peserta didik atau pemahaman yang baik mengenai diri sendiri ataupun kebutuhan yang diperlukan untuk menunjang pencapaian yang diinginkan. Dalam menuju pencapaian yang diinginkan juga diperlukan pemahaman yang sama akan tujuan di antara konselor atau guru pembimbing dengan peserta didik. Agar tidak adanya perbedaan persepsi di kemudian hari yang dapat menghambat proses pencapaian tersebut.`
    },
    {
      module_num: 1,
      section_title: 'LATIHAN KEGIATAN BELAJAR 1',
      sub_title: 'Hakikat Bimbingan dan Konseling',
      content_type: 'soal_latihan',
      page_num: 12,
      body_text: `Untuk memperdalam pemahaman Anda mengenai materi di atas, kerjakanlah latihan berikut!\n\n1) Mengapa bantuan dalam bimbingan dan konseling harus disesuaikan dengan pengalaman, kebutuhan, masalah individu?\n2) Jelaskan bagaimana tujuan bimbingan dan konseling terkait dengan aspek akademik (belajar) dapat membantu peserta didik dalam menghadapi tantangan pendidikan dan masa depan mereka!\n3) Jelaskan pentingnya fungsi adaptasi dalam konteks layanan bimbingan dan konseling di sekolah dalam menyesuaikan program pendidikan dengan kebutuhan dan latar belakang peserta didik di sekolah dasar!\n\nPetunjuk Jawaban Latihan:\n1) Jelaskan terlebih dahulu konsep dasar bimbingan dan konseling. Kemudian, uraikan alasan mengapa setiap individu memiliki pengalaman, kebutuhan, dan masalah yang berbeda, sehingga pendekatan yang diberikan harus disesuaikan. Berikan pula contoh bagaimana bantuan yang tepat dapat memberikan manfaat bagi individu yang bersangkutan.\n2) Berikan penjelasan tentang tujuan utama bimbingan dan konseling dalam aspek akademik. Setelah itu, berikan gambaran bagaimana layanan ini dapat membantu peserta didik dalam mengatasi kesulitan belajar. Hubungkan juga dengan dampaknya terhadap masa depan mereka agar jawaban lebih komprehensif.\n3) Berikan paparan tentang konsep adaptasi dalam layanan bimbingan dan konseling. Selanjutnya, berikan contoh bagaimana layanan bimbingan yang fleksibel dapat membantu peserta didik dengan latar belakang yang berbeda. Akhiri dengan pembahasan mengenai dampak positif dari layanan yang mampu menyesuaikan program pendidikan dengan kebutuhan peserta didik di sekolah dasar.`
    },
    {
      module_num: 1,
      section_title: 'RANGKUMAN KEGIATAN BELAJAR 1',
      sub_title: 'Hakikat Bimbingan dan Konseling',
      content_type: 'rangkuman',
      page_num: 13,
      body_text: `Bimbingan adalah suatu proses di mana bantuan diberikan secara berkelanjutan dan terencana kepada individu untuk membantu mereka menghadapi masalah dengan tujuan membantu individu mencapai pemahaman diri, penerimaan diri, kemampuan untuk mengarahkan diri sendiri, dan merealisasikan potensi serta kemampuan mereka. Proses ini berlangsung secara berkesinambungan dan melibatkan pertolongan dalam pengembangan diri, penyelesaian masalah, atau pengambilan keputusan, dengan mempertimbangkan keunikan individu dan bertujuan untuk mencapai perkembangan optimal sesuai potensi individu tersebut. Sementara itu, konseling adalah interaksi antara dua individu di mana salah satunya mendapat dukungan untuk meningkatkan kemampuannya individu di mana salah satunya mendapat dukungan untuk meningkatkan kemampuannya secara optimal untuk kepentingan diri mereka sendiri dan masyarakat.\n\nTujuan utama dari bimbingan dan konseling adalah untuk membantu individu dalam memahami diri mereka sendiri serta lingkungan sekitar, baik secara fisik maupun sosial, sehingga mereka dapat menghadapi kehidupan dengan lebih baik. Melalui pemahaman ini, diharapkan siswa dapat mengidentifikasi potensi dan kelebihan mereka sendiri, sehingga mereka dapat menghadapi masa depan dengan keyakinan yang lebih besar. Selain itu, bimbingan dan konseling juga bertujuan untuk membantu siswa dalam merencanakan kegiatan akademik dan ekstrakurikuler mereka.\n\nBimbingan dan konseling memiliki fungsi yang meliputi berbagai aspek, mulai dari pemahaman dan pencegahan terhadap masalah yang mungkin timbul, hingga penyesuaian dan peningkatan kondisi individu. Melalui pelayanan ini, konselor memiliki tujuan membantu konseli dalam penyelesaian masalah yang mereka hadapi, memperbaiki pola pikir, perasaan, dan tindakan yang lebih sehat, serta memberikan arahan untuk mencapai pertumbuhan dan perkembangan optimal di semua aspek kehidupan mereka. Selain itu, fungsi adaptasi dan penyesuaian bertujuan untuk menyediakan lingkungan belajar yang kondusif serta membantu konseli dalam menyesuaikan diri secara dinamis dan konstruktif dengan lingkungannya. Dengan demikian, pelayanan bimbingan dan konseling dalam mendukung pembelajaran dan pengembangan peserta didik di sekolah agar mencapai potensi terbaik mereka dalam kehidupan dan karier.`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 3 (Pages 11-13)');
  } catch (err) {
    console.error('Error in batch 3:', err);
  }
}

insertBatch3();
