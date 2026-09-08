/**
 * داده‌های جامع محصولات و اطلاعات برند لوکس عطر «آنتی»
 * تصاویر هماهنگ با پالت رنگی کرم، رز گچی، صورتی شکوفه‌ای و عنابی
 */

import promoBanner1Image from '../assets/images/Gemini_Generated_Image_74dcnr74dcnr74dc.jpg';
import promoMobileImage from '../assets/images/your-mobile-banner.jpg';

export const HERO_DATA = {
  brand: "آنتی",

  bottleBadge: "عصاره دست‌چین شده • Pure Parfum",
  headlinePrefix: "رایحه‌ای که",
  headlineHighlight: "در خاطر می‌ماند",
  description: "آمیزه‌ای ناب از خالص‌ترین عصاره‌ها و گلبرگ‌های دست‌چین شده؛ خلق شده با هنر اصیل عطرسازی فرانسوی برای آنانی که می‌خواهند ردپایی جاودان بر جای بگذارند.",
  primaryCta: "مشاهده مجموعه",
  secondaryCta: "تماشای داستان",
  heroImage: "/Gemini_Generated_Image_fifj8afifj8afifj.jpg",
};

export const FEATURES = [
  {
    id: 1,
    title: "رایحه ماندگار",
    subtitle: "همراه لحظه‌های شما",
    iconName: "Clock",
  },
  {
    id: 2,
    title: "مواد اولیه ممتاز",
    subtitle: "انتخاب‌شده با دقت",
    iconName: "Sparkles",
  },
  {
    id: 3,
    title: "طراحی منحصربه‌فرد",
    subtitle: "ترکیبی از هنر و ظرافت",
    iconName: "Palette",
  },
  {
    id: 4,
    title: "بسته‌بندی لوکس",
    subtitle: "تجربه‌ای خاص از ابتدا تا انتها",
    iconName: "Package",
  },
];

export const ABOUT_DATA = {

  heading: "داستان آنتی",
  lead: "در آنتی، ما نادرترین رایحه‌های گیتی را در آمیزه‌ای از هنر و شور می‌آمیزیم تا عطرهایی خلق کنیم که روح را به پرواز درمی‌آورند.",
  paragraph1: "هر شیشه از عطرهای آنتی، یادبودی است از ظرافت بی‌بدیل و فردیت ناب زنانه. ما عطرسازی را تنها ترکیب اسانس‌ها نمی‌دانیم؛ بلکه آن را خلق سمفونی خاطراتی می‌دانیم که با گذر زمان هرگز از یاد نخواهند رفت.",
  paragraph2: "تمام ترکیبات ما بدون آزمایش بر روی حیوانات، با نهایت احترام به طبیعت و با هنر دست استادان کهنه‌کار عطرسازی فرانسه فرموله و در شیشه‌های کریستالی منحصر‌به‌فرد مهر و موم می‌شوند.",
  ctaText: "بیشتر بدانید",
  images: {
    tallBottle: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    woman: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    petals: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80",
  },
};

