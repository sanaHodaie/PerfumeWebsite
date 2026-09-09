import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, PhoneCall, Search, ThumbsUp, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';
import './FAQ.css';

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('همه');
  const [votedItems, setVotedItems] = useState({});

  // استخراج لیست دسته‌بندی‌های یکتا
  const categories = useMemo(() => {
    const cats = ['همه', ...new Set(FAQ_ITEMS.map((item) => item.category))];
    return cats;
  }, []);

  // فیلتر هوشمند سوالات بر اساس سرچ و دسته
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'همه' || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleVote = (id, type) => {
    if (votedItems[id]) return;
    setVotedItems((prev) => ({ ...prev, [id]: type }));
  };

  return (
    <section id="faq" className="faq-section" aria-label="سوالات متداول مشتریان عطر آنتی">
      <div className="app-container">
        {/* هدر بخش */}
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
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

          {/* باکس جستجوی زنده */}
          <div className="faq-search-wrapper">
            <Search size={18} className="faq-search-icon" />
            <input
              type="text"
              className="faq-search-input"
              placeholder="جستجو در سوالات (مثلاً: ضمانت، ارسال، تستر)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="faq-search-clear" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>

          {/* تب‌های دسته‌بندی */}
          <div className="faq-categories-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`faq-tab-btn ${activeCategory === cat ? 'faq-tab-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* لیست آکوردئون */}
        <div className="faq-accordion-container">
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    className={`faq-item-card ${isOpen ? 'faq-item-open' : ''}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
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

                            {/* بخش بازخورد کاربر */}
                            <div className="faq-feedback-bar">
                              <span>آیا این پاسخ برای شما مفید بود؟</span>
                              <div className="faq-feedback-actions">
                                <button
                                  className={`faq-vote-btn ${votedItems[item.id] === 'yes' ? 'voted' : ''}`}
                                  onClick={() => handleVote(item.id, 'yes')}
                                >
                                  <ThumbsUp size={14} />
                                  <span>{votedItems[item.id] === 'yes' ? 'مفید بود' : 'بله'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="faq-empty-state">
                <Sparkles size={32} />
                <p>نتیجه‌ای برای عبارت مورد نظر شما یافت نشد.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* باکس پشتیبانی */}
        <motion.div
          className="faq-support-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
            تماش با کارشناس
          </a>
        </motion.div>
      </div>
    </section>
  );
}