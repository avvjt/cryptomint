import {
  createContext,
  useContext,
} from "react";

import useTradeWallet from "../hooks/useTradeWallet";

const TradeWalletContext =
  createContext(null);

export function TradeWalletProvider({
  children,
}) {
  const wallet =
    useTradeWallet();

  return (
    <TradeWalletContext.Provider
      value={wallet}
    >
      {children}
    </TradeWalletContext.Provider>
  );
}

export function useTradeWalletContext() {
  const context =
    useContext(TradeWalletContext);

  if (!context) {
    throw new Error(
      "useTradeWalletContext must be used inside TradeWalletProvider"
    );
  }

  return context;
}