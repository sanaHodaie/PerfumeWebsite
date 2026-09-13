import React from 'react';
import { motion } from 'motion/react';
import {
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Wallet,
  Building2,
  Package,
  Truck,
  Flame,
  Palette,
  CheckCircle2,
  Layers,
  HelpCircle,
  Share2,
  TicketPercent,
  UserCheck,
  Flower2
} from 'lucide-react';
import { toPersianDigits, formatPersianPrice } from '../../utils/persianNumbers';

export default function AdminOverviewTab({
  productsCount = 0,
  faqsCount = 0,
  couponsCount = 0,
  onNavigateTab,
}) {
  const barChartData = [
    { label: 'ش (Sat)', rev: 48, dep: 32 },
    { label: 'ی (Sun)', rev: 62, dep: 40 },
    { label: 'د (Mon)', rev: 78, dep: 52 },
    { label: 'س (Tue)', rev: 88, dep: 60 },
    { label: 'چ (Wed)', rev: 94, dep: 68 },
    { label: 'پ (Thu)', rev: 58, dep: 45 },
    { label: 'ج (Fri)', rev: 42, dep: 30 },
  ];

  const accountsList = [
    {
      icon: Wallet,
      colorClass: 'acc-purple',
      title: 'حساب اصلی فروشگاه',
      subtitle: 'موجودی تسویه‌شده',
      amount: '۱۲۴,۵۰۰,۰۰۰ ت',
      subtag: '۲,۴۵۰.۸۰ €',
    },
    {
      icon: Building2,
      colorClass: 'acc-pink',
      title: 'حساب پس‌انداز و توسعه',
      subtitle: 'ذخیره اسانس‌های نیش',
      amount: '۳۱۰,۰۰۰,۰۰۰ ت',
      subtag: '۶,۱۳۵.۰۰ €',
    },
    {
      icon: CreditCard,
      colorClass: 'acc-orange',
      title: 'درگاه مستقیم شاپرک',
      subtitle: 'تراکنش‌های ۲۴ ساعت اخیر',
      amount: '۷۴,۲۰۰,۰۰۰ ت',
      subtag: '۱,۴۵۰.۶۰ €',
    },
    {
      icon: TrendingUp,
      colorClass: 'acc-amber',
      title: 'سرمایه‌گذاری مزارع گراس',
      subtitle: 'برداشت فصلی گل سرخ',
      amount: '۲۱۵,۰۰۰,۰۰۰ ت',
      subtag: '۴,۱۹۰.۲۵ €',
    },
  ];

  return (
    <div className="admin-overview-grid">
      {/* 1. My Accounts (حساب‌های مالی و درآمد) */}
      <motion.div
        className="dash-card dash-accounts-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <div className="dash-card-header">
          <h3 className="dash-card-title">حساب‌ها و گردش مالی (My Accounts)</h3>
        </div>

        <div className="dash-accounts-content">
          {/* Visual Debit/Bank Card matching screenshot */}
          <motion.div
            className="luxury-bank-card"
            whileHover={{ scale: 1.015, rotateY: 3 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bank-card-glass-glow" />
            <div className="bank-card-top">
              <div className="bank-card-chip">
                <span className="chip-line" />
                <span className="chip-line" />
              </div>
              <div className="bank-card-contactless">
                <span className="wave wave-1" />
                <span className="wave wave-2" />
                <span className="wave wave-3" />
              </div>
            </div>

            <div className="bank-card-number">
              <span>••••</span>
              <span>••••</span>
              <span>••••</span>
              <span>۲۸۴۷</span>
            </div>

            <div className="bank-card-footer">
              <div className="card-expiry-col">
                <span className="card-label-small">انقضا</span>
                <span className="card-val-small">۰۶/۲۷</span>
              </div>
              <span className="card-tier-badge">Platinum • پلاتیـنوم</span>
            </div>
          </motion.div>

          {/* Sub-Accounts List matching screenshot */}
          <div className="accounts-sub-list">
            {accountsList.map((acc, index) => {
              const AccIcon = acc.icon;
              return (
                <motion.div
                  key={acc.title}
                  className="account-row-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                  whileHover={{ x: -4, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
                >
                  <div className={`acc-icon-wrap ${acc.colorClass}`}>
                    <AccIcon size={16} />
                  </div>
                  <div className="acc-info">
                    <span className="acc-title">{acc.title}</span>
                    <span className="acc-subtitle">{acc.subtitle}</span>
                  </div>
                  <div className="acc-balance">
                    <span className="acc-amount">{acc.amount}</span>
                    <span className="acc-subtag">{acc.subtag}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* 2. Overview Performance (نمای کلی عملکرد و رینگ ۷۲٪) */}
      <motion.div
        className="dash-card dash-overview-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
      >
        <div className="dash-card-header">
          <h3 className="dash-card-title">نمای کلی عملکرد (Performance Overview)</h3>
        </div>

        {/* Circular Progress Gauge with SVG stroke animation */}
        <div className="radial-progress-wrapper">
          <div className="radial-circle-box">
            <svg className="radial-svg" viewBox="0 0 160 160">
              <circle
                className="radial-bg-track"
                cx="80"
                cy="80"
                r="64"
                strokeWidth="11"
              />
              <motion.circle
                className="radial-fill-bar"
                cx="80"
                cy="80"
                r="64"
                strokeWidth="11"
                strokeDasharray="402"
                initial={{ strokeDashoffset: 402 }}
                animate={{ strokeDashoffset: 112 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </svg>
            <motion.div
              className="radial-center-text"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45, type: 'spring', stiffness: 200 }}
            >
              <span className="radial-percent">۷۲٪</span>
            </motion.div>
          </div>

          <div className="radial-stat-caption">
            <span className="radial-main-num">۲۶۵,۸۰۰,۰۰۰ تومان</span>
            <span className="radial-sub-label">هدف فروش ماهانه (۵,۱۸۰.۴۵ €)</span>
          </div>
        </div>

        {/* Categorized breakdown list matching screenshot */}
        <div className="metrics-breakdown-list">
          <div className="breakdown-item">
            <div className="breakdown-bullet-icon purple-bg">
              <Flower2 size={13} />
            </div>
            <span className="breakdown-name">تأمین اسانس طبیعی</span>
            <span className="breakdown-val negative">-۴۸۲.۳۰ €</span>
          </div>

          <div className="breakdown-item">
            <div className="breakdown-bullet-icon orange-bg">
              <Flame size={13} />
            </div>
            <span className="breakdown-name">بلور و بطری‌های دست‌ساز</span>
            <span className="breakdown-val negative">-۳۱۰.۲۰ €</span>
          </div>

          <div className="breakdown-item">
            <div className="breakdown-bullet-icon pink-bg">
              <Building2 size={13} />
            </div>
            <span className="breakdown-name">بوتیک و دفتر الهیه</span>
            <span className="breakdown-val negative">-۱,۱۳۰.۰۰ €</span>
          </div>

          <div className="breakdown-item">
            <div className="breakdown-bullet-icon cyan-bg">
              <Truck size={13} />
            </div>
            <span className="breakdown-name">ارسال اختصاصی اکسپرس</span>
            <span className="breakdown-val negative">-۲۵۵.۰۰ €</span>
          </div>

          <div className="breakdown-item">
            <div className="breakdown-bullet-icon violet-bg">
              <Sparkles size={13} />
            </div>
            <span className="breakdown-name">عکاسی و معرفی کالکشن</span>
            <span className="breakdown-val negative">-۱۸۵.۷۰ €</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Sales Trend (نمودار منحنی روند) */}
      <motion.div
        className="dash-card dash-trend-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
      >
        <div className="dash-card-header">
          <h3 className="dash-card-title">روند فروش و سفارشات (Sales Trend)</h3>
        </div>

        <div className="curve-chart-container">
          <motion.div
            className="curve-tooltip-marker"
            style={{ top: '24%', right: '48%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.45, type: 'spring', stiffness: 220 }}
          >
            <div className="tooltip-bubble">۳۶۲ سفارش</div>
            <div className="tooltip-point" />
          </motion.div>

          <svg className="curve-svg" viewBox="0 0 500 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Area Fill fading in */}
            <motion.path
              d="M 0,140 C 60,135 100,105 160,115 C 220,125 240,40 280,45 C 320,50 350,110 400,90 C 450,70 480,120 500,105 L 500,160 L 0,160 Z"
              fill="url(#curveGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
            />
            {/* Stroke Line drawing animation */}
            <motion.path
              d="M 0,140 C 60,135 100,105 160,115 C 220,125 240,40 280,45 C 320,50 350,110 400,90 C 450,70 480,120 500,105"
              fill="none"
              stroke="#A855F7"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.25 }}
            />
          </svg>

          <div className="chart-x-axis">
            <span>شنبه (Sat)</span>
            <span>یکشنبه (Sun)</span>
            <span>دوشنبه (Mon)</span>
            <span>سه‌شنبه (Tue)</span>
            <span>چهارشنبه (Wed)</span>
            <span>پنج‌شنبه (Thu)</span>
            <span>جمعه (Fri)</span>
          </div>
        </div>
      </motion.div>

      {/* 4. Revenue vs Expenses (نمودار میله‌ای مقایسه‌ای) */}
      <motion.div
        className="dash-card dash-bars-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.28 }}
      >
        <div className="dash-card-header">
          <h3 className="dash-card-title">درآمد در برابر هزینه‌ها (Revenue vs Expenses)</h3>
          <div className="bars-legend">
            <div className="legend-item">
              <span className="legend-dot dot-revenus" />
              <span>درآمد (Revenue)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot dot-depenses" />
              <span>هزینه‌ها (Expenses)</span>
            </div>
          </div>
        </div>

        <div className="bars-chart-container">
          <div className="bars-columns-grid">
            {barChartData.map((item, idx) => (
              <div className="bar-day-col" key={item.label}>
                <div className="bar-pair">
                  <motion.div
                    className="bar-stick bar-rev"
                    initial={{ height: '0%' }}
                    animate={{ height: `${item.rev}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                  <motion.div
                    className="bar-stick bar-dep"
                    initial={{ height: '0%' }}
                    animate={{ height: `${item.dep}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.25 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
                <span className="bar-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 5. Quick Admin Controls Banner */}
      <motion.div
        className="dash-quick-shortcuts-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35 }}
      >
        <h4 className="shortcuts-title">دسترسی‌های سریع به بخش‌های اصلی پنل</h4>
        <div className="shortcuts-grid">
          <motion.button
            type="button"
            className="shortcut-tile"
            onClick={() => onNavigateTab('products')}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="shortcut-icon-badge">
              <Package size={20} />
            </div>
            <div className="shortcut-text">
              <strong>مدیریت محصولات ({toPersianDigits(productsCount)})</strong>
              <span>افزودن عطر جدید، تغییر قیمت، تصویر و نت‌ها</span>
            </div>
            <ArrowUpRight size={16} className="shortcut-arrow" />
          </motion.button>

          <motion.button
            type="button"
            className="shortcut-tile"
            onClick={() => onNavigateTab('faq')}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="shortcut-icon-badge">
              <HelpCircle size={20} />
            </div>
            <div className="shortcut-text">
              <strong>مدیریت سوالات متداول ({toPersianDigits(faqsCount)})</strong>
              <span>حذف سوال، افزودن سوال جدید، ویرایش پاسخ‌ها</span>
            </div>
            <ArrowUpRight size={16} className="shortcut-arrow" />
          </motion.button>

          <motion.button
            type="button"
            className="shortcut-tile"
            onClick={() => onNavigateTab('profile')}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="shortcut-icon-badge">
              <TicketPercent size={20} />
            </div>
            <div className="shortcut-text">
              <strong>پروفایل ادمین و کدهای تخفیف ({toPersianDigits(couponsCount)})</strong>
              <span>تغییر نام کاربری، رمز عبور، عکس پروفایل و ساخت کوپن</span>
            </div>
            <ArrowUpRight size={16} className="shortcut-arrow" />
          </motion.button>

          <motion.button
            type="button"
            className="shortcut-tile"
            onClick={() => onNavigateTab('social')}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="shortcut-icon-badge">
              <Share2 size={20} />
            </div>
            <div className="shortcut-text">
              <strong>آیدی شبکه‌ها و شماره‌های تماس</strong>
              <span>اینستاگرام، تلگرام، واتساپ، تلفن و آدرس بوتیک</span>
            </div>
            <ArrowUpRight size={16} className="shortcut-arrow" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
