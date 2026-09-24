const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'about.html', 'contact.html', 'packages.html', 'quran.html', 'services.html'];
const root = path.join(__dirname, '..');

// Patterns to remove - the floating nav button div + its toggle script block
const patterns = [
  // Remove the entire floating nav button div (with all its content)
  {
    // Matches: <!-- Floating Navigation Button --> ... </div> (the whole wrapper div)
    regex: /\r?\n\s*<!--\s*Floating Navigation Button\s*-->\s*\r?\n\s*<div[^>]*fixed bottom-6 left-6[^>]*>[\s\S]*?<\/div>\s*\r?\n/g,
    desc: 'floating nav button div'
  },
  // Remove the toggleNavPopup function and its related click listener block
  {
    regex: /\r?\n\s*<!--\s*Toggle Logic Script\s*-->\s*\r?\n\s*<script>[\s\S]*?function toggleNavPopup[\s\S]*?<\/script>/g,
    desc: 'Toggle Logic Script block'
  }
];

pages.forEach(page => {
  const filePath = path.join(root, page);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  patterns.forEach(p => {
    const before = content.length;
    content = content.replace(p.regex, '\n');
    const after = content.length;
    if (before !== after) {
      console.log(`  ✅ Removed [${p.desc}] from ${page}`);
    } else {
      console.log(`  ⚠️  [${p.desc}] not found in ${page}`);
    }
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`💾 Saved: ${page}\n`);
  } else {
    console.log(`⏭️  No changes: ${page}\n`);
  }
});

console.log('Done!');
