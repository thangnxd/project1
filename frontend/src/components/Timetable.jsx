import { periodToTime } from "../utils/time";

const DAYS = [2, 3, 4, 5, 6, 7];

const PERIOD_LABELS = {
  1: "Tiết 1", 2: "Tiết 2", 3: "Tiết 3",
  4: "Tiết 4", 5: "Tiết 5", 6: "Tiết 6",
  7: "Tiết 7", 8: "Tiết 8", 9: "Tiết 9",
  10: "Tiết 10", 11: "Tiết 11", 12: "Tiết 12"
};

function Timetable({ timetable }) {
  if (!timetable) return null;

  /**
   * grid[day][start] = {
   *   start, end,
   *   sessions: [ { maHP, maLop, loai, phong } ]
   * }
   */
  const grid = {};
  const occupied = {}; // occupied[day][period] = true

  timetable.forEach(cls => {
    cls.sessions.forEach(s => {
      if (!grid[s.thu]) grid[s.thu] = {};
      if (!occupied[s.thu]) occupied[s.thu] = {};

      const key = s.start;

      if (!grid[s.thu][key]) {
        grid[s.thu][key] = {
          start: s.start,
          end: s.end,
          sessions: []
        };
      }

      grid[s.thu][key].sessions.push({
        maHP: cls.maHP,
        maLop: cls.maLop,
        loai: s.loai || cls.type || "LT",
        phong: s.phong
      });

      for (let p = s.start; p <= s.end; p++) {
        occupied[s.thu][p] = true;
      }
    });
  });

  function renderRows(periods) {
    return periods.map(p => (
      <tr key={p}>
        <td>{PERIOD_LABELS[p]}</td>

        {DAYS.map(d => {
          // Bỏ qua ô đã bị chiếm bởi rowspan phía trên
          if (occupied[d]?.[p] && !grid[d]?.[p]) {
            return null;
          }

          const cell = grid[d]?.[p];
          if (!cell) return <td key={d}></td>;

          return (
            <td
              key={d}
              rowSpan={cell.end - cell.start + 1}
              style={{
                background: "#a8e6a3",
                borderRadius: 6,
                padding: 6
              }}
            >
              {cell.sessions.map((s, i) => (
                <div key={i} style={{ marginBottom: 4 }}>
                  <b>{s.maHP} – {s.maLop}</b><br />
                  {s.loai} | {periodToTime(cell.start)}–{periodToTime(cell.end)}<br />
                  {s.phong}
                </div>
              ))}
            </td>
          );
        })}
      </tr>
    ));
  }

  return (
    <table
      border="1"
      cellPadding="6"
      style={{
        borderCollapse: "collapse",
        width: "100%"
      }}
    >
      <thead>
        <tr>
          <th>Tiết</th>
          {DAYS.map(d => <th key={d}>Thứ {d}</th>)}
        </tr>
      </thead>

      <tbody>
        {/* ===== SÁNG ===== */}
        <tr>
          <td colSpan={8} style={{ background: "#eee", textAlign: "center" }}>
            <b>Sáng</b>
          </td>
        </tr>
        {renderRows([1, 2, 3, 4, 5, 6])}

        {/* ===== NGHỈ TRƯA ===== */}
        <tr>
          <td colSpan={8} style={{ background: "#2f6f4e", color: "white", textAlign: "center" }}>
            Nghỉ trưa
          </td>
        </tr>

        {/* ===== CHIỀU ===== */}
        <tr>
          <td colSpan={8} style={{ background: "#eee", textAlign: "center" }}>
            <b>Chiều</b>
          </td>
        </tr>
        {renderRows([7, 8, 9, 10, 11, 12])}
      </tbody>
    </table>
  );
}

export default Timetable;
