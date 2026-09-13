import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ShieldCheck, Gem, Leaf, Compass, ArrowLeft, Award, HeartHandshake } from 'lucide-react';
import { useAdminStore } from '../data/adminStore';
import './PhilosophyModal.css';
import tallBottle from '../assets/images/Gemini_Generated_Image_8nwwol8nwwol8nww-tinypng.io.webp';

export default function PhilosophyModal({ isOpen, onClose, onExploreCollection }) {
  const { brandContent } = useAdminStore();
  const phil = brandContent?.philosophy || {};

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="philosophy-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="philosophy-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Close Button */}
          <button
            type="button"
            className="philosophy-close-btn"
            onClick={onClose}
            aria-label="بستن صفحه فلسفه برند"
          >
            <X size={20} />
          </button>

          {/* Internal Scroll Wrapper for clean clipping */}
          <div className="philosophy-scroll-wrapper">
            {/* Modal Hero Banner */}
            <div className="philosophy-hero">
              <img
                src={phil.heroImage || tallBottle}
                alt="فلسفه اصالت برند آنتی"
                className="philosophy-hero-bg"
                referrerPolicy="no-referrer"
              />
              <div className="philosophy-hero-overlay" />
              <div className="philosophy-hero-content">
                <div className="philosophy-badge">
                  <Sparkles size={14} />
                  <span>{phil.badge || 'مانیفست خانه عطر آنتی • پاریس و تهران'}</span>
                </div>
                <h2 className="philosophy-title font-brand-story">
                  {phil.title || 'فلسفه برند آنتی؛ کیمیاگری جاودانگی و شکوه'}
                </h2>
                <p className="philosophy-lead">
                  {phil.lead || 'در آنتی، ما معتقدیم که عطر، نامرئی‌ترین لباس و عمیق‌ترین بازتاب از اصالت درون است؛ ردپایی از نور که پس از گذشتن شما، جاودانه باقی می‌ماند.'}
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="philosophy-body">
              {/* The 4 Core Pillars */}
              <div className="philosophy-section">
                <div className="section-header-centered">
                  <span className="section-kicker">چهار رکن تغییرناپذیر</span>
                  <h3 className="section-title">منشور آفرینش در خانه عطر آنتی</h3>
                  <div className="section-divider-line" />
                </div>

                <div className="pillars-grid">
                  {/* Pillar 1 */}
                  <div className="pillar-card">
                    <div className="pillar-icon-box">
                      <Sparkles size={22} />
                    </div>
                    <h4 className="pillar-title">{phil.pillar1Title || 'خلوص اسانس و غلظت شاهوار'}</h4>
                    <p className="pillar-desc">
                      {phil.pillar1Desc || 'کلیه آثار آنتی با بالاترین استاندارد جهانی اکستریت د پرفوم (Extrait de Parfum) و غلظت اسانس روغنی بیش از ۳۰٪ فرموله می‌شوند؛ تضمین ماندگاری بالای ۴۸ ساعت و پراکندگی مسحورکننده در هر فضا.'}
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="pillar-card">
                    <div className="pillar-icon-box">
                      <Gem size={22} />
                    </div>
                    <h4 className="pillar-title">{phil.pillar2Title || 'تراش کریستال و شاهکار شیشه‌گری'}</h4>
                    <p className="pillar-desc">
                      {phil.pillar2Desc || 'هر بطری عطر آنتی به سان یک جواهر دست‌تراش از کریستال فشرده و درپوش‌های سنگین با روکش طلای رزگلد ساخته می‌شود؛ اثری که روی میز آرایش شما مانند تندیسی فاخر می‌درخشد.'}
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="pillar-card">
                    <div className="pillar-icon-box">
                      <Leaf size={22} />
                    </div>
                    <h4 className="pillar-title">{phil.pillar3Title || 'تعهد اخلاقی و پایدار (Cruelty-Free)'}</h4>
                    <p className="pillar-desc">
                      {phil.pillar3Desc || '۱۰۰٪ محصولات آنتی بدون هیچ‌گونه آزمایش روی حیوانات، با استفاده از الکل ارگانیک گندم و بسته‌بندی‌های بدون پلاستیک و تجزیه‌پذیر از کاغذهای بازیافتی با نشان FSC تولید می‌شوند.'}
                    </p>
                  </div>

                  {/* Pillar 4 */}
                  <div className="pillar-card">
                    <div className="pillar-icon-box">
                      <ShieldCheck size={22} />
                    </div>
                    <h4 className="pillar-title">{phil.pillar4Title || 'اصالت شناسنامه‌دار و بچ‌کد حک‌شده'}</h4>
                    <p className="pillar-desc">
                      {phil.pillar4Desc || 'هر بطری دارای شناسنامه خلوص بین‌المللی با کد رهگیری اختصاصی لیزری است تا اطمینان خاطر کامل از دریافت قطره‌قطره عصاره اورجینال و بی‌همتا را به شما پیشکش کند.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Master Perfumer Quote */}
              <div className="philosophy-quote-card">
                <div className="quote-mark">“</div>
                <blockquote className="quote-text">
                  «ما عطر تولید نمی‌کنیم؛ ما خاطره‌های فراموش‌نشدنی را درون شیشه‌های کریستالی به بند می‌کشیم تا هر بار که درب آن گشوده می‌شود، روح به پرواز درآید.»
                </blockquote>
                <div className="quote-author-info">
                  <span className="author-name">موریس دو والنتین</span>
                  <span className="author-role">سرعطرساز ارشد و خالق فرمولاسیون‌های اختصاصی آنتی • گراس، فرانسه</span>
                </div>
              </div>

              {/* Quality Certifications & Standards */}
              <div className="philosophy-standards">
                <div className="standards-title-wrap">
                  <Award size={20} className="standards-icon" />
                  <h4 className="standards-title">گواهی‌نامه‌ها و استانداردهای بین‌المللی</h4>
                </div>
                <div className="standards-tags">
                  <span className="std-tag">IFRA Certified (اتحادیه بین‌المللی عطر)</span>
                  <span className="std-tag">Leaping Bunny Cruelty-Free</span>
                  <span className="std-tag">100% Organic Solvent Base</span>
                  <span className="std-tag">ISO 22716 Cosmetics GMP</span>
                  <span className="std-tag">Dermatologically Tested</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="philosophy-actions">
                <button
                  type="button"
                  className="btn-primary philosophy-cta-btn"
                  onClick={() => {
                    onClose();
                    if (onExploreCollection) onExploreCollection();
                  }}
                >
                  <span>کشف و خرید کلکسیون شاهکارها</span>
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  className="btn-secondary philosophy-close-alt"
                  onClick={onClose}
                >
                  بستن پنجره
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}