import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/Button";

export const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const handleLogout = () => {
    logout();
    setShowMobileMenu(false);
    navigate("/");
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              className="mr-2 md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-secondary-500">HITK</span>
              <span className="ml-1 text-primary-500">Forum</span>
            </Link>
          </div>
          
          {/* Search bar */}
          <div className="max-w-xl w-full mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 pl-10 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary-500 text-sm"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
          
          {/* User actions */}
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="flex items-center">
                <Link to={`/user/${user.username}`} className="flex items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full p-1">
                  <img 
                    src={user.avatarUrl}
                    alt={user.username}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="ml-2 hidden md:block">{user.username}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full ml-2"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="sm"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  size="sm"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-700">
          <div className="container mx-auto p-4">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              </div>
              
              {user ? (
                <>
                  <Link 
                    to={`/user/${user.username}`}
                    className="flex items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <User size={18} className="mr-2" />
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left p-2 text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    <LogOut size={18} className="mr-2" />
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={() => {
                      navigate("/login");
                      setShowMobileMenu(false);
                    }}
                    variant="outline"
                    fullWidth
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                      setShowMobileMenu(false);
                    }}
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};