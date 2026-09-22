import {
  createContext,
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

  // Already a complete URL
  if (
    avatarUrl.startsWith("http://") ||
    avatarUrl.startsWith("https://")
  ) {
    return avatarUrl;
  }

  // MongoDB stores something like:
  // /uploads/profile/avatar-123.jpg
  return `${API_URL}${avatarUrl}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
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
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (err) {
      console.error("Fetch user error:", err);

      localStorage.removeItem("token");
      setUser(null);
    }

    setLoading(false);
  }

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}