/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScentNote, AstronomerMoment, PlanetData } from './types';

export const SCENT_NOTES: ScentNote[] = [
  {
    id: 'top',
    title: 'The Cold Night',
    subtitle: 'Cold Air • Bergamot • Cardamom',
    olfactoryDesc: 'Udara dingin, citrus bercahaya, rempah aromatik',
    philosophy: 'Pembukaan wewangian ini diawali oleh hembusan udara malam yang sunyi, bersih, dan bercahaya di atas menara observatorium batu tinggi. Sentuhan citrus segar dari Bergamot dan kilau cerah rempah Cardamom bersatu melahirkan kesegaran yang kontemplatif, seolah menuntun indra kita bersiap menyaksikan misteri angkasa luas yang perlahan tersingkap saat senja meluruh.',
    ingredients: [
      { name: 'Cold Air', icon: 'Sparkles', desc: 'Atmosfer udara malam pegunungan yang sunyi, sejuk, dan memberikan kesegaran mineral bagai tiupan angin di atas menara.' },
      { name: 'Bergamot', icon: 'Sprout', desc: 'Sentuhan segar murni yang mencerahkan kegelapan, laksana kilau bintang pertama penanda malam.' },
      { name: 'Cardamom', icon: 'Flame', desc: 'Sentuhan kapulaga aromatik hangat yang memicu rasa penasaran akal manusia sejak detik pertama.' }
    ],
    color: 'from-blue-400 via-sky-300 to-teal-200',
    bgGradient: 'from-blue-950/40 via-slate-900/40 to-[#0c0f16]'
  },
  {
    id: 'heart',
    title: 'The Forbidden Script',
    subtitle: 'Tea Vapor • Manuscript Woods • Lavender',
    olfactoryDesc: 'Uap teh, manuskrip, kayu halus, floral samar',
    philosophy: 'Memasuki jantungnya, wewangian ini bertumbuh menjadi sebuah keheningan intelektual yang intim. Kehangatan uap teh yang tenang menyatu lembut dengan belaian harum herba Lavender liar dan kelembutan bunga rahasia. Nuansa kayu antik dari tumpukan manuskrip sejarah dan sentuhan kertas tua menceritakan keberanian akal manusia yang membakar malam demi mencari kebenaran absolut.',
    ingredients: [
      { name: 'Tea Vapor', icon: 'Sparkles', desc: 'Aroma uap teh hangat yang tenang dan menyejukkan batin di tengah pergulatan argumen yang tegang.' },
      { name: 'Manuscript Woods', icon: 'BookOpen', desc: 'Sinergi aroma naskah tua dan kayu kering yang melukiskan kehangatan perpustakaan penuh rahasia.' },
      { name: 'Lavender', icon: 'PenTool', desc: 'Kelembutan lavender dan herba segar yang menghadirkan harmoni kedamaian jiwa manusiawi nan luhur.' }
    ],
    color: 'from-amber-400 via-yellow-200 to-amber-100',
    bgGradient: 'from-amber-950/30 via-slate-900/40 to-[#0c0f16]'
  },
  {
    id: 'base',
    title: 'The Sun (Sol)',
    subtitle: 'Cendana Kupang • Benzoin Sumatera • Skin Musk',
    olfactoryDesc: 'Cendana, benzoin, vetiver, musk kulit, kayu mineral',
    philosophy: 'Pada akhir perjalanan panjangnya, wewangian ini bersemayam dalam kehangatan agung yang abadi bagai sang surya di pusat gravitasi semesta. Kemewahan Cendana Kupang murni, kelembutan bersahaja dari Benzoin Sumatera, dan bisikan intim dari Musk kulit melekat erat menciptakan jejak kayu-mineral kering yang sangat tenang, hangat, reflektif, dan tak lekang oleh waktu.',
    ingredients: [
      { name: 'Cendana Kupang', icon: 'Trees', desc: 'Kemewahan kayu Cendana Kupang murni dengan karakter krem-kayu bersahaja yang luhur dan abadi.' },
      { name: 'Benzoin Sumatera', icon: 'Flame', desc: 'Resin manis-hangat khas Sumatera ditenun bersama vetiver kering menghembuskan aura mistis yang agung.' },
      { name: 'Skin Musk', icon: 'Layers', desc: 'Kehangatan musk alami yang super bersih bagai sapaan kulit yang lembut, murni, dan ultra elegan.' }
    ],
    color: 'from-red-400 via-amber-500 to-yellow-300',
    bgGradient: 'from-red-950/30 via-slate-900/40 to-[#0c0f16]'
  }
];

