function svgIcon(id, w, h, style) {
  w = w||16; h = h||16; style = style||'';
  return `<svg width="${w}" height="${h}" style="${style}"><use href="#ic-${id}"/></svg>`;
}
function starIcons(rating) {
  let html = '';
  for (let i=1;i<=5;i++) {
    if (i <= Math.round(rating)) html += `<svg width="13" height="13" style="fill:var(--amber);stroke:var(--amber)"><use href="#ic-star"/></svg>`;
    else html += `<svg width="13" height="13" style="stroke:var(--muted)"><use href="#ic-star-empty"/></svg>`;
  }
  return html;
}

const kategoriIcon = {
  furnitur: 'chair', elektronik: 'phone', buku: 'book',
  pakaian: 'tag', 'peralatan dapur': 'box', 'mainan anak': 'celebrate',
  lainnya: 'box'
};

const lokasiData = {
  'aceh': { label: 'Aceh', kabupaten: { 'Kota Banda Aceh': ['Kuta Alam','Baiturrahman','Ulee Kareng'], 'Kab. Aceh Besar': ['Kuta Baro','Darussalam','Mesjid Raya'] }},
  'sumut': { label: 'Sumatera Utara', kabupaten: { 'Kota Medan': ['Medan Helvetia','Medan Petisah','Medan Amplas'], 'Kab. Deli Serdang': ['Lubuk Pakam','Percut Sei Tuan'] }},
  'sumbar': { label: 'Sumatera Barat', kabupaten: { 'Kota Padang': ['Padang Utara','Padang Selatan','Kuranji'], 'Kab. Tanah Datar': ['Batusangkar','Lima Kaum'] }},
  'riau': { label: 'Riau', kabupaten: { 'Kota Pekanbaru': ['Sukajadi','Senapelan','Marpoyan Damai'], 'Kab. Kampar': ['Bangkinang','Kampar Utara'] }},
  'kepri': { label: 'Kepulauan Riau', kabupaten: { 'Kota Batam': ['Batu Aji','Bengkong','Nongsa'], 'Kota Tanjung Pinang': ['Tanjung Pinang Timur','Tanjung Pinang Barat'] }},
  'jambi': { label: 'Jambi', kabupaten: { 'Kota Jambi': ['Telanaipura','Danau Sipin','Jambi Selatan'], 'Kab. Muaro Jambi': ['Jambi Luar Kota','Kumpeh'] }},
  'sumsel': { label: 'Sumatera Selatan', kabupaten: { 'Kota Palembang': ['Ilir Barat I','Ilir Timur I','Sako'], 'Kab. Banyuasin': ['Pangkalan Balai','Betung'] }},
  'bengkulu': { label: 'Bengkulu', kabupaten: { 'Kota Bengkulu': ['Gading Cempaka','Ratu Agung','Teluk Segara'], 'Kab. Bengkulu Tengah': ['Karang Tinggi','Pagar Jati'] }},
  'lampung': { label: 'Lampung', kabupaten: { 'Kota Bandar Lampung': ['Way Halim','Sukabumi','Kedamaian'], 'Kab. Lampung Tengah': ['Gunung Sugih','Terbanggi Besar'] }},
  'babel': { label: 'Kepulauan Bangka Belitung', kabupaten: { 'Kota Pangkal Pinang': ['Taman Sari','Girimaya','Bukit Intan'], 'Kab. Bangka': ['Sungailiat','Pemali'] }},
  'banten': { label: 'Banten', kabupaten: { 'Kota Tangerang': ['Tangerang','Cibodas','Cipondoh'], 'Kota Serang': ['Serang','Cipocok Jaya','Curug'] }},
  'jabar': { label: 'Jawa Barat', kabupaten: { 'Kota Bandung': ['Andir','Antapani','Coblong','Sukajadi'], 'Kota Bekasi': ['Bekasi Barat','Bekasi Selatan','Pondok Gede'] }},
  'dki': { label: 'DKI Jakarta', kabupaten: { 'Kota Jakarta Selatan': ['Kebayoran Baru','Kebayoran Lama','Cilandak'], 'Kota Jakarta Barat': ['Palmerah','Grogol','Cengkareng'] }},
  'jateng': { label: 'Jawa Tengah', kabupaten: {
    'Kota Semarang': ['Banyumanik','Candisari','Gajahmungkur','Gayamsari','Genuk','Gunungpati','Mijen','Ngaliyan','Pedurungan','Semarang Barat','Semarang Selatan','Semarang Tengah','Semarang Timur','Semarang Utara','Tembalang','Tugu'],
    'Kota Surakarta': ['Banjarsari','Jebres','Laweyan','Pasar Kliwon','Serengan'],
    'Kota Pekalongan': ['Pekalongan Barat','Pekalongan Selatan','Pekalongan Timur','Pekalongan Utara'],
    'Kota Magelang': ['Magelang Selatan','Magelang Tengah','Magelang Utara'],
    'Kota Salatiga': ['Argomulyo','Sidorejo','Sidomukti','Tingkir'],
    'Kota Tegal': ['Margadana','Tegal Barat','Tegal Selatan','Tegal Timur'],
    'Kab. Cilacap': ['Cilacap Selatan','Cilacap Tengah','Cilacap Utara','Kroya','Maos','Sidareja','Gandrungmangu','Kawunganten','Jeruklegi','Dayeuhluhur','Wanareja','Majenang','Cipari','Karangpucung','Patimuan','Sampang','Bantarsari','Binangun','Nusawungu'],
    'Kab. Banyumas': ['Purwokerto Selatan','Purwokerto Timur','Purwokerto Utara','Purwokerto Barat','Sokaraja','Baturraden','Cilongok','Jatilawang','Kalibagor','Kebasen','Kemranjen','Kedungbanteng','Lumbir','Patikraja','Pekuncen','Purwojati','Rawalo','Somagede','Sumpiuh','Tambak','Wangon'],
    'Kab. Purbalingga': ['Purbalingga','Bobotsari','Bojongsari','Bukateja','Kaligondang','Kalimanah','Kemangkon','Kutasari','Mrebet','Padamara','Pengadegan','Rembang'],
    'Kab. Banjarnegara': ['Banjarnegara','Banjarmangu','Bawang','Kalibening','Karangkobar','Klampok','Mandiraja','Pagentan','Pagedongan','Pejawaran','Punggelan','Purwanegara','Rakit','Sigaluh','Susukan','Wanadadi','Wanayasa'],
    'Kab. Kebumen': ['Kebumen','Alian','Ambal','Ayah','Bonorowo','Buayan','Buluspesantren','Gombong','Karanganyar','Karangsambung','Klirong','Kuwarasan','Kutowinangun','Mirit','Pejagoan','Petanahan','Poncowarno','Prembun','Rowokele','Sadang','Sempor','Sruweng','Padureso','Puring','Karanggayam'],
    'Kab. Purworejo': ['Purworejo','Bagelen','Banyuurip','Bener','Bruno','Butuh','Grabag','Kaligesing','Kemiri','Kutoarjo','Loano','Ngombol','Pituruh','Purwodadi'],
    'Kab. Wonosobo': ['Wonosobo','Garung','Kalibawang','Kaliwiro','Kejajar','Kertek','Leksono','Mojotengah','Sapuran','Selomerto','Sukoharjo','Wadaslintang','Watumalang'],
    'Kab. Magelang': ['Mungkid','Bandongan','Borobudur','Candimulyo','Dukun','Grabag','Kajoran','Kaliangkrik','Mertoyudan','Muntilan','Ngablak','Ngluwar','Pakis','Salam','Salaman','Sawangan','Secang','Srumbung','Tegalrejo','Tempuran','Windusari'],
    'Kab. Boyolali': ['Boyolali','Ampel','Andong','Banyudono','Cepogo','Juwangi','Karanggede','Kemusu','Klego','Mojosongo','Musuk','Ngemplak','Nogosari','Sambi','Sawit','Selo','Simo','Teras','Wonosegoro'],
    'Kab. Klaten': ['Klaten','Bayat','Cawas','Ceper','Delanggu','Gantiwarno','Jatinom','Jogonalan','Juwiring','Kalikotes','Karanganom','Karangdowo','Karangnongko','Kebonarum','Kemalang','Klaten Selatan','Klaten Tengah','Klaten Utara','Manisrenggo','Ngawen','Pedan','Polanharjo','Prambanan','Trucuk','Tulung','Wedi','Wonosari'],
    'Kab. Sukoharjo': ['Sukoharjo','Bendosari','Bulu','Gatak','Jatiyoso','Kartasura','Kebakkramat','Mojolaban','Nguter','Polokarto','Tawangsari','Weru'],
    'Kab. Wonogiri': ['Wonogiri','Baturetno','Bulukerto','Eromoko','Giriwoyo','Giritontro','Jatipurno','Jatiroto','Jatisrono','Kismantoro','Manyaran','Ngadirojo','Nguntoronadi','Paranggupito','Pracimantoro','Purwantoro','Selogiri','Sidoharjo','Slogohimo','Tirtomoyo','Wuryantoro'],
    'Kab. Karanganyar': ['Karanganyar','Jatiyoso','Jenawi','Karangpandan','Kebakkramat','Kerjo','Matesih','Mojogedang','Ngargoyoso','Tasikmadu','Tawangmangu'],
    'Kab. Sragen': ['Sragen','Gemolong','Kalijambe','Karangmalang','Masaran','Miri','Plupuh','Sidoharjo','Sumberlawang','Tanon','Tangen','Gondang'],
    'Kab. Grobogan': ['Purwodadi','Grobogan','Gubug','Tanggungharjo','Kedungjati','Klambu','Tegowanu','Wirosari','Godong','Karangrayung','Penawangan','Ngaringan'],
    'Kab. Blora': ['Blora','Cepu','Jatiroto','Kedungtuban','Kunduran','Ngawen','Randublatung','Tunjungan','Banjarejo','Bogorejo','Japah','Jiken'],
    'Kab. Rembang': ['Rembang','Lasem','Sluke','Sarang','Kaliori','Kragan','Pamotan','Sedan','Sale','Sulang','Bulu','Gunem'],
    'Kab. Pati': ['Pati','Juwana','Tayu','Rembang','Wedarijaksa','Gunungwungkal','Margoyoso','Trangkil','Dukuhseti','Tlogowungu','Cluwak','Winong','Gabus','Margorejo','Jakenan','Gembong','Batangan','Pucakwangi','Sukolilo','Kayen'],
    'Kab. Kudus': ['Kudus','Jati','Mejobo','Undaan','Dawe','Gebog','Bae','Jekulo','Kaliwungu'],
    'Kab. Jepara': ['Jepara','Mlonggo','Mayong','Kudus','Kalinyamatan','Keling','Pecangaan','Tahunan','Welahan','Bangsri','Batealit','Donorojo','Kembang','Nalumsari'],
    'Kab. Demak': ['Demak','Mranggen','Karanganyar','Sayung','Bonang','Wedung','Gajah','Dempet','Karangtengah','Kebonagung','Mijen','Wonosalam'],
    'Kab. Semarang': ['Ungaran Barat','Ungaran Timur','Ambarawa','Banyubiru','Bandungan','Bawen','Bergas','Bringin','Getasan','Jambu','Kaliwungu','Pabelan','Pringapus','Sumowono','Suruh','Susukan','Tengaran','Tuntang'],
    'Kab. Temanggung': ['Temanggung','Bansari','Bejen','Bulu','Candiroto','Gemawang','Jumo','Kandangan','Kedu','Kledung','Kranggan','Ngadirejo','Parakan','Pringsurat','Selopampang','Tembarak','Tlogomulyo','Tretep','Wonoboyo'],
    'Kab. Kendal': ['Kendal','Boja','Brangsong','Gemuh','Kaliwungu','Limbangan','Ngampel','Patean','Patebon','Pegandon','Plantungan','Ringinarum','Rowosari','Singorojo','Sukorejo','Weleri'],
    'Kab. Batang': ['Batang','Bandar','Banyuputih','Blado','Gringsing','Kandeman','Limpung','Pecalungan','Reban','Subah','Tersono','Tulis','Wonotunggal'],
    'Kab. Pekalongan': ['Kajen','Wonopringgo','Kedungwuni','Tirto','Wiradesa','Sragi','Talun','Petungkriyono','Doro','Paninggaran','Lebakbarang','Siwalan','Karangdadap','Buaran'],
    'Kab. Pemalang': ['Pemalang','Taman','Moga','Randudongkal','Bantarbolang','Bodeh','Comal','Petarukan','Ulujami','Pulosari','Ampelgading','Watukumpul','Warungpring'],
    'Kab. Tegal': ['Slawi','Adiwerna','Balapulang','Bojong','Bumijawa','Dukuhturi','Dukuhwaru','Jatinegara','Kedungbanteng','Kramat','Lebaksiu','Margasari','Pagerbarang','Pangkah','Suradadi','Talang','Tarub','Warureja'],
    'Kab. Brebes': ['Brebes','Bumiayu','Jatibarang','Ketanggungan','Losari','Paguyangan','Salem','Sirampog','Tonjong','Tanjung','Wanasari','Banjarharjo','Bantarkawung','Bulakamba','Kersana','Larangan','Songgom']
  }},
  'diy': { label: 'DI Yogyakarta', kabupaten: { 'Kota Yogyakarta': ['Gedongtengen','Danurejan','Gondokusuman'], 'Kab. Sleman': ['Depok','Ngaglik','Mlati','Kalasan'] }},
  'jatim': { label: 'Jawa Timur', kabupaten: { 'Kota Surabaya': ['Gubeng','Genteng','Rungkut','Tandes'], 'Kota Malang': ['Blimbing','Klojen','Lowokwaru','Sukun'] }},
  'bali': { label: 'Bali', kabupaten: { 'Kota Denpasar': ['Denpasar Utara','Denpasar Selatan'], 'Kab. Badung': ['Kuta','Mengwi'] }},
  'ntb': { label: 'Nusa Tenggara Barat', kabupaten: { 'Kota Mataram': ['Mataram','Cakranegara'], 'Kab. Lombok Tengah': ['Praya','Pujut'] }},
  'ntt': { label: 'Nusa Tenggara Timur', kabupaten: { 'Kota Kupang': ['Oebobo','Maulafa'], 'Kab. Timor Tengah Selatan': ['Soe','Kie'] }},
  'kalbar': { label: 'Kalimantan Barat', kabupaten: { 'Kota Pontianak': ['Pontianak Selatan','Pontianak Timur'], 'Kab. Kubu Raya': ['Sungai Raya'] }},
  'kalteng': { label: 'Kalimantan Tengah', kabupaten: { 'Kota Palangka Raya': ['Jekan Raya','Pahandut'], 'Kab. Kotawaringin Timur': ['Sampit'] }},
  'kalsel': { label: 'Kalimantan Selatan', kabupaten: { 'Kota Banjarmasin': ['Banjarmasin Selatan','Banjarmasin Tengah'], 'Kota Banjarbaru': ['Banjarbaru Selatan'] }},
  'kaltim': { label: 'Kalimantan Timur', kabupaten: { 'Kota Samarinda': ['Samarinda Ulu','Samarinda Ilir'], 'Kota Balikpapan': ['Balikpapan Selatan'] }},
  'kaltara': { label: 'Kalimantan Utara', kabupaten: { 'Kota Tarakan': ['Tarakan Timur','Tarakan Barat'], 'Kab. Nunukan': ['Nunukan'] }},
  'sulut': { label: 'Sulawesi Utara', kabupaten: { 'Kota Manado': ['Wenang','Tikala'], 'Kab. Minahasa': ['Tondano'] }},
  'sulteng': { label: 'Sulawesi Tengah', kabupaten: { 'Kota Palu': ['Palu Utara','Palu Selatan'], 'Kab. Donggala': ['Banawa'] }},
  'sulsel': { label: 'Sulawesi Selatan', kabupaten: { 'Kota Makassar': ['Makassar','Tamalanrea'], 'Kab. Gowa': ['Sungguminasa'] }},
  'sultra': { label: 'Sulawesi Tenggara', kabupaten: { 'Kota Kendari': ['Kendari','Mandonga'], 'Kab. Konawe': ['Unaaha'] }},
  'gorontalo': { label: 'Gorontalo', kabupaten: { 'Kota Gorontalo': ['Gorontalo','Dungingi'], 'Kab. Gorontalo': ['Limboto'] }},
  'sulbar': { label: 'Sulawesi Barat', kabupaten: { 'Kota Mamuju': ['Mamuju','Tapalang'], 'Kab. Majene': ['Majene'] }},
  'maluku': { label: 'Maluku', kabupaten: { 'Kota Ambon': ['Sirimau','Baguala'], 'Kab. Maluku Tengah': ['Masohi'] }},
  'malut': { label: 'Maluku Utara', kabupaten: { 'Kota Ternate': ['Ternate Tengah','Ternate Selatan'], 'Kab. Halmahera Utara': ['Tobelo'] }},
  'papua': { label: 'Papua', kabupaten: { 'Kota Jayapura': ['Jayapura','Abepura'], 'Kab. Jayapura': ['Sentani'] }},
  'papbar': { label: 'Papua Barat', kabupaten: { 'Kota Sorong': ['Sorong','Sorong Timur'], 'Kab. Raja Ampat': ['Waisai'] }},
  'papsel': { label: 'Papua Selatan', kabupaten: { 'Kab. Merauke': ['Merauke','Tanah Miring'], 'Kab. Asmat': ['Agats'] }},
  'pappeg': { label: 'Papua Pegunungan', kabupaten: { 'Kab. Jayawijaya': ['Wamena','Asolokobal'], 'Kab. Lanny Jaya': ['Tiom'] }},
  'papteng': { label: 'Papua Tengah', kabupaten: { 'Kab. Nabire': ['Nabire','Siriwo'], 'Kab. Paniai': ['Enarotali'] }},
  'papbarDaya': { label: 'Papua Barat Daya', kabupaten: { 'Kab. Sorong': ['Aimas','Beraur'], 'Kab. Maybrat': ['Kumurkek'] }}
};

