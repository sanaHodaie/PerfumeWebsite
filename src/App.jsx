import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
import PhilosophyModal from './components/PhilosophyModal';
import GrasseFarmsModal from './components/GrasseFarmsModal';
import EcoResponsibilityModal from './components/EcoResponsibilityModal';
import CareerOpportunitiesModal from './components/CareerOpportunitiesModal';
import HandmadeGlassModal from './components/HandmadeGlassModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import BackToTop from './components/BackToTop';
import AdminPanel from './components/AdminPanel/AdminPanel';
import AdminLogin from './components/AdminPanel/AdminLogin';
import { supabase } from './lib/supabase';
import { PRODUCTS } from './data/products';

import { isAdminUser } from './lib/adminAuth';

export default function App() {
  const ADMIN_USER_ID = '08c9a8ca-68fc-4810-bd6e-aa002711ab05';

  // ✅ فقط یک بار تعریف می‌شود
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const navigate = useNavigate();

  // Cart State
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

  // User Account State
  const [currentUser, setCurrentUser] = useState(null);

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const [isGrasseOpen, setIsGrasseOpen] = useState(false);
  const [isEcoOpen, setIsEcoOpen] = useState(false);
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [isGlasscraftOpen, setIsGlasscraftOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastData, setToastData] = useState(null);

  // ❌ تعریف تکراری حذف شد:
  // const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  // const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAdminSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('❌ خطا در دریافت Session:', error);

          if (mounted) {
            setIsAdminLoggedIn(false);
            setIsAuthChecking(false);
          }

          return;
        }

        const user = session?.user ?? null;


        if (mounted) {
          setIsAdminLoggedIn(isAdminUser(user));
          setIsAuthChecking(false);
        }
      } catch (error) {
        console.error('❌ خطای بررسی Auth:', error);

        if (mounted) {
          setIsAdminLoggedIn(false);
          setIsAuthChecking(false);
        }
      }
    };

    checkAdminSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user ?? null;
      if (mounted) {
        setIsAdminLoggedIn(isAdminUser(user));
        setIsAuthChecking(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleAdminLoginSuccess = (user) => {
    if (!isAdminUser(user)) {
      console.error('🚨 کاربر مجاز نیست');
      return;
    }

    setIsAdminLoggedIn(true);
    navigate('/admin');

    setToastData({
      title: 'ورود موفقیت‌آمیز ادمین',
      message: 'خوش آمدید! پنل مدیریت اختصاصی خانه عطر آنتی فعال گردید.',
      position: 'center',
    });
  };

  const handleAdminLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('❌ خطا در خروج Admin:', error);
        return;
      }

      setIsAdminLoggedIn(false);
      navigate('/');

      setToastData({
        title: 'خروج از پنل مدیریت',
        message: 'شما با موفقیت از پنل ادمین خارج شدید.',
        position: 'center',
      });
    } catch (error) {
      console.error('❌ خطای غیرمنتظره در Logout:', error);
    }
  };

  const isAnyModalOpen = Boolean(
    isPhilosophyOpen ||
    isGrasseOpen ||
    isEcoOpen ||
    isCareerOpen ||
    isGlasscraftOpen ||
    isAuthOpen ||
    isCartOpen ||
    isStoryOpen ||
    isSearchOpen ||
    quickViewProduct
  );

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
    setToastData({
      message: `عطر «${product.name}» به سبد خرید افزوده شد`,
      position: 'bottom',
    });
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
    setToastData({
      message: 'در حال اتصال به درگاه پرداخت امن بانکی...',
      position: 'bottom',
    });
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isAuthChecking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0d0b',
          color: '#e8a956',
          fontFamily: 'inherit',
        }}
      >
        در حال بررسی دسترسی...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/admin-login"
        element={
          isAdminLoggedIn ? (
            <Navigate to="/admin" replace />
          ) : (
            <AdminLogin
              isOpen={true}
              onLoginSuccess={handleAdminLoginSuccess}
              onClose={() => navigate('/')}
            />
          )
        }
      />

      <Route
        path="/admin"
        element={
          isAdminLoggedIn ? (
            <AdminPanel isOpen={true} onClose={handleAdminLogout} />
          ) : (
            <Navigate to="/admin-login" replace />
          )
        }
      />

      <Route
        path="*"
        element={
          <div className="anti-app-root">
            <Navbar
              cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenAuth={() => setIsAuthOpen(true)}
              currentUser={currentUser}
              onOpenPhilosophy={() => setIsPhilosophyOpen(true)}
              onOpenGrasse={() => setIsGrasseOpen(true)}
            />

            <main>
              <Hero
                onExploreClick={scrollToCollection}
                onWatchStory={() => setIsStoryOpen(true)}
              />

              <About onDiscoverClick={() => setIsPhilosophyOpen(true)} />

              <ProductGrid
                onAddToCart={handleAddToCart}
                onQuickView={(product) => setQuickViewProduct(product)}
              />

              <PromotionalBanner onShopNow={scrollToCollection} />

              <BestSellers
                onAddToCart={handleAddToCart}
                onQuickView={(product) => setQuickViewProduct(product)}
                onExploreNotes={() => {
                  const amber = PRODUCTS.find((p) => p.id === 4) || PRODUCTS[0];
                  setQuickViewProduct(amber);
                }}
              />

              <Testimonials />

              <FAQ />

              <Newsletter
                onSubscribeSuccess={(email) => {
                  setToastData({
                    message: `ایمیل شما با موفقیت ثبت شد: ${email}`,
                    position: 'bottom',
                  });
                }}
              />
            </main>

            <Footer
              onOpenPhilosophy={() => setIsPhilosophyOpen(true)}
              onOpenGrasse={() => setIsGrasseOpen(true)}
              onOpenGlasscraft={() => setIsGlasscraftOpen(true)}
              onOpenEco={() => setIsEcoOpen(true)}
              onOpenCareer={() => setIsCareerOpen(true)}
            />

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

            <PhilosophyModal
              isOpen={isPhilosophyOpen}
              onClose={() => setIsPhilosophyOpen(false)}
              onExploreCollection={scrollToCollection}
            />

            <GrasseFarmsModal
              isOpen={isGrasseOpen}
              onClose={() => setIsGrasseOpen(false)}
              onExploreCollection={scrollToCollection}
            />

            <EcoResponsibilityModal
              isOpen={isEcoOpen}
              onClose={() => setIsEcoOpen(false)}
              onExploreCollection={scrollToCollection}
            />

            <CareerOpportunitiesModal
              isOpen={isCareerOpen}
              onClose={() => setIsCareerOpen(false)}
            />

            <HandmadeGlassModal
              isOpen={isGlasscraftOpen}
              onClose={() => setIsGlasscraftOpen(false)}
              onExploreCollection={scrollToCollection}
            />

            <AuthModal
              isOpen={isAuthOpen}
              onClose={() => setIsAuthOpen(false)}
              currentUser={currentUser}
              onLogin={(user) => {
                setCurrentUser(user);
                setIsAuthOpen(false);
                setToastData({
                  message: `ورود با موفقیت انجام شد. خوش آمدید، ${user.name} عزیز!`,
                  title: 'ورود موفقیت‌آمیز',
                  position: 'center',
                });
              }}
              onUpdateUser={(updatedUser) => {
                setCurrentUser(updatedUser);
                setToastData({
                  message: `نام شما با موفقیت به «${updatedUser.name}» تغییر یافت.`,
                  title: 'بروزرسانی مشخصات کاربری',
                  position: 'center',
                });
              }}
              onLogout={() => {
                setCurrentUser(null);
                setIsAuthOpen(false);
                setToastData({
                  message: 'شما با موفقیت از حساب کاربری خود خارج شدید. به امید دیدار مجدد در خانه عطر آنتی.',
                  title: 'خروج از حساب کاربری',
                  position: 'center',
                  type: 'logout',
                });
              }}
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onOpenCart={() => {
                setIsAuthOpen(false);
                setIsCartOpen(true);
              }}
              onExploreCollection={scrollToCollection}
            />

            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onSelectProduct={(product) => setQuickViewProduct(product)}
            />

            <Toast toast={toastData} onClose={() => setToastData(null)} />

            <BackToTop isModalOpen={isAnyModalOpen} />
          </div>
        }
      />
    </Routes>
  );
}