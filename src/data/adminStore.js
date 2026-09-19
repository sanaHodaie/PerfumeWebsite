import { useState, useEffect } from 'react';

import {
  PRODUCTS as INITIAL_PRODUCTS,
} from './products';
import {
  getAllProducts,
  createProduct,
  updateProduct as updateProductInSupabase,
  deleteProduct as deleteProductFromSupabase,

  getAllFaqs,
  createFaq,
  updateFaq as updateFaqInSupabase,
  deleteFaq as deleteFaqFromSupabase,
} from '../lib/productsApi';


// ============================================================
// Global State
// ============================================================

let globalListeners = [];
let cachedState = null;
let productsLoadPromise = null;
let faqsLoadPromise = null;


// ============================================================
// LocalStorage Keys
// ============================================================

const STORAGE_KEYS = {
  PRODUCTS: 'anti_admin_products_v1',
  BRAND_CONTENT: 'anti_admin_brand_content_v1',
  CONTACT_INFO: 'anti_admin_contact_info_v1',
  ADMIN_PROFILE: 'anti_admin_profile_v1',
  COUPONS: 'anti_admin_coupons_v1',
};


// ============================================================
// Default Data
// ============================================================

const INITIAL_BRAND_CONTENT = {
  hero: {
    title: 'عطر خود را پیدا کنید',
    subtitle: 'تجربه‌ای متفاوت از دنیای عطر و رایحه',
  },

  about: {
    title: 'درباره ما',
    description: '',
  },

  footer: {
    description: '',
  },
};


const INITIAL_CONTACT_INFO = {
  phone: '',
  email: '',
  address: '',
  instagram: '',
  telegram: '',
};


const INITIAL_ADMIN_PROFILE = {
  name: 'مدیر فروشگاه',
  email: '',
};


const INITIAL_COUPONS = [];


// ============================================================
// LocalStorage Helpers
// ============================================================

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('❌ خطا در ذخیره LocalStorage:', error);
  }
};


const loadFromLocalStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return fallback;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error(`❌ خطا در خواندن ${key} از LocalStorage:`, error);

    return fallback;
  }
};


// ============================================================
// Notify Global Listeners
// ============================================================

const notifyListeners = () => {
  if (!cachedState) {
    return;
  }

  globalListeners.forEach((listener) => {
    listener(cachedState);
  });
};


// ============================================================
// Ensure Cached State Exists
// ============================================================
// ✅ این تابع جدید اضافه شده تا در توابع CRUD
//    از null بودن cachedState جلوگیری شود.
//    این تابع منطق را تغییر نمی‌دهد، فقط امنیت اضافه می‌کند.

const ensureCachedState = () => {
  if (!cachedState) {
    cachedState = loadInitialState();
  }

  return cachedState;
};


// ============================================================
// Load Products From Supabase
// ============================================================

const loadProductsFromSupabase = async () => {
  if (productsLoadPromise) {
    return productsLoadPromise;
  }

  productsLoadPromise = getAllProducts()
    .then((products) => {
      ensureCachedState();

      cachedState = {
        ...cachedState,
        products,
      };

      notifyListeners();

      console.log(
        '🟢 محصولات از Supabase بارگذاری شدند:',
        products
      );

      return products;
    })
    .catch((error) => {
      console.error(
        '❌ خطا در بارگذاری محصولات از Supabase:',
        error
      );

      throw error;
    })
    .finally(() => {
      productsLoadPromise = null;
    });

  return productsLoadPromise;
};


// ============================================================
// Load FAQs From Supabase
// ============================================================

const loadFaqsFromSupabase = async () => {
  if (faqsLoadPromise) {
    return faqsLoadPromise;
  }

  faqsLoadPromise = getAllFaqs()
    .then((faqs) => {
      ensureCachedState();

      cachedState = {
        ...cachedState,
        faqs,
      };

      notifyListeners();

      console.log(
        '🟢 FAQها از Supabase بارگذاری شدند:',
        faqs
      );

      return faqs;
    })
    .catch((error) => {
      console.error(
        '❌ خطا در بارگذاری FAQها از Supabase:',
        error
      );

      throw error;
    })
    .finally(() => {
      faqsLoadPromise = null;
    });

  return faqsLoadPromise;
};


