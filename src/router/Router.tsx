import { memo, type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { KnowledgePage } from "../components/pages/KnowledgePage";
import { Home } from "../components/pages/Home";

export const Router: FC = memo(() => {
  return (
    <>
      <Routes>
        {/* 親ルート */}
        <Route path="/" element={<Home />} />
        <Route path="knowledgePage" element={<KnowledgePage />} />
      </Routes>
    </>
  );
});
