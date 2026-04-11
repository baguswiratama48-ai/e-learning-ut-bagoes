const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');

function countChars(text) {
    let counts = {
        '{': 0, '}': 0,
        '[': 0, ']': 0,
        '(': 0, ')': 0,
        '"`"': 0, '"\'"': 0, '"\""': 0
    };
    
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        // Handle strings to ignore brackets inside them
        if ((char === "'" || char === '"' || char === '`') && text[i-1] !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
            }
        }
        
        if (!inString) {
            if (counts.hasOwnProperty(char)) counts[char]++;
        }
    }
    
    return counts;
}

console.log(JSON.stringify(countChars(content), null, 2));
