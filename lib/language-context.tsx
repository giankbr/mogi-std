'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translations
const translations = {
  en: {
    nav: {
      work: 'Work',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      getInTouch: 'Get in touch',
      startProject: 'Start a project',
    },
    hero: {
      tagline: '— a bold design studio.',
      title: 'Mogi Studio',
      description: 'We craft bold, high‑impact brands and websites that refuse to blend in.',
      breakMold: 'Break the mold',
      seeWork: 'See our work',
      scrollDown: 'Scroll down',
    },
    about: {
      byNumbers: 'BY THE NUMBERS',
      raisedAmount: '$128k+',
      raisedText: 'raised by clients after collaboration',
      mission: 'We exist for brands who speak louder, stand taller, and never apologize for taking up space.',
      moreAbout: 'More about us',
    },
    stats: {
      title: 'By the numbers',
      stat1Key: '12+',
      stat1Value: 'Years crafting brands',
      stat2Key: '120+',
      stat2Value: 'Companies launched',
      stat3Key: '$30M',
      stat3Value: 'Client revenue influenced',
    },
    services: {
      title: "We don't do templates.",
      titleAccent: 'We do intent.',
      subtitle: 'Every project starts from zero and ends with a punch.',
      service1Title: 'Brand Identity',
      service1Body: 'Strategic platforms and unmistakable visual systems that make your brand impossible to ignore.',
      service2Title: 'Web & UX Design',
      service2Body: 'Conversion‑focused websites—minimal when it should be, expressive when it matters. Built to impress.',
      service3Title: 'Motion & Visual Art',
      service3Body: 'Art direction, motion, and content that bring stories to life across screens and channels.',
      learnMore: 'Learn more',
      bookCall: 'Book a call',
    },
    work: {
      title: 'Selected work',
      startProject: 'Start a project',
      view: 'View',
    },
    faq: {
      title: 'Frequently asked',
      q1: 'What does a typical project look like?',
      a1: 'We start with strategy and discovery, then identity, product, and web. Timelines average 4–8 weeks depending on scope.',
      q2: 'Do you offer development?',
      a2: 'Yes. We ship modern Next.js websites optimized for speed, accessibility, and maintainability.',
      q3: 'How do we get started?',
      a3: "Share your goals. We'll propose a lean scope with clear milestones and a fixed investment.",
      q4: 'Do you work with startups?',
      a4: 'Absolutely. Many of our clients are venture‑backed founders and early teams looking for signal.',
    },
    contact: {
      title: "Let's create something",
      titleAccent: 'bold together.',
      subtitle: "Ready to make your brand impossible to ignore? Drop us a message and we'll get back to you within 24 hours.",
      contactInfoTitle: 'Contact Info',
      email: 'hello@mogistudio.com',
      availability: 'Available Mon-Fri, 9AM-6PM EST',
      expectTitle: 'What to Expect',
      expect1: 'Response within 24 hours',
      expect2: 'Free consultation call',
      expect3: 'Custom proposal tailored to your needs',
      yourName: 'Your Name',
      emailAddress: 'Email Address',
      company: 'Company',
      projectType: 'Project Type',
      budgetRange: 'Budget Range',
      projectDetails: 'Project Details',
      selectType: 'Select type',
      selectBudget: 'Select budget',
      namePlaceholder: 'John Doe',
      emailPlaceholder: 'john@company.com',
      companyPlaceholder: 'Your Company Inc.',
      messagePlaceholder: 'Tell us about your project, goals, and timeline...',
      successMessage: "✓ Thank you! We'll get back to you within 24 hours.",
      errorMessage: '✗ Something went wrong. Please try again or email us directly.',
      sending: 'Sending...',
      sendMessage: 'Send Message',
      privacyPolicy: 'By submitting this form, you agree to our Privacy Policy.',
      projectTypes: {
        brandIdentity: 'Brand Identity',
        webDesign: 'Web Design & Development',
        motion: 'Motion & Visual Art',
        fullPackage: 'Full Package',
        other: 'Other',
      },
      budgets: {
        under10k: 'Under $10k',
        range10k25k: '$10k - $25k',
        range25k50k: '$25k - $50k',
        range50k100k: '$50k - $100k',
        over100k: '$100k+',
        notSure: 'Not sure yet',
      },
    },
    footer: {
      copyright: 'Mogi Studio',
      tagline: 'Building brands that refuse to blend in.',
      work: 'Work',
      services: 'Services',
      contact: 'Contact',
    },
  },
  id: {
    nav: {
      work: 'Karya',
      services: 'Layanan',
      about: 'Tentang',
      contact: 'Kontak',
      getInTouch: 'Hubungi kami',
      startProject: 'Mulai proyek',
    },
    hero: {
      tagline: '— studio desain yang berani.',
      title: 'Mogi Studio',
      description: 'Kami menciptakan brand dan website yang berani, berdampak tinggi, dan menolak untuk tenggelam.',
      breakMold: 'Keluar dari kerumunan',
      seeWork: 'Lihat karya kami',
      scrollDown: 'Gulir ke bawah',
    },
    about: {
      byNumbers: 'DARI ANGKA',
      raisedAmount: '$128k+',
      raisedText: 'dana terkumpul oleh klien setelah kolaborasi',
      mission: 'Kami hadir untuk brand yang berbicara lebih keras, berdiri lebih tinggi, dan tidak pernah meminta maaf karena mengambil ruang.',
      moreAbout: 'Lebih lanjut tentang kami',
    },
    stats: {
      title: 'Dari angka',
      stat1Key: '12+',
      stat1Value: 'Tahun membuat brand',
      stat2Key: '120+',
      stat2Value: 'Perusahaan diluncurkan',
      stat3Key: '$30M',
      stat3Value: 'Pendapatan klien terpengaruh',
    },
    services: {
      title: 'Kami tidak pakai template.',
      titleAccent: 'Kami pakai niat.',
      subtitle: 'Setiap proyek dimulai dari nol dan berakhir dengan dampak.',
      service1Title: 'Identitas Brand',
      service1Body: 'Platform strategis dan sistem visual yang tak terlupakan yang membuat brand Anda mustahil diabaikan.',
      service2Title: 'Desain Web & UX',
      service2Body: 'Website fokus konversi—minimal saat dibutuhkan, ekspresif saat penting. Dibuat untuk mengesankan.',
      service3Title: 'Motion & Seni Visual',
      service3Body: 'Arahan seni, motion, dan konten yang menghidupkan cerita di berbagai layar dan channel.',
      learnMore: 'Pelajari lebih lanjut',
      bookCall: 'Jadwalkan panggilan',
    },
    work: {
      title: 'Karya pilihan',
      startProject: 'Mulai proyek',
      view: 'Lihat',
    },
    faq: {
      title: 'Pertanyaan umum',
      q1: 'Seperti apa proyek yang biasa?',
      a1: 'Kami mulai dengan strategi dan penemuan, lalu identitas, produk, dan web. Timeline rata-rata 4–8 minggu tergantung cakupan.',
      q2: 'Apakah Anda menawarkan development?',
      a2: 'Ya. Kami membuat website Next.js modern yang dioptimalkan untuk kecepatan, aksesibilitas, dan maintainability.',
      q3: 'Bagaimana cara memulai?',
      a3: 'Bagikan tujuan Anda. Kami akan mengajukan cakupan lean dengan milestone jelas dan investasi tetap.',
      q4: 'Apakah Anda bekerja dengan startup?',
      a4: 'Tentu saja. Banyak klien kami adalah founder yang didukung venture dan tim awal yang mencari signal.',
    },
    contact: {
      title: 'Mari buat sesuatu yang',
      titleAccent: 'berani bersama.',
      subtitle: 'Siap membuat brand Anda mustahil diabaikan? Kirim pesan dan kami akan merespons dalam 24 jam.',
      contactInfoTitle: 'Info Kontak',
      email: 'hello@mogistudio.com',
      availability: 'Tersedia Senin-Jumat, 9AM-6PM EST',
      expectTitle: 'Yang Diharapkan',
      expect1: 'Respons dalam 24 jam',
      expect2: 'Konsultasi gratis',
      expect3: 'Proposal khusus sesuai kebutuhan Anda',
      yourName: 'Nama Anda',
      emailAddress: 'Alamat Email',
      company: 'Perusahaan',
      projectType: 'Jenis Proyek',
      budgetRange: 'Kisaran Budget',
      projectDetails: 'Detail Proyek',
      selectType: 'Pilih jenis',
      selectBudget: 'Pilih budget',
      namePlaceholder: 'John Doe',
      emailPlaceholder: 'john@perusahaan.com',
      companyPlaceholder: 'Perusahaan Anda Inc.',
      messagePlaceholder: 'Ceritakan tentang proyek, tujuan, dan timeline Anda...',
      successMessage: '✓ Terima kasih! Kami akan merespons dalam 24 jam.',
      errorMessage: '✗ Terjadi kesalahan. Silakan coba lagi atau email kami langsung.',
      sending: 'Mengirim...',
      sendMessage: 'Kirim Pesan',
      privacyPolicy: 'Dengan mengirim formulir ini, Anda setuju dengan Kebijakan Privasi kami.',
      projectTypes: {
        brandIdentity: 'Identitas Brand',
        webDesign: 'Desain & Pengembangan Web',
        motion: 'Motion & Seni Visual',
        fullPackage: 'Paket Lengkap',
        other: 'Lainnya',
      },
      budgets: {
        under10k: 'Di bawah $10k',
        range10k25k: '$10k - $25k',
        range25k50k: '$25k - $50k',
        range50k100k: '$50k - $100k',
        over100k: '$100k+',
        notSure: 'Belum yakin',
      },
    },
    footer: {
      copyright: 'Mogi Studio',
      tagline: 'Membangun brand yang menolak untuk tenggelam.',
      work: 'Karya',
      services: 'Layanan',
      contact: 'Kontak',
    },
  },
};
