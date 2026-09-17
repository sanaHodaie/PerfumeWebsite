import { supabase } from './supabase';

/* =========================================================
   تبدیل محصول دیتابیس → ساختار مورد استفاده React
========================================================= */

function mapProduct(product) {
  return {
    id: product.id,

    name: product.name,

    englishName: product.english_name,

    description: product.description || '',

    price: Number(product.price || 0),

    priceFormatted:
      Number(product.price || 0).toLocaleString('fa-IR') + ' تومان',

    volume: product.volume || '',

    category: product.category || '',

    /* ⭐ نکات عطر */
    notes: {
      top: product.top_notes || '',
      heart: product.heart_notes || '',
      base: product.base_notes || '',
    },

    rating: Number(product.rating || 0),

    reviewsCount: Number(product.reviews_count || 0),

    isBestSeller: Boolean(product.is_best_seller),

    isActive: Boolean(product.is_active),

    image: product.image_url || '',
  };
}


/* =========================================================
   دریافت همه محصولات برای پنل ادمین
========================================================= */

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('❌ Supabase all products error:', error);
    throw error;
  }

  return data.map(mapProduct);
}


/* =========================================================
   دریافت محصولات فعال برای سایت
========================================================= */

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: true });

  if (error) {
    console.error('❌ Supabase products error:', error);
    throw error;
  }

  return data.map(mapProduct);
}


/* =========================================================
   ایجاد محصول جدید
========================================================= */

export async function createProduct(product) {
  console.log('🟡 createProduct - ارسال به Supabase:', product);

  const insertData = {
    name: product.name,

    english_name: product.englishName,

    description: product.description || '',

    price: Number(product.price || 0),

    volume: product.volume || '',

    category: product.category || '',

    rating: Number(product.rating || 5),

    reviews_count: Number(product.reviewsCount || 0),

    is_best_seller: Boolean(product.isBestSeller),

    is_active: product.isActive !== false,

    image_url: product.image || '',

    /* ⭐⭐⭐ نکات عطر */
    top_notes: product.notes?.top || '',

    heart_notes: product.notes?.heart || '',

    base_notes: product.notes?.base || '',
  };

  console.log('📦 داده‌ای که قرار است INSERT شود:', insertData);

  const { data, error } = await supabase
    .from('products')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('❌ Supabase create product error:', error);
    console.error('🔍 message:', error.message);
    console.error('🔍 details:', error.details);
    console.error('🔍 hint:', error.hint);
    console.error('🔍 code:', error.code);

    throw error;
  }

  console.log('🟢 محصول واقعاً در Supabase ساخته شد:', data);

  return mapProduct(data);
}


/* =========================================================
   ویرایش محصول
========================================================= */

export async function updateProduct(productId, updatedFields) {
  const updateData = {};

  if (updatedFields.name !== undefined) {
    updateData.name = updatedFields.name;
  }

  if (updatedFields.englishName !== undefined) {
    updateData.english_name = updatedFields.englishName;
  }

  if (updatedFields.description !== undefined) {
    updateData.description = updatedFields.description;
  }

  if (updatedFields.price !== undefined) {
    updateData.price = Number(updatedFields.price);
  }

  if (updatedFields.volume !== undefined) {
    updateData.volume = updatedFields.volume;
  }

  if (updatedFields.category !== undefined) {
    updateData.category = updatedFields.category;
  }

  if (updatedFields.rating !== undefined) {
    updateData.rating = Number(updatedFields.rating);
  }

  if (updatedFields.reviewsCount !== undefined) {
    updateData.reviews_count = Number(updatedFields.reviewsCount);
  }

  if (updatedFields.isBestSeller !== undefined) {
    updateData.is_best_seller = Boolean(updatedFields.isBestSeller);
  }

  if (updatedFields.isActive !== undefined) {
    updateData.is_active = Boolean(updatedFields.isActive);
  }

  if (updatedFields.image !== undefined) {
    updateData.image_url = updatedFields.image;
  }

  /* ⭐⭐⭐ ویرایش نت‌های عطر */
  if (updatedFields.notes !== undefined) {
    updateData.top_notes = updatedFields.notes?.top || '';

    updateData.heart_notes = updatedFields.notes?.heart || '';

    updateData.base_notes = updatedFields.notes?.base || '';
  }

  console.log('📦 داده UPDATE:', updateData);

  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    console.error('❌ Supabase update product error:', error);
    console.error('🔍 message:', error.message);
    console.error('🔍 details:', error.details);
    console.error('🔍 hint:', error.hint);
    console.error('🔍 code:', error.code);

    throw error;
  }

  console.log('🟢 محصول در Supabase آپدیت شد:', data);

  return mapProduct(data);
}


/* =========================================================
   حذف محصول
========================================================= */

export async function deleteProduct(productId) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    console.error('❌ Supabase delete product error:', error);
    throw error;
  }

  console.log('🗑️ محصول حذف شد:', productId);

  return true;
}