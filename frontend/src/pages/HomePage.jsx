import { useState } from "react";

function HomePage({ onResult }) {
  const [file, setFile] = useState(null);
  const [coursesInput, setCoursesInput] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("CT CHUẨN"); 

  async function uploadExcel() {
    if (!file) {
      alert("Chưa chọn file Excel");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      alert("Upload Excel thất bại");
      return;
    }

    alert("Upload Excel thành công");
  }

  async function runSchedule() {
    const courses = coursesInput
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    if (courses.length === 0) {
      alert("Chưa nhập mã học phần");
      return;
    }

    let res;
    try {
      res = await fetch("http://localhost:3001/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courses,
          limit: 1000,
          program: selectedProgram
        })
      });
    } catch (e) {
      alert("Không kết nối được backend");
      return;
    }

    if (!res.ok) {
      alert("Backend lỗi khi xếp thời khóa biểu");
      return;
    }

    const data = await res.json();
    console.log("API /schedule trả về:", data);

    if (data.ok === false) {
      alert(
        data.message +
        (data.impossible
          ? "\nKhông xếp được: " + data.impossible.join(", ")
          : "")
      );
      return;
    }

    if (!Array.isArray(data.top) || data.top.length === 0) {
      alert("Không có kết quả thời khóa biểu hợp lệ");
      return;
    }

    onResult(data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Xếp thời khóa biểu</h1>

      {/* chọn cddt */}
      <div style={{ marginBottom: 10 }}>
        <b>Chương trình đào tạo:</b><br />
        {["CT CHUẨN", "ELITECH", "SIE"].map(p => (
          <button
            key={p}
            onClick={() => setSelectedProgram(p)}
            style={{
              marginRight: 8,
              padding: "6px 12px",
              background: selectedProgram === p ? "#22c55e" : "#eee",
              color: selectedProgram === p ? "#fff" : "#000",
              border: "none",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <br /><br />

      <input
        style={{ width: 400 }}
        placeholder="VD: SSH1131, SSH1141"
        value={coursesInput}
        onChange={e => setCoursesInput(e.target.value)}
      />

      <br /><br />
      <button onClick={uploadExcel}>Upload Excel</button>
      <button onClick={runSchedule} style={{ marginLeft: 10 }}>
        Xếp TKB
      </button>
    </div>
  );
}

export default HomePage;