// ============================================================
// LOCAL STORAGE - KEY & HELPER
// ============================================================
const STORAGE_ITEMS = 'tukarbarang_items';
const STORAGE_NOTIFS = 'tukarbarang_notifications';
const STORAGE_PROFILE = 'tukarbarang_profile';

function persistItems() {
  try { localStorage.setItem(STORAGE_ITEMS, JSON.stringify(items)); }
  catch(e) { console.warn('Gagal menyimpan items ke localStorage (Kemungkinan penyimpanan penuh):', e); }
}
function persistNotifications() {
  try { localStorage.setItem(STORAGE_NOTIFS, JSON.stringify(notifications)); }
  catch(e) { console.warn('Gagal menyimpan notifikasi ke localStorage:', e); }
}
function persistProfile() {
  try { localStorage.setItem(STORAGE_PROFILE, JSON.stringify(userProfile)); }
  catch(e) { console.warn('Gagal menyimpan profil ke localStorage:', e); }
}

// ============================================================
// DATA AWAL (DEFAULT) — hanya dipakai jika localStorage kosong
// ============================================================
const defaultItems = [
  { id: 1, name: "Kursi Belajar Kayu Jati", kategori: "Furnitur", kondisi: "Baik", desc: "Kursi belajar kayu jati, masih kuat dan kokoh.", status: "free", lokasi: "Banyumanik, Kota Semarang", owner: "Budi Santoso", ownerInitial: "BS", rating: 4.9, wa: "6281234567890" },
  { id: 2, name: "Kamera Polaroid Instax", kategori: "Elektronik", kondisi: "Sangat Baik", desc: "Kamera instax mini 9 warna putih.", status: "swap", lokasi: "Tembalang, Kota Semarang", owner: "Siti Aminah", ownerInitial: "SA", rating: 4.8, wa: "6289876543210" },
  { id: 3, name: "Buku Paket Matematika SMA", kategori: "Buku", kondisi: "Cukup", desc: "Buku paket matematika kelas 10, 11, 12.", status: "sell", harga: 45000, lokasi: "Semarang Tengah", owner: "Ahmad Fauzi", ownerInitial: "AF", rating: 4.5, wa: "6281122334455" },
  { id: 4, name: "Rak Buku Minimalis 3 Tingkat", kategori: "Furnitur", kondisi: "Baru", desc: "Rak buku belum dirakit bahan kayu multiplex.", status: "sell", harga: 120000, lokasi: "Pedurungan", owner: "Dewi Lestari", ownerInitial: "DL", rating: 5.0, wa: "6285544332211" },
  { id: 5, name: "Mainan Edukasi Balok Kayu", kategori: "Mainan Anak", kondisi: "Sangat Baik", desc: "Set balok kayu warna-warni untuk anak usia 2-5 tahun.", status: "free", lokasi: "Banyumanik", owner: "Budi Santoso", ownerInitial: "BS", rating: 4.9, wa: "6281234567890" },
  { id: 6, name: "Celana Jeans Slim Fit Pria", kategori: "Pakaian", kondisi: "Baik", desc: "Ukuran 30, warna biru tua. Sudah jarang dipakai.", status: "swap", lokasi: "Ngaliyan", owner: "Rizky Aditya", ownerInitial: "RA", rating: 4.7, wa: "6287788990011" }
];

