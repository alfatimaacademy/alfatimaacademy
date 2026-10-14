import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

// The old multi-page site relied on the host's 404. A single-page app needs its own.
export default function NotFound() {
  usePageMeta('Page Not Found - Al Fatima Academy');
  return (
    <section className="py-24 text-center px-4">
      <h1 className="text-5xl font-serif font-bold text-gold-gradient mb-4">404</h1>
      <p className="text-gray-400 text-sm mb-8">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="inline-block bg-gold-500 hover:bg-gold-600 text-neutral-950 font-bold py-3 px-6 rounded-xl text-sm transition-all"
      >
        Back to Home
      </Link>
    </section>
  );
}
