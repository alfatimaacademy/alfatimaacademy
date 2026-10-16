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
    <article className="space-y-8 sm:space-y-10 text-gray-200 w-full max-w-full">
      {/* ═══ COURSE IMAGE ═══ */}
      <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-lg w-full">
        <img
          src="/images/madni-qaida.jpg"
          alt="Online Noorani & Madni Qaida Course – Al Fatima Academy"
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
        />
      </div>

      {/* ═══ COURSE HEADER ═══ */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <i className="fa-solid fa-graduation-cap" /> Foundation Course
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
            <i className="fa-solid fa-clock text-gold-400" /> 30–45 min / class
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
          Online Noorani & Madni Qaida Course
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          The premier stepping stone for children, beginners, and new Muslims worldwide to master Arabic letters and authentic recitation.
        </p>
      </div>

      {/* ═══ INTRODUCTION ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Why Noorani Qaida is the Gateway to the Holy Quran
          </h3>
        </div>
        <div className="pl-4 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Embarking on the sacred journey of reading the Holy Quran requires a firm and systematic foundation. For centuries, the Noorani Qaida and Madni Qaida booklets have stood as the undisputed standard curriculum for millions of non-Arabic speaking Muslims globally. Arabic is a phonetic language where slight variations in tongue placement, throat articulation, or vocal cord vibration can transform the divine meaning entirely. Our Online Noorani Qaida Course bridges this divide — providing kids, teens, and adult learners with a structured pathway from isolated letters to fluent Quranic recitation.
          </p>
          <p>
            Many parents residing in the United States, United Kingdom, Canada, Australia, and Europe face significant challenges finding qualified Quran teachers locally. Al Fatima Academy brings world-class, certified tutors right into your home through interactive digital whiteboards, color-coded visual Qaida modules, and gentle personalized coaching — turning foundational lessons into an inspiring daily routine.
          </p>
        </div>
      </div>

      {/* ═══ STEP-BY-STEP CURRICULUM (SIMPLE LIST, NO CARDS / GRIDS) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Step-by-Step Course Curriculum
          </h3>
        </div>
        <p className="text-gray-400 text-sm pl-4">
          Our syllabus covers 17 progressive chapters — each milestone practiced, assessed, and celebrated before advancing to the next:
        </p>
        <div className="pl-4 space-y-4 pt-1">
          {CURRICULUM.map((item) => (
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

      {/* ═══ METHODOLOGY ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            Our Personalized 1-on-1 Methodology
          </h3>
        </div>
        <div className="pl-4 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Unlike crowded traditional classrooms where a teacher divides attention across dozens of students, Al Fatima Academy operates on an individualized one-on-one paradigm. Every lesson is conducted live via HD video conferencing with screen-sharing. Your instructor listens attentively to every syllable — catching and correcting minor tongue placement errors before they become permanent habits.
          </p>
          <p>
            Our instructors are vetted for academic qualifications, Sanad credentials, patience, warmth, English fluency, and emotional intelligence with young Western-born children. Parents receive weekly progress reports and can sit alongside their child to monitor improvements firsthand.
          </p>
        </div>
      </div>

      {/* ═══ OUTCOMES (SIMPLE FORM, NO CARD BOX) ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-1 h-6 rounded-full bg-gold-400" />
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400">
            What Students Achieve Upon Completion
          </h3>
        </div>
        <div className="pl-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            Within 3–6 months, students emerge with remarkable reading independence — capable of picking up any Mushaf page and reciting Arabic passages accurately with correct vowel durations, stopping signs (Waqf), and pristine phonetics. Graduates transition seamlessly into our Tajweed or Hifz programs without remedial coaching.
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
          <h3 className="font-serif text-xl font-bold text-white">Begin Your 3-Day Free Trial Today</h3>
          <p className="text-gray-400 text-sm">Experience our interactive Noorani Qaida classes with zero risk or commitment.</p>
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
