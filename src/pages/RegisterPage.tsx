import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { RedditLogo } from "../components/ui/RedditLogo";
import { useAuth } from "../hooks/useAuth";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    // Clear any previous errors
    setError("");
    
    // Register the user
    const success = await register(username, email, password);
    
    if (success) {
      navigate("/");
    } else {
      setError("Username or email already exists");
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
      <div className="text-center mb-6">
        <RedditLogo className="h-12 w-12 mx-auto text-orange-500 mb-2" />
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
          Join Reddit and dive into your favorite communities
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
            placeholder="Choose a username"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a password (8+ characters)"
            required
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Re-enter your password"
            required
          />
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">Already have an account?</span>{" "}
        <Link to="/login" className="text-blue-500 hover:underline font-medium">
          Log in
        </Link>
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center text-xs text-neutral-500">
        <p className="mb-2">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
        </p>
        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          apply
        </p>
      </div>
    </div>
  );
};