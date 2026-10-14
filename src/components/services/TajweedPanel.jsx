import { Link } from 'react-router-dom';

const MODULES = [
  {
    step: '01',
    title: 'Makharij al-Huroof',
    desc: 'Pinpoint exploration of 5 vocal regions (Jawf, Halq, Lisaan, Shafataan, Khayshoom). Eliminate foreign accents with precise throat and tongue drills.',
  },
  {
    step: '02',
    title: 'Sifat al-Huroof (Letter Characteristics)',
    desc: 'Opposing & non-opposing traits: Hams vs Jahr, Shiddah vs Rikhwah, Tafkheem (heavy letters: خ ص ض غ ط ق ظ) vs Tarqeeq, and Qalqalah bounce (ق ط ب ج د).',
  },
  {
    step: '03',
    title: 'Rules of Noon Sakinah & Tanween',
    desc: 'Four foundational rules: Izhar (clear), Idgham (assimilation with/without Ghunnah), Iqlab (noon→meem), and Ikhfa (concealment across 15 letters).',
  },
  {
    step: '04',
    title: 'Rules of Meem Sakinah & Ghunnah',
    desc: 'Ikhfa Shafawi, Idgham Shafawi, and Izhar Shafawi for pristine lip closure. Proper duration of Ghunnah in Noon and Meem Mushaddadah.',
  },
  {
    step: '05',
    title: 'Ahkam al-Madd (Prolongations)',
    desc: 'Duration counts: Madd Tabee\'i (2 beats), Munfasil & Muttasil (4–5 beats), and Madd Lazim (6 beats) during compulsory pauses.',
  },
  {
    step: '06',
    title: 'Waqf & Ibtida (Stopping Signs)',
    desc: 'Quranic punctuation markers (Meem, Laa, Jeem, Qif, Sad-Lam). Learn safe breath points without breaking the contextual message of the verse.',
  },
];

const FAQS = [
  {
    q: 'How long does it take to learn Tajweed fluently?',
    a: 'Most students notice dramatic pronunciation improvements within 4–8 weeks. Achieving full fluency across the Quran typically requires 6–12 months of consistent 1-on-1 practice 2–4 times per week.',
  },
  {
    q: 'Do I need Arabic grammar (Nahu/Sarf) knowledge to study Tajweed?',
    a: 'No. Tajweed focuses purely on phonetics, articulation, and oral delivery. You only need to read basic Arabic script (from Noorani Qaida level).',
  },
  {
    q: 'Can I choose female tutors for my daughters or myself?',
    a: 'Yes — Ijazah-certified female teachers are available in multiple time zones (US, UK, Europe, Australia) with full scheduling flexibility.',
  },
];

