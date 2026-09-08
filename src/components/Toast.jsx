import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import './Toast.css';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-pill">
        <div className="toast-icon-box">
          <ShoppingBag size={16} />
        </div>
        <span className="toast-message">{message}</span>
        <CheckCircle2 size={16} className="toast-check" />
      </div>
    </div>
  );
}
