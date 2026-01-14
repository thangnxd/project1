function scoreTimetable(timetable, criteria) {
  let score = 0;

  const days = new Set();
  let morningSessions = 0;
  let afternoonSessions = 0;

  for (const cls of timetable) {
    for (const s of cls.sessions) {
      days.add(s.thu);

      // sáng: tiết 1-6, chiều: >=7 (bạn có thể chỉnh)
      if (s.start < 7) morningSessions++;
      else afternoonSessions++;
    }
  }

  const totalDays = days.size;

  // ====== CHẤM ĐIỂM ======
  score += (criteria.morningOff || 0) * (10 - morningSessions);
  score += (criteria.afternoonOff || 0) * (10 - afternoonSessions);
  score += (criteria.dayOff || 0) * (7 - totalDays);

  return score;
}

module.exports = { scoreTimetable };