export const PRODUCTS = [
  {
    id: 1,
    name: "رز سفید",
    englishName: "Rose Divine",
    category: "ادو پرفوم زنانه",
    price: 1990000,
    priceFormatted: "۱,۹۹۰,۰۰۰ تومان",
    rating: 4.9,
    reviewsCount: 128,
    volume: "۱۰۰ میلی‌لیتر",
    description: "ترکیبی روح‌نواز از گلبرگ‌های شبنم‌خورده رز سفید، چوب صندل سفید و ته‌مایه‌ای از مشک بلوری.",
    notes: {
      top: "ترنج ایتالیایی، گلابی وحشی",
      heart: "رز سفید دمشقی، زنبق دره",
      base: "سدر سفید، مشک پنبه‌ای",
    },
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
  },
  {
    id: 2,
    name: "مخمل طلایی",
    englishName: "Velvet Oud",
    category: "عطر گرم و اشرافی",
    price: 2450000,
    priceFormatted: "۲,۴۵۰,۰۰۰ تومان",
    rating: 4.8,
    reviewsCount: 94,
    volume: "۱۰۰ میلی‌لیتر",
    description: "حسی مخملین و گرم با آکوردهای عود سلطنتی، وانیل ماداگاسکار و زعفران دست‌چین شده.",
    notes: {
      top: "زعفران قائنات، پرتقال خونی",
      heart: "عود لائوس، یاس رازقی",
      base: "وانیل ماداگاسکار، چرم کهربایی",
    },
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
  },
  {
    id: 3,
    name: "آفتاب مرکبات",
    englishName: "Citrus Luxe",
    category: "عطر خنک و باطراوت",
    price: 1850000,
    priceFormatted: "۱,۸۵۰,۰۰۰ تومان",
    rating: 4.7,
    reviewsCount: 82,
    volume: "۱۰۰ میلی‌لیتر",
    description: "انفجاری درخشان از نور خورشید مدیترانه‌ای، نارنگی سیسیلی و برگ‌های تازه شکوفه بهارنارنج.",
    notes: {
      top: "نارنگی سیسیلی، گریپ‌فروت صورتی",
      heart: "شکوفه پرتقال، چای سفید",
      base: "عنبر خشک، علف وتیور",
    },
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
  },
  {
    id: 4,
    name: "رز کهربایی",
    englishName: "Amber Royale",
    category: "عطر گلی و شرقی",
    price: 2200000,
    priceFormatted: "۲,۲۰۰,۰۰۰ تومان",
    rating: 4.9,
    reviewsCount: 110,
    volume: "۱۰۰ میلی‌لیتر",
    description: "هم‌نشینی طلایی رز بلغاری در هاله‌ای گرم از کهربای بالتیک و هل هندی.",
    notes: {
      top: "هل سبز، فلفل صورتی",
      heart: "رز سرخ بلغاری، رز صدتومانی",
      base: "کهربای ناب، نعناع هندی، بنزوئین",
    },
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
  },
  {
    id: 5,
    name: "شب مخملی",
    englishName: "Midnight Bloom",
    category: "عطر وسوسه‌انگیز شبانه",
    price: 2650000,
    priceFormatted: "۲,۶۵۰,۰۰۰ تومان",
    rating: 4.9,
    reviewsCount: 145,
    volume: "۱۰۰ میلی‌لیتر",
    description: "رمزی افسونگر از زنبق شب‌تاب، نعناع هندی اندونزی و شکلات تلخ در شبی مهتابی.",
    notes: {
      top: "تمشک سیاه، بادام تلخ",
      heart: "مریم شب‌بو، زنبق سیاه",
      base: "دانه تونکا، کاکائو، پاچولی",
    },
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    isBestSeller: true,
  },
];

export const PROMOTIONAL_BANNER_1 = {
  heading: "رایحه‌ای فراتر از خاطره",
  subtitle: "عطری که حتی پس از رفتنتان، حضور شما را در یادها زنده نگه می‌دارد.",
  ctaText: "خرید کنید",
  image: promoBanner1Image,
  mobileImage: promoMobileImage,

};

export const PROMOTIONAL_BANNER_2 = {
  heading: "هنر یک رایحه ماندگار",
  text: "هر رایحه، ترکیبی از خاطره، احساس و لحظه‌ای است که برای همیشه در ذهن باقی می‌ماند.",
  ctaText: "کشف کنید",
  image: "/Gemini_Generated_Image_fifj8afifj8afifj.jpg",
};

export const TESTIMONIAL = {
  quote: "عطرهای آنتی واقعاً استثنایی هستند. رایحه‌ای که تمام طول روز ماندگار است و همیشه توجه و تحسین اطرافیان را جلب می‌کند. بسته‌بندی فاخر آن تجربه‌ای شبیه به گشودن یک اثر هنری است.",
  author: "سوفیا محمودی",
  role: "مشتری همیشگی و طراح مد",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80",
};

export const TRUST_BADGES = [
  {
    id: 1,
    title: "ارسال رایگان و ویژه",
    description: "برای سفارش‌های بالای ۱ میلیون تومان",
    iconName: "Truck",
  },
  {
    id: 2,
    title: "تضمین اصالت صددرصدی",
    description: "دارای گواهی بین‌المللی خلوص اسانس",
    iconName: "ShieldCheck",
  },
  {
    id: 3,
    title: "ضمانت بازگشت ۷ روزه",
    description: "امکان مرجوعی بدون قید و شرط تستر",
    iconName: "RotateCcw",
  },
];

