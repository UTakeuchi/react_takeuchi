import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useRecords = () => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('study-records')
        .select('*')
        .order('id', { ascending: true })
      console.log(data)

      if (error) {
        console.error('データ取得エラー:', error)
      } else {
        setRecords(data)
      }

      setLoading(false)
    }

    fetchRecords()
  }, [])

  return { records, loading }
}
