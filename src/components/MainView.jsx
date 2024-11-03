import "./MainView.css";
import { useState, useEffect } from "react";

function MainView(props) {
  const now = new Date();
  const [questions, setQuestions] = useState();
  const [answer, setAnswer] = useState("");
  const todayKey =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/hackurity01/simple-diary/main/src/questions.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  useEffect(() => {
    setAnswer(localStorage.getItem(todayKey));
  }, []);

  if (!questions) {
    return "loading";
  }

  return (
    <>
      <div className="header">
        <div>
          {now.getFullYear()}년 {now.getMonth() + 1}월 {now.getDate()}일
        </div>
        <div>
          <button
            className="history-btn"
            onClick={() => {
              props.setView("history");
            }}>
            기록 보기
          </button>
        </div>
      </div>
      <div className="question">{questions[now.getDate()]}</div>
      <div className="content">
        <textarea
          value={answer}
          onChange={(e) => {
            const history = JSON.parse(localStorage.getItem("diary") || "{}");
            localStorage.setItem(
              "diary",
              JSON.stringify({ ...history, [todayKey]: e.target.value })
            );
            setAnswer(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default MainView;
