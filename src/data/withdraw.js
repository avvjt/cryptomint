import { useTradeWalletContext } from "../context/TradeWalletContext";

export const WITHDRAWAL_MINIMUM = 50;

export const WITHDRAWAL_FEES = {
  TRC20: 1,
  BEP20: 0.3,
  ERC20: 8,
};

export function useWithdrawData() {
  const {
    availableBalance,
    loading,
  } = useTradeWalletContext();

  return {
    available: Number(availableBalance || 0),
    minimum: WITHDRAWAL_MINIMUM,
    loading,
  };
}