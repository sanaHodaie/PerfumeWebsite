import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Sparkles } from 'lucide-react';
import { ABOUT_DATA } from '../data/products';
import './About.css';

import smellperfumebywoman from '../assets/images/Gemini_Generated_Image_qa10ieqa10ieqa10.jpg';
import petal from '../assets/images/bb2fa5eb5e24af10940b68626e0cd4d1.jpg';
import tallBottle from '../assets/images/baf9ab4b9adfd3ab70ba23265ccf29b8.jpg';

export default function About({ onDiscoverClick }) {
  return (
    <section id="about" className="about-section" aria-label="درباره برند لوکس عطر آنتی">
      <div className="app-container about-container">
        
        {/* RIGHT SIDE (In Mobile: Top): Asymmetric 3-Image Collage Side */}
        <motion.div
          className="about-collage-column"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="collage-grid">
            {/* Tall Card: Crystal Perfume Bottle (ادکلن) */}
            <motion.div
              className="collage-card card-tall"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={smellperfumebywoman}
                alt="پرتره الهام‌بخش عطر زنانه آنتی"
                className="collage-img"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="card-overlay" />
            </motion.div>

            {/* Stacked Column: Muse Portrait + Pink Rose Petals */}
            <div className="collage-stacked-column">
              {/* Top: Muse with Cherry Blossoms and Perfume */}
              <motion.div
                className="collage-card card-woman"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={tallBottle}
                  alt="عطر کریستالی لوکس آنتی"
                  className="collage-img"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="card-overlay" />
              </motion.div>

              {/* Bottom: Sparkling Pink Rose Petals (گلبرگ‌های صورتی) */}
              <motion.div
                className="collage-card card-flower"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={petal}
                  alt="گلبرگ‌های درخشان و مخملی رز صورتی"
                  className="collage-img"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="card-overlay" />
              </motion.div>
            </div>

            {/* آیکون مثبت متصل به کل شبکه - دقیقاً روی مرکز مرز ادکلن و گلبرگ */}
            <div
              className="alchemy-plus-badge"
              title="پیوند جادویی ادکلن و گلبرگ‌های صورتی"
              aria-label="پیوند جادویی ادکلن و گلبرگ‌های صورتی"
            >
              <div className="alchemy-plus-inner">
                <Plus size={14} strokeWidth={2.8} className="alchemy-plus-icon" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* LEFT SIDE (In Mobile: Bottom Box): Editorial Text Side */}
        <motion.div
          className="about-text-column"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >


          <h2 className="about-heading font-brand-story">
            <span className="about-heading-text">{ABOUT_DATA.heading}</span>
            <span className="about-heading-accent" />
          </h2>

          <p className="about-lead">
            {ABOUT_DATA.lead}
          </p>

          <p className="about-body">
            {ABOUT_DATA.paragraph1}
          </p>

          <p className="about-body">
            {ABOUT_DATA.paragraph2}
          </p>

          <div className="about-cta-wrapper">
            <button
              type="button"
              id="about-discover-btn"
              className="btn-primary about-btn"
              onClick={onDiscoverClick}
            >
              <span>{ABOUT_DATA.ctaText}</span>
              <span className="btn-icon-wrapper">
                <ArrowLeft size={16} />
              </span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}