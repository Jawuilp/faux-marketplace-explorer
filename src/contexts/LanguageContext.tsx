
import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    "our_products": "Our Products",
    "search_products": "Search products...",
    "add_to_cart": "Add to Cart",
    "product_added": "Product added",
    "product_added_desc": "The product has been added to cart successfully",
  },
  es: {
    "our_products": "Nuestros Productos",
    "search_products": "Buscar productos...",
    "add_to_cart": "Añadir al carrito",
    "product_added": "Producto añadido",
    "product_added_desc": "El producto se ha añadido al carrito correctamente",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
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