export const HISTORICAL_MOMENTS: AstronomerMoment[] = [
  {
    id: 'moment1',
    year: 1543,
    name: 'Nicolaus Copernicus',
    title: 'Malam Terakhir di Frombork',
    text: 'Menuliskan kebenaran heliosentris di atas kertas perkamen tua yang rapuh, menantang ribuan tahun dogma geosentrik.',
    historicalVignette: 'Dalam menara observasi yang dingin di Polandia Utara, Copernicus bergegas menyelesaikan buku "De revolutionibus orbium coelestium". Napasnya beruap di udara beku 3°C. Di kejauhan terdengar bel gereja berdentang, sebuah pengingat bahwa ide besarnya bisa terbakar sebagai bidah. Ia tidak berniat menghancurkan dunia, ia hanya ingin membuktikan bahwa Tuhan menciptakan simetri yang jauh lebih indah dengan Matahari di porosnya.',
    scientificDiscovery: 'Menentukan secara matematis bahwa Bumi berotasi pada porosnya dan berevolusi bersama planet-planet lain mengitari Matahari yang diam di tengah.',
    ambience: 'Tiupan angin Baltik yang kencang, decitan lilin meleleh, dan rontokan salju halus di jendela semen menara.',
    coordinates: '54°21′N 19°41′E'
  },
  {
    id: 'moment2',
    year: 1610,
    name: 'Galileo Galilei',
    title: 'Saksi Pertama Melalui Lensa Besi',
    text: 'Mengubah kaca pengamat biasa menjadi teleskop militer berkekuatan tinggi, melihat apa yang dilarang untuk dilihat.',
    historicalVignette: 'Melalui tabung kayu bersampul kulit dan berlensa cembung, mata Galileo menyusuri kegelapan angkasa di Padua. Tiba-tiba ia tertegun. Di samping Jupiter, ada empat bintik cahaya kecil berbaris lurus. Beberapa malam kemudian, bintik itu menari berpindah posisi. Segala doktrin langit Aristoteles runtuh malam itu juga. Langit tidaklah beku dan Bumi bukanlah pusat seluruh gerakan kosmik.',
    scientificDiscovery: 'Menemukan 4 satelit utama Jupiter (Io, Europa, Ganymede, Callisto), fase-fase Venus, dan kawah di Bulan, mematikan dogma bahwa semua kosmos mutlak berputar mengitari Bumi.',
    ambience: 'Gesekan tembaga dan sekrup teleskop, helaan napas terkesiap, dan ketukan pena bulu angsa menyalin posisi bintik cahaya.',
    coordinates: '45°24′N 11°52′E'
  },
  {
    id: 'moment3',
    year: 1633,
    name: 'Sidang Inkuisisi Roma',
    title: '"E Pur Si Muove" — Dan Semesta Tetap Berputar',
    text: 'Berlutut di bawah tekanan mahkamah agung Roma, dipaksa bersumpah bahwa kebenaran matematismya adalah kebohongan.',
    historicalVignette: 'Di bawah kubah gereja Santa Maria sopra Minerva yang megah namun mencengkam, Galileo yang sudah berusia 69 tahun bertekuk lutut di hadapan sepuluh bapak kardinal berpakaian serba merah darah. Ia terpaksa melafalkan sumpah abjurasi demi menghindari siksaan tiang pembakaran. Namun, seiring ia menyeret lututnya kembali berdiri di lantai marmer yang dingin, matanya menatap lantai itu dan berbisik tipis penuh ironi yang menantang zaman: "E pur si muove." (Namun ia tetap berputar.)',
    scientificDiscovery: 'Keberanian meneguhkan sains di tengah tekanan politis dogma. Kejujuran matematika terbukti tak terbendung oleh kurungan fisik jeruji besi maupun tumpukan kayu bakar.',
    ambience: 'Gema langkah kaki di aula marmer tinggi, hening ketakutan audiens, gemerisik jubah kebiaraan, dan keyakinan sunyi yang membakar.',
    coordinates: '41°53′N 12°28′E'
  }
];

