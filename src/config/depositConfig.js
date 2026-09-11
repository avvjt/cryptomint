export const DEPOSIT_CONFIG = {
  asset: "USDT",
  network: "BEP20",
  networkName: "BNB Smart Chain",

  /*
   * Frontend development only.
   *
   * IMPORTANT:
   * This is NOT a real deposit address.
   *
   * Replace it with the address returned by
   * your backend before accepting real deposits.
   */
  demoAddress:
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",

  api: {
    depositAddress:
      "/api/wallet/deposit-address",

    accountStatus:
      "/api/account/status",
  },
};