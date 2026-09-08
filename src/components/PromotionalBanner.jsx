import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
// فرض می‌کنیم هر دو عکس را از پوشه data یا assets ایمپورت می‌کنید
import { PROMOTIONAL_BANNER_1 } from '../data/products';
import './PromotionalBanner.css';

export default function PromotionalBanner({ onShopNow }) {
  return (
    <section className="promo-banner-section" aria-label="بنر معرفی کالکشن ویژه">
      <div className="app-container">
        <motion.div
          className="promo-banner-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* تگ Picture برای تعویض خودکار عکس در موبایل و دسکتاپ */}
          <picture className="promo-bg-picture">
            <source media="(max-width: 900px)" srcSet={PROMOTIONAL_BANNER_1.mobileImage} />
            <img 
              src={PROMOTIONAL_BANNER_1.image} 
              alt={PROMOTIONAL_BANNER_1.heading} 
              className="promo-bg-img"
            />
          </picture>

          {/* لایه تیره کننده برای خوانایی متن */}
          <div className="promo-overlay" />

          <motion.div
            className="promo-content-side"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="promo-eyebrow">کالکشن خصوصی و اشرافی</span>
            
            <h2 className="promo-heading font-serif-luxury">
              {PROMOTIONAL_BANNER_1.heading}
            </h2>
            
            <p className="promo-description">
              {PROMOTIONAL_BANNER_1.subtitle}
            </p>

            <button
              type="button"
              id="promo-shop-btn"
              className="promo-btn"
              onClick={onShopNow}
            >
              <span>{PROMOTIONAL_BANNER_1.ctaText}</span>
              <span className="promo-btn-arrow">
                <ArrowLeft size={16} />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}