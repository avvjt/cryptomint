export const TRADE_PACKAGES = [
  {
    name: "Starter",
    min: 50,
    max: 200,
    dailyRate: 0.01,
  },
  {
    name: "Pro",
    min: 201,
    max: 1000,
    dailyRate: 0.015,
  },
  {
    name: "Master",
    min: 1001,
    max: 2000,
    dailyRate: 0.025,
  },
  {
    name: "Elite",
    min: 2001,
    max: 4500,
    dailyRate: 0.03,
  },
  {
    name: "Empire",
    min: 4501,
    max: 10000,
    dailyRate: 0.033,
  },
];

export function getTradePackage(amount) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return null;
  }

  return (
    TRADE_PACKAGES.find(
      (pkg) =>
        value >= pkg.min &&
        value <= pkg.max
    ) || null
  );
}