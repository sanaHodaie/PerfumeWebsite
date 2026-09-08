import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import './ProductGrid.css';

export default function ProductGrid({ onAddToCart, onQuickView }) {
  // مدیریت وضعیت نمایش همه یا بخشی از محصولات
  const [showAll, setShowAll] = useState(false);

  // در صورت کلیک، لیست کامل یا فقط ۵ محصول اول نمایش داده می‌شود
  const displayedProducts = showAll ? PRODUCTS : PRODUCTS.slice(0, 5);

  const handleToggleViewAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <section id="collection" className="collection-section" aria-label="مجموعه کامل عطرهای آنتی">
      <div className="app-container">
        {/* Section Header with Fade-in Effect */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="header-titles">
            <h2 className="section-title">
              <span className="section-title-text">مجموعه ما</span>
              <span className="section-title-accent"></span>
            </h2>
          </div>
          
          <button
            type="button"
            id="collection-view-all-btn"
            className="view-all-btn"
            onClick={handleToggleViewAll}
          >
            {showAll ? 'بستن' : 'مشاهده همه'}
          </button>
        </motion.div>

        {/* 5-Column Product Grid with Upward Stagger Animations */}
        <div className="products-grid-5">
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}