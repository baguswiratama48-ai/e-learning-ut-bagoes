const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'Aplikasi Web AI', 'elearning ut bagoes', 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fungsi untuk mengganti format warna/opasitas
// bg-primary/10 -> bg-primary bg-opacity-10
content = content.replace(/(bg-[a-z0-9-]+)\/(\d+)/g, '$1 bg-opacity-$2');
content = content.replace(/(text-[a-z0-9-]+)\/(\d+)/g, '$1 text-opacity-$2');
content = content.replace(/(border-[a-z0-9-]+)\/(\d+)/g, '$1 border-opacity-$2');
content = content.replace(/(ring-[a-z0-9-]+)\/(\d+)/g, '$1 ring-opacity-$2');
content = content.replace(/(from-[a-z0-9-]+)\/(\d+)/g, '$1 from-opacity-$2');
content = content.replace(/(to-[a-z0-9-]+)\/(\d+)/g, '$1 to-opacity-$2');
content = content.replace(/(shadow-[a-z0-9-]+)\/(\d+)/g, '$1 shadow-opacity-$2');

// Juga amankan '/' yang sering muncul di dalam teks atau template literal
// Misal: <div className={`... ${...}/40`}> -> sudah diperbaiki sebelumnya tapi mari pastikan
// Namun regex di atas sudah cukup luas.

fs.writeFileSync(filePath, content, 'utf8');
console.log('App.jsx has been cleaned successfully.');
