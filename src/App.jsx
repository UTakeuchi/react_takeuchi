import { useState } from 'react';
import './App.css';
import { InputRecord } from './components/InputRecord';
import { StudyRecords } from './components/StudyRecords';

export const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  // 予め入っていたテストデータ
  const [records, setRecords] = useState([
    { title: "勉強の記録1", time: 1 },
    { title: "勉強の記録2", time: 3 },
    { title: "勉強の記録3", time: 5 }
  ]);
  const totalTime = records.reduce((sum, record) => sum + Number(record.time), 0);

  //「学習内容を入力」のフォームの状態を随時反映させる関数
  const onChangeTitle = (event) => setTitle(event.target.value);
  //「学習時間を入力」のフォームの状態を随時反映させる関数
  const onChangeTime = (event) => setTime(event.target.value);

  // 登録ボタンを押した時に入力内容をRecordsに追加する
  const onClickRegister = (title, time) => {
    // 少なくとも片方が空欄であれば、アラートを出して終了する
    if (title === "" || time === "") {
      alert("学習の内容と時間の両方を入力してください！");
      return;
    }
    const newRecords = [...records, { title, time }];
    setRecords(newRecords);
    setTitle("");
    setTime("");
  };

  return (
    <>
      <InputRecord title={title} time={time} onchangeTitle={onChangeTitle} onchangeTime={onChangeTime} onClickRegister={onClickRegister} />
      <StudyRecords records={records} totalTime={totalTime} />
    </>
  );
};
