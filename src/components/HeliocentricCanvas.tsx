/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { PLANETS_HELIO } from '../data';
import { PlanetData } from '../types';
import { Space, Compass, Play, Pause, RotateCw, Info, Sparkles } from 'lucide-react';

export default function HeliocentricCanvas() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData>(PLANETS_HELIO[0]); // Default to Sun
  const [orbitalSpeedMultiplier, setOrbitalSpeedMultiplier] = useState<number>(1.0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [orbitalAngles, setOrbitalAngles] = useState<Record<string, number>>({
    mercury: 45,
    venus: 120,
    earth: 200,
    mars: 310,
    jupiter: 80,
  });
  
  const animationRef = useRef<number | null>(null);

  // Animation frame loop to update angles
  useEffect(() => {
    if (!isRotating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000; // in seconds
      lastTime = now;

      setOrbitalAngles((prev) => {
        const next = { ...prev };
        PLANETS_HELIO.forEach((planet) => {
          if (planet.id !== 'sun') {
            // Speed factor * multiplier * delta * some constant
            const increment = planet.speed * orbitalSpeedMultiplier * delta * 20;
            next[planet.id] = (prev[planet.id] + increment) % 360;
          }
        });
        return next;
      });

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRotating, orbitalSpeedMultiplier]);

  const handleResetOrbit = () => {
    setOrbitalAngles({
      mercury: 0,
      venus: 45,
      earth: 90,
      mars: 135,
      jupiter: 180,
    });
    setOrbitalSpeedMultiplier(1.0);
  };

  return (
    <div 
      id="heliocentric-system"
      className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Absolute faint diagram texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left column: Controls and descriptive theory */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-mono text-amber-500 border border-amber-500/20">
                MODEL COPENICAN INTERAKTIF
              </span>
            </div>
            
            <h3 className="font-serif text-2xl md:text-3xl text-white font-medium tracking-tight mb-4">
              "In medio vero omnium residet Sol"
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Amati bagaimana bumi dan planet lainnya berputar mengelilingi matahari. 
              Gunakan panel kendali untuk mengatur waktu dan kecepatan revolusi orbital. 
              Ini adalah representasi nyata keagungan kosmos yang menginspirasi aroma <span className="font-serif text-amber-300">On The Movement Of The Earth</span>.
            </p>

            {/* Orbit Controls */}
            <div className="space-y-4 rounded-xl bg-slate-900/60 border border-slate-800 p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">STATUS REVOLUSI</span>
                <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full bg-amber-400 ${isRotating ? 'animate-ping' : ''}`} />
                  {isRotating ? 'BERGERAK' : 'BERHENTI'}
                </span>
              </div>

              {/* Slider speed */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>KECEPATAN ORBIT</span>
                  <span className="text-amber-500">{orbitalSpeedMultiplier.toFixed(1)}x</span>
                </div>
                <input
                  id="speed-multiplier"
                  type="range"
                  min="0.1"
                  max="4.0"
                  step="0.1"
                  value={orbitalSpeedMultiplier}
                  onChange={(e) => setOrbitalSpeedMultiplier(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5">
                <button
                  id="btn-toggle-rotation"
                  onClick={() => setIsRotating(!isRotating)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 py-1.5 text-xs font-mono text-white transition"
                >
                  {isRotating ? (
                    <>
                      <Pause className="h-3 w-3 text-amber-500" /> Jeda Orbit
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 text-amber-500" /> Gerakkan
                    </>
                  )}
                </button>
                <button
                  id="btn-reset-orbit"
                  onClick={handleResetOrbit}
                  className="rounded-lg bg-slate-920 hover:bg-slate-800 border border-slate-800 p-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition"
                  title="Reset Posisi Orbit"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Planet detail view */}
          <div className="border-t border-slate-800/80 pt-5">
            <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mb-1">
              OBJEK KOSMIS AKTIF: {selectedPlanet.name}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl text-amber-400 font-serif leading-none">{selectedPlanet.symbol}</span>
              <h4 className="font-serif text-lg font-medium text-white tracking-wide">{selectedPlanet.name}</h4>
              <span className="text-[10px] font-mono text-slate-500">D = {selectedPlanet.distance} AU</span>
            </div>
            
            <p className="text-slate-300 text-xs italic font-serif leading-relaxed pl-3 border-l-2 border-amber-500/40 mb-3">
              "{selectedPlanet.quote}"
            </p>
            <div className="text-[10px] font-mono text-amber-400/80 mb-2">— {selectedPlanet.context}</div>
            <p className="text-slate-400 text-xs leading-relaxed leading-slate">
              {selectedPlanet.details}
            </p>
          </div>
        </div>

        {/* Right column: Interactive Animated Copernican Map */}
        <div className="lg:col-span-7 flex items-center justify-center bg-slate-900/20 rounded-2xl border border-slate-800/40 p-4 min-h-[350px] md:min-h-[420px] relative">
          
          {/* Circular scientific grid lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[85%] h-[85%] rounded-full border border-slate-700/50 flex items-center justify-center">
              <div className="w-[75%] h-[75%] rounded-full border border-dashed border-slate-700/50 flex items-center justify-center">
                <div className="w-[50%] h-[50%] rounded-full border border-slate-700/50" />
              </div>
            </div>
          </div>

          {/* Compass Rose icon on the top left */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 opacity-40 font-mono text-[9px] text-slate-400">
            <Compass className="h-3 w-3 animate-spin" style={{ animationDuration: '40s' }} />
            <span>N. COPENIC COORD SYSTEM</span>
          </div>

          {/* Interactive SVG Universe Map */}
          <div className="w-full max-w-[400px] aspect-square relative select-none">
            <svg 
              viewBox="0 0 400 400" 
              className="w-full h-full overflow-visible"
            >
              {/* Stars particles in SVG */}
              <circle cx="50" cy="80" r="1" fill="#fff" className="animate-twinkle" style={{ animationDelay: '0.2s' }} />
              <circle cx="340" cy="60" r="1" fill="#fff" className="animate-twinkle" style={{ animationDelay: '1.4s' }} />
              <circle cx="80" cy="320" r="1" fill="#fff" className="animate-twinkle" style={{ animationDelay: '0.7s' }} />
              <circle cx="310" cy="340" r="1.5" fill="#c5a059" className="animate-twinkle" style={{ animationDelay: '2s' }} />
              <circle cx="30" cy="220" r="1" fill="#fff" className="animate-twinkle" style={{ animationDelay: '1.1s' }} />

              {/* Draw Constellation outline */}
              <path d="M 30,100 L 70,120 L 60,160" stroke="rgba(197, 160, 89, 0.1)" fill="none" strokeWidth="0.7" />
              <path d="M 330,280 L 370,290 L 350,330 L 330,340" stroke="rgba(197, 160, 89, 0.1)" fill="none" strokeWidth="0.7" />

              {/* Render Sun (Matahari) in Center */}
              <g 
                onClick={() => setSelectedPlanet(PLANETS_HELIO[0])}
                className="cursor-pointer"
              >
                {/* Sun Glow */}
                <circle cx="200" cy="200" r="32" fill="url(#sunGlow)" className="animate-pulse" style={{ animationDuration: '3s' }} />
                {/* Sun Main Body */}
                <circle 
                  cx="200" 
                  cy="200" 
                  r="16" 
                  fill="#ffa020" 
                  stroke="#ffe080" 
                  strokeWidth="2" 
                  className={`transition-all duration-300 ${selectedPlanet.id === 'sun' ? 'ring-8 ring-amber-500/30' : 'hover:scale-110'}`} 
                />
                {/* Small core symbol */}
                <circle cx="200" cy="200" r="3" fill="#0f172a" />
              </g>

              {/* Render concentric orbital rings */}
              {PLANETS_HELIO.map((planet) => {
                if (planet.id === 'sun') return null;
                
                const isSelected = selectedPlanet.id === planet.id;
                
                return (
                  <g key={planet.id}>
                    {/* Concentric orbit outline */}
                    <circle
                      cx="200"
                      cy="200"
                      r={planet.distance}
                      fill="none"
                      stroke={isSelected ? '#c5a059' : '#334155'}
                      strokeWidth={isSelected ? '1.2' : '0.6'}
                      strokeDasharray={planet.id === 'earth' ? '2, 3' : '3, 4'}
                      className="transition-colors duration-300"
                    />

                    {/* Orbit interactive trigger (invisible thick line for easy clicking) */}
                    <circle
                      cx="200"
                      cy="200"
                      r={planet.distance}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="12"
                      className="cursor-pointer"
                      onClick={() => setSelectedPlanet(planet)}
                    />
                  </g>
                );
              })}

              {/* Render animated revolving Planets */}
              {PLANETS_HELIO.map((planet) => {
                if (planet.id === 'sun') return null;
                
                const isSelected = selectedPlanet.id === planet.id;
                // Get angle in radians, index is updated state
                const angleDeg = orbitalAngles[planet.id] || 0;
                const angleRad = (angleDeg * Math.PI) / 180;
                
                // Calculate position relative to center (200, 200)
                const px = 200 + planet.distance * Math.cos(angleRad);
                const py = 200 + planet.distance * Math.sin(angleRad);
                
                return (
                  <g 
                    key={`body-${planet.id}`}
                    transform={`translate(${px}, ${py})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedPlanet(planet)}
                  >
                    {/* Selection ring */}
                    {isSelected && (
                      <circle 
                        cx="0" 
                        cy="0" 
                        r={planet.size + 6} 
                        fill="none" 
                        stroke="#c5a059" 
                        strokeWidth="1.2" 
                        className="animate-ping" 
                        style={{ animationDuration: '2s' }}
                      />
                    )}
                    
                    {/* Planet shadow / contrast glow back */}
                    <circle 
                      cx="0" 
                      cy="0" 
                      r={planet.size + 1.5} 
                      fill="#0c0f16" 
                    />

                    {/* Planet sphere */}
                    <circle
                      cx="0"
                      cy="0"
                      r={planet.size}
                      fill={planet.color}
                      className="transition-all duration-300"
                      stroke={isSelected ? '#fff' : 'none'}
                      strokeWidth="1"
                    />

                    {/* Visual phase gloss light effect */}
                    <path
                      d={`M -${planet.size * 0.7},0 A ${planet.size * 0.7},${planet.size * 0.7} 0 0,1 ${planet.size * 5},-${planet.size * 0.7}`}
                      fill="rgba(255, 255, 255, 0.15)"
                      className="pointer-events-none"
                    />
                    
                    {/* Tiny Earth symbol helper */}
                    {planet.id === 'earth' && (
                      <circle cx="0" cy="0" r="1.5" fill="#fff" />
                    )}
                  </g>
                );
              })}

              {/* Define Gradients */}
              <defs>
                <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 176, 32, 0.4)" />
                  <stop offset="50%" stopColor="rgba(255, 140, 0, 0.15)" />
                  <stop offset="100%" stopColor="rgba(12, 15, 22, 0)" />
                </radialGradient>
              </defs>
            </svg>
            
            {/* Visual pointers and help overlay */}
            <div className="absolute bottom-1 right-1 flex items-center gap-1 rounded bg-slate-950/80 border border-slate-800 px-2 py-1 text-[9px] font-mono text-slate-500">
              <Info className="h-3 w-3 text-amber-500/80" />
              <span>Sentuh planet untuk melihat detail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
