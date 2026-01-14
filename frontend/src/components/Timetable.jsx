import { periodToTime } from "../utils/time";

const DAYS = [2, 3, 4, 5, 6, 7];
const MORNING = [1, 2, 3, 4, 5, 6];
const AFTERNOON = [7, 8, 9, 10, 11, 12];

function Timetable({ timetable }) {
  // ⛑️ GUARD RẤT QUAN TRỌNG
  if (!Array.isArray(timetable)) {
    return <div>Không có thời khóa biểu hợp lệ</div>;
  }

  // grid[day][period] = { cls, session }
  const grid = {};

  timetable.forEach(cls => {
    if (!Array.isArray(cls.sessions)) return;

    cls.sessions.forEach(s => {
      if (!grid[s.thu]) grid[s.thu] = {};
      grid[s.thu][s.start] = { cls, session: s };
    });
  });

  function renderRow(periods) {
    return periods.map(p => (
      <tr key={p}>
        <td>Tiết {p}</td>
        {DAYS.map(d => {
          const cell = grid[d]?.[p];
          if (!cell) return <td key={d}></td>;

          const { cls, session } = cell;

          return (
            <td
              key={d}
              rowSpan={session.end - session.start + 1}
              style={{ background: "#a8e6a3" }}
            >
              <b>{cls.maHP}</b> - {cls.tenHP}<br />
              <b>{cls.loai}</b> - {cls.maLop}<br />
              {periodToTime(session.start)} - {periodToTime(session.end)}<br />
              {session.phong}
            </td>
          );
        })}
      </tr>
    ));
  }

  return (
    <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Tiết</th>
          {DAYS.map(d => <th key={d}>Thứ {d}</th>)}
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colSpan={8} style={{ background: "#eee", textAlign: "center" }}>
            <b>Sáng</b>
          </td>
        </tr>
        {renderRow(MORNING)}

        <tr>
          <td colSpan={8} style={{ background: "#eee", textAlign: "center" }}>
            <b>Chiều</b>
          </td>
        </tr>
        {renderRow(AFTERNOON)}
      </tbody>
    </table>
  );
}

export default Timetable;
