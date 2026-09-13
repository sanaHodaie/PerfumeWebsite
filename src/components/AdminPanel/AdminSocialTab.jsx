import React, { useState } from 'react';
import {
  Share2,
  Instagram,
  Send,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  Check,
  ExternalLink,
  Copy
} from 'lucide-react';

export default function AdminSocialTab({ contactInfo, onUpdateContactInfo }) {
  const [form, setForm] = useState(contactInfo);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateContactInfo(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleCopy = (text, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    }
  };

  return (
    <div className="admin-social-container">
      <form onSubmit={handleSave} className="content-edit-card">
        <div className="content-card-intro">
          <h4 className="content-section-title">تنظیمات شبکه‌های اجتماعی و راه‌های ارتباطی</h4>
          <p className="content-section-desc">
            آیدی‌های اینستاگرام، کانال تلگرام، شماره واتساپ، تلفن بوتیک و آدرس مرکزی را ویرایش کنید. این اطلاعات مستقیماً در فوتر، هدر و بخش تماس اعمال می‌شوند.
          </p>
        </div>

        {saveSuccess && (
          <div className="save-success-alert mb-4">
            <Check size={18} />
            <span>اطلاعات تماس و شبکه‌های اجتماعی با موفقیت بروزرسانی شدند.</span>
          </div>
        )}

        <div className="form-grid-2cols">
          {/* Instagram */}
          <div className="social-input-block">
            <div className="social-title-flex">
              <div className="social-icon-badge insta-bg">
                <Instagram size={16} />
              </div>
              <strong>اینستاگرام (Instagram)</strong>
            </div>

            <div className="form-field mt-2">
              <label className="form-label">آیدی کاربری</label>
              <input
                type="text"
                className="form-input dir-ltr"
                placeholder="@anti.parfums"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label className="form-label">لینک مستقیم پروفایل</label>
              <div className="input-with-action">
                <input
                  type="text"
                  className="form-input dir-ltr"
                  value={form.instagramLink}
                  onChange={(e) => setForm({ ...form, instagramLink: e.target.value })}
                />
                <a
                  href={form.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="input-ext-btn"
                  title="تست لینک"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Telegram */}
          <div className="social-input-block">
            <div className="social-title-flex">
              <div className="social-icon-badge tg-bg">
                <Send size={16} />
              </div>
              <strong>کانال و پشتیبانی تلگرام (Telegram)</strong>
            </div>

            <div className="form-field mt-2">
              <label className="form-label">آیدی کاربری / کانال</label>
              <input
                type="text"
                className="form-input dir-ltr"
                placeholder="@anti_concierge"
                value={form.telegram}
                onChange={(e) => setForm({ ...form, telegram: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label className="form-label">لینک مستقیم تلگرام</label>
              <div className="input-with-action">
                <input
                  type="text"
                  className="form-input dir-ltr"
                  value={form.telegramLink}
                  onChange={(e) => setForm({ ...form, telegramLink: e.target.value })}
                />
                <a
                  href={form.telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="input-ext-btn"
                  title="تست لینک"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="social-input-block">
            <div className="social-title-flex">
              <div className="social-icon-badge wa-bg">
                <MessageCircle size={16} />
              </div>
              <strong>واتساپ بیزینس و مشاوره (WhatsApp)</strong>
            </div>

            <div className="form-field mt-2">
              <label className="form-label">شماره همراه واتساپ</label>
              <input
                type="text"
                className="form-input dir-ltr"
                placeholder="+989123456789"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label className="form-label">لینک چت مستقیم (wa.me)</label>
              <div className="input-with-action">
                <input
                  type="text"
                  className="form-input dir-ltr"
                  value={form.whatsappLink}
                  onChange={(e) => setForm({ ...form, whatsappLink: e.target.value })}
                />
                <a
                  href={form.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="input-ext-btn"
                  title="تست لینک"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="social-input-block">
            <div className="social-title-flex">
              <div className="social-icon-badge phone-bg">
                <Phone size={16} />
              </div>
              <strong>تلفن مشاوره و سفارش تلفنی</strong>
            </div>

            <div className="form-field mt-2">
              <label className="form-label">شماره تماس مستقیم</label>
              <input
                type="text"
                className="form-input dir-ltr"
                placeholder="۰۲۱-۲۲۰۰۵۵۴۴"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label className="form-label">ایمیل پشتیبانی رسمی</label>
              <input
                type="email"
                className="form-input dir-ltr"
                placeholder="concierge@anti-perfume.ir"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Address & Hours */}
        <div className="form-section-divider mt-4">آدرس بوتیک و ساعات پذیرش</div>

        <div className="form-field">
          <label className="form-label">نشانی بوتیک مرکزی و دفتر تشریفات</label>
          <input
            type="text"
            className="form-input"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className="form-field">
          <label className="form-label">ساعات پاسخگویی و پذیرش حضوری</label>
          <input
            type="text"
            className="form-input"
            value={form.workingHours}
            onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
          />
        </div>

        <div className="content-form-footer">
          <button type="submit" className="admin-btn-primary">
            <Save size={18} />
            <span>ذخیره کلیه تنظیمات ارتباطی</span>
          </button>
        </div>
      </form>
    </div>
  );
}
