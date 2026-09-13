import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Home, Sparkles, User, BookOpen } from 'lucide-react';
import './Navbar.css';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAuth,
  currentUser,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Bottom of page check
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('footer');
        return;
      }

      // Check sections from top to bottom
      const checkOffset = 180;
      const sectionOrder = ['hero', 'about', 'collection', 'bestsellers', 'testimonials', 'faq', 'newsletter', 'footer'];

      let current = 'hero';
      for (const id of sectionOrder) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= checkOffset && rect.bottom > checkOffset) {
            if (id === 'bestsellers') {
              current = 'collection';
            } else if (id === 'testimonials') {
              current = 'faq';
            } else {
              current = id;
            }
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header اصلی بالای صفحه */}
      <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="app-container navbar-container">
          {/* لوگوی برند */}
          <div className="navbar-brand">
            <a href="#hero" className="brand-logo-script-link" aria-label="Anti Luxury Parfums">
              <span className="brand-script-text">Anti</span>
            </a>
            <span className="brand-badge-script">PARFUM</span>
          </div>

          {/* منوی ناوبری دسکتاپ */}
          <nav className="navbar-nav desktop-nav">
            <a
              href="#hero"
              className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
            >
              خانه
            </a>
            <a
              href="#collection"
              className={`nav-link ${activeSection === 'collection' ? 'active' : ''}`}
            >
              محصولات
            </a>
            <a
              href="#about"
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            >
              درباره ما
            </a>
            <a
              href="#newsletter"
              className={`nav-link ${activeSection === 'newsletter' ? 'active' : ''}`}
            >
              مجله
            </a>
            <a
              href="#faq"
              className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}
            >
              سوالات متداول
            </a>
            <a
              href="#footer"
              className={`nav-link ${activeSection === 'footer' ? 'active' : ''}`}
            >
              تماس با ما
            </a>
          </nav>

          {/* دکمه‌های عملیاتی (جستجو، پروفایل، سبد خرید) */}
          <div className="navbar-actions">
            <button
              type="button"
              className="search-pill-btn"
              onClick={onOpenSearch}
              aria-label="جستجو در محصولات"
            >
              <Search size={16} strokeWidth={2} />
              <span className="search-text">جستجو...</span>
            </button>

            <button
              type="button"
              className={`user-circle-btn ${currentUser ? 'user-logged-in' : ''}`}
              onClick={onOpenAuth}
              aria-label={currentUser ? 'پروفایل کاربری' : 'ورود به حساب کاربری'}
              title={currentUser ? `حساب کاربری: ${currentUser.name || 'کاربر'}` : 'ورود / ثبت‌نام در باشگاه آنتی'}
            >
              <User size={18} strokeWidth={2} />
              {currentUser && (
                <span className="user-btn-name">{currentUser.name || 'کاربر'}</span>
              )}
              {currentUser && <span className="user-vip-dot" />}
            </button>

            <button
              type="button"
              className="cart-circle-btn"
              onClick={onOpenCart}
              aria-label="سبد خرید"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* منوی شناور پایین صفحه برای موبایل */}
      <nav className="mobile-bottom-dock" aria-label="منوی ناوبری موبایل">
        <a
          href="#hero"
          className={`bottom-dock-item ${activeSection === 'hero' ? 'active' : ''}`}
        >
          <Home size={20} strokeWidth={2} />
          <span>خانه</span>
        </a>

        <a
          href="#collection"
          className={`bottom-dock-item ${activeSection === 'collection' ? 'active' : ''}`}
        >
          <Sparkles size={20} strokeWidth={2} />
          <span>محصولات</span>
        </a>

        <button
          type="button"
          className="bottom-dock-item"
          onClick={onOpenAuth}
          aria-label="حساب کاربری"
        >
          <User size={20} strokeWidth={2} />
          <span>{currentUser ? (currentUser.name || 'کاربر') : 'ورود'}</span>
        </button>

        <a
          href="#about"
          className={`bottom-dock-item ${activeSection === 'about' ? 'active' : ''}`}
        >
          <BookOpen size={20} strokeWidth={2} />
          <span>درباره ما</span>
        </a>

        <button
          type="button"
          className="bottom-dock-item bottom-dock-cart"
          onClick={onOpenCart}
          aria-label="سبد خرید"
        >
          <div className="bottom-cart-icon-wrapper">
            <ShoppingBag size={20} strokeWidth={2} />
            {cartCount > 0 && <span className="bottom-cart-badge">{cartCount}</span>}
          </div>
          <span>سبد خرید</span>
        </button>
      </nav>
    </>
  );
}