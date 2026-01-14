import { useState } from "react";
import Timetable from "../components/Timetable";
import ResultHeader from "../components/ResultHeader";
import OptionsPanel from "../components/OptionsPanel";

function ResultPage({ result, onBack }) {
  const [pageIndex, setPageIndex] = useState(0);

  // ✅ GUARD RẤT QUAN TRỌNG
  if (!result || !Array.isArray(result.top) || result.top.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={onBack}>← Quay lại</button>
        <p>Không có kết quả hợp lệ</p>
      </div>
    );
  }

  const current = result.top[pageIndex];
  const timetable = current.timetable;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>← Quay lại</button>

      <ResultHeader result={result} />

      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Timetable timetable={timetable} />
        <OptionsPanel />
      </div>

      {/* PAGINATION */}
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
          style={{ marginLeft: 10 }}
        >
          Kết quả sau
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
