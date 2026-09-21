/**
 * restore-cdn.js — Replaces restore_cdn.py
 * Swaps local style.css back to the Tailwind CDN script tag,
 * and re-injects the tailwind.config block before </head> if missing.
 *
 * Usage: node scripts/restore-cdn.js
 */

const fs     = require('fs');
const path   = require('path');
const glob   = require('glob');

// ── Load Tailwind config from tailwind.config.js ────────────────
// We read the theme directly from the existing config file so there
// is a single source of truth — no duplication.
const twConfig = require('../tailwind.config.js');
const { colors = {}, fontFamily = {} } = twConfig.theme?.extend ?? {};

// Build an inline tailwind.config script block from the JS config
const configScript = `
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: ${JSON.stringify(fontFamily, null, 10)},
          colors: ${JSON.stringify(colors, null, 10)}
        }
      }
    }
  </script>`;

// ── Process every root-level HTML file ───────────────────────────
const rootDir   = path.join(__dirname, '..');
const htmlFiles = glob.sync('*.html', { cwd: rootDir });

htmlFiles.forEach(fname => {
  const filePath = path.join(rootDir, fname);
  let content    = fs.readFileSync(filePath, 'utf-8');

  // Replace local stylesheet with CDN
  content = content.replace(
    /<link\s+rel="stylesheet"\s+href="style\.css"\s*>/g,
    '<script src="https://cdn.tailwindcss.com"></script>'
  );

  // Inject tailwind.config block before </head> if it's not already there
  if (!content.includes('tailwind.config =')) {
    content = content.replace('</head>', configScript + '\n</head>');
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅  Restored CDN in ${fname}`);
});

console.log('\n🎉  CDN restored in all files!');
