export default function AuthCard({
    children,
}) {
    return (
        <div
            className="
      w-full
md:max-w-md
w-full
md:max-w-md

      border
      border-zinc-800

      bg-[#0B0F17]/80

      backdrop-blur-xl

      p-6 md:p-8

      shadow-[0_0_60px_rgba(29,102,255,.15)]
      "
        >
            {children}
        </div>
    );
}