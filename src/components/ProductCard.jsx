import React from 'react';
import { motion } from 'motion/react';
import { Plus, Eye } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, index = 0, onAddToCart, onQuickView }) {
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 5) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="product-card-visual-wrapper">
        <div className="product-card-visual">
          <motion.img
            src={product.image}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Quick View and Add to Cart action buttons on top right */}
          <div className="product-card-actions">
            <button
              type="button"
              className="product-action-btn btn-view"
              onClick={() => onQuickView(product)}
              title="مشاهده جزئیات رایحه"
              aria-label={`مشاهده جزئیات ${product.name}`}
            >
              <Eye size={15} strokeWidth={2} />
            </button>

            <button
              type="button"
              className="product-action-btn btn-add"
              onClick={() => onAddToCart(product)}
              title="افزودن به سبد خرید"
              aria-label={`افزودن ${product.name} به سبد خرید`}
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="product-card-info">
        <h4 className="product-name">{product.name}</h4>
        <span className="product-english-name">{product.englishName}</span>
        <div className="product-price">{product.priceFormatted}</div>
      </div>
    </motion.div>
  );
}
