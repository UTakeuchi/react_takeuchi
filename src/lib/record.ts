import { supabase } from "../utils/supabase";
import { Record } from "../domain/record";

/**
 * Supabaseから学習記録を取得する非同期関数
 */
export const getAllRecords = async () => {
    const { data, error } = await supabase
        .from('study-records')
        .select('*')

    if (error) {
        // データ取得でエラーが発生した場合
        console.error("取得エラー:", error)
        alert("データの取得に失敗しました。")
    } else {
        // データ取得に成功した場合、Stateを更新
        const recordsData = data.map((record) => {
            return new Record(record.id, record.title, record.time);
        })

        return recordsData;
    }
}
