import json
import re

with open('soal quiz sesi 2.txt', 'r', encoding='utf-8') as f:
    lines = [L.strip() for L in f.readlines() if L.strip()]

data = []
current_topic = None
current_q = None

for line in lines:
    if line.lower().startswith('soal tes formatif'):
        current_topic = {"topic": line, "questions": []}
        data.append(current_topic)
    elif re.match(r'^\d+\.', line) or (current_q and not re.match(r'^[A-D]\.', line) and not line.lower().startswith('soal tes formatif')):
        if re.match(r'^\d+\.', line):
            current_q = {"text": line.split('.', 1)[1].strip(), "options": [], "answer": None}
            current_topic["questions"].append(current_q)
        else:
            current_q["text"] += "\n" + line
    elif re.match(r'^[A-D]\.', line):
        is_answer = '(Kunci Jawaban)' in line
        opt_text = line.split('.', 1)[1].replace('(Kunci Jawaban)', '').strip()
        current_q["options"].append(opt_text)
        if is_answer:
            current_q["answer"] = len(current_q["options"]) - 1

with open('quiz_parsed.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
