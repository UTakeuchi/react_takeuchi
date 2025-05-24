import { useState } from 'react';
import './App.css';
// import { TodoList } from './components/StudyRecord';

export const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [records, setRecords] = useState([
    { title: "勉強の記録1", time: 1 },
    { title: "勉強の記録2", time: 3 },
    { title: "勉強の記録3", time: 5 }
  ]);
  const totalTime = records.reduce((sum, record) => sum + Number(record.time), 0);

  const onchangeTitle = (event) => setTitle(event.target.value);
  const onchangeTime = (event) => setTime(event.target.value);
  const onClickRegister = (title, time) => {
    if (title === "" || time === "") {
      alert("学習の内容と時間の両方を入力してください！");
      return;
    }
    // else if (typeof time !== "number") {
    //   alert("学習時間には数値を入力してください！");
    //   return;
    // }
    const newRecords = [...records, { title, time }];
    setRecords(newRecords);
    setTitle("");
    setTime("");
  };

  return (
    <>
      <div>
        <input placeholder='学習内容を入力' value={title} onChange={onchangeTitle} />
        <input placeholder='学習時間を入力' value={time} onChange={onchangeTime} />
        <button onClick={() => onClickRegister(title, time)}>登録</button>
      </div>
      <div>
        <p>学習記録一覧</p>
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              <div>
                <p>{record.title}, {record.time}時間</p>
              </div>
            </li>
          ))}
        </ul>
        <p>勉強合計時間：{totalTime}時間</p>
      </div >
      {/* <TodoList /> */}
    </>
  );
};
