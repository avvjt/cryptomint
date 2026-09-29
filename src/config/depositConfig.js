export const DEPOSIT_CONFIG = {
  asset: "USDT",
  network: "BEP20",
  networkName: "BNB Smart Chain",

  // Fixed client deposit address
  depositAddress:
    "0x6331421329FB4D7b17742c22feF0f388EAe4a3ED",

  api: {
    depositAddress:
      "/api/wallet/deposit-address",

    accountStatus:
      "/api/account/status",
  },
};