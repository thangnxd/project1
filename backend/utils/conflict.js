function conflict(s1, s2) {
  if (s1.thu !== s2.thu) return false;
  if (s1.end < s2.start || s2.end < s1.start) return false;

  const w1 = new Set(s1.tuan);
  return s2.tuan.some(w => w1.has(w));
}

function classConflict(cls, timetable) {
  for (const chosen of timetable) {
    for (const s1 of cls.sessions) {
      for (const s2 of chosen.sessions) {
        if (conflict(s1, s2)) return true;
      }
    }
  }
  return false;
}

module.exports = { classConflict };
