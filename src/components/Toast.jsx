import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, Sparkles, X, LogOut } from 'lucide-react';
import './Toast.css';

export default function Toast({ toast, message, position = 'bottom', onClose }) {
  // Support both string or object toast data
  const toastData = typeof toast === 'object' && toast !== null ? toast : null;
  const rawMessage = toastData?.message || message || (typeof toast === 'string' ? toast : '');
  const activePosition = toastData?.position || position || 'bottom';
  const title = toastData?.title || 'عملیات با موفقیت انجام شد';
  const isCenter = activePosition === 'center';
  const isLogout = toastData?.type === 'logout';

  useEffect(() => {
    if (!rawMessage) return;
    const duration = isCenter ? 3500 : 3000;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [rawMessage, isCenter, onClose]);

  if (!rawMessage) return null;

  if (isCenter) {
    return (
      <div className="toast-center-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <div className="toast-center-card" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="toast-center-close"
            onClick={onClose}
            aria-label="بستن پیام"
          >
            <X size={16} />
          </button>
          <div className={`toast-center-icon-glow ${isLogout ? 'logout-glow' : ''}`}>
            {isLogout ? <LogOut size={30} /> : <CheckCircle2 size={32} />}
          </div>
          <div className="toast-center-body">
            <h4 className="toast-center-title">{title}</h4>
            <p className="toast-center-text">{rawMessage}</p>
          </div>
          <button
            type="button"
            className="toast-center-action-btn"
            onClick={onClose}
          >
            <Sparkles size={15} />
            <span>متوجه شدم</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-pill">
        <div className="toast-icon-box">
          <ShoppingBag size={16} />
        </div>
        <span className="toast-message">{rawMessage}</span>
        <CheckCircle2 size={16} className="toast-check" />
      </div>
    </div>
  );
}

