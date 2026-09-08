import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, Palette, Package } from 'lucide-react';
import { FEATURES } from '../data/products';
import './Features.css';

const ICON_MAP = {
  Sparkles: Sparkles,
  Clock: Clock,
  Palette: Palette,
  Package: Package,
};

export default function Features() {
  return (
    <section className="features-section" aria-label="ویژگی‌های برجسته برند آنتی">
      <div className="app-container">
        <motion.div
          className="features-strip-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {FEATURES.map((feat, index) => {
            const IconComponent = ICON_MAP[feat.iconName] || Sparkles;
            return (
              <motion.div
                key={feat.id}
                className="feature-item"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="feature-icon-box">
                  <IconComponent size={22} strokeWidth={1.75} />
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">{feat.title}</h3>
                  <p className="feature-subtitle">{feat.subtitle}</p>
                </div>
                {index < FEATURES.length - 1 && <div className="feature-divider" />}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
