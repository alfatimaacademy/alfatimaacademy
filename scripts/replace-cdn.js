/**
 * replace-cdn.js — Replaces replace_cdn.py
 * Swaps the Tailwind CDN <script> tag with the local compiled style.css.
 * Also removes any inline tailwind.config script blocks.
 *
 * Usage: node scripts/replace-cdn.js
 */

const fs   = require('fs');
const path = require('path');
const glob = require('glob');

const rootDir  = path.join(__dirname, '..');
const htmlFiles = glob.sync('*.html', { cwd: rootDir });

htmlFiles.forEach(fname => {
  const filePath = path.join(rootDir, fname);
  let content    = fs.readFileSync(filePath, 'utf-8');

  // Replace CDN script with local stylesheet
  content = content.replace(
    /<script\s+src="https:\/\/cdn\.tailwindcss\.com"\s*><\/script>/g,
    '<link rel="stylesheet" href="style.css">'
  );

  // Remove inline tailwind.config = { ... } script blocks
  content = content.replace(
    /<script>\s*tailwind\.config\s*=[\s\S]*?<\/script>/g,
    ''
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅  Replaced CDN in ${fname}`);
});

console.log('\n🎉  CDN replaced with local stylesheet in all files!');
