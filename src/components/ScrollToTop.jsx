import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Normal page loads start at the top; a single-page app has to do that by hand.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
