const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'about.html', 'contact.html', 'packages.html', 'quran.html', 'services.html'];
const root = path.join(__dirname, '..');

const css = `
        /* Custom Scrollbar for Language Popup */
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(212, 175, 55, 0.4);
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(212, 175, 55, 0.8);
        }
    </style>`;

pages.forEach(page => {
  const filePath = path.join(root, page);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('.custom-scrollbar::-webkit-scrollbar')) {
    content = content.replace(/<\/style>/, css);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Added CSS to: ${page}`);
  } else {
    console.log(`⏭️  CSS already exists in: ${page}`);
  }
});

console.log('Done!');
