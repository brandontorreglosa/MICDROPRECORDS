import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const countryToLang: Record<string, string> = {
  ES: "es", FR: "fr", DE: "de", IT: "it", PT: "pt", RU: "ru", CN: "zh-CN", JP: "ja", KR: "ko",
  AR: "ar", NL: "nl", SV: "sv", NO: "no", DA: "da", FI: "fi", PL: "pl", BR: "pt", MX: "es"
};

const translateWord: Record<string, string> = {
  en: "Translate", es: "Traducir", fr: "Traduire", de: "Übersetzen", it: "Traduci", pt: "Traduzir",
  ru: "Перевести", "zh-CN": "翻译", ja: "翻訳", ko: "번역", ar: "ترجمة", nl: "Vertalen", sv: "Översätt",
  no: "Oversett", da: "Oversæt", fi: "Käännä", pl: "Tłumacz"
};

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);
  const [showTranslateWidget, setShowTranslateWidget] = useState(false);
  const [userLang, setUserLang] = useState<string>("en");
  const [autoTranslated, setAutoTranslated] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const countryLang = countryToLang[data.country_code];
        if (countryLang && countryLang !== "en") setUserLang(countryLang);
      })
      .catch(() => setUserLang("en"));
  }, []);

  const loadTranslateScript = () => {
    if (window.google && window.google.translate) {
      setIsTranslateLoaded(true);
      return;
    }
    if (document.getElementById("google-translate-script")) return;
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.type = "text/javascript";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
  };

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!widgetRef.current) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "es,fr,de,it,pt,ru,zh-CN,ja,ko,ar,nl,sv,no,da,fi,pl",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        widgetRef.current.id
      );
      setIsTranslateLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (userLang !== "en" && !autoTranslated) {
      loadTranslateScript();
    }
  }, [userLang, autoTranslated]);

  useEffect(() => {
    if (
      isTranslateLoaded &&
      userLang !== "en" &&
      !autoTranslated &&
      window.google &&
      window.google.translate
    ) {
      setTimeout(() => {
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
        if (select && select.value !== userLang) {
          select.value = userLang;
          select.dispatchEvent(new Event("change"));
          setAutoTranslated(true);
        }
      }, 800);
    }
  }, [isTranslateLoaded, userLang, autoTranslated]);

  const handleTranslateClick = () => {
    if (!isTranslateLoaded) {
      loadTranslateScript();
      setShowTranslateWidget(true);
    } else {
      setShowTranslateWidget(prev => !prev);
    }
  };

  const buttonLabel =
    userLang !== "en" && translateWord[userLang]
      ? translateWord[userLang]
      : translateWord["en"];

  return (
    <div className="fixed top-20 right-4 z-40 w-64">
      <Button
        onClick={handleTranslateClick}
        variant="outline"
        size="sm"
        className="bg-black border-gray-600 text-white hover:bg-gray-800 hover:text-white w-full"
        title="Translate Page"
      >
        <Globe className="h-4 w-4 mr-1" />
        {buttonLabel}
      </Button>
      <div
        ref={widgetRef}
        id="google_translate_element"
        className="mt-2 bg-black rounded-lg border border-gray-600 p-2"
        style={{
          display: showTranslateWidget ? "block" : "none",
          minHeight: 48,
          position: "relative"
        }}
      ></div>
      {!showTranslateWidget && <div style={{ minHeight: 48, visibility: "hidden" }}></div>}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .goog-te-banner-frame { display: none !important; }
          .goog-te-spinner-pos { display: none !important; }
          body { top: 0 !important; }
          /* Prevent Google Translate from changing your site's fonts, font sizes, or layout */
          html, body, body * {
            font-family: inherit !important;
            font-size: inherit !important;
            color: inherit !important;
            line-height: inherit !important;
            direction: inherit !important;
          }
          .goog-te-menu-value, .goog-te-gadget, .goog-te-combo {
            color: white !important;
            background-color: #1f1f1f !important;
            border: 1px solid #4b5563 !important;
            font-family: inherit !important;
            font-size: inherit !important;
          }
          .goog-te-gadget {
            color: white !important;
          }
          `
        }}
      />
    </div>
  );
}
