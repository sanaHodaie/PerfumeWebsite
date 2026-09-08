import React from 'react';
import { motion } from 'framer-motion';
import { Star, Truck, ShieldCheck, RotateCcw, CheckCircle2 } from 'lucide-react';
import { TESTIMONIAL, TRUST_BADGES } from '../data/products';
import './Testimonials.css';
import ourCustomerperfume from '../assets/images/a2c0707ffc06859ef6cff9752df4dba9.jpg';

const TRUST_ICON_MAP = {
  Truck: Truck,
  ShieldCheck: ShieldCheck,
  RotateCcw: RotateCcw,
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section" aria-label="نظرات مشتریان و تضمین‌های خرید">
      <div className="app-container">
        
        {/* Header Section */}
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="testimonials-eyebrow">تجربه مشتریان گرامی</span>
          <h2 className="testimonials-title">آنچه مشتریان ما می‌گویند</h2>
          <div className="title-divider" />
        </motion.div>

        {/* Editorial Testimonial Card */}
        <motion.div
          className="testimonial-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Portrait Side */}
          <motion.div
            className="testimonial-portrait-side"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portrait-frame">
              <img
                src={ourCustomerperfume}
                alt={TESTIMONIAL.author}
                className="portrait-img"
                loading="lazy"
              />
              <div className="portrait-badge">
                <CheckCircle2 size={14} className="verified-icon" />
                <span>خریدار تاییدشده</span>
              </div>
            </div>
          </motion.div>

          {/* Content Side - Completely Centered without Quote Mark */}
          <div className="testimonial-content-side">
            <p className="testimonial-quote">{TESTIMONIAL.quote}</p>

            <div className="testimonial-footer">
              <div className="testimonial-author-meta">
                <h3 className="author-name">{TESTIMONIAL.author}</h3>
                <span className="author-role">{TESTIMONIAL.role}</span>
              </div>

              <div className="author-stars-box" aria-label={`امتیاز ${TESTIMONIAL.rating} از ۵`}>
                <div className="author-stars">
                  {[...Array(TESTIMONIAL.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="#E8A956"
                      color="#E8A956"
                    />
                  ))}
                </div>
                <span className="rating-score">۵.۰</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3-Badge Trust Strip */}
        <div className="trust-strip">
          {TRUST_BADGES.map((badge, index) => {
            const IconComponent = TRUST_ICON_MAP[badge.iconName] || ShieldCheck;
            return (
              <motion.div
                key={badge.id || index}
                className="trust-badge-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="trust-icon-box">
                  <IconComponent size={22} strokeWidth={1.8} />
                </div>
                <div className="trust-text">
                  <h4 className="trust-title">{badge.title}</h4>
                  <p className="trust-desc">{badge.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}