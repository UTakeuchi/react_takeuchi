import { useState } from 'react';
import './App.css';
import { InputRecord } from './components/InputRecord';
import { StudyRecords } from './components/StudyRecords';
import { supabase } from './lib/supabaseClient';

export const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

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
    const { error } = supabase.from("study-record").insert([
      { title, time: Number(time) }
    ]);

    if (error) {
      console.error("登録エラー:", error);
      alert("データの登録に失敗しました");
    } else {
      setTitle("");
      setTime("");
    }
  };

  return (
    <>
      <InputRecord title={title} time={time} onchangeTitle={onchangeTitle} onchangeTime={onchangeTime} onClickRegister={onClickRegister} />
      <StudyRecords />
    </>
  );
};
