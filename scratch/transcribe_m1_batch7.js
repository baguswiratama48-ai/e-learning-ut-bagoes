import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch7() {
  const content = [
    {
      module_num: 1,
      section_title: 'D. PRINSIP-PRINSIP BIMBINGAN DAN KONSELING (Lanjutan)',
      sub_title: 'Kegiatan Belajar 2',
      content_type: 'materi',
      page_num: 26,
      body_text: `9. Kenormatifan mengindikasikan bahwa bimbingan dan konseling harus mematuhi aturan dan nilai-nilai yang berlaku, termasuk norma agama, tradisi budaya, peraturan hukum, pengetahuan ilmiah, dan kebiasaan sehari-hari. Hal tersebut berlaku untuk seluruh aspek konten dan pelaksanaan bimbingan serta konseling.\n10. Keahlian menekankan bahwa layanan harus diselenggarakan dengan metode yang terstruktur, teratur, dan menggunakan teknik serta instrumen yang sesuai. Oleh karena itu, konselor harus memiliki pelatihan yang memadai untuk memastikan efektivitas layanan yang diberikan.\n11. Alih tangan menunjukkan bahwa jika seorang konselor telah berusaha dengan sepenuh hati namun konseli masih belum mendapat bantuan yang memadai, konselor dapat merujuk konseli tersebut kepada petugas atau lembaga lain yang memiliki keahlian yang lebih tepat dalam menangani masalah tersebut.\n12. Tut wuri handayani menekankan pentingnya membina hubungan yang baik antara konselor dan konseli yang dibimbing, sehingga suasana yang mendukung tercipta dalam proses bimbingan dan konseling. Kenormatifan, bimbingan dan konseling harus sesuai dengan norma-norma yang berlaku, termasuk norma agama, adat, hukum, ilmu, dan kebiasaan sehari-hari. Asas ini berlaku untuk konten maupun proses pelaksanaan bimbingan dan konseling.\n\nSementara itu Yusuf & Nurihsan (2019) menyatakan bahwa keberhasilan dalam bimbingan dan konseling sangat bergantung pada penerapan asas-asas sebagai berikut.\n1. Kerahasiaan, mengharuskan untuk menjaga kerahasiaan semua informasi tentang konseli. Konselor memiliki tanggung jawab untuk memastikan bahwa semua data dan informasi tersebut tetap dirahasiakan.\n2. Sukarela, menunjukkan bahwa sangat penting bagi konseli untuk berpartisipasi dalam kegiatan atau layanan yang diperlukan. Kesukarelaan tersebut harus dibangun dan dikembangkan oleh konselor.\n3. Keterbukaan, mengharapkan agar konseli bersikap terbuka dan jujur saat memberikan informasi tentang diri mereka dan menerima saran untuk pengembangan diri mereka.\n4. Kegiatan, menunjukkan bahwa konseli harus aktif berpartisipasi dalam layanan bimbingan dan konselor perlu mendorong keterlibatan aktif konseli.\n5. Mandiri, untuk membantu konseli memiliki pemahaman yang mendalam tentang diri mereka sendiri, mampu mengambil keputusan, dan mengembangkan potensi mereka. Konselor bertanggung jawab untuk mendorong konsep kemandirian dalam layanan yang mereka berikan.\n6. Kini, mengharapkan fokus pada permasalahan yang sedang dihadapi konseli saat ini, bukan pada masa lalu atau masa depan. Layanan harus relevan dengan situasi sekarang.\n7. Dinamis, layanan harus berubah dan berkembang seiring dengan kebutuhan dan perkembangan konseli.`
    },
    {
      module_num: 1,
      section_title: 'D. PRINSIP-PRINSIP BIMBINGAN DAN KONSELING (Akhir)',
      sub_title: 'Kegiatan Belajar 2',
      content_type: 'materi',
      page_num: 27,
      body_text: `8. Terpadu, menyiratkan bahwa semua layanan harus saling mendukung dan terintegrasi. Kerja sama antara berbagai pihak yang terlibat harus ditingkatkan.\n9. Harmonis, semua layanan harus didasarkan pada nilai dan norma yang ada. Layanan harus membantu konseli untuk memahami, menghayati, dan menerapkan nilai dan norma tersebut.\n10. Ahli, mengharapkan agar diselenggarakan oleh profesional yang ahli dalam bidangnya.\n11. Alih Tangan Kasus, mengharapkan jika pihak yang menyelenggarakan layanan tidak mampu menangani masalah peserta didik dengan baik, maka kasus tersebut harus dialihkan kepada pihak yang lebih ahli.\n12. Tut wuri handayani, terciptanya lingkungan yang aman, memberikan teladan, memberikan dorongan, dan memberikan kesempatan kepada konseli untuk maju.\n\nAsas-asas bimbingan dan konseling merupakan fondasi yang sangat penting dalam proses pemberian layanan. Hal tersebut dikarenakan dengan adanya berbagai asas tersebut dapat membantu konseli atau peserta didik untuk mencapai potensinya dengan lebih optimal lagi. Dengan adanya rasa saling percaya dengan dibangunnya hubungan yang saling percaya, akan menciptakan lingkungan yang aman untuk konseli dalam meluapkan segala keresahan yang menggangu dirinya. Konselor harus mampu menciptakan ruang yang aman, dalam artian konseli atau peserta didik tidak takut untuk menceritakan semuanya. Konselor harus mampu menanamkan kepada konseli atau peserta didik, bahwa apa yang disampaikan mereka tidak akan dihakimi, dengan begitu dirinya tidak takut untuk menceritakan perasaan yang sedang dirinya rasakan.\n\nKonselor juga harus terlibat aktif dalam membantu dan memberikan dukungan kepada konseli atau peserta didik dalam bentuk menemani proses dan perjalanan mereka, pengarah yang baik dalam meningkatkan pemahaman yang lebih baik lagi pada diri konseli. Tidak lupa, perlunya akuntabilitas agar dapat membantu mempertahankan integritas dan profesionalisme dalam melaksanakan layanan bimbingan dan konseling dalam lingkup pendidikan, serta dapat memastikan konseli akan bertanggung jawab dengan tindakan dan keputusannya.\n\nLatihan:\n1) Mengapa asas "Kekinian" menjadi penting dalam bimbingan dan konseling?\n2) Jelaskan peran asas "Keterpaduan" dalam meningkatkan efektivitas layanan bimbingan dan konseling!\n3) Jelaskan pentingnya asas "Alih Tangan Kasus" dalam konteks penyelenggaraan bimbingan dan konseling di sekolah!`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 7 (Pages 26-27)');
  } catch (err) {
    console.error('Error in batch 7:', err);
  }
}

insertBatch7();
