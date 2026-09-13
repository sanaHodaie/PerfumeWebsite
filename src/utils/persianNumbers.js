// src/utils/persianNumbers.js
/**
 * Utility functions for Persian number conversion and price formatting.
 */

export function toPersianDigits(value) {
  if (value === null || value === undefined) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(value).replace(/[0-9]/g, (char) => persianDigits[+char]);
}

export function formatPersianNumber(value) {
  if (value === null || value === undefined || value === '') return '۰';
  const num = Number(value);
  if (isNaN(num)) return toPersianDigits(value);
  return toPersianDigits(num.toLocaleString('en-US'));
}

export function formatPersianPrice(amount) {
  if (amount === null || amount === undefined || amount === '') return '۰ تومان';
  const num = Number(amount);
  if (isNaN(num)) return toPersianDigits(amount) + ' تومان';
  return toPersianDigits(num.toLocaleString('en-US')) + ' تومان';
}
