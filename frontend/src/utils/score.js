export function scoreOffMorning(timetable) {
  let days = new Set();
  timetable.forEach(cls =>
    cls.sessions.forEach(s => {
      if (s.start <= 6) days.add(s.thu);
    })
  );
  return 7 - days.size;
}

export function scoreOffAfternoon(timetable) {
  let days = new Set();
  timetable.forEach(cls =>
    cls.sessions.forEach(s => {
      if (s.start >= 7) days.add(s.thu);
    })
  );
  return 7 - days.size;
}

export function scoreOffDay(timetable) {
  let days = new Set();
  timetable.forEach(cls =>
    cls.sessions.forEach(s => days.add(s.thu))
  );
  return 7 - days.size;
}
