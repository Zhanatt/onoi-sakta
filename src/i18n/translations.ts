export type Language = 'ru' | 'kk' | 'ky' | 'en';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
  { code: 'ky', name: 'Кыргызча', flag: '🇰🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export const translations: Record<Language, {
  heroSubtitle: string;
  heroTagline: string;
  allProducts: string;
  warehouse: string;
  automated: string;
  home: string;
  warehouseBadge: string;
  automatedBadge: string;
  homeBadge: string;
  viewMore: string;
  features: string;
  applications: string;
  requestPrice: string;
  footerEquipment: string;
  footerProject: string;
  ourValues: string;
  qualityYears: string;
  centralAsianDesign: string;
  continuousImprovement: string;
  workEfficiently: string;
  copyright: string;
  formName: string;
  formNamePlaceholder: string;
  formPhone: string;
  formCity: string;
  formCityPlaceholder: string;
  formSubmit: string;
  formSending: string;
  formSuccess: string;
  formError: string;
}> = {
  ru: {
    heroSubtitle: 'Каталог стеллажного оборудования',
    heroTagline: 'Качество 5+ лет • Доступные цены',
    allProducts: 'Все товары',
    warehouse: 'Складские стеллажи',
    automated: 'Автоматизированные склады',
    home: 'Домашние стеллажи',
    warehouseBadge: 'Склад',
    automatedBadge: 'Авто',
    homeBadge: 'Дом',
    viewMore: 'Подробнее',
    features: 'Характеристики',
    applications: 'Применение',
    requestPrice: 'Запросить цену',
    footerEquipment: 'Стеллажное оборудование',
    footerProject: 'Проект MATKASYM',
    ourValues: 'Наши ценности',
    qualityYears: 'Практичность и качество 5+ лет',
    centralAsianDesign: 'Центральноазиатский дизайн',
    continuousImprovement: 'Непрерывное совершенствование',
    workEfficiently: 'Работаем без лишних потерь',
    copyright: '© 2024 ONOI SAKTA by MATKASYM. Все права защищены.',
    formName: 'Ваше имя',
    formNamePlaceholder: 'Введите имя',
    formPhone: 'Телефон',
    formCity: 'Город',
    formCityPlaceholder: 'Откуда вы?',
    formSubmit: 'Отправить заявку',
    formSending: 'Отправка...',
    formSuccess: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
    formError: 'Ошибка отправки. Попробуйте позже.',
  },
  kk: {
    heroSubtitle: 'Сөре жабдықтарының каталогы',
    heroTagline: 'Сапасы 5+ жыл • Қолжетімді бағалар',
    allProducts: 'Барлық тауарлар',
    warehouse: 'Қойма сөрелері',
    automated: 'Автоматтандырылған қоймалар',
    home: 'Үй сөрелері',
    warehouseBadge: 'Қойма',
    automatedBadge: 'Авто',
    homeBadge: 'Үй',
    viewMore: 'Толығырақ',
    features: 'Сипаттамалары',
    applications: 'Қолданылуы',
    requestPrice: 'Бағаны сұрау',
    footerEquipment: 'Сөре жабдықтары',
    footerProject: 'MATKASYM жобасы',
    ourValues: 'Біздің құндылықтар',
    qualityYears: 'Практикалық және 5+ жыл сапасы',
    centralAsianDesign: 'Орталық Азия дизайны',
    continuousImprovement: 'Үздіксіз жетілдіру',
    workEfficiently: 'Артық шығынсыз жұмыс істейміз',
    copyright: '© 2024 ONOI SAKTA by MATKASYM. Барлық құқықтар қорғалған.',
    formName: 'Атыңыз',
    formNamePlaceholder: 'Атыңызды енгізіңіз',
    formPhone: 'Телефон',
    formCity: 'Қала',
    formCityPlaceholder: 'Қай жерденсіз?',
    formSubmit: 'Өтінім жіберу',
    formSending: 'Жіберілуде...',
    formSuccess: 'Өтінім жіберілді! Жақын арада сізбен байланысамыз.',
    formError: 'Жіберу қатесі. Кейінірек қайталаңыз.',
  },
  ky: {
    heroSubtitle: 'Текче жабдууларынын каталогу',
    heroTagline: 'Сапаты 5+ жыл • Жеткиликтүү баалар',
    allProducts: 'Бардык товарлар',
    warehouse: 'Кампа текчелери',
    automated: 'Автоматташтырылган кампалар',
    home: 'Үй текчелери',
    warehouseBadge: 'Кампа',
    automatedBadge: 'Авто',
    homeBadge: 'Үй',
    viewMore: 'Кененирээк',
    features: 'Мүнөздөмөлөрү',
    applications: 'Колдонулушу',
    requestPrice: 'Бааны сураңыз',
    footerEquipment: 'Текче жабдуулары',
    footerProject: 'MATKASYM долбоору',
    ourValues: 'Биздин баалуулуктар',
    qualityYears: 'Практикалуулук жана 5+ жыл сапаты',
    centralAsianDesign: 'Борбордук Азия дизайны',
    continuousImprovement: 'Үзгүлтүксүз өркүндөтүү',
    workEfficiently: 'Ашыкча чыгымсыз иштейбиз',
    copyright: '© 2024 ONOI SAKTA by MATKASYM. Бардык укуктар корголгон.',
    formName: 'Атыңыз',
    formNamePlaceholder: 'Атыңызды жазыңыз',
    formPhone: 'Телефон',
    formCity: 'Шаар',
    formCityPlaceholder: 'Кайдансыз?',
    formSubmit: 'Арызды жөнөтүү',
    formSending: 'Жөнөтүлүүдө...',
    formSuccess: 'Арыз жөнөтүлдү! Жакында сиз менен байланышабыз.',
    formError: 'Жөнөтүү катасы. Кийинчерээк кайталаңыз.',
  },
  en: {
    heroSubtitle: 'Shelving Equipment Catalog',
    heroTagline: 'Quality 5+ years • Affordable prices',
    allProducts: 'All Products',
    warehouse: 'Warehouse Racking',
    automated: 'Automated Warehouses',
    home: 'Home Shelving',
    warehouseBadge: 'Warehouse',
    automatedBadge: 'Auto',
    homeBadge: 'Home',
    viewMore: 'View Details',
    features: 'Features',
    applications: 'Applications',
    requestPrice: 'Request Price',
    footerEquipment: 'Shelving Equipment',
    footerProject: 'MATKASYM Project',
    ourValues: 'Our Values',
    qualityYears: 'Practicality and 5+ year quality',
    centralAsianDesign: 'Central Asian Design',
    continuousImprovement: 'Continuous Improvement',
    workEfficiently: 'Working without waste',
    copyright: '© 2024 ONOI SAKTA by MATKASYM. All rights reserved.',
    formName: 'Your name',
    formNamePlaceholder: 'Enter your name',
    formPhone: 'Phone',
    formCity: 'City',
    formCityPlaceholder: 'Where are you from?',
    formSubmit: 'Submit request',
    formSending: 'Sending...',
    formSuccess: 'Request sent! We will contact you soon.',
    formError: 'Sending error. Please try again later.',
  },
};

export const productTranslations: Record<Language, {
  products: Record<string, { name: string; description: string; features: string[]; applications: string[] }>;
}> = {
  ru: { products: {} },
  kk: { products: {} },
  ky: { products: {} },
  en: { products: {} },
};
