import { Link } from "react-router-dom";
import { Home, TrendingUp, Star, Users, Hash } from "lucide-react";
import { Button } from "../ui/Button";
import { dummySubreddits } from "../../data/dummyData";

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
        
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="font-medium flex items-center text-neutral-800 dark:text-neutral-200">
              <Users size={16} className="mr-2 text-primary-500" />
              Communities
            </h2>
          </div>
          
          <div className="py-2 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
            {dummySubreddits.map((community) => (
              <Link 
                key={community.id}
                to={`/r/${community.name}`} 
                className="flex items-center px-4 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                {community.iconUrl ? (
                  <img 
                    src={community.iconUrl} 
                    alt={community.displayName}
                    className="w-6 h-6 rounded-full mr-2.5 object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2.5 border border-blue-400">
                    {community.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>r/{community.name}</span>
                <span className="ml-auto text-xs text-neutral-500">{formatSubscriberCount(community.subscribers)}</span>
          </Link>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-neutral-500 px-4">
          <p>© 2025 HITK Forum. All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
};

// Helper function to format subscriber counts
const formatSubscriberCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}m`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};