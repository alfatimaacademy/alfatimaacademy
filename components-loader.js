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
    // Desktop nav links
    document.querySelectorAll('[data-nav]').forEach(link => {
      const target = link.getAttribute('data-nav');
      if (target === currentPage) {
        link.classList.add('text-gold-500');
      }
    });
    // Mobile nav links
    document.querySelectorAll('[data-mobile-nav]').forEach(link => {
      const target = link.getAttribute('data-mobile-nav');
      if (target === currentPage) {
        link.classList.remove('text-gray-300');
        link.classList.add('text-gold-400', 'bg-gold-500/10');
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

      // ── Navbar Translate Popup (Desktop) ────────────────────────
      // Define globally so every page can use the header's translate button
      if (typeof window.toggleNavLangPopup !== 'function') {
        window.toggleNavLangPopup = function () {
          const popup = document.getElementById('navLangPopup');
          if (popup) popup.classList.toggle('hidden');
        };
      }

      // Close navbar lang popup on outside click (register once)
      document.addEventListener('click', function (event) {
        const navLangPopup = document.getElementById('navLangPopup');
        const navLangBtn = document.getElementById('navLangBtn');
        if (navLangPopup && navLangBtn &&
            !navLangPopup.contains(event.target) &&
            !navLangBtn.contains(event.target)) {
          navLangPopup.classList.add('hidden');
        }
      });

      // ── Mobile Menu Functions ──────────────────────────────────
      if (typeof window.toggleMobileMenu !== 'function') {
        window.toggleMobileMenu = function () {
            const menu = document.getElementById('mobileMenu');
            const icon = document.getElementById('mobileMenuIcon');
            if (menu && icon) {
                menu.classList.toggle('hidden');
                icon.className = menu.classList.contains('hidden')
                    ? 'fa-solid fa-bars text-lg'
                    : 'fa-solid fa-xmark text-lg';
            }
        };

        window.closeMobileMenu = function () {
            const menu = document.getElementById('mobileMenu');
            const icon = document.getElementById('mobileMenuIcon');
            if (menu) menu.classList.add('hidden');
            if (icon) icon.className = 'fa-solid fa-bars text-lg';
        };

        window.toggleMobileServices = function () {
            const list = document.getElementById('mobileServicesList');
            const chevron = document.getElementById('mobileServicesChevron');
            if (list && chevron) {
                list.classList.toggle('hidden');
                chevron.style.transform = list.classList.contains('hidden') ? '' : 'rotate(180deg)';
            }
        };
      }

      // Close mobile menu on outside click
      document.addEventListener('click', function (e) {
          const menu = document.getElementById('mobileMenu');
          const btn = document.getElementById('mobileMenuBtn');
          if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
              if (typeof window.closeMobileMenu === 'function') {
                  window.closeMobileMenu();
              }
          }
      });

      // ── changeLanguage (for pages that don't define it) ──────────
      if (typeof window.changeLanguage !== 'function') {
        window.changeLanguage = function (langCode) {
          document.cookie = "googtrans=/en/" + langCode + "; path=/; domain=" + window.location.hostname;
          document.cookie = "googtrans=/en/" + langCode + "; path=/";
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event('change', { bubbles: true }));
          }
          setTimeout(function () {
            if (!document.querySelector('.goog-te-combo') ||
                document.querySelector('.goog-te-combo').value !== langCode) {
              window.location.reload();
            }
          }, 300);
          if (typeof window.toggleNavLangPopup === 'function') {
              window.toggleNavLangPopup();
          }
        };
      }

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
