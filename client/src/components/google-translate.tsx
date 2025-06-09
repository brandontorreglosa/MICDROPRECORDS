import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function GoogleTranslate() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "google-translate-script";
    if (document.getElementById(scriptId)) return;

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
      setWidgetLoaded(true);
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-40 w-64">
      <Button
        onClick={() => setWidgetLoaded((prev) => !prev)}
        variant="outline"
        size="sm"
        className="bg-black border-gray-600 text-white hover:bg-gray-800 hover:text-white w-full"
        title="Translate Page"
      >
        <Globe className="h-4 w-4 mr-1" />
        Translate
      </Button>
      <div
        ref={widgetRef}
        id="google_translate_element"
        className="mt-2 bg-black rounded-lg border border-gray-600 p-2"
        style={{
          display: widgetLoaded ? "block" : "none",
          minHeight: 48,
          position: "relative"
        }}
      />
      {/* Strongest possible font reset */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #root, #root * {
              font-family: inherit !important;
              font-size: inherit !important;
            }
            .goog-te-banner-frame { display: none !important; }
            body { top: 0 !important; }
          `
        }}
      />
    </div>
  );
}
