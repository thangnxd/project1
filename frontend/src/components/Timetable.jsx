import { periodToTime } from "../utils/time";

const DAYS = [2, 3, 4, 5, 6, 7];

function Timetable({ timetable }) {
  if (!timetable) return null;

  // grid[day][period] = block
  const grid = {};

  timetable.forEach(option => {
    option.sessions.forEach(s => {
      for (let p = s.start; p <= s.end; p++) {
        if (!grid[s.thu]) grid[s.thu] = {};
        grid[s.thu][p] = {
          option,
          session: s
        };
      }
    });
  });

  function renderCell(day, period) {
    const cell = grid[day]?.[period];
    if (!cell) return <td></td>;

    const { option, session } = cell;

    // chỉ render tại tiết bắt đầu
    if (period !== session.start) return null;

    const rowSpan = session.end - session.start + 1;

    return (
      <td
        rowSpan={rowSpan}
        style={{
          background: "#e6f7ff",
          border: "1px solid #999",
          verticalAlign: "top",
          padding: 6
        }}
      >
        <b>{option.maHP}</b><br />

        {option.blocks.map(b => (
          <div key={b.maLop}>
            {b.loai} – {b.maLop}
          </div>
        ))}

        <div style={{ fontSize: 12, marginTop: 4 }}>
          {periodToTime(session.start)} – {periodToTime(session.end)}
        </div>

        <div style={{ fontSize: 12 }}>
          {session.phong}
        </div>
      </td>
    );
  }

  return (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        marginTop: 20
      }}
    >
      <thead>
        <tr>
          <th>Tiết</th>
          {DAYS.map(d => (
            <th key={d}>Thứ {d}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {/* ===== SÁNG ===== */}
        <tr>
          <td colSpan={8} style={{ background: "#ddd", textAlign: "center" }}>
            <b>SÁNG</b>
          </td>
        </tr>

        {[1, 2, 3, 4, 5, 6].map(p => (
          <tr key={p}>
            <td>Tiết {p}</td>
            {DAYS.map(d => renderCell(d, p))}
          </tr>
        ))}

        {/* ===== NGHỈ TRƯA ===== */}
        <tr>
          <td colSpan={8} style={{ background: "#f0f0f0", textAlign: "center" }}>
            <i>Nghỉ trưa</i>
          </td>
        </tr>

        {/* ===== CHIỀU ===== */}
        {[7, 8, 9, 10, 11, 12].map(p => (
          <tr key={p}>
            <td>Tiết {p}</td>
            {DAYS.map(d => renderCell(d, p))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Timetable;
