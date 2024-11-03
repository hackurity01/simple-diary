import { useEffect, useState } from "react";
import "./HistoryView.css";

function HistoryView({ setView }) {
  const [history, setHistory] = useState({});

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("diary") || "{}"));
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button className="back-btn" onClick={() => setView("main")}>
          &lt;
        </button>
        <h4>다이어리 기록</h4>
      </div>
      {Object.entries(history).map(([key, value]) => (
        <div key={key} className="diary-item">
          <div className="diary-date">{key}</div>
          <div>{value}</div>
        </div>
      ))}
    </>
  );
}
export default HistoryView;
