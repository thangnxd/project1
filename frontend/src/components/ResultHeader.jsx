function ResultHeader({ result }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ color: "#0a8f08" }}>
        Tổng số cách chọn môn học:{" "}
        <span style={{ color: "green" }}>
          {result.total.toLocaleString()}
        </span>
      </h2>

      {!result.ok && (
        <div style={{ background: "#fff3cd", padding: 10 }}>
          {result.message}
        </div>
      )}
    </div>
  );
}

export default ResultHeader;
