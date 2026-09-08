import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductGrid from './components/ProductGrid';
import PromotionalBanner from './components/PromotionalBanner';
import BestSellers from './components/BestSellers';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import StoryModal from './components/StoryModal';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';
import BackToTop from './components/BackToTop';

import { PRODUCTS } from './data/products';

export default function App() {
  // Cart State (Initialized with 1 default luxury bottle for instant visual delight)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "رز سفید",
      englishName: "Rose Divine",
      price: 1990000,
      priceFormatted: "۱,۹۹۰,۰۰۰ تومان",
      volume: "۱۰۰ میلی‌لیتر",
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      quantity: 1,
    },
  ]);

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToastMessage(`عطر «${product.name}» به سبد خرید افزوده شد`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setToastMessage('در حال اتصال به درگاه پرداخت امن...');
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="anti-app-root">
      {/* Navigation */}
      <Navbar
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main>
        {/* Editorial Hero Section with overlapping Floating Feature Box */}
        <Hero
          onExploreClick={scrollToCollection}
          onWatchStory={() => setIsStoryOpen(true)}
        />

        {/* Brand Philosophy & Asymmetric Collage */}
        <About
          onDiscoverClick={() => setIsStoryOpen(true)}
        />

        {/* 5-Product Collection Grid */}
        <ProductGrid
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* Wide Cinematic Promotional Banner */}
        <PromotionalBanner
          onShopNow={scrollToCollection}
        />

        {/* Best Sellers & Art of Perfumery */}
        <BestSellers
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
          onExploreNotes={() => {
            const amber = PRODUCTS.find((p) => p.id === 4) || PRODUCTS[0];
            setQuickViewProduct(amber);
          }}
        />

        {/* Customer Testimonial & Trust Badges */}
        <Testimonials />

        {/* Frequently Asked Questions (Shipping, Delivery & Authenticity Guarantee) */}
        <FAQ />

        {/* Newsletter Subscription */}
        <Newsletter
          onSubscribeSuccess={(email) => {
            setToastMessage(`ایمیل شما با موفقیت ثبت شد: ${email}`);
          }}
        />
      </main>

      {/* Minimal Luxury Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />

      {/* Holographic Back to Top Button */}
      <BackToTop />
    </div>
  );
}
