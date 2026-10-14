import { WHATSAPP_NUMBER } from '../../data/site';

const WA_MSG = encodeURIComponent(
  'Assalamu Alaikum! I would like to enroll in the Islamic Duas & Etiquette 3-Day Free Trial Class.'
);

const PILLARS = [
  {
    step: '01',
    icon: 'fa-sun',
    title: 'Daily Masnoon Supplications (Duas)',
    desc: 'Memorizing 40+ prophetic daily prayers with Arabic clarity and English meaning: waking up, sleeping, meals, entering/leaving home, travel, rain, and protection from evil eye.',
  },
  {
    step: '02',
    icon: 'fa-scroll',
    title: 'The Six Kalimas & Aqeedah Basics',
    desc: 'Memorizing Kalima Tayyibah, Shahadah, Tamjeed, Tawheed, Astaghfar, and Radd-i-Kufr with word-by-word phonetic correction and foundational Islamic theology.',
  },
  {
    step: '03',
    icon: 'fa-person-praying',
    title: 'Complete Practical Salah (Namāz)',
    desc: 'Step-by-step Wudu (ablution), Qiyam, Ruku, Sajdah, Jalsah postures, plus Sana, Surah Fatiha, Tashahhud, Durood Ibrahim, Dua Masoora, and Dua-e-Qunoot for Witr.',
  },
  {
    step: '04',
    icon: 'fa-heart-pulse',
    title: 'Islamic Manners & Adab (Akhlaq)',
    desc: 'Cultivating prophetic morals: obedience to parents, respecting elders, compassion, honesty (Sidq), avoiding backbiting (Gheebah), proper greeting (Salam), and table manners.',
  },
  {
    step: '05',
    icon: 'fa-book-open-reader',
    title: 'Stories of the Prophets & Sahaba',
    desc: 'Inspiring historical storytelling — courage, mercy, patience, and faith of Prophet Ibrahim (AS), Musa (AS), Isa (AS), Muhammadﷺ, and the noble Companions.',
  },
];

const FAQS = [
  {
    q: 'Can this course be combined with Noorani Qaida or Nazra Quran?',
    a: 'Yes! Most students take a combined format: 20 minutes dedicated to Quran reading and 10 minutes to daily Duas, Kalimas, and Salah practice in each session.',
  },
  {
    q: 'Is English used as the medium of instruction?',
    a: 'Yes. Our tutors are fluent in English and explain the meanings and historical contexts of Duas in simple, relatable English terms for Western-born children and adults.',
  },
  {
    q: 'Are printable Dua cards and study worksheets provided?',
    a: 'Yes — enrolled families receive high-quality digital PDF flashcards and daily checklist sheets that you can print and pin to the refrigerator or study desk.',
  },
];

