export default function WalletOverview() {
  return (
    <div
      className="
      rounded-3xl
      bg-gradient-to-r
      from-blue-700
      to-blue-500
      p-8
      "
    >
      <p className="text-blue-100">
        Total Wallet Balance
      </p>

      <h1 className="mt-2 text-5xl font-bold">
        1,250.00 USDT
      </h1>

      <p className="mt-2 text-blue-100">
        ≈ $1,250.00 USD
      </p>
    </div>
  );
}