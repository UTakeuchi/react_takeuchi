import { useRecords } from "../hooks/useRecords";

export const StudyRecords = () => {
    const { records, loading } = useRecords();

    const totalTime = records.reduce((sum, record) => sum + Number(record.time), 0);

    return (
        <div>
            <p>学習記録一覧</p>
            <ul>
                {records.map((record) => (
                    <li key={record.id}>
                        <div>
                            <p>{record.title}, {record.time}時間</p>
                        </div>
                    </li>
                ))}
            </ul>
            <p>勉強合計時間：{totalTime}時間</p>
        </div >
    )
}
