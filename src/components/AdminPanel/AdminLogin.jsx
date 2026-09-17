import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  X,
  AlertCircle,
} from 'lucide-react';

import { supabase } from '../../lib/supabase';
import { isAdminUser } from '../../lib/adminAuth';

import './AdminLogin.css';

export default function AdminLogin({
  isOpen = true,
  onClose,
  onLoginSuccess,
}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setError('');

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError('ایمیل و رمز عبور را وارد کنید.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔐 تلاش برای ورود Admin با Supabase Auth...');

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (loginError) {
        console.error('❌ خطای ورود Admin:', loginError);

        setError('ایمیل یا رمز عبور صحیح نیست.');
        return;
      }

      const user = data?.user;

      if (!user) {
        console.error('❌ بعد از ورود User پیدا نشد.');

        setError('ورود انجام نشد. لطفاً دوباره تلاش کنید.');
        return;
      }

      console.log('🟢 ورود موفق Supabase Auth');
      console.log('👤 User ID:', user.id);
      console.log('📧 Email:', user.email);

      /*
       * بررسی اینکه این حساب، حساب Admin موردنظر است.
       *
       * توجه:
       * این فقط کنترل سمت UI است.
       * مرحله بعد، RLS در Supabase دسترسی واقعی به دیتابیس را محدود می‌کند.
       */
      if (!isAdminUser(user)) {
        console.warn(
          '🚨 این حساب Admin مجاز نیست:',
          user.id
        );

        await supabase.auth.signOut();

        setError(
          'این حساب دسترسی به پنل مدیریت ندارد.'
        );

        return;
      }

      console.log('👑 Admin تأیید شد.');

      if (onLoginSuccess) {
        onLoginSuccess(user);
      } else {
        navigate('/admin');
      }
    } catch (err) {
      console.error(
        '❌ خطای غیرمنتظره در Login:',
        err
      );

      setError(
        'خطایی هنگام ورود رخ داد. دوباره تلاش کنید.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="admin-login-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="admin-login-card"
        onClick={(e) => e.stopPropagation()}
        initial={{
          opacity: 0,
          scale: 0.94,
          y: 25,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.94,
          y: 15,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
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

            <span>
              پرتال مدیریت ارشد • Anti Perfumes VIP
            </span>
          </div>

          <h2 className="login-title font-brand-story">
            ورود به پنل ادمین
          </h2>

          <p className="login-subtitle">
            برای کنترل کامل محصولات، سوالات متداول و محتوای سایت
            وارد شوید
          </p>
        </div>

        {error && (
          <div className="login-error-box">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="admin-login-form"
        >
          <div className="login-input-group">
            <label className="login-input-label">
              ایمیل مدیر
            </label>

            <div className="login-input-wrapper">
              <Mail
                size={18}
                className="login-input-icon"
              />

              <input
                type="email"
                className="login-input"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="admin@example.com"
                required
                autoFocus
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login-input-group">
            <label className="login-input-label">
              رمز عبور
            </label>

            <div className="login-input-wrapper">
              <Lock
                size={18}
                className="login-input-icon"
              />

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                className="login-input"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />

              <button
                type="button"
                className="login-eye-btn"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showPassword
                    ? 'مخفی کردن رمز'
                    : 'نمایش رمز'
                }
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            <span>
              {isLoading
                ? 'در حال تایید هویت...'
                : 'ورود به داشبورد ادمین'}
            </span>

            <ArrowLeft size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}