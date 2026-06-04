import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, Leaf, Shield, Compass, BookOpen, Layers, Wind, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Material {
  name: string;
  category: 'molecules' | 'woods' | 'resins' | 'citrus' | 'florals' | 'herbal';
  categoryLabel: string;
  profile: string;
  intensity: 'High' | 'Medium' | 'Subtle';
  noteRole: 'Top' | 'Heart' | 'Base' | 'Bridge';
  roleTag: string;
}

const MATERIALS_DATA: Material[] = [
  {
    name: 'Iso E Super',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Woody, amber-like, velvety. Memberikan efek transparan, sejuk, dan memancar.',
    intensity: 'Medium',
    noteRole: 'Bridge',
    roleTag: 'Pondasi Utama Sillage & Carrier Beludru'
  },
  {
    name: 'Hedione',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Fresh jasmine, radiant, airy. Memberikan efek sillage udara segar dan kecemerlangan bunga.',
    intensity: 'Medium',
    noteRole: 'Bridge',
    roleTag: 'Katalisator Difusi & Luminositas Udara'
  },
  {
    name: 'Ambroxan',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Ambergris, woody, paper-like. Sangat tahan lama, memberikan sensasi hangat dan sensual.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Jangkar Ambergris Kosmis & Fiksatif Utama'
  },
  {
    name: 'Cedarwood Virginia',
    category: 'woods',
    categoryLabel: 'Woody & Earthy',
    profile: 'Cedar alami, dry pencil-shaving, resinous. Kayu yang memberikan atmosfer kuil tua dan ketenangan.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Struktur Kayu Kering & Pengikat Resinous'
  },
  {
    name: 'Cendana Kupang / Santalum album',
    category: 'woods',
    categoryLabel: 'Woody & Earthy',
    profile: 'Sandalwood premium, creamy, milky, buttery. Bahan alami eksotis penghubung ketenangan kosmologis.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Puncak Kelembutan Creamy & Meditasi Kosmis'
  },
  {
    name: 'Vetiver Java Oil',
    category: 'woods',
    categoryLabel: 'Woody & Earthy',
    profile: 'Smoky, earthy, root-like. Minyak akar vetiver Jawa kasar, tebal, misterius, dan beraliran bumi purba.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Garis Akar Tectonic & Karakter Smoky Earthy'
  },
  {
    name: 'Patchouli Light',
    category: 'woods',
    categoryLabel: 'Woody & Earthy',
    profile: 'Earthy, patchouli, herbal, clean. Nilam jernih untuk aroma bumi yang lebih transparan dan modern.',
    intensity: 'Medium',
    noteRole: 'Base',
    roleTag: 'Nuansa Tekstur Tanah Lembap & Perkamen Basah'
  },
  {
    name: 'Helvetolide',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Pear-like musk, soft, synthetic. Musk buah pir modern bertekstur empuk yang melayang lembut.',
    intensity: 'Medium',
    noteRole: 'Top',
    roleTag: 'Volume Musk Awal & Struktur Awan Nebula'
  },
  {
    name: 'Habanolide',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Metalik musk, clean starch, powdery. Musk lilin panas dan kain bersih dengan nuansa modernitas berkelas.',
    intensity: 'Medium',
    noteRole: 'Heart',
    roleTag: 'Suhu Lilin Panas & Kebersihan Lembaran Logika'
  },
  {
    name: 'Ambrettolide',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Sweet ambrette, fruity musk, velvety. Musk elegan dari biji ambrette natural, memancar indah.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Pancaran Musk Botani Premium & Jembatan Naturalis'
  },
  {
    name: 'Bergamot FCF',
    category: 'citrus',
    categoryLabel: 'Citrus & Fresh',
    profile: 'Earl grey tea, zesty, clean citrus. Bergamot premium yang bebas dari furanocoumarin, bersih dari bayang-bayang kimia.',
    intensity: 'Medium',
    noteRole: 'Top',
    roleTag: 'Sinar Matahari Pagi & Gerbang Utama Kecerahan'
  },
  {
    name: 'Cardamom',
    category: 'resins',
    categoryLabel: 'Spices & Resins',
    profile: 'Green, spicy, aromatic, warm. Kapulaga eksotis pembawa gairah pedas aromatik segar di detik awal wewangian.',
    intensity: 'High',
    noteRole: 'Top',
    roleTag: 'Letupan Rempah Dingin & Percikan Intelektual'
  },
  {
    name: 'Pink Pepper CO₂',
    category: 'resins',
    categoryLabel: 'Spices & Resins',
    profile: 'Bright peppery, sparkling rose, fresh. Ekstraksi CO2 lada merah muda yang berdenyut cepat and berenergi.',
    intensity: 'High',
    noteRole: 'Top',
    roleTag: 'Vibrasi Pedas Dinamis & Friksi Awal Ide'
  },
  {
    name: 'Clary Sage',
    category: 'herbal',
    categoryLabel: 'Herbal & Green',
    profile: 'Ambery sage, tea-like, herbal. Karakter herbal alami yang menenangkan dengan landasan ambery halus.',
    intensity: 'Medium',
    noteRole: 'Heart',
    roleTag: 'Jembatan Penenteram Ambery Herbal & Teh'
  },
  {
    name: 'Aldehyde C-12 MNA',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Metallic, waxy, citrus peel. Aldehida kosmik, memberi efek salju dingin membeku dan kilau instrumen logam.',
    intensity: 'High',
    noteRole: 'Top',
    roleTag: 'Salju Frosting Kosmis & Kilau Logam Kompas'
  },
  {
    name: 'Floralozone',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Fresh ocean air, ozonic, clean. Seperti udara pegunungan tinggi setelah badai petir, menembus ruang kabut.',
    intensity: 'High',
    noteRole: 'Top',
    roleTag: 'Arus Udara Stratosfer & Kesegaran Angin Badai'
  },
  {
    name: 'Helional',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Watery floral, green, melon. Efek embun pagi dingin bernuansa melon yang meresap pada perkamen lama.',
    intensity: 'Medium',
    noteRole: 'Top',
    roleTag: 'Efek Embun Hijau & Kabut Hiasan Cakrawala'
  },
  {
    name: 'Dihydromyrcenol',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Ultra-fresh, metallic lavender, lime. Ledakan kesegaran tajam bagaikan prisma kaca yang membiaskan cahaya.',
    intensity: 'High',
    noteRole: 'Top',
    roleTag: 'Refraksi Prisma Cahaya & Ledakan Kesegaran Tajam'
  },
  {
    name: 'Theaspirane',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Black tea, berry-like, woody. Aroma teh hitam bernuansa misterius yang menyulam transisi dengan elegan.',
    intensity: 'Medium',
    noteRole: 'Heart',
    roleTag: 'Rajutan Teh Hitam Misterius & Transisi Halus'
  },
  {
    name: 'Mate Absolute',
    category: 'herbal',
    categoryLabel: 'Herbal & Green',
    profile: 'Tobacco-like, dark herbal, rich tea. Absolut teh mate Amerika Selatan yang intens, bersahaja, dan penuh rahasia.',
    intensity: 'High',
    noteRole: 'Heart',
    roleTag: 'Suasana Ruang Belajar Malam & Daun Tembakau Kering'
  },
  {
    name: 'Lavender Oil',
    category: 'herbal',
    categoryLabel: 'Herbal & Green',
    profile: 'Classical herbal lavender, soothing. Lavender klasik murni minyak atsiri, sejuk menenteramkan hiruk-pikuk spekulasi.',
    intensity: 'Medium',
    noteRole: 'Top',
    roleTag: 'Keheningan Kubah Bintang & Relaksasi Klasik'
  },
  {
    name: 'Ylang-Ylang Extra',
    category: 'florals',
    categoryLabel: 'Exotic Florals',
    profile: 'Rich exotic floral, banana-like, narcotic. Bunga kenanga tropis berkualitas ekstra yang megah, sensual, dan memabukkan.',
    intensity: 'High',
    noteRole: 'Heart',
    roleTag: 'Puncak Eksotisme Bunga & Sensualitas Hangat'
  },
  {
    name: 'Orris Givco',
    category: 'florals',
    categoryLabel: 'Exotic Florals',
    profile: 'Powdery iris, violet-like, woody root. Rekonstruksi akar Orris termewah, memberi tekstur beludru agung.',
    intensity: 'High',
    noteRole: 'Heart',
    roleTag: 'Sentuhan Beludru Kerajaan & Tekstur Lilin Segel'
  },
  {
    name: 'Guaiacwood',
    category: 'woods',
    categoryLabel: 'Woody & Earthy',
    profile: 'Smoky pyrogenated wood, sweet balsamic. Kayu guaiac membawa kesan pembakaran lilin lilin kuno katedral.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Kehangatan Lilin Katedral & Asap Wood Bakar Kuno'
  },
  {
    name: 'Styrax Resinoid',
    category: 'resins',
    categoryLabel: 'Spices & Resins',
    profile: 'Spicy, sweet-balsamic, leathery. Resin tebal kuno dengan daya ikat aroma yang sangat tinggi.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Perekat Resin Kuno & Kilau Kulit Klasik'
  },
  {
    name: 'Benzoin Sumatera',
    category: 'resins',
    categoryLabel: 'Spices & Resins',
    profile: 'Vanilla-like resin, warm, powdery. Kemenyan Sumatera manis eksotis yang menenangkan jalannya detak denyut parfum.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Bantal Amber Manis & Penghangat Alur Formula'
  },
  {
    name: 'Cistus Labdanum',
    category: 'resins',
    categoryLabel: 'Spices & Resins',
    profile: 'Ambery, animalic resin, deep woody. Resin labdanum mediterania jembatan esensial untuk kehangatan abadi.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Inti Energi Solstis & Kehangatan Abadi'
  },
  {
    name: 'Cashmeran',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Velvet wood, concrete musk, wet stone. Perpaduan kontras kelembutan wol kasmir dan basahnya lantai observatorium.',
    intensity: 'High',
    noteRole: 'Bridge',
    roleTag: 'Harmoni Wol Kasmir & Lantai Basah Observatorium'
  },
  {
    name: 'Norlimbanol',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Dry timber, extreme amberwood, bone-dry. Super-amber kering ekstrem, perkasa sekuat kubah astronomi.',
    intensity: 'High',
    noteRole: 'Base',
    roleTag: 'Skeletal Astrolabe & Kedalaman Hampa Kosmis'
  },
  {
    name: 'Black Pepper',
    category: 'resins',
    categoryLabel: 'Spices & Resins',
    profile: 'Sharp spicy, woody, electric. Lada hitam penyengat indra, membawa letupan dinamika revolusi intelektual.',
    intensity: 'High',
    noteRole: 'Top',
    roleTag: 'Percikan Tegangan Aksioma & Dinamika Sensorik'
  },
  {
    name: 'Globanone',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Soft macrocyclic musk, powdery, clean. Musk penyeimbang, menyatukan formula menjadi harmoni utuh.',
    intensity: 'Subtle',
    noteRole: 'Base',
    roleTag: 'Pengikat Orbital Musk & Penyelaras Harmoni'
  },
  {
    name: 'Veramos',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Oakmoss alternative, marine earthy. Keharuman lumut pohon kuno yang bebas alergen, memberi struktur alas rimba.',
    intensity: 'Medium',
    noteRole: 'Base',
    roleTag: 'Struktur Lumut Alas Rimba & Dasar Hijau Abadi'
  },
  {
    name: 'Tuberose Absolute',
    category: 'florals',
    categoryLabel: 'Exotic Florals',
    profile: 'Carnal flower, green, creamy tuberose. Sedap malam alami absolut yang sensual, berbobot, dan membius benak.',
    intensity: 'High',
    noteRole: 'Heart',
    roleTag: 'Detail Kontras Sedap Malam & Paradoks Eksotis'
  },
  {
    name: 'Eucalyptol',
    category: 'herbal',
    categoryLabel: 'Herbal & Green',
    profile: 'Mentholic, camphorous, cineolic. Sensasi dingin mendalam yang langsung menjernihkan pikiran di bukit pengamatan.',
    intensity: 'High',
    noteRole: 'Top',
    roleTag: 'Hembusan Angin Utara Pembuka Fokus Pikiran'
  },
  {
    name: 'Juniper berry',
    category: 'citrus',
    categoryLabel: 'Citrus & Fresh',
    profile: 'Gin-like, pinene, aromatic fresh. Kesegaran buah juniper berkelas, membawa sensasi dingin pinus Nordik.',
    intensity: 'Medium',
    noteRole: 'Top',
    roleTag: 'Kesegaran Glacial Pine & Gin Dingin Pegunungan'
  },
  {
    name: 'Coumarin',
    category: 'resins',
    categoryLabel: 'Spices & Resins',
    profile: 'Sweet hay, almond, tonka bean. Aromatisasi jerami manis dan almond panggang di pedesaan Eropa Tengah.',
    intensity: 'Medium',
    noteRole: 'Base',
    roleTag: 'Sentuhan Pedesaan Eropa & Jerami Manis Klasik'
  },
  {
    name: 'Jasmin EO by Moksa',
    category: 'florals',
    categoryLabel: 'Exotic Florals',
    profile: 'Indolic jasmine, sweet floral, rich. Minyak atsiri melati natural beraura eksotis, tebal penuh kemurungan indah.',
    intensity: 'High',
    noteRole: 'Heart',
    roleTag: 'Kemisteriusan Melati Indolik & Kedalaman Malam'
  },
  {
    name: 'Cyclamen aldehyde',
    category: 'molecules',
    categoryLabel: 'Aroma Molecule',
    profile: 'Rhubarb floral, green, wet soil. Keharuman bunga cyclamen liar setelah diterpa hujan di tanah gembur.',
    intensity: 'Medium',
    noteRole: 'Heart',
    roleTag: 'Cakrawala Bunga Liar Setelah Hujan Deras'
  },
  {
    name: 'Grapefruit',
    category: 'citrus',
    categoryLabel: 'Citrus & Fresh',
    profile: 'Sulfuric citrus, bitter-sweet, sparkling. Jeruk limau gadang dengan rasa pahit-manis, membangkitkan binar energi.',
    intensity: 'High',
    noteRole: 'Top',
    roleTag: 'Binar Energi Pahit-Manis Fajar Heliosentris'
  }
];

