import { Button, Wrap, WrapItem } from "@chakra-ui/react";
import type { DataType } from "../types/todo";


// 学習記録表示コンポーネント
export const StudyRecords = (props: Pick<DataType, "records" | "loading" | "onClickDelete">) => {
    const { records, loading, onClickDelete } = props;

    if (loading) return <p>Loading...</p>

    const totalTime = records.reduce((sum, record) => sum + Number(record.time), 0);

    return (
        <Wrap spacing={10}>  
            <div>
                <ul>
                    {records.map((record) => (
                        <WrapItem>
                            <li key={record.id}>
                                <div style={{width: "300px",height:"50px"}}>
                                    <p>{record.title}, {record.time}時間 
                                        <Button onClick={() => onClickDelete(record.id)}>編集</Button>
                                        <Button onClick={() => onClickDelete(record.id)}>削除</Button>
                                    </p>
                                </div>
                            </li>
                        </WrapItem>
                    ))}
                </ul>
                <p>勉強合計時間：{totalTime}時間</p>
            </div>

        </Wrap>
    )
}
