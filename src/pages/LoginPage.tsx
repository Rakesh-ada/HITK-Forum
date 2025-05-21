import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { RedditLogo } from "../components/ui/RedditLogo";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || "/";
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    setError("");
    
    const success = await login(username, password);
    
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError("Invalid username or password");
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
      <div className="text-center mb-6">
        <RedditLogo className="h-12 w-12 mx-auto text-orange-500 mb-2" />
        <h1 className="text-2xl font-bold">Log In</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
          Welcome back to Reddit
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Log In
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">Don't have an account?</span>{" "}
        <Link to="/register" className="text-blue-500 hover:underline font-medium">
          Sign up
        </Link>
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center text-xs text-neutral-500">
        <p>
          By logging in, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};