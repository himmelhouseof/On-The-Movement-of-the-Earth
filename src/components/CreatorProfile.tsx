/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Instagram, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';

export default function CreatorProfile() {
  const instagramHandle = 'megatrvh';
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  // Recommended feed curation mock cards
  const MOCK_INSTAGRAM_POSTS = [
    {
      id: 1,
      title: 'Post I: Mood Board',
      tag: 'VISUAL INSPIRASI',
      image: 'https://i.pinimg.com/736x/69/ed/f1/69edf155cb1f867098db59b98107f8c8.jpg',
      caption: 'Langit indah yang dingin dan menusuk, menandakan kekangan ide dan kebenaran yang luar biasa.',
      likes: '142',
    },
    {
      id: 2,
      title: 'Post II: Behind The Scenes',
      tag: 'BOM INSPIRASI WANGI',
      image: 'https://i.pinimg.com/736x/06/2a/51/062a514756c04afe745cab0bca207d42.jpg',
      caption: 'Manuscript tua yang menjadi catatan Nicolaus Copernicus sebagai bukti kebenaran mengenai Heliosentris.',
      likes: '98',
    },
    {
      id: 3,
      title: 'Post III: Teaser Video',
      tag: 'FILOSOFI REELS',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400',
      caption: 'Cahaya pagi menembus celah jendela menara kayu perpustakaan lama. "The Earth moves, and so does the truth."',
      likes: '231',
    }
  ];

  return (
    <div 
      id="creator-connection" 
      className="rounded-3xl glass-panel p-6 md:p-10 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        
        {/* Left Column: Creator Identity & Pitch (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C5A059]/10 px-3 py-1 text-xs font-mono text-[#C5A059] border border-[#C5A059]/25">
            <Sparkles className="h-3 w-3" />
            <span>THE STORY BEHIND THE SCENT</span>
          </div>

          <h3 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight">
            “Setiap Aroma Memiliki Jiwa, Setiap Botol Memiliki Ideologi.”
          </h3>

          <p className="text-slate-350 text-sm md:text-base leading-relaxed font-light">
            <span className="font-serif text-[#C5A059] text-lg font-bold">"On The Movement Of The Earth"</span> bukanlah sekadar wewangian 
            pribadi. Ini adalah cara saya menghidupkan kembali idealisme, detak jantung, dan keberanian para astronom yang rela 
            mengorbankan kemapanan hidup demi fajar ilmu pengetahuan heliosentris yang sejati. 
          </p>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
            Sebagai perancang wewangian eksperimental ini, saya mengundang Anda, audience kompetisi, dan pencinta sejarah untuk bertukar pikiran 
            mengenai hubungan mendalam antara penciuman sensorik, visual astronomi, dan pergulatan akal melawan dogma. 
          </p>

          {/* Primary CTA Button */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              id="link-go-to-instagram"
              href="https://www.instagram.com/megatrvh/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#bf9543] hover:from-[#d6b473] hover:to-[#C5A059] px-6 py-3.5 text-xs font-mono font-bold text-black shadow-lg shadow-[#C5A059]/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Instagram className="h-4.5 w-4.5" />
              <span>KUNJUNGI INSTAGRAM KREATOR</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Dynamic Instagram Mock grid display (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl glass-panel p-5 shadow-2xl relative">
          
          {/* Header of simulated IG phone app */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#C5A059] to-yellow-300 p-0.5">
                <div className="h-full w-full rounded-full bg-[#121622] flex items-center justify-center">
                  <span className="font-serif text-[10px] text-white font-bold">O</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white flex items-center gap-1">
                  <span>@{instagramHandle || 'megatrvh'}</span>
                  <div className="h-3 w-3 rounded-full bg-[#C5A059] flex items-center justify-center text-[7px] text-black font-bold">&#10003;</div>
                </div>
                <div className="text-[9px] font-mono text-slate-400">Scented History Project</div>
              </div>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="text-slate-350 text-[11px] leading-relaxed mb-4 font-light">
            Kami merekomendasikan penataan <span className="text-[#C5A059] font-bold">Aesthetic Grid</span> di bawah ini pada profil Anda agar selaras dengan kompetisi wewangian:
          </div>

          {/* Grids list */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {MOCK_INSTAGRAM_POSTS.map((post) => (
              <div 
                key={post.id}
                onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer hover:scale-[1.02] transition-transform ${
                  selectedPost === post.id ? 'border-[#C5A059]' : 'border-white/5'
                }`}
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <span className="text-[8px] font-mono text-[#C5A059] uppercase tracking-wider">{post.tag}</span>
                  <div className="text-[9px] font-mono text-white leading-tight font-bold">{post.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Post view mock */}
          <div className="glass-panel-amber rounded-xl p-3 min-h-[92px] flex flex-col justify-between">
            {selectedPost !== null ? (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-mono text-[#C5A059] font-bold">
                    {MOCK_INSTAGRAM_POSTS[selectedPost - 1].tag}
                  </span>
                  <span className="text-[9px] font-mono text-slate-300">
                    ♥ {MOCK_INSTAGRAM_POSTS[selectedPost - 1].likes} menyukai
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed font-sans font-light">
                  {MOCK_INSTAGRAM_POSTS[selectedPost - 1].caption}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center ">
                <BookOpen className="h-5 w-5 text-slate-500 mb-1.5" />
                <span className="text-[10px] font-mono text-slate-400">
                  Ketuk salah satu kotak postingan di atas untuk membaca deskripsi panduan caption feed.
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
