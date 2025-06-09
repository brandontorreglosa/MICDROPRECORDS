import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

// Maps country code to Google Translate language code
const countryToLang: Record<string, string> = {
  ES: "es", FR: "fr", DE: "de", IT: "it", PT: "pt", RU: "ru", CN: "zh-CN", JP: "ja", KR: "ko",
  AR: "ar", NL: "nl", SV: "sv", NO: "no", DA: "da", FI: "fi", PL: "pl", BR: "pt", MX: "es"
};

// Maps Google Translate language code to "Translate" in that language
const translateWord: Record<string, string> = {
  en: "Translate", es: "Traducir", fr: "Traduire", de: "Übersetzen", it: "Traduci", pt: "Traduzir",
  ru: "Перевести", "zh-CN": "翻译", ja: "翻訳", ko: "번역", ar: "ترجمة", nl: "Vertalen", sv: "Översätt",
  no: "Oversett", da: "Oversæt", fi: "Käännä", pl: "Tłumacz"
};

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
    gtAutoLang: string | null;
  }
}

export default function GoogleTranslate() {
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);
  const [showTranslateWidget, setShowTranslateWidget] = useState(false);
  const [userLang, setUserLang] = useState<string>("en");

  // On mount, fetch IP country and decide language
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const countryLang = countryToLang[data.country_code];
        if (countryLang && countryLang !== "en") {
          setUserLang(countryLang);
          window.gtAutoLang = countryLang;
          initializeGoogleTranslate(countryLang);
        } else {
          setUserLang("en");
          window.gtAutoLang = null;
        }
      })
      .catch(() => {
        setUserLang("en");
        window.gtAutoLang = null;
      });
    // eslint-disable-next-line
  }, []);

  // When widget is loaded, auto-select the language if needed
  useEffect(() => {
    if (isTranslateLoaded && window.gtAutoLang && window.google && window.google.translate) {
      // Give the widget a moment to inject its combo box
      setTimeout(() => {
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
        if (select && select.value !== window.gtAutoLang) {
          select.value = window.gtAutoLang;
          // Fire the change event so Google Translate applies the language
          select.dispatchEvent(new Event("change"));
        }
      }, 700); // May need to adjust delay for slow connections
    }
  }, [isTranslateLoaded]);

  // Loads the widget if not already loaded
  function initializeGoogleTranslate(langOverride?: string) {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "es,fr,de,it,pt,ru,zh-CN,ja,ko,ar,nl,sv,no,da,fi,pl",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setIsTranslateLoaded(true);
      setShowTranslateWidget(true);
    } else {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "es,fr,de,it,pt,ru,zh-CN,ja,ko,ar,nl,sv,no,da,fi,pl",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
        setIsTranslateLoaded(true);
        setShowTranslateWidget(true);
      };

      document.head.appendChild(script);
    }
  }

  // Button click: just toggle widget visibility
  const handleTranslateClick = () => {
    if (!isTranslateLoaded) {
      initializeGoogleTranslate();
    } else {
      setShowTranslateWidget((prev) => !prev);
    }
  };

  // Figure out label for the button
  const buttonLabel =
    userLang !== "en" && translateWord[userLang]
      ? translateWord[userLang]
      : translateWord["en"];

  // Reserve space for widget to prevent shifting
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
        id="google_translate_element"
        className="mt-2 bg-black rounded-lg border border-gray-600 p-2"
        style={{
          display: showTranslateWidget ? "block" : "none",
          minHeight: 48,
          position: "relative"
        }}
      ></div>
      {!showTranslateWidget && (
        <div style={{ minHeight: 48, visibility: "hidden" }}></div>
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Hide Google Translate's top banner */
          .goog-te-banner-frame { display: none !important; }
          /* Keep font, font-size, and colors from Google Translate */
          body, body * {
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
          /* Prevent layout shift caused by injected spans */
          .goog-te-spinner-pos { display: none !important; }
          body { top: 0 !important; }
          `}}
      />
    </div>
  );
}
