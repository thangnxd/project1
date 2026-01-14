function TimetableCell({ timetable, day, from, to }) {
  const items = [];

  for (const cls of timetable) {
    for (const s of cls.sessions) {
      if (s.thu !== day) continue;
      if (s.end < from || s.start > to) continue;

      items.push({ cls, s });
    }
  }

  return (
    <>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
                background: "#0a8f08",
                color: "white",
                borderRadius: 8,
                padding: 6,
                marginBottom: 6,
                fontSize: 12
            }}
        >
          <b>{it.cls.maHP}</b><br />
          {it.s.start}–{it.s.end}<br />
          {it.s.phong}
        </div>
      ))}
    </>
  );
}

export default TimetableCell;
