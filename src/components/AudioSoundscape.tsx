/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle, ListMusic, Music, Disc, Play, Pause, ChevronUp, ExternalLink } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  creator: string;
  description: string;
  color: string;
  youtubeUrl?: string;
}

const FULL_PLAYLIST: Track[] = [
  {
    id: 'moonlighting',
    title: 'Moonlighting',
    creator: 'Ambiens & Simfoni Piano Klasik',
    description: 'Lagu latar Moonlighting dideteksi langsung dari folder public/Moonlighting.mp3 Anda.',
    color: 'from-blue-600/30 to-slate-900/40'
  },
  {
    id: 'sakanaction_kaiju',
    title: 'Sakanaction - Kaiju',
    creator: 'Hentakan Elektronik & Rock Jepang',
    description: 'Lagu latar Sakanaction / Kaiju dideteksi langsung dari folder public/Kaiju.mp3 Anda.',
    color: 'from-purple-650/30 to-slate-900/40'
  }
];

export default function AudioSoundscape() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [hasDefaultBgm, setHasDefaultBgm] = useState<boolean>(true);
  const [activeTrack, setActiveTrack] = useState<string>('bgm_local');
  const [customTrack, setCustomTrack] = useState<Track | null>(null);
  
  const activeTrackRef = useRef<string>(activeTrack);
  useEffect(() => {
    activeTrackRef.current = activeTrack;
  }, [activeTrack]);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const customBufferRef = useRef<AudioBuffer | null>(null);
  const customSourceRef = useRef<AudioBufferSourceNode | null>(null);
  
  // HTML5 audio stream element & standard node ref for BGM
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  
  // Check if a local bgm-utama.mp3 is available on the hosting domain root
  useEffect(() => {
    fetch('/bgm-utama.mp3', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          setHasDefaultBgm(true);
          setActiveTrack('bgm_local');
        }
      })
      .catch((err) => console.log('No default /bgm-utama.mp3 loaded on host root yet. Fully ready for custom files or URL setup!'));
  }, []);

  // Track specific volume ref to keep step sequencers updated immediately
  const volumeRef = useRef<number>(volume);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Audio Nodes for Wind
  const windFilterRef = useRef<BiquadFilterNode | null>(null);
  const windSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const windLfoRef = useRef<OscillatorNode | null>(null);
  
  // Audio Nodes for Synth Pad
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const highOscRef = useRef<OscillatorNode | null>(null);
  const padGainRef = useRef<GainNode | null>(null);
  const padLfRef = useRef<OscillatorNode | null>(null);

  // Sequencer management refs
  const sequencerIntervalRef = useRef<any>(null);
  const stepRef = useRef<number>(0);

  // Stop dynamic nodes and intervals safely
  const stopTrackAssets = () => {
    if (sequencerIntervalRef.current) {
      clearInterval(sequencerIntervalRef.current);
      sequencerIntervalRef.current = null;
    }

    // Pause streaming track safely
    if (audioElementRef.current) {
      try {
        audioElementRef.current.pause();
      } catch (err) {}
    }
    
    // Stop continuous sound nodes
    try {
      if (customSourceRef.current) {
        customSourceRef.current.stop();
        customSourceRef.current.disconnect();
        customSourceRef.current = null;
      }
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
      if (highOscRef.current) {
        highOscRef.current.stop();
        highOscRef.current.disconnect();
        highOscRef.current = null;
      }
      if (padLfRef.current) {
        padLfRef.current.stop();
        padLfRef.current.disconnect();
        padLfRef.current = null;
      }
      if (windLfoRef.current) {
        windLfoRef.current.stop();
        windLfoRef.current.disconnect();
        windLfoRef.current = null;
      }
      if (windSourceRef.current) {
        windSourceRef.current.stop();
        windSourceRef.current.disconnect();
        windSourceRef.current = null;
      }
    } catch (err) {
      // safe ignore of closed ctx errors
    }
  };

  // Custom File Uploader Processor
  const handleCustomAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Initialize audioCtx if not built yet
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(volume, ctx.currentTime);
        mainGain.connect(ctx.destination);
        mainGainRef.current = mainGain;
      } catch (err) {
        console.error('Initial audio context acquisition failed:', err);
      }
    }

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const arrayBuffer = evt.target?.result as ArrayBuffer;
        if (!audioCtxRef.current) return;
        
        const decodedBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer);
        customBufferRef.current = decodedBuffer;
        
        const customTrackObj: Track = {
          id: 'custom',
          title: file.name.substring(0, 30) || 'Lagu Kustom',
          creator: 'Unggahan Pengguna',
          description: `Memutar file audio lokal Anda langsung di soundscape dengan kontrol volume aktif.`,
          color: 'from-[#C5A059]/40 to-slate-500/30'
        };
        
        setCustomTrack(customTrackObj);
        setActiveTrack('custom');
        setIsPlaying(true);
        startTrack('custom', audioCtxRef.current, mainGainRef.current!);
      } catch (err) {
        console.error('Decoded error:', err);
        alert('Gagal mendecode berkas audio. Coba gunakan tipe file audio .mp3 atau .wav standar.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Soothing Cosmic Space Harmony (Procedural Celestial Chords with Tense Suspenseful Beat)
  const startCelestialHarmony = (ctx: AudioContext, mainGain: GainNode) => {
    // Beautiful, cold, frozen dissonant/minor chords representing intellectual struggle
    const chords = [
      [110.00, 130.81, 155.56, 196.00, 233.08, 293.66], // C minor 9 suspense (C, Eb, G, Bb, D)
      [116.54, 138.59, 164.81, 207.65, 246.94, 311.13], // D# minor/diminished oppression (D#, F#, A, C#)
      [98.00, 116.54, 146.83, 174.61, 220.00, 261.63],   // G minor 9 cold drift (G, Bb, D, F, A)
      [77.78, 116.54, 155.56, 185.00, 233.08, 277.18]    // Eb minor maj7 (Eb, Gb, Bb, D)
    ];
    
    let currentChordIndex = 0;
    const activeOscillators: OscillatorNode[] = [];
    const activeGains: GainNode[] = [];
    
    const playChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed' || !isPlaying) return;
      const now = ctx.currentTime;
      const notes = chords[currentChordIndex];
      
      // Gently fade out previous chord
      activeGains.forEach((g) => {
        try {
          g.gain.setValueAtTime(g.gain.value, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
        } catch (e) {}
      });
      
      const oldOscs = [...activeOscillators];
      setTimeout(() => {
        oldOscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch(e) {}
        });
      }, 2000);
      
      activeOscillators.length = 0;
      activeGains.length = 0;
      
      // Play new chord with slow swell attack (fade-in)
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Chorus effect via subtle detune to give a chilly space sensation
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);
        
        const noteGain = ctx.createGain();
        noteGain.gain.setValueAtTime(0, now);
        
        const targetedVol = (idx === 0 ? 0.05 : 0.035) * volumeRef.current;
        
        noteGain.gain.linearRampToValueAtTime(targetedVol, now + 2.5); // 2.5-second attack!
        noteGain.gain.setValueAtTime(targetedVol, now + 5.0);
        noteGain.gain.exponentialRampToValueAtTime(targetedVol * 0.7, now + 7.5);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        // Extremely low cutoff to keep it deep and cold
        filter.frequency.setValueAtTime(450 + Math.sin(now) * 60, now);
        
        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(mainGain);
        
        osc.start(now);
        activeOscillators.push(osc);
        activeGains.push(noteGain);
      });
      
      currentChordIndex = (currentChordIndex + 1) % chords.length;
    };
    
    // Step Sequencer management for the suspenseful beat
    let step = 0;
    const playSequencerStep = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed' || !isPlaying) return;
      const now = ctx.currentTime;
      
      const percGain = ctx.createGain();
      percGain.connect(mainGain);
      
      // Heartbeat (Kick Sub-Bass) - Double hit on steps 0-1, 8-9, and 12 representing heavy heartbeat (lub-dub)
      const isKickStep = step === 0 || step === 1 || step === 8 || step === 9 || step === 12;
      if (isKickStep) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(percGain);
        
        // Rapid pitch sweep downwards simulating a heavy heart thud
        osc.frequency.setValueAtTime(95, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.16);
        
        const volumeMultiplier = (step === 1 || step === 9) ? 0.04 : 0.07;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volumeMultiplier * volumeRef.current, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        
        osc.start(now);
        osc.stop(now + 0.2);
      }
      
      // Constrained ticking clock sounds (even steps that are not kicks)
      const isTickStep = (step % 2 === 0);
      if (isTickStep && !isKickStep) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(3200 + Math.random() * 800, now);
        osc.connect(gain);
        gain.connect(percGain);
        
        gain.gain.setValueAtTime(0.012 * volumeRef.current, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        
        osc.start(now);
        osc.stop(now + 0.04);
      }
      
      // Eerie metallic sound boundary friction (bell ring) on step 14
      if (step === 14) {
        const oscBell1 = ctx.createOscillator();
        const oscBell2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        oscBell1.type = 'sine';
        oscBell2.type = 'sine';
        oscBell1.frequency.setValueAtTime(1450, now);
        oscBell2.frequency.setValueAtTime(1870, now); // dissonance
        
        oscBell1.connect(gain);
        oscBell2.connect(gain);
        gain.connect(percGain);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.008 * volumeRef.current, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        
        oscBell1.start(now);
        oscBell2.start(now);
        oscBell1.stop(now + 0.45);
        oscBell2.stop(now + 0.45);
      }
      
      step = (step + 1) % 16;
    };
    
    playChord();
    
    // Rhythmic polling
    let masterTickCounter = 0;
    const masterScheduler = () => {
      playSequencerStep();
      
      // Trigger new pad chords every 32 steps (approx 7.6 seconds)
      if (masterTickCounter % 32 === 0 && masterTickCounter > 0) {
        playChord();
      }
      
      masterTickCounter++;
    };
    
    const interval = setInterval(masterScheduler, 240); // 125 BPM
    sequencerIntervalRef.current = interval;
    
    // Wire cleanup refs to avoid leaks on track switches
    osc1Ref.current = {
      stop: () => {
        activeOscillators.forEach(o => { try{ o.stop(); }catch(e){} });
        clearInterval(interval);
      },
      disconnect: () => {
        activeOscillators.forEach(o => { try{ o.disconnect(); }catch(e){} });
        activeGains.forEach(g => { try{ g.disconnect(); }catch(e){} });
      }
    } as any;
  };

  // Heavy, tense, cosmic BGM with analog synth bass lines and cyber kicks/noises
  const startCosmicRebellion = (ctx: AudioContext, mainGain: GainNode) => {
    // Shimmering cold tension chords: C minor 9, G# Major 7 (Ab-C-Eb-G), F minor 9, D diminished/dominant
    const chords = [
      [130.81, 155.56, 196.00, 246.94, 311.13, 392.00], // C minor add9 tension
      [103.83, 130.81, 155.56, 196.00, 246.94, 329.63], // G# major 7 (Ab-C-Eb-G)
      [87.31, 110.00, 130.81, 164.81, 220.00, 261.63],   // F minor 9
      [98.00, 123.47, 146.83, 174.61, 233.08, 293.66]    // G7 altered tension
    ];

    let currentChordIndex = 0;
    const activeOscillators: OscillatorNode[] = [];
    const activeGains: GainNode[] = [];

    const playChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed' || !isPlaying) return;
      const now = ctx.currentTime;
      const notes = chords[currentChordIndex];

      // Fade out previous chords
      activeGains.forEach((g) => {
        try {
          g.gain.setValueAtTime(g.gain.value, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
        } catch (e) {}
      });

      const oldOscs = [...activeOscillators];
      setTimeout(() => {
        oldOscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
      }, 1800);

      activeOscillators.length = 0;
      activeGains.length = 0;

      // Play new cold hovering cosmic pad chords
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq * 1.5, now); // slightly elevated for space feel

        osc.detune.setValueAtTime((Math.random() - 0.5) * 14, now);

        const noteGain = ctx.createGain();
        noteGain.gain.setValueAtTime(0, now);

        const targetedVol = (idx === 0 ? 0.04 : 0.025) * volumeRef.current;
        noteGain.gain.linearRampToValueAtTime(targetedVol, now + 2.0); // slow swell
        noteGain.gain.setValueAtTime(targetedVol, now + 4.5);
        noteGain.gain.exponentialRampToValueAtTime(targetedVol * 0.6, now + 7.0);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + Math.sin(now * 1.2) * 80, now);
        filter.Q.setValueAtTime(1.2, now);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(mainGain);

        osc.start(now);
        activeOscillators.push(osc);
        activeGains.push(noteGain);
      });

      currentChordIndex = (currentChordIndex + 1) % chords.length;
    };

    // Shared white noise buffer for crisp synthetic percussion
    let noiseBuffer: AudioBuffer | null = null;
    try {
      const bufferSize = ctx.sampleRate * 0.25; // 250ms max snare decay
      noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } catch (e) {
      console.warn("White noise buffer creation failed", e);
    }

    let step = 0;
    const playSequencerStep = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed' || !isPlaying) return;
      const now = ctx.currentTime;

      const percGain = ctx.createGain();
      percGain.connect(mainGain);

      // 1. Heavy Cyber Sub-Kick on 0, 4, 8, 12
      const isKickStep = step === 0 || step === 4 || step === 8 || step === 12;
      if (isKickStep) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(percGain);

        osc.frequency.setValueAtTime(125, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.18); // deep sweep

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18 * volumeRef.current, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.start(now);
        osc.stop(now + 0.24);
      }

      // 2. Synth Saw Sub-Bass Line
      // Syncopated heavy steps: 0, 2, 3, 6, 8, 10, 11, 14
      const isBassStep = step === 0 || step === 2 || step === 3 || step === 6 || step === 8 || step === 10 || step === 11 || step === 14;
      if (isBassStep) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';

        // Base frequencies tracking chord index: C, Ab, F, G
        const bassFreqs = [65.41, 51.91, 43.65, 49.00];
        let baseFreq = bassFreqs[currentChordIndex];

        // Variation melody notes
        if (step === 3 || step === 11) baseFreq *= 1.25; // minor third higher
        if (step === 6 || step === 14) baseFreq *= 1.5;  // fifth higher

        osc.frequency.setValueAtTime(baseFreq, now);

        filter.type = 'lowpass';
        // Classic acid-style retro envelope sweep
        filter.frequency.setValueAtTime(160, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.03);
        filter.frequency.exponentialRampToValueAtTime(110, now + 0.16);
        filter.Q.setValueAtTime(2.5, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(percGain);

        const bassVolume = 0.085 * volumeRef.current;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(bassVolume, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.start(now);
        osc.stop(now + 0.20);
      }

      // 3. Cyber Snare / Noise-Clap on 4, 12
      const isSnareStep = step === 4 || step === 12;
      if (isSnareStep && noiseBuffer) {
        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = noiseBuffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1100, now);
        noiseFilter.Q.setValueAtTime(1.2, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, now);
        noiseGain.gain.linearRampToValueAtTime(0.045 * volumeRef.current, now + 0.008);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(percGain);
        noiseNode.start(now);

        // Snap drum shell body
        const snapOsc = ctx.createOscillator();
        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(320, now);
        snapOsc.frequency.exponentialRampToValueAtTime(155, now + 0.06);

        const snapGain = ctx.createGain();
        snapGain.gain.setValueAtTime(0, now);
        snapGain.gain.linearRampToValueAtTime(0.065 * volumeRef.current, now + 0.005);
        snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        snapOsc.connect(snapGain);
        snapGain.connect(percGain);

        snapOsc.start(now);
        snapOsc.stop(now + 0.08);
      }

      // 4. Sparkling White noise Hi-Hat on offbeats (2, 6, 10, 14, 15)
      const isHihatStep = step === 2 || step === 6 || step === 10 || step === 14 || step === 15;
      if (isHihatStep && noiseBuffer) {
        const hNode = ctx.createBufferSource();
        hNode.buffer = noiseBuffer;

        const hFilter = ctx.createBiquadFilter();
        hFilter.type = 'highpass';
        hFilter.frequency.setValueAtTime(7800, now);

        const hGain = ctx.createGain();
        const hatVol = (step === 15 ? 0.006 : 0.016) * volumeRef.current;
        hGain.gain.setValueAtTime(hatVol, now);
        hGain.gain.exponentialRampToValueAtTime(0.001, now + (step === 15 ? 0.015 : 0.045));

        hNode.connect(hFilter);
        hFilter.connect(hGain);
        hGain.connect(percGain);
        hNode.start(now);
      }

      step = (step + 1) % 16;
    };

    playChord();

    // Rhythmic scheduling loop
    let masterTickCounter = 0;
    const masterScheduler = () => {
      playSequencerStep();

      // Trigger new sweeping pad chord every 32 steps (approx 7.2 seconds at 136 BPM)
      if (masterTickCounter % 32 === 0 && masterTickCounter > 0) {
        playChord();
      }

      masterTickCounter++;
    };

    const interval = setInterval(masterScheduler, 220); // Steady 136 BPM
    sequencerIntervalRef.current = interval;

    // Wire cleanup refs to avoid leaks on track switches
    osc1Ref.current = {
      stop: () => {
        activeOscillators.forEach(o => { try{ o.stop(); }catch(e){} });
        clearInterval(interval);
      },
      disconnect: () => {
        activeOscillators.forEach(o => { try{ o.disconnect(); }catch(e){} });
        activeGains.forEach(g => { try{ g.disconnect(); }catch(e){} });
      }
    } as any;
  };

  const startTricksterProcedural = (ctx: AudioContext, mainGain: GainNode) => {
    // Warm, golden, sun-drenched chords representing the Solar/Heliosentris system
    const chords = [
      [98.00, 123.47, 146.83, 185.00, 220.00, 293.66],  // G Major 9 (Helios gold)
      [110.00, 138.59, 164.81, 207.65, 246.94, 329.63], // A Major 9 (Shining Ray)
      [130.81, 164.81, 196.00, 246.94, 293.66, 329.63], // C Major 9 (Luminous crown)
      [146.83, 196.00, 220.00, 261.63, 293.66, 329.63]  // D 9sus4 (Copernican orbital center)
    ];

    let currentChordIndex = 0;
    const activeOscillators: OscillatorNode[] = [];
    const activeGains: GainNode[] = [];

    const playChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed' || !isPlaying) return;
      const now = ctx.currentTime;
      const notes = chords[currentChordIndex];

      // Fade out previous pad chords
      activeGains.forEach((g) => {
        try {
          g.gain.setValueAtTime(g.gain.value, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
        } catch (e) {}
      });

      const oldOscs = [...activeOscillators];
      setTimeout(() => {
        oldOscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
      }, 2200);

      activeOscillators.length = 0;
      activeGains.length = 0;

      // Sveltering, warm, radiant sun chords
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Warm chorus feel with subtle microtonal detuning
        osc.detune.setValueAtTime((Math.random() - 0.5) * 10, now);

        const noteGain = ctx.createGain();
        noteGain.gain.setValueAtTime(0, now);

        const targetedVol = (idx === 0 ? 0.05 : 0.03) * volumeRef.current;
        noteGain.gain.linearRampToValueAtTime(targetedVol, now + 3.0); // very slow majestic dawn swell
        noteGain.gain.setValueAtTime(targetedVol, now + 5.0);
        noteGain.gain.exponentialRampToValueAtTime(targetedVol * 0.5, now + 8.5);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(550 + Math.sin(now * 0.8) * 90, now);
        filter.Q.setValueAtTime(1.0, now);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(mainGain);

        osc.start(now);
        activeOscillators.push(osc);
        activeGains.push(noteGain);
      });

      currentChordIndex = (currentChordIndex + 1) % chords.length;
    };

    // Shared white noise buffer for crisp hi-hat tickles
    let noiseBuffer: AudioBuffer | null = null;
    try {
      const bufferSize = ctx.sampleRate * 0.2;
      noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } catch (e) {
      console.warn("White noise buffer creation failed", e);
    }

    let step = 0;
    const playSequencerStep = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed' || !isPlaying) return;
      const now = ctx.currentTime;

      const percGain = ctx.createGain();
      percGain.connect(mainGain);

      // 1. Warm kick thud on 0, 4, 8, 12 representing the ticking clockwork of the cosmos
      const isKickStep = step === 0 || step === 4 || step === 8 || step === 12;
      if (isKickStep) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(percGain);

        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(36, now + 0.15);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12 * volumeRef.current, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.start(now);
        osc.stop(now + 0.20);
      }

      // 2. Playful, radiant trickster synth notes bouncing under the solar warmth
      // Bounding steps for active dialogue: 2, 5, 7, 10, 13 (syncopated)
      const isMelodyStep = step === 2 || step === 5 || step === 7 || step === 10 || step === 13;
      if (isMelodyStep) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';

        // Select notes from active chord scaled higher for a celestial bell melody
        const activeChord = chords[currentChordIndex];
        const baseNote = activeChord[(step + currentChordIndex) % activeChord.length];
        const bellFreq = baseNote * 2; // Arpeggiating an octave up for bright stars

        osc.frequency.setValueAtTime(bellFreq, now);

        // Lowpass filter envelope to make them sound like plucked sunbeams
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(150, now + 0.15);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(percGain);

        const noteVol = 0.05 * volumeRef.current;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(noteVol, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.start(now);
        osc.stop(now + 0.25);
      }

      // 3. High-Pass Crisp Tickles (Hi-Hats) on offbeats (2, 6, 10, 14)
      const isHat = step === 2 || step === 6 || step === 10 || step === 14;
      if (isHat && noiseBuffer) {
        const hNode = ctx.createBufferSource();
        hNode.buffer = noiseBuffer;

        const hFilter = ctx.createBiquadFilter();
        hFilter.type = 'highpass';
        hFilter.frequency.setValueAtTime(8500, now);

        const hGain = ctx.createGain();
        hGain.gain.setValueAtTime(0.012 * volumeRef.current, now);
        hGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        hNode.connect(hFilter);
        hFilter.connect(hGain);
        hGain.connect(percGain);
        hNode.start(now);
      }

      step = (step + 1) % 16;
    };

    playChord();

    let masterTickCounter = 0;
    const masterScheduler = () => {
      playSequencerStep();

      // Trigger new chord sweep every 32 ticks (approx 7.2s)
      if (masterTickCounter % 32 === 0 && masterTickCounter > 0) {
        playChord();
      }

      masterTickCounter++;
    };

    const interval = setInterval(masterScheduler, 220); // 136 BPM
    sequencerIntervalRef.current = interval;

    // Wire cleanup refs to avoid leaks on track switches
    osc1Ref.current = {
      stop: () => {
        activeOscillators.forEach(o => { try{ o.stop(); }catch(e){} });
        clearInterval(interval);
      },
      disconnect: () => {
        activeOscillators.forEach(o => { try{ o.disconnect(); }catch(e){} });
        activeGains.forEach(g => { try{ g.disconnect(); }catch(e){} });
      }
    } as any;
  };

  const startTrack = (trackId: string, ctx: AudioContext, mainGain: GainNode) => {
    stopTrackAssets();
    
    if (trackId === 'custom' && customBufferRef.current) {
      const source = ctx.createBufferSource();
      source.buffer = customBufferRef.current;
      source.loop = true;
      customSourceRef.current = source;
      
      source.connect(mainGain);
      source.start();
    } else if (trackId === 'bgm_local' || trackId === 'moonlighting' || trackId === 'sakanaction_kaiju') {
      let srcUrl = '/bgm-utama.mp3';
      if (trackId === 'bgm_local') {
        srcUrl = '/bgm-utama.mp3';
        // Start procedural solar/trickster harmony in addition to MP3 streaming so that there's beautiful audio even if the file is missing!
        startTricksterProcedural(ctx, mainGain);
      } else if (trackId === 'moonlighting') {
        srcUrl = '/Moonlighting.mp3';
        // Start procedural harmony in addition to MP3 streaming so that there's beautiful audio even if the file is missing!
        startCelestialHarmony(ctx, mainGain);
      } else if (trackId === 'sakanaction_kaiju') {
        srcUrl = '/Kaiju.mp3';
        // Start procedural cosmic rebellion in addition to MP3 streaming so that there's beautiful audio even if the file is missing!
        startCosmicRebellion(ctx, mainGain);
      }
      
      if (!audioElementRef.current) {
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.loop = true;
        audioElementRef.current = audio;
      }
      
      if (!mediaSourceRef.current) {
        try {
          const sourceNode = ctx.createMediaElementSource(audioElementRef.current);
          sourceNode.connect(mainGain);
          mediaSourceRef.current = sourceNode;
        } catch (e) {
          console.warn("Failed to connect media element source, playing directly", e);
        }
      }
      
      audioElementRef.current.src = srcUrl;
      audioElementRef.current.play().catch(err => {
        console.log("HTML5 audio playback failed, relying on procedural fallback: ", err);
      });
    }
  };

  const toggleSound = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(volume, ctx.currentTime);
        mainGain.connect(ctx.destination);
        mainGainRef.current = mainGain;

        setIsPlaying(true);
        startTrack(activeTrack, ctx, mainGain);
      } catch (e) {
        console.error('Audio initialization failed or was blocked by browser:', e);
      }
    } else {
      if (isPlaying) {
        if (audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.suspend().catch(err => console.log('Suspend failed:', err));
        }
        setIsPlaying(false);
        // Pause streaming track safely
        if (audioElementRef.current) {
          try {
            audioElementRef.current.pause();
          } catch (e) {}
        }
        // Clear sequences instantly on pause
        if (sequencerIntervalRef.current) {
          clearInterval(sequencerIntervalRef.current);
          sequencerIntervalRef.current = null;
        }
      } else {
        if (audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.resume().catch(err => console.log('Resume failed:', err));
        }
        setIsPlaying(true);
        // Play streaming BGM again if active
        if ((activeTrack === 'bgm_local' || activeTrack === 'moonlighting' || activeTrack === 'sakanaction_kaiju') && audioElementRef.current) {
          audioElementRef.current.play().catch(err => console.log('HTML5 play resume failed:', err));
        }
        // Restart sequencer loop on resume
        startTrack(activeTrack, audioCtxRef.current, mainGainRef.current!);
      }
    }
  };

  const handleTrackSelect = (trackId: string) => {
    setActiveTrack(trackId);
    setShowPlaylist(false);
    
    // Auto start and boot audio context on manual selection
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(volume, ctx.currentTime);
        mainGain.connect(ctx.destination);
        mainGainRef.current = mainGain;
      } catch (e) {
        console.error('Audio initialization failed on track selection:', e);
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(err => console.log('Resume failed:', err));
    }

    setIsPlaying(true);
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed' && mainGainRef.current) {
      startTrack(trackId, audioCtxRef.current, mainGainRef.current);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (mainGainRef.current && audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      mainGainRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopTrackAssets();
      if (audioCtxRef.current) {
        if (audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close().catch(err => console.log('Close failed:', err));
        }
        audioCtxRef.current = null;
      }
    };
  }, []);

  const playlistItems = [
    ...(hasDefaultBgm ? [{
      id: 'bgm_local',
      title: 'Trickster',
      creator: 'File Otomatis Server/Public',
      description: 'Lagu latar utama dideteksi langsung dari folder public/bgm-utama.mp3 Anda.',
      color: 'from-amber-600/30 to-slate-900/40'
    }] : []),
    ...(customTrack ? [customTrack] : []),
    ...FULL_PLAYLIST
  ];

  const currentTrackObj = playlistItems.find(t => t.id === activeTrack) || playlistItems[0];

  return (
    <div id="soundscape-container" className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {/* Dynamic Playlist Panel (above the main player) */}
      {showPlaylist && (
        <div 
          id="playlist-expanded-panel"
          className="w-80 md:w-100 rounded-2xl glass-panel p-4 border-[#C5A059]/20 shadow-2xl backdrop-blur-xl animate-fade-in space-y-3 mb-1"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase flex items-center gap-1.5 font-bold">
              <ListMusic className="h-4 w-4" /> REVOLUSI SUARA PLAYLIST
            </span>
            <button 
              id="btn-close-playlist"
              onClick={() => setShowPlaylist(false)}
              className="text-[10px] font-mono text-slate-400 hover:text-white"
            >
              TUTUP
            </button>
          </div>
          
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {playlistItems.map((track) => {
              const isCurrent = track.id === activeTrack;
              return (
                <button
                  id={`btn-track-${track.id}`}
                  key={track.id}
                  onClick={() => handleTrackSelect(track.id)}
                  className={`w-full text-left rounded-xl p-3 border transition-all duration-300 relative overflow-hidden group ${
                    isCurrent 
                      ? 'bg-[#C5A059]/10 border-[#C5A059]/40 shadow-sm' 
                      : 'bg-white/3 border-white/5 hover:border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 relative z-10">
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-[#C5A059]' : 'text-white'}`}>
                          {track.title}
                        </span>
                        {isCurrent && isPlaying && (
                          <Disc className="h-3 w-3 text-[#C5A059] animate-spin" />
                        )}
                      </div>
                      <div className="text-[9px] font-mono text-slate-400">
                        {track.creator}
                      </div>
                      <p className="text-[10px] text-slate-350 font-light leading-relaxed mt-1 opacity-90">
                        {track.description}
                      </p>
                    </div>

                    {track.youtubeUrl && (
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-red-650/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-all flex items-center justify-center self-start"
                        title="Dengarkan musik asli di YouTube"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2.5 border-t border-white/5 space-y-3">
            {/* File Upload */}
            <div className="space-y-1">
              <div className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">
                UNGGAH FILE MP3 LOKAL:
              </div>
              <label className="flex flex-col items-center justify-center p-2 rounded-xl border border-dashed border-[#C5A059]/20 hover:border-[#C5A059]/40 hover:bg-[#C5A059]/5 cursor-pointer transition text-center group">
                <Music className="h-4 w-4 text-[#C5A059]/70 group-hover:text-[#C5A059] mb-0.5 animate-pulse" />
                <span className="text-[9.5px] font-mono text-slate-200 font-bold max-w-[280px] truncate">
                  {customTrack ? `Kustom: ${customTrack.title}` : 'Pilih file MP3 lokal Anda'}
                </span>
                <span className="text-[7.5px] text-slate-450 font-sans">
                  Terputar langsung lewat browser. (Mendukung .mp3, .wav)
                </span>
                <input 
                  id="input-custom-audio-file"
                  type="file" 
                  accept="audio/*" 
                  className="hidden" 
                  onChange={handleCustomAudioUpload}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Main Soundscape Controller Control Capsule */}
      <div 
        id="soundscape-control" 
        className="flex items-center gap-3 rounded-full bg-slate-950/92 border border-[#C5A059]/25 px-4 py-2.5 shadow-[0_0_25px_rgba(197,160,89,0.15)] backdrop-blur-md relative"
      >
        <button
          id="btn-toggle-sound"
          onClick={toggleSound}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 shadow-md ${
            isPlaying 
              ? 'bg-[#C5A059]/25 text-[#C5A059] border border-[#C5A059]/50 animate-pulse' 
              : 'bg-[#C5A059]/15 text-white hover:text-slate-200 border-2 border-[#C5A059] animate-bounce'
          }`}
          title={isPlaying ? "Matikan suara suasana" : "Aktifkan suara suasana"}
        >
          {isPlaying ? <Volume2 className="h-5.5 w-5.5" /> : <VolumeX className="h-5.5 w-5.5" />}
        </button>

        {!isPlaying && (
          <div className="flex flex-col select-none pr-1 pointer-events-none animate-pulse">
            <span className="text-[10px] font-sans font-bold text-[#C5A059] tracking-wider">BGM MATI</span>
            <span className="text-[8px] font-mono text-slate-400">KETUK TOMBOL UNTUK PUTAR SENSASI BGM KOSMIS</span>
          </div>
        )}

        <div className={`flex flex-col min-w-[120px] ${!isPlaying ? 'hidden sm:flex' : 'flex'}`}>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">
              {currentTrackObj.title.split(' ')[0].toUpperCase()} ACTIVE
            </span>
            <div className="relative">
              <HelpCircle 
                className="h-3 w-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute bottom-6 left-0 w-64 rounded-lg bg-slate-950 border border-white/10 p-3 text-xs text-slate-300 shadow-xl z-50 leading-relaxed font-sans">
                  <p className="font-semibold text-[#C5A059] mb-1 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Ambiens Olfaktori
                  </p>
                  Setiap trek menghasilkan dengungan, ritme bass, atau goresan pena secara prosedural menggunakan Web Audio API tanpa berkas rekaman statis.
                </div>
              )}
            </div>
          </div>
          
          <div className="text-[10px] text-slate-300 font-mono font-medium max-w-[140px] truncate">
            {currentTrackObj.creator}
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
            />
          </div>
        </div>

        {/* Playlist Toggle Button */}
        <button
          id="btn-toggle-playlist"
          onClick={() => setShowPlaylist(!showPlaylist)}
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
            showPlaylist 
              ? 'bg-[#C5A059]/20 border-[#C5A059]/40 text-[#C5A059]' 
              : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Buka Playlist"
        >
          <ListMusic className="h-4 w-4" />
        </button>

        {isPlaying && (
          <div className="flex items-center gap-0.5 h-4 px-1.5 border-l border-white/5 ml-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-[#C5A059]/70 rounded-full"
                style={{
                  height: `${20 + Math.random() * 80}%`,
                  animation: `twinkle ${0.8 + i * 0.2}s infinite alternate ease-in-out`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
