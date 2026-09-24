const fs = require('fs');
const path = require('path');

const pages = ['about.html', 'contact.html', 'packages.html', 'quran.html', 'services.html', 'index.html'];
const root = path.join(__dirname, '..');

pages.forEach(page => {
  const filePath = path.join(root, page);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix translate popup: open to the right (left-0) instead of left (right-0)
  content = content.replace(
    /class="hidden absolute bottom-16 right-0 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 text-slate-100 backdrop-blur-md bg-opacity-95 transition-all duration-300"/g,
    'class="hidden absolute bottom-16 left-0 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 text-slate-100 backdrop-blur-md bg-opacity-95 transition-all duration-300"'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Popup fixed: ${page}`);
});

console.log('All popup directions fixed!');
