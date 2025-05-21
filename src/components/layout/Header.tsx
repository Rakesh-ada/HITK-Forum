import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, Menu, X, LogOut, PlusCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleLogout = () => {
    logout();
    setShowMobileMenu(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md shadow-sm border-b border-neutral-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo and mobile menu */}
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <X size={20} className="text-neutral-300" />
              ) : (
                <Menu size={20} className="text-neutral-300" />
              )}
            </button>
            
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-500">HITK</span>
              <span className="ml-1 text-primary-500">Forum</span>
            </Link>
          </div>
          
          {/* Search bar */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:block relative max-w-md w-full ml-8"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-full bg-neutral-800/80 border border-neutral-700/70 text-neutral-200 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-500"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          </form>
          
          {/* Desktop navigation */}
          <div className="ml-auto flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  onClick={() => navigate("/submit")}
                  className="hidden md:flex items-center bg-primary-500 hover:bg-primary-600"
                >
                  <PlusCircle size={18} className="mr-2" />
                  Create Post
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Link 
                    to={`/user/${user.username}`}
                    className="flex items-center hover:bg-neutral-800/70 rounded-full p-1.5"
                  >
                    <img 
                      src={user.avatarUrl}
                      alt={user.username}
                      className="h-8 w-8 rounded-full border border-neutral-700"
                    />
                    <span className="ml-2 hidden lg:block text-neutral-200">
                      {user.username}
                    </span>
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="p-2 hover:bg-neutral-800/70 rounded-full text-neutral-400 hover:text-neutral-200"
                    aria-label="Log out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="sm"
                  className="text-white border-neutral-700 hover:bg-neutral-800/70"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  size="sm"
                  className="bg-primary-500 hover:bg-primary-600 text-white"
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
        <div className="lg:hidden border-t border-neutral-800/50 bg-neutral-950/95">
          <div className="container mx-auto p-4 space-y-4">
            <form 
              onSubmit={handleSearch}
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full rounded-full bg-neutral-800/80 border border-neutral-700/70 text-neutral-200 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-500"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
            </form>
            
            {user ? (
              <>
                <Link 
                  to="/submit"
                  className="flex items-center p-2 hover:bg-neutral-800/70 rounded-md text-neutral-300"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <PlusCircle size={18} className="mr-2 text-primary-500" />
                  Create Post
                </Link>
                
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
                  className="text-white border-neutral-700 hover:bg-neutral-800/70"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => {
                    navigate("/register");
                    setShowMobileMenu(false);
                  }}
                  fullWidth
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};