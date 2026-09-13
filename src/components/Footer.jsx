import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Instagram,
  Send,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Truck,
  ShieldCheck,
  Headphones,
  Gift,
} from 'lucide-react';
import { FOOTER_LINKS } from '../data/products';
import { useAdminStore } from '../data/adminStore';
import './Footer.css';

const FOOTER_FEATURES = [
  {
    id: 'express-delivery',
    icon: Truck,
    title: 'ارسال اکسپرس و رایگان',
    subtitle: 'تحویل سریع با بسته‌بندی ایمن',
  },
  {
    id: 'authenticity-guarantee',
    icon: ShieldCheck,
    title: 'ضمانت ۱۰۰٪ اصالت کالا',
    subtitle: 'تضمین اصالت و شناسنامه عطر',
  },
  {
    id: 'concierge-support',
    icon: Headphones,
    title: 'پشتیبانی اختصاصی',
    subtitle: 'مشاوره حرفه‌ای انتخاب عطر',
  },
  {
    id: 'luxury-packaging',
    icon: Gift,
    title: 'بسته‌بندی هدیه فاخر',
    subtitle: 'جعبه هاردباکس و روبان لوکس',
  },
];

export default function Footer({
  onOpenPhilosophy,
  onOpenGrasse,
  onOpenGlasscraft,
  onOpenEco,
  onOpenCareer,
}) {
  const adminStore = useAdminStore();
  const contactInfo = adminStore?.contactInfo || {};

  const handleAboutLinkClick = (e, label) => {
    if (label.includes('فلسفه برند')) {
      e.preventDefault();
      if (onOpenPhilosophy) onOpenPhilosophy();
    } else if (label.includes('مزارع اختصاصی') || label.includes('گراس')) {
      e.preventDefault();
      if (onOpenGrasse) onOpenGrasse();
    } else if (label.includes('شیشه‌گری') || label.includes('شیشه گری')) {
      e.preventDefault();
      if (onOpenGlasscraft) onOpenGlasscraft();
    } else if (
      label.includes('زیست‌محیطی') ||
      label.includes('محیط زیست') ||
      label.includes('محیط‌زیستی')
    ) {
      e.preventDefault();
      if (onOpenEco) onOpenEco();
    } else if (label.includes('همکاری') || label.includes('فرصت')) {
      e.preventDefault();
      if (onOpenCareer) onOpenCareer();
    }
  };

  return (
    <footer id="footer" className="footer-wrapper">
      {/* FLOATING FEATURE BOX */}
      <motion.div
        className="footer-features-overlap-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-label="مزایا و خدمات اختصاصی آنتی"
      >
        <div className="footer-floating-box">
          {FOOTER_FEATURES.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <div key={feat.id} className="footer-floating-item">
                <div className="footer-floating-icon-box">
                  <IconComponent size={20} strokeWidth={1.8} />
                </div>
                <div className="footer-floating-text">
                  <h3 className="footer-floating-title">{feat.title}</h3>
                  <p className="footer-floating-subtitle">{feat.subtitle}</p>
                </div>
                {index < FOOTER_FEATURES.length - 1 && (
                  <div className="footer-floating-divider" />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="app-container footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <span className="footer-logo-script">Anti</span>
              <span className="footer-logo-badge">PARFUM</span>
            </div>
            <span className="footer-brand-subtitle">خانه‌ عطرسازی اشرافی و نیش پارفوم</span>
            <p className="footer-about-text">
              آنتی با تکیه بر اصالت، ذوق هنری و نادرترین عصاره‌های طبیعی، عطرهایی می‌آفریند که بیانیه‌ای از سلیقه بی‌بدیل شماست.
            </p>

            <div className="footer-socials">
              <a
                href={contactInfo.instagramLink || '#instagram'}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="اینستاگرام آنتی"
              >
                <Instagram size={18} />
              </a>
              <a
                href={contactInfo.telegramLink || '#telegram'}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="کانال تلگرام آنتی"
              >
                <Send size={18} />
              </a>
              <a
                href={contactInfo.whatsappLink || '#whatsapp'}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="واتساپ آنتی"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Column 1: دسترسی سریع */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">دسترسی سریع</h4>
            <ul className="footer-links-list">
              {FOOTER_LINKS.quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: محصولات */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">محصولات</h4>
            <ul className="footer-links-list">
              {FOOTER_LINKS.products.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: درباره ما */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">درباره ما</h4>
            <ul className="footer-links-list">
              {FOOTER_LINKS.about.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="footer-link"
                    onClick={(e) => handleAboutLinkClick(e, link.label)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: ارتباط با ما */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">ارتباط با ما</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>{contactInfo.address || 'تهران، الهیه، برج دیپلمات'}</span>
              </li>
              <li className="footer-contact-item">
                <Phone size={16} className="contact-icon" />
                <span dir="ltr">{contactInfo.phone || '۰۲۱ - ۲۲ ۰۰ ۵۵ ۴۴'}</span>
              </li>
              <li className="footer-contact-item">
                <Mail size={16} className="contact-icon" />
                <span>{contactInfo.email || 'concierge@anti-perfume.ir'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © تمامی حقوق برای برند لوکس «آنتی» محفوظ است.
          </p>

          <div className="footer-legal-links">
            <a href="#privacy" className="legal-link">حریم خصوصی</a>
            <span className="legal-sep">•</span>
            <a href="#terms" className="legal-link">شرایط و قوانین</a>
            <span className="legal-sep">•</span>
            <a href="#faq" className="legal-link">پرسش‌های متداول</a>
            <span className="legal-sep">•</span>
            <Link
              to="/admin-login"
              className="legal-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
            >
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}