export const PLANETS_HELIO: PlanetData[] = [
  {
    id: 'sun',
    name: 'SOL (Matahari)',
    symbol: '☉',
    distance: 0,
    speed: 0,
    size: 26,
    color: '#ffb020',
    quote: 'In medio vero omnium residet Sol. (Di pusat dari segalanya, bersemayam sang Surya.)',
    context: 'Copernicus, De Revolutionibus (1543)',
    details: 'Matahari diletakkan di tengah sebagai pusat gravitasi materi dan wewangian. Ini adalah simbol kebenaran mutlak yang sejati, diwakili oleh aroma hangat Cendana Kupang murni, kehangatan Benzoin Sumatera yang megah, dan kelembutan Skin Musk.'
  },
  {
    id: 'mercury',
    name: 'MERCURIUS',
    symbol: '☿',
    distance: 40,
    speed: 4.1,
    size: 6,
    color: '#a0aec0',
    quote: 'Gerakan tercepat melintasi orbit dewa utusan.',
    context: 'Akal yang lincah menuntut ketajaman.',
    details: 'Mengorbit paling dekat dengan matahari dengan kecepatan ekstrem, menyimbolkan ketajaman logika yang gesit bertindak di bawah tekanan.'
  },
  {
    id: 'venus',
    name: 'VENUS',
    symbol: '♀',
    distance: 65,
    speed: 1.6,
    size: 10,
    color: '#e2bf7d',
    quote: 'Keindahan gemilang di batas senja kosmis.',
    context: 'Fase cahaya pembongkar dogma geosektrik.',
    details: 'Fase cahayanya yang persis seperti rembulan membuktikan ia berputar mengitari matahari, bukan bumi.'
  },
  {
    id: 'earth',
    name: 'EARTH (Bumi)',
    symbol: '⊕',
    distance: 95,
    speed: 1.0,
    size: 11,
    color: '#2b6cb0',
    quote: 'Dan ia tetap bergerak, mengelilingi pusat bercahaya.',
    context: 'Tempat saksi-saksi kecil merenungi tatanan kosmos.',
    details: 'Warna biru maritim sebagai rumah bagi para ilmuwan pengamat, yang meski kecil, adalah bagian dari gerakan agung semesta.'
  },
  {
    id: 'mars',
    name: 'MARS',
    symbol: '♂',
    distance: 125,
    speed: 0.53,
    size: 8,
    color: '#c53030',
    quote: 'Api keberanian pejuang yang menuntut pembuktian.',
    context: 'Merah membara meretas dinding kemapanan dogma.',
    details: 'Orbital merah membara yang mendefinisikan retrogradasi membingungkan, memicu Kepler merintis lintasan elips revolusioner.'
  },
  {
    id: 'jupiter',
    name: 'JUPITER',
    symbol: '♃',
    distance: 165,
    speed: 0.08,
    size: 18,
    color: '#dd6b20',
    quote: 'Sirkus satelit yang menari di kejauhan malam Padua.',
    context: 'Saksi bisu Galileo yang meruntuhkan hegemoni geosentrik.',
    details: 'Jupiter dan 4 bulannya yang berputar lurus adalah bukti nyata pertama di dunia bahwa tidak semua benda langit mengitari bumi.'
  }
];
