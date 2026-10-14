import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LANGUAGES, changeLanguage, loadGoogleTranslate, retranslate } from '../utils/translate';

// Floating language button (bottom-left) + hidden Google Translate widget container.
export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    loadGoogleTranslate();
  }, []);

  // Re-apply the chosen language after client-side navigation
  useEffect(() => {
    const t1 = setTimeout(retranslate, 150);
    const t2 = setTimeout(retranslate, 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, hash]);

  // Close popup on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const handleSelect = (code) => {
    changeLanguage(code);
    setOpen(false);
  };

  return (
    <>
      {/* Google Translate Hidden Container */}
      <div id="google_translate_element" className="google-translate-hidden" />

      {/* Floating Language Translator Button */}
      <div ref={wrapRef} className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
        <button
          id="floatingLangBtn"
          onClick={() => setOpen((v) => !v)}
          className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-slate-950 p-2.5 sm:p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none border-2 border-slate-900"
          title="Select Language"
        >
          <i className="fa-solid fa-language text-lg sm:text-xl md:text-2xl" />
        </button>

        {/* Language Selection Popup */}
        <div
          id="langPopup"
          className={`${open ? '' : 'hidden '}absolute bottom-14 sm:bottom-16 md:bottom-20 left-0 w-[calc(100vw-2.5rem)] max-w-xs sm:w-72 bg-neutral-950/95 border border-gold-500/25 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-4 text-slate-100 backdrop-blur-xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between border-b border-gold-500/20 pb-3 mb-3">
            <h3 className="font-bold text-gold-400 text-xs md:text-sm tracking-wide uppercase flex items-center">
              <i className="fa-solid fa-globe mr-2" /> Select Language
            </h3>
            <span className="text-[10px] md:text-xs text-gray-400 font-medium px-2 py-0.5 bg-neutral-800 rounded-full">
              {LANGUAGES.length} Options
            </span>
          </div>

          <div className="space-y-1 text-sm max-h-72 overflow-y-auto pr-2 custom-scrollbar">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200"
              >
                <span className="mr-3 text-base">{lang.flag}</span>
                <span className="font-medium text-xs md:text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
