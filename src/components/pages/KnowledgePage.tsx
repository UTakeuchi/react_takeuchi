import { memo, type FC } from "react";
import { Link } from "react-router-dom";

export const KnowledgePage: FC = memo(() => {
  return (
    <>
      <p>ナレッジ機能追加ページです</p>
      <Link to="/">ホームに戻る</Link>
    </>
  );
});
