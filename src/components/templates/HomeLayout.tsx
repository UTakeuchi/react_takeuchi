import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div>
      {/* 共通のレイアウトやメニューなど */}
      <h2>Home Layout</h2>
      <Outlet />
    </div>
  );
};
