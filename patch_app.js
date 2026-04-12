const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Update handleGenerateGroups
content = content.replace(
  /groups\[index % groupCount\]\.members\.push\(\{([\s\S]*?)\}\);/g,
  const groupIndex = index % groupCount;
        groups[groupIndex].members.push({, isLeader: groups[groupIndex].members.length === 0});
);

// 2. Add handleSetLeader
const resetGroupsMatch = content.indexOf('const handleResetGroups = async () => {');
if (resetGroupsMatch > -1) {
  const setLeaderFn = 
  const handleSetLeader = async (groupNum, newLeaderEmail) => {
    if (!activeTab || activeTab === "record_m1") return;
    setGenerating(true);
    try {
      const systemGroupRow = submissions.find(
        (s) =>
          s.student_email === "SYSTEM_GROUP" &&
          s.class_id === activeTab &&
          s.meeting_num === selectedMeeting,
      );
      if (!systemGroupRow) return;

      const groups = JSON.parse(systemGroupRow.content);
      const groupToUpdate = groups.find((g) => g.group_num === groupNum);
      if (groupToUpdate) {
        groupToUpdate.members.forEach((m) => {
          m.isLeader = m.email === newLeaderEmail;
        });
      }

      await supabase
        .from("submissions")
        .update({ content: JSON.stringify(groups) })
        .eq("id", systemGroupRow.id);

      await fetchData();
    } catch (err) {
      console.log(err);
      alert("Gagal mengubah ketua kelompok.");
    } finally {
      setGenerating(false);
    }
  };
;
  content = content.slice(0, resetGroupsMatch) + setLeaderFn + '\n  ' + content.slice(resetGroupsMatch);
}

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx grouping logic patched successfully.');
