import { Outlet } from "react-router-dom";

export default function BasicLayout() {
  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
}
