import { useState } from "react";

function HomePage({ onResult }) {
  const [file, setFile] = useState(null);
  const [coursesInput, setCoursesInput] = useState("");

  async function uploadExcel() {
    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData
    });
  }

  async function runSchedule() {
    const courses = coursesInput
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const res = await fetch("http://localhost:3001/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courses, limit: 50 })
    });

    const data = await res.json();
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
      <button onClick={uploadExcel}>Upload</button>
      <button onClick={runSchedule}>Xếp TKB</button>
    </div>
  );
}

export default HomePage;
