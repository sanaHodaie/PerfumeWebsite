import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star, Plus, ArrowLeft, Check } from 'lucide-react';
import { PROMOTIONAL_BANNER_2 } from '../data/products';
import { getProducts } from '../lib/productsApi';
import './BestSellers.css';

const toFaDigit = (num) => {
  if (num === undefined || num === null) return '';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[x]);
};

export default function BestSellers({
  onAddToCart,
  onQuickView,
  onExploreNotes,
}) {
  const [products, setProducts] = useState([]);
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const data = await getProducts();

        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
          console.log('🏆 BestSellers - Supabase:', data);
        }
      } catch (error) {
        console.error('❌ BestSellers - Supabase error:', error);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // فقط محصولات پرفروش و فعال
  const bestSellerList = products
    .filter((p) => p.isBestSeller && p.isActive !== false)
    .slice(0, 4);

  const handleAddWithFeedback = (e, item) => {
    e.stopPropagation();
    onAddToCart(item);

    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="bestsellers" className="bestsellers-section" aria-label="عطرهای پرفروش آنتی">
      <div className="app-container">
        <div className="bestsellers-layout">

          <div className="bestsellers-list-column">

            <motion.div
              className="bestsellers-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <span className="bestsellers-eyebrow">محبوب‌ترین رایحه‌ها از نگاه مشتریان</span>
                <h2 className="bestsellers-title">پرفروش‌ترین‌ها</h2>
              </div>

              <button
                type="button"
                id="bestsellers-view-all-btn"
                className="view-all-link"
                onClick={() => {
                  const el = document.getElementById('collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>مشاهده همه</span>
                <ArrowLeft size={14} />
              </button>
            </motion.div>

            <div className="bestsellers-compact-list">
              {bestSellerList.map((item, index) => {
                const isAdded = addedItems[item.id];

                return (
                  <motion.div
                    key={item.id}
                    className="bestseller-item-card"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => onQuickView(item)}
                  >
                    <span className="bestseller-rank">{toFaDigit(`0${index + 1}`)}</span>

                    <div className="bestseller-thumbnail">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="bestseller-thumb-img"
                        loading="lazy"
                      />
                    </div>

                    <div className="bestseller-info">
                      <h3 className="bestseller-name">{item.name}</h3>
                      <span className="bestseller-en-name">{item.englishName}</span>

                      <div className="bestseller-meta">
                        <span className="bestseller-price">{item.priceFormatted}</span>

                        <div className="bestseller-rating">
                          <div className="stars-row">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={11}
                                fill="#E8A956"
                                color="#E8A956"
                              />
                            ))}
                          </div>
                          <span className="rating-score">({toFaDigit(item.rating)})</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`bestseller-add-btn ${isAdded ? 'added' : ''}`}
                      onClick={(e) => handleAddWithFeedback(e, item)}
                      title={`افزودن ${item.name} به سبد خرید`}
                      aria-label={`افزودن ${item.name} به سبد خرید`}
                    >
                      {isAdded ? (
                        <Check size={16} strokeWidth={2.5} />
                      ) : (
                        <Plus size={16} strokeWidth={2.5} />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            className="bestsellers-art-column"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="art-card">
              <div className="art-visual">
                <img
                  src={PROMOTIONAL_BANNER_2.image}
                  alt="هنر عطرسازی اصیل و فاخر"
                  className="art-img"
                  loading="lazy"
                />
                <div className="art-overlay" />
              </div>

              <div className="art-content">
                <span className="art-tag">میراث عطرسازی دست‌ساز</span>
                <h3 className="art-heading font-serif-luxury">{PROMOTIONAL_BANNER_2.heading}</h3>
                <p className="art-text">{PROMOTIONAL_BANNER_2.text}</p>

                <button
                  type="button"
                  id="art-cta-btn"
                  className="art-cta-btn"
                  onClick={onExploreNotes}
                >
                  <span>{PROMOTIONAL_BANNER_2.ctaText}</span>
                  <ArrowLeft size={14} />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}