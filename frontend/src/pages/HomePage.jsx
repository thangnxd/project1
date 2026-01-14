import { useState } from "react";

function HomePage({ onResult }) {
  const [file, setFile] = useState(null);
  const [coursesInput, setCoursesInput] = useState("");

  async function uploadExcel() {
    if (!file) {
      alert("Chưa chọn file Excel");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData
    });

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

    const res = await fetch("http://localhost:3001/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courses,
        limit: 1000
      })
    });

    const data = await res.json();

    console.log("API /schedule trả về:", data);

    // ❌ Nếu backend trả sai format
    if (!data || typeof data !== "object") {
      alert("Backend trả dữ liệu không hợp lệ");
      return;
    }

    // ❌ Nếu backend báo không xếp được
    if (data.ok === false) {
      alert(
        (data.message || "Có lỗi xảy ra") +
        (data.impossible
          ? "\nKhông xếp được: " + data.impossible.join(", ")
          : "")
      );
      return;
    }

    // ❌ Nếu không có kết quả
    if (!Array.isArray(data.top) || data.top.length === 0) {
      alert("Không có kết quả hợp lệ");
      return;
    }

    // ✅ CHỈ CHẠY DÒNG NÀY KHI OK
    onResult(data);

  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Xếp thời khóa biểu</h1>

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
