import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
import { InputRecord } from './components/InputRecord'
import { StudyRecords } from './components/StudyRecords'

export const App = () => {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRecords = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('study-records')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error("取得エラー:", error)
    } else {
      setRecords(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const onchangeTitle = (event) => setTitle(event.target.value);
  const onchangeTime = (event) => setTime(event.target.value);
  const onClickRegister = async () => {
    if (title === "" || time === "") {
      alert("内容と時間を入力してください")
      return
    }

    const { error } = await supabase
      .from("study-records")
      .insert([{ title, time: Number(time) }])

    if (error) {
      console.error("登録エラー:", error)
      alert("登録失敗")
    } else {
      setTitle("")
      setTime("")
      await fetchRecords()
    }
  }
  const onClickDelete = async (id) => {
    const { error } = await supabase
      .from("study-records")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("削除エラー:", error)
      alert("削除失敗")
    } else {
      setTitle("")
      setTime("")
      await fetchRecords()
    }
  };

  return (
    <>
      <h2>学習記録一覧</h2>
      <InputRecord title={title} time={time} onchangeTitle={onchangeTitle} onchangeTime={onchangeTime} onClickRegister={onClickRegister} />
      <StudyRecords records={records} loading={loading} onClickDelete={onClickDelete} />
    </>
  )
}