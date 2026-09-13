import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Flower2,
  Gem,
  Leaf,
  Briefcase,
  Check,
  RotateCcw,
  Image as ImageIcon,
  Save,
  Calendar,
  Users,
  Eye,
  ExternalLink
} from 'lucide-react';

const PRESET_BANNER_IMAGES = [
  { label: 'بطری کریستالی آنتی', url: '/anti_crystal_parfum.jpg' },
  { label: 'گلبرگ‌های گل رز صورتی', url: '/pink_rose_petals.jpg' },
  { label: 'میوز و بانوی آنتی', url: '/anti_muse_perfume.jpg' },
  { label: 'پوستر عطر هیرو اصلی', url: '/Gemini_Generated_Image_fifj8afifj8afifj.jpg' },
  { label: 'مزارع گل اسطوخودوس و رز', url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80' },
  { label: 'شکوفه‌های بهاری', url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80' },
];

export default function AdminContentTab({
  brandContent,
  onUpdateBrandContent,
  farmBookings,
  careerApplications,
}) {
  const [activeSubTab, setActiveSubTab] = useState('philosophy');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Philosophy Local Form
  const [philForm, setPhilForm] = useState(brandContent.philosophy);
  // Grasse Farms Local Form
  const [grasseForm, setGrasseForm] = useState(brandContent.grasse);
  // Glasscraft Local Form
  const [glassForm, setGlassForm] = useState(brandContent.glasscraft);
  // Eco Local Form
  const [ecoForm, setEcoForm] = useState(brandContent.eco);

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSavePhilosophy = (e) => {
    e.preventDefault();
    onUpdateBrandContent('philosophy', philForm);
    triggerSaveNotification();
  };

  const handleSaveGrasse = (e) => {
    e.preventDefault();
    onUpdateBrandContent('grasse', grasseForm);
    triggerSaveNotification();
  };

  const handleSaveGlass = (e) => {
    e.preventDefault();
    onUpdateBrandContent('glasscraft', glassForm);
    triggerSaveNotification();
  };

  const handleSaveEco = (e) => {
    e.preventDefault();
    onUpdateBrandContent('eco', ecoForm);
    triggerSaveNotification();
  };

  return (
    <div className="admin-content-container">
      {/* Sub-tabs header */}
      <div className="content-subtabs-nav">
        <button
          type="button"
          className={`subtab-btn ${activeSubTab === 'philosophy' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('philosophy')}
        >
          <Sparkles size={16} />
          <span>فلسفه برند آنتی</span>
        </button>

        <button
          type="button"
          className={`subtab-btn ${activeSubTab === 'grasse' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('grasse')}
        >
          <Flower2 size={16} />
          <span>مزارع گل گراس و زاگرس</span>
        </button>

        <button
          type="button"
          className={`subtab-btn ${activeSubTab === 'glasscraft' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('glasscraft')}
        >
          <Gem size={16} />
          <span>هنر شیشه‌گری دست‌ساز</span>
        </button>

        <button
          type="button"
          className={`subtab-btn ${activeSubTab === 'eco' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('eco')}
        >
          <Leaf size={16} />
          <span>مسئولیت زیست‌محیطی</span>
        </button>

        <button
          type="button"
          className={`subtab-btn ${activeSubTab === 'inbox' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('inbox')}
        >
          <Users size={16} />
          <span>درخواست‌های همکاری و رزروها ({farmBookings.length + careerApplications.length})</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="save-success-alert">
          <Check size={18} />
          <span>تغییرات با موفقیت ذخیره شدند و بلافاصله در وب‌سایت اعمال گردیدند.</span>
        </div>
      )}

      {/* 1. Philosophy Form */}
      {activeSubTab === 'philosophy' && (
        <form onSubmit={handleSavePhilosophy} className="content-edit-card">
          <div className="content-card-intro">
            <h4 className="content-section-title">تنظیمات مودال «فلسفه برند آنتی»</h4>
            <p className="content-section-desc">
              تصویر هیرو، بج بالا، عنوان اصلی، متن لید و چهار رکن بنیادین برند را ویرایش کنید.
            </p>
          </div>

          <div className="form-field">
            <label className="form-label">تصویر هیرو مانیفست فلسفه برند</label>
            <div className="preset-images-strip">
              {PRESET_BANNER_IMAGES.map((imgItem, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`preset-thumb-btn ${philForm.heroImage === imgItem.url ? 'active' : ''}`}
                  onClick={() => setPhilForm({ ...philForm, heroImage: imgItem.url })}
                >
                  <img src={imgItem.url} alt={imgItem.label} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
            <input
              type="text"
              className="form-input dir-ltr mt-2"
              value={philForm.heroImage}
              onChange={(e) => setPhilForm({ ...philForm, heroImage: e.target.value })}
            />
          </div>

          <div className="form-grid-2cols">
            <div className="form-field">
              <label className="form-label">متن بج بالای هیرو</label>
              <input
                type="text"
                className="form-input"
                value={philForm.badge}
                onChange={(e) => setPhilForm({ ...philForm, badge: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label className="form-label">عنوان مانیفست</label>
              <input
                type="text"
                className="form-input"
                value={philForm.title}
                onChange={(e) => setPhilForm({ ...philForm, title: e.target.value })}
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">متن لید و مقدمه فلسفه</label>
            <textarea
              className="form-textarea"
              rows="3"
              value={philForm.lead}
              onChange={(e) => setPhilForm({ ...philForm, lead: e.target.value })}
            />
          </div>

          <div className="form-section-divider">ارکان چهارگانه فلسفه برند</div>

          <div className="form-grid-2cols">
            <div className="pillar-edit-box">
              <input
                type="text"
                className="form-input mb-2"
                value={philForm.pillar1Title}
                onChange={(e) => setPhilForm({ ...philForm, pillar1Title: e.target.value })}
              />
              <textarea
                className="form-textarea"
                rows="2"
                value={philForm.pillar1Desc}
                onChange={(e) => setPhilForm({ ...philForm, pillar1Desc: e.target.value })}
              />
            </div>

            <div className="pillar-edit-box">
              <input
                type="text"
                className="form-input mb-2"
                value={philForm.pillar2Title}
                onChange={(e) => setPhilForm({ ...philForm, pillar2Title: e.target.value })}
              />
              <textarea
                className="form-textarea"
                rows="2"
                value={philForm.pillar2Desc}
                onChange={(e) => setPhilForm({ ...philForm, pillar2Desc: e.target.value })}
              />
            </div>

            <div className="pillar-edit-box">
              <input
                type="text"
                className="form-input mb-2"
                value={philForm.pillar3Title}
                onChange={(e) => setPhilForm({ ...philForm, pillar3Title: e.target.value })}
              />
              <textarea
                className="form-textarea"
                rows="2"
                value={philForm.pillar3Desc}
                onChange={(e) => setPhilForm({ ...philForm, pillar3Desc: e.target.value })}
              />
            </div>

            <div className="pillar-edit-box">
              <input
                type="text"
                className="form-input mb-2"
                value={philForm.pillar4Title}
                onChange={(e) => setPhilForm({ ...philForm, pillar4Title: e.target.value })}
              />
              <textarea
                className="form-textarea"
                rows="2"
                value={philForm.pillar4Desc}
                onChange={(e) => setPhilForm({ ...philForm, pillar4Desc: e.target.value })}
              />
            </div>
          </div>

          <div className="content-form-footer">
            <button type="submit" className="admin-btn-primary">
              <Save size={18} />
              <span>ذخیره تغییرات مانیفست فلسفه</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. Grasse & Zagros Farms Form */}
      {activeSubTab === 'grasse' && (
        <form onSubmit={handleSaveGrasse} className="content-edit-card">
          <div className="content-card-intro">
            <h4 className="content-section-title">تنظیمات مودال «مزارع گل گراس و زاگرس»</h4>
            <p className="content-section-desc">
              تغییر عکس هیرو، موقعیت جغرافیایی، متن داستان تقطیر گل رز سنتیفولیا و آمارهای زراعی.
            </p>
          </div>

          <div className="form-field">
            <label className="form-label">تصویر هیرو مزارع گل</label>
            <div className="preset-images-strip">
              {PRESET_BANNER_IMAGES.map((imgItem, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`preset-thumb-btn ${grasseForm.heroImage === imgItem.url ? 'active' : ''}`}
                  onClick={() => setGrasseForm({ ...grasseForm, heroImage: imgItem.url })}
                >
                  <img src={imgItem.url} alt={imgItem.label} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
            <input
              type="text"
              className="form-input dir-ltr mt-2"
              value={grasseForm.heroImage}
              onChange={(e) => setGrasseForm({ ...grasseForm, heroImage: e.target.value })}
            />
          </div>

          <div className="form-grid-2cols">
            <div className="form-field">
              <label className="form-label">نشان موقعیت جغرافیایی</label>
              <input
                type="text"
                className="form-input"
                value={grasseForm.locationBadge}
                onChange={(e) => setGrasseForm({ ...grasseForm, locationBadge: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label className="form-label">عنوان اصلی پنجره مزارع</label>
              <input
                type="text"
                className="form-input"
                value={grasseForm.title}
                onChange={(e) => setGrasseForm({ ...grasseForm, title: e.target.value })}
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">متن مقدمه (Lead)</label>
            <textarea
              className="form-textarea"
              rows="2"
              value={grasseForm.lead}
              onChange={(e) => setGrasseForm({ ...grasseForm, lead: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">روایت کامل گل‌های رز سنتیفولیا و زاگرس</label>
            <textarea
              className="form-textarea"
              rows="4"
              value={grasseForm.description}
              onChange={(e) => setGrasseForm({ ...grasseForm, description: e.target.value })}
            />
          </div>

          <div className="form-section-divider">آمارهای اختصاصی مزارع</div>
          <div className="form-grid-2cols">
            <div className="form-field">
              <label className="form-label">آمار ۱: وسعت مزارع</label>
              <input
                type="text"
                className="form-input"
                value={grasseForm.farmStat1Num}
                onChange={(e) => setGrasseForm({ ...grasseForm, farmStat1Num: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label className="form-label">آمار ۲: گلبرگ برای هر لیتر</label>
              <input
                type="text"
                className="form-input"
                value={grasseForm.farmStat2Num}
                onChange={(e) => setGrasseForm({ ...grasseForm, farmStat2Num: e.target.value })}
              />
            </div>
          </div>

          <div className="content-form-footer">
            <button type="submit" className="admin-btn-primary">
              <Save size={18} />
              <span>ذخیره تغییرات مزارع گل</span>
            </button>
          </div>
        </form>
      )}

      {/* 3. Glasscraft Form */}
      {activeSubTab === 'glasscraft' && (
        <form onSubmit={handleSaveGlass} className="content-edit-card">
          <div className="content-card-intro">
            <h4 className="content-section-title">تنظیمات «هنر شیشه‌گری دست‌ساز»</h4>
            <p className="content-section-desc">
              تغییر مشخصات بطری کریستالی، تصویر هیرو و عیار آبکاری گردن بطری.
            </p>
          </div>

          <div className="form-field">
            <label className="form-label">تصویر هیرو بلورسازی</label>
            <input
              type="text"
              className="form-input dir-ltr"
              value={glassForm.heroImage}
              onChange={(e) => setGlassForm({ ...glassForm, heroImage: e.target.value })}
            />
          </div>

          <div className="form-grid-2cols">
            <div className="form-field">
              <label className="form-label">عنوان اصلی پنجره</label>
              <input
                type="text"
                className="form-input"
                value={glassForm.title}
                onChange={(e) => setGlassForm({ ...glassForm, title: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label className="form-label">وزن خالص کریستال</label>
              <input
                type="text"
                className="form-input"
                value={glassForm.weight}
                onChange={(e) => setGlassForm({ ...glassForm, weight: e.target.value })}
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">متن لید شیشه‌گری</label>
            <textarea
              className="form-textarea"
              rows="3"
              value={glassForm.lead}
              onChange={(e) => setGlassForm({ ...glassForm, lead: e.target.value })}
            />
          </div>

          <div className="content-form-footer">
            <button type="submit" className="admin-btn-primary">
              <Save size={18} />
              <span>ذخیره هنر شیشه‌گری</span>
            </button>
          </div>
        </form>
      )}

      {/* 4. Eco Form */}
      {activeSubTab === 'eco' && (
        <form onSubmit={handleSaveEco} className="content-edit-card">
          <div className="content-card-intro">
            <h4 className="content-section-title">تنظیمات «مسئولیت زیست‌محیطی»</h4>
            <p className="content-section-desc">
              ویرایش بیانیه پایداری و درصد بازچرخانی آب در کارگاه‌های تقطیر.
            </p>
          </div>

          <div className="form-field">
            <label className="form-label">تصویر هیرو محیط‌زیست</label>
            <input
              type="text"
              className="form-input dir-ltr"
              value={ecoForm.heroImage}
              onChange={(e) => setEcoForm({ ...ecoForm, heroImage: e.target.value })}
            />
          </div>

          <div className="form-grid-2cols">
            <div className="form-field">
              <label className="form-label">عنوان بیانیه</label>
              <input
                type="text"
                className="form-input"
                value={ecoForm.title}
                onChange={(e) => setEcoForm({ ...ecoForm, title: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label className="form-label">درصد بازچرخانی</label>
              <input
                type="text"
                className="form-input"
                value={ecoForm.recycleStat}
                onChange={(e) => setEcoForm({ ...ecoForm, recycleStat: e.target.value })}
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">متن لید بیانیه پایداری</label>
            <textarea
              className="form-textarea"
              rows="3"
              value={ecoForm.lead}
              onChange={(e) => setEcoForm({ ...ecoForm, lead: e.target.value })}
            />
          </div>

          <div className="content-form-footer">
            <button type="submit" className="admin-btn-primary">
              <Save size={18} />
              <span>ذخیره بیانیه محیط‌زیست</span>
            </button>
          </div>
        </form>
      )}

      {/* 5. Received Bookings & Job Applications Inbox */}
      {activeSubTab === 'inbox' && (
        <div className="inbox-tables-wrap">
          {/* Farm Bookings */}
          <div className="inbox-section-card mb-6">
            <div className="inbox-header">
              <Calendar size={18} />
              <h4>درخواست‌های رزرو تور اختصاصی مزارع گراس و زاگرس</h4>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>نام و نام خانوادگی</th>
                  <th>شماره تماس</th>
                  <th>تاریخ درخواست</th>
                  <th>وضعیت هماهنگی</th>
                </tr>
              </thead>
              <tbody>
                {farmBookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.name}</td>
                    <td className="dir-ltr text-right">{b.phone}</td>
                    <td>{b.date}</td>
                    <td>
                      <span className="cat-pill-badge">{b.status || 'در حال بررسی'}</span>
                    </td>
                  </tr>
                ))}
                {farmBookings.length === 0 && (
                  <tr>
                    <td colSpan="4" className="empty-table-cell">
                      هنوز درخواست رزرو توری ثبت نشده است.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Career Applications */}
          <div className="inbox-section-card">
            <div className="inbox-header">
              <Briefcase size={18} />
              <h4>درخواست‌های همکاری و رزومه‌های دریافتی</h4>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>متقاضی</th>
                  <th>اطلاعات تماس</th>
                  <th>جایگاه شغلی انتخابی</th>
                  <th>خلاصه رزومه و پیام</th>
                  <th>تاریخ ارسال</th>
                </tr>
              </thead>
              <tbody>
                {careerApplications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <strong>{app.fullName}</strong>
                    </td>
                    <td>
                      <div className="dir-ltr text-right">
                        <div>{app.mobile}</div>
                        <small className="text-muted">{app.email}</small>
                      </div>
                    </td>
                    <td>
                      <span className="cat-pill-badge">{app.role}</span>
                    </td>
                    <td style={{ maxWidth: '280px' }}>{app.message}</td>
                    <td>{app.date}</td>
                  </tr>
                ))}
                {careerApplications.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-table-cell">
                      هنوز رزومه‌ای ثبت نشده است.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
