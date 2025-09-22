import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'te' | 'ta' | 'bn';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Login Page
  smartKrishi: {
    en: 'Smart Krishi',
    hi: 'स्मार्ट कृषि',
    te: 'స్మార్ట్ కృషి',
    ta: 'ஸ்மார்ட் கிருஷி',
    bn: 'স্মার্ট কৃষি'
  },
  intelligentFarming: {
    en: 'Intelligent Farming Dashboard',
    hi: 'बुद्धिमान कृषि डैशबोर्ड',
    te: 'తెలివైన వ్యవసాయ డాష్‌బోర్డ్',
    ta: 'அறிவார்ந்த விவசாய டாஷ்போர்டு',
    bn: 'বুদ্ধিমান কৃষি ড্যাশবোর্ড'
  },
  selectLanguage: {
    en: 'Select Language',
    hi: 'भाषा चुनें',
    te: 'భాష ఎంచుకోండి',
    ta: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    bn: 'ভাষা নির্বাচন করুন'
  },
  phoneNumber: {
    en: 'Phone Number',
    hi: 'फोन नंबर',
    te: 'ఫోన్ నంబర్',
    ta: 'தொலைபேசி எண்',
    bn: 'ফোন নম্বর'
  },
  password: {
    en: 'Password (PIN)',
    hi: 'पासवर्ड (पिन)',
    te: 'పాస్‌వర్డ్ (పిన్)',
    ta: 'கடவுச்சொல் (பின்)',
    bn: 'পাসওয়ার্ড (পিন)'
  },
  login: {
    en: 'Login',
    hi: 'लॉगिन करें',
    te: 'లాగిన్ చేయండి',
    ta: 'உள்நுழைய',
    bn: 'লগইন করুন'
  },
  enterPhone: {
    en: 'Enter your phone number',
    hi: 'अपना फोन नंबर दर्ज करें',
    te: 'మీ ఫోన్ నంబర్ నమోదు చేయండి',
    ta: 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்',
    bn: 'আপনার ফোন নম্বর লিখুন'
  },
  enterPin: {
    en: 'Enter your PIN',
    hi: 'अपना पिन दर्ज करें',
    te: 'మీ పిన్ నమోదు చేయండి',
    ta: 'உங்கள் பின்னை உள்ளிடவும்',
    bn: 'আপনার পিন লিখুন'
  },
  // Dashboard
  dashboard: {
    en: 'Smart Krishi Dashboard',
    hi: 'स्मार्ट कृषि डैशबोर्ड',
    te: 'స్మార్ట్ కృషి డాష్‌బోర్డ్',
    ta: 'ஸ்மார்ட் கிருஷி டாஷ்போர்டு',
    bn: 'স্মার্ট কৃষি ড্যাশবোর্ড'
  },
  cropsOverview: {
    en: 'Registered Crops Overview',
    hi: 'पंजीकृت फसल विवरण',
    te: 'నమోదిత పంటల వివరణ',
    ta: 'பதிவு செய்யப்பட்ட பயிர்களின் கண்ணோட்டம்',
    bn: 'নিবন্ধিত ফসলের বিবরণ'
  },
  latestUpdates: {
    en: 'Latest Updates',
    hi: 'नवीनतम अपडेट',
    te: 'తాజా అప్‌డేట్‌లు',
    ta: 'சமீபத்திய புதுப்பிப்புகள்',
    bn: 'সর্বশেষ আপডেট'
  },
  marketPrices: {
    en: 'Market Prices',
    hi: 'बाजार मूल्य',
    te: 'మార్కెట్ ధరలు',
    ta: 'சந்தை விலைகள்',
    bn: 'বাজার মূল্য'
  },
  weatherAlert: {
    en: 'Weather Alert',
    hi: 'मौसम चेतावनी',
    te: 'వాతావరణ హెచ్చరిక',
    ta: 'வானிலை எச்சரிக்கை',
    bn: 'আবহাওয়া সতর্কতা'
  },
  // Navigation
  home: {
    en: 'Home',
    hi: 'होम',
    te: 'హోమ్',
    ta: 'முகப்பு',
    bn: 'হোম'
  },
  myCrops: {
    en: 'My Crops',
    hi: 'मेरी फसल',
    te: 'నా పంటలు',
    ta: 'என் பயிர்கள்',
    bn: 'আমার ফসল'
  },
  social: {
    en: 'Social',
    hi: 'सामाजिक',
    te: 'సామాజిక',
    ta: 'சமூக',
    bn: 'সামাজিক'
  },
  prediction: {
    en: 'Prediction',
    hi: 'भविष्यवाणी',
    te: 'అంచనా',
    ta: 'கணிப்பு',
    bn: 'পূর্বাভাস'
  },
  // Common
  expected: {
    en: 'Expected',
    hi: 'अपेक्षित',
    te: 'ఆశించిన',
    ta: 'எதிர்பார்க்கப்பட்டது',
    bn: 'প্রত্याশিত'
  },
  actual: {
    en: 'Actual',
    hi: 'वास्तविक',
    te: 'వాస్తవ',
    ta: 'உண்மையான',
    bn: 'প্রকৃত'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};