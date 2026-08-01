export default function BackgroundGlow() {
  return (
    <>
      <div
        className="
        absolute
        -left-50
        -top-25
        h-125
        w-125
        rounded-full
        bg-blue-600/20
        blur-[150px]
        "
      />

      <div
        className="
        absolute
        -right-50
        -bottom-25
        h-125
        w-125
        rounded-full
        bg-cyan-500/10
        blur-[150px]
        "
      />
    </>
  );
}