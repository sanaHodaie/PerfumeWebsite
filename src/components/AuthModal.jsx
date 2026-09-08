import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  LogOut,
  Package,
  Award,
  ArrowRight,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Edit3,
  UserCheck,
} from 'lucide-react';
import './AuthModal.css';

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onUpdateUser,
  onLogout,
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onOpenCart,
  onExploreCollection,
}) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'
  const [showPassword, setShowPassword] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Custom name registration inside profile view
  const [customNameInput, setCustomNameInput] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      if (loginMethod === 'otp' && !isOtpSent) {
        if (!phoneOrEmail.trim()) return;
        setIsOtpSent(true);
        return;
      }
      // Perform login - default name is 'کاربر' until registered
      onLogin({
        name: 'کاربر',
        isCustomName: false,
        emailOrPhone: phoneOrEmail.trim() || '۰۹۱۲۳۴۵۶۷۸۹',
        tier: 'عضو طلایی VIP',
        points: '۱,۲۰۰',
      });
      setIsOtpSent(false);
    } else {
      // Register
      if (!phoneOrEmail.trim()) return;
      const registeredName = fullName.trim() || 'کاربر';
      onLogin({
        name: registeredName,
        isCustomName: Boolean(fullName.trim()),
        emailOrPhone: phoneOrEmail.trim(),
        tier: 'عضو جدید VIP',
        points: '۵۰۰ هدیه خوش‌آمدگویی',
      });
    }
  };

  const handleSaveCustomName = (e) => {
    e.preventDefault();
    const cleanName = customNameInput.trim();
    if (!cleanName) return;

    if (onUpdateUser && currentUser) {
      onUpdateUser({
        ...currentUser,
        name: cleanName,
        isCustomName: true,
      });
    }
    setIsEditingName(false);
    setCustomNameInput('');
  };

  const totalCartAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      <div className="auth-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="auth-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close button */}
          <button
            type="button"
            className="auth-close-btn"
            onClick={onClose}
            aria-label="بستن پنجره ورود"
          >
            <X size={20} />
          </button>

          <div className="auth-modal-scroll">
            {currentUser ? (
              /* ==============================================
                 LOGGED IN: User Profile & VIP Dashboard View
                 ============================================== */
            <div className="auth-profile-view">
              <div className="profile-header">
                <div className="profile-avatar-box">
                  <User size={36} />
                </div>
                <div className="profile-user-info">
                  <div className="profile-vip-pill">
                    <Sparkles size={13} />
                    <span>{currentUser.tier || 'عضو VIP آنتی'}</span>
                  </div>
                  <h3 className="profile-user-name">{currentUser.name || 'کاربر'}</h3>
                  <span className="profile-user-phone">{currentUser.emailOrPhone}</span>
                </div>
              </div>

              {/* Name Registration / Edit Box */}
              {!currentUser.isCustomName || currentUser.name === 'کاربر' ? (
                <div className="profile-name-register-card">
                  <div className="name-reg-header">
                    <UserCheck size={18} className="name-reg-icon" />
                    <span className="name-reg-title">ثبت نام شما در حساب کاربری</span>
                  </div>
                  <p className="name-reg-desc">
                    حساب شما با عنوان پیش‌فرض <strong>«کاربر»</strong> فعال شده است. جهت درج نام شما در فاکتورها و خوش‌آمدگویی، نام خود را وارد فرمایید:
                  </p>
                  <form onSubmit={handleSaveCustomName} className="name-reg-form">
                    <input
                      type="text"
                      placeholder="نام و نام خانوادگی شما (مثال: نیما شایسته)"
                      value={customNameInput}
                      onChange={(e) => setCustomNameInput(e.target.value)}
                      className="name-reg-input"
                      required
                    />
                    <button type="submit" className="name-reg-btn">
                      ثبت نام
                    </button>
                  </form>
                </div>
              ) : (
                <div className="profile-registered-name-box">
                  <div className="registered-name-info">
                    <span className="reg-name-label">نام ثبت‌شده در حساب:</span>
                    <strong className="reg-name-val">{currentUser.name}</strong>
                  </div>
                  <button
                    type="button"
                    className="edit-name-btn"
                    onClick={() => {
                      setCustomNameInput(currentUser.name);
                      setIsEditingName(!isEditingName);
                    }}
                  >
                    <Edit3 size={14} />
                    <span>{isEditingName ? 'انصراف' : 'تغییر نام'}</span>
                  </button>
                  {isEditingName && (
                    <form onSubmit={handleSaveCustomName} className="name-reg-form edit-mode">
                      <input
                        type="text"
                        value={customNameInput}
                        onChange={(e) => setCustomNameInput(e.target.value)}
                        className="name-reg-input"
                        required
                      />
                      <button type="submit" className="name-reg-btn">
                        ذخیره نام جدید
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* ========================================================
                  SHOPPING CART INTEGRATION IN USER PROFILE VIEW
                  ======================================================== */}
              <div className="profile-cart-section">
                <div className="profile-cart-header">
                  <div className="cart-sec-title">
                    <ShoppingBag size={18} className="cart-sec-icon" />
                    <strong>سبد خرید جاری شما</strong>
                  </div>
                  <span className="profile-cart-badge">
                    {cart && cart.length > 0
                      ? `${cart.reduce((total, item) => total + item.quantity, 0)} قلم کالا`
                      : 'خالی'}
                  </span>
                </div>

                {cart && cart.length > 0 ? (
                  <div className="profile-cart-list">
                    {cart.map((item) => (
                      <div key={item.id} className="profile-cart-item">
                        <img src={item.image} alt={item.name} className="profile-cart-thumb" />
                        <div className="profile-cart-details">
                          <div className="profile-cart-item-top">
                            <h5 className="profile-cart-item-name">{item.name}</h5>
                            <button
                              type="button"
                              className="profile-cart-remove"
                              onClick={() => onRemoveItem && onRemoveItem(item.id)}
                              title="حذف از سبد خرید"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <span className="profile-cart-item-vol">
                            {item.volume} • {item.englishName}
                          </span>
                          <div className="profile-cart-item-bottom">
                            <div className="profile-cart-qty">
                              <button
                                type="button"
                                className="profile-qty-btn"
                                onClick={() =>
                                  onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label="کاهش تعداد"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="profile-qty-num">{item.quantity}</span>
                              <button
                                type="button"
                                className="profile-qty-btn"
                                onClick={() =>
                                  onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label="افزایش تعداد"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="profile-cart-item-price">
                              {new Intl.NumberFormat('fa-IR').format(item.price * item.quantity)} تومان
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Total & Action */}
                    <div className="profile-cart-footer">
                      <div className="profile-cart-total-row">
                        <span className="total-label">مجموع مبلغ سبد خرید:</span>
                        <strong className="total-val">
                          {new Intl.NumberFormat('fa-IR').format(totalCartAmount)} تومان
                        </strong>
                      </div>
                      <button
                        type="button"
                        className="profile-checkout-btn"
                        onClick={() => {
                          if (onOpenCart) onOpenCart();
                        }}
                      >
                        <ShoppingBag size={16} />
                        <span>مشاهده و تسویه کامل سبد خرید</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-cart-empty">
                    <p>سبد خرید شما در حال حاضر خالی است.</p>
                    <button
                      type="button"
                      className="profile-shop-now-btn"
                      onClick={() => {
                        onClose();
                        if (onExploreCollection) onExploreCollection();
                      }}
                    >
                      مشاهده و خرید عطرهای لوکس
                    </button>
                  </div>
                )}
              </div>

              {/* Club Points Banner */}
              <div className="profile-points-card">
                <div className="points-info">
                  <Award size={22} className="points-icon" />
                  <div>
                    <span className="points-label">امتیاز وفاداری باشگاه مشتریان</span>
                    <strong className="points-val">{currentUser.points || '۱,۲۰۰'} امتیاز</strong>
                  </div>
                </div>
                <span className="points-sub">معادل ۱۲۰,۰۰۰ تومان تخفیف در خرید بعدی</span>
              </div>

              {/* Quick Actions Grid */}
              <div className="profile-grid">
                <div className="profile-box">
                  <Package size={22} className="box-icon" />
                  <div className="box-content">
                    <strong>سفارش‌های من</strong>
                    <span>۱ سفارش جاری (ارسال با پست پیشتاز)</span>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="profile-actions">
                <button
                  type="button"
                  className="auth-logout-btn"
                  onClick={() => {
                    onLogout();
                    setIsOtpSent(false);
                    onClose();
                  }}
                >
                  <LogOut size={16} />
                  <span>خروج از حساب کاربری</span>
                </button>
              </div>
            </div>
          ) : (
            /* ==============================================
               NOT LOGGED IN: Sign In / Sign Up Form
               ============================================== */
            <div className="auth-form-view">
              {/* Brand Top Header */}
              <div className="auth-brand-head">
                <span className="auth-brand-logo">Anti</span>
                <span className="auth-brand-badge">PARFUM</span>
              </div>

              {/* Tabs: ورود یا عضویت */}
              <div className="auth-tabs">
                <button
                  type="button"
                  className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('login');
                    setIsOtpSent(false);
                  }}
                >
                  ورود به حساب
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('register');
                    setIsOtpSent(false);
                  }}
                >
                  عضویت در باشگاه آنتی
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="auth-form">
                {activeTab === 'login' ? (
                  <>
                    {/* Method switch: OTP vs Password */}
                    <div className="auth-sub-method">
                      <button
                        type="button"
                        className={`sub-method-btn ${loginMethod === 'otp' ? 'active' : ''}`}
                        onClick={() => {
                          setLoginMethod('otp');
                          setIsOtpSent(false);
                        }}
                      >
                        کد تایید پیامکی (OTP)
                      </button>
                      <button
                        type="button"
                        className={`sub-method-btn ${loginMethod === 'password' ? 'active' : ''}`}
                        onClick={() => {
                          setLoginMethod('password');
                          setIsOtpSent(false);
                        }}
                      >
                        کلمه عبور
                      </button>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="auth-phone-email">شماره موبایل یا ایمیل</label>
                      <div className="input-with-icon">
                        <Phone size={18} className="input-icon" />
                        <input
                          type="text"
                          id="auth-phone-email"
                          placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا info@example.com"
                          value={phoneOrEmail}
                          onChange={(e) => setPhoneOrEmail(e.target.value)}
                          required
                          dir="ltr"
                        />
                      </div>
                    </div>

                    {loginMethod === 'password' && (
                      <div className="auth-input-group">
                        <label htmlFor="auth-password">کلمه عبور</label>
                        <div className="input-with-icon">
                          <Lock size={18} className="input-icon" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="auth-password"
                            placeholder="کلمه عبور خود را وارد نمایید"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            dir="ltr"
                          />
                          <button
                            type="button"
                            className="toggle-pwd-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    )}

                    {loginMethod === 'otp' && isOtpSent && (
                      <motion.div
                        className="auth-input-group"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <label htmlFor="auth-otp">کد ۴ رقمی ارسال‌شده</label>
                        <div className="input-with-icon">
                          <Sparkles size={18} className="input-icon" />
                          <input
                            type="text"
                            id="auth-otp"
                            placeholder="۱۲۳۴"
                            maxLength={4}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            required
                            dir="ltr"
                            className="otp-input"
                          />
                        </div>
                        <span className="otp-helper">کد آزمایشی برای ورود: هر ۴ رقم دلخواه</span>
                      </motion.div>
                    )}

                    <div className="auth-options-row">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>مرا به خاطر بسپار</span>
                      </label>
                      <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>
                        فراموشی رمز عبور؟
                      </a>
                    </div>

                    <button type="submit" className="btn-primary auth-submit-btn">
                      <span>{loginMethod === 'otp' && !isOtpSent ? 'ارسال کد تایید پیامکی' : 'ورود به حساب کاربری'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </>
                ) : (
                  /* Register Tab */
                  <>
                    <div className="auth-input-group">
                      <label htmlFor="auth-reg-name">نام و نام خانوادگی (اختیاری)</label>
                      <div className="input-with-icon">
                        <User size={18} className="input-icon" />
                        <input
                          type="text"
                          id="auth-reg-name"
                          placeholder="مثال: سپهر اعتمادی (یا خالی بگذارید)"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="auth-reg-contact">شماره موبایل</label>
                      <div className="input-with-icon">
                        <Phone size={18} className="input-icon" />
                        <input
                          type="tel"
                          id="auth-reg-contact"
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          value={phoneOrEmail}
                          onChange={(e) => setPhoneOrEmail(e.target.value)}
                          required
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="auth-reg-pwd">تعیین کلمه عبور</label>
                      <div className="input-with-icon">
                        <Lock size={18} className="input-icon" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="auth-reg-pwd"
                          placeholder="حداقل ۶ کاراکتر"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          dir="ltr"
                        />
                        <button
                          type="button"
                          className="toggle-pwd-btn"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="auth-vip-gift-notice">
                      <Sparkles size={16} className="gift-icon" />
                      <span>با عضویت در باشگاه، ۵۰۰ امتیاز هدیه و ارسال رایگان برای اولین خرید دریافت می‌کنید.</span>
                    </div>

                    <button type="submit" className="btn-primary auth-submit-btn">
                      <span>ثبت‌نام و عضویت در باشگاه VIP</span>
                      <CheckCircle2 size={16} />
                    </button>
                  </>
                )}
              </form>
            </div>
          )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

