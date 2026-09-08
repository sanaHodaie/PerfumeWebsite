import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import './Newsletter.css';

export default function Newsletter({ onSubscribeSuccess }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    if (onSubscribeSuccess) {
      onSubscribeSuccess(email);
    }
  };

  return (
    <section id="newsletter" className="newsletter-section" aria-label="عضویت در خبرنامه و باشگاه اختصاصی">
      <div className="app-container">
        <motion.div
          className="newsletter-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Form Content Side with Fade-in Effect */}
          <motion.div
            className="newsletter-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="newsletter-eyebrow">عضویت در باشگاه اختصاصی</span>
            <h2 className="newsletter-title font-serif-luxury">به دنیای آنتی بپیوندید</h2>
            <p className="newsletter-description">
              برای دریافت اخبار مجموعه‌های جدید، دسترسی زودتر به نسخه‌های محدود و پیشنهادهای اختصاصی، ایمیل خود را وارد کنید.
            </p>

            {isSubscribed ? (
              <div className="newsletter-success-box">
                <CheckCircle2 size={24} className="success-icon" />
                <div>
                  <h4 className="success-title">عضویت شما با موفقیت ثبت شد</h4>
                  <p className="success-desc">کد تخفیف اولین خرید به ایمیل شما ارسال گردید.</p>
                </div>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="ایمیل خود را اینجا وارد کنید..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" id="newsletter-submit-btn" className="newsletter-submit-btn">
                  <span>عضویت</span>
                  <span className="btn-arrow-circle">
                    <ArrowLeft size={16} />
                  </span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Visual Bottle & Blossom Side with Upward Entrance */}
          <motion.div
            className="newsletter-visual"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80"
              alt="عطر لوکس آنتی در بسته‌بندی گل سرخ"
              className="newsletter-img"
              loading="lazy"
            />
            <div className="newsletter-visual-overlay" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
