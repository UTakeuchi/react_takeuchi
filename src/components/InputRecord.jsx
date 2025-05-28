// 学習記録入力フォームコンポーネント
export const InputRecord = (props) => {
    const { title, time, onchangeTitle, onchangeTime, onClickRegister } = props;
    return (
        <div>
            <input placeholder='学習内容を入力' value={title} onChange={onchangeTitle} />
            <input placeholder='学習時間を入力(数値のみ)' value={time} onChange={onchangeTime} />
            <button onClick={() => onClickRegister(title, time)}>登録</button>
        </div>
    )
}