import React from 'react';
import { X, Sparkles, Plus, Star } from 'lucide-react';
import './QuickViewModal.css';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="quickview-close-btn" onClick={onClose} aria-label="بستن">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Visual Column */}
          <div className="quickview-visual">
            <div className="quickview-img-frame">
              <img src={product.image} alt={product.name} className="quickview-img" />
            </div>

            <div className="quickview-badge">
              <Sparkles size={13} />
              <span>{product.volume || '۱۰۰ میلی‌لیتر'} • ادو پرفوم</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="quickview-details">
            <div className="quickview-header">
              <span className="quickview-cat">{product.category}</span>
              <h3 className="quickview-title">{product.name}</h3>
              <span className="quickview-en-title">{product.englishName}</span>

              <div className="quickview-rating-row">
                <div className="stars-cluster">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#E8A956" color="#E8A956" />
                  ))}
                </div>
                <span className="rating-num">({product.rating} از ۵ بر اساس {product.reviewsCount} نظر)</span>
              </div>
            </div>

            <p className="quickview-description">{product.description}</p>

            {/* Scent Pyramid (هرم بویایی) */}
            {product.notes && (
              <div className="scent-pyramid-box">
                <h5 className="pyramid-title">هرم بویایی و آکوردهای عطر</h5>

                <div className="pyramid-step">
                  <span className="step-label">نت آغازین:</span>
                  <span className="step-content">{product.notes.top}</span>
                </div>

                <div className="pyramid-step">
                  <span className="step-label">نت میانی (قلب عطر):</span>
                  <span className="step-content">{product.notes.heart}</span>
                </div>

                <div className="pyramid-step">
                  <span className="step-label">نت ماندگار پایه:</span>
                  <span className="step-content">{product.notes.base}</span>
                </div>
              </div>
            )}

            <div className="quickview-action-footer">
              <div className="quickview-price-tag">
                <span className="price-label">قیمت اختصاصی:</span>
                <span className="price-val">{product.priceFormatted}</span>
              </div>

              <button
                type="button"
                className="btn-primary quickview-add-btn"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>افزودن به سبد خرید</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}