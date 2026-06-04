/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SCENT_NOTES } from './data';
import { Sparkles, ArrowRight, Star, Heart, Compass, History, AlertCircle, Copy, HelpCircle, Music, ChevronLeft, ChevronRight } from 'lucide-react';
import ScentExplorer from './components/ScentExplorer';
import ScentCabinet from './components/ScentCabinet';
import HistoricalJournal from './components/HistoricalJournal';
import HeliocentricCanvas from './components/HeliocentricCanvas';
import CreatorProfile from './components/CreatorProfile';
import AudioSoundscape from './components/AudioSoundscape';
import ScentReviews from './components/ScentReviews';

const MOODBOARD_SLIDES = [
  {
    id: 'slide-1',
    title: 'The Cold Night (Top Note)',
    subtitle: 'I. COLD AIR • BERGAMOT • GRAPEFRUIT • CARDAMOM • JUNIPER BERRY',
    icon: '❄',
    img: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=500&auto=format&fit=crop',
    desc: 'Menggambarkan kesegaran atmosfer observatorium pada malam hari melalui perpaduan Cold Air, kilauan citrus Bergamot dan Grapefruit, serta sentuhan aromatik Cardamom dan Juniper Berry. Udara terasa dingin, jernih, dan bergerak perlahan seperti langit yang terus berputar di atas kepala.',
    accentColor: 'text-sky-300',
    borderColor: 'group-hover:border-sky-400 shadow-sky-500/10'
  },
  {
    id: 'slide-2',
    title: 'The Forbidden Script (Heart Note)',
    subtitle: 'II. TEA VAPOR • MANUSCRIPT WOODS • ORRIS • LAVENDER',
    icon: '📜',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=500&auto=format&fit=crop',
    desc: 'Mengisahkan keheningan ruang baca observatorium yang dipenuhi manuskrip dan pengetahuan terlarang. Tea Vapor yang hangat berpadu dengan Manuscript Woods, Orris, dan Lavender, menciptakan nuansa kertas tua, kayu, serta pemikiran yang terus hidup melampaui zamannya.',
    accentColor: 'text-[#C5A059]',
    borderColor: 'group-hover:border-amber-450 shadow-amber-500/10'
  },
  {
    id: 'slide-3',
    title: 'The Sun (Sol) (Base Note)',
    subtitle: 'III. CENDANA KUPANG • BENZOIN SUMATERA • VETIVER JAWA • SKIN MUSK',
    icon: '☉',
    img: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=500&auto=format&fit=crop',
    desc: 'Menghadirkan kehangatan pusat tata surya melalui kelembutan Cendana Kupang, cahaya resin Benzoin Sumatera, serta jejak Vetiver Jawa yang tenang dan membumi. Lapisan Skin Musk membalut semuanya dalam kesan intim, seolah cahaya matahari yang tetap terasa meski malam telah tiba.',
    accentColor: 'text-yellow-400',
    borderColor: 'group-hover:border-yellow-400 shadow-yellow-500/10'
  },
  {
    id: 'slide-4',
    title: 'Dogma & Reason (Ketegangan Intelektual)',
    subtitle: 'IV. BLACK PEPPER • CLARY SAGE • LAVENDER • CARDAMOM',
    icon: '⚡',
    img: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500&auto=format&fit=crop',
    desc: 'Melambangkan pertarungan antara keyakinan lama dan keberanian berpikir. Black Pepper, Clary Sage, Lavender, dan Cardamom menghadirkan ketegangan aromatik yang tajam namun terkendali, menggambarkan keberanian mempertanyakan sesuatu yang selama ini dianggap mutlak.',
    accentColor: 'text-rose-400',
    borderColor: 'group-hover:border-rose-400 shadow-rose-500/10'
  }
];

interface QuizOption {
  text: string;
  score: {
    copernicus?: number;
    galileo?: number;
    kepler?: number;
    bruno?: number;
    brahe?: number;
  };
}

