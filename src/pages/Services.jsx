import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import NooraniQaidaPanel from '../components/services/NooraniQaidaPanel';
import TajweedPanel from '../components/services/TajweedPanel';
import HifzPanel from '../components/services/HifzPanel';
import IslamicDuasPanel from '../components/services/IslamicDuasPanel';

const SERVICES = [
  {
    id: 'noorani-qaida',
    title: 'Noorani Qaida',
    subtitle: 'Arabic Alphabet Foundation',
    icon: 'fa-book-open',
    color: '#D4AF37',
    img: '/images/madni-qaida.jpg',
    badge: 'Beginner',
    duration: '3–6 Months',
    Panel: NooraniQaidaPanel,
  },
  {
    id: 'tajweed-quran',
    title: 'Tajweed-ul-Quran',
    subtitle: 'Master Quranic Recitation',
    icon: 'fa-microphone',
    color: '#c9a227',
    img: '/images/tajweed-quran.jpg',
    badge: 'Intermediate',
    duration: '6–12 Months',
    Panel: TajweedPanel,
  },
  {
    id: 'hifz-quran',
    title: 'Quran Memorization',
    subtitle: 'Hifz – Etch the Quran in Your Heart',
    icon: 'fa-heart',
    color: '#b8941f',
    img: '/images/nazra-hifz-quran.jpg',
    badge: 'Advanced',
    duration: '2–3 Years',
    Panel: HifzPanel,
  },
  {
    id: 'islamic-duas',
    title: 'Islamic Duas & Etiquette',
    subtitle: 'Daily Prayers & Moral Character',
    icon: 'fa-hands-praying',
    color: '#D4AF37',
    img: '/images/islamic-supplications.jpg',
    badge: 'All Levels',
    duration: 'Ongoing',
    Panel: IslamicDuasPanel,
  },
];

const DEFAULT_SERVICE = 'noorani-qaida';



export default function Services() {
  const { hash } = useLocation();
  const requested = hash.replace('#', '');
  const activeId = SERVICES.some((s) => s.id === requested) ? requested : DEFAULT_SERVICE;
  const currentService = SERVICES.find((s) => s.id === activeId) || SERVICES[0];
  const [panelKey, setPanelKey] = useState(activeId);

  usePageMeta(`${currentService.title} – Al Fatima Academy`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPanelKey(activeId);
  }, [activeId]);

  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* ─────────── PAGE HERO HEADER ─────────── */}
      <div className="relative overflow-hidden bg-neutral-950 pattern-grid border-b border-gold-500/10">
        {/* Ambient glow orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <i className="fa-solid fa-chevron-right text-[10px]" />
            <span className="text-gold-400 font-medium">Our Courses</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
                Premium Islamic Education
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Our <span className="text-gold-gradient">Quranic</span> Courses
              </h1>
              <p className="mt-3 text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
                Certified 1-on-1 online classes for kids & adults worldwide. Choose your learning path below.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 sm:flex items-center gap-3 sm:gap-6 md:gap-8 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gold-500/10">
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-gold-400 font-serif">500+</p>
                <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">Active Students</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gold-500/20" />
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-gold-400 font-serif">4</p>
                <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">Expert Courses</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gold-500/20" />
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-gold-400 font-serif">3-Day</p>
                <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">Free Trial</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────── MAIN CONTENT CONTAINER ─────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Course Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-12">
          {SERVICES.map((s) => {
            const isActive = s.id === activeId;
            return (
              <Link
                key={s.id}
                to={`/services#${s.id}`}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20 scale-[1.02]'
                    : 'bg-neutral-900 text-gray-300 border border-gold-500/15 hover:border-gold-500/40 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${s.icon} text-xs ${isActive ? 'text-neutral-950' : 'text-gold-400'}`} />
                <span>{s.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Panel Content — only active panel shown */}
        <div key={panelKey} className="fade-in-up w-full">
          {SERVICES.map(({ id, Panel }) => (
            <div
              key={id}
              id={`panel-${id}`}
              className={`w-full ${id === activeId ? 'block' : 'hidden'}`}
            >
              <Panel />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
