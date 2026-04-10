import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFseGpid3VheGdiZG9veXVwdm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjQ0MjksImV4cCI6MjA5MTIwMDQyOX0.BJ0o_dcq1128dhzv1eKhaG7UWvxUpfmfc45loGfWZHM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBatch12() {
  const content = [
    {
      module_num: 1,
      section_title: 'DAFTAR PUSTAKA',
      sub_title: 'Modul 1',
      content_type: 'materi',
      page_num: 44,
      body_text: `Daftar Pustaka\n\nAchmad, J., & Nurihsan, J. (2005). Layanan bimbingan dan konseling kelompok. PT Refika Aditama.\nAdams, J. F. (1965). Counseling and psychotherapy. Houghton Mifflin.\nAmerican Psychological Association. (2020). Publication manual of the American psychological association (7th ed.). Washington, DC: APA.\nDahlan, MD., dkk. (1986). Persepsi mahasiswa tentang peranan proses belajar-mengajar tatap muka berstruktur dan mandiri terhadap hasil belajar. Bandung: IKIP Bandung.\nDjumhur, I., & Surya, M. (1975). Pengantar dasar-dasar bimbingan dan penyuluhan. Gunung Agung.\nGunawan, Y. (1987). Pengantar bimbingan dan konseling. Gramedia Pustaka Utama.\nHalaen, H. (2002). Dasar-dasar bimbingan dan konseling. Pustaka Pelajar.\nHellen, A. (2005). Bimbingan dan konseling. Quantum Teaching.\nKartadinata, S. (1998). Bimbingan dan konseling di sekolah dan madrasah. Departemen Agama Republik Indonesia.\nMasdudi. (2015). Bimbingan dan konseling di sekolah dasar. Nurjati Press.\nMiller, F. W. (1978). Guidance: Principles and service. Toronto: Charles E. Merril Publishing a Bell & Howell.\nNasution, H. S. & Abdillah. (2019). Bimbingan konseling konsep, teori dan aplikasinya. Lembaga Peduli Pengembangan Pendidikan Indonesia (LPPPI).\nNasution, S., & Abdillah, A. (2019). Bimbingan dan konseling di sekolah dasar. Lembaga Peduli Pengembangan Pendidikan Indonesia (LPPPI).\nNatawidjaja, R. (1987). Pendekatan-pendekatan penyuluhan kelompok. Diponegro.`
    },
    {
      module_num: 1,
      section_title: 'DAFTAR PUSTAKA (Lanjutan)',
      sub_title: 'Modul 1',
      content_type: 'materi',
      page_num: 45,
      body_text: `Natawidjaya, R. (2009). Konseling kelompok: Teori dan praktik. Bandung: PT Refika Aditama.\nNurihsan, A. J. (2006). Bimbingan & konseling dalam berbagai latar kehidupan. PT. Refika Aditama.\nNurihsan, J. (2006). Layanan bimbingan dan konseling di sekolah. Bandung: PT Refika Aditama.\nOsipow, S.H, Walsh, W.B. & Tosi D.J. (1980). A survey of counseling methods. Homewood. Illionis: The Dorsey Press.\nPatterson, C.H. (1966). Theories of counseling and psychotherapy. New York: Harper & Row, Publisher.\nPietrofesa, J.J. et. al. (1980). Guidance an introduction. Rand McNally College Publishing Company.\nPrayitno & Erman. A. (2015). Dasar-dasar bimbingan dan konseling. Rineka Cipta.\nPrayitno. (1997). Pelayanan bimbingan dan konseling SD. Jakarta: PT. Ikrar.\nPrayitno. (2004). Layanan penempatan dan penyaluran. FKIP Universitas Negeri Padang.\nPrayitno. (2005). Konseling perorangan. Universitas Negeri Padang.\nPurnomo, E. B., & Kurdie, A. (2017). Bimbingan dan konseling di sekolah dasar. Kencana Prenada Media Group.\nRomlah, T. (2001). Teori dan praktek bimbingan kelompok. Universitas Negeri Malang.\nShertzer, B., & Stone, S. C. (1980). Fundamentals of counseling. Houghton Mifflin.\nSofyan S, Willis. (2007). Konseling individual teori dan praktek. Bandung: Alfabeta. Sukardi, Dewa Ketut.\nSukardi, Dewa Ketut (2008). Proses bimbingan dan konseling di sekolah. Jakarta: Rineka Cipta.\nSyamsu Yusuf, L. N., & Nurihsan, A. J. (2005). Landasan bimbingan dan konseling. Bandung: Rosdakarya.`
    },
    {
      module_num: 1,
      section_title: 'DAFTAR PUSTAKA & GLOSARIUM',
      sub_title: 'Modul 1',
      content_type: 'materi',
      page_num: 46,
      body_text: `Tohirin, Y. (2013). Bimbingan dan konseling di sekolah dasar. PT Indeks.\nWalgito, B. (2004). Bimbingan dan konseling: Suatu pendekatan psikologis. Pustaka Pelajar.\nWillis, S. S. (2007). Konseling individual teori dan praktek. CV Alfabeta.\nWinkel, W. S. (2007). Bimbingan dan konseling di sekolah. Gramedia Widiasarana Indonesia.\nYusuf, L., & Nurihsan, J. (2005). Dasar-dasar bimbingan dan konseling. PT Refika Aditama.\nYusuf, S. & Nurihsan, J. (2019). Landasan bimbingan & konseling. PT Remaja Rosdakarya.\n\nGlosarium:\nFluktuatif : berubah-ubah naik turun; tidak tetap.\nFrustrasi : kekecewaan dan kebingungan karena tidak dapat mencapai tujuan.\nIntegral : utuh; menyeluruh.\nKonfrontatif : bersifat menantang atau berlawanan.\nKonstruktif : membangun; bersifat membangun.\nMaturitas : kedewasaan; kematangan.\nNormatif : sesuai dengan norma atau aturan yang berlaku.\nPersonal : berkaitan dengan pribadi atau individu.\nProaktif : bertindak dengan mendahului; berinisiatif.\nTawakal : berserah diri kepada Allah dengan penuh kepercayaan.\nTerapeutik : berkaitan dengan penyembuhan atau pemulihan.\nUmpan balik : informasi yang diberikan kepada individu tentang perilakunya.\nWara' : menjaga diri dari perbuatan yang haram dan syubhat.`
    }
  ];

  try {
    const { data, error } = await supabase.from('module_content').insert(content);
    if (error) throw error;
    console.log('Successfully inserted batch 12 (Pages 44-46)');
  } catch (err) {
    console.error('Error in batch 12:', err);
  }
}

insertBatch12();
