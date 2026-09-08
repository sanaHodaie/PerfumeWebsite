import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Sparkles, Clock, Palette, Package } from 'lucide-react';
import { HERO_DATA, FEATURES } from '../data/products';
import heroPosterImg from '../assets/images/Gemini_Generated_Image_fifj8afifj8afifj-tinypng.io.webp';
import './Hero.css';

const FEATURE_ICONS = {
  Clock: Clock,
  Sparkles: Sparkles,
  Palette: Palette,
  Package: Package,
};

export default function Hero({ onExploreClick, onWatchStory }) {
  return (
    <section id="hero" className="hero-section" aria-label="بخش اصلی و معرفی عطر لوکس آنتی">
      {/* Background Visual Layer: The exact uploaded Hero poster image */}
      <div className="hero-bg-layer" aria-hidden="true">
        <img
          src={heroPosterImg}
          alt="عطر لوکس آنتی - عطر با شیشه کریستالی و گل‌های بهاری"
          className="hero-bg-image"
          loading="eager"
        />
        {/* Soft luxury veil on the left side to maximize Persian typography legibility */}
        <div className="hero-left-veil" />
      </div>

      <div className="app-container hero-container">
        {/* Hero Content Overlay strictly positioned on the LEFT SIDE */}
        <motion.div
          className="hero-content-left"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Persian Luxury Eyebrow */}


          {/* Persian Headline - unified in Estedad font */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-title-main">{HERO_DATA.headlinePrefix}</span>
            <span className="hero-title-highlight">{HERO_DATA.headlineHighlight}</span>
          </motion.h1>

          {/* Persian Description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {HERO_DATA.description}
          </motion.p>

          {/* Real HTML CTA Buttons */}
          <motion.div
            className="hero-cta-group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Primary CTA Button: Deep Burgundy Pill Shape with circular arrow */}
            <button
              type="button"
              id="hero-explore-btn"
              className="hero-btn-primary"
              onClick={onExploreClick}
            >
              <span>{HERO_DATA.primaryCta}</span>
              <span className="btn-icon-wrapper">
                <ArrowLeft size={16} />
              </span>
            </button>

            {/* Secondary CTA Button: Transparent, minimal with circular play icon */}
            <button
              type="button"
              id="hero-story-btn"
              className="hero-btn-secondary"
              onClick={onWatchStory}
            >
              <span className="play-icon-circle">
                <Play size={13} fill="currentColor" />
              </span>
              <span>{HERO_DATA.secondaryCta}</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* FLOATING FEATURE BOX: Overlapping the Hero bottom boundary */}
      <motion.div
        className="hero-features-overlap-wrapper"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="ویژگی‌های برجسته برند عطر آنتی"
      >
        <div className="hero-floating-box">
          {FEATURES.map((feat, index) => {
            const IconComponent = FEATURE_ICONS[feat.iconName] || Sparkles;
            return (
              <div key={feat.id} className="floating-item">
                <div className="floating-item-icon-box">
                  <IconComponent size={20} strokeWidth={1.8} />
                </div>
                <div className="floating-item-text">
                  <h3 className="floating-item-title">{feat.title}</h3>
                  <p className="floating-item-subtitle">{feat.subtitle}</p>
                </div>
                {index < FEATURES.length - 1 && <div className="floating-divider" />}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
