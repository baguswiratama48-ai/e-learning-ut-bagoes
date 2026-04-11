const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');

function countChars(text) {
    let counts = { '{': 0, '}': 0, '[': 0, ']': 0, '(': 0, ')': 0 };
    let i = 0;
    while (i < text.length) {
        // Skip strings
        if (text[i] === "'" || text[i] === '"' || text[i] === '`') {
            const quote = text[i];
            i++;
            while (i < text.length && (text[i] !== quote || text[i-1] === '\\')) i++;
        }
        // Skip single line comments
        else if (text[i] === '/' && text[i+1] === '/') {
            while (i < text.length && text[i] !== '\n') i++;
        }
        // Skip multi line comments
        else if (text[i] === '/' && text[i+1] === '*') {
            i += 2;
            while (i < text.length && !(text[i] === '*' && text[i+1] === '/')) i++;
            i++;
        }
        else {
            if (counts.hasOwnProperty(text[i])) counts[text[i]]++;
        }
        i++;
    }
    return counts;
}

console.log(JSON.stringify(countChars(content), null, 2));
