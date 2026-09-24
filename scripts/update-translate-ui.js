const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'about.html', 'contact.html', 'packages.html', 'quran.html', 'services.html'];
const root = path.join(__dirname, '..');

const newHTML = `    <!-- Floating Language Translator Button (Right Side) -->
    <div class="fixed bottom-6 left-6 z-50">
        <!-- Floating Main Button -->
        <button id="floatingLangBtn" onclick="toggleLangPopup()"
            class="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-slate-950 p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none border-2 border-slate-900"
            title="Select Language">
            <i class="fa-solid fa-language text-xl md:text-2xl"></i>
        </button>

        <!-- Language Selection Popup -->
        <div id="langPopup"
            class="hidden absolute bottom-16 md:bottom-20 left-0 w-64 md:w-72 bg-neutral-950/90 border border-gold-500/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-4 text-slate-100 backdrop-blur-xl transition-all duration-300">
            <div class="flex items-center justify-between border-b border-gold-500/20 pb-3 mb-3">
                <h3 class="font-bold text-gold-400 text-xs md:text-sm tracking-wide uppercase flex items-center">
                    <i class="fa-solid fa-globe mr-2"></i> Select Language
                </h3>
                <span class="text-[10px] md:text-xs text-gray-400 font-medium px-2 py-0.5 bg-neutral-800 rounded-full">11 Options</span>
            </div>

            <!-- Languages List -->
            <div class="space-y-1 text-sm max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                <button onclick="changeLanguage('en')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇬🇧</span> <span class="font-medium text-xs md:text-sm">English</span>
                </button>
                <button onclick="changeLanguage('ur')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇵🇰</span> <span class="font-medium text-xs md:text-sm">Urdu (اردو)</span>
                </button>
                <button onclick="changeLanguage('ar')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇸🇦</span> <span class="font-medium text-xs md:text-sm">Arabic (العربية)</span>
                </button>
                <button onclick="changeLanguage('bn')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇧🇩</span> <span class="font-medium text-xs md:text-sm">Bengali (বাংলা)</span>
                </button>
                <button onclick="changeLanguage('hi')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇮🇳</span> <span class="font-medium text-xs md:text-sm">Hindi (हिन्दी)</span>
                </button>
                <button onclick="changeLanguage('tr')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇹🇷</span> <span class="font-medium text-xs md:text-sm">Turkish (Türkçe)</span>
                </button>
                <button onclick="changeLanguage('zh-CN')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇨🇳</span> <span class="font-medium text-xs md:text-sm">Chinese (中文)</span>
                </button>
                <button onclick="changeLanguage('ja')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇯🇵</span> <span class="font-medium text-xs md:text-sm">Japanese (日本語)</span>
                </button>
                <button onclick="changeLanguage('ko')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇰🇷</span> <span class="font-medium text-xs md:text-sm">Korean (한국어)</span>
                </button>
                <button onclick="changeLanguage('es')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇪🇸</span> <span class="font-medium text-xs md:text-sm">Spanish (Español)</span>
                </button>
                <button onclick="changeLanguage('fr')" class="w-full text-left flex items-center p-2 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200">
                    <span class="mr-3 text-base">🇫🇷</span> <span class="font-medium text-xs md:text-sm">French (Français)</span>
                </button>
            </div>
        </div>
    </div>`;

pages.forEach(page => {
  const filePath = path.join(root, page);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace everything from <!-- Floating Language Translator Button (Right Side) --> down to the closing </div> of that block
  const regex = /<!-- Floating Language Translator Button \(Right Side\) -->[\s\S]*?<!-- Google Translate Core Script \& Robust Handler -->/;
  
  if (regex.test(content)) {
    content = content.replace(regex, newHTML + '\n\n    <!-- Google Translate Core Script & Robust Handler -->');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated translate UI in: ${page}`);
  } else {
    console.log(`⚠️  Could not find translate block in: ${page}`);
  }
});

console.log('All pages done!');
