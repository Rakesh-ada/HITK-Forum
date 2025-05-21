import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Flame, 
  Clock, 
  Filter, 
  Award,
  TrendingUp 
} from "lucide-react";
import { PostCard } from "../components/post/PostCard";
import { Button } from "../components/ui/Button";
import { dummyPosts } from "../data/dummyData";
import { Post } from "../types/Post";
import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top' | 'rising'>('hot');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch with a delay
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let sortedPosts = [...dummyPosts];
      
      switch (sortBy) {
        case 'hot':
          // Hot: Balance of upvotes and recency (popular overall)
          sortedPosts.sort((a, b) => {
            // Higher weight to upvotes but still consider recency
            const aHours = (Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60);
            const bHours = (Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60);
            
            // Score decreases as post gets older, but not as quickly as "rising"
            const aScore = a.upvotes / Math.pow(aHours + 2, 1.5);
            const bScore = b.upvotes / Math.pow(bHours + 2, 1.5);
            
            return bScore - aScore;
          });
          break;
        case 'new':
          // New: Purely chronological, newest first
          sortedPosts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'top':
          // Top: Simply the highest upvoted posts
          sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
          break;
        case 'rising':
          // Rising: Posts gaining momentum quickly (high upvotes relative to age)
          sortedPosts.sort((a, b) => {
            // Calculate post age in hours
            const aHours = (Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60);
            const bHours = (Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60);
            
            // Only consider posts from the last 24 hours with a minimum of upvotes
            const aIsRising = aHours <= 24 && a.upvotes >= 5;
            const bIsRising = bHours <= 24 && b.upvotes >= 5;
            
            // If both are rising or neither is rising, use upvotes per hour
            if (aIsRising === bIsRising) {
              const aRate = a.upvotes / (aHours || 0.5); // Avoid division by zero
              const bRate = b.upvotes / (bHours || 0.5);
              return bRate - aRate;
            }
            
            // Prioritize rising posts
            return aIsRising ? -1 : 1;
          });
          break;
      }
      
      setPosts(sortedPosts);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [sortBy]);
  
  return (
    <div>
      <div className="mb-4 flex flex-col space-y-4">
        {/* Sort options */}
        <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 p-3">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setSortBy('hot')}
              className={`flex items-center mr-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                sortBy === 'hot'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Flame size={16} className={`mr-1 ${sortBy === 'hot' ? 'text-orange-500' : ''}`} />
              Hot
            </button>
            
            <button
              onClick={() => setSortBy('new')}
              className={`flex items-center mr-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                sortBy === 'new'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Clock size={16} className={`mr-1 ${sortBy === 'new' ? 'text-green-500' : ''}`} />
              New
            </button>
            
            <button
              onClick={() => setSortBy('top')}
              className={`flex items-center mr-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                sortBy === 'top'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Award size={16} className={`mr-1 ${sortBy === 'top' ? 'text-yellow-500' : ''}`} />
              Top
            </button>
            
            <button
              onClick={() => setSortBy('rising')}
              className={`flex items-center mr-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                sortBy === 'rising'
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <TrendingUp size={16} className={`mr-1 ${sortBy === 'rising' ? 'text-purple-500' : ''}`} />
              Rising
            </button>
            
            {/* Filter button placeholder - in a real app this would trigger a filter menu */}
            <button className="flex items-center ml-auto px-3 py-1.5 rounded-full text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <Filter size={16} className="mr-1" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        // Loading state
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 p-4">
              <div className="animate-pulse flex">
                <div className="w-10 bg-neutral-200 dark:bg-neutral-700 mr-4"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};