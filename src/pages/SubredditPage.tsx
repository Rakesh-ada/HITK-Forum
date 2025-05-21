import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  Flame, 
  TrendingUp, 
  Clock, 
  Award,
  Bell,
  PlusCircle 
} from "lucide-react";
import { PostCard } from "../components/post/PostCard";
import { Button } from "../components/ui/Button";
import { getSubredditByName, getSubredditPosts } from "../data/dummyData";
import { useAuth } from "../hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

export const SubredditPage = () => {
  const { subreddit } = useParams<{ subreddit: string }>();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top' | 'rising'>('hot');
  const [joined, setJoined] = useState(false);
  
  // Fetch subreddit data
  const subredditData = subreddit ? getSubredditByName(subreddit) : undefined;
  const posts = subreddit ? getSubredditPosts(subreddit) : [];

  useEffect(() => {
    // Simulate loading state
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [subreddit]);
  
  // Sort posts based on selected sorting method
  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'hot':
        // Sort by a combination of upvotes and recency
        const aScore = (a.upvotes - a.downvotes) / (1 + Date.now() - new Date(a.createdAt).getTime());
        const bScore = (b.upvotes - b.downvotes) / (1 + Date.now() - new Date(b.createdAt).getTime());
        return bScore - aScore;
      case 'new':
        // Sort by creation date, newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'top':
        // Sort by total upvotes
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      case 'rising':
        // Sort by recent upvotes (you'd likely use a separate metric in a real app)
        return (b.upvotes / Math.max(1, b.downvotes)) - (a.upvotes / Math.max(1, a.downvotes));
      default:
        return 0;
    }
  });
  
  if (!subredditData && !isLoading) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Subreddit Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Sorry, the subreddit r/{subreddit} doesn't exist or has been removed.
        </p>
        <Link to="/">
          <Button variant="secondary">Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-32 bg-neutral-200 dark:bg-neutral-700 rounded-t-md mb-4"></div>
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-4"></div>
        </div>
      ) : subredditData ? (
        <>
          {/* Subreddit banner */}
          {subredditData.bannerUrl && (
            <div className="relative h-32 -mx-4 mb-4">
              <img 
                src={subredditData.bannerUrl}
                alt={`${subredditData.displayName} banner`}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute bottom-3 left-4 flex items-center">
                {subredditData.iconUrl ? (
                  <img 
                    src={subredditData.iconUrl}
                    alt={subredditData.displayName} 
                    className="w-16 h-16 rounded-full border-4 border-white dark:border-neutral-800"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-neutral-800">
                    {subredditData.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div className="ml-4 text-white">
                  <h1 className="text-xl font-bold">{subredditData.displayName}</h1>
                  <p className="text-sm opacity-90">r/{subredditData.name}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              {/* Sort options */}
              <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 p-3 mb-4">
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
                </div>
              </div>
              
              {/* Create post card */}
              {user && (
                <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm p-3 border border-neutral-200 dark:border-neutral-700 mb-4">
                  <Link to="/submit" className="flex items-center">
                    <img 
                      src={user.avatarUrl}
                      alt={user.username}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div className="flex-1 bg-neutral-100 dark:bg-neutral-700 rounded-full px-4 py-2 text-neutral-500 dark:text-neutral-400 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
                      Create Post
                    </div>
                    <PlusCircle size={20} className="ml-2 text-neutral-400" />
                  </Link>
                </div>
              )}
              
              {/* Posts */}
              {sortedPosts.length > 0 ? (
                <div className="space-y-4">
                  {sortedPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm p-8 border border-neutral-200 dark:border-neutral-700 text-center">
                  <h2 className="text-lg font-semibold mb-2">No Posts Yet</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Be the first to post in r/{subredditData.name}
                  </p>
                  <Link to="/submit">
                    <Button>Create Post</Button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="md:w-72 space-y-4">
              {/* About community */}
              <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-850 border-b border-neutral-200 dark:border-neutral-700">
                  <h2 className="font-medium">About Community</h2>
                </div>
                
                <div className="p-4">
                  <p className="text-sm mb-4">{subredditData.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <Users size={16} className="text-neutral-500 mr-2" />
                    <div>
                      <div className="font-semibold">{subredditData.subscribers.toLocaleString()}</div>
                      <div className="text-xs text-neutral-500">Members</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Calendar size={16} className="text-neutral-500 mr-2" />
                    <div>
                      <div className="font-semibold">
                        {formatDistanceToNow(new Date(subredditData.createdAt))}
                      </div>
                      <div className="text-xs text-neutral-500">Created {new Date(subredditData.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  {user && (
                    <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                      {joined ? (
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="ghost" 
                            fullWidth 
                            onClick={() => setJoined(false)}
                          >
                            Leave
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            className="flex items-center justify-center"
                          >
                            <Bell size={16} className="mr-1" />
                            Joined
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          fullWidth 
                          onClick={() => setJoined(true)}
                        >
                          Join
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Community rules */}
              <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-850 border-b border-neutral-200 dark:border-neutral-700">
                  <h2 className="font-medium">r/{subredditData.name} Rules</h2>
                </div>
                
                <div className="p-4">
                  <ol className="list-decimal list-inside text-sm space-y-2">
                    <li>Be respectful to others</li>
                    <li>No spam or self-promotion</li>
                    <li>Use descriptive, accurate titles</li>
                    <li>Mark NSFW content appropriately</li>
                    <li>Follow Reddit's content policy</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};