/**
 * Hashes a string to a numeric value.
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Picks 1 question from each group based on student's identifier (NIM/Email).
 */
export function getPemantikForStudent(identifier, groups) {
  if (!groups || groups.length === 0) return [];
  const seed = hashString(identifier || "default");
  
  return groups.map((group, groupIdx) => {
    // Pick 1 question from this group using the seed and group index
    const pickIdx = (seed + groupIdx) % group.length;
    return group[pickIdx];
  });
}
