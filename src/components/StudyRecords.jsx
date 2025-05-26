import { useRecords } from "../hooks/useRecords";

export const StudyRecords = (props) => {
    const { records, loading } = props;

    if (loading) return <p>Loading...</p>

    const totalTime = records.reduce((sum, record) => sum + Number(record.time), 0);

    return (
        <div>
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