interface QuizQuestion {
  category: string;
  text: string;
  options: QuizOption[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    category: "METODE PENALARAN",
    text: "Saat seluruh dunia bersepakat atas suatu kepercayaan tradisional, namun Anda mengamati suatu fakta fisik yang secara matematis membantahnya, apa tindakan spontan Anda?",
    options: [
      {
        text: "Mengumpulkan bukti dalam diam, menunggu momen naskah tersusun rapi nan kokoh sebelum menerbitkannya saat akhir hayat.",
        score: { copernicus: 3, kepler: 1 }
      },
      {
        text: "Secara vokal membicarakannya ke khalayak luas memakai alat observasi, meskipun Anda harus dituduh sebagai pembawa bidah.",
        score: { galileo: 3, bruno: 2 }
      }
    ]
  },
  {
    category: "SIKAP FISIK",
    text: "Bagaimana Anda menyikapi anomali ganjil (ketidakteraturan kecil) yang merusak kesempurnaan teori indah yang sudah lama Anda agungkan?",
    options: [
      {
        text: "Mendedikasikan waktu bertahun-tahun membaca tumpukan tabel angka super rumit untuk merekonstruksi ulang matematika orbital menjadi pola elips yang lebih alami.",
        score: { kepler: 3, brahe: 1 }
      },
      {
        text: "Percaya bahwa instrumen kotor atau mata kasar adalah penyebabnya, dan bersikeras mempertahankan orbit lingkaran suci yang agung di tengah langit.",
        score: { copernicus: 2, brahe: 1 }
      }
    ]
  },
  {
    category: "HARGA SEBUAH IDENTITAS",
    text: "Bila keselamatan diri Anda ditekan di hadapan tribunal hukum tertinggi untuk menyumpahi kebohongan, apa harga yang Anda bayar?",
    options: [
      {
        text: "Berlutut membohongi mahkamah demi menghindari jeruji/tiang pembakaran, namun berbisik lirih penuh arti: \"E pur si muove.\"",
        score: { galileo: 3, kepler: 1 }
      },
      {
        text: "Menolak menerbitkan naskah sama sekali sampai ajal menjemput sehingga tak perlu melalui paksaan sumpah palsu mana pun.",
        score: { copernicus: 3 }
      }
    ]
  },
  {
    category: "VISI KOSMIK",
    text: "Menurut insting terdalam Anda, seberapa jauhkah batas kebenaran atau alam semesta itu membentang?",
    options: [
      {
        text: "Sangat tak terhingga, melintasi ribuan tatasurya dan bintang-bintang lain yang barangkali memiliki kehidupannya sendiri secara otonom.",
        score: { bruno: 3, galileo: 1 }
      },
      {
        text: "Sangat teratur, geometris, dan presisi di bawah satu orkestrasi hukum matematika lingkaran matahari yang melingkar puitis.",
        score: { kepler: 3, copernicus: 2 }
      },
      {
        text: "Sejauh apa yang bisa diukur secara fisik dan divalidasi oleh instrumen observatorium presisi malam demi malam di bawah langit malam nyata.",
        score: { brahe: 3, galileo: 2 }
      }
    ]
  },
  {
    category: "ORIENTASI KERJA",
    text: "Ketika Anda bekerja keras dalam kesunyian malam, apa motivator utama yang menjaga lilin belajar Anda tetap menyala?",
    options: [
      {
        text: "Keinginan mulia menyederhanakan rumitnya matematika alam agar selaras dengan orbit lingkaran elips murni ciptaan semesta.",
        score: { kepler: 3, copernicus: 1 }
      },
      {
        text: "Sensasi menemukan rahasia visual yang tak pernah dilihat mata manusia mana pun sebelumnya langsung melalui tabung lensa teropong.",
        score: { galileo: 3, bruno: 2 }
      },
      {
        text: "Kekaguman murni pada tumpukan catatan data posisi ribuan bintang yang terdokumentasi sangat rapi secara kronologis tahun demi tahun.",
        score: { brahe: 3 }
      }
    ]
  },
  {
    category: "WARISAN SEJARAH",
    text: "Bagaimana Anda ingin generasi manusia di masa depan mengenang nama serta seluruh jerih payah intelektual Anda?",
    options: [
      {
        text: "Sebagai martir berani yang jiwanya terbang bebas menembus batas dogma sempit, walau raga saya harus hangus dibakar api tribunal.",
        score: { bruno: 3 }
      },
      {
        text: "Sebagai perumus teori astronomi agung yang merekayasa ulang seluruh pemahaman rotasi peradaban manusia secara fundamental.",
        score: { copernicus: 3, kepler: 2 }
      },
      {
        text: "Sebagai penjelajah empiris tangguh yang menyajikan bukti nyata untuk memaksa seluruh dunia membuka kelopak mata mereka sendiri.",
        score: { galileo: 3, brahe: 1 }
      }
    ]
  }
];

