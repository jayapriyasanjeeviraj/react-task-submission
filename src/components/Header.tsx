import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/init";

const Header: FC = () => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>(i18n.language);

  // Handle language change and update local state
  const handleChangeLang = () => {
    const newLang = currentLang === "en" ? "cy" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  // Listen for language change event
  useEffect(() => {
    const handleLangChange = (lang: string) => setCurrentLang(lang);
    
    i18n.on("languageChanged", handleLangChange);
    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, []);
// change the className Typo error
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <h1 className="navbar-brand">{t("welcome")}</h1>
        <button
          aria-labelledby="sr-lang-btn"
          className="btn btn-secondary"
          onClick={handleChangeLang}
        >
          {currentLang === "en" ? t("cymraeg") : t("english")}
          <span id="sr-lang-btn" className="visually-hidden">
            {currentLang === "en"
              ? t("switchToWelsh")
              : t("switchToEnglish")}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
