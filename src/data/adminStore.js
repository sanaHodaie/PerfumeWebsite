import { useState, useEffect } from 'react';
import {
  PRODUCTS as INITIAL_PRODUCTS,
  FAQ_ITEMS as INITIAL_FAQS,
  HERO_DATA as INITIAL_HERO,
  ABOUT_DATA as INITIAL_ABOUT,
  FOOTER_LINKS as INITIAL_FOOTER_LINKS,
} from './products';


import {
  getProducts,
  createProduct,
  updateProduct as updateProductInSupabase,
  deleteProduct as deleteProductFromSupabase,
} from '../lib/productsApi';


const STORAGE_KEYS = {
  PRODUCTS: 'anti_admin_products_v1',
  FAQS: 'anti_admin_faqs_v1',
  BRAND_CONTENT: 'anti_admin_brand_content_v1',
  CONTACT_INFO: 'anti_admin_contact_info_v1',
  FARM_BOOKINGS: 'anti_admin_farm_bookings_v1',
  CAREER_APPS: 'anti_admin_career_apps_v1',
  ADMIN_AUTH: 'anti_admin_session_auth_v1',
  ADMIN_THEME: 'anti_admin_theme_pref_v1',
  ADMIN_PROFILE: 'anti_admin_profile_data_v1',
  COUPONS: 'anti_admin_coupons_list_v1',
};

export const INITIAL_ADMIN_PROFILE = {
  username: 'admin',
  password: 'anti@admin2026',
  fullName: 'مدیر ارشد برند آنتی',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  role: 'مدیریت کل سیستم و پرتال VIP',
  email: 'admin@anti-perfume.ir',
};

export const INITIAL_COUPONS = [
  {
    id: 1,
    code: 'ANTI-VIP',
    discountPercent: 20,
    description: 'تخفیف اختصاصی اعضای کلوب اشرافی آنتی',
    minPurchase: 2000000,
    expiresAt: '۱۴۰۴/۱۲/۲۹',
    usageCount: 48,
    maxUsage: 100,
    isActive: true,
  },
  {
    id: 2,
    code: 'ROSE2026',
    discountPercent: 15,
    description: 'جشنواره بهاره برداشت گل سرخ سنتیفولیا',
    minPurchase: 1500000,
    expiresAt: '۱۴۰۴/۰۶/۳۱',
    usageCount: 85,
    maxUsage: 200,
    isActive: true,
  },
  {
    id: 3,
    code: 'NOUR10',
    discountPercent: 10,
    description: 'کد هدیه اولین سفارش خریداران محترم',
    minPurchase: 1000000,
    expiresAt: '۱۴۰۵/۰۱/۰۱',
    usageCount: 194,
    maxUsage: 500,
    isActive: true,
  },
];

export const INITIAL_BRAND_CONTENT = {
  hero: {
    brand: "آنتی",
    badge: "دنیای رایحه‌های خاص",
    headlinePrefix: "رایحه‌ای که",
    headlineHighlight: "در خاطر می‌ماند",
    description: "آمیزه‌ای ناب از خالص‌ترین عصاره‌ها و گلبرگ‌های دست‌چین شده؛ خلق شده با هنر اصیل عطرسازی فرانسوی برای آنانی که می‌خواهند ردپایی جاودان بر جای بگذارند.",
    heroImage: "/Gemini_Generated_Image_fifj8afifj8afifj.jpg",
  },
  philosophy: {
    heroImage: "/anti_crystal_parfum.jpg",
    badge: "مانیفست خانه عطر آنتی • پاریس و تهران",
    title: "فلسفه برند آنتی؛ کیمیاگری جاودانگی و شکوه",
    lead: "در آنتی، ما معتقدیم که عطر، نامرئی‌ترین لباس و عمیق‌ترین بازتاب از اصالت درون است؛ ردپایی از نور که پس از گذشتن شما، جاودانه باقی می‌ماند.",
    pillar1Title: "خلوص افسانه‌ای عصاره‌ها",
    pillar1Desc: "عطرهای ما با درجه غلظت اکستریت د پرفوم (بالای ۳۰٪ اسانس خالص روغنی) ساخته می‌شوند تا پخش بو و ماندگاری فراتر از ۲۴ ساعت را تضمین نمایند.",
    pillar2Title: "کریستال‌های تراش‌خورده با دست",
    pillar2Desc: "هر شیشه کریستالی آنتی اثری یکتا از بلورسازان چیره‌دست است که با الهام از معماری کلاسیک فرانسوی و هنر معاصر با ظرافت تراش خورده است.",
    pillar3Title: "پایداری و احترام به آفرینش",
    pillar3Desc: "تمام مواد اولیه از کشت‌های ارگانیک مزارع محافظت‌شده تامین شده و ۱۰۰٪ بدون آزمایش بر روی حیوانات و سازگار با محیط زیست فرآوری می‌شوند.",
    pillar4Title: "هویت انحصاری رایحه‌ها",
    pillar4Desc: "فرمولاسیون رایحه‌های آنتی در انحصار آزمایشگاه‌های ما در شهر گراس فرانسه بوده و به هیچ وجه تکرار یا کپی‌برداری از برندهای تجاری نیست.",
  },
  grasse: {
    heroImage: "/pink_rose_petals.jpg",
    locationBadge: "پرووانس، فرانسه و دامنه‌های زاگرس • Grasse & Zagros",
    title: "مزارع اختصاصی گل گراس؛ مهد عطرآفرینی جهان",
    lead: "جایی که جادوی خاک پرووانس و نسیم مدیترانه با دستان کهنه‌کار گل‌چینان پیوند می‌خورد تا گران‌بهاترین قطرات عطر جهان متولد شوند.",
    subtitle: "روایت گل‌های اصیل سنتیفولیا",
    description: "در پناه تپه‌های آفتاب‌گیر و خاک زرخیز گراس، گلستان‌های خانوادگی آنتی نسل به نسل از قرن نوزدهم پاسداری شده‌اند. گل رز سنتیفولیا (گل سرخ صدپر) تنها در ماه مه و در ساعات نخستین سپیده‌دم پیش از طلوع آفتاب چیده می‌شود؛ زمانی که قطرات شبنم، رایحه جادویی و لطیف گلبرگ‌ها را در اوج تازگی نگاه داشته‌اند.",
    farmStat1Num: "۳۵ هکتار",
    farmStat1Label: "وسعت مزارع ارگانیک گراس و زاگرس",
    farmStat2Num: "۴۰۰ کیلوگرم",
    farmStat2Label: "گلبرگ برای ۱ لیتر اسانس خالص",
    farmStat3Num: "۱۰۰٪ طبیعی",
    farmStat3Label: "برداشت سنتی با دست بدون ماشین‌آلات",
    farmStat4Num: "مه و ژوئن",
    farmStat4Label: "فصل زرین چیدن گل‌های نادر",
  },
  glasscraft: {
    heroImage: "/anti_crystal_parfum.jpg",
    badge: "میراث بلورسازان استادکار • Master Glassmakers",
    title: "هنر شیشه‌گری دست‌ساز؛ تندیس‌های کریستالی نور و زمان",
    lead: "هر بطری عطر آنتی، نه صرفاً یک ظرف، بلکه یک مجسمه کریستالی نفیس و بی‌تکرار است که در کوره با دمیدن آتش و دم صنعتگران چیره‌دست جان می‌گیرد.",
    weight: "۴۸۰ گرم",
    karat: "۲۴ عیار",
    handmade: "۱۰۰٪ دست‌ساز",
  },
  eco: {
    heroImage: "/pink_rose_petals.jpg",
    badge: "پایداری لوکس • Sustainable Luxury Manifesto",
    title: "مسئولیت زیست‌محیطی؛ شکوه در هم‌نوایی با زمین",
    lead: "تجمل واقعی در هزاره جدید، محافظت از منشأ زیبایی‌هاست. در خانه عطر آنتی، ما هنر اصیل را در توازن کامل با سلامت مادر زمین معنا کرده‌ایم.",
    treeStat: "۱ نهال بلوط",
    treeStatLabel: "به ازای هر بطری فروخته‌شده",
    recycleStat: "۹۵٪",
    recycleStatLabel: "بازچرخانی آب تقطیر اسانس‌ها",
  }
};

export const INITIAL_CONTACT_INFO = {
  instagram: "@anti.parfums",
  instagramLink: "https://instagram.com/anti.parfums",
  telegram: "@anti_concierge",
  telegramLink: "https://t.me/anti_concierge",
  whatsapp: "+989123456789",
  whatsappLink: "https://wa.me/989123456789",
  phone: "۰۲۱-۲۲۰۰۵۵۴۴",
  email: "concierge@anti-perfume.ir",
  address: "تهران، الهیه، خیابان فرشته، برج دیپلمات، طبقه اختصاصی آنتی",
  workingHours: "شنبه تا پنج‌شنبه ۹:۰۰ الی ۲۱:۰۰ (پشتیبانی ۲۴ ساعته VIP)",
};

