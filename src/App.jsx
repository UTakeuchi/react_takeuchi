import { useState } from 'react';
import './App.css';
import { InputRecord } from './components/InputRecord';
import { StudyRecords } from './components/StudyRecords';

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
      <InputRecord title={title} time={time} onchangeTitle={onchangeTitle} onchangeTime={onchangeTime} onClickRegister={onClickRegister} />
      <StudyRecords records={records} totalTime={totalTime} />
    </>
  );
};
