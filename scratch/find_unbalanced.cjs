const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');

function findUnbalanced(text) {
    let stack = [];
    let lines = text.split('\n');
    let results = [];
    
    let inString = false;
    let stringChar = '';
    
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        let line = lines[lineNum];
        for (let charIdx = 0; charIdx < line.length; charIdx++) {
            const char = line[charIdx];
            
            if ((char === "'" || char === '"' || char === '`') && line[charIdx-1] !== '\\') {
                if (!inString) {
                    inString = true;
                    stringChar = char;
                } else if (char === stringChar) {
                    inString = false;
                }
            }
            
            if (!inString) {
                if (char === '{') {
                    stack.push({ line: lineNum + 1, char: charIdx + 1 });
                } else if (char === '}') {
                    if (stack.length === 0) {
                        results.push(`Unmatched } at line ${lineNum + 1}, char ${charIdx + 1}`);
                    } else {
                        stack.pop();
                    }
                }
            }
        }
    }
    
    while (stack.length > 0) {
        let u = stack.pop();
        results.push(`Unclosed { from line ${u.line}, char ${u.char}`);
    }
    
    return results;
}

console.log(findUnbalanced(content).join('\n'));
