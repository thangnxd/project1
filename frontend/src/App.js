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
            console.log("Nhận result ở App:", data);
            setResult(data);
            setPage("result");
          }}
        />
      )}

      {page === "result" && result && (
        <ResultPage
          result={result}
          onBack={() => {
            setPage("home");
            setResult(null);
          }}
        />
      )}
    </>
  );
}

export default App;
