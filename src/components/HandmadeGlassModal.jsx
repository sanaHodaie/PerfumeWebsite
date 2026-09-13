import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Flame, Gem, ShieldCheck, ArrowLeft, Layers, Palette } from 'lucide-react';
import './HandmadeGlassModal.css';
import tallBottle from '../assets/images/Gemini_Generated_Image_whsyutwhsyutwhsy-tinypng.io.webp';


export default function HandmadeGlassModal({ isOpen, onClose, onExploreCollection }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="glass-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="glass-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Close Button */}
          <button
            type="button"
            className="glass-close-btn"
            onClick={onClose}
            aria-label="بستن پنجره هنر شیشه‌گری دست‌ساز"
          >
            <X size={20} />
          </button>

          {/* Internal Scroll Wrapper */}
          <div className="glass-scroll-wrapper">
            {/* Modal Hero Banner */}
            <div className="glass-hero">
              <img
                src={tallBottle}
                alt="هنر شیشه‌گری دست‌ساز و بطری‌های کریستالی آنتی"
                className="glass-hero-bg"
                referrerPolicy="no-referrer"
              />
              <div className="glass-hero-overlay" />
              <div className="glass-hero-content">
                <div className="glass-badge">
                  <Flame size={14} />
                  <span>میراث بلورسازان استادکار • Master Glassmakers</span>
                </div>
                <h2 className="glass-title font-brand-story">
                  هنر شیشه‌گری دست‌ساز؛ تندیس‌های کریستالی نور و زمان
                </h2>
                <p className="glass-lead">
                  هر بطری عطر آنتی، نه صرفاً یک ظرف، بلکه یک مجسمه کریستالی نفیس و بی‌تکرار است که در کوره با دمیدن آتش و دم صنعتگران چیره‌دست جان می‌گیرد.
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="glass-body">
              {/* Artisanal Narrative */}
              <div className="glass-intro-banner">
                <Gem size={26} className="intro-gem-icon" />
                <p className="intro-text">
                  در کارگاه‌های شیشه‌گری اختصاصی آنتی، هر قطعه بلور طی ۷ مرحله طاقت‌فرسا و با دقت میکرومتری تراش داده می‌شود تا انکسار نوری معادل الماس خالص تولید کند.
                </p>
              </div>

              {/* 4 Steps of Creation */}
              <div className="glass-section">
                <div className="glass-section-header">
                  <span className="glass-kicker">مراحل آفرینش یک شاهکار</span>
                  <h3 className="glass-heading">هفت روز تراش و صیقل برای هر بطری</h3>
                  <div className="glass-divider" />
                </div>

                <div className="glass-steps-grid">
                  {/* Step 1 */}
                  <div className="glass-step-card">
                    <div className="step-num-badge">۱</div>
                    <div className="step-icon-wrap">
                      <Flame size={20} />
                    </div>
                    <h4 className="step-title">دمیدن در کوره ۱۲۰۰ درجه</h4>
                    <p className="step-desc">
                      کریستال بدون سرب فرانسوی با خلوص فوق‌العاده در کوره‌های باستانی ذوب شده و با روش سنتی لوله دمیدن توسط استادکار فرم‌دهی اولیه می‌شود.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="glass-step-card">
                    <div className="step-num-badge">۲</div>
                    <div className="step-icon-wrap">
                      <Gem size={20} />
                    </div>
                    <h4 className="step-title">تراش دستی منشورهای هندسی</h4>
                    <p className="step-desc">
                      شیارها و وجوه چندضلعی بدنه بطری، تک‌به‌تک با چرخ‌های الماسه دست‌ساز صیقل داده می‌شوند تا مانند یک گوهر شب‌چراغ، پرتوهای نور را بشکنند.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="glass-step-card">
                    <div className="step-num-badge">۳</div>
                    <div className="step-icon-wrap">
                      <Palette size={20} />
                    </div>
                    <h4 className="step-title">آبکاری با آلیاژ طلای ۲۴ عیار</h4>
                    <p className="step-desc">
                      یقه و طوق بطری از برنج سنگین ریخته‌گری ساخته شده و با لایه‌ای از طلای ۲۴ عیار ضدلک و ضدخوردگی مزین می‌گردد تا درخشش ابدی خود را حفظ کند.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="glass-step-card">
                    <div className="step-num-badge">۴</div>
                    <div className="step-icon-wrap">
                      <Layers size={20} />
                    </div>
                    <h4 className="step-title">درپوش مغناطیسی سنگین</h4>
                    <p className="step-desc">
                      صدای بسته شدن کلیک مغناطیسی درپوش، حسی از وقار و شکوه اصیل را منتقل می‌کند؛ وزنی حساب‌شده که در دستان شما حس یک شیء گرانبها را بیدار می‌سازد.
                    </p>
                  </div>
                </div>
              </div>

              {/* Glass Specs Showcase */}
              <div className="glass-specs-box">
                <div className="specs-col">
                  <span className="specs-num">۴۸۰ گرم</span>
                  <span className="specs-label">وزن خالص کریستال مرغوب</span>
                </div>
                <div className="specs-col">
                  <span className="specs-num">۲۴ عیار</span>
                  <span className="specs-label">آبکاری طلای گردن بطری</span>
                </div>
                <div className="specs-col">
                  <span className="specs-num">۱۰۰٪ دست‌ساز</span>
                  <span className="specs-label">بدون استفاده از قالب‌گیری صنعتی</span>
                </div>
                <div className="specs-col">
                  <span className="specs-num">شماره سریال</span>
                  <span className="specs-label">حکاکی منحصر‌به‌فرد کف بطری</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="glass-actions">
                <button
                  type="button"
                  className="btn-primary glass-cta-btn"
                  onClick={() => {
                    onClose();
                    if (onExploreCollection) onExploreCollection();
                  }}
                >
                  <span>مشاهده شیشه‌های کریستالی عطرها</span>
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  className="btn-secondary glass-close-alt"
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
