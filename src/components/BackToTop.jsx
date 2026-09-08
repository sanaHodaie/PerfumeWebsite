import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import './BackToTop.css';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          id="back-to-top-btn"
          className="back-to-top-hologram"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.94 }}
          aria-label="بازگشت به بالای صفحه"
          title="بازگشت به بالای صفحه"
        >
          {/* Holographic animated iridescent sweep sheen */}
          <span className="hologram-prism-ring" aria-hidden="true" />
          <span className="hologram-light-glint" aria-hidden="true" />

          {/* Core icon with subtle rose burgundy glow */}
          <div className="hologram-icon-wrap">
            <ArrowUp size={20} strokeWidth={2.4} className="hologram-arrow-icon" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
