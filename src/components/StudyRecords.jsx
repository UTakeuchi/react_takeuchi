export const StudyRecords = (props) => {
    const { records, totalTime } = props;
    return (
        <div>
            <p>学習記録一覧</p>
            <ul>
                {records.map((record, index) => (
                    <li key={index}>
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
