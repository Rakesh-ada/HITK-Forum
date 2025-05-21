import { Link } from "react-router-dom";
import { Home, TrendingUp, Star } from "lucide-react";
import { Button } from "../ui/Button";

export const Sidebar = () => {
  return (
    <aside className="w-64 hidden md:block flex-shrink-0 pr-4 sticky top-20 self-start h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="space-y-4">
        <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <nav className="py-2">
            <Link to="/" className="flex items-center px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <Home size={18} className="mr-2 text-secondary-500" />
              Home
            </Link>
            <Link to="/trending" className="flex items-center px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <TrendingUp size={18} className="mr-2 text-primary-500" />
              Trending
            </Link>
            <Link to="/favorites" className="flex items-center px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <Star size={18} className="mr-2 text-secondary-500" />
              Favorites
            </Link>
          </nav>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 p-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
            Join the HITK community to share and discuss with fellow students.
          </p>
          <Link to="/register">
            <Button fullWidth>Join Now</Button>
          </Link>
        </div>
        
        <div className="text-xs text-neutral-500 px-4">
          <p>© 2025 HITK Forum. All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
};