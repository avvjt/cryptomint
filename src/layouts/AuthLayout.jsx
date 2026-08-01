import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white flex justify-center items-center">

      {/* Glow 1 */}
      <div
        className="
        absolute
        left-[-200px]
        top-[-150px]
        h-[500px]
        w-[500px]
        rounded-full
        bg-blue-600/20
        blur-[180px]
        "
      />

      {/* Glow 2 */}
      <div
        className="
        absolute
        right-[-200px]
        bottom-[-150px]
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-500/10
        blur-[180px]
        "
      />

      {/* Grid */}
      <div
        className="
        absolute
        inset-0
        opacity-20
        bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]
        bg-[size:60px_60px]
        "
      />

      <div className="relative z-10">
        <Outlet />
      </div>

    </div>
  );
}