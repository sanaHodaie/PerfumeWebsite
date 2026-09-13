import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Leaf, Recycle, Heart, Droplets, Sun, Globe2, ArrowLeft, ShieldCheck } from 'lucide-react';
import './EcoResponsibilityModal.css';

import enviroment from '../assets/images/nothing.webp';


export default function EcoResponsibilityModal({ isOpen, onClose, onExploreCollection }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="eco-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="eco-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Close Button */}
          <button
            type="button"
            className="eco-close-btn"
            onClick={onClose}
            aria-label="بستن صفحه مسئولیت زیست‌محیطی"
          >
            <X size={20} />
          </button>

          {/* Internal Scroll Wrapper */}
          <div className="eco-scroll-wrapper">
            {/* Modal Hero Banner */}
            <div className="eco-hero">
              <img
                src={enviroment}
                alt="مسئولیت زیست‌محیطی و پایداری برند آنتی"
                className="eco-hero-bg"
                referrerPolicy="no-referrer"
              />
              <div className="eco-hero-overlay" />
              <div className="eco-hero-content">
                <div className="eco-badge">
                  <Leaf size={14} />
                  <span>مانیفست پایداری سبز و اخلاق حرفه‌ای • Eco-Luxury</span>
                </div>
                <h2 className="eco-title font-brand-story">
                  مسئولیت زیست‌محیطی؛ شکوه لوکس در احترام به مادر زمین
                </h2>
                <p className="eco-lead">
                  لوکس بودن واقعی به معنای گرفتن از طبیعت نیست؛ بلکه امانت‌داری از ظریف‌ترین گنجینه‌های آن برای نسل‌های آینده است.
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="eco-body">
              {/* Introduction statement */}
              <div className="eco-intro-banner">
                <Globe2 size={24} className="intro-globe-icon" />
                <p className="intro-text">
                  در خانه عطر آنتی، فرآیند آفرینش هر قطره عطر با اصولی پایدار، فرمولاسیون پاک و رویکرد صفر کربن همراه است. ما زیبایی را با اخلاق درهم‌آمیخته‌ایم.
                </p>
              </div>

              {/* 4 Pillars of Eco-Conscious Luxury */}
              <div className="eco-section">
                <div className="eco-section-header">
                  <span className="eco-kicker">تعهدات چهارگانه پایداری</span>
                  <h3 className="eco-heading">ارکان مسئولیت اخلاقی و زیست‌بوم آنتی</h3>
                  <div className="eco-divider" />
                </div>

                <div className="eco-pillars-grid">
                  {/* Pillar 1 */}
                  <div className="eco-pillar-card">
                    <div className="eco-icon-wrap">
                      <Recycle size={22} />
                    </div>
                    <h4 className="eco-card-title">بطری‌های ماندگار و سیستم بازشارژ</h4>
                    <p className="eco-card-desc">
                      بطری‌های کریستالی سنگین آنتی نه به عنوان کالایی دورریختنی، بلکه مانند جواهری همیشگی طراحی شده‌اند. با ارائه کپسول‌های آلومینیومی قابل بازیافت برای شارژ مجدد، از اتلاف بیش از ۷۰٪ شیشه جلوگیری می‌کنیم.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="eco-pillar-card">
                    <div className="eco-icon-wrap">
                      <Heart size={22} />
                    </div>
                    <h4 className="eco-card-title">۱۰۰٪ عاری از خشونت (Cruelty-Free)</h4>
                    <p className="eco-card-desc">
                      هیچ‌یک از مواد اولیه، اسانس‌ها و فرآورده‌های نهایی آنتی هرگز روی حیوانات آزمایش نشده و نخواهند شد. ما دارای نشان افتخار بدون ستم و فرمولاسیون کاملاً وگان هستیم.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="eco-pillar-card">
                    <div className="eco-icon-wrap">
                      <Leaf size={22} />
                    </div>
                    <h4 className="eco-card-title">بسته‌بندی بدون پلاستیک با نشان FSC</h4>
                    <p className="eco-card-desc">
                      جعبه‌های لوکس هاردباکس ما از کاغذهای ۱۰۰٪ بازیافتی با الیاف کتان طبیعی، بدون سلفون‌های پلاستیکی و با چاپ جوهرهای گیاهی ارگانیک پایه سویا مهر و موم می‌شوند.
                    </p>
                  </div>

                  {/* Pillar 4 */}
                  <div className="eco-pillar-card">
                    <div className="eco-icon-wrap">
                      <Sun size={22} />
                    </div>
                    <h4 className="eco-card-title">انرژی پاک و بازچرخانی ۹۵٪ آب</h4>
                    <p className="eco-card-desc">
                      آزمایشگاه‌ها و کارگاه‌های تقطیر آنتی در گراس فرانسه با صفحات خورشیدی تغذیه می‌شوند و آب تقطیر گلبرگ‌ها تصفیه و به سفره‌های زیرزمینی مزارع بازگردانده می‌شود.
                    </p>
                  </div>
                </div>
              </div>

              {/* Impact Numbers */}
              <div className="eco-impact-box">
                <div className="impact-col">
                  <span className="impact-num">۱۰۰٪</span>
                  <span className="impact-label">بسته‌بندی زیست‌تخریب‌پذیر</span>
                </div>
                <div className="impact-col">
                  <span className="impact-num">۰</span>
                  <span className="impact-label">آزمایش روی حیوانات</span>
                </div>
                <div className="impact-col">
                  <span className="impact-num">۱ نهال</span>
                  <span className="impact-label">کاشت گل رز به ازای هر سفارش</span>
                </div>
                <div className="impact-col">
                  <span className="impact-num">۹۵٪</span>
                  <span className="impact-label">صرفه‌جویی در مصرف آب تقطیر</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="eco-actions">
                <button
                  type="button"
                  className="btn-primary eco-cta-btn"
                  onClick={() => {
                    onClose();
                    if (onExploreCollection) onExploreCollection();
                  }}
                >
                  <span>کشف عطرهای پاک و ماندگار آنتی</span>
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  className="btn-secondary eco-close-alt"
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