// Global Store State Holder
let globalListeners = [];
let cachedState = null;

function loadInitialState() {
  if (typeof window === 'undefined') {
    return {
      products: INITIAL_PRODUCTS,
      faqs: INITIAL_FAQS,
      brandContent: INITIAL_BRAND_CONTENT,
      contactInfo: INITIAL_CONTACT_INFO,
      farmBookings: [],
      careerApplications: [],
      isAdminLoggedIn: false,
      adminTheme: 'dark', // matches screenshot theme sombre default
      adminProfile: INITIAL_ADMIN_PROFILE,
      coupons: INITIAL_COUPONS,
    };
  }

  try {
    const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const storedFaqs = localStorage.getItem(STORAGE_KEYS.FAQS);
    const storedBrandContent = localStorage.getItem(STORAGE_KEYS.BRAND_CONTENT);
    const storedContactInfo = localStorage.getItem(STORAGE_KEYS.CONTACT_INFO);
    const storedBookings = localStorage.getItem(STORAGE_KEYS.FARM_BOOKINGS);
    const storedCareerApps = localStorage.getItem(STORAGE_KEYS.CAREER_APPS);
    const storedAuth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    const storedTheme = localStorage.getItem(STORAGE_KEYS.ADMIN_THEME);
    const storedProfile = localStorage.getItem(STORAGE_KEYS.ADMIN_PROFILE);
    const storedCoupons = localStorage.getItem(STORAGE_KEYS.COUPONS);

    return {
      products: storedProducts ? JSON.parse(storedProducts) : INITIAL_PRODUCTS,
      faqs: storedFaqs ? JSON.parse(storedFaqs) : INITIAL_FAQS,
      brandContent: storedBrandContent
        ? { ...INITIAL_BRAND_CONTENT, ...JSON.parse(storedBrandContent) }
        : INITIAL_BRAND_CONTENT,
      contactInfo: storedContactInfo
        ? { ...INITIAL_CONTACT_INFO, ...JSON.parse(storedContactInfo) }
        : INITIAL_CONTACT_INFO,
      farmBookings: storedBookings ? JSON.parse(storedBookings) : [
        {
          id: 1,
          name: "دکتر کیوان سهرابی",
          phone: "09121112233",
          date: "۱۴۰۳/۰۶/۱۵",
          status: "تایید شده",
        },
        {
          id: 2,
          name: "مهندس نیلوفر ادیب",
          phone: "09124445566",
          date: "۱۴۰۳/۰۶/۲۲",
          status: "در انتظار هماهنگی",
        }
      ],
      careerApplications: storedCareerApps ? JSON.parse(storedCareerApps) : [
        {
          id: 1,
          fullName: "سارا رضوانی",
          mobile: "09127778899",
          email: "sara.rezvani@gmail.com",
          role: "طراح و ارزیاب فرمولاسیون رایحه",
          date: "۱۴۰۳/۰۶/۱۸",
          message: "دارای ۵ سال تجربه در آزمایشگاه‌های اسانس‌شناسی و کارشناسی ارشد بیوشیمی."
        }
      ],
      isAdminLoggedIn: storedAuth === 'true',
      adminTheme: storedTheme || 'light',
      adminProfile: storedProfile ? { ...INITIAL_ADMIN_PROFILE, ...JSON.parse(storedProfile) } : INITIAL_ADMIN_PROFILE,
      coupons: storedCoupons ? JSON.parse(storedCoupons) : INITIAL_COUPONS,
    };
  } catch (err) {
    console.error("Error loading admin store from localStorage:", err);
    return {
      products: INITIAL_PRODUCTS,
      faqs: INITIAL_FAQS,
      brandContent: INITIAL_BRAND_CONTENT,
      contactInfo: INITIAL_CONTACT_INFO,
      farmBookings: [],
      careerApplications: [],
      isAdminLoggedIn: false,
      adminTheme: 'light',
      adminProfile: INITIAL_ADMIN_PROFILE,
      coupons: INITIAL_COUPONS,
    };
  }
}

function notifyListeners() {
  globalListeners.forEach((listener) => listener(cachedState));
}

function saveToLocalStorage(key, val) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
    }
  } catch (e) {
    console.error("Failed saving to localStorage", e);
  }
}

