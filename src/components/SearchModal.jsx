import React, { useState } from 'react';
import { X, Search, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import './SearchModal.css';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      p.name.includes(term) ||
      p.englishName.toLowerCase().includes(term) ||
      p.description.includes(term) ||
      p.category.includes(term)
    );
  });

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-top-bar">
          <div className="search-input-wrap">
            <Search size={22} className="search-input-icon" />
            <input
              type="text"
              placeholder="جستجوی نام عطر، رایحه، گلبرگ یا ترکیبات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="search-main-input"
            />
          </div>
          <button type="button" className="search-close-btn" onClick={onClose} aria-label="بستن جستجو">
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="search-results-box">
          <div className="search-results-header">
            <span>یافته‌ها: {filteredProducts.length} عطر</span>
          </div>

          <div className="search-results-grid">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="search-item-card"
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
              >
                <img src={prod.image} alt={prod.name} className="search-item-img" />
                <div className="search-item-info">
                  <h4 className="search-item-title">{prod.name}</h4>
                  <span className="search-item-en">{prod.englishName}</span>
                  <span className="search-item-price">{prod.priceFormatted}</span>
                </div>
                <ArrowLeft size={16} className="search-arrow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
