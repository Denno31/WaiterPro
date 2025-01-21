import { login } from "@/api/api";
import { Waiter } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface AuthContextType {
  user: Waiter | null;
  handleLogin: (password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const initialState: AuthContextType = {
  user: null,
  handleLogin: () => {},
  logout: () => {},
  isLoggedIn: false,
} as AuthContextType;

const AuthContext = createContext<AuthContextType>(initialState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Waiter | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = async (password: string) => {
    try {
      const result = await login(password);
      setUser(result);
      setIsLoggedIn(true);
      await AsyncStorage.setItem("user", JSON.stringify(result));
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/login");
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
        setIsLoggedIn(true);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
