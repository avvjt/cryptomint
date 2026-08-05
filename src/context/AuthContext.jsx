import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    if (!token) {
      setLoading(false);
      return;
    }

    
    try {
      const res = await fetch(
        `${API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else {
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
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