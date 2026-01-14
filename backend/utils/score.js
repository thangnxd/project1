function countMorning(tkb) {
  return tkb.filter(cls =>
    cls.sessions.some(s => s.start <= 6)
  ).length;
}

function countAfternoon(tkb) {
  return tkb.filter(cls =>
    cls.sessions.some(s => s.start > 6)
  ).length;
}

function countOffDays(tkb) {
  const days = new Set();
  tkb.forEach(cls =>
    cls.sessions.forEach(s => days.add(s.thu))
  );
  return 7 - days.size;
}

function scoreTimetable(tkb, criteria) {
  switch (criteria) {
    case "offMorning":
      return countMorning(tkb);

    case "offAfternoon":
      return countAfternoon(tkb);

    case "offDay":
      return countOffDays(tkb);

    case "random":
    default:
      return Math.random();
  }
}

module.exports = { scoreTimetable };
