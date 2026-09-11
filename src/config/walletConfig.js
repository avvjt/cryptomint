export const WALLET_CONFIG = {
  asset: "USDT",

  network: "BEP20",

  networkName: "BNB Smart Chain",

  minimumDeposit: 50,

  minimumWithdrawal: 50,

  withdrawalProcessingTime: "up to 24 hours",

  api: {
    depositAddress: "/api/wallet/deposit-address",

    accountStatus: "/api/account/status",

    walletBalance: "/api/wallet/balance",

    withdrawals: "/api/withdrawals",
  },
};