import { useState } from "react";
import Timetable from "../components/Timetable";
import OptionsPanel from "../components/OptionsPanel";
import ResultHeader from "../components/ResultHeader";

function ResultPage({ result, onBack }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [criteria, setCriteria] = useState("random");
  const [sorted, setSorted] = useState(result.top);

  function applyFilter() {
    let newSorted = [...result.top];

    if (criteria === "offMorning") {
      newSorted.sort((a, b) => b.score.offMorning - a.score.offMorning);
    } else if (criteria === "offAfternoon") {
      newSorted.sort((a, b) => b.score.offAfternoon - a.score.offAfternoon);
    } else if (criteria === "offDay") {
      newSorted.sort((a, b) => b.score.offDay - a.score.offDay);
    } else {
      // random → giữ nguyên
      newSorted = [...result.top];
    }

    setSorted(newSorted);
    setPageIndex(0); 
  }

  const timetable = sorted?.[pageIndex]?.timetable;
  if (!timetable) return <div>Không có kết quả</div>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>← Quay lại</button>

      <ResultHeader result={{ ...result, total: sorted.length }} />

      <div style={{ display: "flex" }}>
        <Timetable timetable={timetable} />

        <OptionsPanel
          criteria={criteria}
          setCriteria={setCriteria}
          onApply={applyFilter}
        />
      </div>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button onClick={() => setPageIndex(0)}>Trang đầu</button>

        <button
          onClick={() => setPageIndex(i => Math.max(i - 1, 0))}
          style={{ marginLeft: 10 }}
        >
          Trước
        </button>

        <span style={{ margin: "0 15px" }}>
          {pageIndex + 1}/{sorted.length}
        </span>

        <button
          onClick={() =>
            setPageIndex(i => Math.min(i + 1, sorted.length - 1))
          }
        >
          Sau
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
