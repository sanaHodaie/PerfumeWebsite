import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Sparkles,
  Check,
  X,
  Star,
  AlertTriangle,
  ChevronDown,
  Eye,
  EyeOff,
  Upload,
  AlertCircle
} from 'lucide-react';
import { toPersianDigits, formatPersianPrice } from '../../utils/persianNumbers';

const PRESET_PERFUME_IMAGES = [
  { label: 'بطری کریستالی آنتی', url: '/anti_crystal_parfum.jpg' },
  { label: 'عطر اختصاصی میوز', url: '/anti_muse_perfume.jpg' },
  { label: 'گلبرگ‌های رز صورتی', url: '/pink_rose_petals.jpg' },
  { label: 'شیشه عطر هیرو اصلی', url: '/Gemini_Generated_Image_fifj8afifj8afifj.jpg' },
  { label: 'رز سفید الهام‌بخش', url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80' },
  { label: 'مخمل طلایی اشرافی', url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80' },
  { label: 'وانیل سیاه بوربون', url: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80' },
  { label: 'چرم و کهربا', url: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80' },
  { label: 'نسیم خنک دریایی', url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80' },
];

import './AdminProductsTab.css'

export default function AdminProductsTab({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Form State
  const initialForm = {
    name: '',
    englishName: '',
    category: 'ادو پرفوم زنانه',
    price: 2100000,
    volume: '۱۰۰ میلی‌لیتر',
    rating: 4.9,
    image: PRESET_PERFUME_IMAGES[0].url,
    description: '',
    topNotes: '',
    heartNotes: '',
    baseNotes: '',
    isBestSeller: false,
    isActive: true
  };
  const [formData, setFormData] = useState(initialForm);

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setUploadError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      englishName: product.englishName || '',
      category: product.category || 'ادو پرفوم زنانه',
      price: product.price || 1990000,
      volume: product.volume || '۱۰۰ میلی‌لیتر',
      rating: product.rating || 4.9,
      image: product.image || PRESET_PERFUME_IMAGES[0].url,
      description: product.description || '',
      topNotes: product.notes?.top || '',
      heartNotes: product.notes?.heart || '',
      baseNotes: product.notes?.base || '',
      isBestSeller: Boolean(product.isBestSeller),
      isActive: product.isActive !== undefined ? product.isActive : true
    });
    setUploadError('');
    setIsModalOpen(true);
  };

  // تابع آپلود عکس از سیستم کاربر
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    setUploadError('');

    if (!file) return;

    // چک کردن حجم فایل (حداکثر ۳ مگابایت)
    if (file.size > 3 * 1024 * 1024) {
      setUploadError('حجم تصویر نباید بیشتر از ۳ مگابایت باشد.');
      return;
    }

    // چک کردن نوع فایل
    if (!file.type.startsWith('image/')) {
      setUploadError('لطفاً فقط فایل تصویری انتخاب کنید.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target.result;
      setFormData((prev) => ({ ...prev, image: base64Image }));
    };
    reader.onerror = () => {
      setUploadError('خطا در خواندن فایل. لطفاً دوباره تلاش کنید.');
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const productPayload = {
      name: formData.name.trim(),
      englishName: formData.englishName.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      volume: formData.volume.trim(),
      rating: Number(formData.rating),
      image: formData.image.trim(),
      description: formData.description.trim(),
      notes: {
        top: formData.topNotes.trim(),
        heart: formData.heartNotes.trim(),
        base: formData.baseNotes.trim(),
      },
      isBestSeller: formData.isBestSeller,
      isActive: formData.isActive
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productPayload);
    } else {
      onAddProduct(productPayload);
    }

    setIsModalOpen(false);
    setUploadError('');
  };

  const handleDelete = (id) => {
    onDeleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="admin-products-container">
      {/* Page Section Title Header */}
      <div className="admin-tab-header">
        <div className="tab-title-wrap">
          <h2 className="admin-page-title">مدیریت عطرهای فروشگاه</h2>
          <p className="admin-page-subtitle">فهرست کامل کالاها، ویرایش هرم بویایی، قیمت‌گذاری و وضعیت نمایش</p>
        </div>
      </div>

      {/* Top Header Controls */}
      <div className="products-controls-bar">
        <div className="search-and-filter-wrap">
          {/* Search Box */}
          <div className={`admin-search-box ${isMobileSearchOpen ? 'mobile-expanded' : ''}`}>
            <Search size={18} className="search-box-icon" />
            <input
              type="text"
              placeholder="جستجو در نام عطر، نت‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Styled Custom Select Wrapper */}
          <div className="custom-select-container">
            <select
              className="admin-cat-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">همه دسته‌بندی‌ها ({toPersianDigits(products.length)})</option>
              {categories.filter((c) => c !== 'all').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="select-arrow-icon" />
          </div>
        </div>

        {/* Add Product Button */}
        <button
          type="button"
          className="admin-btn-primary add-product-btn"
          onClick={handleOpenAdd}
        >
          <Plus size={18} />
          <span className="btn-text">افزودن محصول جدید</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="admin-products-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>تصویر و عنوان</th>
              <th>نام انگلیسی</th>
              <th>دسته‌بندی</th>
              <th>وضعیت انتشار</th>
              <th>قیمت (تومان)</th>
              <th>حجم</th>
              <th>امتیاز</th>
              <th>برچسب</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <div className="prod-cell-main">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="prod-thumb"
                      referrerPolicy="no-referrer"
                    />
                    <div className="prod-info-text">
                      <strong className="prod-name-title">{prod.name}</strong>
                      <p className="prod-notes-snippet">
                        {prod.notes?.top ? `نت آغازین: ${prod.notes.top}` : prod.description?.slice(0, 30) + '...'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="dir-ltr text-right">{prod.englishName}</td>
                <td>
                  <span className="cat-pill-badge">{prod.category}</span>
                </td>
                {/* Status Indicator */}
                <td>
                  {prod.isActive !== false ? (
                    <span className="status-badge status-active">
                      <Eye size={13} />
                      <span>فعال</span>
                    </span>
                  ) : (
                    <span className="status-badge status-inactive">
                      <EyeOff size={13} />
                      <span>پیش‌نویس</span>
                    </span>
                  )}
                </td>
                <td>
                  <strong className="price-tag-strong">
                    {formatPersianPrice(prod.price)}
                  </strong>
                </td>
                <td>{toPersianDigits(prod.volume || '۱۰۰ میلی‌لیتر')}</td>
                <td>
                  <div className="rating-cell">
                    <Star size={14} className="star-icon-filled" />
                    <span>{toPersianDigits(prod.rating || '۵.۰')}</span>
                  </div>
                </td>
                <td>
                  {prod.isBestSeller ? (
                    <span className="bestseller-badge-active">
                      <Sparkles size={12} />
                      <span>پرفروش</span>
                    </span>
                  ) : (
                    <span className="bestseller-badge-idle">عادی</span>
                  )}
                </td>
                <td>
                  <div className="row-actions-group">
                    <button
                      type="button"
                      className="action-icon-btn edit-btn"
                      onClick={() => handleOpenEdit(prod)}
                      title="ویرایش محصول"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      type="button"
                      className="action-icon-btn delete-btn"
                      onClick={() => setDeleteConfirmId(prod.id)}
                      title="حذف محصول"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="9" className="empty-table-cell">
                  هیچ محصولی با مشخصات جستجو پیدا نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="admin-modal-backdrop" onClick={() => setDeleteConfirmId(null)}>
            <motion.div
              className="confirm-modal-box"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="confirm-icon-wrap">
                <AlertTriangle size={32} />
              </div>
              <h4 className="confirm-title">آیا از حذف این محصول اطمینان دارید؟</h4>
              <p className="confirm-desc">
                این محصول بلافاصله از ویترین سایت و فهرست خرید کاربران برداشته خواهد شد.
              </p>
              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn-danger-confirm"
                  onClick={() => handleDelete(deleteConfirmId)}
                >
                  بله، حذف کن
                </button>
                <button
                  type="button"
                  className="btn-cancel-confirm"
                  onClick={() => setDeleteConfirmId(null)}
                >
                  انصراف
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className="product-form-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-modal-header">
                <div className="header-title-flex">
                  <div className="header-badge-icon">
                    {editingProduct ? <Edit3 size={18} /> : <Plus size={18} />}
                  </div>
                  <div>
                    <h3 className="form-modal-title">
                      {editingProduct ? `ویرایش عطر: ${editingProduct.name}` : 'افزودن عطر جدید به کالکشن'}
                    </h3>
                    <p className="form-modal-sub">
                      تمام اطلاعات به صورت آنی در فروشگاه اعمال خواهند شد.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="close-form-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="product-modal-form">
                <div className="form-grid-2cols">
                  {/* Persian Name */}
                  <div className="form-field">
                    <label className="form-label">نام فارسی عطر *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="مثال: نسیم یاسمن"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* English Name */}
                  <div className="form-field">
                    <label className="form-label">نام فرانسوی / انگلیسی *</label>
                    <input
                      type="text"
                      className="form-input dir-ltr"
                      placeholder="e.g. Jasmin Divine"
                      value={formData.englishName}
                      onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="form-field">
                    <label className="form-label">دسته‌بندی عطر *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="مثال: ادو پرفوم زنانه"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>

                  {/* Price */}
                  <div className="form-field">
                    <label className="form-label">قیمت (به تومان) *</label>
                    <input
                      type="number"
                      step="10000"
                      className="form-input"
                      placeholder="مثال: 2200000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  {/* Volume */}
                  <div className="form-field">
                    <label className="form-label">حجم شیشه</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="مثال: ۱۰۰ میلی‌لیتر"
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    />
                  </div>

                  {/* Rating */}
                  <div className="form-field">
                    <label className="form-label">امتیاز کیفی (از ۵)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      className="form-input"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    />
                  </div>
                </div>

                {/* Fragrance Notes */}
                <div className="form-section-divider">هرم بویایی و نت‌های رایحه</div>
                <div className="form-grid-3cols">
                  <div className="form-field">
                    <label className="form-label">نت آغازین (Top Notes)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="ترنج، فلفل صورتی..."
                      value={formData.topNotes}
                      onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">نت میانی (Heart Notes)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="رز سنتیفولیا، یاس رازقی..."
                      value={formData.heartNotes}
                      onChange={(e) => setFormData({ ...formData, heartNotes: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">نت پایانی (Base Notes)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="چوب صندل، عود، مشک..."
                      value={formData.baseNotes}
                      onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="form-field">
                  <label className="form-label">توضیحات و قصه رایحه *</label>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    placeholder="روایتی شاعرانه از حس و ماندگاری عطر..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                {/* Image Selection - With Upload from System */}
                <div className="form-field">
                  <label className="form-label">انتخاب یا آپلود تصویر بطری عطر</label>

                  {/* پیش‌نمایش تصویر انتخاب شده */}
                  <div className="product-image-preview-box">
                    <img
                      src={formData.image}
                      alt="پیش‌نمایش عطر"
                      className="product-image-preview"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* دکمه آپلود از سیستم */}
                  <div className="image-upload-row">
                    <label className="image-upload-btn" title="انتخاب عکس از سیستم">
                      <Upload size={16} />
                      <span>آپلود عکس از سیستم</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden-file-input"
                        onChange={handleImageFileUpload}
                      />
                    </label>

                    {formData.image?.startsWith('data:') && (
                      <button
                        type="button"
                        className="clear-uploaded-image-btn"
                        onClick={() => setFormData({ ...formData, image: PRESET_PERFUME_IMAGES[0].url })}
                        title="حذف عکس آپلود شده"
                      >
                        <X size={14} />
                        <span>حذف عکس آپلود شده</span>
                      </button>
                    )}
                  </div>

                  {uploadError && (
                    <div className="upload-error-msg">
                      <AlertCircle size={14} />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {/* انتخاب از گالری آماده */}
                  <span className="field-hint" style={{ marginTop: '10px', display: 'block' }}>
                    یا از میان تصاویر آماده زیر انتخاب کنید:
                  </span>
                  <div className="preset-images-strip">
                    {PRESET_PERFUME_IMAGES.map((imgItem, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`preset-thumb-btn ${formData.image === imgItem.url ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, image: imgItem.url })}
                        title={imgItem.label}
                      >
                        <img src={imgItem.url} alt={imgItem.label} referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>

                  {/* آدرس URL دستی */}
                  <input
                    type="text"
                    className="form-input dir-ltr mt-2"
                    placeholder="یا آدرس URL تصویر را وارد کنید..."
                    value={formData.image.startsWith('data:') ? '— عکس آپلود شده از سیستم —' : formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    disabled={formData.image.startsWith('data:')}
                  />
                </div>

                {/* Toggles */}
                <div className="form-checkboxes-group">
                  <label className="checkbox-custom-label">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    />
                    <span className="checkbox-text">این محصول را به عنوان «پرفروش‌ترین» برجسته کن</span>
                  </label>

                  <label className="checkbox-custom-label">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <span className="checkbox-text">محصول فعال باشد (قابل مشاهده در ویترین فروشگاه)</span>
                  </label>
                </div>

                {/* Form Footer Actions */}
                <div className="form-modal-footer">
                  <button type="submit" className="admin-btn-primary">
                    <Check size={18} />
                    <span>{editingProduct ? 'ذخیره تغییرات محصول' : 'انتشار محصول جدید'}</span>
                  </button>
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    انصراف
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}