export const FAQ_ITEMS = [
  {
    id: 1,
    question: "نحوه ارسال سفارش‌ها چگونه است و چقدر زمان می‌برد؟",
    answer: "سفارش‌های شهر تهران توسط پیک اکسپرس اختصاصی در همان روز یا حداکثر ظرف ۲۴ ساعت تحویل می‌گردند. برای سایر شهرها و استان‌ها، مرسوله‌ها با پست پیشتاز بیمه‌شده یا تیپاکس ارسال شده و ظرف ۲ الی ۳ روز کاری به دست شما می‌رسند. تمامی بسته‌ها در پوشش محافظ چندلایه و ضدضربه بسته‌بندی می‌شوند تا از سلامت کامل بطری عطر اطمینان حاصل شود.",
    category: "ارسال و تحویل"
  },
  {
    id: 2,
    question: "ضمانت اصالت کالا و گارانتی عصاره‌ها به چه صورت است؟",
    answer: "تمامی محصولات برند آنتی دارای ضمانت اصالت ۱۰۰٪ مادام‌العمر، برچسب تایید اصالت، بارکد بین‌المللی و بچ‌کد حک شده یکسان روی شیشه و جعبه هستند. همچنین همراه هر خرید، تستر ۲ میلی‌لیتری رایگان تقدیم می‌شود تا قبل از باز کردن سلفون و جعبه اصلی، رایحه را تست فرمایید. در صورت هرگونه مغایرت، کالا تا ۷ روز بدون قید و شرط قابل استرداد است.",
    category: "اصالت و گارانتی"
  },
  {
    id: 3,
    question: "میزان ماندگاری و پخش بوی (سیاژ) عطرهای آنتی چقدر است؟",
    answer: "عطرهای آنتی با فرمولاسیون اختصاصی اکستریت د پرفوم (Extrait de Parfum) و غلظت اسانس روغنی بالای ۲۵٪ تولید می‌شوند. این غلظت ماندگاری بیش از ۲۴ تا ۴۸ ساعت بر روی بافت پارچه و پوست و خط بوی برجسته و فراگیر در محیط را تضمین می‌کند.",
    category: "کیفیت رایحه"
  },
  {
    id: 4,
    question: "آیا ارسال سفارش‌ها به سراسر کشور رایگان است؟",
    answer: "بله، برای کلیه سفارش‌های بالای ۱,۵۰۰,۰۰۰ تومان، هزینه بسته‌بندی ویژه و ارسال با پست پیشتاز یا پیک اکسپرس به سراسر ایران کاملاً رایگان خواهد بود.",
    category: "ارسال و تحویل"
  },
  {
    id: 5,
    question: "شرایط بسته‌بندی هدیه و ارسال به شخص دیگر چگونه است؟",
    answer: "کلیه محصولات در هاردباکس‌های فاخر به همراه روبان ابریشمی بسته‌بندی می‌شوند. همچنین در صفحه تسویه حساب می‌توانید گزینه «بسته‌بندی کادویی اختصاصی» را همراه با کارت‌پستال دست‌نویس با متن دلخواه خود به صورت رایگان فعال کنید.",
    category: "بسته‌بندی لوکس"
  }
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "صفحه اصلی", href: "#hero" },
    { label: "مجموعه عطرها", href: "#collection" },
    { label: "پرفروش‌ترین‌ها", href: "#bestsellers" },
    { label: "داستان آنتی", href: "#about" },
    { label: "نظرات مشتریان", href: "#testimonials" },
  ],
  products: [
    { label: "عطرهای زنانه نیش", href: "#" },
    { label: "عطرهای اکستره دو پرفوم", href: "#" },
    { label: "کالکشن خصوصی رز", href: "#" },
    { label: "پک‌های کشف رایحه (دیسکاوری)", href: "#" },
    { label: "باکس‌های کادویی لوکس", href: "#" },
  ],
  about: [
    { label: "فلسفه برند آنتی", href: "#" },
    { label: "مزارع اختصاصی گل گراس", href: "#" },
    { label: "هنر شیشه‌گری دست‌ساز", href: "#" },
    { label: "مسئولیت زیست‌محیطی", href: "#" },
    { label: "فرصت‌های همکاری", href: "#" },
  ],
  contact: [
    { label: "دفتر مرکزی: تهران، الهیه، برج دیپلمات", href: "#" },
    { label: "تلفن مشاوره و سفارش: ۰۲۱-۲۲۰۰۵۵۴۴", href: "#" },
    { label: "ایمیل پشتیبانی: concierge@anti-perfume.ir", href: "#" },
    { label: "ساعات پاسخگویی: شنبه تا پنج‌شنبه ۹ تا ۲۱", href: "#" },
  ],
};
