import TimetableCell from "./TimetableCell";

const DAYS = [2, 3, 4, 5, 6, 7];
const PERIODS = [
  { label: "Sáng", from: 1, to: 6 },
  { label: "Chiều", from: 7, to: 12 }
];

function Timetable({ timetable }) {
  return (
    <table style={{width: "100%", borderCollapse: "collapse", background: "#f5f5f5"}}>
      <thead> 
        <tr>
          <th></th>
          {DAYS.map(d => <th key={d}>Thứ {d}</th>)}
        </tr>
      </thead>

      <tbody>
        {PERIODS.map(p => (
          <tr key={p.label}>
            <td><b>{p.label}</b></td>
            {DAYS.map(d => (
              <td key={d} style={{ minHeight: 100 }}>
                <TimetableCell
                  timetable={timetable}
                  day={d}
                  from={p.from}
                  to={p.to}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Timetable;
