/**
 * داده‌های جامع محصولات و اطلاعات برند لوکس عطر «آنتی»
 * تصاویر هماهنگ با پالت رنگی کرم، رز گچی، صورتی شکوفه‌ای و عنابی
 */

import promoBanner1Image from '../assets/images/Gemini_Generated_Image_b3ymqdb3ymqdb3ym-tinypng.io.webp';
import promoMobileImage from '../assets/images/your-mobile-banner-tinypng.io.webp';
import seondPoster from '../assets/images/8745f468126aba97f8b83b297ef12fa9-tinypng.io.webp';
import BaccaratRouge from '../assets/images/baccarat-rouge-540.webp';
import Dioradore from '../assets/images/jadore.webp';
import TomFordBlackOrchid from '../assets/images/black-orchid.webp';
import ChanelCocoMademoiselle from '../assets/images/coco-mademoiselle.webp';
import YSLBlackOpium from '../assets/images/black-opium.webp';
import ParfumsdeMarlyDelina from '../assets/images/delina.webp';
import LancômeLaVieEstBelle from '../assets/images/la-vie-est-belle.webp';
import VersaceBrightCrystal from '../assets/images/bright-crystal.webp';
import GiorgioArmaniSì from '../assets/images/si.webp';
import CreedAventusforHer from '../assets/images/aventus-for-her.webp';

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
    name: "کریستال سرخ",
    englishName: "Baccarat Rouge 540",
    category: "ادو پرفوم اسپرت لوکس",
    price: 3450000,
    priceFormatted: "۳,۴۵۰,۰۰۰ تومان",
    rating: 4.9,
    reviewsCount: 340,
    volume: "۱۰۰ میلی‌لیتر",
    description: "شاهکاری شاهانه و کریستالی با ترکیب جادویی زعفران، یاس و چوب‌های معطر که خط بویی بی‌نظیر بر جای می‌گذارد.",
    notes: {
      top: "زعفران قائنات، یاس مصری",
      heart: "چوب عنبر، عنبر سائل",
      base: "صمغ صنوبر، سدر ویرجینیا",
    },
    image: BaccaratRouge,
    isBestSeller: true,
  },
  {
    id: 2,
    name: "طلا کوب",
    englishName: "J'adore",
    category: "ادو پرفوم زنانه",
    price: 2850000,
    priceFormatted: "۲,۸۵۰,۰۰۰ تومان",
    rating: 4.8,
    reviewsCount: 210,
    volume: "۱۰۰ میلی‌لیتر",
    description: "دسته گلی باشکوه و درخشان از گران‌بهاترین گل‌های جهان، مظهر زنانی اصیل، شیک و پرانرژی.",
    notes: {
      top: "گلابی، خربزه، هلو، ترنج",
      heart: "یاس سامباک، گل مریم، ارکیده، رز دمشقی",
      base: "وانیل، مشک، درخت صنوبر، توت سیاه",
    },
    image: Dioradore,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "ارکیده سیاه",
    englishName: "Black Orchid",
    category: "ادو پرفوم زنانه (گرم و اغواگر)",
    price: 2980000,
    priceFormatted: "۲,۹۸۰,۰۰۰ تومان",
    rating: 4.7,
    reviewsCount: 185,
    volume: "۱۰۰ میلی‌لیتر",
    description: "رایحه‌ای لوکس، تاریک و وسوسه‌انگیز با ترکیب ارکیده سیاه، ادویه‌های کمیاب و شکلات تلخ.",
    notes: {
      top: "قارچ توفل، قارچ سیاه، انگور فرنگی، ترنج",
      heart: "ارکیده سیاه، ادویه‌جات معطر، نت‌های گلی",
      base: "شکلات تلخ، نعناع هندی (پاچولی)، وانیل، کهربا",
    },
    image: TomFordBlackOrchid,
    isBestSeller: true,
  },
  {
    id: 4,
    name: "مادمازل",
    englishName: "Coco Mademoiselle",
    category: "ادو پرفوم زنانه",
    price: 3100000,
    priceFormatted: "۳,۱۰‌۰,۰۰۰ تومان",
    rating: 4.9,
    reviewsCount: 420,
    volume: "۱۰۰ میلی‌لیتر",
    description: "انعکاسی از زنانگی مدرن و مستقل؛ آمیزه‌ای شاداب از مرکبات تازه و قلب گلی با وقار.",
    notes: {
      top: "پرتقال، ماندارین، شکوفه پرتقال، ترنج",
      heart: "رز ترکی، یاسمن، میموزا، یلانگ‌یلانگ",
      base: "نعناع هندی، مشک سفید، وانیل، خس‌خس (وتیور)",
    },
    image: ChanelCocoMademoiselle,
    isBestSeller: true,
  },
  {
    id: 5,
    name: "افیون سیاه",
    englishName: "Black Opium",
    category: "ادو پرفوم زنانه (گرم و شیرین)",
    price: 2750000,
    priceFormatted: "۲,۷۵۰,۰۰۰ تومان",
    rating: 4.8,
    reviewsCount: 290,
    volume: "۱۰۰ میلی‌لیتر",
    description: "تزریق هیجان و انرژی با رایحه اعتیادآور قهوه سیاه، وانیل شیرین و شکوفه‌های سفید.",
    notes: {
      top: "گلابی، فلفل صورتی، شکوفه پرتقال",
      heart: "قهوه، یاسمن، بادام تلخ، شیرین‌بیان",
      base: "وانیل، نعناع هندی، چوب سدر، چوب کشمیر",
    },
    image: YSLBlackOpium,
    isBestSeller: true,
  },
  {
    id: 6,
    name: "دلینا سلطنتی",
    englishName: "Delina",
    category: "ادو پرفوم زنانه نیش",
    price: 3600000,
    priceFormatted: "۳,۶۰۰,۰۰۰ تومان",
    rating: 4.9,
    reviewsCount: 175,
    volume: "۱۰۰ میلی‌لیتر",
    description: "عطر حس بویایی شاهزادگان؛ دسته‌گلی مدرن از رز فرانسوی و سرخالو با حس پودری و بسیار بهاری.",
    notes: {
      top: "سرخالو (لیچی)، ریواس، ترنج، جوز هندی",
      heart: "رز ترکی، گل صدتومانی (پیونی)، وانیل، مشک",
      base: "چوب کشمیری، سدر، بخور، خس‌خس",
    },
    image: ParfumsdeMarlyDelina,
    isBestSeller: true,
  },
  {
    id: 7,
    name: "زندگی زیباست",
    englishName: "La Vie Est Belle",
    category: "ادو پرفوم زنانه",
    price: 2600000,
    priceFormatted: "۲,۶۰۰,۰۰۰ تومان",
    rating: 4.8,
    reviewsCount: 310,
    volume: "۱۰۰ میلی‌لیتر",
    description: "بیانیه‌ای از شادی و زیبایی؛ آمیزه‌ای گرم و دلنشین از زنبق، وانیل و پرالین شیرین.",
    notes: {
      top: "انگور فرنگی سیاه، گلابی",
      heart: "زنبق، یاس، شکوفه پرتقال",
      base: "پرالین (شکلات مغزدار)، وانیل، نعناع هندی، دانه تونکا",
    },
    image: LancômeLaVieEstBelle,
    isBestSeller: false,
  },
  {
    id: 8,
    name: "کریستال درخشان",
    englishName: "Bright Crystal",
    category: "ادو توالت زنانه (خنک و ملایم)",
    price: 2250000,
    priceFormatted: "۲,۲۵۰,۰۰۰ تومان",
    rating: 4.7,
    reviewsCount: 220,
    volume: "۱۰۰ میلی‌لیتر",
    description: "رایحه‌ای شفاف، خنک و بهاری مانند قطرات شبنم روی گلبرگ‌های لوتوس و انار تازه.",
    notes: {
      top: "انار، نت‌های آبی (اقیانوسی)، یوزو",
      heart: "گل صدتومانی، ماگنولیا، نیلوفر آبی (لوتوس)",
      base: "مشک، چوب ماهون، عنبر",
    },
    image: VersaceBrightCrystal,
    isBestSeller: false,
  },
  {
    id: 9,
    name: "سی آرمانی",
    englishName: "Sì",
    category: "ادو پرفوم زنانه",
    price: 2700000,
    priceFormatted: "۲,۷۰۰,۰۰۰ تومان",
    rating: 4.8,
    reviewsCount: 155,
    volume: "۱۰۰ میلی‌لیتر",
    description: "عطری متین، شیک و مدرن برای زنانی که به زیبایی و اعتمادبه‌نفس خود «بله» می‌گویند.",
    notes: {
      top: "نکتار انگور فرنگی سیاه",
      heart: "رز می (گل محمدی)، فریزیای freesia",
      base: "وانیل، نعناع هندی، نت‌های چوبی، آمبروکسان",
    },
    image: GiorgioArmaniSì,
    isBestSeller: false,
  },
  {
    id: 10,
    name: "آونتوس زنانه",
    englishName: "Aventus for Her",
    category: "ادو پرفوم زنانه (نیش و اشرافی)",
    price: 3950000,
    priceFormatted: "۳,۹۵۰,۰۰۰ تومان",
    rating: 4.9,
    reviewsCount: 130,
    volume: "۱۰۰ میلی‌لیتر",
    description: "مکمل زنانه عطر افسانه‌ای آونتوس؛ رایحه‌ای باوقار، میوه‌ای-چوبی و بسیار قدرتمند.",
    notes: {
      top: "سیب سبز، بنفشه، لیمو ترش، فلفل صورتی، ترنج",
      heart: "رز، چوب صندل، مشک، استیراکس",
      base: "هلو، انگور فرنگی سیاه، یلانگ‌یلانگ، عنبر",
    },
    image: CreedAventusforHer,
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
  image: seondPoster,
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