// ============================================================
// Initial State
// ============================================================

const loadInitialState = () => {
  if (cachedState) {
    return cachedState;
  }

  const storedProducts = loadFromLocalStorage(
    STORAGE_KEYS.PRODUCTS,
    INITIAL_PRODUCTS
  );

  const storedBrandContent = loadFromLocalStorage(
    STORAGE_KEYS.BRAND_CONTENT,
    INITIAL_BRAND_CONTENT
  );

  const storedContactInfo = loadFromLocalStorage(
    STORAGE_KEYS.CONTACT_INFO,
    INITIAL_CONTACT_INFO
  );

  const storedAdminProfile = loadFromLocalStorage(
    STORAGE_KEYS.ADMIN_PROFILE,
    INITIAL_ADMIN_PROFILE
  );

  const storedCoupons = loadFromLocalStorage(
    STORAGE_KEYS.COUPONS,
    INITIAL_COUPONS
  );


  cachedState = {
    products: storedProducts,
    faqs: [],

    brandContent: storedBrandContent,
    contactInfo: storedContactInfo,
    adminProfile: storedAdminProfile,
    coupons: storedCoupons,
  };


  return cachedState;
};


// ============================================================
// Main Hook
// ============================================================

export const useAdminStore = () => {
  const [state, setState] = useState(() => {
    return loadInitialState();
  });


  // ==========================================================
  // Subscribe + Initial Supabase Load
  // ==========================================================

  useEffect(() => {
    const listener = (newState) => {
      setState({
        ...newState,
      });
    };


    globalListeners.push(listener);


    // Load Products
    loadProductsFromSupabase().catch(() => {
      // خطا قبلاً داخل loadProductsFromSupabase لاگ شده
    });


    // Load FAQs
    loadFaqsFromSupabase().catch(() => {
      // خطا قبلاً داخل loadFaqsFromSupabase لاگ شده
    });


    return () => {
      globalListeners = globalListeners.filter(
        (l) => l !== listener
      );
    };
  }, []);


  // ==========================================================
  // Product Actions
  // ==========================================================

  const addProduct = async (newProd) => {
    try {
      ensureCachedState();

      console.log(
        '🟡 addProduct اجرا شد:',
        newProd
      );


      const product = await createProduct({
        name: newProd.name,
        englishName: newProd.englishName,
        description: newProd.description,
        price: newProd.price,
        volume: newProd.volume,
        category: newProd.category,

        rating: newProd.rating || 5,
        reviewsCount: newProd.reviewsCount || 0,

        isBestSeller: Boolean(
          newProd.isBestSeller
        ),

        isActive:
          newProd.isActive !== false,

        image: newProd.image,

        notes: {
          top: newProd.notes?.top || '',
          heart: newProd.notes?.heart || '',
          base: newProd.notes?.base || '',
        },
      });


      console.log(
        '🟢 محصول در Supabase ساخته شد:',
        product
      );


      const updatedProducts = [
        product,
        ...cachedState.products,
      ];


      cachedState = {
        ...cachedState,
        products: updatedProducts,
      };


      notifyListeners();


      return product;

    } catch (error) {
      console.error(
        '❌ خطا در اضافه کردن محصول به Supabase:',
        error
      );

      throw error;
    }
  };


  const updateProduct = async (
    id,
    updatedFields
  ) => {
    console.log(
      '🟡 updateProduct اجرا شد:',
      id,
      updatedFields
    );


    try {
      ensureCachedState();

      const updatedProduct =
        await updateProductInSupabase(
          id,
          updatedFields
        );


      const updated =
        cachedState.products.map((p) =>
          p.id === id
            ? updatedProduct
            : p
        );


      cachedState = {
        ...cachedState,
        products: updated,
      };


      notifyListeners();


      return updatedProduct;

    } catch (error) {
      console.error(
        '❌ خطا در ویرایش محصول در Supabase:',
        error
      );

      throw error;
    }
  };


  const deleteProduct = async (id) => {
    console.log(
      '🟡 deleteProduct اجرا شد:',
      id
    );


    try {
      ensureCachedState();

      await deleteProductFromSupabase(id);


      const updated =
        cachedState.products.filter(
          (p) => p.id !== id
        );


      cachedState = {
        ...cachedState,
        products: updated,
      };


      notifyListeners();


      console.log(
        '🟢 محصول از Supabase حذف شد:',
        id
      );


      return true;

    } catch (error) {
      console.error(
        '❌ خطا در حذف محصول از Supabase:',
        error
      );

      throw error;
    }
  };


  // ==========================================================
  // FAQ Actions
  // ==========================================================

  const addFaq = async (faqData) => {
    try {
      ensureCachedState();

      console.log(
        '🟡 addFaq اجرا شد:',
        faqData
      );


      const newFaq = await createFaq({
        question: faqData.question,
        answer: faqData.answer,
        category: faqData.category,
      });


      console.log(
        '🟢 FAQ در Supabase ساخته شد:',
        newFaq
      );


      const updated = [
        newFaq,
        ...cachedState.faqs,
      ];


      cachedState = {
        ...cachedState,
        faqs: updated,
      };


      notifyListeners();


      return newFaq;

    } catch (error) {
      console.error(
        '❌ خطا در اضافه کردن FAQ به Supabase:',
        error
      );

      throw error;
    }
  };


  const updateFaq = async (
    id,
    updatedFields
  ) => {
    try {
      ensureCachedState();

      console.log(
        '🟡 updateFaq اجرا شد:',
        id,
        updatedFields
      );


      const updatedFaq =
        await updateFaqInSupabase(
          id,
          {
            question:
              updatedFields.question,

            answer:
              updatedFields.answer,

            category:
              updatedFields.category,
          }
        );


      console.log(
        '🟢 FAQ در Supabase آپدیت شد:',
        updatedFaq
      );


      const updated =
        cachedState.faqs.map(
          (faq) =>
            faq.id === id
              ? updatedFaq
              : faq
        );


      cachedState = {
        ...cachedState,
        faqs: updated,
      };


      notifyListeners();


      return updatedFaq;

    } catch (error) {
      console.error(
        '❌ خطا در ویرایش FAQ در Supabase:',
        error
      );

      throw error;
    }
  };


  const deleteFaq = async (id) => {
    try {
      ensureCachedState();

      console.log(
        '🟡 deleteFaq اجرا شد:',
        id
      );


      await deleteFaqFromSupabase(id);


      const updated =
        cachedState.faqs.filter(
          (faq) => faq.id !== id
        );


      cachedState = {
        ...cachedState,
        faqs: updated,
      };


      notifyListeners();


      console.log(
        '🟢 FAQ از Supabase حذف شد:',
        id
      );


      return true;

    } catch (error) {
      console.error(
        '❌ خطا در حذف FAQ از Supabase:',
        error
      );

      throw error;
    }
  };


  // ==========================================================
  // Brand Content
  // ==========================================================

  const updateBrandContent = (
    updatedContent
  ) => {
    ensureCachedState();

    const updated = {
      ...cachedState.brandContent,
      ...updatedContent,
    };


    cachedState = {
      ...cachedState,
      brandContent: updated,
    };


    saveToLocalStorage(
      STORAGE_KEYS.BRAND_CONTENT,
      updated
    );


    notifyListeners();


    return updated;
  };


  // ==========================================================
  // Contact Info
  // ==========================================================

  const updateContactInfo = (
    updatedInfo
  ) => {
    ensureCachedState();

    const updated = {
      ...cachedState.contactInfo,
      ...updatedInfo,
    };


    cachedState = {
      ...cachedState,
      contactInfo: updated,
    };


    saveToLocalStorage(
      STORAGE_KEYS.CONTACT_INFO,
      updated
    );


    notifyListeners();


    return updated;
  };


  // ==========================================================
  // Admin Profile
  // ==========================================================

  const updateAdminProfile = (
    updatedProfile
  ) => {
    ensureCachedState();

    const updated = {
      ...cachedState.adminProfile,
      ...updatedProfile,
    };


    cachedState = {
      ...cachedState,
      adminProfile: updated,
    };


    saveToLocalStorage(
      STORAGE_KEYS.ADMIN_PROFILE,
      updated
    );


    notifyListeners();


    return updated;
  };


  // ==========================================================
  // Coupons
  // ==========================================================

  const addCoupon = (coupon) => {
    ensureCachedState();

    const updated = [
      coupon,
      ...cachedState.coupons,
    ];


    cachedState = {
      ...cachedState,
      coupons: updated,
    };


    saveToLocalStorage(
      STORAGE_KEYS.COUPONS,
      updated
    );


    notifyListeners();


    return coupon;
  };


  const updateCoupon = (
    id,
    updatedFields
  ) => {
    ensureCachedState();

    const updated =
      cachedState.coupons.map(
        (coupon) =>
          coupon.id === id
            ? {
                ...coupon,
                ...updatedFields,
              }
            : coupon
      );


    cachedState = {
      ...cachedState,
      coupons: updated,
    };


    saveToLocalStorage(
      STORAGE_KEYS.COUPONS,
      updated
    );


    notifyListeners();


    return updated.find(
      (coupon) => coupon.id === id
    );
  };


  const deleteCoupon = (id) => {
    ensureCachedState();

    const updated =
      cachedState.coupons.filter(
        (coupon) => coupon.id !== id
      );


    cachedState = {
      ...cachedState,
      coupons: updated,
    };


    saveToLocalStorage(
      STORAGE_KEYS.COUPONS,
      updated
    );


    notifyListeners();


    return true;
  };


  // ==========================================================
  // Reset
  // ==========================================================

  const resetAllToDefaults = () => {
    ensureCachedState();

    cachedState = {
      ...cachedState,

      products: INITIAL_PRODUCTS,
      faqs: [],

      brandContent:
        INITIAL_BRAND_CONTENT,

      contactInfo:
        INITIAL_CONTACT_INFO,

      adminProfile:
        INITIAL_ADMIN_PROFILE,

      coupons:
        INITIAL_COUPONS,
    };


    saveToLocalStorage(
      STORAGE_KEYS.PRODUCTS,
      INITIAL_PRODUCTS
    );

    saveToLocalStorage(
      STORAGE_KEYS.BRAND_CONTENT,
      INITIAL_BRAND_CONTENT
    );


    saveToLocalStorage(
      STORAGE_KEYS.CONTACT_INFO,
      INITIAL_CONTACT_INFO
    );


    saveToLocalStorage(
      STORAGE_KEYS.ADMIN_PROFILE,
      INITIAL_ADMIN_PROFILE
    );


    saveToLocalStorage(
      STORAGE_KEYS.COUPONS,
      INITIAL_COUPONS
    );


    notifyListeners();
  };


  // ==========================================================
  // Return
  // ==========================================================

  return {
    // State
    ...state,

    // Products
    addProduct,
    updateProduct,
    deleteProduct,

    // FAQs
    addFaq,
    updateFaq,
    deleteFaq,

    // Brand
    updateBrandContent,

    // Contact
    updateContactInfo,

    // Admin
    updateAdminProfile,

    // Coupons
    addCoupon,
    updateCoupon,
    deleteCoupon,

    // Reset
    resetAllToDefaults,
  };
};