export default function App() {
  const [activeNoteTier, setActiveNoteTier] = useState<string>('top');
  const [isSprithingActive, setIsSprithingActive] = useState<boolean>(false);
  const [spritzParticles, setSpritzParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  // Courage Matcher State
  const [courageState, setCourageState] = useState<number>(0); // 0: start, 1-6: Questions, 7: Result
  const [answers, setAnswers] = useState<number[]>([]);
  
  const handleSpritz = () => {
    setIsSprithingActive(true);
    // Generate starburst cosmic particles for spritz animation
    const particles = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -20 - Math.random() * 120,
      size: 2 + Math.random() * 4,
    }));
    setSpritzParticles(particles);
    
    // Play scratching sound procedurally if soundscape exists
    const audioToggle = document.getElementById('btn-quick-scratch');
    if (audioToggle) {
      audioToggle.click();
    }
    
    setTimeout(() => {
      setIsSprithingActive(false);
      setSpritzParticles([]);
    }, 1500);
  };

  // Courage Matcher responses
  const handleAnswer = (optionIndex: number) => {
    const nextAnswers = [...answers, optionIndex];
    setAnswers(nextAnswers);
    
    if (courageState < 6) {
      setCourageState(courageState + 1);
    } else {
      setCourageState(7); // Show result
    }
  };

  const getMathedAstronomer = () => {
    const totals = {
      copernicus: 0,
      galileo: 0,
      kepler: 0,
      bruno: 0,
      brahe: 0
    };

    answers.forEach((optionIndex, questionIndex) => {
      const question = QUIZ_QUESTIONS[questionIndex];
      if (question && question.options[optionIndex]) {
        const score = question.options[optionIndex].score;
        totals.copernicus += score.copernicus || 0;
        totals.galileo += score.galileo || 0;
        totals.kepler += score.kepler || 0;
        totals.bruno += score.bruno || 0;
        totals.brahe += score.brahe || 0;
      }
    });

    let highestScore = -1;
    let winner: 'copernicus' | 'galileo' | 'kepler' | 'bruno' | 'brahe' = 'copernicus';

    const keys: Array<'copernicus' | 'galileo' | 'kepler' | 'bruno' | 'brahe'> = [
      'copernicus',
      'galileo',
      'kepler',
      'bruno',
      'brahe'
    ];

    keys.forEach(key => {
      if (totals[key] > highestScore) {
        highestScore = totals[key];
        winner = key;
      }
    });

    const astronomers = {
      copernicus: {
        name: 'Nicolaus Copernicus (Sang Pembuka Fajar)',
        quote: '“Saya menulis bukan karena dunia setuju, tetapi karena matematika semesta menuntut kejujuran.”',
        desc: 'Anda adalah tipe pengamat visioner yang tenang dan analitis. Seperti Copernicus, Anda bertindak dengan kalkulasi matang di balik bayang-bayang menara, merumuskan teori heliosentrisme revolusioner tanpa banyak bersuara sampai naskah bukti mutlak siap diterbitkan saat akhir hayat.',
        accent: 'text-amber-400 border-amber-500/20 bg-amber-500/5'
      },
      galileo: {
        name: 'Galileo Galilei (Pejuang Logika di Hadapan Tirani)',
        quote: '“Dalam masalah ilmiah, otoritas dari seribu orang tidak sebanding dengan argumen penalaran satu individu.”',
        desc: 'Anda memiliki keberanian yang membara, empiris, dan komunikatif. Seperti Galileo, Anda menyaring dunia menggunakan lensa bukti kuat dari pengamatan teleskopik Anda sendiri, berani bersuara lantang ke publik sekalipun ditentang keras oleh elite dogma.',
        accent: 'text-rose-400 border-rose-500/20 bg-rose-500/5'
      },
      kepler: {
        name: 'Johannes Kepler (Sang Harmonisasi Orbit)',
        quote: '“Kita harus mencari keselarasan matematika yang luhur di balik setiap penyimpangan alam semesta.”',
        desc: 'Anda adalah seorang pemikir kreatif, penyabar, dan detail. Seperti Kepler, Anda gigih memecahkan data-data rumit yang ganjil, mengganti tradisi lingkaran sempurna yang kaku dengan hukum elips harmonis untuk menyatukan kosmos ke dalam tatanan estetika yang mutlak.',
        accent: 'text-blue-400 border-blue-500/20 bg-blue-500/5'
      },
      bruno: {
        name: 'Giordano Bruno (Sang Visioner Tanpa Batas)',
        quote: '“Jiwa yang mencari kebenaran tidak akan pernah gentar oleh abu pembakaran, karena alam semesta ini tak terbatas.”',
        desc: 'Anda adalah pengembara pikiran metafisik yang ultra-berani dan penuh imajinasi kosmik yang mendahului zaman. Seperti Giordano Bruno, bagi Anda kebenaran tidak dibatasi oleh dogma buatan manusia, melainkan ketidakterbatasan ruang kosmik yang membebaskan kesadaran jiwa.',
        accent: 'text-purple-400 border-purple-500/20 bg-purple-500/5'
      },
      brahe: {
        name: 'Tycho Brahe (Insting Observasi Agung)',
        quote: '“Jangan hanya berteori tentang langit sebelum kamu mencatat setiap detak lintasan bintang secara presisi.”',
        desc: 'Anda adalah praktisi pengamat yang gigih, teliti, realistis, dan perfeksionis. Seperti Tycho Brahe, Anda tidak terburu-buru berteori puitis, melainkan mendedikasikan malam demi malam mengumpulkan katalog data empiris terbaik guna melahirkan landasan kokoh bagi ilmu pengetahuan abadi.',
        accent: 'text-emerald-400 border-emerald-500/20 bg-[#C5A059]/5'
      }
    };

    return astronomers[winner];
  };

  const handleResetQuiz = () => {
    setCourageState(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-[#E0D8D0] flex flex-col relative font-sans leading-relaxed selection:bg-[#C5A059]/30 selection:text-white">
      
      {/* Floating Procedural ambient generator sound controller */}
      <AudioSoundscape />

      {/* Decorative starry background layout */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Celestial Gradient Backgrounds (Frosted Glass Theme) */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/25 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#C5A059]/12 rounded-full blur-[100px]"></div>
        <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#C5A059]/20 rounded-full blur-[80px] animate-orb-pulse"></div>
        <div className="absolute top-[80%] left-[10%] w-[450px] h-[450px] bg-blue-950/20 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Twinkling stars */}
        <div className="absolute top-12 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-36 right-1/4 w-0.5 h-0.5 bg-sky-200 rounded-full animate-twinkle" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-80 left-10 w-1 h-1 bg-amber-300/60 rounded-full animate-twinkle" style={{ animationDelay: '2.4s' }} />
        <div className="absolute top-[500px] right-20 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1.8s' }} />
        <div className="absolute top-[850px] left-1/3 w-0.5 h-0.5 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.2s' }} />
        <div className="absolute top-[1200px] right-12 w-1.5 h-1.5 bg-amber-100/40 rounded-full animate-twinkle" style={{ animationDelay: '3.1s' }} />
      </div>

      {/* Primary Container Wrap */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow pb-24">
        
        {/* 1. HEADER BRANDING */}
        <header className="py-8 flex flex-col sm:flex-row items-center justify-between border-b border-white/10 mb-12 relative z-10">
          <div className="flex items-center gap-2.5 mb-4 sm:mb-0">
            <span className="font-serif text-[#C5A059] font-extrabold text-xl tracking-[0.15em] uppercase">☉ ON THE MOVEMENT OF THE EARTH</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-[10px] tracking-[0.4em] uppercase font-medium text-slate-400 opacity-80 hidden md:inline">
              ANNO DOMINI 1543
            </div>
            <div className="w-8 h-px bg-[#C5A059]/40 hidden md:inline"></div>
            <span className="text-[10px] font-mono text-[#C5A059] border border-[#C5A059]/30 rounded-full px-3.5 py-1 bg-[#C5A059]/8 uppercase tracking-wider">
              Heliocentric Perfume Edition
            </span>
          </div>
        </header>

        {/* 2. HERO SECTION */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24 relative z-10">
          
          {/* Left Column: Philosophical Pitch & Tagline (7 cols) */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#C5A059]/8 text-[#C5A059] border border-[#C5A059]/20 px-4 py-1 text-[10px] font-mono tracking-widest">
                <span>"E PUR SI MUOVE" // NAMUN IA TETAP BERGERAK</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.1]">
                On The Movement<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E2C280] to-slate-200">
                  of the Earth
                </span>
              </h1>

              <div className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#C5A059] font-bold flex items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                Sebuah Pengalaman Baru Wewangian 
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light font-sans opacity-95">
              Di tengah dinginnya abad pertengahan dan cengkeraman tekanan dogma yang membeku, sebuah kebenaran lahir dari ujung pena astronomi. Manusia dan bumi bukanlah pusat alam semesta, kita hanyalah sebutir debu kecil dalam tarian abadi mengelilingi cahaya matahari.
            </p>

            <blockquote className="border-l-2 border-[#C5A059] pl-4 py-3 my-4 italic font-serif text-[#E0D8D0]/80 text-xs sm:text-sm text-left max-w-xl mx-auto lg:mx-0 glass-panel rounded-r-lg">
              "Udara dingin membawa sebuah gagasan yang tidak seharusnya ada."
            </blockquote>

            {/* Action panel triggers */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <button
                id="btn-scroll-scent"
                onClick={() => document.getElementById('scent-profile')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl border border-white/10 hover:border-[#C5A059]/40 bg-white/5 hover:bg-[#C5A059]/5 px-5 py-3.5 text-xs font-mono text-white transition-all flex items-center gap-2 tracking-wider"
              >
                <span>Struktur Profil Aroma</span>
                <ArrowRight className="h-4.5 w-4.5 text-[#C5A059]" />
              </button>

              <button
                id="btn-scroll-orbit"
                onClick={() => document.getElementById('heliocentric-system')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl bg-gradient-to-r from-[#C5A059] to-[#bca069] text-black px-5 py-3.5 text-xs font-mono font-bold transition flex items-center gap-2 hover:brightness-110 shadow-lg shadow-[#C5A059]/20 tracking-wider"
              >
                <Compass className="h-4.5 w-4.5" />
                <span>Interaksi Orbit Nicolaus</span>
              </button>
            </div>
            
            {/* Ambient sound helper tip */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2.5 text-[11px] font-mono text-slate-400 mt-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                <span>Gunakan kontrol interaktif di kiri bawah atau ketuk putar cepat di sini:</span>
              </div>
              <button
                id="btn-quick-play-bgm"
                onClick={() => {
                  const btn = document.getElementById('btn-toggle-sound');
                  if (btn) btn.click();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5A059]/15 hover:bg-[#C5A059]/25 text-[#C5A059] hover:text-[#ffd68a] border border-[#C5A059]/35 text-[9px] font-mono transition-all font-semibold cursor-pointer active:scale-95 shadow-sm"
              >
                <Music className="h-3 w-3" />
                <span>Putar / Jeda BGM Kosmis</span>
              </button>
            </div>
          </div>

          {/* Right Column: EXQUISITELY CRAFTED GEOMETRIC PERFUME BOTTLE (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute w-72 h-72 bg-[#C5A059]/10 rounded-full filter blur-[100px] -z-10 animate-pulse" />
            
            {/* Perfume Moodboard representing the thematic visual nodes */}
            <div className="glass-panel rounded-3xl p-6 w-full max-w-[380px] shadow-[0_0_50px_rgba(197,160,89,0.08)] border border-[#C5A059]/20 bg-slate-950/70 relative z-10 flex flex-col">
              <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full filter blur-[40px] pointer-events-none animate-pulse" />
              
              {/* Moodboard Header */}
              <div className="text-center mb-5 pb-4 border-b border-white/10 relative z-10">
                <span className="text-[9px] font-mono tracking-[0.35em] text-[#C5A059] uppercase block mb-1">
                  ATMOSPHERIC COLLAGE
                </span>
                <h3 className="font-serif text-lg text-white font-medium tracking-tight">
                  Scent Profile Moodboard
                </h3>
                <p className="text-[10px] font-sans text-slate-400 mt-1 leading-relaxed">
                  Visualisasi elemen sensorik, emosi terpendam, & material pembentuk mahakarya heliosentris
                </p>
              </div>

              {/* Interactive Moodboard Slideshow */}
              <div className="relative z-10 w-full aspect-square rounded-2xl overflow-hidden border border-[#C5A059]/25 bg-slate-950 flex flex-col justify-end group transition-all duration-500 hover:shadow-[0_0_30px_rgba(197,160,89,0.12)]">
                {/* Background Image of current slide with subtle pan-in or opacity-fading */}
                <img 
                  src={MOODBOARD_SLIDES[currentSlide].img}
                  alt={MOODBOARD_SLIDES[currentSlide].title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-all duration-700 scale-102 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark Vignette and Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
                
                {/* Golden star map constellation line above slide */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
                
                {/* Floating Info Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                  <span className={`text-[8px] font-mono font-bold px-2.5 py-1 rounded bg-slate-950/85 border border-[#C5A059]/30 ${MOODBOARD_SLIDES[currentSlide].accentColor}`}>
                    {MOODBOARD_SLIDES[currentSlide].subtitle}
                  </span>
                  <span className="text-xs bg-slate-950/80 p-1 rounded-full text-white/90 font-sans leading-none flex items-center justify-center w-6 h-6 border border-white/5 shadow-md">
                    {MOODBOARD_SLIDES[currentSlide].icon}
                  </span>
                </div>

                {/* Left and Right Chevron Navigation Overlay */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? MOODBOARD_SLIDES.length - 1 : prev - 1))}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-slate-950/90 hover:bg-[#C5A059]/20 text-slate-450 hover:text-white border border-white/10 hover:border-[#C5A059]/40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 active:scale-90"
                  title="Slide Sebelumnya"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setCurrentSlide((prev) => (prev === MOODBOARD_SLIDES.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-slate-950/90 hover:bg-[#C5A059]/20 text-slate-450 hover:text-white border border-white/10 hover:border-[#C5A059]/40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 active:scale-90"
                  title="Slide Selanjutnya"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Current Slide Content Overlay */}
                <div className="relative z-10 p-5 space-y-1.5 text-left bg-gradient-to-t from-slate-950 to-slate-950/0 pt-16">
                  <h4 className="text-xs font-serif font-semibold text-white tracking-tight flex items-center gap-1.5">
                    {MOODBOARD_SLIDES[currentSlide].title}
                  </h4>
                  <p className="text-[9px] text-slate-350 leading-relaxed font-sans font-light">
                    {MOODBOARD_SLIDES[currentSlide].desc}
                  </p>
                </div>
              </div>

              {/* Navigation Indicators & Pinterest Button Row */}
              <div className="mt-4 flex items-center justify-between z-10 gap-3">
                {/* Dots Indicator */}
                <div className="flex gap-1.5">
                  {MOODBOARD_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentSlide === idx 
                          ? 'w-5 bg-[#C5A059]' 
                          : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                      title={`Ke slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <a 
                  href="https://pinterest.com/search/pins/?q=cosmic%20perfume%20aesthetic%2520astronomy%252520antique"
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/45 hover:bg-rose-950/70 text-rose-300 hover:text-rose-200 border border-rose-500/20 text-[9px] font-mono transition-all group active:scale-95"
                >
                  <svg className="h-3 w-3 text-rose-450 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.396-5.889 1.396-5.889s-.357-.715-.357-1.774c0-1.664.962-2.906 2.164-2.906 1.019 0 1.512.765 1.512 1.682 0 1.025-.653 2.561-.99 3.985-.281 1.189.599 2.16 1.768 2.16 2.124 0 3.757-2.243 3.757-5.485 0-2.868-2.062-4.872-5.006-4.872-3.41 0-5.412 2.559-5.412 5.203 0 1.031.397 2.138.893 2.738a.362.362 0 0 1 .083.345l-.333 1.36c-.053.22-.172.269-.398.163-1.484-.691-2.412-2.859-2.412-4.601 0-3.743 2.723-7.182 7.842-7.182 4.128 0 7.339 2.943 7.339 6.877 0 4.103-2.587 7.404-6.178 7.404-1.206 0-2.34-.627-2.729-1.366l-.744 2.829c-.269 1.04-.995 2.34-1.481 3.14a11.97 11.97 0 0 0 3.493.518c6.621 0 11.988-5.367 11.988-11.988C24 5.367 18.638 0 12.017 0z"/>
                  </svg>
                  <span>Pinterest Mood</span>
                </a>
              </div>

              {/* Bottom Quote inside Moodboard */}
              <div className="mt-4 pt-3.5 border-t border-white/10 text-center relative z-10">
                <span className="text-[9.5px] font-serif italic text-slate-400 leading-relaxed block px-2">
                  "Menyatukan ketegangan intelektual dan rahasia alam semesta ke dalam harmoni botol penciuman."
                </span>
                
                <div className="flex items-center justify-center gap-2 mt-3 text-[9px] font-mono text-[#C5A059]">
                  <span className="h-1 w-1 rounded-full bg-sky-400 animate-ping" />
                  <span>PRESTIGE COLLECTIBLE NO. 1</span>
                  <span className="h-1 w-1 rounded-full bg-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HISTORICAL TIMELINE OBSERVATION (THE SCRIBES / MOMEN KETEGANGAN) */}
        <section id="observatory-logs" className="mb-24 scroll-mt-6 border-t border-slate-900 pt-16">
          <HistoricalJournal />
        </section>

        {/* 4. SCENT STRUCTURE EXPLORATION (LOGIKA SENSORIK INKLUSIF) */}
        <section id="scent-explorer-section" className="mb-24 scroll-mt-6 border-t border-slate-900 pt-16">
          <ScentExplorer />
          <ScentCabinet />
        </section>

        {/* 5. HELIOCENTRIC COPERNICAN PLANET SYSTEM */}
        <section id="cosmic-orbit-section" className="mb-24 scroll-mt-6 border-t border-white/10 pt-16">
          <HeliocentricCanvas />
        </section>

        {/* 6. INTERACTIVE TIMBANAN KEBERANIAN (REFLECTIVE PHILOSOPHICAL TRIVIA - "MENGAJAK BERPIKIR") */}
        <section id="courage-quiz" className="mb-24 scroll-mt-6 border-t border-white/5 pt-16">
          <div className="rounded-3xl glass-panel p-6 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
              <span className="text-[10px] font-mono tracking-[0.4em] text-[#C5A059] uppercase block">
                COGNITIVE DIALOGUE (TIMBANGAN KEBERANIAN)
              </span>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-white tracking-tight">
                Seberapa Berani Pikiran Anda Menembus Dogma?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed opacity-90 font-light">
                Di abad ke-16, mempercayai bumi berpindah tempat adalah pidana mati. 
                Ikuti uji logika 6 langkah yang mendalam ini untuk mengukur keselarasan jiwa rasional Anda dengan salah satu jawara heliosentrisme sejarah.
              </p>

              {/* Start state */}
              {courageState === 0 && (
                <div className="pt-4">
                  <button
                    id="btn-start-quiz"
                    onClick={() => setCourageState(1)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-[#C5A059]/10 border border-white/10 hover:border-[#C5A059]/35 text-[#C5A059] font-mono text-xs px-6 py-3.5 tracking-[0.15em] font-bold transition-all cursor-pointer"
                  >
                    <span>MULAI PENGGALIAN LOGIKA</span>
                    <ArrowRight className="h-4 w-4 text-[#C5A059]" />
                  </button>
                </div>
              )}

              {/* Dynamic Questions (1 to 6) */}
              {courageState >= 1 && courageState <= 6 && (() => {
                const question = QUIZ_QUESTIONS[courageState - 1];
                return (
                  <div className="space-y-5 pt-4">
                    <div className="text-xs font-mono text-[#C5A059] tracking-widest uppercase">
                      PERTANYAAN {courageState} DARI 6 // {question.category}
                    </div>
                    <h4 className="font-serif text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed">
                      "{question.text}"
                    </h4>
                    <div className="grid grid-cols-1 gap-3 max-w-xl mx-auto text-left pt-2">
                      {question.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          id={`btn-q${courageState}-opt${optIdx + 1}`}
                          onClick={() => handleAnswer(optIdx)}
                          className="rounded-xl p-4 text-xs text-slate-200 glass-panel glass-panel-interactive font-sans leading-relaxed text-left cursor-pointer transition-all hover:bg-[#C5A059]/5 hover:border-[#C5A059]/20 active:scale-98"
                        >
                          <span className="font-mono text-[#C5A059] font-bold mr-1.5">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>{" "}
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Result State (courageState === 7) */}
              {courageState === 7 && (
                <div className="space-y-5 pt-2 text-center max-w-2xl mx-auto animate-fadeIn">
                  <div className="text-xs font-mono text-emerald-400 tracking-[0.2em] uppercase flex items-center justify-center gap-1.5">
                    <History className="h-3.5 w-3.5" /> DIALECTICA COMPLETA // HASIL ANALISIS JIWA
                  </div>
                  
                  <div className="p-6 rounded-2xl glass-panel border-[#C5A059]/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/3 rounded-full filter blur-xl pointer-events-none" />
                    
                    <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block mb-1">
                      Karakter Kosmik Anda Sangat Selaras Dengan:
                    </span>
                    <h4 className="font-serif text-xl md:text-2xl font-bold mb-2 text-[#C5A059] tracking-tight">
                      {getMathedAstronomer().name}
                    </h4>
                    <p className="font-serif text-slate-300 text-xs md:text-sm italic mb-4 leading-normal opacity-90 text-center max-w-lg mx-auto">
                      {getMathedAstronomer().quote}
                    </p>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed text-left font-sans font-light bg-slate-950/45 border border-white/5 rounded-xl p-4">
                      {getMathedAstronomer().desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      id="btn-reset-quiz"
                      onClick={handleResetQuiz}
                      className="rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 text-xs font-mono text-slate-300 hover:text-[#C5A059] hover:bg-[#C5A059]/15 px-4.5 py-3 transition-all tracking-wider cursor-pointer active:scale-95"
                    >
                      Ulangi Pengujian Jiwa
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* 7. KOLOM REVIEW DAN KOMENTAR (KESAN SENSORIK) */}
        <section id="scent-reviews-section" className="mb-24 scroll-mt-6 border-t border-white/5 pt-16">
          <ScentReviews />
        </section>

        {/* 8. CREATOR CONNECTION / FOOTER (THE INSTAGRAM CONNECTOR) */}
        <section id="creator-instagram-section" className="scroll-mt-6 border-t border-white/5 pt-16">
          <CreatorProfile />
        </section>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-white/5 pt-8 text-center text-xs font-mono text-slate-400 space-y-2">
          <div className="tracking-wide">
            &copy; 2026 "On The Movement Of The Earth". Diikutsertakan dalam Kompetisi Event Grasse Van Java Vol2.
          </div>
          <div className="text-[10px] text-slate-500 font-light italic">
            Diterjemahkan secara puitis untuk audience rasional yang percaya bahwa kebenaran pada akhirnya akan membebaskan semesta.
          </div>
        </footer>
      </div>
    </div>
  );
}
