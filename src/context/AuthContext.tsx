import { createContext, useState, useEffect } from "react";
import { User } from "../types/User";
import { dummyUsers } from "../data/dummyData";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call with a delay
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = dummyUsers.find(
          (u) => u.username === username && u.password === password
        );
        
        if (foundUser) {
          // Remove password from saved user
          const { password: _, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          resolve(true);
        } else {
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call with a delay
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if username or email already exists
        const userExists = dummyUsers.some(
          (u) => u.username === username || u.email === email
        );
        
        if (userExists) {
          resolve(false);
        } else {
          const newUser: User = {
            id: `user-${Date.now()}`,
            username,
            email,
            password,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            createdAt: new Date().toISOString(),
            karma: 0,
          };
          
          // In a real app, we would save to a database here
          dummyUsers.push(newUser);
          
          // Remove password from saved user
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          resolve(true);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};