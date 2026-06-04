/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, Calendar, Trash2, Award, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Review {
  id: string;
  name: string;
  rating: number;
  scentTried: string;
  comment: string;
  longevity: string;
  date: string;
  isPreseeded?: boolean;
}

const PRESEEDED_REVIEWS: Review[] = [];

export default function ScentReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [scentTried, setScentTried] = useState('Full Blend (Formula Heliosentris)');
  const [comment, setComment] = useState('');
  const [filterScent, setFilterScent] = useState('all');
  const [showAlert, setShowAlert] = useState(false);

  // Load reviews from localStorage + Preseeded reviews
  useEffect(() => {
    const stored = localStorage.getItem('heliocentric_perfume_reviews');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Combine preseeded and stored reviews, making sure seeds are unique
        const combined = [...PRESEEDED_REVIEWS, ...parsed.filter((p: Review) => !p.isPreseeded)];
        setReviews(combined);
      } catch (e) {
        setReviews(PRESEEDED_REVIEWS);
      }
    } else {
      setReviews(PRESEEDED_REVIEWS);
    }
  }, []);

  const saveReviewsToLocalStorage = (newReviewsList: Review[]) => {
    // Only save user-created reviews
    const userReviews = newReviewsList.filter(r => !r.isPreseeded);
    localStorage.setItem('heliocentric_perfume_reviews', JSON.stringify(userReviews));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: 'review-' + Date.now(),
      name: name.trim(),
      rating,
      scentTried,
      comment: comment.trim(),
      longevity: '',
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviewsToLocalStorage(updated);

    // Reset Form
    setName('');
    setRating(5);
    setComment('');
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const handleDelete = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    saveReviewsToLocalStorage(updated);
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterScent === 'all') return true;
    return r.scentTried === filterScent;
  });

  return (
    <div id="scent-reviews" className="py-12 border-t border-white/10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408]/0 via-[#C5A059]/1 to-[#020408]/0 pointer-events-none" />

      {/* Title */}
      <div className="mb-10 text-center lg:text-left">
        <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block mb-1">
          RESPON RESONANSI EVALUASI (FEEDBACK FORUM)
        </span>
        <h3 className="font-serif text-3xl font-medium text-white tracking-tight">
          Catatan Pengalaman Sensorik Pengunjung
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed font-light mt-1.5">
          Setelah mendengarkan Alunan Musik Angkasa dan meneliti konstruksi material dalam rak kami, 
          bagaimana Anda mengulas keharuman dari parfum imajiner "On The Movement of the Earth" ini? 
          Tuliskan ulasan jujur Anda di bawah ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Add review form (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl glass-panel p-6 border border-white/8 relative overflow-hidden bg-slate-950/40">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full filter blur-xl pointer-events-none" />
          
          <h4 className="font-serif text-lg font-semibold text-[#C5A059] tracking-wide mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Tulis Review Anda</span>
          </h4>

          {/* Success toast inside the form */}
          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 text-xs font-mono p-3 bg-emerald-950/70 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-start gap-2 leading-relaxed"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                <div>
                  <strong>Terima Kasih!</strong> Ulasan sensorik Anda berhasil dipublikasikan di jurnal review secara permanen.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Name */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Nama Pengulas / Inisial Anda:
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Galileo Muda / Maria S."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                className="w-full bg-white/3 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#C5A059]/45 focus:bg-white/6 transition-all"
              />
            </div>

            {/* Star Rating Selection */}
            <div className="space-y-1">
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Penilaian Bintang (Rating):
              </span>
              <div className="flex items-center gap-1.5 pt-1.5">
                {[1, 2, 3, 4, 5].map((starIdx) => {
                  const isHighlighted = hoveredRating !== null ? starIdx <= hoveredRating : starIdx <= rating;
                  return (
                    <button
                      key={starIdx}
                      type="button"
                      onClick={() => setRating(starIdx)}
                      onMouseEnter={() => setHoveredRating(starIdx)}
                      onMouseLeave={() => setHoveredRating(null)}
                      className="cursor-pointer transition-transform duration-100 hover:scale-120"
                      title={`${starIdx} Bintang`}
                    >
                      <Star
                        className={`h-6 w-6 stroke-1.5 transition-all ${
                          isHighlighted 
                            ? 'fill-[#C5A059] text-[#C5A059] drop-shadow-[0_0_6px_rgba(197,160,89,0.3)]' 
                            : 'text-slate-600 fill-none'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-[10px] font-mono text-[#C5A059] ml-2 font-bold uppercase tracking-widest">
                  {[1, 2, 3, 4, 5][(hoveredRating !== null ? hoveredRating : rating) - 1]} / 5 Bintang
                </span>
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Catatan Ulasan Pengalaman Sensorik:
              </label>
              <textarea
                required
                rows={3}
                placeholder="Bagikan emosi atau atmosfer imajiner yang Anda bayangkan setelah mencobanya (misalnya: 'Terasa seperti berdiri di menara Baltik yang dingin, aroma teh herba menenangkan batin...')"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={400}
                className="w-full bg-white/3 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#C5A059]/45 focus:bg-white/6 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#C5A059] to-[#bca069] text-black font-semibold font-mono text-xs py-3 mt-4 transition-all hover:brightness-115 flex items-center justify-center gap-2 shadow-lg shadow-[#C5A059]/10 active:scale-98 cursor-pointer tracking-wider"
            >
              <Send className="h-4 w-4" />
              <span>PUBLIKASIKAN ARTIKEL REVIEW</span>
            </button>
          </form>
        </div>

        {/* Right column: Reviews feed with filter (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Header Controls for reviews filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Ulasan Terdaftar:
              </span>
              <span className="bg-[#C5A059]/15 text-[#C5A059] px-2 py-0.5 rounded text-[10px] font-mono border border-[#C5A059]/20 font-bold">
                {reviews.length} total
              </span>
            </div>

            {/* Filter select */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Saring Scent:</span>
              <select
                value={filterScent}
                onChange={(e) => setFilterScent(e.target.value)}
                className="bg-white/3 border border-white/5 rounded-lg px-2.5 py-1 text-[10.5px] font-mono text-slate-300 focus:outline-none focus:border-[#C5A059]/30 transition-all cursor-pointer"
              >
                <option value="all">Tampilkan Semua</option>
                <option value="Full Blend (Formula Heliosentris)">Full Blend</option>
                <option value="Moonlighting">Moonlighting</option>
                <option value="Sakanaction - Kaiju">Sakanaction - Kaiju</option>
                <option value="Top Note: The Cold Night">Top Note</option>
                <option value="Heart Note: The Forbidden Script">Heart Note</option>
                <option value="Base Note: The Sun (Sol)">Base Note</option>
              </select>
            </div>
          </div>

          {/* List display */}
          <AnimatePresence initial={false}>
            {filteredReviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-dashed border-white/8 p-12 text-center text-slate-500 text-xs font-mono"
              >
                Belum ada jurnal ulasan khusus untuk variasi scent ini.
              </motion.div>
            ) : (
              <div className="space-y-3.5 max-h-[580px] overflow-y-auto scroller-subtle pr-1">
                {filteredReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    layoutId={review.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-2xl border p-4.5 transition-all flex flex-col justify-between relative overflow-hidden bg-slate-950/20 hover:bg-slate-950/30 ${
                      review.isPreseeded 
                        ? 'border-[#C5A059]/15' 
                        : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    {/* Background decorations for preseeded expert reviews */}
                    {review.isPreseeded && (
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-transparent to-[#C5A059]/3 filter blur-md pointer-events-none rounded-none" />
                    )}

                    <div className="relative z-10">
                      {/* Name, rating & delete header */}
                      <div className="flex justify-between items-start mb-2 gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h5 className="text-[12.5px] font-serif font-bold text-white">
                              {review.name}
                            </h5>
                          </div>
                          <div className="flex flex-wrap gap-x-2.5 gap-y-1">
                            <span className="text-[9px] font-mono text-[#C5A059] bg-[#C5A059]/5 px-1.5 py-0.5 rounded border border-[#C5A059]/10 font-medium">
                              {review.scentTried}
                            </span>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex flex-col items-end shrink-0 select-none">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                className={`h-3 w-3 stroke-1.5 ${
                                  starIdx < review.rating 
                                    ? 'fill-[#C5A059] text-[#C5A059]' 
                                    : 'text-slate-700 fill-none'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[8px] font-mono text-slate-500 mt-1">{review.date}</span>
                        </div>
                      </div>

                      {/* Comment text */}
                      <p className="text-[11px] text-slate-350 leading-relaxed font-sans font-light bg-slate-950/20 border border-white/3 rounded-xl p-3">
                        “{review.comment}”
                      </p>
                    </div>

                    {/* Delete action wrapper if user-created review */}
                    {!review.isPreseeded && (
                      <div className="flex justify-end mt-2 pt-2 border-t border-white/3">
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="inline-flex items-center gap-1 text-[8.5px] font-mono text-slate-500 hover:text-rose-400 py-1 px-2.5 rounded-md hover:bg-rose-500/5 transition-all uppercase"
                          title="Hapus Review Anda"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Hapus Ulasan</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
