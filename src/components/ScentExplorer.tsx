/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SCENT_NOTES } from '../data';
import { ScentNote } from '../types';
import { Sparkles, Compass, Flame, Feather, BookOpen, Sun, Wind, Eye } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Maps string name of icon to corresponding Lucide Icon
const IconMapper: Record<string, React.ComponentType<any>> = {
  Sparkles: Sparkles,
  Sprout: Wind,
  Gauge: Compass,
  BookOpen: BookOpen,
  PenTool: Feather,
  Flame: Flame,
  Sun: Sun,
  Layers: Eye,
  Trees: SfTreesIcon,
};

// Custom simple tree render
function SfTreesIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22V12M12 12V6M12 12s2-2 4-2c2 0 4 2 4 2s-2 2-4 2c-2 0-4-2-4-2zm0 0s-2-2-4-2c-2 0-4 2-4 2s2 2 4 2c2 0 4-2 4-2z" />
    </svg>
  );
}

export default function ScentExplorer() {
  const [activeTier, setActiveTier] = useState<'top' | 'heart' | 'base'>('top');
  
  const activeNote = SCENT_NOTES.find(note => note.id === activeTier) || SCENT_NOTES[0];

  return (
    <div id="scent-profile" className="py-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f16]/0 via-amber-500/2 to-[#0c0f16]/0 pointer-events-none" />
      
      {/* Dynamic Scent Column/Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Note selector pyramid/bar on the left (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-amber-500/80 uppercase">
              STRUKTUR WEWANGIAN (SCENT ARCHITECTURE)
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-medium text-white tracking-tight mt-1 mb-4">
              Konstruksi Logika Sensorik
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Kami menyusun wewangian ini secara presisi bagai sebuah argumen matematika. 
              Mulai dari dinginnya kebohongan yang membeku (Top), perjuangan menuliskan naskah terlarang yang menegangkan (Heart), 
              hingga pancaran kehangatan matahari kebenaran yang tak terbentung (Base).
            </p>
          </div>

          {/* Core Interactive Tier Buttons stacked like a perfume pyramid */}
          <div className="space-y-4">
            {SCENT_NOTES.map((note) => {
              const isActive = note.id === activeTier;
              return (
                <button
                  key={note.id}
                  id={`btn-scent-tier-${note.id}`}
                  onClick={() => setActiveTier(note.id)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 relative overflow-hidden group ${
                    isActive 
                      ? 'glass-panel border-[#C5A059]/45 bg-[#C5A059]/6 shadow-[0_0_25px_rgba(197,160,89,0.08)]' 
                      : 'bg-white/3 border-white/8 hover:border-[#C5A059]/30 hover:bg-[#C5A059]/4'
                  }`}
                >
                  {/* Subtle progress highlight inside active card */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#C5A059] to-[#bf9543]" />
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase">
                        {note.id === 'top' ? 'TOP NOTE (0 - 15 Menit)' : note.id === 'heart' ? 'HEART NOTE (15 Menit - 2 Jam)' : 'BASE NOTE (2 Jam - Seharian)'}
                      </span>
                      <span className="font-serif text-xl font-medium text-white mt-1 group-hover:text-[#C5A059] transition-colors">
                        {note.title}
                      </span>
                      <span className="text-slate-300 text-xs mt-0.5 font-light">{note.subtitle}</span>
                    </div>
                    
                    {/* Circle icon showing visual status */}
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center border transition-all ${
                      isActive 
                        ? 'bg-[#C5A059]/15 border-[#C5A059]/40 text-[#C5A059]' 
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}>
                      <span className="text-xs font-mono font-bold">
                        {note.id === 'top' ? '01' : note.id === 'heart' ? '02' : '03'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Note detailed description container on the right (7 cols) */}
        <div id="scent-tier-detail" className="lg:col-span-7 rounded-3xl glass-panel p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
          
          {/* Dynamic soft background blur reflecting the note tier */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${activeNote.bgGradient} rounded-full filter blur-[120px] pointer-events-none opacity-50`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNote.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col h-full justify-between gap-8"
            >
              <div>
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  ARSITEKTUR OLFACTORI: TIER {activeNote.id.toUpperCase()}
                </span>
                
                <h4 className="font-serif text-2xl font-semibold text-white tracking-wide mt-1.5 mb-1 text-[#C5A059]">
                  {activeNote.title}
                </h4>
                <p className="text-slate-200 font-serif text-sm italic mb-4">
                  “{activeNote.subtitle}”
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                  {activeNote.philosophy}
                </p>

                {/* Scent notes ingredient cards */}
                <div className="space-y-3.5">
                  <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    KOMPOSISI NARASI OLFAKTORI UTAMA:
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {activeNote.ingredients.map((ing, k) => {
                      const LucideIcon = IconMapper[ing.icon] || Sparkles;
                      return (
                        <div 
                          key={k} 
                          className="rounded-xl glass-panel-amber p-4 flex flex-col justify-between hover:border-[#C5A059]/35 hover:bg-white/5 transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-2 text-[#C5A059] mb-2">
                            <LucideIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-mono font-bold tracking-wide text-white">
                              {ing.name}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-300 leading-relaxed font-light">
                            {ing.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Olfactory profile summary statement */}
              <div className="border-t border-white/10 pt-5 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${activeNote.color}`} />
                  <span className="text-xs font-mono text-slate-300">
                    Kesan Utama: {activeNote.olfactoryDesc}
                  </span>
                </div>
                <div className="text-[9px] font-mono text-[#C5A059] tracking-widest uppercase flex items-center gap-1.5 font-bold">
                  <span>✔ PREMIUM QUALITY EXCELLENCE</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
