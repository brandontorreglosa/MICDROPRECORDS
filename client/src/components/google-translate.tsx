import { useState } from "react";
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

  const initializeGoogleTranslate = () => {
    if (window.google && window.google.translate) {
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

  return (
    <div className="fixed top-20 right-4 z-40">
      <Button
        onClick={handleTranslateClick}
        variant="outline"
        size="sm"
        className="bg-black border-gray-600 text-white hover:bg-gray-800 hover:text-white"
        title="Translate Page"
      >
        <Globe className="h-4 w-4 mr-1" />
        Translate
      </Button>
      <div
        id="google_translate_element"
        className="mt-2 bg-black rounded-lg border border-gray-600 p-2"
        style={{ display: showTranslateWidget ? "block" : "none" }}
      ></div>
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