const defaultProfile = {
  name: "Budi Santoso",
  location: "Banyumanik, Semarang",
  initial: "BS",
  photo: null
};

// ============================================================
// MEMUAT DATA DARI localStorage (atau pakai default)
// ============================================================
let items = JSON.parse(localStorage.getItem(STORAGE_ITEMS)) || JSON.parse(JSON.stringify(defaultItems));
let notifications = JSON.parse(localStorage.getItem(STORAGE_NOTIFS)) || [];
let userProfile = JSON.parse(localStorage.getItem(STORAGE_PROFILE)) || JSON.parse(JSON.stringify(defaultProfile));

let uploadedPhotos = [];
let selectedStatus = '';

// ============================================================
// FUNGSI KOMPRESI FOTO (Agar tidak memenuhi localStorage)
// ============================================================
function resizeImage(base64Str, maxWidth = 600, maxHeight = 600) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.7)); // Kompresi kualitas 70%
    };
    img.onerror = () => resolve(base64Str); // Fallback jika gagal
  });
}

// ============================================================
// FUNGSI INISIALISASI
// ============================================================
function initProvinces() {
  const sel = document.getElementById('f-provinsi');
  for(let key in lokasiData) {
    let opt = document.createElement('option');
    opt.value = key; opt.textContent = lokasiData[key].label;
    sel.appendChild(opt);
  }
}

