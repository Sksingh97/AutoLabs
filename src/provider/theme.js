import React, { createContext, useState } from 'react';
import en from "../i18n/en";
import hn from "../i18n/hn";
import light from "../theme/light";
import dark from "../theme/dark";
import { Platform, useColorScheme } from 'react-native';
import { getLocales } from 'react-native-localize';


const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const languageCode = getLocales()[0].languageCode;
  const colorScheme = useColorScheme();
  const [language, setLanguage] = useState('EN');
  const [theme, setTheme] = useState(colorScheme.toUpperCase());
  const getTranslation = () => {
    switch (language) {
      case 'EN':
          return en
      case 'HI':
          return hn
      default:
          return en
    }
  };

  const getColor = () => {
    switch (theme) {
      case 'LIGHT':
          return light
        break;
      case 'DARK':
          return dark
      default:
          return light
    }
  };

  return (
    <ThemeContext.Provider value={{ language, setLanguage, theme, setTheme, translations:getTranslation(), colors:getColor() }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };