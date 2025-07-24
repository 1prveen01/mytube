import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (userData) => {

    const { user , refreshToken , accessToken } = userData;

    setUser(user);
    setIsAuthenticated(true);


    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("refreshToken",refreshToken);
    localStorage.setItem("accessToken", accessToken);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/users/logout");
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

