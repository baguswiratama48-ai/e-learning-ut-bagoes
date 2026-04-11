import sys

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_marker = "function InteractiveMindMap({ user, classId, meetingId, onComplete, submissions }) {"
end_marker = "function SectionPage({ user }) {"

start_idx = text.find(start_marker)
end_idx = text.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    before = text[:start_idx]
    after = text[end_idx:]
    with open('scratch/replacement.js', 'r', encoding='utf-8') as r:
        replacement = r.read()
    new_text = before + replacement + "\n\n" + after
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Replace success")
else:
    print("Markers not found", start_idx, end_idx)
