/**
 * chatbot-widget.js
 * ----------------------------------------------------------------
 * Al Fatima Academy — Website Support Chatbot
 *
 * A self-contained, dependency-free FAQ / support assistant for the
 * whole site. It injects its own CSS + HTML, so it can be dropped
 * into ANY page with a single <script> tag — no build step, no
 * external account, no API key.
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
      keywords: ['hi', 'hello', 'hey', 'salam', 'assalam', 'asalam', 'aoa', 'slam', 'marhaba', 'good morning', 'good evening'],
      reply: `Assalam-o-Alaikum, and welcome! 👋<br>I'm the <b>${CONFIG.academyName}</b> support assistant. I can help with courses, fees, timings, the free trial, or connecting you with our team.<br>What would you like to know?`,
      quickReplies: ['courses', 'trial', 'packages', 'contact']
    },
    {
      id: 'about_academy',
      keywords: ['about', 'who are you', 'what is this', 'academy kya hai', 'kon hain', 'kya ye', 'introduction', 'al quran international', 'al fatima'],
      reply: `<b>${CONFIG.academyName}</b> is a project of <b>${CONFIG.parentOrg}</b> — a global online Islamic learning platform. We offer 1-on-1 live Quran and Tajweed classes for kids and adults, taught by certified Huffaz and Qaris, over Zoom / Google Meet.<br>We're based in ${CONFIG.location.replace(' (serving students worldwide)', '')}, and serve students worldwide (UK, USA, Canada, UAE, and more), 24/7.`,
      quickReplies: ['courses', 'teachers', 'trial']
    },
    {
      id: 'courses',
      keywords: ['course', 'courses', 'service', 'services', 'subjects', 'offer', 'offering', 'what do you teach', 'what can i learn', 'kya parhate', 'kya sikhate', 'classes offer', 'programs', 'kon se course'],
      reply: `We offer 4 structured courses:<br>
        1️⃣ <b>Noorani / Madni Qaida</b> — Arabic letters &amp; foundation<br>
        2️⃣ <b>Tajweed-ul-Quran</b> — correct recitation rules<br>
        3️⃣ <b>Nazra &amp; Hifz Quran</b> — fluent reading or memorization<br>
        4️⃣ <b>Islamic Supplications &amp; Etiquette</b> — daily Duas, Kalimas, Salah<br><br>
        Tap a course below for full details, or visit the <a href="/services" target="_blank">Services page</a>.`,
      quickReplies: ['course_qaida', 'course_tajweed', 'course_hifz', 'course_duas']
    },
    {
      id: 'course_qaida',
      keywords: ['noorani qaida', 'madni qaida', 'qaida', 'basic arabic', 'letters', 'huroof', 'beginner course'],
      reply: `<b>Noorani / Madni Qaida</b> is our foundation course for absolute beginners and kids — the essential first step before reading the Quran.<br>You'll learn: Arabic alphabet &amp; correct pronunciation (Makharij), letter shapes &amp; joining, Harakat (vowel marks), and basic Tajweed rules.<br><a href="/services#noorani-qaida" target="_blank">See full course details →</a>`,
      quickReplies: ['trial', 'packages', 'teachers']
    },
    {
      id: 'course_tajweed',
      keywords: ['tajweed', 'recitation', 'pronunciation course', 'makharij', 'ghunnah', 'idgham'],
      reply: `<b>Tajweed-ul-Quran</b> teaches you to recite the Holy Quran correctly and beautifully.<br>You'll learn: Makharij-al-Huroof (articulation points), core rules (Ghunnah, Ikhfa, Idgham, Iqlab, Izhar), Noon/Meem Sakinah rules, Madd (elongation), and Waqf (pause signs).<br><a href="/services#tajweed-quran" target="_blank">See full course details →</a>`,
      quickReplies: ['trial', 'packages', 'teachers']
    },
    {
      id: 'course_hifz',
      keywords: ['hifz', 'memorize', 'memorization', 'nazra', 'hafiz', 'yaad karna', 'quran yaad'],
      reply: `<b>Nazra &amp; Hifz Quran</b> — read the Quran with correct flow, or memorize selected Surahs or the entire Quran, under certified Huffaz teachers.<br>Daily lessons follow the classic structure: <b>Sabaq</b> (new lesson), <b>Sabaqi</b> (recent revision), and <b>Manzil</b> (old revision), with Tajweed applied throughout.<br><a href="/services#hifz-quran" target="_blank">See full course details →</a>`,
      quickReplies: ['trial', 'packages', 'teachers']
    },
    {
      id: 'course_duas',
      keywords: ['duas', 'dua', 'kalima', 'kalmas', 'namaz', 'salah', 'prayer course', 'islamic supplications', 'etiquette', 'akhlaq'],
      reply: `<b>Islamic Supplications &amp; Etiquette</b> is designed especially for kids and young adults (including those growing up in Western countries).<br>You'll learn: daily Masnoon Duas, the 6 Kalimas, step-by-step Salah (prayer) training including Wudu, and Islamic manners (Akhlaq).<br><a href="/services#islamic-duas" target="_blank">See full course details →</a>`,
      quickReplies: ['trial', 'packages', 'teachers']
    },
    {
      id: 'trial',
      keywords: ['trial', 'free class', 'demo', 'free trial', 'try', 'muft', 'azad class'],
      reply: `Yes — we offer a <b>3-day free trial</b>, completely free, no credit card required.<br>Just fill the short registration form on the <a href="/" target="_blank">Home</a>, <a href="/packages" target="_blank">Packages</a>, or <a href="/services" target="_blank">Services</a> page, and our team will contact you within 24 hours to schedule your free classes.<br>Prefer to talk directly? <a href="${WHATSAPP_LINK("Assalam-o-Alaikum, I'd like to book a 3-day free trial class.")}" target="_blank">Message us on WhatsApp →</a>`,
      quickReplies: ['packages', 'contact']
    },
    {
      id: 'register',
      keywords: ['register', 'enroll', 'admission', 'join', 'sign up', 'apply', 'kaise join', 'admission kaise'],
      reply: `Registering is easy — you don't need to create any account:<br>1. Fill the trial/registration form on the <a href="/" target="_blank">Home</a>, <a href="/packages" target="_blank">Packages</a>, or <a href="/services" target="_blank">Services</a> page.<br>2. Or simply message us on <a href="${WHATSAPP_LINK("Assalam-o-Alaikum, I want to enroll in a course.")}" target="_blank">WhatsApp</a>.<br>Our team replies within 24 hours to arrange your class schedule.`,
      quickReplies: ['trial', 'packages', 'contact']
    },
    {
      id: 'packages',
      keywords: ['fee', 'fees', 'price', 'pricing', 'packages', 'package', 'plan', 'plans', 'cost', 'kitna paisa', 'kitni fees', 'monthly fee', 'charges'],
      reply: `We have 3 plans, all with 1-on-1 live classes:<br>
        🔹 <b>Basic</b> — 2 days/week, 8 classes/month, 30 min class, basic Tajweed &amp; Qaida<br>
        🔹 <b>Standard</b> (Most Popular) — 3 days/week, 12 classes/month, proper Tajweed &amp; Hifz, monthly progress report<br>
        🔹 <b>Intensive</b> — 5 days/week, 20 classes/month, full Hifz focus, senior teacher<br><br>
        Exact fees depend on your country's currency (PKR, CAD/GBP, CNY, AED, BDT). Select your country on the <a href="/packages" target="_blank">Packages page</a> to see your rate, or ask our team directly.`,
      quickReplies: ['trial', 'contact', 'course_hifz']
    },
    {
      id: 'duration',
      keywords: ['duration', 'how long', 'kitni der', 'how many days', 'kitne din', 'class length', 'schedule', 'frequency'],
      reply: `Each live class is <b>30 minutes</b>, 1-on-1 with your tutor. You can choose how often you study: <b>2, 3, or 5 days a week</b>, depending on the plan you pick — see our <a href="/packages" target="_blank">Packages</a> for details.`,
      quickReplies: ['packages', 'timings']
    },
    {
      id: 'teachers',
      keywords: ['teacher', 'teachers', 'tutor', 'tutors', 'ustaad', 'qari sahab', 'instructor', 'female teacher', 'lady teacher', 'male teacher'],
      reply: `All our tutors are <b>certified Huffaz and Qaris</b> with real experience teaching Arabic phonetics and Quranic recitation online.<br>Our founder, <b>${CONFIG.founder}</b>, has 15+ years of teaching experience.<br>We also have <b>female tutors available</b> for sisters and young girls, respecting your preference.`,
      quickReplies: ['courses', 'trial']
    },
    {
      id: 'platform',
      keywords: ['zoom', 'google meet', 'app', 'platform', 'kis app', 'online kaise', 'video call', 'software'],
      reply: `Classes are held live over <b>Zoom</b> or <b>Google Meet</b> — whichever suits you best. You'll get a class link from your tutor/admin before each session; no special software purchase needed.`,
      quickReplies: ['timings', 'trial']
    },
    {
      id: 'timings',
      keywords: ['timing', 'timings', 'time', 'schedule time', 'kab class', '24/7', 'time zone', 'timezone'],
      reply: `We run classes <b>24 hours a day, 7 days a week</b>, so we can match almost any timezone. Since our students are spread across Pakistan, the UK, USA, Canada, UAE and more, just tell our team your preferred time when you register, and they'll fit a tutor to your schedule.`,
      quickReplies: ['trial', 'contact']
    },
    {
      id: 'age_group',
      keywords: ['age', 'kids', 'children', 'adults', 'bachon', 'bache', 'umar', 'how old'],
      reply: `Our classes are open to <b>both kids and adults, of all ages and levels</b> — from absolute beginners to those refining advanced Tajweed. Classes are personalized 1-on-1, so the pace is set to the student.`,
      quickReplies: ['courses', 'trial']
    },
    {
      id: 'location',
      keywords: ['location', 'address', 'where are you', 'kahan', 'country', 'which country', 'based in', 'office'],
      reply: `Our head office is in <b>${CONFIG.location}</b> — but all classes are conducted online, so students from any country (Pakistan, UK, USA, Canada, UAE, Bangladesh, and more) can join.`,
      quickReplies: ['contact', 'timings']
    },
    {
      id: 'contact',
      keywords: ['contact', 'phone', 'number', 'whatsapp', 'call', 'email', 'reach you', 'support', 'helpline'],
      reply: `You can reach us anytime:<br>📞 Call / WhatsApp: <a href="${WHATSAPP_LINK('')}" target="_blank">${CONFIG.whatsappDisplay}</a><br>✉️ Email: <a href="mailto:${CONFIG.email}">${CONFIG.email}</a><br>📍 ${CONFIG.location}<br>Or use our <a href="/contact" target="_blank">Contact page</a> to send a message.`,
      quickReplies: ['trial', 'packages']
    },
    {
      id: 'quran_about',
      keywords: ['what is quran', 'quran kya hai', 'quran kya hota hai', 'tell me about quran', 'holy quran', 'quran meaning', 'about quran'],
      reply: `<b>The Quran</b> is the central scripture of Islam. Muslims believe it is the word of Allah revealed to Prophet Muhammad ﷺ through Angel Jibreel (Gabriel). It is in Arabic and is divided into 114 Surahs (chapters).<br><br>If you'd like to learn Quran reading or recitation, we offer <b>Noorani / Madni Qaida, Tajweed-ul-Quran, Nazra &amp; Hifz</b>, and Islamic Supplications &amp; Etiquette classes.`,
      quickReplies: ['courses', 'course_tajweed', 'course_hifz', 'trial']
    },
    {
      id: 'quran_reader',
      keywords: ['read quran', 'quran parhna', 'para', 'juz', 'surah', 'online quran', 'quran reader', 'mushaf'],
      reply: `You can read the full Quran (Uthmani script) right on our site, free — no login needed. Go to <a href="/quran" target="_blank">Read Quran</a> and select any Para (Juz) or Surah from the dropdown.`,
      quickReplies: ['courses', 'trial']
    },
    {
      id: 'languages',
      keywords: ['language', 'languages', 'translate', 'urdu website', 'arabic website', 'multi language'],
      reply: `Our website supports translation into <b>11 languages</b>, including English, Urdu, Arabic, Bengali, Hindi, Turkish, Chinese, Japanese, Korean, Spanish, and French. Look for the language selector button on any page.`,
      quickReplies: ['contact']
    },
    {
      id: 'payment',
      keywords: ['payment', 'pay', 'bank transfer', 'easypaisa', 'jazzcash', 'credit card', 'how to pay', 'refund', 'cancel', 'cancellation'],
      reply: `Payment methods and cancellation details aren't listed publicly on the site, as they can vary by country. Please ask our team directly — they'll guide you clearly before you commit to anything: <a href="${WHATSAPP_LINK('Assalam-o-Alaikum, I have a question about payment methods.')}" target="_blank">Message us on WhatsApp →</a>`,
      quickReplies: ['contact', 'packages']
    },
    {
      id: 'sitemap',
      keywords: ['pages', 'menu', 'sitemap', 'navigation', 'website pages'],
      reply: `Here's a quick map of the site:<br>🏠 <a href="/" target="_blank">Home</a> · ℹ️ <a href="/about" target="_blank">About Us</a> · 📚 <a href="/services" target="_blank">Services</a> · 💰 <a href="/packages" target="_blank">Packages</a> · 📖 <a href="/quran" target="_blank">Read Quran</a> · ✉️ <a href="/contact" target="_blank">Contact</a>`,
      quickReplies: ['courses', 'contact']
    },
    {
      id: 'thanks',
      keywords: ['thanks', 'thank you', 'shukriya', 'jazakallah', 'jazak allah', 'appreciate'],
      reply: `You're most welcome! 🌙 Is there anything else I can help you with?`,
      quickReplies: ['courses', 'trial', 'contact']
    },
    {
      id: 'bye',
      keywords: ['bye', 'goodbye', 'khuda hafiz', 'allah hafiz', 'see you', 'ok bye'],
      reply: `Allah Hafiz! 🌙 Feel free to come back anytime — or reach us directly on <a href="${WHATSAPP_LINK('')}" target="_blank">WhatsApp</a>. Have a blessed day!`,
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
    quran_about: '📖 What is Quran?',
    quran_reader: '📖 Read Quran',
    languages: 'Languages',
    payment: 'Payment Info',
    sitemap: 'Site Map'
  };

  const FALLBACK_REPLY = `I don't have enough information to answer that accurately. I can only help with <b>Al Fatima Academy</b>, our website/services, and <b>Islam &amp; Quran</b>-related questions.`;
  const OUT_OF_SCOPE_REPLY = `That question isn't relevant to my scope. I can only help with <b>Al Fatima Academy</b>, our website/services, and <b>Islam &amp; Quran</b>-related questions.`;
  const AI_ERROR_REPLY = `I'm having trouble connecting to my AI assistant right now. Please try again in a moment, or ask me about our <b>courses, fees, trial, timings, teachers, or contact details</b>.`;
  const FALLBACK_QUICK = ['courses', 'trial', 'packages', 'contact'];

  // ==================================================================
  // 3. MATCHING ENGINE + AI SUPPORT
  // ==================================================================
  function normalize(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findById(id) {
    return KB.find(e => e.id === id) || null;
  }

  function scoreMatch(userText) {
    const text = ' ' + normalize(userText) + ' ';
    let best = null;
    let bestScore = 0;

    KB.forEach(entry => {
      let score = 0;
      entry.keywords.forEach(kw => {
        const k = ' ' + normalize(kw) + ' ';
        if (text.includes(k)) score += kw.split(' ').length;
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });

    return { entry: best, score: bestScore };
  }

  // Use a local answer only when the intent is reasonably obvious.
  // Ambiguous/natural-language questions are sent to the AI assistant.
  function findStrongLocalMatch(userText) {
    const { entry, score } = scoreMatch(userText);
    if (!entry) return null;

    const normalized = normalize(userText);
    const exactKeyword = entry.keywords.some(kw => normalized === normalize(kw));
    return exactKeyword || score >= 2 ? entry : null;
  }

  function websiteKnowledgeForAI() {
    return KB.map(entry => ({
      id: entry.id,
      keywords: entry.keywords,
      answer: entry.reply.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
    }));
  }

  function getRecentHistoryForAI() {
    return history
      .slice(-8)
      .map(msg => ({
        role: msg.who === 'user' ? 'user' : 'assistant',
        content: String(msg.html || '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
      }));
  }

  async function askAi(question) {
    const response = await fetch(CONFIG.aiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        history: getRecentHistoryForAI(),
        websiteKnowledge: websiteKnowledgeForAI()
      })
    });

    if (!response.ok) {
      throw new Error(`AI request failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      scope: data.scope === 'in_scope' ? 'in_scope' : 'out_of_scope',
      answer: String(data.answer || '').trim()
    };
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
    width: 60px; height: 60px; border-radius: 999px; border: 2px solid #0a0a0a;
    background: linear-gradient(145deg, #e5c060, #D4AF37);
    color: #0a0a0a; font-size: 26px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 24px rgba(0,0,0,.45); cursor: pointer;
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .afa-cb-launcher:hover { transform: scale(1.08); box-shadow: 0 10px 30px rgba(0,0,0,.55); }
  .afa-cb-launcher .afa-cb-dot {
    position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; border-radius: 50%;
    background: #ef4444; border: 2px solid #0a0a0a; display: none;
  }
  .afa-cb-launcher.afa-has-badge .afa-cb-dot { display: block; }

  .afa-cb-panel {
    position: fixed; right: 24px; bottom: 96px; z-index: 99999;
    width: 370px; max-width: calc(100vw - 32px);
    height: 560px; max-height: calc(100vh - 140px);
    background: #0d0d0d; border: 1px solid rgba(212,175,55,.35); border-radius: 18px;
    box-shadow: 0 20px 60px rgba(0,0,0,.6);
    display: none; flex-direction: column; overflow: hidden;
    font-family: 'Poppins', Arial, sans-serif;
  }
  .afa-cb-panel.afa-open { display: flex; }

  .afa-cb-header {
    background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
    border-bottom: 1px solid rgba(212,175,55,.3);
    padding: 14px 16px; display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }
  .afa-cb-avatar {
    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(145deg, #e5c060, #D4AF37);
    display: flex; align-items: center; justify-content: center; color: #0a0a0a; font-size: 17px;
  }
  .afa-cb-title { flex: 1; min-width: 0; }
  .afa-cb-title b { color: #e5c060; font-family: 'Cinzel', serif; font-size: 14.5px; display: block; letter-spacing: .3px; }
  .afa-cb-title span { color: #9ca3af; font-size: 11px; display: flex; align-items: center; gap: 5px; }
  .afa-cb-title span::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; display: inline-block; }
  .afa-cb-headbtn {
    background: transparent; border: none; color: #9ca3af; font-size: 15px; cursor: pointer;
    width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    transition: background .2s, color .2s;
  }
  .afa-cb-headbtn:hover { background: rgba(212,175,55,.15); color: #e5c060; }

  .afa-cb-body {
    flex: 1; overflow-y: auto; padding: 16px 12px; background: #0d0d0d;
    display: flex; flex-direction: column; gap: 10px;
  }
  .afa-cb-body::-webkit-scrollbar { width: 6px; }
  .afa-cb-body::-webkit-scrollbar-thumb { background: rgba(212,175,55,.35); border-radius: 6px; }

  .afa-cb-row { display: flex; gap: 8px; align-items: flex-end; }
  .afa-cb-row.afa-user { justify-content: flex-end; }
  .afa-cb-bubble {
    max-width: 82%; padding: 10px 13px; border-radius: 14px; font-size: 13.5px; line-height: 1.55;
    word-wrap: break-word;
  }
  .afa-cb-row.afa-bot .afa-cb-bubble { background: #1c1c1c; color: #e5e7eb; border-bottom-left-radius: 4px; border: 1px solid rgba(255,255,255,.06); }
  .afa-cb-row.afa-user .afa-cb-bubble { background: linear-gradient(135deg, #e5c060, #D4AF37); color: #0a0a0a; border-bottom-right-radius: 4px; font-weight: 500; }
  .afa-cb-bubble a { color: #e5c060; text-decoration: underline; }
  .afa-cb-row.afa-user .afa-cb-bubble a { color: #0a0a0a; text-decoration: underline; }
  .afa-cb-mini-avatar {
    width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; margin-bottom: 2px;
    background: linear-gradient(145deg, #e5c060, #D4AF37); color: #0a0a0a;
    display: flex; align-items: center; justify-content: center; font-size: 11px;
  }

  .afa-cb-typing { display: flex; gap: 4px; padding: 4px 2px; }
  .afa-cb-typing span {
    width: 6px; height: 6px; border-radius: 50%; background: #D4AF37; opacity: .5;
    animation: afaTyping 1s infinite ease-in-out;
  }
  .afa-cb-typing span:nth-child(2) { animation-delay: .15s; }
  .afa-cb-typing span:nth-child(3) { animation-delay: .3s; }
  @keyframes afaTyping { 0%, 60%, 100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-4px); opacity: 1; } }

  .afa-cb-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; padding-left: 32px; }
  .afa-cb-chip {
    background: rgba(212,175,55,.1); border: 1px solid rgba(212,175,55,.4); color: #e5c060;
    font-size: 12px; padding: 6px 11px; border-radius: 999px; cursor: pointer; white-space: nowrap;
    transition: background .2s, color .2s;
  }
  .afa-cb-chip:hover { background: #D4AF37; color: #0a0a0a; }

  .afa-cb-footer { border-top: 1px solid rgba(212,175,55,.2); padding: 10px; flex-shrink: 0; background: #0a0a0a; }
  .afa-cb-wa {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    background: transparent; border: 1px solid rgba(37,211,102,.5); color: #25D366;
    font-size: 11.5px; font-weight: 600; padding: 7px; border-radius: 10px; margin-bottom: 8px;
    text-decoration: none; transition: background .2s;
  }
  .afa-cb-wa:hover { background: rgba(37,211,102,.12); }
  .afa-cb-inputwrap { display: flex; gap: 8px; align-items: center; }
  .afa-cb-input {
    flex: 1; background: #1a1a1a; border: 1px solid rgba(255,255,255,.1); color: #f3f4f6;
    padding: 10px 13px; border-radius: 999px; font-size: 13.5px; outline: none; font-family: inherit;
  }
  .afa-cb-input:focus { border-color: #D4AF37; }
  .afa-cb-send {
    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0; border: none; cursor: pointer;
    background: linear-gradient(145deg, #e5c060, #D4AF37); color: #0a0a0a; font-size: 15px;
    display: flex; align-items: center; justify-content: center; transition: transform .15s;
  }
  .afa-cb-send:hover { transform: scale(1.07); }
  .afa-cb-send:disabled { opacity: .5; cursor: default; transform: none; }

  @media (max-width: 480px) {
    .afa-cb-panel { right: 16px; left: 16px; width: auto; bottom: 88px; height: 70vh; }
    .afa-cb-launcher { right: 16px; bottom: 16px; }
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
        <i class="fa-solid fa-comment-dots" id="afaCbLauncherIcon"></i>
        <span class="afa-cb-dot"></span>
      </button>

      <div class="afa-cb-panel" id="afaCbPanel" role="dialog" aria-label="Al Fatima Academy chat support">
        <div class="afa-cb-header">
          <div class="afa-cb-avatar"><i class="fa-solid fa-mosque"></i></div>
          <div class="afa-cb-title">
            <b>${CONFIG.academyName}</b>
            <span>Support Assistant • Replies instantly</span>
          </div>
          <button class="afa-cb-headbtn" id="afaCbRestart" title="Restart chat"><i class="fa-solid fa-rotate-right"></i></button>
          <button class="afa-cb-headbtn" id="afaCbClose" title="Close"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="afa-cb-body" id="afaCbBody"></div>

        <div class="afa-cb-footer">
          <a class="afa-cb-wa" id="afaCbWaLink" href="${WHATSAPP_LINK('')}" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> Chat with a real person on WhatsApp
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
      <div class="afa-cb-mini-avatar"><i class="fa-solid fa-mosque"></i></div>
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

  async function handleUserText(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    pushUser(trimmed);
    els.input.value = '';

    // Fast path: clear FAQ intents don't need an API call.
    const localMatch = findStrongLocalMatch(trimmed);
    if (localMatch) {
      respondWith(localMatch);
      return;
    }

    els.input.disabled = true;
    els.send.disabled = true;
    showTyping();

    try {
      const result = await askAi(trimmed);
      removeTyping();

      if (result.scope !== 'in_scope') {
        pushBot({ reply: OUT_OF_SCOPE_REPLY, quickReplies: FALLBACK_QUICK });
      } else if (result.answer) {
        pushBotText(result.answer, ['courses', 'trial', 'packages', 'contact']);
      } else {
        pushBot({ reply: FALLBACK_REPLY, quickReplies: FALLBACK_QUICK });
      }
    } catch (error) {
      console.error('[Al Fatima Chatbot] AI error:', error);
      removeTyping();
      pushBot({ reply: AI_ERROR_REPLY, quickReplies: FALLBACK_QUICK });
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
    els.launcherIcon.className = 'fa-solid fa-comment-dots';
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