function updateProfileDisplay() {
  document.getElementById('profile-name-display').innerText = userProfile.name;
  document.getElementById('profile-loc-display').innerHTML =
    `<svg><use href="#ic-pin"/></svg> ${userProfile.location} · Bergabung Januari 2024`;
  if(userProfile.photo) {
    document.getElementById('profile-avatar-display').innerHTML =
      `<img src="${userProfile.photo}" style="width:100%;height:100%;object-fit:cover;"/>`;
  } else {
    document.getElementById('profile-avatar-display').innerText = userProfile.initial;
  }
}

// ============================================================
// NAVIGASI HALAMAN
// ============================================================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const tabs = document.querySelectorAll('.nav-tab');
  if(pageId === 'home') tabs[0].classList.add('active');
  else if(pageId === 'catalog') tabs[1].classList.add('active');
  else if(pageId === 'upload') tabs[2].classList.add('active');
  else if(pageId === 'profile') tabs[3].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// RENDER KARTU BARANG
// ============================================================
function createItemCard(item) {
  const statusMap = { free: 'Gratis', swap: 'Tukar', sell: 'Dijual' };
  const badgeClass = { free: 'badge-free', swap: 'badge-swap', sell: 'badge-sell' };
  const statusIcon = { free: 'gift', swap: 'swap', sell: 'tag' };
  return `
    <div class="item-card" onclick="openModal(${item.id})">
      <div class="item-img">
        ${item.photoUrl ? `<img src="${item.photoUrl}" alt="${item.name}"/>` : svgIcon(kategoriIcon[item.kategori.toLowerCase()] || 'box', 64, 64, 'stroke:var(--muted);opacity:0.4')}
      </div>
      <div class="item-body">
        <div class="item-badge ${badgeClass[item.status]}">
          ${svgIcon(statusIcon[item.status], 11, 11)} ${statusMap[item.status]}${item.status === 'sell' && item.harga ? ' Rp '+Number(item.harga).toLocaleString('id-ID') : ''}
        </div>
        <div class="item-name">${item.name}</div>
        <div class="item-desc">${item.desc || 'Tidak ada deskripsi'}</div>
        <div class="item-meta">
          <div class="item-location">${svgIcon('pin', 12, 12)} ${item.lokasi}</div>
          <div class="item-condition">${item.kondisi}</div>
        </div>
      </div>
    </div>`;
}