export function useAdminStore() {
  if (!cachedState) {
    cachedState = loadInitialState();
  }

  const [state, setState] = useState(cachedState);

  useEffect(() => {
    const listener = (newState) => {
      setState({ ...newState });
    };
    globalListeners.push(listener);
    return () => {
      globalListeners = globalListeners.filter((l) => l !== listener);
    };
  }, []);

  // Actions
  const addProduct = async (newProd) => {
  try {
    console.log('🟡 addProduct اجرا شد:', newProd);

    // اول محصول را در Supabase ایجاد می‌کنیم
    const product = await createProduct({
      name: newProd.name,
      englishName: newProd.englishName,
      description: newProd.description,
      price: newProd.price,
      volume: newProd.volume,
      category: newProd.category,
      notes: newProd.notes,
      rating: newProd.rating || 5,
      reviewsCount: newProd.reviewsCount || 0,
      isBestSeller: Boolean(newProd.isBestSeller),
      isActive: newProd.isActive !== false,
      image: newProd.image,
    });

    console.log('🟢 محصول در Supabase ساخته شد:', product);

    // بعد state محلی را با محصول واقعی Supabase به‌روزرسانی می‌کنیم
    const updated = [product, ...cachedState.products];

    cachedState = {
      ...cachedState,
      products: updated,
    };

    // این فقط برای هماهنگی state فعلی پنل است
    // منبع اصلی اطلاعات Supabase است
    saveToLocalStorage(STORAGE_KEYS.PRODUCTS, updated);

    notifyListeners();

    return product;
  } catch (error) {
    console.error('❌ خطا در اضافه کردن محصول به Supabase:', error);
    throw error;
  }
};
const updateProduct = async (id, updatedFields) => {
  console.log('🟡 updateProduct اجرا شد:', id, updatedFields);
  try {
    const updatedProduct = await updateProductInSupabase(id, updatedFields);

    const updated = cachedState.products.map((p) =>
      p.id === id ? updatedProduct : p
    );

    cachedState = { ...cachedState, products: updated };

    notifyListeners();

    return updatedProduct;
  } catch (error) {
    console.error('❌ خطا در ویرایش محصول در Supabase:', error);
    throw error;
  }
};

  const deleteProduct = (id) => {
    const updated = cachedState.products.filter((p) => p.id !== id);
    cachedState = { ...cachedState, products: updated };
    saveToLocalStorage(STORAGE_KEYS.PRODUCTS, updated);
    notifyListeners();
  };

  const addFaq = (faqData) => {
    const id = Date.now();
    const newFaq = { ...faqData, id };
    const updated = [...cachedState.faqs, newFaq];
    cachedState = { ...cachedState, faqs: updated };
    saveToLocalStorage(STORAGE_KEYS.FAQS, updated);
    notifyListeners();
    return newFaq;
  };

  const updateFaq = (id, updatedFields) => {
    const updated = cachedState.faqs.map((f) => (f.id === id ? { ...f, ...updatedFields } : f));
    cachedState = { ...cachedState, faqs: updated };
    saveToLocalStorage(STORAGE_KEYS.FAQS, updated);
    notifyListeners();
  };

  const deleteFaq = (id) => {
    const updated = cachedState.faqs.filter((f) => f.id !== id);
    cachedState = { ...cachedState, faqs: updated };
    saveToLocalStorage(STORAGE_KEYS.FAQS, updated);
    notifyListeners();
  };

  const updateBrandContent = (sectionKey, sectionData) => {
    const updated = {
      ...cachedState.brandContent,
      [sectionKey]: {
        ...cachedState.brandContent[sectionKey],
        ...sectionData,
      },
    };
    cachedState = { ...cachedState, brandContent: updated };
    saveToLocalStorage(STORAGE_KEYS.BRAND_CONTENT, updated);
    notifyListeners();
  };

  const updateContactInfo = (newContactInfo) => {
    const updated = { ...cachedState.contactInfo, ...newContactInfo };
    cachedState = { ...cachedState, contactInfo: updated };
    saveToLocalStorage(STORAGE_KEYS.CONTACT_INFO, updated);
    notifyListeners();
  };

  const addFarmBooking = (booking) => {
    const newBooking = { ...booking, id: Date.now(), date: new Date().toLocaleDateString('fa-IR') };
    const updated = [newBooking, ...cachedState.farmBookings];
    cachedState = { ...cachedState, farmBookings: updated };
    saveToLocalStorage(STORAGE_KEYS.FARM_BOOKINGS, updated);
    notifyListeners();
  };

  const addCareerApp = (application) => {
    const newApp = { ...application, id: Date.now(), date: new Date().toLocaleDateString('fa-IR') };
    const updated = [newApp, ...cachedState.careerApplications];
    cachedState = { ...cachedState, careerApplications: updated };
    saveToLocalStorage(STORAGE_KEYS.CAREER_APPS, updated);
    notifyListeners();
  };

  const setAdminLoggedIn = (isLoggedIn) => {
    cachedState = { ...cachedState, isAdminLoggedIn: isLoggedIn };
    saveToLocalStorage(STORAGE_KEYS.ADMIN_AUTH, isLoggedIn ? 'true' : 'false');
    notifyListeners();
  };

  const setAdminTheme = (theme) => {
    cachedState = { ...cachedState, adminTheme: theme };
    saveToLocalStorage(STORAGE_KEYS.ADMIN_THEME, theme);
    notifyListeners();
  };

  const updateAdminProfile = (newProfile) => {
    const updated = { ...cachedState.adminProfile, ...newProfile };
    cachedState = { ...cachedState, adminProfile: updated };
    saveToLocalStorage(STORAGE_KEYS.ADMIN_PROFILE, updated);
    notifyListeners();
    return updated;
  };

  const addCoupon = (newCoupon) => {
    const id = Date.now();
    const coupon = {
      ...newCoupon,
      id,
      usageCount: 0,
      isActive: newCoupon.isActive !== undefined ? newCoupon.isActive : true,
    };
    const updated = [coupon, ...cachedState.coupons];
    cachedState = { ...cachedState, coupons: updated };
    saveToLocalStorage(STORAGE_KEYS.COUPONS, updated);
    notifyListeners();
    return coupon;
  };

  const updateCoupon = (id, updatedFields) => {
    const updated = cachedState.coupons.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    cachedState = { ...cachedState, coupons: updated };
    saveToLocalStorage(STORAGE_KEYS.COUPONS, updated);
    notifyListeners();
  };

  const deleteCoupon = (id) => {
    const updated = cachedState.coupons.filter((c) => c.id !== id);
    cachedState = { ...cachedState, coupons: updated };
    saveToLocalStorage(STORAGE_KEYS.COUPONS, updated);
    notifyListeners();
  };

  const toggleCouponStatus = (id) => {
    const updated = cachedState.coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
    cachedState = { ...cachedState, coupons: updated };
    saveToLocalStorage(STORAGE_KEYS.COUPONS, updated);
    notifyListeners();
  };

  const incrementCouponUsage = (id) => {
    const updated = cachedState.coupons.map((c) => {
      if (c.id === id) {
        const currentCount = Number(c.usageCount) || 0;
        const max = Number(c.maxUsage) || 100;
        const newCount = Math.min(max, currentCount + 1);
        return { ...c, usageCount: newCount };
      }
      return c;
    });
    cachedState = { ...cachedState, coupons: updated };
    saveToLocalStorage(STORAGE_KEYS.COUPONS, updated);
    notifyListeners();
  };

  const resetAllToDefaults = () => {
    cachedState = {
      ...cachedState,
      products: INITIAL_PRODUCTS,
      faqs: INITIAL_FAQS,
      brandContent: INITIAL_BRAND_CONTENT,
      contactInfo: INITIAL_CONTACT_INFO,
      adminProfile: INITIAL_ADMIN_PROFILE,
      coupons: INITIAL_COUPONS,
    };
    saveToLocalStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    saveToLocalStorage(STORAGE_KEYS.FAQS, INITIAL_FAQS);
    saveToLocalStorage(STORAGE_KEYS.BRAND_CONTENT, INITIAL_BRAND_CONTENT);
    saveToLocalStorage(STORAGE_KEYS.CONTACT_INFO, INITIAL_CONTACT_INFO);
    saveToLocalStorage(STORAGE_KEYS.ADMIN_PROFILE, INITIAL_ADMIN_PROFILE);
    saveToLocalStorage(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
    notifyListeners();
  };

  return {
    ...state,
    addProduct,
    updateProduct,
    deleteProduct,
    addFaq,
    updateFaq,
    deleteFaq,
    updateBrandContent,
    updateContactInfo,
    addFarmBooking,
    addCareerApp,
    setAdminLoggedIn,
    setAdminTheme,
    updateAdminProfile,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCouponStatus,
    incrementCouponUsage,
    resetAllToDefaults,
  };
}
