import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, MapPin, Calendar, Sun, Droplets, Clock, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import './GrasseFarmsModal.css';

export default function GrasseFarmsModal({ isOpen, onClose, onExploreCollection }) {
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="grasse-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="grasse-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close Button */}
          <button
            type="button"
            className="grasse-close-btn"
            onClick={onClose}
            aria-label="بستن پنجره مزارع گراس"
          >
            <X size={20} />
          </button>

          {/* Internal Scroll Wrapper */}
          <div className="grasse-scroll-wrapper">
            {/* Hero Banner */}
            <div className="grasse-hero">
              <img
                src="/pink_rose_petals.jpg"
                alt="مزارع اختصاصی گل رز گراس خانه عطر آنتی"
                className="grasse-hero-bg"
                referrerPolicy="no-referrer"
              />
              <div className="grasse-hero-overlay" />
              <div className="grasse-hero-content">
                <div className="grasse-location-badge">
                  <MapPin size={14} />
                  <span>پرووانس، فرانسه • Grasse, Côte d'Azur</span>
                </div>
                <h2 className="grasse-title font-brand-story">
                  مزارع اختصاصی گل گراس؛ مهد عطرآفرینی جهان
                </h2>
                <p className="grasse-lead">
                  جایی که جادوی خاک پرووانس و نسیم مدیترانه با دستان کهنه‌کار گل‌چینان پیوند می‌خورد تا گران‌بهاترین قطرات عطر جهان متولد شوند.
                </p>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="grasse-body">
            {/* Terroir & Microclimate Section */}
            <div className="grasse-story-grid">
              <div className="grasse-story-text">
                <span className="grasse-section-tag">اقلیم و بوم‌شناسی یگانه</span>
                <h3 className="grasse-heading">معجزه خاک و خورشید در کوهپایه‌های آلپ</h3>
                <p className="grasse-paragraph">
                  شهر تاریخی گراس واقع در جنوب فرانسه، به سبب پناه گرفتن میان قله‌های آلپ و گرمای ملایم دریای مدیترانه، دارای یک ریزاقلیم (Microclimate) منحصربه‌فرد در سراسر کره زمین است. شب‌های خنک و روزهای آفتابی، غلظت اسانس روغنی گل‌ها را به اوج شکوفایی می‌رساند.
                </p>
                <p className="grasse-paragraph">
                  خانه عطر آنتی دارای ۵ هکتار باغ اختصاصی است که منحصراً با کودهای زیستی غنی و آب چشمه‌های طبیعی سیراب می‌شوند؛ بدون ذره‌ای آفت‌کش شیمیایی.
                </p>
              </div>

              <div className="grasse-highlights-card">
                <div className="highlight-item">
                  <Clock size={20} className="hl-icon" />
                  <div>
                    <strong>ساعت ۵ تا ۸ صبح</strong>
                    <span>برداشت سحرگاهی پیش از تبخیر شبنم گلبرگ‌ها</span>
                  </div>
                </div>

                <div className="highlight-item">
                  <Droplets size={20} className="hl-icon" />
                  <div>
                    <strong>۴۰۰ کیلوگرم گل رز</strong>
                    <span>برای استخراج تنها ۱ لیتر عصاره روغنی خالص (Rose Absolute)</span>
                  </div>
                </div>

                <div className="highlight-item">
                  <Sun size={20} className="hl-icon" />
                  <div>
                    <strong>۳۰۰ روز آفتاب در سال</strong>
                    <span>تابش طلایی پرووانس برای تراکم عطر گلبرگ‌ها</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Harvest Calendar */}
            <div className="grasse-harvest-section">
              <div className="section-header-centered">
                <span className="section-kicker">تقویم طلایی گل‌چینی</span>
                <h3 className="section-title">فصل‌های برداشت دستی شکوفه‌های آنتی</h3>
                <div className="section-divider-line" />
              </div>

              <div className="harvest-cards-grid">
                {/* Card 1: Rose de Mai */}
                <div className="harvest-card">
                  <div className="harvest-month-badge">اردیبهشت (May)</div>
                  <h4 className="harvest-name">رز صدپر سنتیفولیا (Rose de Mai)</h4>
                  <p className="harvest-desc">
                    ملکه بی‌همتای گل‌های عطرسازی. گلبرگ‌های لطیف آن تنها در ماه مه باز می‌شوند و بویی عسلی، پودری و به‌غایت غنی تولید می‌کنند.
                  </p>
                  <div className="harvest-fragrance-note">
                    <Sparkles size={14} />
                    <span>موجود در عطر: رز سفید و رز کهربایی آنتی</span>
                  </div>
                </div>

                {/* Card 2: Jasmine */}
                <div className="harvest-card">
                  <div className="harvest-month-badge">مرداد تا مهر (Aug - Oct)</div>
                  <h4 className="harvest-name">یاسمن بزرگ‌گل گراس (Jasminum Grandiflorum)</h4>
                  <p className="harvest-desc">
                    دست‌چین شده در گرگ‌ومیش سپیده‌دم. رایحه‌ای افسون‌کننده، گرم، اشرافی و به شدت ماندگار با تمی مخملی و شیرین.
                  </p>
                  <div className="harvest-fragrance-note">
                    <Sparkles size={14} />
                    <span>موجود در عطر: شب مخملی و عود سلطنتی آنتی</span>
                  </div>
                </div>

                {/* Card 3: Lavender & Neroli */}
                <div className="harvest-card">
                  <div className="harvest-month-badge">تیر و مرداد (Jul - Aug)</div>
                  <h4 className="harvest-name">شکوفه بهارنارنج و اسطوخودوس</h4>
                  <p className="harvest-desc">
                    برداشت از تپه‌های ارتفاع‌بالای پرووانس. عصاره‌گیری با بخار خنک برای استخراج تم‌های سرزنده، باطراوت و شفاف مرکباتی-گیاهی.
                  </p>
                  <div className="harvest-fragrance-note">
                    <Sparkles size={14} />
                    <span>موجود در عطر: یاس بهشتی و نسیم صبحگاهی آنتی</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Tour Booking Card */}
            <div className="grasse-booking-card">
              <div className="booking-info">
                <div className="booking-tag">
                  <Calendar size={15} />
                  <span>تور اختصاصی فصل بهار</span>
                </div>
                <h4 className="booking-title">درخواست دعوت‌نامه بازدید VIP از مزارع گراس</h4>
                <p className="booking-desc">
                  باشگاه مشتریان VIP خانه عطر آنتی سالانه میزبان جمعی از عاشقان عطر در فصل برداشت گل رز در گراس فرانسه است. با ثبت اطلاعات خود، در لیست اولویت دعوت‌نامه قرار گیرید.
                </p>
              </div>

              <div className="booking-form-wrap">
                {isSubmitted ? (
                  <div className="booking-success-msg">
                    <CheckCircle2 size={36} className="success-icon" />
                    <h5>درخواست شما با موفقیت ثبت شد</h5>
                    <p>کانسیرژ اختصاصی آنتی به زودی برای هماهنگی با شما تماس خواهد گرفت.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="booking-form">
                    <div className="form-group">
                      <label htmlFor="grasse-name">نام و نام خانوادگی</label>
                      <input
                        type="text"
                        id="grasse-name"
                        placeholder="مثال: سارا رادمنش"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="grasse-phone">شماره همراه (جهت تماس کانسیرژ)</label>
                      <input
                        type="tel"
                        id="grasse-phone"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        required
                        dir="ltr"
                      />
                    </div>
                    <button type="submit" className="btn-primary booking-submit-btn">
                      <Send size={15} />
                      <span>ثبت درخواست دعوت‌نامه VIP</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="grasse-actions">
              <button
                type="button"
                className="btn-primary grasse-cta-btn"
                onClick={() => {
                  onClose();
                  if (onExploreCollection) onExploreCollection();
                }}
              >
                <span>مشاهده عطرهای دست‌ساز با گل‌های گراس</span>
                <ArrowLeft size={16} />
              </button>

              <button
                type="button"
                className="btn-secondary grasse-close-alt"
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
