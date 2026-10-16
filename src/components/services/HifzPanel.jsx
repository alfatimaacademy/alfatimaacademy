import { Link } from 'react-router-dom';

const TIER_SYSTEM = [
  {
    num: '1',
    title: 'Sabaq (Daily New Verses)',
    color: 'from-amber-500/20 to-gold-500/10',
    border: 'border-amber-500/25',
    icon: 'fa-book-open',
    desc: 'Daily new verses (3–10 lines for beginners, up to a full page for advanced) recited directly to the teacher, who verifies accurate Tajweed before permitting memorization.',
  },
  {
    num: '2',
    title: 'Sabaqi / Ammokhta (Recent Memory)',
    color: 'from-emerald-500/15 to-teal-500/5',
    border: 'border-emerald-500/20',
    icon: 'fa-rotate-left',
    desc: 'Daily revision of the preceding 5–10 pages memorized over the past two weeks — reinforcing short-term memory and transferring verses into permanent cognitive recall.',
  },
  {
    num: '3',
    title: 'Manzil / Dhor (Cumulative Revision)',
    color: 'from-blue-500/15 to-indigo-500/5',
    border: 'border-blue-500/20',
    icon: 'fa-layer-group',
    desc: 'Systematic revision of older completed Juz (Paras). Students recite a half-Juz or full Juz daily from memory — keeping even months-old chapters crisp for Taraweeh.',
  },
];

const TRACKS = [
  {
    icon: 'fa-book-bookmark',
    title: 'Complete Quran Hifz',
    badge: 'Dedicated Track',
    badgeColor: 'bg-purple-900/50 text-purple-400 border-purple-500/25',
    desc: 'A rigorous full-scope track for dedicated students aiming to memorize all 30 Paras. Sessions run 4–5 days/week with monthly retention assessments. Expected completion: 2–3 years.',
  },
  {
    icon: 'fa-star-half-stroke',
    title: 'Selected Surahs Program',
    badge: 'Flexible Track',
    badgeColor: 'bg-emerald-900/50 text-emerald-400 border-emerald-500/25',
    desc: 'Ideal for working adults and students. Focuses on Juz Amma (30th Para), Surah Yaseen, Mulk, Kahf, Ar-Rahman, Al-Baqarah, and essential prayer passages.',
  },
];

const FAQS = [
  {
    q: 'What are the prerequisites before starting Hifz?',
    a: 'The student must read the Quran fluently with basic Tajweed. If your child needs reading fluency first, we recommend our 2-month Tajweed Primer before starting Hifz.',
  },
  {
    q: 'How many hours a day does an online Hifz student need to practice?',
    a: 'Beyond the 40-minute live session, we advise 45–60 minutes of independent revision daily at home to guarantee rock-solid retention.',
  },
  {
    q: 'Can female students learn with certified female Hafiza tutors?',
    a: 'Yes — we have Hafiza tutors who completed full Quran memorization with Sanad and have years of experience guiding female learners.',
  },
];

export default function HifzPanel() {
  return (
    <article className="space-y-8 sm:space-y-10 text-gray-200 w-full max-w-full">
      {/* ═══ COURSE IMAGE ═══ */}
      <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-lg w-full">
        <img
          src="/images/nazra-hifz-quran.jpg"
          alt="Online Quran Memorization Hifz Course – Al Fatima Academy"
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
        />
      </div>

      {/* ═══ COURSE HEADER ═══ */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <i className="fa-solid fa-heart" /> Sacred Memorization
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
            <i className="fa-solid fa-calendar-check text-gold-400" /> Flexible Schedules
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
          Online Quran Memorization (Hifz) Course
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          A structured, deeply supportive, and retention-focused pathway to memorize the Quran from home.
        </p>
      </div>

      {/* ═══ INTRODUCTION ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            The High Rank of the Hafiz-ul-Quran in Islam
          </h3>
        </div>
        <div className="pl-4 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Becoming a <em>Hafiz-ul-Quran</em> is one of the most noble spiritual aspirations a Muslim can pursue. The Prophet Muhammadﷺ stated: <strong className="text-gold-400">"The one who has memorized the Quran will be with the noble righteous scribes (angels)"</strong> (Sahih al-Bukhari). Furthermore, on the Day of Resurrection, parents of a Hafiz will be adorned with crowns of celestial light.
          </p>
          <p>
            Al Fatima Academy brings the full rigor and barakah of a traditional madrasah straight into your living room. Students maintain regular schooling and family lifestyle while steadily memorizing under certified, compassionate Hifz coaches.
          </p>
        </div>
      </div>

      {/* ═══ 3-TIER MEMORIZATION SYSTEM (SIMPLE LIST, NO CARDS / GRIDS) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            The Proven 3-Tier Memorization System
          </h3>
        </div>
        <p className="text-gray-400 text-sm pl-4">
          The secret to successful Hifz lies not in quick memorization, but in <strong className="text-gray-200">unbreakable retention</strong>. Our three-tier daily regimen ensures nothing is forgotten:
        </p>
        <div className="pl-4 space-y-4 pt-1">
          {TIER_SYSTEM.map((tier) => (
            <div key={tier.num} className="space-y-1">
              <h4 className="text-white font-semibold text-base flex items-baseline gap-2">
                <span className="text-gold-400 font-bold font-mono text-sm">Tier 0{tier.num}:</span>
                <span>{tier.title}</span>
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed pl-6">{tier.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FLEXIBLE MEMORIZATION TRACKS (SIMPLE LIST, NO CARDS / GRIDS) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Flexible Memorization Tracks
          </h3>
        </div>
        <div className="pl-4 space-y-4 pt-1">
          {TRACKS.map((t) => (
            <div key={t.title} className="space-y-1">
              <h4 className="text-white font-semibold text-base flex items-baseline gap-2">
                <span className="text-gold-400">•</span>
                <span>{t.title}</span>
                <span className="text-xs text-gold-400/80 font-normal">({t.badge})</span>
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed pl-4">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ COGNITIVE RETENTION STRATEGIES (SIMPLE LIST, NO CARDS / BOX) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Cognitive Retention Strategies
          </h3>
        </div>
        <div className="pl-4 space-y-4 pt-1">
          {[
            { text: 'Uniform Mushaf Script', desc: 'One standardized copy (Medina Mushaf) so mental photographic memory locks verse positions securely.' },
            { text: 'Auditory Repetition & Tarteel Matching', desc: 'Listening to renowned Qaris (Sheikh Mishary Rashid, Sheikh Minshawi) to imprint rhythms acoustically.' },
            { text: 'Understanding Thematic Meanings', desc: 'Grasping core themes via brief Tafseer snippets — connecting verses logically rather than mechanically.' },
          ].map((item) => (
            <div key={item.text} className="space-y-1">
              <h4 className="text-white font-semibold text-base flex items-baseline gap-2">
                <span className="text-gold-400">•</span>
                <span>{item.text}</span>
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed pl-4">{item.desc}</p>
            </div>
          ))}
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
          <h3 className="font-serif text-xl font-bold text-white">Claim Your 3-Day Free Hifz Evaluation</h3>
          <p className="text-gray-400 text-sm">Let our senior Hafiz evaluate your retention and provide a personalized pacing blueprint.</p>
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
