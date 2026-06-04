/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HISTORICAL_MOMENTS } from '../data';
import { AstronomerMoment } from '../types';
import { Calendar, MapPin, Wind, Sparkles, AlertCircle, Quote, Feather } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function HistoricalJournal() {
  const [activeMomentId, setActiveMomentId] = useState<string>('moment1');
  
  const activeMoment = HISTORICAL_MOMENTS.find(m => m.id === activeMomentId) || HISTORICAL_MOMENTS[0];

  return (
    <div 
      id="historical-timeline" 
      className="py-8 relative"
    >
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800/60 -translate-y-1/2 -z-10 hidden md:block" />
      
      {/* 1. Traditional Astronomical Timeline Navigation (Timeline slider look) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-4 relative z-10">
        <div className="text-center md:text-left">
          <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase">
            CHRONOLOGY OF TRUTH (KRONOLOGI SEJARAH)
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-medium text-white tracking-tight mt-1">
            Lembar Observasi yang Menegangkan
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Ikuti kilas balik perjuangan gagasan heliosentrisme di bawah selimut tirani dogma.
          </p>
        </div>

        {/* Timesteps */}
        <div className="flex items-center gap-2.5 glass-panel p-2 rounded-2xl shadow-sm">
          {HISTORICAL_MOMENTS.map((moment) => {
            const isActive = moment.id === activeMomentId;
            return (
              <button
                key={moment.id}
                id={`btn-moment-year-${moment.year}`}
                onClick={() => setActiveMomentId(moment.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-350 flex flex-col items-center ${
                  isActive 
                    ? 'bg-[#C5A059] text-black shadow-lg shadow-[#C5A059]/10 scale-105' 
                    : 'bg-white/4 text-slate-350 hover:text-white hover:bg-white/8 border border-white/5'
                }`}
              >
                <span>{moment.year}</span>
                <span className={`text-[8px] font-normal tracking-normal mt-0.5 ${isActive ? 'text-black/80' : 'text-slate-450'}`}>
                  {moment.id === 'moment1' ? 'Copernicus' : moment.id === 'moment2' ? 'Galileo' : 'Inkuisisi'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Logbook Layout Render */}
      <div id="journal-view" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Big vintage log book page (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl glass-panel p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle ink blot watermark look */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-slate-950/20 rounded-full filter blur-[40px] opacity-40 pointer-events-none border border-white/5" />
          <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMoment.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 relative z-10"
            >
              {/* Header coordinate bar */}
              <div className="flex flex-wrap items-center justify-between border-b border-white/5 pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/25 flex items-center justify-center text-[#C5A059]">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">LOG OBSERVASI TAHUN</div>
                    <div className="text-sm font-mono text-white font-bold">{activeMoment.year} AC</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">KOORDINAT OBSERVATORI</div>
                    <div className="text-xs font-mono text-[#C5A059]">{activeMoment.coordinates}</div>
                  </div>
                </div>
              </div>

              {/* Main journal text styled like an vintage manuscript page */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Feather className="h-4 w-4 text-[#C5A059]/70" />
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">CATATAN PERISTIWA</span>
                </div>
                <h4 className="font-serif text-2xl md:text-3xl font-medium text-white tracking-wide leading-tight text-[#C5A059]">
                  {activeMoment.title}
                </h4>
                
                {/* Immersive quote block */}
                <div className="relative pl-5 py-2 border-l-2 border-[#C5A059]/30">
                  <Quote className="absolute -top-1 -left-1 h-5 w-5 text-[#C5A059]/5 rotate-180" />
                  <p className="text-slate-200 text-sm italic font-serif leading-relaxed">
                    "{activeMoment.text}"
                  </p>
                </div>

                {/* Highly descriptive story (atmospheric vignette) */}
                <div className="space-y-3 pt-2">
                  <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">DOKUMENTASI ATMOSFERIK:</div>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
                    {activeMoment.historicalVignette}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer of logbook */}
          <div className="border-t border-white/5 pt-5 mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono relative z-10">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-[#C5A059] font-bold">&#10022;</span>
              <span>Dokumen historis direstorasi untuk wawasan wewangian audience.</span>
            </div>
            <div className="text-[10px] text-slate-400">
              ID: {activeMoment.id.toUpperCase()} // ATTESTATUM VERITAS
            </div>
          </div>
        </div>

        {/* Right Column: Key facts / Scientific analysis & sensory link (4 cols) */}
        <div id="historical-scent-analysis" className="lg:col-span-4 rounded-3xl glass-panel p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMoment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 h-full flex flex-col justify-between relative z-10"
            >
              <div className="space-y-5">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase">
                    PEMBUKTIAN ILMIAH
                  </span>
                  <h5 className="font-serif text-lg font-medium text-white tracking-tight mt-1 mb-2.5 text-[#C5A059]">
                    Revolusi Logika
                  </h5>
                  <p className="text-slate-300 text-xs leading-relaxed font-light">
                    {activeMoment.scientificDiscovery}
                  </p>
                </div>

                <hr className="border-white/5" />

                <div>
                  <div className="flex items-center gap-1.5 text-[#C5A059] mb-2">
                    <Wind className="h-4.5 w-4.5" />
                    <span className="text-[10px] font-mono tracking-wider font-bold">AMBIENT SOUNDSCAPE</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed italic bg-white/5 p-3 rounded-xl border border-white/5">
                    "{activeMoment.ambience}"
                  </p>
                </div>
              </div>

              {/* Olfactory profile tie-in inside this historic card */}
              <div className="pt-6 border-t border-white/5 mt-6 md:mt-0">
                <span className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase block mb-1.5">
                  RESONANSI OLFAKTORI:
                </span>
                <div className="rounded-xl bg-[#C5A059]/5 border border-[#C5A059]/15 p-3.5 text-xs text-slate-300 shadow-sm">
                  <div className="font-serif text-[#C5A059] font-medium mb-1">
                    {activeMoment.id === 'moment1' 
                      ? 'Relevansi: Top Note (Cold Air & Bergamot)' 
                      : activeMoment.id === 'moment2'
                      ? 'Relevansi: Heart Note (Tea Vapor & Manuscript Woods)'
                      : 'Relevansi: Base Note (Cendana Kupang & Skin Musk)'}
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-light">
                    {activeMoment.id === 'moment1' 
                      ? 'Keheningan malam observasi berselimut udara dingin Baltik diwakili oleh kesegaran citrus Bergamot, Cardamom, dan hembusan mineral udara dingin.' 
                      : activeMoment.id === 'moment2'
                      ? 'Goresan pena Galileo menyalin gugusan kosmis diwakili oleh aroma kertas tua Manuscript Woods, lavender, dan kelembutan Tea Vapor.'
                      : 'Kepasrahan Galileo dengan keyakinan luhurnya diluluhkan dalam kelembutan Cendana Kupang murni, kehangatan Benzoin Sumatera, dan Skin Musk.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
