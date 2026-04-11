const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const lines = content.split('\n');

let depth = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/<div(?![^>]*\/>)/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;
    
    if (opens > 0 || closes > 0) {
        depth += opens;
        depth -= closes;
        if (i >= 880 && i <= 1440) {
            console.log(`${i + 1}: [Depth ${depth}] ${line.trim().substring(0, 50)}`);
        }
    }
}
