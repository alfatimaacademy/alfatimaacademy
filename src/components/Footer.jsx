import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/packages', label: 'Packages' },
  { to: '/quran', label: 'Read Quran' },
  { to: '/contact', label: 'Contact' },
];

const COURSES = [
  { id: 'noorani-qaida', label: 'Noorani Qaida Course' },
  { id: 'tajweed-quran', label: 'Tajweed-ul-Quran Course' },
  { id: 'hifz-quran', label: 'Quran Memorization (Hifz)' },
  { id: 'islamic-duas', label: 'Islamic Supplications & Etiquette' },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 py-10 sm:py-12 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Logo & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/images/academy-logo.jpg"
                alt="Al Fatima Academy Logo"
                className="w-12 h-12 object-contain rounded-full border border-gold-500 bg-black"
              />
              <span className="font-serif text-lg font-bold tracking-wider text-gold-gradient block">
                Al Fatima Academy
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Spreading the light of the Quran globally. High quality, online Islamic classes using state of the art
              tools.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gold-400 mb-4 tracking-wider uppercase">Quick Links</h4>
            <ul className="text-xs text-gray-400 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-gold-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Courses */}
          <div>
            <h4 className="text-sm font-bold text-gold-400 mb-4 tracking-wider uppercase">Our Courses</h4>
            <ul className="text-xs text-gray-400 space-y-2">
              {COURSES.map((course) => (
                <li key={course.id}>
                  <Link to={`/services#${course.id}`} className="hover:text-gold-500 transition-colors">
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="text-sm font-bold text-gold-400 mb-4 tracking-wider uppercase">Academy Location</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">
              Lahore, Punjab, Pakistan (Active internationally across UK, US, Arab states and beyond)
            </p>
            <p className="text-xs text-gold-500 font-bold">
              <a href="tel:+923075329240" className="hover:underline">
                +92 307 5329240
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col items-center justify-center text-center text-xs text-gray-500">
          <p>&copy; 2026 Al Fatima Academy (Al Quran International). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
