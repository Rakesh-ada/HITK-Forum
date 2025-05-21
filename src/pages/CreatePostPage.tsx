import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Link as LinkIcon, Image, FileText, AlertTriangle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { dummySubreddits } from "../data/dummyData";

export const CreatePostPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [postType, setPostType] = useState<"text" | "link" | "image">("text");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    
    if (!subreddit) {
      setError("Please select a community");
      return;
    }
    
    if (postType === "text" && !content.trim()) {
      setError("Post content is required");
      return;
    }
    
    if (postType === "link" && !linkUrl.trim()) {
      setError("Link URL is required");
      return;
    }
    
    if (postType === "image" && !imageUrl.trim()) {
      setError("Image URL is required");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      // In a real app, we would handle the API call to create the post
      console.log("Creating post:", {
        title,
        content,
        subreddit,
        postType,
        imageUrl: postType === "image" ? imageUrl : undefined,
        linkUrl: postType === "link" ? linkUrl : undefined,
        author: user?.username,
      });
      
      // Navigate to the subreddit page
      navigate(`/r/${subreddit}`);
    }, 1500);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Main post form */}
        <div className="flex-1">
          <div className="bg-neutral-900 rounded-lg shadow-lg border border-neutral-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-800">
              <h1 className="text-xl font-bold text-white">Create a post</h1>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-900/30 text-red-400 rounded-md text-sm border border-red-800/50">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Select community */}
                <div>
                  <label htmlFor="subreddit" className="block text-sm font-medium mb-2 text-neutral-300">
                    Community
                  </label>
                  <div className="relative">
                    <select
                      id="subreddit"
                      value={subreddit}
                      onChange={(e) => setSubreddit(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-700 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                      required
                    >
                      <option value="">Select a community</option>
                      {dummySubreddits.map((sub) => (
                        <option key={sub.id} value={sub.name}>
                          r/{sub.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Post type tabs */}
                <div className="flex border-b border-neutral-700">
                  <button
                    type="button"
                    onClick={() => setPostType("text")}
                    className={`flex items-center py-3 px-6 ${
                      postType === "text"
                        ? "border-b-2 border-primary-500 text-primary-500"
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    <FileText size={18} className="mr-2" />
                    Post
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPostType("image")}
                    className={`flex items-center py-3 px-6 ${
                      postType === "image"
                        ? "border-b-2 border-primary-500 text-primary-500"
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    <Image size={18} className="mr-2" />
                    Image
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPostType("link")}
                    className={`flex items-center py-3 px-6 ${
                      postType === "link"
                        ? "border-b-2 border-primary-500 text-primary-500"
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    <LinkIcon size={18} className="mr-2" />
                    Link
                  </button>
                </div>
                
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2 text-neutral-300">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-700 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-neutral-500"
                    placeholder="Title"
                    maxLength={300}
                    required
                  />
                  <div className="text-xs text-neutral-500 mt-2 text-right">
                    {title.length}/300
                  </div>
                </div>
                
                {/* Content based on post type */}
                {postType === "text" && (
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-2 text-neutral-300">
                      Text (optional)
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-700 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-neutral-500"
                      placeholder="Text (optional)"
                      rows={8}
                    />
                  </div>
                )}
                
                {postType === "image" && (
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium mb-2 text-neutral-300">
                      Image URL
                    </label>
                    <input
                      id="imageUrl"
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-700 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-neutral-500"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    
                    {imageUrl && (
                      <div className="mt-3 p-3 border border-neutral-700 rounded-md bg-neutral-800">
                        <img 
                          src={imageUrl} 
                          alt="Preview" 
                          className="max-h-64 mx-auto object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {postType === "link" && (
                  <div>
                    <label htmlFor="linkUrl" className="block text-sm font-medium mb-2 text-neutral-300">
                      URL
                    </label>
                    <input
                      id="linkUrl"
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-700 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-neutral-500"
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                )}
                
                <div className="pt-4 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="bg-transparent border-neutral-600 text-neutral-300 hover:bg-neutral-800"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="bg-primary-500 hover:bg-primary-600 text-white"
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Posting Guidelines - Right Side */}
        <div className="md:w-72 lg:w-80 h-fit">
          <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden sticky top-20">
            <div className="px-5 py-4">
              <h2 className="font-medium text-base text-neutral-200 flex items-center">
                <AlertTriangle size={16} className="mr-2 text-primary-500" />
                Posting Guidelines
              </h2>
            </div>
            <div className="px-5 pt-2 pb-5">
              <ol className="text-sm text-neutral-400 space-y-4 list-decimal list-outside ml-5">
                <li className="pl-1">
                  <span className="text-neutral-200">Remember the human</span> - be respectful and considerate
                </li>
                <li className="pl-1">
                  <span className="text-neutral-200">Behave like you would</span> in real life
                </li>
                <li className="pl-1">
                  <span className="text-neutral-200">Look for the original source</span> of content
                </li>
                <li className="pl-1">
                  <span className="text-neutral-200">Search for duplicates</span> before posting
                </li>
                <li className="pl-1">
                  <span className="text-neutral-200">Read the community's rules</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};