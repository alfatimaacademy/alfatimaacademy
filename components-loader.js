/**
 * components-loader.js
 * Dynamically loads shared header & footer into every page.
 * Also auto-highlights the active nav link based on current page.
 *
 * Usage: Add this ONE script tag near the top of <body> in every HTML page:
 *   <script src="components-loader.js"></script>
 *
 * Each page needs these two placeholder divs:
 *   <div id="header-placeholder"></div>   ← replaces <header>...</header>
 *   <div id="footer-placeholder"></div>   ← replaces <footer>...</footer>
 */

(function () {
  // ── Determine current page filename ──────────────────────────
  let currentPage = window.location.pathname.replace(/\/+$/, '').replace(/\.html$/, '') || '/';
  if (currentPage === '/index') currentPage = '/';

  // ── Helper: fetch an HTML file and return its text ───────────
  async function loadComponent(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    return res.text();
  }

  // ── Helper: inject HTML into a placeholder div ───────────────
  function inject(placeholderId, html) {
    const el = document.getElementById(placeholderId);
    if (el) el.outerHTML = html;
  }

  // ── Active link highlighting ──────────────────────────────────
  function highlightActiveLink() {
    document.querySelectorAll('[data-nav]').forEach(link => {
      const target = link.getAttribute('data-nav');
      if (target === currentPage) {
        link.classList.add('text-gold-500');
      }
    });
  }

  // ── Services: hover opens the dropdown, clicking "Services" itself does nothing ─
  function lockServicesLink() {
    document.querySelectorAll('a[data-nav="/services"]').forEach(a => {
      a.setAttribute('href', 'javascript:void(0)');
      a.style.cursor = 'default';
      a.addEventListener('click', e => e.preventDefault());
    });
  }

  // ── Support chatbot: load once, on every page ─────────────────
  function loadChatbot() {
    if (document.getElementById('afa-chatbot-script')) return; // already loaded
    const script = document.createElement('script');
    script.id = 'afa-chatbot-script';
    script.src = '/chatbot-widget.js';
    script.defer = true;
    document.body.appendChild(script);
  }

  // ── Main loader ───────────────────────────────────────────────
  async function loadComponents() {
    try {
      const [headerHtml, footerHtml] = await Promise.all([
        loadComponent('/components/header.html'),
        loadComponent('/components/footer.html')
      ]);

      inject('header-placeholder', headerHtml);
      inject('footer-placeholder', footerHtml);

      // Highlight active nav link after header is injected
      highlightActiveLink();
      lockServicesLink();

    } catch (err) {
      console.warn('[ComponentLoader] Could not load components:', err.message);
    } finally {
      // Chatbot should load even if header/footer fail
      loadChatbot();
    }
  }

  // Run as soon as DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }
})();
