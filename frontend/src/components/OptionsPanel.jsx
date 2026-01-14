function OptionsPanel({ criteria, setCriteria, onApply }) {
  return (
    <div
      style={{
        width: 280,
        marginLeft: 20,
        padding: 15,
        border: "2px solid #0a8f08",
        borderRadius: 12,
        background: "#f9fff9"
      }}
    >
      <h3>Tùy chọn</h3>

      <label>Chọn tiêu chí xếp TKB</label>

      <select
        value={criteria}
        onChange={e => setCriteria(e.target.value)}
        style={{ width: "100%", margin: "10px 0" }}
      >
        <option value="random">Ngẫu nhiên</option>
        <option value="offMorning">Nghỉ sáng nhiều</option>
        <option value="offAfternoon">Nghỉ chiều nhiều</option>
        <option value="offDay">Nghỉ cả ngày</option>
      </select>

      <button
        onClick={onApply}
        style={{
          width: "100%",
          padding: 8,
          background: "#0a8f08",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Áp dụng
      </button>
    </div>
  );
}

export default OptionsPanel;
