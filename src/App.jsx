import AppRoutes from "./routes/AppRoutes";
import { TradeWalletProvider } from "./context/TradeWalletContext";
import { AccountStatusProvider } from "./context/AccountStatusContext";

function App() {
  return (
    <TradeWalletProvider>
      <AccountStatusProvider>
        <AppRoutes />
      </AccountStatusProvider>
    </TradeWalletProvider>
  );
}

export default App;