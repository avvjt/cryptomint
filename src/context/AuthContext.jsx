import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backendxmint.onrender.com";

// Convert MongoDB relative avatar path into full backend URL
function getAvatarUrl(avatarUrl) {
  if (!avatarUrl) return "";

  if (
    avatarUrl.startsWith("http://") ||
    avatarUrl.startsWith("https://")
  ) {
    return avatarUrl;
  }

  return `${API_URL}${avatarUrl}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return null;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        const userData = data.user;

        setUser({
          ...userData,
          avatarUrl: getAvatarUrl(userData?.avatarUrl),
        });

        return userData;
      }

      localStorage.removeItem("token");
      setUser(null);
      return null;
    } catch (err) {
      console.error("Fetch user error:", err);

      localStorage.removeItem("token");
      setUser(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // =====================================================
  // TELEGRAM LOGIN
  // =====================================================

  const loginWithTelegram = useCallback(async () => {
    if (!window.Telegram?.WebApp) {
      throw new Error(
        "Telegram Mini App is not available"
      );
    }

    const tg = window.Telegram.WebApp;

    tg.ready();
    tg.expand();

    const initData = tg.initData;

    if (!initData) {
      throw new Error(
        "Telegram authentication data is unavailable"
      );
    }

    const res = await fetch(
      `${API_URL}/api/auth/telegram`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initData,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success || !data.token) {
      throw new Error(
        data.message || "Telegram login failed"
      );
    }

    // Same JWT storage used by normal login
    localStorage.setItem("token", data.token);

    // Load CryptoMintX user
    await fetchUser();

    return data;
  }, [fetchUser]);

  // =====================================================
  // LOGOUT
  // =====================================================

  function logout() {
    localStorage.removeItem("token");
    setUser(null);

    window.location.href = "/";
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        fetchUser,
        loginWithTelegram,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}