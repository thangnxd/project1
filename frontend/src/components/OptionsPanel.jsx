function OptionsPanel({ criteria, setCriteria, onApply }) {
  return (
    <div style={{ width: 260, marginLeft: 20 }}>
      <h3>Tùy chọn</h3>

      <select
        value={criteria}
        onChange={e => setCriteria(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      >
        <option value="random">Ngẫu nhiên</option>
        <option value="offMorning">Nghỉ sáng nhiều</option>
        <option value="offAfternoon">Nghỉ chiều nhiều</option>
        <option value="offDay">Nghỉ cả ngày</option>
      </select>

      <button onClick={onApply} style={{ width: "100%" }}>
        Áp dụng
      </button>
    </div>
  );
}

export default OptionsPanel;