export default function TajweedPanel() {
  return (
    <article className="space-y-8 sm:space-y-10 text-gray-200 w-full max-w-full overflow-hidden">

      {/* ═══ HERO BANNER ═══ */}
      <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-[0_8px_40px_-8px_rgba(212,175,55,0.2)] group w-full max-w-full">
        <div className="relative min-h-[280px] sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-900">
          <img
            src="/images/tajweed-quran.jpg"
            alt="Online Tajweed-ul-Quran Course – Al Fatima Academy"
            className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-neutral-950/30 to-transparent" />

          <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <i className="fa-solid fa-microphone" /> Mastery of Recitation
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-gray-300 text-xs backdrop-blur-md">
              <i className="fa-solid fa-certificate text-gold-400" /> Ijazah-Certified Qaris
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 max-w-full">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <i className="fa-solid fa-gem" /> Perfect Phonetics · Divine Harmony
            </p>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg break-words">
              Online Tajweed-ul-Quran Course
            </h2>
            <p className="text-gray-300 text-sm mt-2 max-w-xl hidden sm:block leading-relaxed">
              Transform your Quran recitation from mechanical reading into an eloquent, soul-stirring art following authentic Sunnah rules.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ 4-STAT BAR ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-full">
        {[
          { icon: 'fa-bullhorn',    label: 'Makharij Mastery',  sub: 'Precise Articulation' },
          { icon: 'fa-music',       label: 'Tarteel & Cadence', sub: 'Rhythmic Melody' },
          { icon: 'fa-certificate', label: 'Ijazah Certified',  sub: 'Qualified Mentors' },
          { icon: 'fa-circle-play', label: '3-Day Free Trial',  sub: 'Instant Scheduling' },
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
            The Sacred Obligation of Tajweed: Reciting as Revealed
          </h3>
        </div>
        <div className="pl-4 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            The Arabic word <em>Tajweed</em> means "proficiency" and "exceptional excellence." In religious terminology, Tajweed represents the science of giving each Arabic letter its exact rights and dues — honoring its articulation point (Makhraj) and innate acoustic characteristics (Sifat). Allah commands in Surah Al-Muzzammil 73:4: <strong className="text-gold-400">"And recite the Quran with measured, rhythmic recitation [Tarteel]."</strong>
          </p>
          <p>
            Reciting without Tajweed leads to subtle errors known as <em>Lahn-e-Khafi</em> and <em>Lahn-e-Jali</em>. For example, mispronouncing 'Qaf' (ق) as 'Kaaf' (ك) transforms <em>Qalb</em> (heart) into <em>Kalb</em> (dog) — unwittingly altering divine meaning. Our course protects reciters from such errors, enabling confident, precise, and heartfelt recitation.
          </p>
        </div>
      </div>

      {/* ═══ COURSE MODULES ═══ */}
      <div className="bg-neutral-900/50 border border-gold-500/12 rounded-2xl p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Core Curriculum Modules & Practical Drills
          </h3>
        </div>
        <p className="text-gray-400 text-sm pl-4">
          Synthesizing classical texts with modern voice coaching — guided through vocal drills and theory progressively.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {MODULES.map((item) => (
            <div
              key={item.step}
              className="group flex gap-4 bg-neutral-950/50 hover:bg-neutral-950/80 border border-white/5 hover:border-gold-500/20 p-4 rounded-xl transition-all duration-300"
            >
              <span className="shrink-0 w-9 h-9 rounded-lg bg-gold-500/10 group-hover:bg-gold-500/20 flex items-center justify-center text-gold-400 font-bold text-xs font-mono transition-colors">
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

      {/* ═══ TALAQQI METHOD ═══ */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            The Classical Method of Talaqqi & Musyafahah
          </h3>
        </div>
        <div className="pl-4 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Tajweed cannot be mastered through books or pre-recorded videos alone — it requires <em>Talaqqi</em> (direct oral transmission). In our private 1-on-1 virtual sessions, the student listens to the teacher's mouth and tongue movements, recites in return, and receives instant corrections — exactly as the Prophet Muhammadﷺ taught his Companions.
          </p>
        </div>
      </div>

      {/* ═══ WHO IS IT FOR ═══ */}
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/20 bg-neutral-900/50 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
            <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">Who Benefits Most?</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: 'fa-child', title: 'Children & Youth', desc: 'Establish pristine pronunciation habits early before regional accents set in.' },
              { icon: 'fa-user-tie', title: 'Adults & Professionals', desc: 'Rectify longstanding mistakes in a private, non-judgmental environment.' },
              { icon: 'fa-heart', title: 'Hifz Aspirants', desc: 'Solidify Tajweed before memorization — verses etched with flawless accuracy.' },
              { icon: 'fa-mosque', title: 'Imams & Teachers', desc: 'Deepen grasp of Jazariyyah texts and advance toward formal Ijazah certification.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 bg-neutral-950/50 border border-white/5 rounded-xl p-4">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-gold-500/10 flex items-center justify-center">
                  <i className={`fa-solid ${item.icon} text-gold-400 text-xs`} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
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
            Transform Your Recitation
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Book Your Free 3-Day Tajweed Evaluation
          </h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Receive a personalized recitation assessment from our Senior Qari — with zero financial risk.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="glow-pulse inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-3.5 px-8 rounded-xl text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-gold-500/20"
            >
              <i className="fa-solid fa-paper-plane text-sm" />
              Schedule Tajweed Trial
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
