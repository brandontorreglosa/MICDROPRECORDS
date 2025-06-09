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
  const [userCountry, setUserCountry] = useState<string>("");

  useEffect(() => {
    // Get user's country from IP
    const getUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_code);
        
        // Auto-translate for non-English speaking countries
        const nonEnglishCountries = [
          'ES', 'FR', 'DE', 'IT', 'PT', 'RU', 'CN', 'JP', 'KR', 
          'AR', 'BR', 'MX', 'NL', 'SE', 'NO', 'DK', 'FI', 'PL'
        ];
        
        if (nonEnglishCountries.includes(data.country_code)) {
          setTimeout(() => {
            initializeGoogleTranslate();
          }, 2000);
        }
      } catch (error) {
        console.log('Could not detect user location');
      }
    };

    getUserLocation();
  }, []);

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
    } else {
      // Load Google Translate script
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
      };
      
      document.head.appendChild(script);
    }
  };

  const toggleTranslate = () => {
    if (!isTranslateLoaded) {
      initializeGoogleTranslate();
    } else {
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.style.display = translateElement.style.display === 'none' ? 'block' : 'none';
      }
    }
  };

  return (
    <div className="fixed top-20 right-4 z-40">
      <Button
        onClick={toggleTranslate}
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
        style={{ display: 'none' }}
      ></div>
      
      <style dangerouslySetInnerHTML={{
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
        `
      }} />
    </div>
  );
}