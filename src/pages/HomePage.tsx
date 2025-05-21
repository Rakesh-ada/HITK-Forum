import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Flame, 
  TrendingUp, 
  Clock, 
  Filter, 
  ArrowUpDown, 
  Award
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
          // Sort by a combination of upvotes and recency
          sortedPosts.sort((a, b) => {
            const aScore = (a.upvotes - a.downvotes) / (1 + Date.now() - new Date(a.createdAt).getTime());
            const bScore = (b.upvotes - b.downvotes) / (1 + Date.now() - new Date(b.createdAt).getTime());
            return bScore - aScore;
          });
          break;
        case 'new':
          // Sort by creation date, newest first
          sortedPosts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'top':
          // Sort by total upvotes
          sortedPosts.sort((a, b) => 
            (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
          );
          break;
        case 'rising':
          // Sort by recent upvotes (you'd likely use a separate metric in a real app)
          sortedPosts.sort((a, b) => 
            (b.upvotes / Math.max(1, b.downvotes)) - 
            (a.upvotes / Math.max(1, a.downvotes))
          );
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