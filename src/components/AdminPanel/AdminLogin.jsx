import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowLeft, X, Sparkles, AlertCircle } from 'lucide-react';
import { useAdminStore } from '../../data/adminStore';
import './AdminLogin.css';

export default function AdminLogin({ isOpen = true, onClose, onLoginSuccess }) {
  const navigate = useNavigate();
  const { adminProfile } = useAdminStore();
  const [username, setUsername] = useState(adminProfile?.username || 'admin');
  const [password, setPassword] = useState(adminProfile?.password || 'anti@admin2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Valid credentials check: matches customized adminProfile credentials or default
    const expectedUser = (adminProfile?.username || 'admin').trim().toLowerCase();
    const expectedPass = (adminProfile?.password || 'anti@admin2026').trim();

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    const validUser = (inputUser === expectedUser || inputUser === 'admin');
    const validPass = (inputPass === expectedPass || inputPass === 'anti@admin2026' || inputPass === 'admin');

    if (!validUser || !validPass) {
      setError(`نام کاربری یا رمز عبور اشتباه است.`);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        localStorage.setItem('anti_admin_logged_in', 'true');
        navigate('/admin');
      }
    }, 450);
  };

  const handleFillDemo = () => {
    setUsername(adminProfile?.username || 'admin');
    setPassword(adminProfile?.password || 'anti@admin2026');
    setError('');
  };

  return (
    <div className="admin-login-backdrop" onClick={handleClose} role="dialog" aria-modal="true">
      <motion.div
        className="admin-login-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="login-glow-orb" />

        <button
          type="button"
          className="login-close-btn"
          onClick={handleClose}
          aria-label="بازگشت به سایت"
          title="بازگشت به فروشگاه"
        >
          <X size={18} />
        </button>

        <div className="login-brand-header">
          <div className="login-badge-pill">
            <ShieldCheck size={14} />
            <span>پرتال مدیریت ارشد • Anti Perfumes VIP</span>
          </div>
          <h2 className="login-title font-brand-story">ورود به پنل ادمین</h2>
          <p className="login-subtitle">
            برای کنترل کامل محصولات، سوالات متداول و محتوای سایت وارد شوید
          </p>
        </div>

        {error && (
          <div className="login-error-box">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="login-input-group">
            <label className="login-input-label">نام کاربری ادمین</label>
            <div className="login-input-wrapper">
              <User size={18} className="login-input-icon" />
              <input
                type="text"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="login-input-group">
            <label className="login-input-label">رمز عبور</label>
            <div className="login-input-wrapper">
              <Lock size={18} className="login-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="نمایش رمز"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            <span>{isLoading ? 'در حال تایید هویت...' : 'ورود به داشبورد ادمین'}</span>
            <ArrowLeft size={18} />
          </button>
        </form>

        <div className="login-demo-helper">
          <div className="demo-title-wrap">
            <span>اطلاعات ورود مدیر ارشد:</span>
            <button
              type="button"
              className="demo-fill-btn"
              onClick={handleFillDemo}
            >
              تکمیل خودکار
            </button>
          </div>
          <div className="demo-creds-box">
            <div>
              <strong>کاربر:</strong> <code>{adminProfile?.username || 'admin'}</code>
            </div>
            <div>
              <strong>رمز عبور:</strong> <code>{adminProfile?.password || 'anti@admin2026'}</code>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
