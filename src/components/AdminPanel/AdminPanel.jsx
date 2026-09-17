import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Package,
  HelpCircle,
  Share2,
  Moon,
  Sun,
  Bell,
  ExternalLink,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ChevronLeft,
  TicketPercent,
  UserCheck
} from 'lucide-react';
import AdminOverviewTab from './AdminOverviewTab';
import AdminProductsTab from './AdminProductsTab';
import AdminFaqTab from './AdminFaqTab';
import AdminProfileTab from './AdminProfileTab';
import AdminSocialTab from './AdminSocialTab';
import { useAdminStore } from '../../data/adminStore';
import { toPersianDigits } from '../../utils/persianNumbers';
import './AdminPanel.css';
import { supabase } from '../../lib/supabase';

export default function AdminPanel({ isOpen = true, onClose }) {

  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'faq' | 'profile' | 'social'
  const [showNotifications, setShowNotifications] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

const handleLogout = () => {
  if (onClose) {
    onClose();
  } else {
    navigate('/');
  }
};

  const {
    products,
    faqs,
    contactInfo,
    adminProfile,
    coupons,
    adminTheme,
    setAdminTheme,
    addProduct,
    updateProduct,
    deleteProduct,
    addFaq,
    updateFaq,
    deleteFaq,
    updateContactInfo,
    updateAdminProfile,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCouponStatus,
    incrementCouponUsage,
  } = useAdminStore();

  const [theme, setTheme] = useState(adminTheme || 'light');

  useEffect(() => {
    if (adminTheme && adminTheme !== theme) {
      setTheme(adminTheme);
    }
  }, [adminTheme]);

  if (!isOpen) return null;

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (setAdminTheme) {
      setAdminTheme(nextTheme);
    }
  };

  const navItems = [
    {
      id: 'overview',
      label: 'پیشخوان',
      englishLabel: 'Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'products',
      label: 'محصولات',
      englishLabel: 'Products',
      icon: Package,
      badge: products.length,
    },
    {
      id: 'faq',
      label: 'سوالات',
      englishLabel: 'FAQ',
      icon: HelpCircle,
      badge: faqs.length,
    },
    {
      id: 'profile',
      label:'پروفایل و تخفیف‌',
      englishLabel: 'Profile & Coupons',
      icon: TicketPercent,
      badge: coupons?.length || null,
    },
    {
      id: 'social',
      label: 'ارتباطات',
      englishLabel: 'Contacts',
      icon: Share2,
      badge: null,
    },
  ];

  const currentNav = navItems.find((item) => item.id === activeTab) || navItems[0];

  return (
    <div className={`admin-viewport ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
      <div className="admin-shell">
        {/* DESKTOP & MOBILE RIGHT SIDEBAR (RTL) */}
        <aside className="admin-sidebar" aria-label="منوی دسترسی ادمین">
          <div className="sidebar-top-group">
            <div className="sidebar-brand-logo" title="Anti Parfums VIP">
              <Sparkles size={24} />
            </div>

            <nav className="sidebar-nav-list" aria-label="منوی ادمین">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <div className="sidebar-nav-item-wrap" key={item.id}>
                    <button
                      type="button"
                      className={`sidebar-icon-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                      aria-label={item.label}
                    >
                      <IconComponent size={22} />
                      {item.badge !== null && item.badge !== undefined && (
                        <span className="sidebar-badge-dot">{toPersianDigits(item.badge)}</span>
                      )}
                    </button>
                    {/* Rich Floating Tooltip on Hover */}
                    <div className="sidebar-tooltip-popup" role="tooltip">
                      <span className="sidebar-tooltip-title">{item.label}</span>
                      <span className="sidebar-tooltip-sub">{item.englishLabel}</span>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="sidebar-bottom-group">
            <div className="sidebar-nav-item-wrap">
              <button
                type="button"
                className="sidebar-icon-btn logout-sidebar-btn"
                onClick={handleLogout}
                aria-label="خروج از پنل مدیریت"
              >
                <LogOut size={20} />
              </button>
              <div className="sidebar-tooltip-popup" role="tooltip">
                <span className="sidebar-tooltip-title">خروج از پنل</span>
                <span className="sidebar-tooltip-sub">Sign Out</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN STAGE */}
        <main className="admin-main-stage">
          {/* TOP HEADER BAR */}
          <header className="admin-header-bar">
            {/* Title */}
            <div className="header-left-title">
              <h1 className="header-title-text font-brand-story">{currentNav.label}</h1>
              <span className="header-title-french">{currentNav.englishLabel}</span>
            </div>

            {/* Header Tools */}
            <div className="header-actions-group">
              {/* Back to site button */}
              <div className="header-action-tooltip-wrap">
                <button
                  type="button"
                  className="header-icon-btn view-site-icon-btn"
                  onClick={handleClose}
                  aria-label="مشاهده وب‌سایت اصلی"
                >
                  <ExternalLink size={18} />
                </button>
                <div className="header-tooltip-popup" role="tooltip">مشاهده سایت</div>
              </div>

              {/* Theme toggle: Light / Dark */}
              <div className="header-action-tooltip-wrap">
                <button
                  type="button"
                  className="header-icon-btn theme-toggle-btn"
                  onClick={toggleTheme}
                  aria-label="تغییر حالت شب و روز"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <div className="header-tooltip-popup" role="tooltip">
                  {theme === 'dark' ? 'تم روشن' : 'تم تاریک'}
                </div>
              </div>

              {/* Notifications */}
              <div className="header-action-tooltip-wrap">
                <button
                  type="button"
                  className="header-icon-btn notif-bell-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label="اعلانات سیستم"
                >
                  <Bell size={18} />
                  <span className="notif-unread-dot" />
                </button>
                <div className="header-tooltip-popup" role="tooltip">اعلانات</div>
              </div>

              {/* Admin Avatar (Profile Only - Fixed Left Tooltip Overflow) */}
              <div className="header-action-tooltip-wrap avatar-action-wrap">
                <div
                  className="admin-avatar-wrap"
                  onClick={() => setActiveTab('profile')}
                  role="button"
                  tabIndex={0}
                  aria-label="پروفایل مدیر ارشد"
                  title="کلیک جهت ویرایش مشخصات، رمز عبور و کدهای تخفیف"
                >
                  <img
                    src={adminProfile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                    alt="Admin Avatar"
                    className="admin-avatar-img"
                    referrerPolicy="no-referrer"
                  />
                  <span className="admin-status-online-dot" />
                </div>
                {/* Fixed tooltip that doesn't overflow to the left outside the screen */}
                <div className="header-tooltip-popup avatar-tooltip-left" role="tooltip">
                  <div className="avatar-tooltip-title">{adminProfile?.fullName || 'مدیر ارشد برند'}</div>
                  <div className="avatar-tooltip-user dir-ltr font-mono">@{adminProfile?.username || 'admin'}</div>
                </div>
              </div>
            </div>
          </header>

          {/* TAB CONTENT SCROLLABLE BODY */}
          <div className="admin-content-scroll">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <AdminOverviewTab
                    productsCount={products.length}
                    faqsCount={faqs.length}
                    couponsCount={coupons?.length || 0}
                    onNavigateTab={(tab) => setActiveTab(tab)}
                  />
                </motion.div>
              )}

              {activeTab === 'products' && (
                <motion.div
                  key="products"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <AdminProductsTab
                    products={products}
                    onAddProduct={addProduct}
                    onUpdateProduct={updateProduct}
                    onDeleteProduct={deleteProduct}
                  />
                </motion.div>
              )}

              {activeTab === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <AdminFaqTab
                    faqs={faqs}
                    onAddFaq={addFaq}
                    onUpdateFaq={updateFaq}
                    onDeleteFaq={deleteFaq}
                  />
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <AdminProfileTab
                    adminProfile={adminProfile}
                    onUpdateAdminProfile={updateAdminProfile}
                    coupons={coupons}
                    onAddCoupon={addCoupon}
                    onUpdateCoupon={updateCoupon}
                    onDeleteCoupon={deleteCoupon}
                    onToggleCouponStatus={toggleCouponStatus}
                    onIncrementCouponUsage={incrementCouponUsage}
                  />
                </motion.div>
              )}

              {activeTab === 'social' && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <AdminSocialTab
                    contactInfo={contactInfo}
                    onUpdateContactInfo={updateContactInfo}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM DOCK NAVIGATION WITH FLOATING TOOLTIP ON HOVER */}
      <nav className="admin-mobile-dock" aria-label="منوی پایین موبایل ادمین">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div className="dock-item-wrapper" key={item.id}>
              <button
                type="button"
                className={`dock-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                aria-label={item.label}
              >
                <div className="dock-icon-wrapper">
                  <IconComponent size={20} />
                </div>
                <span className="dock-tab-label">{item.label}</span>
                <span className="dock-active-dot" />
              </button>
              {/* Tooltip on mobile hover/focus */}
              <div className="dock-tooltip-popup" role="tooltip">
                <span>{item.label}</span>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
