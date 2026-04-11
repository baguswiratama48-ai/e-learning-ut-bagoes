const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'Aplikasi Web AI', 'elearning ut bagoes', 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fungsi pembersihan agresif untuk Tailwind slashes
// Mencari pola seperti bg-blue-500/50, text-white/20, dll
// Regex ini mencari kata kunci warna followed by / then digits
const patterns = [
    { regex: /bg-([a-z0-9-]+)\/(\d+)/g, replace: 'bg-$1 bg-opacity-$2' },
    { regex: /text-([a-z0-9-]+)\/(\d+)/g, replace: 'text-$1 text-opacity-$2' },
    { regex: /border-([a-z0-9-]+)\/(\d+)/g, replace: 'border-$1 border-opacity-$2' },
    { regex: /shadow-([a-z0-9-]+)\/(\d+)/g, replace: 'shadow-$1 shadow-opacity-$2' },
    { regex: /ring-([a-z0-9-]+)\/(\d+)/g, replace: 'ring-$1 ring-opacity-$2' },
    { regex: /from-([a-z0-9-]+)\/(\d+)/g, replace: 'from-$1 from-opacity-$2' },
    { regex: /to-([a-z0-9-]+)\/(\d+)/g, replace: 'to-$1 to-opacity-$2' },
    // Handle white/10, black/40, blue-50/50 without prefixes
    { regex: /([a-z]+-[0-9]+)\/(\d+)/g, replace: '$1 bg-opacity-$2' },
    { regex: /(white|black)\/(\d+)/g, replace: '$1 bg-opacity-$2' }
];

patterns.forEach(p => {
    content = content.replace(p.regex, p.replace);
});

// Amankan teks literal di SectionPage
content = content.replace(/\{wordCount\.toLocaleString\(\)\} <span className="opacity-50">\/ 100 KATA<\/span>/g, '{wordCount.toLocaleString()} <span className="opacity-50">{" / "} 100 KATA</span>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('App.jsx has been deep-cleaned successfully.');
