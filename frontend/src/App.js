import { useState } from "react";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [page, setPage] = useState("home");
  const [result, setResult] = useState(null);

  return (
    <>
      {page === "home" && (
        <HomePage
          onResult={(data) => {
            setResult(data);
            setPage("result");
          }}
        />
      )}

      {page === "result" && (
        <ResultPage
          result={result}
          onBack={() => setPage("home")}
        />
      )}
    </>
  );
}

export default App;
