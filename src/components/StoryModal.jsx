import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import './StoryModal.css';

export default function StoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="story-backdrop" onClick={onClose}>
      <div className="story-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="story-close-btn" onClick={onClose} aria-label="بستن پنجره">
          <X size={20} />
        </button>

        <div className="story-content-wrapper">
          <div className="story-video-sim">
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85"
              alt="داستان رایحه لوکس آنتی"
              className="story-backdrop-img"
            />
            <div className="story-overlay" />
            <div className="story-badge">
              <Sparkles size={16} />
              <span>مستند تصویری میراث آنتی • گراس، فرانسه</span>
            </div>
          </div>

          <div className="story-editorial-text">
            <h3 className="story-heading">سمفونی شکوفه‌ها؛ راز ماندگاری عطر «آنتی»</h3>
            <p className="story-paragraph">
              در سحرگاه هر بهار، پیش از طلوع آفتاب سوزان، گلبرگ‌های شبنم‌خورده رز سنتیفولیا با دستان کارآزموده چیده می‌شوند تا طراوت فرار اسانس آنها حفظ شود.
            </p>
            <p className="story-paragraph">
              استادان عطرسازی خانه آنتی، این عصاره گران‌بها را با چوب‌های معطر هندی و رزین‌های خالص کهربا درهم می‌آمیزند تا هر افشانه، تصویری جاودان از شکوهمندی و آرامش را در فضا بیافریند.
            </p>

            <div className="story-features-list">
              <div className="story-feat">
                <Check size={16} className="feat-check" />
                <span>برداشت دستی و ۱۰۰٪ ارگانیک در سپیده‌دم</span>
              </div>
              <div className="story-feat">
                <Check size={16} className="feat-check" />
                <span>تقطیر در دیگ‌های مسی کهن بدون دخالت مواد مصنوعی</span>
              </div>
              <div className="story-feat">
                <Check size={16} className="feat-check" />
                <span>بطری‌های کریستالی با برش‌های الماس‌گون و درب طلایی</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
