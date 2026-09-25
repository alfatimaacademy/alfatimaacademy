/**
 * chatbot-widget.js
 * ----------------------------------------------------------------
 * Al Fatima Academy — Website Support Chatbot
 *
 * A self-contained, dependency-free FAQ / support assistant for the
 * whole site. It injects its own CSS + HTML, so it can be dropped
 * into ANY page with a single <script> tag — no build step.
 *
 * HOW IT ANSWERS (local-first):
 *   1. Clear, short questions (fees, packages, trial, contact ...)
 *      are answered instantly from the built-in KNOWLEDGE BASE.
 *   2. Longer / natural questions go to the AI route (/api/chatbot).
 *   3. If the AI route is slow, busy or down, the widget falls back
 *      to the best matching built-in answer, so visitors never see a
 *      confusing error for a normal academy question.
 *
 * (The Gemini API key lives ONLY on the server, in Vercel env vars.)
 *
 * It is already auto-loaded on every page by components-loader.js,
 * so you normally do NOT need to add anything to the HTML files.
 *
 * All facts below (courses, contact numbers, plans, etc.) are taken
 * directly from the website's own pages. If you update a fact on the
 * site (a phone number, a plan, a course), update it here too, in
 * the CONFIG / KNOWLEDGE_BASE section.
 * ----------------------------------------------------------------
 */

