import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  Plus,
  Edit3,
  Trash2,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Search,
  Tag
} from 'lucide-react';

export default function AdminFaqTab({ faqs, onAddFaq, onUpdateFaq, onDeleteFaq }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [previewOpenId, setPreviewOpenId] = useState(faqs[0]?.id || null);

  const initialForm = {
    question: '',
    answer: '',
    category: 'ارسال و تحویل',
  };
  const [formData, setFormData] = useState(initialForm);

  const categories = ['ارسال و تحویل', 'اصالت و گارانتی', 'کیفیت رایحه', 'بسته‌بندی لوکس', 'مشاوره و خرید'];

  const filteredFaqs = faqs.filter((item) => {
    return (
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'ارسال و تحویل',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    if (editingFaq) {
      onUpdateFaq(editingFaq.id, {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category.trim(),
      });
    } else {
      onAddFaq({
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category.trim(),
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    onDeleteFaq(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="admin-faq-container">
      {/* Controls Bar */}
      <div className="products-controls-bar">
        <div className="admin-search-box">
          <Search size={18} className="search-box-icon" />
          <input
            type="text"
            placeholder="جستجو در متن سوالات یا پاسخ‌ها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <button type="button" className="admin-btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} />
          <span>افزودن سوال متداول جدید</span>
        </button>
      </div>

      {/* FAQ Management Grid */}
      <div className="faq-admin-grid">
        {/* Left/Main Column: Items List */}
        <div className="faq-list-column">
          {filteredFaqs.map((faq, index) => {
            const isPreviewing = previewOpenId === faq.id;
            return (
              <div key={faq.id} className="admin-faq-card">
                <div className="faq-card-header">
                  <div className="faq-card-meta">
                    <span className="faq-idx-badge">{index + 1}</span>
                    <span className="cat-pill-badge">{faq.category}</span>
                  </div>

                  <div className="row-actions-group">
                    <button
                      type="button"
                      className="action-icon-btn edit-btn"
                      onClick={() => handleOpenEdit(faq)}
                      title="ویرایش سوال"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      className="action-icon-btn delete-btn"
                      onClick={() => setDeleteConfirmId(faq.id)}
                      title="حذف سوال"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <h4 className="faq-card-question">{faq.question}</h4>
                <p className="faq-card-answer">{faq.answer}</p>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="empty-faq-state">
              <HelpCircle size={36} className="empty-icon" />
              <p>هیچ سوال متداولی یافت نشد. می‌توانید با دکمه بالا یک سوال جدید اضافه کنید.</p>
            </div>
          )}
        </div>

        {/* Right Column: Live Storefront Preview */}
        <div className="faq-preview-column">
          <div className="preview-sticky-card">
            <div className="preview-header">
              <span className="preview-indicator-dot" />
              <strong>پیش‌نمایش زنده در وب‌سایت</strong>
            </div>
            <p className="preview-help-text">
              سوالات اضافه یا حذف شده فوراً در بخش آکاردئون صفحه اصلی فروشگاه ظاهر می‌شوند.
            </p>

            <div className="mini-faq-accordion">
              {filteredFaqs.slice(0, 4).map((faq) => {
                const isOpen = previewOpenId === faq.id;
                return (
                  <div key={faq.id} className="mini-faq-item">
                    <button
                      type="button"
                      className="mini-faq-btn"
                      onClick={() => setPreviewOpenId(isOpen ? null : faq.id)}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={14}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s',
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div className="mini-faq-body">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
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
              <h4 className="confirm-title">حذف سوال متداول</h4>
              <p className="confirm-desc">
                آیا از حذف این پرسش و پاسخ از وب‌سایت اطمینان دارید؟
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

      {/* Add / Edit FAQ Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className="product-form-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
            >
              <div className="form-modal-header">
                <div className="header-title-flex">
                  <div className="header-badge-icon">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <h3 className="form-modal-title">
                      {editingFaq ? 'ویرایش سوال متداول' : 'افزودن سوال متداول جدید'}
                    </h3>
                    <p className="form-modal-sub">
                      در بخش سوالات متداول صفحه اصلی نمایش داده خواهد شد.
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
                <div className="form-field">
                  <label className="form-label">دسته‌بندی پرسش *</label>
                  <select
                    className="form-input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">متن پرسش *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="مثال: نحوه ارسال سفارش‌ها و ضمانت بازگشت چگونه است؟"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">متن پاسخ کامل *</label>
                  <textarea
                    className="form-textarea"
                    rows="5"
                    placeholder="توضیحات شفاف و محترمانه راجع به فرآیند..."
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    required
                  />
                </div>

                <div className="form-modal-footer">
                  <button type="submit" className="admin-btn-primary">
                    <Check size={18} />
                    <span>{editingFaq ? 'ذخیره تغییرات سوال' : 'انتشار سوال جدید'}</span>
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
