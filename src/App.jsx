import { useEffect, useState } from 'react';
import './App.css';
import { InputRecord } from './components/InputRecord';
import { StudyRecords } from './components/StudyRecords';
import { supabase } from './lib/supabaseClient';

export const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const onchangeTitle = (event) => setTitle(event.target.value);
  const onchangeTime = (event) => setTime(event.target.value);
  const onClickRegister = async (title, time) => {
    if (title === "" || time === "") {
      alert("学習の内容と時間の両方を入力してください！");
      return;
    }
    // else if (typeof time !== "number") {
    //   alert("学習時間には数値を入力してください！");
    //   return
    // }

    const { data, error } = await supabase
      .from("study-records")
      .insert([
        { title, time: Number(time) }
      ])
      .select();

    console.log("🟢 登録送信データ:", { title, time });
    console.log("🟡 登録結果:", data);
    console.error("🔴 エラー:", error);


    if (error) {
      console.error("登録エラー:", error);
      alert("データの登録に失敗しました");
    } else {
      setTitle("");
      setTime("");
      /** 下の関数を登録時に呼び出したい*/
      fetchRecords();
    }
  };

  return (
    <>
      <InputRecord title={title} time={time} onchangeTitle={onchangeTitle} onchangeTime={onchangeTime} onClickRegister={onClickRegister} />
      <StudyRecords />
    </>
  );
};
