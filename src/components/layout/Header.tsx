import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, Menu, X, LogOut, PlusCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/Button";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const handleLogout = () => {
    logout();
    setShowMobileMenu(false);
    navigate("/");
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md shadow-sm border-b border-neutral-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex items-center mr-4">
            <button 
              className="mr-2 md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={20} className="text-neutral-300" /> : <Menu size={20} className="text-neutral-300" />}
            </button>
            
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-500">HITK</span>
              <span className="ml-1 text-primary-500">Forum</span>
            </Link>
          </div>
          
          {/* Search bar */}
          <div className="relative w-full max-w-md ml-[150px]">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full rounded-full bg-neutral-800/80 border border-neutral-700/70 text-neutral-200 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-500"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          </div>
          
          {/* Create Post button with fixed position */}
          <div className="ml-auto pl-[400px] flex items-center">
            {user && (
              <Button 
                onClick={() => navigate("/submit")}
                className="hidden md:flex items-center bg-primary-500 hover:bg-primary-600 text-white rounded-full px-4 py-2"
              >
                <PlusCircle size={18} className="mr-2" />
                Create Post
              </Button>
            )}
            
            {/* User actions */}
            <div className="ml-4">
              {user ? (
                <div className="flex items-center">
                  <Link to={`/user/${user.username}`} className="flex items-center hover:bg-neutral-800/70 rounded-full p-1.5">
                    <img 
                      src={user.avatarUrl}
                      alt={user.username}
                      className="h-8 w-8 rounded-full border border-neutral-700"
                    />
                    <span className="ml-2 hidden md:block text-neutral-200">{user.username}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="p-2 hover:bg-neutral-800/70 rounded-full ml-2 text-neutral-400 hover:text-neutral-200"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => navigate("/login")}
                    variant="outline"
                    size="sm"
                    className="text-white border-neutral-700 hover:bg-neutral-800/70 transition-all duration-200 font-medium px-5 py-2 rounded-full hover:border-primary-500"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    size="sm"
                    className="bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-500/20 transition-all duration-200 font-medium px-5 py-2 rounded-full hover:shadow-lg hover:shadow-primary-500/30"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-neutral-800/50 bg-neutral-950/95">
          <div className="container mx-auto p-4">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full rounded-full bg-neutral-800/80 border border-neutral-700/70 text-neutral-200 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-500"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
              </div>
              
              {user && (
                <Link 
                  to="/submit"
                  className="flex items-center p-2 hover:bg-neutral-800/70 rounded-md text-neutral-300"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <PlusCircle size={18} className="mr-2 text-primary-500" />
                  Create Post
                </Link>
              )}
              
              {user ? (
                <>
                  <Link 
                    to={`/user/${user.username}`}
                    className="flex items-center p-2 hover:bg-neutral-800/70 rounded-md text-neutral-300"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <User size={18} className="mr-2" />
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left p-2 text-red-400 hover:bg-neutral-800/70 rounded-md"
                  >
                    <LogOut size={18} className="mr-2" />
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Button
                    onClick={() => {
                      navigate("/login");
                      setShowMobileMenu(false);
                    }}
                    variant="outline"
                    fullWidth
                    className="text-white border-neutral-700 hover:bg-neutral-800/70 transition-all duration-200 font-medium py-2 rounded-full hover:border-primary-500"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                      setShowMobileMenu(false);
                    }}
                    fullWidth
                    className="bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-500/20 transition-all duration-200 font-medium py-2 rounded-full hover:shadow-lg hover:shadow-primary-500/30"
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