function renderHomeGrid() {
  document.getElementById('home-grid').innerHTML = items.slice(0, 6).map(createItemCard).join('');
}
function renderCatalogGrid(filter = 'all') {
  const grid = document.getElementById('catalog-grid');
  let filtered = items;
  if(filter !== 'all') {
    if(['free', 'swap', 'sell'].includes(filter)) filtered = items.filter(i => i.status === filter);
    else filtered = items.filter(i => i.kategori.toLowerCase() === filter);
  }
  grid.innerHTML = filtered.length === 0
    ? `<div class="empty-state">${svgIcon('box', 48, 48, 'stroke:var(--muted);opacity:0.3')}<p>Belum ada barang</p></div>`
    : filtered.map(createItemCard).join('');
}
function renderProfileGrid() {
  const myItems = items.filter(i => i.owner === userProfile.name);
  document.getElementById('profile-grid').innerHTML = myItems.map(createItemCard).join('');
  document.getElementById('pstat-offered').textContent = myItems.length;
}

// ============================================================
// MODAL DETAIL BARANG
// ============================================================
function openModal(id) {
  const item = items.find(i => i.id === id); if(!item) return;
  const statusMap = { free: 'Gratis', swap: 'Tukar', sell: 'Dijual' };
  const badgeClass = { free: 'badge-free', swap: 'badge-swap', sell: 'badge-sell' };
  const statusIcon = { free: 'gift', swap: 'swap', sell: 'tag' };
  document.getElementById('modal-img').innerHTML = item.photoUrl
    ? `<img src="${item.photoUrl}" alt="${item.name}"/>`
    : svgIcon('image', 80, 80, 'stroke:var(--muted);opacity:0.4');
  document.getElementById('modal-meta').innerHTML =
    `<div class="item-badge ${badgeClass[item.status]}">${svgIcon(statusIcon[item.status], 11, 11)} ${statusMap[item.status]}${item.status === 'sell' && item.harga ? ' Rp '+Number(item.harga).toLocaleString('id-ID') : ''}</div><div class="item-condition">${item.kondisi}</div>`;
  document.getElementById('modal-title').textContent = item.name;
  document.getElementById('modal-desc').textContent = item.desc || 'Tidak ada deskripsi';
  document.getElementById('modal-owner').innerHTML =
    `<div class="owner-avatar">${item.ownerInitial}</div><div><div class="owner-name">${item.owner}</div><div class="owner-rating modal-stars">${starIcons(item.rating)} ${item.rating}</div></div>`;

  const btnText = item.status === 'free' ? 'Ambil Gratis' : item.status === 'swap' ? 'Ajukan Tukar' : 'Beli Barang';
  document.getElementById('modal-actions').innerHTML = `
    <button class="btn-action btn-ambil" onclick="requestItem(${item.id})">${svgIcon('check', 15, 15)} ${btnText}</button>
    <button class="btn-action btn-chat" onclick="chatWhatsApp(${item.id})">${svgIcon('message', 15, 15)} Chat WA</button>`;
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal(event) {
  if(event && event.target !== document.getElementById('modal-overlay')) return;
  document.getElementById('modal-overlay').classList.remove('open');
}

// ============================================================
// CHAT WHATSAPP
// ============================================================
function chatWhatsApp(id) {
  const item = items.find(i => i.id === id);
  if(!item) return;
  const phone = item.wa || "6281234567890";
  const text = `Halo, saya tertarik dengan barang "${item.name}" di TukarBarang. Apakah masih tersedia?`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}

// ============================================================
// AJUKAN BARANG → simpan notifikasi ke localStorage
// ============================================================
function requestItem(id) {
  const item = items.find(i => i.id === id);
  if(!item) return;
  const statusMap = { free: 'mengambil', swap: 'menukarkan barang dengan', sell: 'membeli' };
  notifications.unshift({
    text: `<b>${userProfile.name}</b> mengajukan ${statusMap[item.status]} <b>${item.name}</b>`,
    time: new Date().toLocaleString('id-ID')
  });
  persistNotifications();   // ← SIMPAN
  renderNotifications();
  closeModal();
  showToast('Pengajuan berhasil dikirim ke pemilik barang!');
}

function renderNotifications() {
  const list = document.getElementById('notif-list');
  if(notifications.length === 0) {
    list.innerHTML = '<div class="empty-state" style="padding:16px; text-align:left; color:var(--muted); font-size:13px;">Belum ada notifikasi</div>';
  } else {
    list.innerHTML = notifications.map(n => `
      <div class="notif-item">
        <div class="notif-icon">${svgIcon('bell', 16, 16)}</div>
        <div>
          <div class="notif-text">${n.text}</div>
          <div class="notif-time">${n.time}</div>
        </div>
      </div>
    `).join('');
  }
}

// ============================================================
// FILTER & PENCARIAN
// ============================================================
function filterItems(filter, btn) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderCatalogGrid(filter);
}
function doSearch() {
  const cat = document.getElementById('home-cat').value;
  const search = document.getElementById('home-search').value.toLowerCase();
  const loc = document.getElementById('home-loc').value;
  let results = items.filter(item => {
    let match = true;
    if(cat && item.kategori !== cat) match = false;
    if(search && !item.name.toLowerCase().includes(search)) match = false;
    if(loc && !item.lokasi.toLowerCase().includes(loc.toLowerCase())) match = false;
    return match;
  });
  showPage('catalog');
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  document.querySelector('.filter-chip').classList.add('active');
  const grid = document.getElementById('catalog-grid');
  grid.innerHTML = results.length === 0
    ? `<div class="empty-state">${svgIcon('search', 48, 48, 'stroke:var(--muted);opacity:0.3')}<p>Tidak ada barang cocok</p></div>`
    : results.map(createItemCard).join('');
}

