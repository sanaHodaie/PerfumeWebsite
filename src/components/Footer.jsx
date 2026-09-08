import React from 'react';
import { Instagram, Send, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { FOOTER_LINKS } from '../data/products';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="footer" className="footer-wrapper">
      <div className="app-container">
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
              <a href="#instagram" className="social-icon-btn" aria-label="اینستاگرام آنتی">
                <Instagram size={18} />
              </a>
              <a href="#telegram" className="social-icon-btn" aria-label="کانال تلگرام آنتی">
                <Send size={18} />
              </a>
              <a href="#facebook" className="social-icon-btn" aria-label="فیسبوک آنتی">
                <Facebook size={18} />
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
                  <a href={link.href} className="footer-link">
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
                <span>تهران، الهیه، برج دیپلمات</span>
              </li>
              <li className="footer-contact-item">
                <Phone size={16} className="contact-icon" />
                <span dir="ltr">۰۲۱ - ۲۲ ۰۰ ۵۵ ۴۴</span>
              </li>
              <li className="footer-contact-item">
                <Mail size={16} className="contact-icon" />
                <span>concierge@anti-perfume.ir</span>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
