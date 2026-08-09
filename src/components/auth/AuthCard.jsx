export default function AuthCard({ children }) {
  return (
    <div
      className="
        w-full
        rounded-[16px]
        border
        border-[#1D1D1D]
        bg-[#121212]
        p-6
        sm:p-7
        lg:p-8

        shadow-[0_8px_40px_rgba(0,0,0,0.35)]
      "
    >
      {children}
    </div>
  );
}