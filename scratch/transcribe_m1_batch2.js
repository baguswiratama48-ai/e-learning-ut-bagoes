import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch2() {
  const content = [
    {
      module_num: 1,
      section_title: 'B. TUJUAN BIMBINGAN DAN KONSELING (Lanjutan)',
      sub_title: 'Hakikat Bimbingan dan Konseling',
      content_type: 'materi',
      page_num: 8,
      body_text: `   c. Mampu membentuk identitas karier dengan cara mengenali karakteristik pekerjaan, keterampilan yang dibutuhkan, lingkungan sosial dan psikologis di tempat kerja, peluang karier, dan kesejahteraan kerja.\n   d. Memiliki kemampuan untuk merencanakan masa depan secara matang, dengan merancang rencana karier yang logis untuk mencapai peran yang sesuai dengan minat, keterampilan, dan kondisi lingkungan sosial-ekonomi. Mampu membentuk pola-pola karier dengan mengarahkan diri pada bidang yang sesuai dengan minat dan aspirasi individu. Sebagai contoh, jika seseorang bermimpi menjadi seorang guru, maka dia harus berfokus pada kegiatan yang relevan dengan profesi pendidikan tersebut. Memiliki pemahaman diri (kemampuan dan minat) yang terkait dengan pekerjaan.\n\nBerikut tujuan bimbingan dan konseling dari sudut pandang peserta didik adalah agar mereka dapat melakukan hal-hal berikut ini.\n1. Mengembangkan potensi mereka seoptimal mungkin sesuai dengan bakat dan minat mereka, yang dapat memberikan manfaat yang signifikan dalam kehidupan mereka.\n2. Menghadapi tantangan dalam memahami diri sendiri bisa diatasi dengan berdiskusi bersama teman sebaya serta mencari informasi dari sumber yang dapat dipercaya.\n3. Mengatasi kesulitan dalam memahami lingkungan sekitar, termasuk lingkungan sekolah, keluarga, pekerjaan, serta aspek sosial, ekonomi, dan budaya, dapat melalui refleksi diri atas pengalaman yang dialami.\n4. Menghadapi kendala dalam mengenali dan menyelesaikan masalah bisa diatasi dengan membuka diri untuk mencari bantuan dan konsultasi.\n5. Melepaskan hambatan dalam mengekspresikan minat, bakat, dan kemampuan dalam bidang pendidikan dan karier.\n6. Memperoleh bantuan yang tepat dari pihak luar untuk menangani masalah yang tidak dapat ditangani di lingkungan sekolah (Purnomo & Kurdie, 2017).\n\nTujuan akhir dari proses bimbingan dan konseling adalah untuk membantu konseli dalam menghindari berbagai masalah, termasuk yang berkaitan dengan gangguan mental, sosial, atau spiritual, sehingga setiap individu dapat mencapai kesehatan mental yang optimal. Kesehatan mental yang baik tercermin dalam karakteristik seperti penerimaan, rasa syukur, ketabahan, rendah hati, ketaatan beragama, kesadaran moral, kesungguhan, kepercayaan, dan semangat dalam menghadapi tantangan. Sebaliknya, tanda-tanda kesehatan mental yang buruk dapat dikenali dari perilaku yang melanggar prinsip agama, keadilan, mencurigai Allah dan sesama, menolak kebenaran, serta mengikuti hawa nafsu. Kondisi mental yang tidak stabil, baik dari segi agama maupun psikologis, bukan hanya berpotensi merugikan diri sendiri tetapi juga berdampak negatif pada orang lain jika tidak ditangani dengan baik (Nasution & Abdillah, 2019).`
    },
    {
      module_num: 1,
      section_title: 'C. FUNGSI BIMBINGAN DAN KONSELING',
      sub_title: 'Hakikat Bimbingan dan Konseling',
      content_type: 'materi',
      page_num: 9,
      body_text: `Bimbingan dan konseling dibagi menjadi beberapa fungsi berdasarkan kegunaan dan manfaat pelayanan sebagai berikut.\n1. Pemahaman, untuk mendukung pihak terkait dalam memperoleh wawasan yang sesuai dengan kebutuhan perkembangan peserta didik, termasuk pemahaman mengenai individu peserta didik, lingkungan sekitar mereka, dan konteks yang lebih luas.\n2. Preventif, upaya konselor untuk mencegah kemungkinan timbulnya masalah dengan memberikan arahan kepada konseli tentang cara menghindari perilaku atau kegiatan yang berpotensi merugikan diri mereka. Pendekatan yang digunakan termasuk pelayanan orientasi, penyampaian informasi, serta bimbingan kelompok untuk memberi pemahaman mengenai risiko tertentu seperti penggunaan zat adiktif atau perilaku berisiko lainnya.\n3. Perbaikan, membantu peserta didik mengatasi dan menyelesaikan berbagai masalah yang mereka hadapi, dengan harapan bahwa melalui bimbingan dan konseling, masalah-masalah tersebut dapat diselesaikan atau diatasi.\n4. Pengembangan, lebih bersifat proaktif dengan konselor berupaya menciptakan lingkungan belajar yang mendukung perkembangan peserta didik. Ini melibatkan kerja sama antara konselor dan staf sekolah untuk merancang serta melaksanakan program bimbingan yang terstruktur dan berkelanjutan.\n5. Penyaluran dalam bimbingan dan konseling bertujuan untuk membantu konseli dalam memilih kegiatan ekstrakurikuler, jurusan atau program studi, serta menetapkan pilihan karier yang sesuai dengan minat, bakat, dan kepribadian mereka. Kolaborasi antara konselor dan tenaga pendidik lainnya menjadi kunci dalam menjalankan fungsi ini.`
    },
    {
      module_num: 1,
      section_title: 'C. FUNGSI BIMBINGAN DAN KONSELING (Lanjutan)',
      sub_title: 'Hakikat Bimbingan dan Konseling',
      content_type: 'materi',
      page_num: 10,
      body_text: `6. Adaptasi, membantu para pengajar dalam menyesuaikan program pendidikan dengan latar belakang, minat, kemampuan, dan kebutuhan peserta didik. Hal ini dilakukan dengan memanfaatkan informasi yang cukup mengenai peserta didik untuk membantu guru dalam menyusun materi pembelajaran dan memilih metode pengajaran yang tepat.\n7. Penyesuaian, membantu konseli dalam menyesuaikan diri secara dinamis dan konstruktif dengan diri mereka sendiri serta lingkungan sekitar.\n8. Pemulihan, membantu konseli memperbaiki pola pikir, perasaan, dan perilaku mereka agar menjadi lebih sehat dan produktif. Ini melibatkan intervensi konselor untuk membimbing konseli menuju tindakan yang lebih positif dan sesuai dengan norma.\n9. Fasilitasi, memberikan dukungan kepada konseli untuk mencapai pertumbuhan dan perkembangan yang optimal di segala aspek kehidupan mereka.\n10. Pemeliharaan, membantu konseli dalam mempertahankan kondisi yang kondusif dalam diri mereka sendiri. Ini dilakukan melalui program-program yang menarik dan rekreatif sesuai dengan minat konseli untuk menghindari penurunan produktivitas diri (Sukardi, 2008).`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 2 (Pages 8-10)');
  } catch (err) {
    console.error('Error in batch 2:', err);
  }
}

insertBatch2();
