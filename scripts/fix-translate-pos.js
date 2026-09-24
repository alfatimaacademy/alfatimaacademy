const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'about.html', 'contact.html', 'packages.html', 'quran.html', 'services.html'];
const root = path.join(__dirname, '..');

pages.forEach(page => {
  const filePath = path.join(root, page);
  let content = fs.readFileSync(filePath, 'utf8');

  // Translate button: move from bottom-24 to bottom-6 for mobile so it aligns with chatbot
  const before = content.length;
  content = content.replace(
    /class="fixed bottom-24 left-6 md:bottom-6 z-50"/g,
    'class="fixed bottom-6 left-6 z-50"'
  );

  if (content.length !== before || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated translate button position in: ${page}`);
  }
});

console.log('All pages done!');
