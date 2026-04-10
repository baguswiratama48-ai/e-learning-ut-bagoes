import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch5() {
  const content = [
    {
      module_num: 1,
      section_title: 'D. PRINSIP-PRINSIP BIMBINGAN DAN KONSELING (Lanjutan)',
      sub_title: 'Kegiatan Belajar 2',
      content_type: 'materi',
      page_num: 18,
      body_text: `5. Dalam bimbingan, pengambilan keputusan adalah hal yang penting. Bimbingan bertujuan untuk membantu individu dalam pengambilan keputusan. Bimbingan memberikan mereka informasi dan juga nasihat yang penting dalam membuat keputusan, karena dengan bimbingan membantu individu untuk mempertimbangkan, menyesuaikan, dan menyempurnakan pengambilan keputusan mereka.\n6. Bimbingan terjadi di berbagai aspek kehidupan. Layanan bimbingan terjadi dalam lingkungan pendidikan, keluarga, industri, lembaga pemerintah/swasta, dan masyarakat. Bidang layanan bimbingan tersebut meliputi aspek pribadi, sosial, pendidikan, dan karier.\n\nPrinsip-prinsip bimbingan adalah panduan dalam memberikan layanan (Nasution & Abdillah, 2019). Prinsip-prinsip tersebut meliputi berikut ini.\n1. Prinsip-prinsip terkait dengan sasaran layanan.\n   a. Bimbingan dan konseling memberikan pelayanan kepada semua orang tanpa memandang faktor-faktor seperti usia, jenis kelamin, etnis, agama, dan status sosial ekonomi.\n   b. Bimbingan dan konseling mengakui keunikan serta perubahan pribadi dan perilaku setiap individu.\n   c. Layanan bimbingan dan konseling sepenuhnya memperhatikan tahap dan berbagai aspek perkembangan individu.\n   d. Fokus utama dalam bimbingan dan konseling adalah pada keberagaman individu yang menjadi landasan utama dari pemberian layanan.\n\n2. Prinsip-prinsip terkait dengan permasalahan individu.\n   a. Bimbingan dan konseling memperhatikan bagaimana kondisi mental dan fisik seseorang memengaruhi penyesuaian dirinya di berbagai lingkungan, serta bagaimana lingkungan memengaruhi kondisi mental dan fisik seseorang.\n   b. Ketimpangan sosial, ekonomi, dan budaya menjadi fokus utama dalam pelayanan bimbingan karena hal-hal ini bisa menjadi pemicu masalah pada individu.\n\n3. Prinsip-prinsip terkait dengan program layanan.\n   a. Bimbingan dan konseling merupakan bagian penting dari pendidikan dan perkembangan seseorang, sehingga program bimbingan harus diintegrasikan dan disinkronkan dengan program pendidikan.\n   b. Program bimbingan dan konseling harus bersifat adaptif dan disesuaikan dengan kebutuhan individu, tuntutan masyarakat, dan kondisi institusi.\n   c. Program bimbingan dan konseling harus dirancang secara berkelanjutan mulai dari tingkat pendidikan dasar hingga tingkat pendidikan tinggi.\n   d. Konten dan implementasi program bimbingan dan konseling perlu dievaluasi secara berkala dan terstruktur.`
    },
    {
      module_num: 1,
      section_title: 'D. PRINSIP-PRINSIP BIMBINGAN DAN KONSELING (Lanjutan)',
      sub_title: 'Kegiatan Belajar 2',
      content_type: 'materi',
      page_num: 19,
      body_text: `4. Prinsip-prinsip terkait dengan pelaksanaan layanan.\n   a. Tujuan dari bimbingan dan konseling adalah untuk membantu individu agar dapat mengambil peran dalam mengatasi masalah mereka sendiri.\n   b. Keputusan yang diambil oleh individu dalam bimbingan dan konseling harus berasal dari keinginan pribadi mereka sendiri, dan bukan karena tekanan dari pembimbing atau pihak lain.\n   c. Penanganan masalah individu dilakukan oleh para profesional yang memiliki keahlian dalam bidang yang relevan dengan masalah yang dihadapi.\n   d. Kerja sama antara pembimbing, guru, dan orang tua memiliki peranan yang sangat penting dalam menentukan hasil dari layanan bimbingan.\n   e. Pengembangan program layanan bimbingan dan konseling dilakukan dengan memanfaatkan hasil evaluasi dan penilaian individu yang terlihat selama proses layanan dan dalam program itu sendiri.\n\nPeters & Farwell (dalam Yusuf & Nurihsan 2019) merangkum 18 prinsip khusus dalam bimbingan di sekolah antara lain, sebagai berikut.\n1. Layanan bimbingan disediakan untuk semua peserta didik tanpa pengecualian.\n2. Tujuan dari bimbingan adalah membantu peserta didik mencapai kematangan.\n3. Bimbingan dianggap sebagai proses bantuan yang berkelanjutan dan terintegrasi bagi peserta didik.\n4. Pentingnya bimbingan dalam mengoptimalkan pengembangan potensi peserta didik.\n5. Peran bersama guru dalam proses bimbingan diakui.\n6. Konselor memiliki peran utama dalam proses bimbingan.\n7. Dukungan dari administrator sebagai mitra untuk kelancaran proses bimbingan diakui.\n8. Tanggung jawab bimbingan dalam meningkatkan kesadaran peserta didik terhadap lingkungan dan pemahamannya terhadapnya.\n9. Perlunya program bimbingan yang terstruktur dan melibatkan administrator, guru, dan konselor dalam menerapkan konsep bimbingan.\n10. Bimbingan perkembangan membantu peserta didik mengenali, memahami, dan mengembangkan diri mereka sendiri.\n11. Orientasi yang jelas terhadap tujuan dalam bimbingan perkembangan diakui.\n12. Pembimbingan memberikan penekanan pada pengambilan keputusan dalam bimbingan perkembangan.\n13. Fokus bimbingan perkembangan adalah pada masa depan peserta didik.\n14. Evaluasi berkala dilakukan dalam bimbingan perkembangan untuk memantau perkembangan peserta didik sebagai individu yang utuh.\n15. Bimbingan perkembangan bertujuan untuk membantu perkembangan peserta didik secara langsung.`
    },
    {
      module_num: 1,
      section_title: 'D. PRINSIP-PRINSIP BIMBINGAN DAN KONSELING (Penutup)',
      sub_title: 'Kegiatan Belajar 2',
      content_type: 'materi',
      page_num: 20,
      body_text: `16. Bimbingan perkembangan berpusat pada individu dalam konteks perubahan sosial budaya yang terjadi.\n17. Fokus bimbingan perkembangan adalah pada pengembangan kekuatan individu.\n18. Bimbingan perkembangan memperhatikan proses memberikan dorongan kepada peserta didik.\n\nSejalan dengan prinsip-prinsip yang telah disebutkan di atas, Biasco (dalam Yusuf & Nurihsan, 2019) mencatat lima prinsip bimbingan antara lain, sebagai berikut.\n1. Bimbingan merupakan bagian integral dari program pendidikan di sekolah, yang dirancang untuk memberikan layanan kepada semua peserta didik tanpa membedakan antara yang memiliki potensi khusus atau menghadapi tantangan.\n2. Keberhasilan program bimbingan sangat bergantung pada kerjasama antara staf sekolah serta dukungan dari pihak luar, seperti orang tua atau profesional lainnya.\n3. Layanan bimbingan didasarkan pada keyakinan bahwa setiap individu memiliki potensi untuk berkembang melalui bantuan yang terencana dan terstruktur.\n4. Bimbingan menghormati hak setiap individu, termasuk anak-anak, untuk membuat keputusan mereka sendiri, yang membantu dalam pembentukan rasa tanggung jawab mereka.\n5. Bimbingan memusatkan perhatian pada pengembangan pribadi setiap peserta didik, mencakup aspek akademik, sosial, pribadi, dan karier.\n\nLandasan yang penting dalam pelaksanaan layanan bimbingan dan konseling salah satunya adalah prinsip-prinsip bimbingan dan konseling itu sendiri. Hal ini dikarenakan dengan adanya prinsip-prinsip tersebut dapat membantu peserta didik atau konseli untuk mengatasi masalah yang sedang dialaminya dan mencapai potensinya secara optimal. Prinsip kepercayaan yang ada dalam layanan, dapat diimplementasikan dengan terbangunnya hubungan yang kuat dan kokoh antara konselor dan konseli. Hal ini dapat memberikan rasa saling percaya dan aman di antara keduanya. Prinsip empati juga membantu konselor untuk memahami diri konseli dan juga merasakan pengalamannya dengan penuh pengertian dan kesabaran.\n\nDalam pelaksanaan layanan juga konselor harus dapat menjaga kerahasiaan konseli dari proses layanan berlangsung, agar konseli merasa aman untuk membagikan cerita atau permasalahannya tanpa takut hal tersebut akan menyebar. Konseli juga akan diberikan dorongan oleh konselor dalam menentukan keputusannya sendiri dengan penuh tanggung jawab. Semua hal di atas akan layanan bimbingan dan konseling lebih efektif dalam membantu konseli atau peserta didik.`
    },
    {
      module_num: 1,
      section_title: 'LATIHAN & RANGKUMAN KEGIATAN BELAJAR 2',
      sub_title: 'Prinsip-Prinsip Bimbingan dan Konseling',
      content_type: 'rangkuman',
      page_num: 21,
      body_text: `Untuk memperdalam pemahaman Anda mengenai materi di atas, kerjakanlah latihan berikut!\n1) Mengapa prinsip-prinsip bimbingan dan konseling diperlukan dalam lingkungan sekolah?\n2) Jelaskan prinsip-prinsip dasar yang menjadi fondasi bagi layanan bimbingan!\n3) Jelaskan pentingnya kerjasama antara berbagai pihak dalam pelaksanaan program bimbingan dan konseling di sekolah dasar!\n\nRangkuman:\nPrinsip-prinsip bimbingan dan konseling dianggap sebagai elemen penting dari pendidikan sekolah dan berperan sebagai fondasi untuk menyelenggarakan layanan bimbingan. Ide ini mengacu pada gabungan antara pengetahuan teoretis dan pengalaman praktis yang terarah, yang menjadi pedoman dalam mencapai tujuan yang diinginkan. Prinsip-prinsip ini bukan hanya menjadi panduan praktis, tetapi juga menjadi dasar bagi perancangan dan pelaksanaan program bimbingan.\n\nSelain itu, prinsip-prinsip dasar lainnya yang menjadi fondasi bagi layanan bimbingan menyoroti pentingnya pemberian bantuan yang terindividualisasi, pengakuan akan hak individu untuk mengambil keputusan sendiri, serta keberlangsungan layanan bimbingan dalam berbagai konteks kehidupan. Hal ini mencerminkan komitmen.`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 5 (Pages 18-21)');
  } catch (err) {
    console.error('Error in batch 5:', err);
  }
}

insertBatch5();
