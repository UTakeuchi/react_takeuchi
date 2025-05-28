import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
import { InputRecord } from './components/InputRecord'
import { StudyRecords } from './components/StudyRecords'

export const App = () => {
  // 学習内容のタイトルを管理するState
  const [title, setTitle] = useState("")
  // 学習時間を管理するState
  const [time, setTime] = useState("")
  // 学習記録のリストを管理するState
  const [records, setRecords] = useState([])
  // データ取得中のローディング状態を管理するState
  const [loading, setLoading] = useState(true)

  /**
   * Supabaseから学習記録を取得する非同期関数
   */
  const fetchRecords = async () => {
    setLoading(true) // ローディング開始
    try {
      // 'study-records'テーブルから全てのデータをIDの昇順で取得
      const { data, error } = await supabase
        .from('study-records')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        // データ取得でエラーが発生した場合
        console.error("取得エラー:", error)
        alert("データの取得に失敗しました。")
      } else {
        // データ取得に成功した場合、Stateを更新
        setRecords(data)
      }
    } catch (error) {
      console.error("予期せぬエラー:", error)
      alert("予期せぬエラーが発生しました。")
    } finally {
      setLoading(false) // ローディング終了
    }
  }

  /**
   * コンポーネントがマウントされた時に一度だけ学習記録を取得する
   */
  useEffect(() => {
    fetchRecords()
  }, []) // 第2引数に空配列を指定することで、初回レンダリング時のみ実行

  /**
   * タイトル入力フィールドの値が変更された時にStateを更新する関数
   * @param {React.ChangeEvent<HTMLInputElement>} event - input要素のイベントオブジェクト
   */
  const onchangeTitle = (event) => setTitle(event.target.value);

  /**
   * 時間入力フィールドの値が変更された時にStateを更新する関数
   * @param {React.ChangeEvent<HTMLInputElement>} event - input要素のイベントオブジェクト
   */
  const onchangeTime = (event) => setTime(event.target.value);

  /**
   * 「登録」ボタンがクリックされた時に学習記録をSupabaseに登録する非同期関数
   */
  const onClickRegister = async () => {
    // タイトルか時間が未入力の場合はアラートを表示して処理を中断
    if (title === "" || time === "") {
      alert("内容と時間を入力してください")
      return
    }

    try {
      // 'study-records'テーブルに新しい記録を挿入
      const { error } = await supabase
        .from("study-records")
        .insert([{ title, time: Number(time) }]) // timeは数値型に変換

      if (error) {
        // 登録でエラーが発生した場合
        console.error("登録エラー:", error)
        alert("登録失敗")
      } else {
        // 登録に成功した場合、入力フィールドをクリアし、記録を再取得
        setTitle("")
        setTime("")
        await fetchRecords()
      }
    } catch (error) {
      console.error("登録中の予期せぬエラー:", error)
      alert("登録中に予期せぬエラーが発生しました。")
    }
  }

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
        console.error("削除エラー:", error)
        alert("削除失敗")
      } else {
        // 削除に成功した場合、記録を再取得
        await fetchRecords()
      }
    } catch (error) {
      console.error("削除中の予期せぬエラー:", error)
      alert("削除中に予期せぬエラーが発生しました。")
    }
  };

  // コンポーネントの描画内容
  return (
    <>
      <h2>学習記録一覧</h2>
      {/* 学習記録入力フォームコンポーネント */}
      <InputRecord
        title={title}
        time={time}
        onchangeTitle={onchangeTitle}
        onchangeTime={onchangeTime}
        onClickRegister={onClickRegister}
      />
      {/* 学習記録表示コンポーネント */}
      <StudyRecords
        records={records}
        loading={loading}
        onClickDelete={onClickDelete}
      />
    </>
  )
}