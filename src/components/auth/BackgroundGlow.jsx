export default function BackgroundGlow() {
  return (
    <>
      <div
        className="
        absolute
        left-[-200px]
        top-[-100px]
        h-[500px]
        w-[500px]
        rounded-full
        bg-blue-600/20
        blur-[150px]
        "
      />

      <div
        className="
        absolute
        right-[-200px]
        bottom-[-100px]
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-500/10
        blur-[150px]
        "
      />
    </>
  );
}