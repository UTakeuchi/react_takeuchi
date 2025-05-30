import { useEffect, useState, type ChangeEvent } from "react";
import { supabase } from "./utils/supabase";
import { InputRecord } from "./components/InputRecord";
import { StudyRecords } from "./components/StudyRecords";
import { GetAllRecords } from "./lib/record";
import type { Record } from "./domain/record";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import type { RecordType } from "./types/todo";

export const App = () => {
  // 学習内容のタイトルを管理するState
  const [title, setTitle] = useState("");
  // 学習時間を管理するState
  const [time, setTime] = useState("");
  // 学習記録のリストを管理するState
  const [records, setRecords] = useState<Record[]>();
  // データ取得中のローディング状態を管理するState
  const [loading, setLoading] = useState(true);

  /**
   * Supabaseから学習記録を取得する非同期関数
   */
  const fetchRecords = async () => {
    setLoading(true); // ローディング開始
    try {
      const recordsData = await GetAllRecords();
      setRecords(recordsData);
    } catch (error) {
      console.error("予期せぬエラー:", error);
      alert("予期せぬエラーが発生しました。");
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  /**
   * コンポーネントがマウントされた時に一度だけ学習記録を取得する
   */
  useEffect(() => {
    fetchRecords();
  }, []); // 第2引数に空配列を指定することで、初回レンダリング時のみ実行

  /**
   * タイトル入力フィールドの値が変更された時にStateを更新する関数
   * @param {React.ChangeEvent<HTMLInputElement>} event - input要素のイベントオブジェクト
   */
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  /**
   * 時間入力フィールドの値が変更された時にStateを更新する関数
   * @param {React.ChangeEvent<HTMLInputElement>} event - input要素のイベントオブジェクト
   */
  const onChangeTime = (event: ChangeEvent<HTMLInputElement>) =>
    setTime(event.target.value);

  /**
   * 「登録」ボタンがクリックされた時に学習記録をSupabaseに登録する非同期関数
   */
  const onClickRegister = async () => {
    // タイトルか時間が未入力の場合はアラートを表示して処理を中断
    if (title === "") {
      alert("内容は必須です");
      return;
    } else if (time === "") {
      alert("時間は必須です");
      return;
    } else if (Number(time) <= 0) {
      alert("時間は0を超える必要があります");
      return;
    }

    try {
      // 'study-records'テーブルに新しい記録を挿入
      const { error } = await supabase
        .from("study-records")
        .insert([{ title, time: Number(time) }]); // timeは数値型に変換

      if (error) {
        // 登録でエラーが発生した場合
        console.error("登録エラー:", error);
        alert("登録失敗");
      } else {
        // 登録に成功した場合、入力フィールドをクリアし、記録を再取得
        setTitle("");
        setTime("");
        await fetchRecords();
      }
    } catch (error) {
      console.error("登録中の予期せぬエラー:", error);
      alert("登録中に予期せぬエラーが発生しました。");
    }
  };

  /**
   * 「編集」ボタンがクリックされた時に指定されたIDの学習記録の更新をSupabaseに反映させる非同期関数
   * @param {number} id - 削除する記録のID
   */
  const onClickEdit = async (record: RecordType) => {
    const { id, title, time } = record;
    try {
      // 'study-records'テーブルから指定されたIDの記録を削除
      const { error } = await supabase
        .from("study-records")
        .update([{ id, title, time: Number(time) }])
        .eq("id", record.id); // 'id'カラムが指定されたidと一致するものを対象

      if (error) {
        // 保存でエラーが発生した場合
        console.error("削除エラー:", error);
        alert("保存失敗");
      } else {
        // 削除に成功した場合、記録を再取得
        await fetchRecords();
      }
    } catch (error) {
      console.error("削除中の予期せぬエラー:", error);
      alert("削除中に予期せぬエラーが発生しました。");
    }
  };

  /**
   * 「削除」ボタンがクリックされた時に指定されたIDの学習記録をSupabaseから削除する非同期関数
   * @param {number} id - 削除する記録のID
   */
  const onClickDelete = async (id) => {
    try {
      // 'study-records'テーブルから指定されたIDの記録を削除
      const { error } = await supabase
        .from("study-records")
        .delete()
        .eq("id", id); // 'id'カラムが指定されたidと一致するものを対象

      if (error) {
        // 削除でエラーが発生した場合
        console.error("削除エラー:", error);
        alert("削除失敗");
      } else {
        // 削除に成功した場合、記録を再取得
        await fetchRecords();
      }
    } catch (error) {
      console.error("削除中の予期せぬエラー:", error);
      alert("削除中に予期せぬエラーが発生しました。");
    }
  };

  // コンポーネントの描画内容
  return (
    <ChakraProvider>
      <Stack spacing={5}>
        <h1>学習記録一覧</h1>
        {/* 学習記録入力フォームコンポーネント */}
        <InputRecord
          title={title}
          time={time}
          onChangeTitle={onChangeTitle}
          onChangeTime={onChangeTime}
          onClickRegister={onClickRegister}
        />
        {/* /* 学習記録表示コンポーネント  */}
        <StudyRecords
          records={records}
          loading={loading}
          onChangeTitle={onChangeTitle}
          onChangeTime={onChangeTime}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      </Stack>
    </ChakraProvider>
  );
};
