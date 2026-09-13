import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Shield,
  KeyRound,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  TicketPercent,
  Plus,
  Trash2,
  Copy,
  Calendar,
  AlertCircle,
  Tag,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  ShoppingBag,
  Users,
  Mail,
  CheckCircle2,
  PartyPopper,
  X
} from 'lucide-react';
import { toPersianDigits, formatPersianPrice, formatPersianNumber } from '../../utils/persianNumbers';
import './AdminProfileTab.css'

const PRESET_AVATARS = [
  { id: 1, label: 'مدیر ارشد ۱', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80' },
  { id: 2, label: 'مدیر ارشد ۲', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=80' },
  { id: 3, label: 'مدیر اجرایی ۳', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=180&q=80' },
  { id: 4, label: 'مدیر طراحی ۴', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80' },
];

export default function AdminProfileTab({
  adminProfile,
  onUpdateAdminProfile,
  coupons = [],
  onAddCoupon,
  onUpdateCoupon,
  onDeleteCoupon,
  onToggleCouponStatus,
  onIncrementCouponUsage,
}) {
  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    username: adminProfile?.username || 'admin',
    fullName: adminProfile?.fullName || 'مدیر ارشد برند آنتی',
    email: adminProfile?.email || 'admin@anti-perfume.ir',
    avatar: adminProfile?.avatar || PRESET_AVATARS[0].url,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showNewPass, setShowNewPass] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrorMsg, setProfileErrorMsg] = useState('');

  // Coupon Creation Form State
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [createdSuccessCoupon, setCreatedSuccessCoupon] = useState(null);
  const [copiedCouponId, setCopiedCouponId] = useState(null);
  const [couponFilter, setCouponFilter] = useState('all'); // all, active, inactive

  const initialCouponForm = {
    code: '',
    discountPercent: 20,
    description: '',
    minPurchase: 1500000,
    expiresAt: '۱۴۰۴/۱۲/۲۹',
    maxUsage: 100,
    isActive: true,
  };
  const [couponForm, setCouponForm] = useState(initialCouponForm);
  const [couponError, setCouponError] = useState('');

  // Sync state if store updates externally
  useEffect(() => {
    if (adminProfile) {
      setProfileForm((prev) => ({
        ...prev,
        username: adminProfile.username || prev.username,
        fullName: adminProfile.fullName || prev.fullName,
        email: adminProfile.email || prev.email,
        avatar: adminProfile.avatar || prev.avatar,
      }));
    }
  }, [adminProfile]);

  // Handlers for Profile
  const handleProfileChange = (field, value) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
    setProfileSuccessMsg('');
    setProfileErrorMsg('');
  };

  // Instant avatar file upload with real-time top-header sync
  const handleAvatarFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setProfileErrorMsg('حجم تصویر نباید بیشتر از ۲ مگابایت باشد.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAvatarUrl = event.target.result;
        handleProfileChange('avatar', newAvatarUrl);
        // Immediately update store so the top header avatar reflects it right now!
        if (onUpdateAdminProfile) {
          onUpdateAdminProfile({ avatar: newAvatarUrl });
        }
        setProfileSuccessMsg('تصویر پروفایل در هدر و حساب کاربری با موفقیت به‌روزرسانی شد.');
        setTimeout(() => setProfileSuccessMsg(''), 3500);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset avatar click with immediate top-header sync
  const handleSelectPresetAvatar = (url) => {
    handleProfileChange('avatar', url);
    if (onUpdateAdminProfile) {
      onUpdateAdminProfile({ avatar: url });
    }
    setProfileSuccessMsg('تصویر پروفایل در هدر و حساب کاربری با موفقیت به‌روزرسانی شد.');
    setTimeout(() => setProfileSuccessMsg(''), 3500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileErrorMsg('');
    setProfileSuccessMsg('');

    if (!profileForm.username.trim()) {
      setProfileErrorMsg('نام کاربری نمی‌تواند خالی باشد.');
      return;
    }

    // Check password change
    let updatedPass = adminProfile?.password || 'anti@admin2026';
    if (profileForm.newPassword) {
      if (profileForm.newPassword.length < 5) {
        setProfileErrorMsg('رمز عبور جدید باید حداقل ۵ کاراکتر باشد.');
        return;
      }
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        setProfileErrorMsg('رمز عبور جدید با تکرار آن یکسان نیست.');
        return;
      }
      updatedPass = profileForm.newPassword;
    }

    const updated = {
      username: profileForm.username.trim(),
      fullName: profileForm.fullName.trim() || 'مدیر ارشد برند آنتی',
      email: profileForm.email.trim(),
      avatar: profileForm.avatar,
      password: updatedPass,
    };

    if (onUpdateAdminProfile) {
      onUpdateAdminProfile(updated);
    }

    setProfileSuccessMsg('مشخصات حساب و رمز عبور با موفقیت ذخیره گردید.');
    setProfileForm((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));

    setTimeout(() => {
      setProfileSuccessMsg('');
    }, 4500);
  };

  // Handlers for Coupon
  const handleGenerateRandomCode = () => {
    const prefixes = ['ANTI', 'VIP', 'LUX', 'ROSE', 'GOLD', 'PARIS'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    setCouponForm((prev) => ({ ...prev, code: `${randomPrefix}${randomNum}` }));
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    setCouponError('');

    if (!couponForm.code.trim()) {
      setCouponError('لطفاً کد تخفیف را وارد نمایید.');
      return;
    }
    if (couponForm.discountPercent < 1 || couponForm.discountPercent > 100) {
      setCouponError('درصد تخفیف باید بین ۱ تا ۱۰۰ باشد.');
      return;
    }

    const exists = coupons.some(
      (c) => c.code.toLowerCase() === couponForm.code.trim().toLowerCase()
    );
    if (exists) {
      setCouponError('این کد تخفیف از قبل در سیستم ثبت شده است.');
      return;
    }

    const newCoupon = {
      code: couponForm.code.trim().toUpperCase(),
      discountPercent: Number(couponForm.discountPercent),
      description: couponForm.description.trim() || `تخفیف ${couponForm.discountPercent} درصدی ویژه`,
      minPurchase: Number(couponForm.minPurchase) || 0,
      expiresAt: couponForm.expiresAt || '۱۴۰۵/۰۱/۰۱',
      maxUsage: Number(couponForm.maxUsage) || 100,
      isActive: couponForm.isActive,
    };

    if (onAddCoupon) {
      onAddCoupon(newCoupon);
    }

    setIsCouponModalOpen(false);
    setCouponForm(initialCouponForm);
    // Show gorgeous Success Modal!
    setCreatedSuccessCoupon(newCoupon);
  };

  const handleCopyCode = (id, code) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCouponId(id);
    // Increment usage count and glide progress bar forward!
    if (onIncrementCouponUsage) {
      onIncrementCouponUsage(id);
    }
    setTimeout(() => setCopiedCouponId(null), 2500);
  };

  const filteredCoupons = coupons.filter((c) => {
    if (couponFilter === 'active') return c.isActive;
    if (couponFilter === 'inactive') return !c.isActive;
    return true;
  });

  return (
    <div className="admin-profile-container">
      {/* SECTION 1: ADMIN PROFILE & CREDENTIALS (BOX-BY-BOX LUXURY STYLING) */}
      <motion.div
        className="dash-card profile-settings-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="dash-card-header flex-wrap gap-3">
          <div className="header-badge-title">
            <Shield size={20} className="text-purple-accent" />
            <div>
              <h3 className="dash-card-title">مشخصات حساب و امنیت مدیر (Profile & Security)</h3>
              <p className="dash-card-subtitle">
                مدیریت شناسه کاربری، تصویر آواتار، ایمیل رسمی و کلمه عبور اختصاصی
              </p>
            </div>
          </div>
          <span className="profile-role-badge">
            <Sparkles size={13} />
            {adminProfile?.role || 'مدیریت کل سیستم و پرتال VIP'}
          </span>
        </div>

        {profileSuccessMsg && (
          <motion.div
            className="alert-box success-alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Check size={16} />
            <span>{profileSuccessMsg}</span>
          </motion.div>
        )}

        {profileErrorMsg && (
          <motion.div
            className="alert-box error-alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <AlertCircle size={16} />
            <span>{profileErrorMsg}</span>
          </motion.div>
        )}

        <form onSubmit={handleSaveProfile} className="profile-edit-form">
          {/* AVATAR SHOWCASE BOX WITH LIVE TOP-HEADER SYNC */}
          <div className="profile-avatar-section">
            <div className="avatar-preview-box">
              <img
                src={profileForm.avatar}
                alt="Admin Avatar Preview"
                className="avatar-large-img"
                referrerPolicy="no-referrer"
              />
              <span className="avatar-badge-live">VIP</span>
            </div>

            <div className="avatar-controls-col">
              <div className="avatar-header-label-row">
                <label className="field-label-bold">تصویر نمایه مدیر (Avatar)</label>
                <span className="avatar-sync-tag">
                  <CheckCircle2 size={13} />
                  انعکاس آنی در هدر بالای صفحه
                </span>
              </div>
              <p className="field-hint-text">
                با آپلود یا انتخاب هر تصویر، عکس شما در هدر بالای پنل فوراً تغییر خواهد کرد.
              </p>

              {/* Preset Avatars */}
              <div className="preset-avatars-list">
                {PRESET_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    className={`preset-avatar-btn ${profileForm.avatar === av.url ? 'selected' : ''}`}
                    onClick={() => handleSelectPresetAvatar(av.url)}
                    title={av.label}
                  >
                    <img src={av.url} alt={av.label} referrerPolicy="no-referrer" />
                    {profileForm.avatar === av.url && (
                      <span className="preset-check-icon">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom URL or File Upload */}
              <div className="avatar-upload-inputs">
                <input
                  type="text"
                  className="admin-text-input dir-ltr"
                  placeholder="https://... آدرس مستقیم تصویر"
                  value={profileForm.avatar.startsWith('data:') ? 'تصویر آپلود شده از حافظه دستگاه' : profileForm.avatar}
                  onChange={(e) => {
                    handleProfileChange('avatar', e.target.value);
                    if (e.target.value.startsWith('http') && onUpdateAdminProfile) {
                      onUpdateAdminProfile({ avatar: e.target.value });
                    }
                  }}
                  disabled={profileForm.avatar.startsWith('data:')}
                />

                <label className="file-upload-label-btn" title="انتخاب عکس از سیستم">
                  <Upload size={16} />
                  <span>آپلود عکس جدید</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden-file-input"
                    onChange={handleAvatarFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* 3 STRUCTURED PROFILE BOX CARDS */}
          <div className="profile-boxes-grid">
            {/* BOX 1: USER IDENTITY & DISPLAY NAME */}
            <div className="profile-box-card">
              <div className="profile-box-header">
                <div className="profile-box-icon-wrap user-icon-bg">
                  <User size={18} />
                </div>
                <div>
                  <h4 className="profile-box-title">هویت و نام کاربری</h4>
                  <span className="profile-box-subtitle">شناسه‌های ورود و نام نمایشی</span>
                </div>
              </div>

              <div className="profile-box-body">
                <div className="form-field-group">
                  <label className="field-label">نام کاربری ورود (Username)</label>
                  <div className="input-with-icon-wrap">
                    <User size={16} className="field-inner-icon" />
                    <input
                      type="text"
                      className="admin-text-input dir-ltr text-right"
                      value={profileForm.username}
                      onChange={(e) => handleProfileChange('username', e.target.value)}
                      placeholder="admin"
                      required
                    />
                  </div>
                  <span className="field-hint">جهت احراز هویت در فرم ورود <code>/admin-login</code></span>
                </div>

                <div className="form-field-group">
                  <label className="field-label">نام و عنوان نمایشی</label>
                  <div className="input-with-icon-wrap">
                    <Sparkles size={16} className="field-inner-icon" />
                    <input
                      type="text"
                      className="admin-text-input"
                      value={profileForm.fullName}
                      onChange={(e) => handleProfileChange('fullName', e.target.value)}
                      placeholder="مدیر ارشد برند آنتی"
                    />
                  </div>
                  <span className="field-hint">نامی که در خوش‌آمدگویی و تولتیپ بالای پنل درج می‌شود.</span>
                </div>
              </div>
            </div>

            {/* BOX 2: OFFICIAL CONTACT & ROLE */}
            <div className="profile-box-card">
              <div className="profile-box-header">
                <div className="profile-box-icon-wrap mail-icon-bg">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="profile-box-title">ارتباطات و پرتال دسترسی</h4>
                  <span className="profile-box-subtitle">ایمیل رسمی و رتبه مدیریتی</span>
                </div>
              </div>

              <div className="profile-box-body">
                <div className="form-field-group">
                  <label className="field-label">پست الکترونیکی رسمی (Email)</label>
                  <div className="input-with-icon-wrap">
                    <Mail size={16} className="field-inner-icon" />
                    <input
                      type="email"
                      className="admin-text-input dir-ltr text-right"
                      value={profileForm.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      placeholder="admin@anti-perfume.ir"
                    />
                  </div>
                  <span className="field-hint">جهت دریافت گزارشات امنیتی و بازیابی رمز عبور</span>
                </div>

                <div className="form-field-group">
                  <label className="field-label">سطح دسترسی سیستم</label>
                  <div className="role-readonly-box">
                    <Shield size={16} className="text-purple-accent" />
                    <div className="role-info-col">
                      <span className="role-main-text">{adminProfile?.role || 'مدیریت کل سیستم و پرتال VIP'}</span>
                      <span className="role-sub-text">دسترسی نامحدود به دیتابیس محصولات و کدهای تخفیف</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOX 3: SECURITY & PASSWORD CHANGE */}
            <div className="profile-box-card">
              <div className="profile-box-header">
                <div className="profile-box-icon-wrap key-icon-bg">
                  <KeyRound size={18} />
                </div>
                <div>
                  <h4 className="profile-box-title">امنیت و رمز عبور</h4>
                  <span className="profile-box-subtitle">تغییر گذرواژه ورود با امنیت بالا</span>
                </div>
              </div>

              <div className="profile-box-body">
                <div className="form-field-group">
                  <label className="field-label">رمز عبور جدید (اختیاری)</label>
                  <div className="input-with-icon-wrap">
                    <KeyRound size={16} className="field-inner-icon" />
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      className="admin-text-input dir-ltr text-right"
                      value={profileForm.newPassword}
                      onChange={(e) => handleProfileChange('newPassword', e.target.value)}
                      placeholder="در صورت عدم تغییر، خالی بگذارید"
                    />
                    <button
                      type="button"
                      className="toggle-eye-btn"
                      onClick={() => setShowNewPass(!showNewPass)}
                      title={showNewPass ? 'مخفی کردن' : 'نمایش'}
                    >
                      {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <span className="field-hint">حداقل ۵ کاراکتر شامل حروف و اعداد</span>
                </div>

                <div className="form-field-group">
                  <label className="field-label">تکرار رمز عبور جدید</label>
                  <div className="input-with-icon-wrap">
                    <KeyRound size={16} className="field-inner-icon" />
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      className="admin-text-input dir-ltr text-right"
                      value={profileForm.confirmPassword}
                      onChange={(e) => handleProfileChange('confirmPassword', e.target.value)}
                      placeholder="تکرار مجدد کلمه عبور جدید"
                    />
                  </div>
                  <span className="field-hint">باید دقیقاً با کلمه عبور جدید یکسان باشد</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-form-footer">
            <button type="submit" className="admin-primary-btn save-profile-submit-btn">
              <Check size={18} />
              <span>ذخیره کلیه تغییرات حساب کاربری</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* SECTION 2: COUPON CODES MANAGEMENT */}
      <motion.div
        className="dash-card coupon-management-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <div className="dash-card-header flex-wrap">
          <div className="header-badge-title">
            <TicketPercent size={22} className="text-purple-accent" />
            <div>
              <h3 className="dash-card-title">مدیریت و ایجاد کدهای تخفیف (Promo Codes)</h3>
              <p className="dash-card-subtitle">
                تعریف کوپن‌های تخفیف، اعمال درصدهای ویژه برای مشتریان و پایش مصرف
              </p>
            </div>
          </div>

          <div className="coupon-header-actions">
            <div className="filter-pill-group">
              <button
                type="button"
                className={`filter-pill-btn ${couponFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCouponFilter('all')}
              >
                همه ({toPersianDigits(coupons.length)})
              </button>
              <button
                type="button"
                className={`filter-pill-btn ${couponFilter === 'active' ? 'active' : ''}`}
                onClick={() => setCouponFilter('active')}
              >
                فعال ({toPersianDigits(coupons.filter((c) => c.isActive).length)})
              </button>
              <button
                type="button"
                className={`filter-pill-btn ${couponFilter === 'inactive' ? 'active' : ''}`}
                onClick={() => setCouponFilter('inactive')}
              >
                غیرفعال ({toPersianDigits(coupons.filter((c) => !c.isActive).length)})
              </button>
            </div>

            <button
              type="button"
              className="admin-primary-btn create-coupon-trigger-btn"
              onClick={() => setIsCouponModalOpen(true)}
            >
              <Plus size={18} />
              <span>تولید کد تخفیف</span>
            </button>
          </div>
        </div>

        {/* COUPONS CARDS GRID - FULLY CENTERED & RESPONSIVE */}
        <div className="coupons-cards-grid">
          {filteredCoupons.map((coupon) => {
            const usage = coupon.usageCount || 0;
            const max = coupon.maxUsage || 100;
            const percentUsed = Math.min(100, Math.max(4, (usage / max) * 100));

            return (
              <motion.div
                key={coupon.id}
                className={`luxury-coupon-card ${!coupon.isActive ? 'coupon-inactive' : ''}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {/* Visual Ticket Notches */}
                <span className="ticket-notch notch-left" aria-hidden="true" />
                <span className="ticket-notch notch-right" aria-hidden="true" />

                <div className="coupon-card-header">
                  <span className="coupon-discount-badge">
                    {toPersianDigits(coupon.discountPercent)}٪ تخفیف
                  </span>
                  <span className={`coupon-status-tag ${coupon.isActive ? 'active' : 'inactive'}`}>
                    {coupon.isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                </div>

                <div className="coupon-code-row">
                  <div className="coupon-code-badge">
                    <code>{coupon.code}</code>
                  </div>
                  <button
                    type="button"
                    className="copy-code-icon-btn"
                    onClick={() => handleCopyCode(coupon.id, coupon.code)}
                    title="کپی کد تخفیف و ثبت مصرف"
                  >
                    {copiedCouponId === coupon.id ? (
                      <span className="copy-success-badge">
                        <Check size={14} className="text-emerald-500" />
                        <span>کپی شد (+۱)</span>
                      </span>
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>

                <p className="coupon-desc-text">{coupon.description}</p>

                <div className="coupon-specs-grid">
                  <div className="coupon-spec-item">
                    <span className="spec-label">حداقل خرید:</span>
                    <span className="spec-val">{formatPersianPrice(coupon.minPurchase)}</span>
                  </div>
                  <div className="coupon-spec-item">
                    <span className="spec-label">مهلت استفاده:</span>
                    <span className="spec-val">{toPersianDigits(coupon.expiresAt)}</span>
                  </div>
                  <div className="coupon-spec-item">
                    <span className="spec-label">تعداد استفاده:</span>
                    <span className="spec-val font-semibold text-purple-accent">
                      {toPersianDigits(usage)} از {toPersianDigits(max)} بار
                    </span>
                  </div>
                </div>

                {/* Progress bar for coupon usage with smooth glide animation */}
                <div className="coupon-usage-bar-container">
                  <div className="coupon-usage-bar-meta">
                    <span>مصرف کوپن</span>
                    <span>{toPersianDigits(Math.round(percentUsed))}٪</span>
                  </div>
                  <div className="coupon-usage-bar-wrap">
                    <div
                      className="coupon-usage-bar-fill"
                      style={{
                        width: `${percentUsed}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="coupon-card-actions">
                  <button
                    type="button"
                    className={`toggle-status-btn ${coupon.isActive ? 'btn-active' : 'btn-inactive'}`}
                    onClick={() => onToggleCouponStatus && onToggleCouponStatus(coupon.id)}
                    title={coupon.isActive ? 'غیرفعال کردن کد' : 'فعال کردن کد'}
                  >
                    {coupon.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                    <span>{coupon.isActive ? 'فعال' : 'غیرفعال'}</span>
                  </button>

                  <button
                    type="button"
                    className="delete-coupon-btn"
                    onClick={() => onDeleteCoupon && onDeleteCoupon(coupon.id)}
                    title="حذف کد تخفیف"
                  >
                    <Trash2 size={16} />
                    <span>حذف</span>
                  </button>
                </div>
              </motion.div>
            );
          })}

          {filteredCoupons.length === 0 && (
            <div className="no-coupons-placeholder">
              <TicketPercent size={40} className="empty-icon" />
              <p>کد تخفیفی در این دسته‌بندی یافت نشد.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* CREATE COUPON MODAL - CENTERED IN MIDDLE OF SCREEN & BEAUTIFULLY STYLED */}
      <AnimatePresence>
        {isCouponModalOpen && (
          <div
            className="admin-modal-backdrop"
            onClick={() => setIsCouponModalOpen(false)}
          >
            <motion.div
              className="coupon-create-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              <div className="modal-header-row">
                <div className="modal-title-wrap">
                  <div className="modal-icon-badge">
                    <TicketPercent size={20} />
                  </div>
                  <div>
                    <h4>تولید و تعریف کد تخفیف جدید</h4>
                    <span className="modal-title-sub">تنظیم پارامترها و سقف مصرف کوپن اختصاصی</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="modal-close-icon-btn"
                  onClick={() => setIsCouponModalOpen(false)}
                  title="بستن"
                >
                  <X size={18} />
                </button>
              </div>

              {couponError && (
                <div className="alert-box error-alert mb-4">
                  <AlertCircle size={16} />
                  <span>{couponError}</span>
                </div>
              )}

              <form onSubmit={handleCreateCoupon} className="coupon-modal-form">
                {/* Box 1: Code input with generator button */}
                <div className="modal-form-box">
                  <label className="field-label">کد تخفیف (Coupon Code)</label>
                  <div className="input-with-action-wrap">
                    <input
                      type="text"
                      className="admin-text-input dir-ltr uppercase font-mono text-center font-bold text-lg"
                      value={couponForm.code}
                      onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                      placeholder="e.g. VIP50"
                      required
                    />
                    <button
                      type="button"
                      className="generate-code-btn"
                      onClick={handleGenerateRandomCode}
                      title="تولید کد تصادفی شیک"
                    >
                      <RefreshCw size={14} />
                      <span>تولید کد تصادفی</span>
                    </button>
                  </div>
                  <span className="field-hint">کد را به انگلیسی وارد کرده یا دکمه تولید تصادفی را بزنید.</span>
                </div>

                {/* Box 2: Percentage & Min purchase */}
                <div className="modal-form-box">
                  <div className="form-grid-2cols">
                    <div className="form-field-group">
                      <label className="field-label">درصد تخفیف (٪)</label>
                      <div className="input-with-icon-wrap">
                        <Tag size={16} className="field-inner-icon" />
                        <input
                          type="number"
                          min="1"
                          max="100"
                          className="admin-text-input dir-ltr text-right font-bold"
                          value={couponForm.discountPercent}
                          onChange={(e) => setCouponForm({ ...couponForm, discountPercent: e.target.value })}
                          required
                        />
                      </div>
                      <span className="field-hint">بین ۱ تا ۱۰۰ درصد</span>
                    </div>

                    <div className="form-field-group">
                      <label className="field-label">حداقل مبلغ خرید (تومان)</label>
                      <div className="input-with-icon-wrap">
                        <ShoppingBag size={16} className="field-inner-icon" />
                        <input
                          type="number"
                          step="100000"
                          className="admin-text-input dir-ltr text-right"
                          value={couponForm.minPurchase}
                          onChange={(e) => setCouponForm({ ...couponForm, minPurchase: e.target.value })}
                        />
                      </div>
                      <span className="field-hint">برای اعمال بدون محدودیت، صفر بگذارید</span>
                    </div>
                  </div>
                </div>

                {/* Box 3: Expiry & Max usage */}
                <div className="modal-form-box">
                  <div className="form-grid-2cols">
                    <div className="form-field-group">
                      <label className="field-label">تاریخ انقضا</label>
                      <div className="input-with-icon-wrap">
                        <Calendar size={16} className="field-inner-icon" />
                        <input
                          type="text"
                          className="admin-text-input"
                          value={couponForm.expiresAt}
                          onChange={(e) => setCouponForm({ ...couponForm, expiresAt: e.target.value })}
                          placeholder="۱۴۰۴/۱۲/۲۹"
                        />
                      </div>
                      <span className="field-hint">فرمت تاریخ شمسی</span>
                    </div>

                    <div className="form-field-group">
                      <label className="field-label">سقف تعداد مجاز استفاده</label>
                      <div className="input-with-icon-wrap">
                        <Users size={16} className="field-inner-icon" />
                        <input
                          type="number"
                          min="1"
                          className="admin-text-input dir-ltr text-right font-bold"
                          value={couponForm.maxUsage}
                          onChange={(e) => setCouponForm({ ...couponForm, maxUsage: e.target.value })}
                        />
                      </div>
                      <span className="field-hint">حداکثر دفعاتی که کد مصرف می‌شود</span>
                    </div>
                  </div>
                </div>

                {/* Box 4: Description */}
                <div className="modal-form-box">
                  <label className="field-label">عنوان و توضیح کمپین تخفیف</label>
                  <input
                    type="text"
                    className="admin-text-input"
                    value={couponForm.description}
                    onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                    placeholder="مثال: جشنواره ویژه اعضای VIP عطر آنتی"
                  />
                  <span className="field-hint">عنوانی که در کارت تخفیف به نمایش درمی‌آید.</span>
                </div>

                {/* MODAL ACTION BUTTONS FOOTER - NEW DESIGN */}
                <div className="modal-footer-actions">
                  <button
                    type="button"
                    className="modal-btn btn-cancel"
                    onClick={() => setIsCouponModalOpen(false)}
                  >
                    <X size={16} />
                    <span>انصراف</span>
                  </button>

                  <button
                    type="submit"
                    className="modal-btn btn-submit-coupon"
                  >
                    <Check size={18} />
                    <span>تأیید و ذخیره کد تخفیف</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS MODAL ON SAVING COUPON */}
      <AnimatePresence>
        {createdSuccessCoupon && (
          <div
            className="admin-modal-backdrop"
            onClick={() => setCreatedSuccessCoupon(null)}
          >
            <motion.div
              className="coupon-success-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            >
              <div className="success-modal-badge-wrapper">
                <div className="success-modal-pulse-ring" />
                <div className="success-modal-icon-circle">
                  <PartyPopper size={34} className="text-emerald-400" />
                </div>
              </div>

              <h3 className="success-modal-title">کد تخفیف با موفقیت ایجاد شد!</h3>
              <p className="success-modal-desc">
                کوپن تخفیف شما در دیتابیس سامانه با موفقیت به ثبت رسید و هم‌اکنون برای خریداران فعال است.
              </p>

              <div className="success-coupon-preview-box">
                <div className="success-coupon-top">
                  <span className="success-coupon-percent">
                    {toPersianDigits(createdSuccessCoupon.discountPercent)}٪ تخفیف ویژه
                  </span>
                  <span className="success-coupon-badge">آماده استفاده</span>
                </div>

                <div className="success-coupon-code-pill">
                  <code className="font-mono text-xl font-black">{createdSuccessCoupon.code}</code>
                  <button
                    type="button"
                    className="success-coupon-copy-btn"
                    onClick={() => {
                      if (navigator?.clipboard?.writeText) {
                        navigator.clipboard.writeText(createdSuccessCoupon.code);
                      }
                      setCopiedCouponId('success_modal_code');
                      setTimeout(() => setCopiedCouponId(null), 2000);
                    }}
                    title="کپی کردن کد تخفیف"
                  >
                    {copiedCouponId === 'success_modal_code' ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                    <span>{copiedCouponId === 'success_modal_code' ? 'کپی شد' : 'کپی کد'}</span>
                  </button>
                </div>

                <p className="success-coupon-info-text">{createdSuccessCoupon.description}</p>
              </div>

              <div className="success-modal-footer">
                <button
                  type="button"
                  className="admin-primary-btn success-modal-done-btn"
                  onClick={() => setCreatedSuccessCoupon(null)}
                >
                  <Check size={18} />
                  <span>متوجه شدم و بستن</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}