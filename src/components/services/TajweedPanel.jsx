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
    <article className="space-y-8 sm:space-y-10 text-gray-200 w-full max-w-full">
      {/* ═══ COURSE IMAGE ═══ */}
      <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-lg w-full">
        <img
          src="/images/tajweed-quran.jpg"
          alt="Online Tajweed-ul-Quran Course – Al Fatima Academy"
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
        />
      </div>

      {/* ═══ COURSE HEADER ═══ */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <i className="fa-solid fa-microphone" /> Mastery of Recitation
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
            <i className="fa-solid fa-certificate text-gold-400" /> Ijazah-Certified Qaris
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
          Online Tajweed-ul-Quran Course
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          Transform your Quran recitation from mechanical reading into an eloquent, soul-stirring art following authentic Sunnah rules.
        </p>
      </div>

      {/* ═══ INTRODUCTION ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            The Sacred Obligation of Tajweed: Reciting as Revealed
          </h3>
        </div>
        <div className="pl-4 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            The Arabic word <em>Tajweed</em> means "proficiency" and "exceptional excellence." In religious terminology, Tajweed represents the science of giving each Arabic letter its exact rights and dues — honoring its articulation point (Makhraj) and innate acoustic characteristics (Sifat). Allah commands in Surah Al-Muzzammil 73:4: <strong className="text-gold-400">"And recite the Quran with measured, rhythmic recitation [Tarteel]."</strong>
          </p>
          <p>
            Reciting without Tajweed leads to subtle errors known as <em>Lahn-e-Khafi</em> and <em>Lahn-e-Jali</em>. For example, mispronouncing 'Qaf' (ق) as 'Kaaf' (ك) transforms <em>Qalb</em> (heart) into <em>Kalb</em> (dog) — unwittingly altering divine meaning. Our course protects reciters from such errors, enabling confident, precise, and heartfelt recitation.
          </p>
        </div>
      </div>

      {/* ═══ CORE CURRICULUM MODULES (SIMPLE LIST, NO CARDS / GRIDS) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Core Curriculum Modules & Practical Drills
          </h3>
        </div>
        <p className="text-gray-400 text-sm pl-4">
          Synthesizing classical texts with modern voice coaching — guided through vocal drills and theory progressively:
        </p>
        <div className="pl-4 space-y-4 pt-1">
          {MODULES.map((item) => (
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

      {/* ═══ TALAQQI METHOD ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            The Classical Method of Talaqqi & Musyafahah
          </h3>
        </div>
        <div className="pl-4 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Tajweed cannot be mastered through books or pre-recorded videos alone — it requires <em>Talaqqi</em> (direct oral transmission). In our private 1-on-1 virtual sessions, the student listens to the teacher's mouth and tongue movements, recites in return, and receives instant corrections — exactly as the Prophet Muhammadﷺ taught his Companions.
          </p>
        </div>
      </div>

      {/* ═══ WHO BENEFITS MOST (SIMPLE LIST, NO CARDS / GRIDS) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Who Benefits Most?
          </h3>
        </div>
        <div className="pl-4 space-y-4 pt-1">
          {[
            { title: 'Children & Youth', desc: 'Establish pristine pronunciation habits early before regional accents set in.' },
            { title: 'Adults & Professionals', desc: 'Rectify longstanding mistakes in a private, non-judgmental environment.' },
            { title: 'Hifz Aspirants', desc: 'Solidify Tajweed before memorization — verses etched with flawless accuracy.' },
            { title: 'Imams & Teachers', desc: 'Deepen grasp of Jazariyyah texts and advance toward formal Ijazah certification.' },
          ].map((item) => (
            <div key={item.title} className="space-y-1">
              <h4 className="text-white font-semibold text-base flex items-baseline gap-2">
                <span className="text-gold-400">•</span>
                <span>{item.title}</span>
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
          <h3 className="font-serif text-xl font-bold text-white">Book Your Free 3-Day Tajweed Evaluation</h3>
          <p className="text-gray-400 text-sm">Receive a personalized recitation assessment from our Senior Qari with zero risk.</p>
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
