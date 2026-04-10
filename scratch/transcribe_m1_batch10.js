import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch10() {
  const content = [
    {
      module_num: 1,
      section_title: 'G. LAYANAN BIMBINGAN KELOMPOK',
      sub_title: 'Jenis-Jenis Layanan BK',
      content_type: 'materi',
      page_num: 36,
      body_text: `G. LAYANAN BIMBINGAN KELOMPOK\n\nLayanan bimbingan kelompok merupakan layanan yang diberikan kepada peserta didik secara individu maupun dalam kelompok untuk meningkatkan kekuatan dan kemandirian mereka (Prayitno, 1995). Lebih lanjut, Juntika Achmad dan Nurihsan (2005) juga menggambarkan jika layanan bimbingan kelompok memiliki tujuan untuk mencegah masalah atau kesulitan muncul pada konseli (peserta didik). Dalam proses layanan bimbingan kelompok, segala bentuk informasi disampaikan dalam kegiatan yang membahas berbagai isu terkait pendidikan, pekerjaan, aspek pribadi, dan masalah sosial.\n\nMenurut Halena (2005) layanan bimbingan kelompok bertujuan untuk meningkatkan kolektivitas dalam menyelesaikan segala bentuk permasalahan di dalam kelompok. Hal ini bertujuan untuk memperkuat hubungan yang terjalin di antara setiap anggota kelompok, meningkatkan keterampilan dalam komunikasi satu sama lain, memperdalam penangkapan dalam menghadapi berbagai situasi dan kondisi yang terjadi di lingkungan, serta mendorong pengembangan perilaku konkret demi memperoleh tujuan-tujuan yang diungkapkan di dalam kelompok.\n\nSementara menurut Bennet (dalam Romlah, 2001), beberapa tujuan layanan bimbingan kelompok meliputi berikut ini.\n1. Memberikan kesempatan pada peserta didik untuk belajar mengenai berbagai masalah pendidikan, pekerjaan, pribadi, dan sosial.\n2. Menyediakan layanan penyembuhan melalui kegiatan kelompok.\n3. Menggunakan pendekatan kelompok yang lebih ekonomis daripada bimbingan individual untuk melaksanakan layanan konseling secara lebih efektif.\n\nTujuan dari layanan bimbingan kelompok ini adalah untuk menghasilkan individu yang hidup secara harmonis, dinamis, produktif, kreatif, dan mampu menyesuaikan diri dengan lingkungannya dengan cara terbaik.`
    },
    {
      module_num: 1,
      section_title: 'H. LAYANAN KONSELING KELOMPOK',
      sub_title: 'Jenis-Jenis Layanan BK',
      content_type: 'materi',
      page_num: 37,
      body_text: `H. LAYANAN KONSELING KELOMPOK\n\nSalah satu jenis layanan bimbingan dan konseling adalah konseling kelompok. Bimbingan dan konseling kelompok termasuk dalam dua kelompok besar teknik bimbingan dan konseling: bimbingan dan konseling individual dan bimbingan dan konseling kelompok. Bimbingan dan konseling individual melibatkan komunikasi atau interaksi langsung antara seorang konselor dan seorang konseli, sementara bimbingan dan konseling kelompok menggunakan dinamika kelompok. Natawijaya (2009) menjelaskan bahwa meskipun sasaran bimbingan dan konseling kelompok adalah konseli secara individu, menggunakan kelompok sebagai konteks membantu proses pengembangan dan perbaikan konseli.\n\nKonseling kelompok merupakan bentuk pelayanan konseling di mana seorang konselor profesional berinteraksi dengan beberapa individu yang tergabung dalam kelompok kecil. Dalam konseling kelompok, terdapat dua aspek utama, yaitu aspek proses dan aspek pertemuan tatap muka. Aspek proses dalam konseling kelompok ditandai dengan keterlibatan lebih dari dua individu, sementara aspek pertemuan tatap muka melibatkan sejumlah individu yang memberikan dukungan psikologis satu sama lain (Winkel, 2007).\n\nKonseling kelompok memiliki komponen terapeutik yang berkaitan dengan interaksi kelompok dan membantu orang untuk lebih memahami diri mereka sendiri dan menemukan solusi untuk berbagai masalah yang mereka hadapi. Menurut Ohlsen (dalam Winkel, 2007), interaksi kelompok konseling mengandung banyak unsur terapeutik, yang akan efektif jika semua anggota kelompok:\n1. merasa diterima oleh anggota kelompok;\n2. menyadari harapan terhadap diri sendiri dan harapan dari anggota kelompok lainnya;\n3. berpartisipasi secara serius dalam proses kelompok;\n4. merasa nyaman untuk berbagi dan membuka diri dengan anggota kelompok lainnya;\n5. bertanggung jawab atas peran yang dimainkan dalam kelompok;\n6. siap untuk mengubah diri dan membantu anggota lain dalam proses yang sama;\n7. menganggap partisipasi dalam kelompok sebagai pengalaman yang berarti bagi diri sendiri;\n8. berkomunikasi dengan jujur dan memahami perasaan anggota lain;\n9. menerima umpan balik dari anggota lain untuk memahami kekuatan dan kelemahan diri sendiri;\n10. tidak puas dengan kondisi saat ini dan bersedia untuk berubah serta menghadapi perubahan dalam diri; dan\n11. mematuhi norma-norma praktis yang mengatur interaksi dalam kelompok.`
    },
    {
      module_num: 1,
      section_title: 'I. LAYANAN KONSULTASI & J. LAYANAN MEDIASI',
      sub_title: 'Jenis-Jenis Layanan BK',
      content_type: 'materi',
      page_num: 38,
      body_text: `I. LAYANAN KONSULTASI\n\nKonsultasi adalah proses di mana konselor, orang tua, administrator, dan konselor lainnya menerima bantuan teknis untuk menemukan dan mengatasi masalah yang menghambat kinerja siswa atau sekolah. Ini berbeda dengan konseling atau psikoterapi, yang melayani konseli secara langsung, tetapi memberikan bantuan kepada orang lain. Menurut Putra (2016) konsultasi adalah kegiatan di mana konselor atau guru bimbingan dan konseling berbagi pemahaman dan perhatian dengan guru mata pelajaran, orang tua, pimpinan satuan pendidikan, dan pihak lain yang relevan. Tujuan dari konsultasi adalah untuk mencapai persepsi yang sama dan mendapatkan bantuan yang diperlukan untuk mempercepat pelaksanaan program bimbingan dan konseling. Layanan konsultasi adalah komponen penting dari layanan bimbingan dan konseling, dan tujuan konsultasi sepenuhnya mendukung pencapaian tujuan bimbingan dan konseling. Setiap kegiatan, termasuk layanan konsultasi, memiliki tujuan yang ingin dicapai, menurut Nurihsan (2006). Tujuan dari layanan konsultasi meliputi berikut ini.\n1. Menyempurnakan lingkungan pembelajaran bagi siswa, orang tua, dan staf sekolah.\n2. Meningkatkan komunikasi dengan meningkatkan pertukaran informasi antara semua pihak terlibat.\n3. Menggalang kerja sama dari individu dengan peran dan fungsi yang beragam untuk meningkatkan lingkungan pembelajaran.\n4. Memperluas akses kepada layanan dari para profesional ahli.\n5. Mengembangkan sumber daya pendidikan dari guru dan staf administrasi.\n6. Memberikan dukungan kepada orang lain dalam memahami perilaku pembelajaran.\n7. Menciptakan lingkungan yang mencakup semua aspek positif dari lingkungan pembelajaran.\n8. Mendorong organisasi yang lebih mandiri.\n\nTujuan umum dari layanan konsultasi adalah membantu konseli (peserta didik) dalam mengatasi kondisi atau masalah yang dialami oleh pihak ketiga, yang memiliki hubungan yang dekat dengan konseli, sehingga konselor bertanggung jawab sebagian atas masalah tersebut. Tujuan khusus dari layanan konsultasi adalah memastikan bahwa konseli memiliki pengetahuan, pemahaman, dan keterampilan yang sesuai dengan situasi atau masalah yang dihadapi pihak ketiga.\n\nJ. LAYANAN MEDIASI\n\nMediasi adalah salah satu bentuk layanan konseling di mana seorang konselor bertindak sebagai mediator untuk membantu konseli menyelesaikan masalah atau konflik dengan pihak lain. Istilah "mediasi" berkaitan dengan konsep "media" yang berarti perantara, dan dalam literatur Islam, istilah yang serupa adalah "wasilah", yang juga`
    },
    {
      module_num: 1,
      section_title: 'LATIHAN KEGIATAN BELAJAR 4',
      sub_title: 'Jenis-Jenis Layanan BK',
      content_type: 'rangkuman',
      page_num: 39,
      body_text: `mencerminkan peran sebagai perantara. Penjelasan tersebut, memberikan interpretasi bahwa konsultasi sebagai proses yang menghubungkan atau menjadi perantara antara entitas yang sebelumnya terpisah.\n\nTohirin (2013) mengatakan bahwa tujuan umum layanan mediasi adalah untuk menciptakan kondisi hubungan positif dan mendukung di antara konseli atau pihak-pihak yang sedang dalam konflik. Konselor mengarahkan dan mengelola kondisi awal yang cenderung negatif dan konfrontatif di antara kedua belah pihak sehingga berubah menjadi kondisi yang diinginkan bersama. Menurut Prayitno & Erman (2015), tujuan khusus layanan mediasi adalah untuk mengubah kondisi awal menjadi kondisi baru dalam hubungan antara pihak-pihak yang terlibat dalam konflik.\n\nDengan adanya layanan bimbingan dan konseling dalam lingkup pendidikan merupakan hal yang sangat penting dalam mengatasi kesulitan yang konseli atau peserta didik alami atau rasakan, dapat membantu dalam mengembangkan potensi mereka dengan lebih optimal. Misalnya, bimbingan karier dapat menawarkan arahan dan wawasan tentang jalur karier yang sesuai dengan minat dan keahlian seseorang. Bimbingan akademik seperti diagnostik kesulitan belajar juga dapat membantu kesuksesan peserta didik di sekolah. Dalam lingkup keluarga, bimbingan orang tua juga dapat membantu orang tua dalam mendidik anak-anak mereka dengan cara yang efektif dan positif agar mendukung perkembangan anak secara optimal. Konseling keluarga dapat membantu keluarga yang mengalami konflik untuk menyelesaikan masalah mereka dengan cara yang konstruktif, memperkuat ikatan keluarga, dan meningkatkan komunikasi. Konseling juga dapat membantu orang mengatasi masalah emosional seperti kecemasan, depresi, atau trauma dari masa lalu. Mereka dapat merasa didukung dan diberdayakan untuk menghadapi tantangan hidup mereka dengan lebih baik, serta memperbaiki kesehatan mental dan emosional mereka.\n\nLatihan:\n1) Mengapa layanan orientasi penting dalam konteks bimbingan dan konseling?\n2) Jelaskan kontribusi layanan informasi dalam membantu peserta didik dalam membuat keputusan yang tepat terkait dengan kepentingan pribadi mereka!\n3) Jelaskan peran dan tujuan dari layanan pembelajaran dalam mendukung perkembangan peserta didik dalam proses belajar!`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 10 (Pages 36-39)');
  } catch (err) {
    console.error('Error in batch 10:', err);
  }
}

insertBatch10();
