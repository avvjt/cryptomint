import AppRoutes from "./routes/AppRoutes";
import { AccountStatusProvider } from "./context/AccountStatusContext";

function App() {
  return (
    <AccountStatusProvider>
      <AppRoutes />
    </AccountStatusProvider>
  );
}

export default App;