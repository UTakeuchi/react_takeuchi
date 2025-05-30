import { useState, type ChangeEvent } from "react";
import type { DataType } from "../types/todo";
import { useForm } from "react-hook-form";



type Props = {
    title: string;
    time: string;
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeTime: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickRegister: (title: string, time: string) => void;
};

// // 学習内容のタイトルを管理するState
// const [title, setTitle] = useState("");
// // 学習時間を管理するState
// const [time, setTime] = useState("");

// //タイトル入力フィールドの値が変更された時にStateを更新する関数
// const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

// // 時間入力フィールドの値が変更された時にStateを更新する関数   
// const onChangeTime = (event: ChangeEvent<HTMLInputElement>) => setTime(event.target.value);

export const InputRecord = (props: Props) => {
    const { title, time, onChangeTitle, onChangeTime, onClickRegister } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Pick<DataType, "title" | "time">>();

    const onSubmit = (data: Pick<DataType, "title" | "time">) => {
        console.log(data.title, data.time)
        onClickRegister(data.title, data.time);
        reset(); // 入力後にフォームを初期化
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    placeholder="学習内容を入力"
                    {...register("title", { required: "内容の入力は必須です" })}
                />
                {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div>
                <input
                    placeholder="学習時間を入力(数値のみ)"
                    {...register("time", {
                        required: "時間の入力は必須です",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "時間は0以上である必要があります",
                        },
                    })}
                />
                {errors.time && <p>{errors.time.message}</p>}
            </div>

            <button type="submit">登録</button>
        </form>
    );
};


// // 学習記録入力フォームコンポーネント
// export const InputRecord = (props: Props) => {
//     const { title, time, onChangeTitle, onChangeTime, onClickRegister } = props;
//     return (
//         <div>
//             <input placeholder='学習内容を入力' value={title} onChange={onChangeTitle} />
//             <input placeholder='学習時間を入力(数値のみ)' value={time} onChange={onChangeTime} />
//             <button onClick={() => onClickRegister(title, time)}>登録</button>
//         </div>
//     )
// }