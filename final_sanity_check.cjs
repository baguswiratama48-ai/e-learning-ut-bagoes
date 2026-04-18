const fs = require('fs');
const path = require('path');

const sessionsDir = path.join(__dirname, 'src/data/sessions');
const files = fs.readdirSync(sessionsDir).filter(f => f.endsWith('.js'));

const INTERACTIVE_NAMES = [
  "Pertanyaan Pemantik",
  "Ayo Diskusi (LKPD)", 
  "Kuis dan Latihan", 
  "Rangkuman", 
  "Refleksi"
];

files.forEach(file => {
  const filePath = path.join(sessionsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Fix "Ayo Diskusi" name
  content = content.replace(/name:\s*['"]Ayo Diskusi['"]/g, 'name: "Ayo Diskusi (LKPD)"');

  // 2. We use a more careful approach to handle objects
  let lines = content.split('\n');
  let newLines = [];
  let inSection = false;
  let currentSectionName = "";
  let hasSetRequired = false;
  let hasSetType = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Detect section start
    if (line.includes('name:')) {
      inSection = true;
      hasSetRequired = false;
      hasSetType = false;
      const match = line.match(/name:\s*['"]([^'"]+)['"]/);
      if (match) currentSectionName = match[1];
    }

    if (inSection && INTERACTIVE_NAMES.includes(currentSectionName)) {
      if (line.includes('name:')) {
        newLines.push(line);
        newLines.push('      required: true,');
        newLines.push('      type: "Interactive",');
        hasSetRequired = true;
        hasSetType = true;
        continue;
      }
      
      // Skip old types and required flags
      if (line.includes('type:') || line.includes('required: true')) {
        continue;
      }
    }

    newLines.push(line);
    
    // End of section detection
    if (line.trim() === '},' || line.trim() === '}') {
      inSection = false;
      currentSectionName = "";
      hasSetRequired = false;
      hasSetType = false;
    }
  }

  let result = newLines.join('\n');
  fs.writeFileSync(filePath, result);
});
console.log("Cleanup complete!");
