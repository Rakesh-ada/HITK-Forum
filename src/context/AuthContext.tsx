import { createContext, useState, useEffect } from "react";
import { User } from "../types/User";
import { 
  getUsers, 
  addUser, 
  updateUser, 
  verifyUserEmail 
} from "../services/storageService";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  sendMagicLink: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: false,
  sendMagicLink: async () => false,
  verifyEmail: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a saved user in localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call with a delay
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const allUsers = getUsers();
        const foundUser = allUsers.find(
          (u) => u.email === email && u.password === password
        );
        
        if (foundUser) {
          // Check if email is verified
          if (!foundUser.emailVerified) {
            setIsLoading(false);
            reject(new Error("Email not confirmed. Please check your inbox for a verification link."));
            return;
          }
          
          // Remove password from saved user
          const { password: _, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const allUsers = getUsers();
        // Check if username or email already exists
        const userExists = allUsers.some(
          (u) => u.username === username || u.email === email
        );
        
        if (userExists) {
          setIsLoading(false);
          const existingUser = allUsers.find(u => u.email === email);
          
          if (existingUser && !existingUser.emailVerified) {
            reject(new Error("User already exists but email is not verified. Check your inbox or request a new verification link."));
          } else {
            reject(new Error("Username or email already exists"));
          }
          return;
        }
        
        try {
          // Create and add the new user
          addUser({
            username,
            email,
            password,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
          });
          
          // Simulate sending verification email
          console.log(`Verification email sent to ${email}`);
          
          setIsLoading(false);
          resolve(true);
        } catch (error) {
          setIsLoading(false);
          reject(new Error("Failed to create account. Please try again."));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };
  
  const sendMagicLink = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const allUsers = getUsers();
        const userExists = allUsers.some(u => u.email === email);
        
        if (!userExists) {
          console.log(`Magic link requested for non-existent user: ${email}`);
        } else {
          console.log(`Magic link sent to: ${email}`);
        }
        
        // Always return true for UX reasons (don't reveal if email exists)
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };
  
  const verifyEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, we would validate the token and find the user
        // For this demo, we'll use a fake/placeholder email
        const success = verifyUserEmail("placeholder@example.com");
        
        setIsLoading(false);
        resolve(success);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, sendMagicLink, verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
};