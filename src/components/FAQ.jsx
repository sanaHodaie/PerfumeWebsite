import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, PhoneCall, ShieldCheck, Truck } from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';
import './FAQ.css';

export default function FAQ() {
  // First item open by default for immediate preview & utility
  const [openId, setOpenId] = useState(1);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="faq-section" aria-label="سوالات متداول مشتریان عطر آنتی">
      <div className="app-container">
        {/* Section Header with Fade-in Effect */}
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="faq-badge">
            <HelpCircle size={15} />
            <span>پاسخ به پرسش‌های شما</span>
          </div>
          <h2 className="faq-title font-serif-luxury">سوالات متداول</h2>
          <p className="faq-subtitle">
            اطلاعات شفاف در مورد شیوه ارسال، ضمانت اصالت کالا و پشتیبانی اختصاصی برند آنتی
          </p>
        </motion.div>

        {/* Accordion Container */}
        <div className="faq-accordion-container">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                className={`faq-item-card ${isOpen ? 'faq-item-open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Question Header Button */}
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  id={`faq-btn-${item.id}`}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="faq-question-left">
                    <span className="faq-category-tag">{item.category}</span>
                    <h3 className="faq-question-text">{item.question}</h3>
                  </div>

                  <div className={`faq-icon-pill ${isOpen ? 'faq-icon-active' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="faq-answer-wrapper"
                    >
                      <div className="faq-answer-inner">
                        <p className="faq-answer-text">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support Callout Box */}
        <motion.div
          className="faq-support-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="faq-support-content">
            <div className="faq-support-icon">
              <PhoneCall size={20} />
            </div>
            <div>
              <h4 className="faq-support-title">پرسش دیگری در ذهن دارید؟</h4>
              <p className="faq-support-desc">
                تیم مشاوران رایحه آنتی آماده پاسخگویی و ارائه مشاوره تخصصی در انتخاب عطر مناسب شما هستند.
              </p>
            </div>
          </div>
          <a href="tel:02122005544" className="faq-support-call-btn">
            تماس با کارشناس
          </a>
        </motion.div>
      </div>
    </section>
  );
}
