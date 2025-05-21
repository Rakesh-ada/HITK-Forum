import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dummyUsers, dummyPosts, dummyComments } from '../data/dummyData';
import { Post as PostType } from '../types/Post';
import { Comment as CommentType } from '../types/Comment';
import { PostCard } from '../components/post/PostCard';
import { Button } from '../components/ui/Button';
import { formatDistanceToNow } from 'date-fns';
import { User as UserIcon, Calendar, MessageSquare, Eye } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'about'>('posts');
  
  // Find the user profile
  const userProfile = dummyUsers.find(user => user.username === username);
  
  // Get posts by this user
  const userPosts = dummyPosts.filter(post => post.author === username);
  
  // Get comments by this user
  const userComments = dummyComments.filter(comment => comment.author === username);
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [username]);
  
  const isOwnProfile = currentUser?.username === username;
  
  if (!userProfile && !isLoading) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Sorry, the user u/{username} doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate(-1)} variant="secondary">
          Go Back
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-40 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
          <div className="h-32 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        </div>
      ) : userProfile ? (
        <div>
          {/* User profile header */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden mb-4">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            
            <div className="relative px-6 pb-4">
              <div className="flex items-end absolute -top-12">
                <img 
                  src={userProfile.avatarUrl} 
                  alt={userProfile.username}
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-neutral-800"
                />
              </div>
              
              <div className="pt-16 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">u/{userProfile.username}</h1>
                  
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center mt-1">
                    <Calendar size={14} className="mr-1" />
                    Account created {formatDistanceToNow(new Date(userProfile.createdAt))} ago
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center">
                      <MessageSquare size={14} className="mr-1 text-neutral-500" />
                      <span className="text-sm">
                        {userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Eye size={14} className="mr-1 text-neutral-500" />
                      <span className="text-sm">
                        {userProfile.karma.toLocaleString()} karma
                      </span>
                    </div>
                  </div>
                </div>
                
                {isOwnProfile ? (
                  <Button variant="outline">Edit Profile</Button>
                ) : (
                  <Button>Follow</Button>
                )}
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 px-4">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`py-3 px-4 font-medium text-sm border-b-2 ${
                    activeTab === 'posts'
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  Posts
                </button>
                
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`py-3 px-4 font-medium text-sm border-b-2 ${
                    activeTab === 'comments'
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  Comments
                </button>
                
                <button
                  onClick={() => setActiveTab('about')}
                  className={`py-3 px-4 font-medium text-sm border-b-2 ${
                    activeTab === 'about'
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  About
                </button>
              </div>
            </div>
          </div>
          
          {/* Content based on active tab */}
          <div>
            {activeTab === 'posts' && (
              <div className="space-y-4">
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm p-8 border border-neutral-200 dark:border-neutral-700 text-center">
                    <UserIcon size={48} className="mx-auto mb-4 text-neutral-400" />
                    <h2 className="text-lg font-semibold mb-2">No Posts Yet</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      u/{userProfile.username} hasn't made any posts yet
                    </p>
                    {isOwnProfile && (
                      <Link to="/submit">
                        <Button>Create Post</Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'comments' && (
              <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700">
                {userComments.length > 0 ? (
                  <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {userComments.map(comment => {
                      const commentPost = dummyPosts.find(post => post.id === comment.postId);
                      
                      return (
                        <div key={comment.id} className="p-4">
                          <div className="text-xs text-neutral-500 mb-1">
                            <Link 
                              to={`/r/${commentPost?.subreddit}/comments/${comment.postId}`}
                              className="hover:underline"
                            >
                              {commentPost ? `${userProfile.username} commented on ${commentPost.title}` : 'Deleted Post'}
                            </Link>
                            <span className="mx-1">•</span>
                            <span>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                          </div>
                          <p className="text-neutral-800 dark:text-neutral-200 text-sm">{comment.content}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <MessageSquare size={48} className="mx-auto mb-4 text-neutral-400" />
                    <h2 className="text-lg font-semibold mb-2">No Comments Yet</h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      u/{userProfile.username} hasn't made any comments yet
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'about' && (
              <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Trophy Case</h3>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-white font-bold">1Y</span>
                        </div>
                        <span className="text-xs">One Year Club</span>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-white font-bold">V</span>
                        </div>
                        <span className="text-xs">Verified Email</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Karma Breakdown</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-neutral-50 dark:bg-neutral-850 p-3 rounded-md">
                        <div className="text-sm font-medium">Post Karma</div>
                        <div className="text-lg font-bold">{Math.floor(userProfile.karma * 0.7).toLocaleString()}</div>
                      </div>
                      
                      <div className="bg-neutral-50 dark:bg-neutral-850 p-3 rounded-md">
                        <div className="text-sm font-medium">Comment Karma</div>
                        <div className="text-lg font-bold">{Math.floor(userProfile.karma * 0.3).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};