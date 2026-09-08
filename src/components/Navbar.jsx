import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Home, Sparkles, HelpCircle } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ cartCount, onOpenCart, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Detect active section for dock indicator
      const scrollPos = window.scrollY + 200;
      const sections = ['faq', 'about', 'collection', 'hero'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sec);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Header */}
      <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="app-container navbar-container">
          {/* Brand Logo: Cursive Script Logo with subtle luxury color transition */}
          <div className="navbar-brand">
            <a href="#hero" className="brand-logo-script-link" aria-label="Anti Luxury Parfums">
              <span className="brand-script-text">Anti</span>
            </a>
            <span className="brand-badge-script">PARFUM</span>
          </div>

          {/* Desktop Center Navigation Links */}
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
            <a href="#newsletter" className="nav-link">
              مجله
            </a>
            <a
              href="#faq"
              className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}
            >
              سوالات متداول
            </a>
            <a href="#footer" className="nav-link">
              تماس با ما
            </a>
          </nav>

          {/* Desktop & Top Actions: Search & Cart Button */}
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

      {/* Mobile Bottom Dock Navigation (Replaces Top Hamburger Menu on Responsive Devices) */}
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
          onClick={onOpenSearch}
          aria-label="جستجو در محصولات"
        >
          <Search size={20} strokeWidth={2} />
          <span>جستجو</span>
        </button>

        <a
          href="#faq"
          className={`bottom-dock-item ${activeSection === 'faq' ? 'active' : ''}`}
        >
          <HelpCircle size={20} strokeWidth={2} />
          <span>سوالات</span>
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
