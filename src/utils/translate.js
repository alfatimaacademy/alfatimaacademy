// Helpers around the Google Translate widget.

export const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'ur', flag: '🇵🇰', name: 'Urdu (اردو)' },
  { code: 'ar', flag: '🇸🇦', name: 'Arabic (العربية)' },
  { code: 'bn', flag: '🇧🇩', name: 'Bengali (বাংলা)' },
  { code: 'hi', flag: '🇮🇳', name: 'Hindi (हिन्दी)' },
  { code: 'tr', flag: '🇹🇷', name: 'Turkish (Türkçe)' },
  { code: 'zh-CN', flag: '🇨🇳', name: 'Chinese (中文)' },
  { code: 'ja', flag: '🇯🇵', name: 'Japanese (日本語)' },
  { code: 'ko', flag: '🇰🇷', name: 'Korean (한국어)' },
  { code: 'es', flag: '🇪🇸', name: 'Spanish (Español)' },
  { code: 'fr', flag: '🇫🇷', name: 'French (Français)' },
];

const INCLUDED_LANGUAGES = LANGUAGES.map((l) => l.code).join(',');

// Loads the Google Translate script once.
export function loadGoogleTranslate() {
  window.googleTranslateElementInit = () => {
    if (!window.google || !window.google.translate) return;
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: INCLUDED_LANGUAGES, autoDisplay: false },
      'google_translate_element'
    );
  };

  if (document.getElementById('google-translate-script')) return;
  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

// Same logic as the original changeLanguage(): set the cookie, drive the hidden <select>,
// and reload if the widget did not pick the change up.
export function changeLanguage(langCode) {
  document.cookie = 'googtrans=/en/' + langCode + '; path=/; domain=' + window.location.hostname;
  document.cookie = 'googtrans=/en/' + langCode + '; path=/';

  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Reload to apply the translation cleanly if the select box missed it
  setTimeout(() => {
    const combo = document.querySelector('.goog-te-combo');
    if (!combo || combo.value !== langCode) {
      window.location.reload();
    }
  }, 300);
}

// Language currently active (from the googtrans cookie), or null for English / none.
export function getActiveLanguage() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (!match) return null;
  const lang = decodeURIComponent(match[1]).split('/')[2];
  return lang && lang !== 'en' ? lang : null;
}

// The site is now a single-page app: when the route changes, new (English) text is rendered
// without a page load, so ask the widget to translate it again.
export function retranslate() {
  const lang = getActiveLanguage();
  if (!lang) return;
  const combo = document.querySelector('.goog-te-combo');
  if (!combo) return;
  combo.value = lang;
  combo.dispatchEvent(new Event('change', { bubbles: true }));
}