export default function ScentCabinet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'molecules' | 'woods' | 'resins' | 'citrus' | 'florals' | 'herbal'>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const categories = [
    { id: 'all', label: 'Semua', icon: Layers },
    { id: 'molecules', label: 'Molekul Sintetis', icon: Sparkles },
    { id: 'woods', label: 'Kayu Alami', icon: Compass },
    { id: 'resins', label: 'Rempah & Resin', icon: Leaf },
    { id: 'citrus', label: 'Citrus Segar', icon: Wind },
    { id: 'florals', label: 'Bunga Eksotis', icon: Droplets },
    { id: 'herbal', label: 'Herbal Hijau', icon: BookOpen }
  ];

  const filteredMaterials = useMemo(() => {
    return MATERIALS_DATA.filter((m) => {
      const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.roleTag.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div id="materials-cabinet" className="py-12 border-t border-white/10 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/1 to-blue-500/1 pointer-events-none" />
      
      <div className="mb-8">
        <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
          ORGAN DE PARFUMERIE (CABINET BAHAN)
        </span>
        <h3 className="font-serif text-3xl font-medium text-white tracking-tight mt-1 mb-3">
          Galeri 39 Formula Material Yang Saya Pakai
        </h3>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed font-light">
          Berikut adalah katalog lengkap material mentah, molekul berteknologi tinggi, maupun koleksi 
          ekstrak botani alami yang diramu secara presisi untuk mewujudkan karya wewangian heliosentris ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left main pane (Filters & Cards grid) - 8 columns */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama material, profil aroma..."
                className="w-full bg-white/4 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A059]/50 transition-all"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            </div>

            {/* Total Indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/3 border border-white/5 rounded-lg text-[10px] font-mono text-slate-400">
              <span>Menunjukkan:</span>
              <span className="text-[#C5A059] font-bold">{filteredMaterials.length}</span>
              <span>/ 39</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pb-1 border-b border-white/5 overflow-x-auto scroller-subtle">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-mono transition-all uppercase cursor-pointer ${
                    isActive 
                      ? 'bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30' 
                      : 'bg-white/3 border border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CatIcon className="h-3 w-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Grid of Materials */}
          {filteredMaterials.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-12 text-center text-slate-500 text-xs font-mono">
              Tidak ada material yang cocok dengan kriteria pencarian Anda.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredMaterials.map((mat) => {
                const isSelected = selectedMaterial?.name === mat.name;
                return (
                  <button
                    key={mat.name}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`rounded-xl p-4 text-left border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                      isSelected 
                        ? 'bg-[#C5A059]/8 border-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.05)]' 
                        : 'bg-white/3 border-white/5 hover:border-white/12 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex flex-col justify-between h-full space-y-2 relative z-10">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[8px] font-mono text-[#C5A059]/80 uppercase tracking-wider">
                            {mat.categoryLabel}
                          </span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                            mat.noteRole === 'Top' ? 'bg-sky-500/10 text-sky-400' :
                            mat.noteRole === 'Heart' ? 'bg-amber-500/10 text-amber-400' :
                            mat.noteRole === 'Base' ? 'bg-purple-500/10 text-purple-400' :
                            'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {mat.noteRole}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-white group-hover:text-[#C5A059] transition-colors leading-tight">
                          {mat.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-400 font-light line-clamp-2 leading-relaxed">
                        {mat.profile}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-tr from-transparent to-[#C5A059]/20 filter blur-xs rounded-bl-full" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Detail Pane - 4 columns */}
        <div className="lg:col-span-4 sticky top-6">
          <div className="rounded-2xl glass-panel p-5 border border-white/8 relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#C5A059]/3 rounded-full filter blur-xl pointer-events-none" />

            {selectedMaterial ? (
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase">
                    KARTU DETAIL SPEKTROMETRI SENSORIK
                  </span>
                  <button 
                    onClick={() => setSelectedMaterial(null)}
                    className="text-slate-500 hover:text-white text-[10px] font-mono uppercase cursor-pointer"
                  >
                    Tutup [x]
                  </button>
                </div>

                <div>
                  <h4 className="font-serif text-2xl font-bold text-white tracking-tight">
                    {selectedMaterial.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="bg-white/3 border border-white/5 text-slate-300 text-[10px] font-mono rounded px-2 py-0.5">
                      {selectedMaterial.categoryLabel}
                    </span>
                    <span className="bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-mono rounded px-2 py-0.5 border border-[#C5A059]/20">
                      Tier: {selectedMaterial.noteRole} Note
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-3 border-t border-white/5 text-xs text-slate-300 leading-relaxed font-light">
                  <div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase block mb-1">PROFIL OLFAKTORI:</span>
                    <p className="bg-white/2 rounded-lg p-3 border border-white/5">{selectedMaterial.profile}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase block mb-1">PERAN UTAMA DALAM REVOLUSI:</span>
                    <p className="font-serif text-[#C5A059] italic text-sm">
                      “{selectedMaterial.roleTag}”
                    </p>
                  </div>

                </div>
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <div className="h-12 w-12 rounded-full border border-dashed border-white/20 flex items-center justify-center mx-auto text-slate-500">
                  <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '24s' }} />
                </div>
                <div className="space-y-1">
                  <h5 className="font-serif text-sm font-semibold text-white">
                    Pilih Salah Satu Material
                  </h5>
                  <p className="text-[11px] text-slate-500 font-mono leading-relaxed max-w-xs mx-auto">
                    Ketuk material di rak sebelah kiri untuk melakukan dekonstruksi molekul dan meneliti catatan filosofisnya.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