// ============================================================
// FORM UNGGAH — PILIH STATUS
// ============================================================
function selectStatus(status) {
  selectedStatus = status;
  document.querySelectorAll('.status-opt').forEach(opt => opt.classList.remove('selected'));
  document.getElementById('opt-' + status).classList.add('selected');
  document.getElementById('opt-' + status).querySelector('input').checked = true;
  document.getElementById('harga-group').style.display = status === 'sell' ? 'block' : 'none';
}

// ============================================================
// CASCADE LOKASI
// ============================================================
function updateKabupaten() {
  const provinsi = document.getElementById('f-provinsi').value;
  const kabSel = document.getElementById('f-kabupaten');
  const kecSel = document.getElementById('f-kecamatan');
  const desaInput = document.getElementById('f-desa');
  kabSel.innerHTML = '<option value="">— Pilih Kabupaten/Kota —</option>';
  kecSel.innerHTML = '<option value="">— Pilih kabupaten dulu —</option>';
  desaInput.value = '';
  kecSel.disabled = true; desaInput.disabled = true;

  if(provinsi && lokasiData[provinsi]) {
    kabSel.disabled = false;
    const kabs = lokasiData[provinsi].kabupaten;
    for(let kab in kabs) { let opt = document.createElement('option'); opt.value = kab; opt.textContent = kab; kabSel.appendChild(opt); }
  } else { kabSel.disabled = true; }
}

