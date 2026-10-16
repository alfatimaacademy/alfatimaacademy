import { Link } from 'react-router-dom';

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
    <article className="space-y-8 sm:space-y-10 text-gray-200 w-full max-w-full">
      {/* ═══ COURSE IMAGE ═══ */}
      <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-lg w-full">
        <img
          src="/images/islamic-supplications.jpg"
          alt="Islamic Supplications, Daily Duas and Akhlaq Course – Al Fatima Academy"
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
        />
      </div>

      {/* ═══ COURSE HEADER ═══ */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <i className="fa-solid fa-star" /> Character & Sunnah
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
            <i className="fa-solid fa-child text-gold-400" /> Ideal for Kids & Reverts
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
          Islamic Supplications & Etiquette Course
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          Nurturing beautiful Islamic character, practical daily prayers, 6 Kalimas, and Sunnah manners in the next generation.
        </p>
      </div>

      {/* ═══ INTRODUCTION ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Nurturing Confident, Practicing Muslim Character
          </h3>
        </div>
        <div className="pl-4 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            In an era of rapid digital distractions, anchoring children in authentic Islamic identity, values, and character is a foremost priority — especially for Muslim families in the US, Canada, UK, Europe, and Australia. While Quran recitation is paramount, translating its divine wisdom into day-to-day morals and continuous remembrance of Allah is the true essence of Islamic living.
          </p>
          <p>
            The Messengerﷺ declared: <strong className="text-gold-400">"The most beloved of Allah's servants to Allah are those with the best manners"</strong> (Al-Mu'jam al-Kabir). Our course goes beyond rote memorization — providing an interactive, nurturing environment where students understand the spiritual meaning and beauty behind every supplication and Sunnah habit.
          </p>
        </div>
      </div>

      {/* ═══ 5 PILLARS CURRICULUM (SIMPLE LIST, NO CARDS / GRIDS) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Comprehensive Curriculum: 5 Essential Pillars
          </h3>
        </div>
        <p className="text-gray-400 text-sm pl-4">
          Five core learning domains that equip students with tools to practice Islam joyfully throughout their daily routines:
        </p>
        <div className="pl-4 space-y-4 pt-1">
          {PILLARS.map((item) => (
            <div key={item.step} className="space-y-1">
              <h4 className="text-white font-semibold text-base flex items-baseline gap-2">
                <span className="text-gold-400 font-bold font-mono text-sm">{item.step}.</span>
                <span>{item.title}</span>
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed pl-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ INTERACTIVE PEDAGOGY ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Engaging, Interactive Pedagogy for Youth
          </h3>
        </div>
        <div className="pl-4 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Our teachers do not just ask children to recite words they do not understand — each dua is taught with real-life context: <em>"Why do we say Bismillah before eating? What happens spiritually when we remember Allah at every step?"</em> Using custom digital slides, illustrated checklists, habit-tracking worksheets, and interactive role-playing, lessons become joyful bonding moments.
          </p>
        </div>
      </div>

      {/* ═══ REVERT SUPPORT (SIMPLE FORM, NO CARD BOX) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Dedicated Mentorship for Reverts & New Muslims
          </h3>
        </div>
        <div className="pl-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            We offer specialized adult 1-on-1 sessions where new Muslims learn to pray Salah correctly, understand basic rulings of cleanliness, and memorize daily supplications at their own comfortable pace — without fear of judgment.
          </p>
        </div>
      </div>

      {/* ═══ FAQ SECTION (SIMPLE FORM, NO CARD BOXES) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="pl-4 space-y-4 pt-1">
          {FAQS.map((faq) => (
            <div key={faq.q} className="space-y-1">
              <h4 className="text-white font-semibold text-base flex items-baseline gap-2">
                <span className="text-gold-400 font-bold">Q:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed pl-5">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ CTA SECTION (SIMPLE FORM) ═══ */}
      <div className="pt-6 border-t border-gold-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-xl font-bold text-white">Enroll Your Child for a Free 3-Day Trial</h3>
          <p className="text-gray-400 text-sm">Equip your children with sacred prayers, upright character, and practical Salah.</p>
        </div>
        <Link
          to="/contact"
          className="glow-pulse shrink-0 inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-3 px-6 rounded-xl text-sm transition-all duration-300"
        >
          <i className="fa-solid fa-paper-plane text-xs" />
          Enroll Now
        </Link>
      </div>
    </article>
  );
}
