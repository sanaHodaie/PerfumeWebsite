import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Briefcase, CheckCircle2, Send, Users, Award, Clock, ArrowLeft } from 'lucide-react';
import './CareerOpportunitiesModal.css';

export default function CareerOpportunitiesModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    field: 'perfumer',
    portfolioNote: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      field: 'perfumer',
      portfolioNote: '',
    });
  };

  return (
    <AnimatePresence>
      <div className="career-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="career-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Close Button */}
          <button
            type="button"
            className="career-close-btn"
            onClick={onClose}
            aria-label="بستن صفحه فرصت‌های همکاری"
          >
            <X size={20} />
          </button>

          {/* Internal Scroll Wrapper */}
          <div className="career-scroll-wrapper">
            {/* Modal Hero Banner */}
            <div className="career-hero">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="فرصت‌های همکاری و استخدام در خانه عطر آنتی"
                className="career-hero-bg"
                referrerPolicy="no-referrer"
              />
              <div className="career-hero-overlay" />
              <div className="career-hero-content">
                <div className="career-badge">
                  <Briefcase size={14} />
                  <span>پیوستن به نخبگان هنر عطر • Careers & Talent</span>
                </div>
                <h2 className="career-title font-brand-story">
                  فرصت‌های همکاری؛ خلق آینده عطرسازی فاخر با هم
                </h2>
                <p className="career-lead">
                  اگر به ظرافت، هنر آفرینش رایحه‌ها و استانداردهای بی‌بدیل جهان لوکس عشق می‌ورزید، جای شما در خانواده آنتی خالی است.
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="career-body">
              {/* Part 1: شرایط همکاری مختصر و مفید */}
              <div className="career-section">
                <div className="career-section-header">
                  <span className="career-kicker">اصول و نیازمندی‌ها</span>
                  <h3 className="career-heading">شرایط عمومی و ویژگی‌های همکاران آنتی</h3>
                  <div className="career-divider" />
                </div>

                <div className="career-qualifications-grid">
                  <div className="qual-card">
                    <div className="qual-icon">
                      <Sparkles size={20} />
                    </div>
                    <div className="qual-text">
                      <h4 className="qual-title">اشتیاق راستین به دنیای نیش و لوکس</h4>
                      <p className="qual-desc">درک عمیق از هرم بویایی، ارزش مواد خام طبیعی و احترام به جزییات بی‌نقص محصول.</p>
                    </div>
                  </div>

                  <div className="qual-card">
                    <div className="qual-icon">
                      <Users size={20} />
                    </div>
                    <div className="qual-text">
                      <h4 className="qual-title">روحیه‌ی هم‌افزایی و مسئولیت‌پذیری</h4>
                      <p className="qual-desc">توانایی کار تیمی پرانرژی در محیطی محترمانه، بین‌المللی و مشتاق به یادگیری مستمر.</p>
                    </div>
                  </div>

                  <div className="qual-card">
                    <div className="qual-icon">
                      <Award size={20} />
                    </div>
                    <div className="qual-text">
                      <h4 className="qual-title">تخصص و سابقه مرتبط یا استعداد درخشان</h4>
                      <p className="qual-desc">سوابق اجرایی در عطرسازی، مشاوره فروش لوکس، دیجیتال مارکتینگ یا فارغ‌التحصیلی از رشته‌های شیمی و طراحی.</p>
                    </div>
                  </div>

                  <div className="qual-card">
                    <div className="qual-icon">
                      <Clock size={20} />
                    </div>
                    <div className="qual-text">
                      <h4 className="qual-title">مزایای منحصر‌به‌فرد خانه عطر آنتی</h4>
                      <p className="qual-desc">بیمه تکمیلی ممتاز، پاداش‌های فصلی، دوره‌های آموزشی تخصصی در فرانسه و محیط کاری پرآرامش.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2: باکس دعوت به همکاری و فرم ارسال رزومه */}
              <div className="career-form-section">
                <div className="career-invite-box">
                  <div className="invite-box-header">
                    <div className="invite-badge">
                      <Sparkles size={14} />
                      <span>فرم درخواست پیوستن به تیم</span>
                    </div>
                    <h3 className="invite-title">باکس دعوت به همکاری</h3>
                    <p className="invite-subtitle">
                      مشخصات خود را همراه با زمینه تخصص ارسال فرمایید. تیم منابع انسانی آنتی ظرف حداکثر ۴۸ ساعت با شما تماس خواهند گرفت.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <div className="career-success-state">
                      <div className="success-icon-circle">
                        <CheckCircle2 size={36} />
                      </div>
                      <h4 className="success-title">درخواست شما با موفقیت دریافت شد!</h4>
                      <p className="success-desc">
                        از ابراز علاقه شما به همکاری با خانه عطر آنتی سپاسگزاریم. همکاران ما در واحد منابع انسانی رزومه شما را بررسی کرده و جهت مصاحبه هماهنگی لازم را به عمل خواهند آورد.
                      </p>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={handleReset}
                      >
                        ارسال درخواست جدید
                      </button>
                    </div>
                  ) : (
                    <form className="career-form" onSubmit={handleSubmit}>
                      <div className="career-form-grid">
                        {/* Full Name */}
                        <div className="form-group">
                          <label className="form-label" htmlFor="career-name">
                            نام و نام خانوادگی <span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            id="career-name"
                            required
                            className="form-input"
                            placeholder="مثال: سارا رادمنش"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          />
                        </div>

                        {/* Phone */}
                        <div className="form-group">
                          <label className="form-label" htmlFor="career-phone">
                            شماره تماس همراه <span className="req">*</span>
                          </label>
                          <input
                            type="tel"
                            id="career-phone"
                            required
                            dir="ltr"
                            className="form-input text-left"
                            placeholder="۰۹۱۲..."
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                          <label className="form-label" htmlFor="career-email">
                            آدرس ایمیل
                          </label>
                          <input
                            type="email"
                            id="career-email"
                            dir="ltr"
                            className="form-input text-left"
                            placeholder="yourname@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>

                        {/* Field of Interest */}
                        <div className="form-group">
                          <label className="form-label" htmlFor="career-field">
                            زمینه همکاری مورد علاقه <span className="req">*</span>
                          </label>
                          <select
                            id="career-field"
                            className="form-select"
                            value={formData.field}
                            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                          >
                            <option value="perfumer">طراحی و ارزیابی رایحه (Nose / Perfumer)</option>
                            <option value="advisor">مشاور و سفیر فروش در بوتیک‌های آنتی</option>
                            <option value="marketing">دیجیتال مارکتینگ و روابط عمومی لوکس</option>
                            <option value="chemist">آزمایشگاه، فرمولاسیون و کنترل کیفیت</option>
                            <option value="logistics">بسته‌بندی فاخر، انبارداری و ارسال</option>
                            <option value="other">سایر زمینه‌ها و پیشنهادات همکاری تجاری</option>
                          </select>
                        </div>
                      </div>

                      {/* Brief Notes / Resume Link */}
                      <div className="form-group mt-3">
                        <label className="form-label" htmlFor="career-note">
                          خلاصه سوابق، لینک رزومه یا پیام شما
                        </label>
                        <textarea
                          id="career-note"
                          rows={3}
                          className="form-textarea"
                          placeholder="مختصری از سوابق تحصیلی، شغلی یا مهارت‌های شاخص خود را بنویسید..."
                          value={formData.portfolioNote}
                          onChange={(e) => setFormData({ ...formData, portfolioNote: e.target.value })}
                        />
                      </div>

                      {/* Submit button */}
                      <div className="form-submit-row">
                        <button type="submit" className="btn-primary career-submit-btn">
                          <span>ارسال فرم درخواست همکاری</span>
                          <Send size={16} />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="career-actions">
                <button
                  type="button"
                  className="btn-secondary career-close-alt"
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
