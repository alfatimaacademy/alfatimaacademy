import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DESKTOP_SERVICES = [
  { id: 'noorani-qaida', icon: 'fa-book-open', label: 'Noorani Qaida Course' },
  { id: 'tajweed-quran', icon: 'fa-microphone', label: 'Tajweed-ul-Quran Course' },
  { id: 'hifz-quran', icon: 'fa-heart', label: 'Quran Memorization (Hifz)' },
  { id: 'islamic-duas', icon: 'fa-star', label: 'Islamic Supplications & Etiquette' },
];

const MOBILE_SERVICES = [
  { id: 'noorani-qaida', icon: 'fa-book-open', label: 'Noorani Qaida' },
  { id: 'tajweed-quran', icon: 'fa-microphone', label: 'Tajweed-ul-Quran' },
  { id: 'hifz-quran', icon: 'fa-heart', label: 'Hifz Quran' },
  { id: 'islamic-duas', icon: 'fa-star', label: 'Islamic Duas' },
];

// `hover` differs per link in the original design (Packages uses gold-400).
const DESKTOP_LINKS = [
  { to: '/', label: 'Home', hover: 'hover:text-gold-500' },
  { to: '/about', label: 'About Us', hover: 'hover:text-gold-500' },
  { to: '/services', label: 'Services', hover: 'hover:text-gold-500', dropdown: true },
  { to: '/packages', label: 'Packages', hover: 'hover:text-gold-400' },
  { to: '/quran', label: 'Read Quran', hover: 'hover:text-gold-500' },
  { to: '/blog', label: 'Blog', hover: 'hover:text-gold-500' },
  { to: '/contact', label: 'Contact', hover: 'hover:text-gold-500' },
];

const MOBILE_LINKS = [
  { to: '/', label: 'Home', icon: 'fa-house' },
  { to: '/about', label: 'About Us', icon: 'fa-circle-info' },
  { services: true },
  { to: '/packages', label: 'Packages', icon: 'fa-tags' },
  { to: '/quran', label: 'Read Quran', icon: 'fa-book-quran' },
  { to: '/blog', label: 'Blog', icon: 'fa-newspaper' },
  { to: '/contact', label: 'Contact', icon: 'fa-envelope' },
];

function currentPageOf(pathname) {
  let page = pathname.replace(/\/+$/, '').replace(/\.html$/, '') || '/';
  if (page === '/index') page = '/';
  return page;
}

export default function Header() {
  const { pathname, hash } = useLocation();
  const currentPage = currentPageOf(pathname);

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Detect scroll to enhance navbar styling when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on every navigation (the old multi-page site did this by reloading)
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname, hash]);

  // Close mobile menu on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && btnRef.current && !menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const mobileLinkClass = (active) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all ${
      active ? 'text-gold-400 bg-gold-500/10' : 'text-gray-300'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-gold-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-0'
          : 'bg-neutral-950/80 backdrop-blur-sm border-b border-gold-500/15 py-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 pr-2">
            <img
              src="/images/academy-logo.jpg"
              alt="Al Fatima Academy Logo"
              className="w-11 h-11 sm:w-14 sm:h-14 object-contain rounded-full border border-gold-500/30 bg-black shrink-0"
            />
            <div className="min-w-0">
              <span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-wider text-gold-gradient block truncate">
                Al Fatima Academy
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-gray-400 block -mt-0.5 sm:-mt-1 truncate">
                A Project of Al Quran International
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop only) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide">
            {DESKTOP_LINKS.map((link) => {
              const active = currentPage === link.to;
              if (!link.dropdown) {
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`nav-link ${link.hover} transition-colors${active ? ' text-gold-500' : ''}`}
                  >
                    {link.label}
                  </Link>
                );
              }
              // Services Hover Dropdown (the "Services" label itself does nothing on click)
              return (
                <div key={link.to} className="relative group py-3">
                  <a
                    onClick={(e) => e.preventDefault()}
                    style={{ cursor: 'default' }}
                    className={`nav-link ${link.hover} flex items-center gap-1 transition-colors${active ? ' text-gold-500' : ''}`}
                  >
                    Services
                    <svg
                      className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 bg-neutral-900/95 backdrop-blur-md border border-gold-500/25 rounded-2xl shadow-2xl shadow-black/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50 overflow-hidden pointer-events-none group-hover:pointer-events-auto">
                    <div className="p-1.5">
                      {DESKTOP_SERVICES.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services#${s.id}`}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-gold-400 hover:bg-gold-500/10 transition-all text-sm font-medium"
                        >
                          <i className={`fa-solid ${s.icon} text-gold-500 w-4`} /> {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Right Side: Phone (desktop) + Hamburger (mobile) */}
          <div className="flex items-center space-x-3">
            <a
              href="tel:+923075329240"
              className="hidden lg:flex items-center space-x-2 text-xs font-bold border border-gold-500/30 px-3 py-1.5 rounded-full bg-gold-500/5 hover:bg-gold-500/20 transition-all text-gold-400"
            >
              <i className="fa-solid fa-phone" />
              <span>+923075329240</span>
            </a>

            {/* Hamburger Button (mobile only) */}
            <button
              id="mobileMenuBtn"
              ref={btnRef}
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-400 hover:bg-gold-500/20 transition-all focus:outline-none"
              aria-label="Open Menu"
            >
              <i id="mobileMenuIcon" className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        id="mobileMenu"
        ref={menuRef}
        className={`${menuOpen ? '' : 'hidden '}md:hidden bg-neutral-950/98 backdrop-blur-md border-t border-gold-500/15 px-4 pb-6 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl`}
      >
        <ul className="space-y-1 pt-3 text-sm font-semibold">
          {MOBILE_LINKS.map((link) =>
            link.services ? (
              <li key="services">
                <button
                  onClick={() => setServicesOpen((open) => !open)}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-gold-500/10 hover:text-gold-400 transition-all text-gray-300"
                >
                  <span className="flex items-center gap-3">
                    <i className="fa-solid fa-layer-group text-gold-500 w-4" /> Services
                  </span>
                  <i
                    id="mobileServicesChevron"
                    className="fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-200"
                    style={servicesOpen ? { transform: 'rotate(180deg)' } : undefined}
                  />
                </button>
                <ul
                  id="mobileServicesList"
                  className={`${servicesOpen ? '' : 'hidden '}pl-7 mt-1 space-y-1 border-l border-gold-500/20 ml-4`}
                >
                  {MOBILE_SERVICES.map((s) => (
                    <li key={s.id}>
                      <Link
                        to={`/services#${s.id}`}
                        onClick={closeMenu}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-gold-400 hover:bg-gold-500/10 transition-all"
                      >
                        <i className={`fa-solid ${s.icon} text-gold-500/70 w-3`} /> {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.to}>
                <Link to={link.to} className={mobileLinkClass(currentPage === link.to)}>
                  <i className={`fa-solid ${link.icon} text-gold-500 w-4`} /> {link.label}
                </Link>
              </li>
            )
          )}
          {/* Phone (mobile) */}
          <li className="pt-1 border-t border-gold-500/10 mt-2">
            <a
              href="tel:+923075329240"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 transition-all font-bold"
            >
              <i className="fa-solid fa-phone w-4" /> +923075329240
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
