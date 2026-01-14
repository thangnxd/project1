import { periodToTime } from "../utils/time";

function TimetableCell({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div>
      {blocks.map((b, i) => (
        <div
          key={i}
          style={{
            background: b.loai === "TN" ? "#ffb3b3" :
                        b.loai === "BT" ? "#ffd966" : "#a8e6a3",
            padding: 6,
            borderRadius: 6,
            marginBottom: 6,
            fontSize: 12
          }}
        >
          <b>{b.maHP} – {b.maLop}</b><br />
          {b.loai} | {periodToTime(b.start)} – {periodToTime(b.end)}<br />
          {b.phong}
        </div>
      ))}
    </div>
  );
}

export default TimetableCell;
