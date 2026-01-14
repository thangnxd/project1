import { useState } from "react";
import Timetable from "../components/Timetable";
import ResultHeader from "../components/ResultHeader";
import OptionsPanel from "../components/OptionsPanel";

function ResultPage({ result, onBack }) {
  const [pageIndex, setPageIndex] = useState(0);

  // 👉 THÊM STATE CHO TIÊU CHÍ
  const [criteria, setCriteria] = useState("random");

  const timetable = result?.top?.[pageIndex]?.timetable;

  if (!timetable) {
    return <div>Không có kết quả</div>;
  }

  // 👉 HÀM ÁP DỤNG TIÊU CHÍ (GỌI LẠI BACKEND)
  async function applyCriteria() {
    const res = await fetch("http://localhost:3001/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courses: result.courses,   // danh sách mã HP ban đầu
        criteria,                  // tiêu chí đang chọn
        limit: 50
      })
    });

    const data = await res.json();

    // reset về trang đầu
    setPageIndex(0);

    // cập nhật lại result (cần prop setResult từ App)
    result.top = data.top;
    result.total = data.total;
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>← Quay lại</button>

      <ResultHeader result={result} />

      <div style={{ display: "flex" }}>
        <Timetable timetable={timetable} />

        {/* 👉 OPTIONS PANEL ĐÃ ĐƯỢC NỐI */}
        <OptionsPanel
          criteria={criteria}
          setCriteria={setCriteria}
          onApply={applyCriteria}
        />
      </div>

      {/* 👉 PHÂN TRANG */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button onClick={() => setPageIndex(0)}>Trang đầu</button>

        <button
          onClick={() => setPageIndex(i => Math.max(i - 1, 0))}
          style={{ marginLeft: 10 }}
        >
          Kết quả trước
        </button>

        <span style={{ margin: "0 15px" }}>
          Trang {pageIndex + 1}/{result.top.length}
        </span>

        <button
          onClick={() =>
            setPageIndex(i => Math.min(i + 1, result.top.length - 1))
          }
        >
          Kết quả sau
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
