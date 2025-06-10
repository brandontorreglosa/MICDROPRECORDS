import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);
  const [showTranslateWidget, setShowTranslateWidget] = useState(false);
  const [userCountry, setUserCountry] = useState<string | null>(null);

  useEffect(() => {
    // Detect user country on mount
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setUserCountry(data.country_code))
      .catch(() => setUserCountry(null));
  }, []);

  const initializeGoogleTranslate = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'es,fr,de,it,pt,ru,zh,ja,ko,ar,nl,sv,no,da,fi,pl,el',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
      setIsTranslateLoaded(true);
      setShowTranslateWidget(true);
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'es,fr,de,it,pt,ru,zh,ja,ko,ar,nl,sv,no,da,fi,pl',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setIsTranslateLoaded(true);
        setShowTranslateWidget(true);
      };

      document.head.appendChild(script);
    }
  };

  const handleTranslateClick = () => {
    if (!isTranslateLoaded) {
      initializeGoogleTranslate();
    } else {
      setShowTranslateWidget((prev) => !prev);
    }
  };

  // Reserve space for the widget so the button doesn't move.
  // You can adjust the minHeight as needed for your UI.
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
        Translate
        {userCountry && !["US", "GB", "AU", "CA"].includes(userCountry) && (
          <span className="ml-2 text-xs text-yellow-400">(Detected: {userCountry})</span>
        )}
      </Button>
      <div
        id="google_translate_element"
        className="mt-2 bg-black rounded-lg border border-gray-600 p-2"
        style={{
          display: showTranslateWidget ? "block" : "none",
          minHeight: 48, // Reserve space so button doesn't jump; adjust as needed
          position: "relative"
        }}
      ></div>
      {/* Invisible placeholder to reserve vertical space for translate widget */}
      {!showTranslateWidget && (
        <div style={{ minHeight: 48, visibility: "hidden" }}></div>
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .goog-te-banner-frame {
            display: none !important;
          }
          .goog-te-menu-value {
            color: white !important;
          }
          .goog-te-gadget {
            color: white !important;
          }
          .goog-te-combo {
            background-color: #1f1f1f !important;
            color: white !important;
            border: 1px solid #4b5563 !important;
          }
          body {
            top: 0 !important;
          }
        `,
        }}
      />
    </div>
  );
}
