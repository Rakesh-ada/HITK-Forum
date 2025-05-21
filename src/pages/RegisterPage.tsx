import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { RedditLogo } from "../components/ui/RedditLogo";
import { useAuth } from "../hooks/useAuth";
import { AtSign, Lock, User, AlertCircle, Mail, Check } from "lucide-react";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
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
    
    try {
      // Register the user
      const success = await register(username, email, password);
      
      if (success) {
        setIsSuccess(true);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };
  
  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold">Email Verification Required</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
            We've sent a verification link to <span className="font-medium text-neutral-800 dark:text-neutral-200">{email}</span>
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Next steps:</h3>
          <ol className="list-decimal list-inside text-sm text-blue-700 dark:text-blue-400 space-y-1 ml-1">
            <li>Check your email inbox for a verification link</li>
            <li>Click the link to verify your account</li>
            <li>Return to HITK Forum to log in</li>
          </ol>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
          If you don't see the email, check your spam folder or 
          <button 
            onClick={() => navigate('/register')} 
            className="text-primary-500 hover:underline ml-1"
          >
            try again with a different email
          </button>.
        </p>
        
        <Button
          onClick={() => navigate('/login', { state: { emailSent: true, email } })}
          fullWidth
        >
          Go to Login
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
      <div className="text-center mb-6">
        <RedditLogo className="h-12 w-12 mx-auto text-orange-500 mb-2" />
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
          Join HITK Forum and dive into your favorite communities
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Choose a username"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AtSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            We'll send a verification link to this address
          </p>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Create a password (8+ characters)"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Re-enter your password"
              required
            />
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="bg-primary-500 hover:bg-primary-600"
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">Already have an account?</span>{" "}
        <Link to="/login" className="text-primary-500 hover:underline font-medium">
          Log in
        </Link>
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center text-xs text-neutral-500">
        <p className="mb-2">
          By signing up, you agree to our{" "}
          <a href="#" className="text-primary-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary-500 hover:underline">
            Privacy Policy
          </a>
        </p>
        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#" className="text-primary-500 hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary-500 hover:underline">
            Terms of Service
          </a>{" "}
          apply
        </p>
      </div>
    </div>
  );
};