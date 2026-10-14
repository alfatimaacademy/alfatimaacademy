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

const BADGE_COLORS = {
  Beginner: 'bg-emerald-900/60 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-blue-900/60 text-blue-400 border-blue-500/30',
  Advanced: 'bg-purple-900/60 text-purple-400 border-purple-500/30',
  'All Levels': 'bg-amber-900/60 text-amber-400 border-amber-500/30',
};

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

      {/* ─────────── MAIN TWO-COLUMN LAYOUT ─────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14 w-full">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-stretch lg:items-start w-full">

          {/* ══════════ LEFT SIDEBAR (Desktop only) ══════════ */}
          <aside className="hidden lg:block lg:w-80 xl:w-88 shrink-0 lg:sticky lg:top-24">
            {/* Course Navigation Cards */}
            <div className="rounded-2xl overflow-hidden border border-gold-500/15 bg-neutral-900/60 backdrop-blur-sm shadow-2xl">
              <div className="px-5 py-4 border-b border-gold-500/10">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Select a Course</p>
              </div>

              <nav className="p-3 space-y-2">
                {SERVICES.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <Link
                      key={s.id}
                      to={`/services#${s.id}`}
                      className={`group flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-gold-500/20 to-gold-500/5 border border-gold-500/40 shadow-lg shadow-gold-500/10'
                          : 'hover:bg-neutral-800/70 border border-transparent hover:border-gold-500/10'
                      }`}
                    >
                      {/* Active left accent bar */}
                      {isActive && (
                        <span className="absolute left-0 inset-y-0 w-0.5 bg-gold-400 rounded-r-full" />
                      )}

                      {/* Course icon avatar */}
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? 'bg-gold-500 shadow-lg shadow-gold-500/30'
                          : 'bg-neutral-800 group-hover:bg-neutral-700'
                      }`}>
                        <i className={`fa-solid ${s.icon} text-base ${isActive ? 'text-neutral-950' : 'text-gold-400'}`} />
                      </div>

                      {/* Course info */}
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm leading-tight truncate ${isActive ? 'text-gold-400' : 'text-gray-200 group-hover:text-white'}`}>
                          {s.title}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5 truncate">{s.subtitle}</p>
                      </div>

                      {/* Arrow */}
                      <i className={`fa-solid fa-chevron-right text-xs transition-all duration-300 ${
                        isActive ? 'text-gold-400 translate-x-0' : 'text-gray-600 -translate-x-1 group-hover:translate-x-0 group-hover:text-gray-400'
                      }`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Info Card */}
            <div className="mt-4 rounded-2xl border border-gold-500/15 bg-neutral-900/60 backdrop-blur-sm overflow-hidden">
              <div className="relative h-32 overflow-hidden">
                <img
                  src={currentService.img}
                  alt={currentService.title}
                  className="w-full h-full object-cover opacity-40 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${BADGE_COLORS[currentService.badge]}`}>
                    {currentService.badge}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-serif font-bold text-white text-base leading-tight">{currentService.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <i className="fa-solid fa-clock text-gold-500 w-4" />
                    <span>Duration: <strong className="text-gray-200">{currentService.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <i className="fa-solid fa-user-check text-gold-500 w-4" />
                    <span>1-on-1 Live Classes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <i className="fa-solid fa-globe text-gold-500 w-4" />
                    <span>Available Worldwide</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <i className="fa-solid fa-venus-mars text-gold-500 w-4" />
                    <span>Male &amp; Female Tutors</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="glow-pulse mt-2 flex items-center justify-center gap-2 w-full bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02]"
                >
                  <i className="fa-solid fa-paper-plane text-sm" />
                  Start Free 3-Day Trial
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 rounded-2xl border border-gold-500/10 bg-neutral-900/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Why Al Fatima Academy?</p>
              <div className="space-y-2.5">
                {[
                  { icon: 'fa-shield-halved', text: 'Certified Quran Scholars with Sanad' },
                  { icon: 'fa-star', text: '5-Star Rated by 200+ Families' },
                  { icon: 'fa-lock', text: 'Safe, Secure & Private Sessions' },
                  { icon: 'fa-rotate', text: 'Free Reschedule Anytime' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5 text-xs text-gray-400">
                    <div className="w-6 h-6 rounded-lg bg-gold-500/10 flex items-center justify-center shrink-0">
                      <i className={`fa-solid ${item.icon} text-gold-500 text-[11px]`} />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ══════════ RIGHT CONTENT PANEL ══════════ */}
          <main className="w-full flex-1 min-w-0">
            {/* Mobile course switcher (sticky below header on small screens) */}
            <div className="lg:hidden sticky top-20 z-20 bg-neutral-950/95 backdrop-blur-md py-2.5 border-b border-gold-500/15 w-full overflow-x-auto no-scrollbar mb-6">
              <div className="flex gap-2 pb-0.5">
                {SERVICES.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <Link
                      key={s.id}
                      to={`/services#${s.id}`}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                        isActive
                          ? 'bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20'
                          : 'bg-neutral-900 text-gray-300 border border-gold-500/10 hover:border-gold-500/30'
                      }`}
                    >
                      <i className={`fa-solid ${s.icon} text-[11px]`} />
                      {s.title}
                    </Link>
                  );
                })}
              </div>
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

            {/* Mobile Trust Badges & Guarantee (shown on small screens below panel) */}
            <div className="lg:hidden mt-8 rounded-2xl border border-gold-500/15 bg-neutral-900/40 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3 text-center">
                Why Study at Al Fatima Academy?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: 'fa-shield-halved', text: 'Certified Quran Scholars with Sanad' },
                  { icon: 'fa-star', text: '5-Star Rated by 200+ Families' },
                  { icon: 'fa-lock', text: 'Safe, Secure & Private Sessions' },
                  { icon: 'fa-rotate', text: 'Free Reschedule Anytime' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5 text-xs text-gray-300">
                    <div className="w-6 h-6 rounded-lg bg-gold-500/10 flex items-center justify-center shrink-0">
                      <i className={`fa-solid ${item.icon} text-gold-500 text-[11px]`} />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