(function () {
  'use strict';

  // ==================================================================
  // 1. CONFIG — edit these if a fact on the website changes
  // ==================================================================
  const CONFIG = {
    academyName: 'Al Fatima Academy',
    parentOrg: 'Al Quran International',
    whatsapp: '923075329240',                 // digits only, used for wa.me links
    whatsappDisplay: '+92 307 5329240',
    email: 'info@alquraninternational.com',
    location: 'Lahore, Punjab, Pakistan (serving students worldwide)',
    founder: 'Qari Muhammad Shafiq Raza',
    aiEndpoint: '/api/chatbot',
    aiTimeoutMs: 30000,             // server may try several models (max ~22s)
    storageKey: 'afa_chatbot_history_v1',
    openStateKey: 'afa_chatbot_open_v1'
  };

  const WHATSAPP_LINK = (msg) =>
    `https://wa.me/${CONFIG.whatsapp}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;

  // ==================================================================
  // 2. KNOWLEDGE BASE — every topic the bot can answer
  // ==================================================================
  // Each entry: id, keywords (English + Roman Urdu, for matching only),
  // reply (HTML string), and optional quickReplies (ids shown as chips
  // after this answer).
  const KB = [
    {
      id: 'greeting',
      keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'salam', 'assalam o alaikum', 'assalamualaikum', 'aoa', 'سلام', 'السلام علیکم'],
      reply: `Welcome to <b>${CONFIG.academyName}</b>. I’m here to assist you with our website, courses, fees, classes, free trial, registration, schedules, and contact information.<br>How can I help you today?`,
      quickReplies: ['courses', 'trial', 'packages', 'contact']
    },
    {
      id: 'about_academy',
      keywords: ['about academy', 'who are you', 'what is al fatima academy', 'academy information', 'academy kya hai', 'about us', 'introduction', 'al quran international', 'al fatima academy'],
      reply: `<b>${CONFIG.academyName}</b> is a project of <b>${CONFIG.parentOrg}</b>. The academy provides professional online Quran-learning programs with personalized 1-on-1 sessions for children and adults worldwide.<br><br>Our website highlights certified tutors, flexible scheduling, live classes through Zoom and Google Meet, and a 3-day free trial.`,
      quickReplies: ['courses', 'teachers', 'trial']
    },
    {
      id: 'mission',
      keywords: ['mission', 'what is your mission', 'why al fatima academy', 'learning environment', 'teaching approach'],
      reply: `Al Fatima Academy’s website describes its mission as making Quran learning accessible, correct, interactive, and professional for students worldwide.<br><br>The academy emphasizes personalized 1-on-1 attention, flexible scheduling, certified educators, and a focused learning environment.`,
      quickReplies: ['teachers', 'courses', 'timings']
    },
    {
      id: 'courses',
      keywords: ['course', 'courses', 'service', 'services', 'program', 'programs', 'what do you teach', 'what can i learn', 'subjects', 'classes offered', 'study options', 'kya parhate', 'kya sikhate', 'kon se course', 'what services do you provide', 'what are your services', 'what are your service', 'کورس', 'کورسز'],
      reply: `Our main website programs are:<br><br>1. <b>Noorani / Madni Qaida</b> — Quran-reading foundation for beginners.<br>2. <b>Tajweed-ul-Quran</b>  pronunciation, articulation, and Tajweed rules.<br>3. <b>Nazra &amp; Hifz Quran</b> — fluent Quran reading and memorization.<br>4. <b>Islamic Supplications &amp; Etiquette</b> — daily Duas, Kalimas, Salah training, and Islamic manners.<br><br>For full descriptions, please visit the <a href="/services" target="_blank">Services page</a>.`,
      quickReplies: ['course_qaida', 'course_tajweed', 'course_hifz', 'course_duas']
    },
    {
      id: 'course_qaida',
      keywords: ['noorani qaida', 'madni qaida', 'qaida', 'qaida course', 'quran reading foundation', 'arabic letters', 'makharij beginner', 'beginner quran course'],
      reply: `<b>Noorani / Madni Qaida</b> is the foundation program for beginners, children, and adults who want to build correct Quran-reading skills from the start.<br><br>The website says students learn Arabic letters and their articulation (Makharij), letter joining, Harakat such as Fatha, Kasra, Damma, Tanween and Sukun, plus basic Tajweed and step-by-step word formation.<br><a href="/services" target="_blank">View the Services page →</a>`,
      quickReplies: ['trial', 'packages', 'teachers']
    },
    {
      id: 'course_tajweed',
      keywords: ['tajweed', 'tajwid', 'tajweed course', 'recitation', 'pronunciation', 'makharij', 'ghunnah', 'ikhfa', 'idgham', 'iqlab', 'izhar', 'madd', 'waqf'],
      reply: `<b>Tajweed-ul-Quran</b> focuses on correct Quran recitation and pronunciation.<br><br>The website covers Makharij-al-Huroof, Ghunnah, Ikhfa, Idgham, Iqlab, Izhar, Noon and Meem Sakinah, Madd rules, Waqf signs, and vocal control and accent.`,
      quickReplies: ['trial', 'packages', 'teachers']
    },
    {
      id: 'course_hifz',
      keywords: ['hifz', 'hafiz', 'memorize quran', 'memorization', 'hifz course', 'quran memorization', 'nazra', 'nazrah', 'quran reading', 'surah memorization', 'sabaq', 'sabaqi', 'manzil'],
      reply: `<b>Nazra &amp; Hifz Quran</b> combines fluent Quran reading with structured memorization support.<br><br>The website says students can work toward selected Surahs, selected portions, or the complete Quran. The Hifz structure includes <b>Sabaq</b> (new lesson), <b>Sabaqi</b> (recent revision), and <b>Manzil</b> (older revision), with Tajweed integrated throughout.`,
      quickReplies: ['trial', 'packages', 'teachers']
    },
    {
      id: 'course_duas',
      keywords: ['duas', 'dua', 'islamic supplications', 'supplications', 'kalimas', 'six kalimas', 'namaz', 'salah', 'wudu', 'akhlaq', 'islamic manners', 'etiquette'],
      reply: `<b>Islamic Supplications &amp; Etiquette</b> is a website program for children, young adults, and beginners.<br><br>It covers daily Masnoon Duas, the 6 Kalimas, practical Wudu and Salah training, Islamic manners (Akhlaq), short Surahs, basic Islamic history, and foundational Sunnah habits.`,
      quickReplies: ['trial', 'packages', 'teachers']
    },
    {
      id: 'trial',
      keywords: ['ٹرائل', 'فری ٹرائل', 'مفت کلاس', 'trial', 'free trial', '3 day trial', '3-day trial', 'free class', 'demo class', 'try a class', 'trial class', 'free demo', 'muft class'],
      reply: `Yes. The website offers a <b>3-day free trial</b> with no credit card required.<br><br>You can apply through the registration form on the <a href="/" target="_blank">Home</a> or <a href="/services" target="_blank">Services</a> page. The website says an administrator or representative will contact you within 24 hours to arrange the trial.`,
      quickReplies: ['register', 'packages', 'contact']
    },
    {
      id: 'register',
      keywords: ['register', 'registration', 'enroll', 'enrollment', 'admission', 'join', 'sign up', 'apply', 'how to join', 'how do i register', 'admission kaise', 'join kaise', 'داخلہ', 'رجسٹریشن'],
      reply: `You can register through the application form on the website’s <a href="/" target="_blank">Home</a> or <a href="/services" target="_blank">Services</a> page.<br><br>The form asks for your name, WhatsApp number, course interest, country/timezone, and preferred timing or special instructions. You can also contact the academy directly for assistance.`,
      quickReplies: ['trial', 'courses', 'contact']
    },
    {
      id: 'packages',
      keywords: ['fee', 'fees', 'price', 'prices', 'pricing', 'package', 'packages', 'plan', 'plans', 'cost', 'rate', 'rates', 'tuition', 'monthly fee', 'monthly charges', 'fee structure', 'charges', 'kitni fee', 'kitni fees', 'fees kitni', 'kitna paisa', 'kitne paise', 'فیس', 'پیکج', 'پیکجز', 'قیمت'],
      reply: `The website has three flexible 1-on-1 plans:<br><br><b>Basic</b> — 2 days/week, 8 classes/month, 30-minute live classes, basic Tajweed &amp; Qaida, and essential daily Duas.<br><b>Standard</b> — 3 days/week, 12 classes/month, 30-minute live classes, proper Tajweed, Quran recitation &amp; Hifz, plus a monthly progress report.<br><b>Intensive</b> — 5 days/week, 20 classes/month, full Hifz focus, advanced pronunciation, flexible time adjustments, and a senior Quran teacher.<br><br>The website uses country selection to display customized monthly pricing.`,
      quickReplies: ['trial', 'contact', 'course_hifz']
    },
    {
      id: 'pricing_countries',
      keywords: ['country pricing', 'country fee', 'pakistan fee', 'canada fee', 'uk fee', 'china fee', 'uae fee', 'bangladesh fee', 'pkr', 'cad', 'gbp', 'cny', 'aed', 'bdt', 'currency'],
      reply: `The <a href="/packages" target="_blank">Packages</a> page lets visitors choose a country to view customized monthly plans.<br><br>Available country/currency options shown on the website are Pakistan (PKR), Canada/UK ($ / £), China (CNY ¥), UAE (AED), and Bangladesh (BDT ৳).`,
      quickReplies: ['packages', 'contact']
    },
    {
      id: 'duration',
      keywords: ['duration', 'class duration', 'how long is class', '30 minutes', 'class length', 'frequency', 'how many classes', 'days per week', 'schedule frequency'],
      reply: `The website’s standard live class length is <b>30 minutes</b> and classes are conducted 1-on-1.<br><br>Plan frequency is 2 days/week for Basic, 3 days/week for Standard, and 5 days/week for Intensive.`,
      quickReplies: ['packages', 'timings']
    },
    {
      id: 'teachers',
      keywords: ['teacher', 'teachers', 'tutor', 'tutors', 'qari', 'qari sahab', 'huffaz', 'hafiz teacher', 'female teacher', 'female tutor', 'lady teacher', 'lady tutor', 'male teacher', 'instructor', 'qualified tutor', 'founder', 'qari muhammad shafiq raza', 'ustad', 'ustani', 'استاد', 'ٹیچر', 'قاری'],
      reply: `The website describes its teachers as <b>certified Huffaz and Qaris</b> with experience in Arabic phonetics and Quranic recitation.<br><br><b>Qari Muhammad Shafiq Raza</b> is presented as the founder and senior Quran teacher with <b>15+ years</b> of online and offline teaching experience.<br><br>Female tutors are also available for sisters and young girls.`,
      quickReplies: ['courses', 'trial']
    },
    {
      id: 'platform',
      keywords: ['zoom', 'google meet', 'online class', 'class platform', 'how classes work', 'video call', 'software', 'virtual class'],
      reply: `Classes are conducted live through <b>Zoom</b> or <b>Google Meet</b>.<br><br>The website presents Zoom as the video classroom option and Google Meet as a browser-based option. Students receive the class link from the tutor or administration.`,
      quickReplies: ['timings', 'trial']
    },
    {
      id: 'timings',
      keywords: ['timing', 'timings', 'schedule', 'class time', 'what time', 'when are classes', '24/7', 'timezone', 'time zone', 'kab class', 'classes kab', 'available time', 'ٹائمنگ'],
      reply: `The academy website states that classes operate <b>24 hours a day, 7 days a week</b> so schedules can be adjusted for students in different time zones.<br><br>Your preferred timing can be provided during registration.`,
      quickReplies: ['trial', 'contact']
    },
    {
      id: 'age_group',
      keywords: ['age group', 'age limit', 'what age', 'kids', 'children', 'adults', 'child', 'for kids', 'for adults', 'all ages', 'bachay', 'bache', 'umar', 'who can join'],
      reply: `The website says its learning programs are available for <b>children and adults of all ages</b>, from beginners to students who want to refine their Quran reading and Tajweed. Sessions are personalized to the learner’s pace.`,
      quickReplies: ['courses', 'trial', 'teachers']
    },
    {
      id: 'location',
      keywords: ['location', 'address', 'where are you', 'where is academy', 'office', 'head office', 'based in', 'country', 'kahan', 'lahore'],
      reply: `The academy’s head office is listed in <b>Lahore, Punjab, Pakistan</b>. The website operates globally online, so students can join from different countries.`,
      quickReplies: ['contact', 'timings']
    },
    {
      id: 'contact',
      keywords: ['contact', 'phone', 'phone number', 'contact number', 'whatsapp number', 'whatsapp', 'call', 'email', 'email address', 'support', 'hotline', 'reach you', 'contact us', 'رابطہ', 'واٹس ایپ'],
      reply: `You can contact <b>${CONFIG.academyName}</b> by email at <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>.<br><br>The Home page lists <b>Call / WhatsApp: ${CONFIG.whatsappDisplay}</b>. The Contact page separately lists a <b>Direct Support Hotline: +92 307 4277240</b>.<br><br>You can also use the <a href="/contact" target="_blank">Contact page</a> to send a message.`,
      quickReplies: ['trial', 'packages']
    },
    {
      id: 'quran_reader',
      keywords: ['read quran', 'quran reader', 'online quran reader', 'read holy quran', 'para', 'juz', 'surah', 'quran page', 'quran reading page', 'mushaf'],
      reply: `The website includes an <b>Interactive Quran Reader</b> where you can choose a <b>Para (Juz)</b> or <b>Surah</b> and adjust the Arabic text size for comfortable reading.<br><br>Open the <a href="/quran" target="_blank">Read Quran</a> page to use it.`,
      quickReplies: ['courses', 'contact']
    },
    {
      id: 'languages',
      keywords: ['language', 'languages', 'translate', 'translation', 'urdu language', 'arabic language', 'bengali', 'hindi', 'turkish', 'chinese', 'japanese', 'korean', 'spanish', 'french', 'language options'],
      reply: `The website provides a language selector with <b>11 options</b>: English, Urdu, Arabic, Bengali, Hindi, Turkish, Chinese, Japanese, Korean, Spanish, and French.`,
      quickReplies: ['contact']
    },
    {
      id: 'payment',
      keywords: ['payment', 'pay', 'how to pay', 'payment method', 'bank transfer', 'easypaisa', 'jazzcash', 'credit card', 'refund', 'cancel', 'cancellation'],
      reply: `The public website content does not specify a complete list of payment methods or a detailed cancellation/refund policy.<br><br>For the correct payment information for your country, please contact the academy through the <a href="/contact" target="_blank">Contact page</a> or WhatsApp.`,
      quickReplies: ['contact', 'packages']
    },
    {
      id: 'registration_options',
      keywords: ['registration courses', 'form courses', 'course selection', 'form option', 'available courses in form', 'admission form courses'],
      reply: `The registration forms on the website show course options including <b>Madni Qaida, Tajweed Course, Nazra Quran, Basic Islam/Duas, Nimaz, Hadis,</b> and <b>Tarjuma Quran</b>.<br><br>The main Services page presents the academy’s four primary program groups; the registration form provides the more detailed selection list.`,
      quickReplies: ['courses', 'register']
    },
    {
      id: 'website_pages',
      keywords: ['pages', 'website pages', 'menu', 'navigation', 'where can i find', 'site map', 'website sections'],
      reply: `The website includes <a href="/" target="_blank">Home</a>, <a href="/about" target="_blank">About Us</a>, <a href="/services" target="_blank">Services</a>, <a href="/packages" target="_blank">Packages</a>, <a href="/quran" target="_blank">Read Quran</a>, and <a href="/contact" target="_blank">Contact</a> pages.`,
      quickReplies: ['courses', 'contact']
    },
    {
      id: 'thanks',
      keywords: ['thanks', 'thank you', 'thankyou', 'shukriya', 'jazakallah', 'appreciate it'],
      reply: `You’re welcome. Is there anything else I can help you with regarding <b>${CONFIG.academyName}</b>?`,
      quickReplies: ['courses', 'trial', 'contact']
    },
    {
      id: 'bye',
      keywords: ['bye', 'goodbye', 'see you', 'allah hafiz', 'khuda hafiz', 'ok bye'],
      reply: `Thank you for visiting <b>${CONFIG.academyName}</b>. We’re here whenever you need assistance.`,
      quickReplies: []
    }
  ];

  const QUICK_LABELS = {
    courses: '📚 Our Courses',
    course_qaida: 'Noorani Qaida',
    course_tajweed: 'Tajweed-ul-Quran',
    course_hifz: 'Hifz Quran',
    course_duas: 'Islamic Duas',
    trial: '🎁 Free Trial',
    register: 'How to Enroll',
    packages: '💰 Fees & Packages',
    duration: 'Class Duration',
    teachers: '👳 Our Teachers',
    platform: 'Zoom / Meet?',
    timings: '⏰ Timings',
    age_group: 'Age Groups',
    location: 'Location',
    contact: '📞 Contact Us',
    quran_reader: '📖 Read Quran',
    languages: 'Languages',
    payment: 'Payment Info',
    sitemap: 'Site Map'
  };

  const OUT_OF_SCOPE_REPLY = `Sorry, I can only help with <b>${CONFIG.academyName}</b> and this website. Please ask me about our courses, classes, fees, trial, registration, timings, or contact details.`;
  const TEMP_REPLY = `Our assistant is a little busy right now, so I couldn’t answer that fully. Please try again in a moment, or ask our team directly on <a href="${WHATSAPP_LINK('')}" target="_blank" rel="noopener">WhatsApp</a> or via the <a href="/contact" target="_blank">Contact page</a>.`;
  const FALLBACK_QUICK = ['courses', 'trial', 'packages', 'contact'];

  // ==================================================================
  // 3. MATCHING ENGINE + AI SUPPORT
  // ==================================================================
  function normalize(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')   // keeps English + Urdu/Arabic letters
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findById(id) {
    return KB.find(e => e.id === id) || null;
  }

  // When two answers match equally well, the more important one wins.
  const PRIORITY = {
    packages: 3, trial: 3, contact: 3,
    register: 2, courses: 2, timings: 2, teachers: 2, pricing_countries: 2, duration: 2,
    greeting: 0, thanks: 0, bye: 0
  };
  const entryPriority = (entry) => (PRIORITY[entry.id] ?? 1);

  // Every KB entry that matches, best first.
  function rankEntries(userText) {
    const text = ' ' + normalize(userText) + ' ';
    const ranked = [];

    KB.forEach((entry, index) => {
      let score = 0;
      entry.keywords.forEach(kw => {
        const k = ' ' + normalize(kw) + ' ';
        if (k.trim() && text.includes(k)) score += kw.split(' ').length;
      });
      if (score > 0) ranked.push({ entry, score, index });
    });

    ranked.sort((a, b) =>
      b.score - a.score ||
      entryPriority(b.entry) - entryPriority(a.entry) ||
      a.index - b.index
    );
    return ranked;
  }

  // Local-first routing.
  // Returns { local: entry|null }.  local === null  ->  ask the AI.
  const MAX_LOCAL_WORDS = 7;

  function decideRoute(userText) {
    const normalized = normalize(userText);
    const words = normalized ? normalized.split(' ').length : 0;
    const ranked = rankEntries(userText);
    if (!ranked.length) return { local: null };

    const top = ranked[0];
    const second = ranked[1];

    // 1) The whole message is exactly one of the keywords ("packages", "fees" ...)
    if (top.entry.keywords.some(kw => normalized === normalize(kw))) {
      return { local: top.entry };
    }

    // 2) Short message and one topic clearly wins
    if (words <= MAX_LOCAL_WORDS) {
      if (!second || top.score > second.score) return { local: top.entry };
      if (top.score === second.score &&
          entryPriority(top.entry) > entryPriority(second.entry)) {
        return { local: top.entry };
      }
    }

    // 3) Long / multi-topic / unclear -> AI
    return { local: null };
  }

  // Used when the AI route is busy or down: best built-in answer(s).
  // If two topics match equally (e.g. "trial and fees"), show both.
  function localFallback(userText) {
    const ranked = rankEntries(userText);
    if (!ranked.length) return null;

    const best = ranked[0].score;
    const picks = ranked
      .filter(r => r.score === best && r.entry.id !== 'greeting')
      .slice(0, 2)
      .map(r => r.entry);

    if (!picks.length) return null;
    if (picks.length === 1) return picks[0];

    const chips = [];
    picks.forEach(e => (e.quickReplies || []).forEach(id => {
      if (!chips.includes(id)) chips.push(id);
    }));

    return {
      id: 'combined',
      reply: picks.map(e => e.reply).join('<br><br>'),
      quickReplies: chips.slice(0, 4)
    };
  }

  function stripHtml(html) {
    return String(html || '')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Facts that are always useful for the AI, plus the best matches.
  const CORE_KNOWLEDGE_IDS = [
    'packages', 'pricing_countries', 'courses', 'trial', 'register',
    'contact', 'timings', 'teachers', 'duration', 'about_academy'
  ];

  function websiteKnowledgeForAI(userText) {
    const ids = [];
    rankEntries(userText).slice(0, 4).forEach(r => ids.push(r.entry.id));
    CORE_KNOWLEDGE_IDS.forEach(id => { if (!ids.includes(id)) ids.push(id); });

    return ids
      .slice(0, 12)
      .map(id => findById(id))
      .filter(Boolean)
      .map(entry => ({ id: entry.id, answer: stripHtml(entry.reply) }));
  }

  // Must be called BEFORE the new user message is pushed to `history`,
  // so the current question is not sent twice.
  function getRecentHistoryForAI() {
    const items = history
      .slice(-8)
      .map(msg => ({
        role: msg.who === 'user' ? 'user' : 'assistant',
        content: stripHtml(msg.html)
      }))
      .filter(m => m.content);

    // The conversation must start with a user turn (drop the greeting)
    while (items.length && items[0].role !== 'user') items.shift();
    return items;
  }

  async function askAi(question, aiHistory) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CONFIG.aiTimeoutMs);

    try {
      const response = await fetch(CONFIG.aiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          history: aiHistory,
          websiteKnowledge: websiteKnowledgeForAI(question)
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`AI request failed: ${response.status}`);
      }

      const data = await response.json();
      const scope = ['in_scope', 'out_of_scope', 'temporary'].includes(data.scope)
        ? data.scope
        : 'temporary';

      return { scope, answer: String(data.answer || '').trim() };
    } finally {
      clearTimeout(timer);
    }
  }

  function textToHtml(text) {
    return escapeHtml(text).replace(/\r?\n/g, '<br>');
  }

  // ==================================================================
  // 4. STYLES
  // ==================================================================
  const CSS = `
  .afa-cb-launcher {
    position: fixed; right: 24px; bottom: 24px; z-index: 99998;
    width: 56px; height: 56px; border-radius: 50%; border: 2px solid #0f172a;
    background: linear-gradient(to right, #e5c060, #bca02d); color: #0f172a; font-size: 24px; 
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 20px rgba(212,175,55,0.4); cursor: pointer;
    transition: all 0.3s ease;
  }
  .afa-cb-launcher:hover { 
    transform: translateY(-4px) scale(1.05); 
    background: linear-gradient(to right, #f2d472, #D4AF37); 
    box-shadow: 0 0 30px rgba(212,175,55,0.6); 
  }
  .afa-cb-launcher .afa-cb-dot {
    position: absolute; top: -3px; right: -3px; width: 11px; height: 11px; border-radius: 50%;
    background: #30c46b; border: 2px solid #0d0d0d; display: none;
  }
  .afa-cb-launcher.afa-has-badge .afa-cb-dot { display: block; }

  .afa-cb-panel {
    position: fixed; right: 22px; bottom: 88px; z-index: 99999;
    width: 360px; max-width: calc(100vw - 28px);
    height: 520px; max-height: calc(100vh - 120px);
    background: #111; border: 1px solid rgba(255,255,255,.09); border-radius: 16px;
    box-shadow: 0 22px 55px rgba(0,0,0,.42);
    display: none; flex-direction: column; overflow: hidden;
    font-family: 'Poppins', Arial, sans-serif;
  }
  .afa-cb-panel.afa-open { display: flex; }

  .afa-cb-header {
    background: #141414; border-bottom: 1px solid rgba(255,255,255,.08);
    padding: 13px 15px; display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }
  .afa-cb-avatar {
    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
    background: #1d1d1d; border: 1px solid rgba(212,175,55,.45);
    display: flex; align-items: center; justify-content: center; color: #e5c060; font-size: 12px; font-weight: 700;
    letter-spacing: .4px;
  }
  .afa-cb-title { flex: 1; min-width: 0; }
  .afa-cb-title b { color: #f1f1f1; font-size: 13.5px; font-weight: 600; display: block; letter-spacing: .1px; }
  .afa-cb-title span { color: #8f8f8f; font-size: 10.5px; display: flex; align-items: center; gap: 5px; margin-top: 2px; }
  .afa-cb-title span::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #30c46b; display: inline-block; }
  .afa-cb-headbtn {
    background: transparent; border: none; color: #858585; font-size: 14px; cursor: pointer;
    width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    transition: background .18s, color .18s;
  }
  .afa-cb-headbtn:hover { background: rgba(255,255,255,.06); color: #e5c060; }

  .afa-cb-body {
    flex: 1; overflow-y: auto; padding: 14px 12px; background: #0f0f0f;
    display: flex; flex-direction: column; gap: 9px;
  }
  .afa-cb-body::-webkit-scrollbar { width: 5px; }
  .afa-cb-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,.10); border-radius: 6px; }

  .afa-cb-row { display: flex; gap: 7px; align-items: flex-end; }
  .afa-cb-row.afa-user { justify-content: flex-end; }
  .afa-cb-bubble {
    max-width: 82%; padding: 9px 11px; border-radius: 12px; font-size: 12.8px; line-height: 1.5;
    word-wrap: break-word;
  }
  .afa-cb-row.afa-bot .afa-cb-bubble { background: #191919; color: #e3e3e3; border-bottom-left-radius: 4px; border: 1px solid rgba(255,255,255,.055); }
  .afa-cb-row.afa-user .afa-cb-bubble { background: #d4af37; color: #151515; border-bottom-right-radius: 4px; font-weight: 500; }
  .afa-cb-bubble a { color: #e5c060; text-decoration: underline; }
  .afa-cb-row.afa-user .afa-cb-bubble a { color: #151515; text-decoration: underline; }
  .afa-cb-mini-avatar {
    width: 22px; height: 22px; border-radius: 7px; flex-shrink: 0; margin-bottom: 2px;
    background: #1d1d1d; border: 1px solid rgba(212,175,55,.42); color: #e5c060;
    display: flex; align-items: center; justify-content: center; font-size: 7px; font-weight: 700;
  }

  .afa-cb-typing { display: flex; gap: 4px; padding: 3px 1px; }
  .afa-cb-typing span {
    width: 5px; height: 5px; border-radius: 50%; background: #b8932d; opacity: .55;
    animation: afaTyping 1s infinite ease-in-out;
  }
  .afa-cb-typing span:nth-child(2) { animation-delay: .15s; }
  .afa-cb-typing span:nth-child(3) { animation-delay: .3s; }
  @keyframes afaTyping { 0%,60%,100% { transform: translateY(0); opacity: .35; } 30% { transform: translateY(-3px); opacity: 1; } }

  .afa-cb-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 1px; padding-left: 29px; }
  .afa-cb-chip {
    background: #151515; border: 1px solid rgba(212,175,55,.35); color: #d9bb65;
    font-size: 11px; padding: 5px 8px; border-radius: 8px; cursor: pointer; white-space: nowrap;
    transition: background .18s, border-color .18s, color .18s;
  }
  .afa-cb-chip:hover { background: #1b1b1b; border-color: rgba(212,175,55,.65); color: #f1d78a; }

  .afa-cb-footer { border-top: 1px solid rgba(255,255,255,.08); padding: 9px; flex-shrink: 0; background: #121212; }
  .afa-cb-wa {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    background: transparent; border: 1px solid rgba(37,211,102,.35); color: #52d989;
    font-size: 10.5px; font-weight: 600; padding: 7px; border-radius: 8px; margin-bottom: 7px;
    text-decoration: none; transition: background .18s, border-color .18s;
  }
  .afa-cb-wa:hover { background: rgba(37,211,102,.06); border-color: rgba(37,211,102,.55); }
  .afa-cb-inputwrap { display: flex; gap: 7px; align-items: center; }
  .afa-cb-input {
    flex: 1; background: #181818; border: 1px solid rgba(255,255,255,.10); color: #f1f1f1;
    padding: 9px 12px; border-radius: 10px; font-size: 12.8px; outline: none; font-family: inherit;
  }
  .afa-cb-input::placeholder { color: #747474; }
  .afa-cb-input:focus { border-color: rgba(212,175,55,.55); }
  .afa-cb-send {
    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0; border: 1px solid rgba(212,175,55,.45); cursor: pointer;
    background: #d4af37; color: #151515; font-size: 13px;
    display: flex; align-items: center; justify-content: center; transition: transform .15s, background .15s;
  }
  .afa-cb-send:hover { transform: translateY(-1px); background: #e2c35a; }
  .afa-cb-send:disabled { opacity: .5; cursor: default; transform: none; }

  @media (max-width: 480px) {
    .afa-cb-panel { right: 12px; left: 12px; width: auto; bottom: 86px; height: 72vh; }
    .afa-cb-launcher { right: 24px; bottom: 24px; width: 48px; height: 48px; font-size: 20px; }
  }
  `;

  // ==================================================================
  // 5. DOM BUILD
  // ==================================================================
  function injectStyles() {
    if (document.getElementById('afa-cb-styles')) return;
    const style = document.createElement('style');
    style.id = 'afa-cb-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function buildWidget() {
    const wrap = document.createElement('div');
    wrap.id = 'afa-chatbot-root';
    wrap.innerHTML = `
      <button class="afa-cb-launcher" id="afaCbLauncher" title="Chat with us" aria-label="Open chat">
        <i class="fa-solid fa-headset" id="afaCbLauncherIcon"></i>
        <span class="afa-cb-dot"></span>
      </button>

      <div class="afa-cb-panel" id="afaCbPanel" role="dialog" aria-label="Al Fatima Academy chat support">
        <div class="afa-cb-header">
          <div class="afa-cb-avatar">AFA</div>
          <div class="afa-cb-title">
            <b>${CONFIG.academyName}</b>
            <span>Customer Support</span>
          </div>
          <button class="afa-cb-headbtn" id="afaCbRestart" title="Restart chat"><i class="fa-solid fa-rotate-right"></i></button>
          <button class="afa-cb-headbtn" id="afaCbClose" title="Close"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="afa-cb-body" id="afaCbBody"></div>

        <div class="afa-cb-footer">
          <a class="afa-cb-wa" id="afaCbWaLink" href="${WHATSAPP_LINK('')}" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> Chat with our team on WhatsApp
          </a>
          <div class="afa-cb-inputwrap">
            <input type="text" class="afa-cb-input" id="afaCbInput" placeholder="Type your question..." autocomplete="off" maxlength="300" />
            <button class="afa-cb-send" id="afaCbSend" title="Send"><i class="fa-solid fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);
  }

  // ==================================================================
  // 6. CHAT LOGIC
  // ==================================================================
  let history = [];   // [{who:'bot'|'user', html, chips:[ids]}]
  let els = {};

  function loadHistory() {
    try {
      const raw = sessionStorage.getItem(CONFIG.storageKey);
      history = raw ? JSON.parse(raw) : [];
    } catch (e) { history = []; }
  }

  function saveHistory() {
    try { sessionStorage.setItem(CONFIG.storageKey, JSON.stringify(history)); } catch (e) {}
  }

  function isOpenSaved() {
    try { return sessionStorage.getItem(CONFIG.openStateKey) === '1'; } catch (e) { return false; }
  }
  function setOpenSaved(v) {
    try { sessionStorage.setItem(CONFIG.openStateKey, v ? '1' : '0'); } catch (e) {}
  }

  function scrollToBottom() {
    els.body.scrollTop = els.body.scrollHeight;
  }

  function renderAll() {
    els.body.innerHTML = '';
    history.forEach(msg => renderMessage(msg, false));
    scrollToBottom();
  }

  function renderMessage(msg, animate) {
    const row = document.createElement('div');
    row.className = 'afa-cb-row ' + (msg.who === 'user' ? 'afa-user' : 'afa-bot');

    if (msg.who === 'bot') {
      const avatar = document.createElement('div');
      avatar.className = 'afa-cb-mini-avatar';
      avatar.innerHTML = '<i class="fa-solid fa-mosque"></i>';
      row.appendChild(avatar);
    }

    const bubble = document.createElement('div');
    bubble.className = 'afa-cb-bubble';
    bubble.innerHTML = msg.html;
    row.appendChild(bubble);
    els.body.appendChild(row);

    if (msg.who === 'bot' && msg.chips && msg.chips.length) {
      const chipRow = document.createElement('div');
      chipRow.className = 'afa-cb-chips';
      msg.chips.forEach(id => {
        const label = QUICK_LABELS[id];
        if (!label) return;
        const chip = document.createElement('button');
        chip.className = 'afa-cb-chip';
        chip.type = 'button';
        chip.textContent = label;
        chip.addEventListener('click', () => handleQuickReply(id));
        chipRow.appendChild(chip);
      });
      if (chipRow.children.length) els.body.appendChild(chipRow);
    }

    if (animate) scrollToBottom();
  }

  function pushBot(entry) {
    const msg = { who: 'bot', html: entry.reply, chips: entry.quickReplies || [] };
    history.push(msg);
    saveHistory();
    renderMessage(msg, true);
  }

  function pushBotText(text, chips) {
    const msg = { who: 'bot', html: textToHtml(text), chips: chips || [] };
    history.push(msg);
    saveHistory();
    renderMessage(msg, true);
  }

  function pushUser(text) {
    const msg = { who: 'user', html: escapeHtml(text) };
    history.push(msg);
    saveHistory();
    renderMessage(msg, true);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showTyping(cb) {
    const row = document.createElement('div');
    row.className = 'afa-cb-row afa-bot';
    row.id = 'afaCbTypingRow';
    row.innerHTML = `
      <div class="afa-cb-mini-avatar">AFA</div>
      <div class="afa-cb-bubble"><div class="afa-cb-typing"><span></span><span></span><span></span></div></div>
    `;
    els.body.appendChild(row);
    scrollToBottom();

    // Local FAQ replies get a small natural delay. AI replies keep the
    // typing indicator until the network request actually finishes.
    if (typeof cb === 'function') {
      setTimeout(() => {
        removeTyping();
        cb();
      }, 500 + Math.random() * 400);
    }

    return row;
  }

  function removeTyping() {
    const el = document.getElementById('afaCbTypingRow');
    if (el) el.remove();
  }

  function respondWith(entry) {
    els.input.disabled = true;
    els.send.disabled = true;
    showTyping(() => {
      pushBot(entry);
      els.input.disabled = false;
      els.send.disabled = false;
      els.input.focus();
    });
  }

  function handleQuickReply(id) {
    const entry = findById(id);
    if (!entry) return;
    pushUser(QUICK_LABELS[id] || id);
    respondWith(entry);
  }

  // AI is busy/down: show the best built-in answer instead of an error.
  function respondFromFallback(userText) {
    const local = localFallback(userText);
    if (local) {
      pushBot(local);
    } else {
      pushBot({ reply: TEMP_REPLY, quickReplies: FALLBACK_QUICK });
    }
  }

  async function handleUserText(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Read history first so the current question is not included twice.
    const aiHistory = getRecentHistoryForAI();

    pushUser(trimmed);
    els.input.value = '';

    // Fast path: clear FAQ intents are answered instantly, no API call.
    const route = decideRoute(trimmed);
    if (route.local) {
      respondWith(route.local);
      return;
    }

    els.input.disabled = true;
    els.send.disabled = true;
    showTyping();

    try {
      const result = await askAi(trimmed, aiHistory);
      removeTyping();

      if (result.scope === 'in_scope' && result.answer) {
        pushBotText(result.answer, ['courses', 'trial', 'packages', 'contact']);
      } else if (result.scope === 'out_of_scope') {
        pushBot({ reply: OUT_OF_SCOPE_REPLY, quickReplies: FALLBACK_QUICK });
      } else {
        // 'temporary' (timeout / busy / model error) or empty answer
        respondFromFallback(trimmed);
      }
    } catch (error) {
      console.error('[Al Fatima Chatbot] AI error:', error);
      removeTyping();
      respondFromFallback(trimmed);
    } finally {
      els.input.disabled = false;
      els.send.disabled = false;
      els.input.focus();
    }
  }

  function openPanel() {
    els.panel.classList.add('afa-open');
    els.launcher.classList.remove('afa-has-badge');
    els.launcherIcon.className = 'fa-solid fa-xmark';
    setOpenSaved(true);
    if (history.length === 0) {
      respondWith(findById('greeting'));
    }
    setTimeout(() => els.input && els.input.focus(), 200);
  }

  function closePanel() {
    els.panel.classList.remove('afa-open');
    els.launcherIcon.className = 'fa-solid fa-headset';
    setOpenSaved(false);
  }

  function togglePanel() {
    if (els.panel.classList.contains('afa-open')) closePanel();
    else openPanel();
  }

  function restartChat() {
    history = [];
    saveHistory();
    els.body.innerHTML = '';
    respondWith(findById('greeting'));
  }

  // ==================================================================
  // 7. INIT
  // ==================================================================
  function init() {
    injectStyles();
    buildWidget();

    els = {
      launcher: document.getElementById('afaCbLauncher'),
      launcherIcon: document.getElementById('afaCbLauncherIcon'),
      panel: document.getElementById('afaCbPanel'),
      body: document.getElementById('afaCbBody'),
      input: document.getElementById('afaCbInput'),
      send: document.getElementById('afaCbSend'),
      closeBtn: document.getElementById('afaCbClose'),
      restartBtn: document.getElementById('afaCbRestart')
    };

    loadHistory();
    renderAll();

    els.launcher.addEventListener('click', togglePanel);
    els.closeBtn.addEventListener('click', closePanel);
    els.restartBtn.addEventListener('click', restartChat);
    els.send.addEventListener('click', () => { void handleUserText(els.input.value); });
    els.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); void handleUserText(els.input.value); }
    });

    // Restore open/closed state across page navigation within the same tab
    if (isOpenSaved()) {
      els.panel.classList.add('afa-open');
      els.launcherIcon.className = 'fa-solid fa-xmark';
      if (history.length === 0) respondWith(findById('greeting'));
    } else {
      // Gentle attention-getter on first visit of the session
      try {
        if (!sessionStorage.getItem('afa_chatbot_badge_shown')) {
          setTimeout(() => {
            if (!els.panel.classList.contains('afa-open')) {
              els.launcher.classList.add('afa-has-badge');
            }
          }, 4000);
          sessionStorage.setItem('afa_chatbot_badge_shown', '1');
        }
      } catch (e) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