export default function IslamicDuasPanel() {
  return (
    <article className="space-y-8 sm:space-y-10 text-gray-200 w-full max-w-full overflow-hidden">

      {/* ═══ HERO BANNER ═══ */}
      <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-[0_8px_40px_-8px_rgba(212,175,55,0.2)] group w-full max-w-full">
        <div className="relative min-h-[280px] sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-900">
          <img
            src="/images/islamic-supplications.jpg"
            alt="Islamic Supplications, Daily Duas and Akhlaq Course – Al Fatima Academy"
            className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-neutral-950/30 to-transparent" />

          <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <i className="fa-solid fa-star" /> Character & Sunnah
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-gray-300 text-xs backdrop-blur-md">
              <i className="fa-solid fa-child text-gold-400" /> Ideal for Kids & Reverts
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 max-w-full">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <i className="fa-solid fa-hands-praying" /> Daily Duas · Salah · Moral Ethics
            </p>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg break-words">
              Islamic Supplications & Etiquette Course
            </h2>
            <p className="text-gray-300 text-sm mt-2 max-w-xl hidden sm:block leading-relaxed">
              Nurturing beautiful Islamic character, practical daily prayers, 6 Kalimas, and Sunnah manners in the next generation.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ 4-STAT BAR ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-full">
        {[
          { icon: 'fa-mosque',             label: 'Step-by-Step Salah',   sub: 'Complete Prayer Guide' },
          { icon: 'fa-hand-holding-heart', label: '40+ Masnoon Duas',     sub: 'Daily Routines & Sunnah' },
          { icon: 'fa-shield-halved',      label: 'Islamic Morals (Adab)',sub: 'Respect & Kindness' },
          { icon: 'fa-gift',               label: '3-Day Free Trial',     sub: 'No Card Needed' },
        ].map((s) => (
          <div key={s.label} className="bg-neutral-900/60 border border-gold-500/15 rounded-xl p-3 sm:p-4 text-center hover:border-gold-500/35 transition-colors duration-300">
            <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto mb-2 rounded-full bg-gold-500/10 flex items-center justify-center">
              <i className={`fa-solid ${s.icon} text-gold-400 text-xs sm:text-sm`} />
            </div>
            <p className="text-white font-bold text-xs sm:text-sm leading-tight break-words">{s.label}</p>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-tight break-words">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ═══ INTRODUCTION ═══ */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Nurturing Confident, Practicing Muslim Character
          </h3>
        </div>
        <div className="pl-4 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            In an era of rapid digital distractions, anchoring children in authentic Islamic identity, values, and character is a foremost priority — especially for Muslim families in the US, Canada, UK, Europe, and Australia. While Quran recitation is paramount, translating its divine wisdom into day-to-day morals and continuous remembrance of Allah is the true essence of Islamic living.
          </p>
          <p>
            The Messengerﷺ declared: <strong className="text-gold-400">"The most beloved of Allah's servants to Allah are those with the best manners"</strong> (Al-Mu'jam al-Kabir). Our course goes beyond rote memorization — providing an interactive, nurturing environment where students understand the spiritual meaning and beauty behind every supplication and Sunnah habit.
          </p>
        </div>
      </div>

      {/* ═══ 5 PILLARS CURRICULUM ═══ */}
      <div className="bg-neutral-900/50 border border-gold-500/12 rounded-2xl p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Comprehensive Curriculum: 5 Essential Pillars
          </h3>
        </div>
        <p className="text-gray-400 text-sm pl-4">
          Five core learning domains that equip students with tools to practice Islam joyfully throughout their daily routines.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {PILLARS.map((item) => (
            <div
              key={item.step}
              className={`group flex gap-4 bg-neutral-950/50 hover:bg-neutral-950/80 border border-white/5 hover:border-gold-500/20 p-4 rounded-xl transition-all duration-300 ${item.step === '05' ? 'md:col-span-2' : ''}`}
            >
              <span className="shrink-0 w-9 h-9 rounded-lg bg-gold-500/10 group-hover:bg-gold-500/20 flex items-center justify-center text-gold-400 text-xs font-bold font-mono transition-colors">
                {item.step}
              </span>
              <div>
                <h4 className="text-white font-semibold text-sm leading-tight mb-1">{item.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ INTERACTIVE PEDAGOGY ═══ */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Engaging, Interactive Pedagogy for Youth
          </h3>
        </div>
        <div className="pl-4 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Our teachers do not just ask children to recite words they do not understand — each dua is taught with real-life context: <em>"Why do we say Bismillah before eating? What happens spiritually when we remember Allah at every step?"</em> Using custom digital slides, illustrated checklists, habit-tracking worksheets, and interactive role-playing, lessons become joyful bonding moments.
          </p>
        </div>
      </div>

      {/* ═══ REVERT SUPPORT ═══ */}
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/20 bg-neutral-900/50 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex gap-4 items-start">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center">
            <i className="fa-solid fa-star-and-crescent text-gold-400 text-lg" />
          </div>
          <div>
            <h3 className="font-serif text-lg md:text-xl font-bold text-gold-400 mb-2">
              Dedicated Mentorship for Reverts & New Muslims
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              We offer specialized adult 1-on-1 sessions where new Muslims learn to pray Salah correctly, understand basic rulings of cleanliness, and memorize daily supplications at their own comfortable pace — without fear of judgment.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ FAQ ═══ */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-3 pl-4">
          {FAQS.map((faq) => (
            <div key={faq.q} className="bg-neutral-900/60 border border-gold-500/10 hover:border-gold-500/25 rounded-xl p-5 transition-colors duration-300">
              <div className="flex gap-3 items-start">
                <i className="fa-solid fa-circle-question text-gold-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1.5">{faq.q}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ CTA ═══ */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-gold-500/30 bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-950 p-7 md:p-10 text-center">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-gold-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gold-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-bold uppercase tracking-widest">
            Build Moral Excellence
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Enroll Your Child for a Free 3-Day Trial
          </h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Equip your children with sacred prayers, upright character, and practical Salah — a continuous source of Sadaqah Jariyah for a lifetime.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noreferrer"
              className="glow-pulse inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-3.5 px-8 rounded-xl text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-gold-500/20"
            >
              <i className="fa-brands fa-whatsapp text-lg" />
              Start Free Trial via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
