import { Link } from 'react-router-dom';

const CURRICULUM = [
  {
    step: '01',
    title: 'Single Letters (Mufradat)',
    desc: 'Recognizing all 29 Arabic letters individually, emphasizing 17 unique articulation points (Makharij) from chest, throat, tongue, teeth and lips.',
  },
  {
    step: '02',
    title: 'Compound Letters (Murakkabat)',
    desc: 'Mastering cursive Arabic joins. Students identify letter variations in beginning, middle, and end positions for effortless visual decoding.',
  },
  {
    step: '03',
    title: 'Short Vowels (Harakat)',
    desc: 'Understanding Fatha (Zabar), Kasra (Zer), and Damma (Pesh) with crisp pronunciation and stable rhythmic cadence.',
  },
  {
    step: '04',
    title: 'Tanween & Double Vowels',
    desc: 'Do Zabar, Do Zer, Do Pesh — mastering hidden Noon Sakinah acoustics and nasal resonance for intermediate Tajweed readiness.',
  },
  {
    step: '05',
    title: 'Madd & Leen Letters',
    desc: 'Long vowels (Alif, Waw, Yaa Maddah) and soft diphthongs (Waw Leen, Yaa Leen). Natural two-count prolongation and fluid voice control.',
  },
  {
    step: '06',
    title: 'Sukun, Shaddah & Sight-Reading',
    desc: 'Quiescent letters (Jazm/Sukun), doubling markers (Tashdeed), Qalqalah bounce sounds — transitioning to continuous Rawaan reading.',
  },
];

const FAQS = [
  {
    q: 'At what age can my child start the Noorani Qaida course?',
    a: 'Children as young as 4–5 years old can begin. We use fun visual aids, mnemonic associations, and interactive digital activities to keep young minds engaged throughout the 30-minute lessons.',
  },
  {
    q: 'Can adults who never learned Arabic join this course?',
    a: 'Absolutely. Specialized adult classes are conducted in complete privacy with polite, understanding teachers. Many adult reverts and professionals have successfully started with us.',
  },
  {
    q: 'Are female Quran teachers available for sisters and young girls?',
    a: 'Yes — certified female Islamic scholars and Hafiza tutors are available around the clock with complete modesty and comfort.',
  },
];

export default function NooraniQaidaPanel() {
  return (
    <article className="space-y-8 sm:space-y-10 text-gray-200 w-full max-w-full overflow-hidden">

      {/* ═══ HERO BANNER IMAGE ═══ */}
      <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-[0_8px_40px_-8px_rgba(212,175,55,0.2)] group w-full max-w-full">
        <div className="relative min-h-[280px] sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-900">
          <img
            src="/images/madni-qaida.jpg"
            alt="Online Noorani & Madni Qaida Course – Al Fatima Academy"
            className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 brightness-[0.85]"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-neutral-950/30 to-transparent" />

          {/* Top metadata */}
          <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <i className="fa-solid fa-graduation-cap" /> Foundation Course
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-gray-300 text-xs backdrop-blur-md">
              <i className="fa-solid fa-clock text-gold-400" /> 30–45 min / class
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 max-w-full">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <i className="fa-solid fa-book-open" /> Step-by-step Quranic Reading
            </p>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg break-words">
              Online Noorani & Madni Qaida Course
            </h2>
            <p className="text-gray-300 text-sm mt-2 max-w-xl hidden sm:block leading-relaxed">
              The premier stepping stone for children, beginners, and new Muslims worldwide to master Arabic letters and authentic recitation.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ 4-STAT HIGHLIGHT BAR ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-full">
        {[
          { icon: 'fa-user-check', label: '1-on-1 Classes', sub: 'Individual Attention' },
          { icon: 'fa-users',      label: 'Kids & Adults',  sub: 'All Age Groups' },
          { icon: 'fa-venus-mars', label: 'Male & Female',  sub: 'Certified Qaris' },
          { icon: 'fa-award',      label: '3-Day Free Trial', sub: 'Zero Commitment' },
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
            Why Noorani Qaida is the Gateway to the Holy Quran
          </h3>
        </div>
        <div className="pl-4 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Embarking on the sacred journey of reading the Holy Quran requires a firm and systematic foundation. For centuries, the Noorani Qaida and Madni Qaida booklets have stood as the undisputed standard curriculum for millions of non-Arabic speaking Muslims globally. Arabic is a phonetic language where slight variations in tongue placement, throat articulation, or vocal cord vibration can transform the divine meaning entirely. Our Online Noorani Qaida Course bridges this divide — providing kids, teens, and adult learners with a structured pathway from isolated letters to fluent Quranic recitation.
          </p>
          <p>
            Many parents residing in the United States, United Kingdom, Canada, Australia, and Europe face significant challenges finding qualified Quran teachers locally. Al Fatima Academy brings world-class, certified tutors right into your home through interactive digital whiteboards, color-coded visual Qaida modules, and gentle personalized coaching — turning foundational lessons into an inspiring daily routine.
          </p>
        </div>
      </div>

      {/* ═══ CURRICULUM STEPS ═══ */}
      <div className="bg-neutral-900/50 border border-gold-500/12 rounded-2xl p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Step-by-Step Course Curriculum
          </h3>
        </div>
        <p className="text-gray-400 text-sm pl-4">
          Our syllabus covers 17 progressive chapters — each milestone practiced, assessed, and celebrated before advancing to the next.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {CURRICULUM.map((item) => (
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

      {/* ═══ TEACHING METHODOLOGY ═══ */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Our Personalized 1-on-1 Methodology
          </h3>
        </div>
        <div className="pl-4 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Unlike crowded traditional classrooms where a teacher divides attention across dozens of students, Al Fatima Academy operates on an individualized one-on-one paradigm. Every lesson is conducted live via HD video conferencing with screen-sharing. Your instructor listens attentively to every syllable — catching and correcting minor tongue placement errors before they become permanent habits.
          </p>
          <p>
            Our instructors are vetted for academic qualifications, Sanad credentials, patience, warmth, English fluency, and emotional intelligence with young Western-born children. Parents receive weekly progress reports and can sit alongside their child to monitor improvements firsthand.
          </p>
        </div>
      </div>

      {/* ═══ OUTCOMES HIGHLIGHT BOX ═══ */}
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/25 bg-neutral-900/60 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex gap-4 items-start">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center">
            <i className="fa-solid fa-trophy text-gold-400 text-lg" />
          </div>
          <div>
            <h3 className="font-serif text-lg md:text-xl font-bold text-gold-400 mb-2">
              What Students Achieve Upon Completion
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Within 3–6 months, students emerge with remarkable reading independence — capable of picking up any Mushaf page and reciting Arabic passages accurately with correct vowel durations, stopping signs (Waqf), and pristine phonetics. Graduates transition seamlessly into our Tajweed or Hifz programs without remedial coaching.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ FAQ SECTION ═══ */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-7 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Frequently Asked Questions
          </h3>
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

      {/* ═══ CTA BANNER ═══ */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-gold-500/30 bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-950 p-7 md:p-10 text-center">
        {/* Glow orbs */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-gold-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gold-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-bold uppercase tracking-widest">
            Zero Risk · No Card Required
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Begin Your 3-Day Free Trial Today
          </h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Experience our interactive Noorani Qaida classes first-hand. Contact our coordinators to pick your preferred schedule and teacher.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="glow-pulse inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-3.5 px-8 rounded-xl text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-gold-500/20"
            >
              <i className="fa-solid fa-paper-plane text-sm" />
              Enroll Now
            </Link>
          </div>
        </div>
      </div>

    </article>
  );
}
