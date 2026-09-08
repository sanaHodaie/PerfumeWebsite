import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmountFormatted = new Intl.NumberFormat('fa-IR').format(totalAmount) + ' تومان';
  const freeShippingThreshold = 3000000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalAmount);
  const freeShippingProgress = Math.min(100, (totalAmount / freeShippingThreshold) * 100);

  return (
    <div className="cart-drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="cart-header-icon" />
            <h3>سبد خرید شما</h3>
            <span className="cart-count-pill">{cart.reduce((a, b) => a + b.quantity, 0)} عدد</span>
          </div>
          <button type="button" className="cart-close-btn" onClick={onClose} aria-label="بستن سبد خرید">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="cart-shipping-bar-wrapper">
          <div className="shipping-text">
            {remainingForFreeShipping === 0 ? (
              <span className="free-achieved">تبریک! سفارش شما مشمول ارسال رایگان شد.</span>
            ) : (
              <span>
                تنها {new Intl.NumberFormat('fa-IR').format(remainingForFreeShipping)} تومان دیگر تا ارسال رایگان
              </span>
            )}
          </div>
          <div className="shipping-track">
            <div className="shipping-fill" style={{ width: `${freeShippingProgress}%` }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-scroll">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">
                <ShoppingBag size={48} strokeWidth={1} />
              </div>
              <h4>سبد خرید شما خالی است</h4>
              <p>شما هنوز هیچ عطری را به سبد خرید خود اضافه نکرده‌اید.</p>
              <button type="button" className="btn-primary" onClick={onClose}>
                مشاهده عطرها
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-thumb">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <span className="cart-item-vol">{item.volume || '۱۰۰ میلی‌لیتر'}</span>
                  <div className="cart-item-price">
                    {new Intl.NumberFormat('fa-IR').format(item.price * item.quantity)} تومان
                  </div>

                  <div className="cart-qty-row">
                    <div className="qty-controls">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                        aria-label="کاهش تعداد"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-val">{new Intl.NumberFormat('fa-IR').format(item.quantity)}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                        aria-label="افزایش تعداد"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      title="حذف از سبد"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="total-label">مبلغ قابل پرداخت:</span>
              <span className="total-amount">{totalAmountFormatted}</span>
            </div>

            <button
              type="button"
              className="btn-primary checkout-btn"
              onClick={onCheckout}
            >
              <span>تکمیل سفارش و پرداخت</span>
              <ArrowLeft size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
