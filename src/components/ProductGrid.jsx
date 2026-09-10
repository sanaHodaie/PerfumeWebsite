import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Search, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import './ProductGrid.css';

export default function ProductGrid({ onAddToCart, onQuickView }) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortDropdownRef = useRef(null);

  const categories = ['همه', 'پرفروش‌ترین‌ها', 'گرم و شیرین', 'خنک و ملایم'];

  const sortOptions = [
    { value: 'featured', label: 'ترتیب: پیش‌فرض' },
    { value: 'rating', label: 'محبوب‌ترین‌ها' },
    { value: 'price-low', label: 'ارزان‌ترین' },
    { value: 'price-high', label: 'گران‌ترین' },
  ];

  // بستن دراپ‌داون هنگام کلیک بیرون از آن
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const processedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.englishName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.notes?.top?.toLowerCase().includes(q) ||
          p.notes?.heart?.toLowerCase().includes(q) ||
          p.notes?.base?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory === 'پرفروش‌ترین‌ها') {
      result = result.filter((p) => p.isBestSeller);
    } else if (selectedCategory === 'گرم و شیرین') {
      result = result.filter((p) => p.category.includes('گرم') || p.category.includes('شیرین'));
    } else if (selectedCategory === 'خنک و ملایم') {
      result = result.filter((p) => p.category.includes('خنک') || p.category.includes('ملایم'));
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const displayedProducts = showAll ? processedProducts : processedProducts.slice(0, 5);
  const activeSortLabel = sortOptions.find((opt) => opt.value === sortBy)?.label;

  return (
    <section id="collection" className="collection-section" aria-label="مجموعه کامل عطرهای آنتی">
      <div className="app-container">
        {/* هدر بخش */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="header-titles">
            <div className="section-subtitle">
              <Sparkles size={14} className="subtitle-sparkle" />
              <span>مجموعه اختصاصی</span>
            </div>
            <h2 className="section-title">
              <span className="section-title-text">مجموعه ما</span>
              <span className="section-title-accent"></span>
            </h2>
          </div>

          <button
            type="button"
            id="collection-view-all-btn"
            className="view-all-btn"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? 'بستن' : 'مشاهده همه'}
          </button>
        </motion.div>

        {/* نوار ابزار فیلتر و مرتب‌سازی */}
        <div className="collection-toolbar">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="toolbar-actions">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="جستجوی عطر یا نت..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* دراپ داون کاملاً سفارشی کامپوننتی */}
            <div className="custom-dropdown-container" ref={sortDropdownRef}>
              <button
                type="button"
                className={`dropdown-trigger ${isSortOpen ? 'open' : ''}`}
                onClick={() => setIsSortOpen((prev) => !prev)}
              >
                <ArrowUpDown size={14} className="dropdown-trigger-icon" />
                <span className="dropdown-selected-text">{activeSortLabel}</span>
                <ChevronDown size={14} className={`dropdown-chevron ${isSortOpen ? 'rotate' : ''}`} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.ul
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sortOptions.map((option) => (
                      <li
                        key={option.value}
                        className={`dropdown-item ${sortBy === option.value ? 'selected' : ''}`}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                      >
                        <span>{option.label}</span>
                        {sortBy === option.value && <Check size={14} className="check-icon" />}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* گرید محصولات */}
        {displayedProducts.length > 0 ? (
          <motion.div className="products-grid-5" layout>
            <AnimatePresence>
              {displayedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="no-products-found">
            <p>هیچ عطری با مشخصات جستجو شده یافت نشد.</p>
            <button
              className="reset-filter-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('همه');
              }}
            >
              پاکسازی فیلترها
            </button>
          </div>
        )}
      </div>
    </section>
  );
}