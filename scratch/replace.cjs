const fs = require('fs');

const text = fs.readFileSync('src/App.jsx', 'utf8');
const lines = text.split('\n');

const startIdx = lines.findIndex(l => l.includes('function InteractiveMindMap({'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('function Home({'));

if (startIdx !== -1 && endIdx !== -1) {
    const before = lines.slice(0, startIdx).join('\n');
    const after = lines.slice(endIdx).join('\n');
    const replacement = fs.readFileSync('scratch/replacement.js', 'utf8');
    
    fs.writeFileSync('src/App.jsx', before + '\n' + replacement + '\n\n' + after);
    console.log("Replace success");
} else {
    console.log("Markers not found", startIdx, endIdx);
}