function updateKecamatan() {
  const provinsi = document.getElementById('f-provinsi').value;
  const kab = document.getElementById('f-kabupaten').value;
  const kecSel = document.getElementById('f-kecamatan');
  const desaInput = document.getElementById('f-desa');
  kecSel.innerHTML = '<option value="">— Pilih Kecamatan —</option>';
  desaInput.value = '';
  desaInput.disabled = true;

  if(provinsi && kab && lokasiData[provinsi].kabupaten[kab]) {
    kecSel.disabled = false;
    lokasiData[provinsi].kabupaten[kab].forEach(kec => { let opt = document.createElement('option'); opt.value = kec; opt.textContent = kec; kecSel.appendChild(opt); });
  } else { kecSel.disabled = true; }
}

function enableDesaInput() {
  const kec = document.getElementById('f-kecamatan').value;
  const desaInput = document.getElementById('f-desa');
  desaInput.value = '';
  desaInput.disabled = !kec;
}

// ============================================================
// UPLOAD FOTO (Dengan Kompresi)
// ============================================================
function handlePhotoUpload(event) {
  const files = event.target.files;
  for(let i=0; i<files.length; i++) {
    if(uploadedPhotos.length >= 5) break;
    const reader = new FileReader();
    reader.onload = async function(e) { 
      const resized = await resizeImage(e.target.result); // Kompresi sebelum dimasukkan
      uploadedPhotos.push(resized); 
      renderPhotoPreview(); 
    }
    reader.readAsDataURL(files[i]);
  }
}
function renderPhotoPreview() {
  const preview = document.getElementById('photo-preview');
  preview.innerHTML = '';
  uploadedPhotos.forEach((src, index) => {
    preview.innerHTML += `<div class="photo-thumb-wrap"><img src="${src}" alt="Foto ${index+1}"/><button class="photo-remove" onclick="removePhoto(${index})">✕</button></div>`;
  });
}
function removePhoto(index) { uploadedPhotos.splice(index, 1); renderPhotoPreview(); }

