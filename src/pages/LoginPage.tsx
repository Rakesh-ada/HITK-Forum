import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { RedditLogo } from "../components/ui/RedditLogo";
import { useAuth } from "../hooks/useAuth";
import { AtSign, Lock, AlertCircle, CheckCircle, Mail } from "lucide-react";
import { getUnverifiedUser, verifyUserEmail } from "../services/storageService";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  
  const { login, isLoading, sendMagicLink } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || "/";
  
  // Check if user came from a successful registration
  useEffect(() => {
    if (location.state?.emailSent) {
      setShowVerificationMessage(true);
      if (location.state?.email) {
        setEmail(location.state.email);
        checkUnverifiedUser(location.state.email);
      }
    }
  }, [location]);
  
  const checkUnverifiedUser = (emailToCheck: string) => {
    const unverifiedUser = getUnverifiedUser(emailToCheck);
    setShowVerifyButton(!!unverifiedUser);
  };
  
  useEffect(() => {
    if (email) {
      checkUnverifiedUser(email);
    }
  }, [email]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setError("");
    setSuccessMessage("");
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("Invalid login credentials or email not verified");
        checkUnverifiedUser(email);
      }
    } catch (err: any) {
      if (err.message?.includes("Email not confirmed")) {
        setError("Please verify your email before logging in");
        setShowVerificationMessage(true);
        checkUnverifiedUser(email);
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    }
  };
  
  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    setError("");
    
    try {
      await sendMagicLink(email);
      setSuccessMessage("Magic link sent! Please check your email.");
    } catch (err: any) {
      setError(err.message || "Failed to send magic link. Please try again.");
    }
  };
  
  const handleDirectVerification = () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    const verified = verifyUserEmail(email);
    
    if (verified) {
      setSuccessMessage("Email verified successfully! You can now log in.");
      setShowVerificationMessage(false);
      setShowVerifyButton(false);
    } else {
      setError("Could not verify email. Please try again or contact support.");
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
      <div className="text-center mb-6">
        <RedditLogo className="h-12 w-12 mx-auto text-orange-500 mb-2" />
        <h1 className="text-2xl font-bold">Log In</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
          Welcome back to HITK Forum
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-sm flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}
      
      {showVerificationMessage && (
        <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-sm">
          <p className="font-medium mb-1">Please verify your email</p>
          <p>A verification link has been sent to your email address. Please check your inbox and spam folder.</p>
          <div className="mt-3 flex gap-3 items-center">
            <button 
              onClick={handleMagicLink} 
              className="text-primary-600 dark:text-primary-400 underline text-xs font-medium"
            >
              Resend verification email
            </button>
            
            {showVerifyButton && (
              <button 
                onClick={handleDirectVerification} 
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-600 transition-colors"
              >
                <Mail size={12} />
                Verify Now
              </button>
            )}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs text-primary-500 hover:underline">
              Forgot password?
            </Link>
          </div>
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
              placeholder="Enter your password"
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
          Log In
        </Button>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500">Or</span>
          </div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={handleMagicLink}
          className="border-neutral-300 dark:border-neutral-700"
        >
          Sign in with magic link
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">Don't have an account?</span>{" "}
        <Link to="/register" className="text-primary-500 hover:underline font-medium">
          Sign up
        </Link>
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center text-xs text-neutral-500">
        <p>
          By logging in, you agree to our{" "}
          <a href="#" className="text-primary-500 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary-500 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};