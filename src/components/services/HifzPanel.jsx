import { WHATSAPP_NUMBER } from '../../data/site';

const WA_MSG = encodeURIComponent(
  'Assalamu Alaikum! I am interested in the Online Quran Memorization (Hifz) Free Trial Class.'
);

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
    <article className="space-y-8 sm:space-y-10 text-gray-200 w-full max-w-full overflow-hidden">

      {/* ═══ HERO BANNER ═══ */}
      <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-[0_8px_40px_-8px_rgba(212,175,55,0.2)] group w-full max-w-full">
        <div className="relative min-h-[280px] sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-900">
          <img
            src="/images/nazra-hifz-quran.jpg"
            alt="Online Quran Memorization Hifz Course – Al Fatima Academy"
            className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-neutral-950/30 to-transparent" />

          <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <i className="fa-solid fa-heart" /> Sacred Memorization
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-gray-300 text-xs backdrop-blur-md">
              <i className="fa-solid fa-calendar-check text-gold-400" /> Flexible Schedules
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 max-w-full">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <i className="fa-solid fa-crown" /> Etch the Divine Words in Your Heart
            </p>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg break-words">
              Online Quran Memorization (Hifz) Course
            </h2>
            <p className="text-gray-300 text-sm mt-2 max-w-xl hidden sm:block leading-relaxed">
              A structured, deeply supportive, and retention-focused pathway to memorize the Quran from home.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ 4-STAT BAR ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-full">
        {[
          { icon: 'fa-brain',        label: 'Proven 3-Tier System', sub: 'Sabaq · Sabaqi · Manzil' },
          { icon: 'fa-user-shield',  label: 'Personalized Pacing',  sub: 'Never Rush Memorization' },
          { icon: 'fa-medal',        label: 'Hafiz Instructors',    sub: 'Certified Mentors' },
          { icon: 'fa-calendar-day', label: '3-Day Free Trial',     sub: 'Evaluation Session' },
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
            The High Rank of the Hafiz-ul-Quran in Islam
          </h3>
        </div>
        <div className="pl-4 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Becoming a <em>Hafiz-ul-Quran</em> is one of the most noble spiritual aspirations a Muslim can pursue. The Prophet Muhammadﷺ stated: <strong className="text-gold-400">"The one who has memorized the Quran will be with the noble righteous scribes (angels)"</strong> (Sahih al-Bukhari). Furthermore, on the Day of Resurrection, parents of a Hafiz will be adorned with crowns of celestial light.
          </p>
          <p>
            Al Fatima Academy brings the full rigor and barakah of a traditional madrasah straight into your living room. Students maintain regular schooling and family lifestyle while steadily memorizing under certified, compassionate Hifz coaches.
          </p>
        </div>
      </div>

      {/* ═══ 3-TIER SYSTEM ═══ */}
      <div className="bg-neutral-900/50 border border-gold-500/12 rounded-2xl p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            The Proven 3-Tier Memorization System
          </h3>
        </div>
        <p className="text-gray-400 text-sm pl-4">
          The secret to successful Hifz lies not in quick memorization, but in <strong className="text-gray-200">unbreakable retention</strong>. Our three-tier daily regimen ensures nothing is forgotten.
        </p>
        <div className="space-y-4 mt-2">
          {TIER_SYSTEM.map((tier) => (
            <div
              key={tier.num}
              className={`flex gap-4 bg-gradient-to-r ${tier.color} border ${tier.border} rounded-xl p-5 transition-all duration-300`}
            >
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-neutral-900/70 flex items-center justify-center border border-gold-500/20">
                  <i className={`fa-solid ${tier.icon} text-gold-400 text-sm`} />
                </div>
                <span className="text-xs font-bold text-gold-500/60">0{tier.num}</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm leading-tight mb-1.5">{tier.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{tier.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FLEXIBLE TRACKS ═══ */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Flexible Memorization Tracks
          </h3>
        </div>
        <div className="pl-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRACKS.map((t) => (
            <div key={t.title} className="bg-neutral-900/60 border border-gold-500/10 hover:border-gold-500/25 rounded-xl p-5 transition-colors duration-300 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center">
                  <i className={`fa-solid ${t.icon} text-gold-400 text-sm`} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.title}</p>
                  <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.badgeColor}`}>{t.badge}</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ COGNITIVE TECHNIQUES ═══ */}
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/20 bg-neutral-900/50 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
            <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">Cognitive Retention Strategies</h3>
          </div>
          <div className="space-y-3 pl-4">
            {[
              { icon: 'fa-book', text: 'Uniform Mushaf Script', desc: 'One standardized copy (Medina Mushaf) so mental photographic memory locks verse positions securely.' },
              { icon: 'fa-headphones', text: 'Auditory Repetition & Tarteel Matching', desc: 'Listening to renowned Qaris (Sheikh Mishary Rashid, Sheikh Minshawi) to imprint rhythms acoustically.' },
              { icon: 'fa-lightbulb', text: 'Understanding Thematic Meanings', desc: 'Grasping core themes via brief Tafseer snippets — connecting verses logically rather than mechanically.' },
            ].map((item) => (
              <div key={item.text} className="flex gap-3 bg-neutral-950/50 border border-white/5 rounded-xl p-4">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-gold-500/10 flex items-center justify-center">
                  <i className={`fa-solid ${item.icon} text-gold-400 text-xs`} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.text}</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
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
            Start A Sacred Legacy
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Claim Your 3-Day Free Hifz Evaluation
          </h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Let our senior Hafiz evaluate your retention, provide a personalized pacing blueprint, and show you how effortless memorization can feel from home.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noreferrer"
              className="glow-pulse inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-3.5 px-8 rounded-xl text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-gold-500/20"
            >
              <i className="fa-brands fa-whatsapp text-lg" />
              Enroll in Hifz via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