// ============================================================
// SUBMIT FORM UNGGAH → simpan barang ke localStorage
// ============================================================
function submitForm() {
  const nama = document.getElementById('f-nama').value;
  const kategori = document.getElementById('f-kategori').value;
  const kondisi = document.getElementById('f-kondisi').value;
  const desc = document.getElementById('f-desc').value;
  const kec = document.getElementById('f-kecamatan').value;
  const desa = document.getElementById('f-desa').value;
  const dusun = document.getElementById('f-dusun').value;
  const rtrw = document.getElementById('f-rtrw').value;

  let lokasiArr = [desa, kec].filter(Boolean);
  let lokString = lokasiArr.join(", ");

  if(!nama || !kategori || !kondisi || !selectedStatus || !kec || !desa) {
    showToast('Harap isi field wajib (*)', 'warning'); return;
  }

  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

  const newItem = {
    id: newId, name: nama, kategori: kategori, kondisi: kondisi, desc: desc,
    status: selectedStatus, harga: selectedStatus === 'sell' ? document.getElementById('f-harga').value : 0,
    lokasi: lokString, owner: userProfile.name, ownerInitial: userProfile.initial, rating: 4.9,
    photoUrl: uploadedPhotos[0] || '', wa: "6281234567890"
  };
  items.unshift(newItem);
  persistItems();           // ← SIMPAN barang ke localStorage

  renderHomeGrid(); renderCatalogGrid(); renderProfileGrid();
  showToast('Barang berhasil diunggah!', 'check');

  // Reset form
  document.getElementById('f-nama').value = '';
  document.getElementById('f-kategori').value = '';
  document.getElementById('f-kondisi').value = '';
  document.getElementById('f-desc').value = '';
  document.getElementById('f-provinsi').value = ''; updateKabupaten();
  document.getElementById('f-desa').value = '';
  document.getElementById('f-dusun').value = '';
  document.getElementById('f-rtrw').value = '';
  selectedStatus = '';
  document.querySelectorAll('.status-opt').forEach(opt => opt.classList.remove('selected'));
  document.getElementById('harga-group').style.display = 'none';
  uploadedPhotos = []; renderPhotoPreview(); document.getElementById('f-foto').value = '';
  showPage('profile');
}

// ============================================================
// EDIT PROFIL → simpan ke localStorage
// ============================================================
function openEditProfile() {
  document.getElementById('edit-name').value = userProfile.name;
  document.getElementById('edit-location').value = userProfile.location;
  document.getElementById('edit-photo-initial').style.display = userProfile.photo ? 'none' : 'block';
  document.getElementById('edit-photo-preview').style.backgroundImage = userProfile.photo ? `url(${userProfile.photo})` : 'none';
  document.getElementById('edit-photo-preview').style.backgroundSize = 'cover';
  document.getElementById('edit-profile-overlay').classList.add('open');
}
function closeEditProfile(event) {
  if(event && event.target !== document.getElementById('edit-profile-overlay')) return;
  document.getElementById('edit-profile-overlay').classList.remove('open');
}
function previewProfilePhoto(event) {
  const file = event.target.files[0];
  if(file) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      const resized = await resizeImage(e.target.result); // Kompresi foto profil
      document.getElementById('edit-photo-initial').style.display = 'none';
      document.getElementById('edit-photo-preview').style.backgroundImage = `url(${resized})`;
      document.getElementById('edit-photo-preview').style.backgroundSize = 'cover';
    }
    reader.readAsDataURL(file);
  }
}
function saveProfile() {
  const newName = document.getElementById('edit-name').value;
  const newLoc = document.getElementById('edit-location').value;
  const bgImg = document.getElementById('edit-photo-preview').style.backgroundImage;

  const oldName = userProfile.name;
  const oldInitial = userProfile.initial;

  if(newName) {
    userProfile.name = newName;
    userProfile.initial = newName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0,2);
  }
  if(newLoc) userProfile.location = newLoc;
  if(bgImg && bgImg !== 'none') {
    userProfile.photo = bgImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
  }

  items.forEach(item => {
    if(item.owner === oldName || item.ownerInitial === oldInitial) {
      item.owner = userProfile.name;
      item.ownerInitial = userProfile.initial;
    }
  });

  persistProfile();         // ← SIMPAN profil ke localStorage
  persistItems();           // ← SIMPAN juga items yang berubah

  updateProfileDisplay();
  renderProfileGrid();
  closeEditProfile();
  showToast('Profil berhasil diperbarui!', 'check');
}

// ============================================================
// TOAST NOTIFICATION
// ============================================================
function showToast(msg, icon = 'check') {
  const toast = document.getElementById('toast');
  document.getElementById('toast-icon').innerHTML = `<use href="#ic-${icon}"/>`;
  document.getElementById('toast-text').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// ============================================================
// INISIALISASI SAAT HALAMAN DIMUAT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initProvinces();
  updateProfileDisplay();
  renderHomeGrid();
  renderCatalogGrid();
  renderProfileGrid();
  renderNotifications();
});