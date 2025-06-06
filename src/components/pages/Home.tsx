import { memo, type FC } from "react";
import { Link } from "react-router-dom";

export const Home: FC = memo(() => {
  return (
    <>
      <p>ホームページです</p>
      <Link to="/knowledgePage">ナレッジ機能ページへ</Link>
    </>
  );
});
