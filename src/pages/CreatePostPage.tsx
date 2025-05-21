import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Link, Image, FileText } from "lucide-react";
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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h1 className="text-xl font-bold">Create a post</h1>
        </div>
        
        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select community */}
            <div>
              <label htmlFor="subreddit" className="block text-sm font-medium mb-1">
                Community
              </label>
              <select
                id="subreddit"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a community</option>
                {dummySubreddits.map((sub) => (
                  <option key={sub.id} value={sub.name}>
                    r/{sub.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Post type tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => setPostType("text")}
                className={`flex items-center py-2 px-4 ${
                  postType === "text"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <FileText size={18} className="mr-2" />
                Post
              </button>
              
              <button
                type="button"
                onClick={() => setPostType("image")}
                className={`flex items-center py-2 px-4 ${
                  postType === "image"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <Image size={18} className="mr-2" />
                Image
              </button>
              
              <button
                type="button"
                onClick={() => setPostType("link")}
                className={`flex items-center py-2 px-4 ${
                  postType === "link"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <Link size={18} className="mr-2" />
                Link
              </button>
            </div>
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Title"
                maxLength={300}
                required
              />
              <div className="text-xs text-neutral-500 mt-1">
                {title.length}/300
              </div>
            </div>
            
            {/* Content based on post type */}
            {postType === "text" && (
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Text (optional)
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Text (optional)"
                  rows={6}
                />
              </div>
            )}
            
            {postType === "image" && (
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                
                {imageUrl && (
                  <div className="mt-2 p-2 border border-neutral-300 dark:border-neutral-700 rounded-md">
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
                <label htmlFor="linkUrl" className="block text-sm font-medium mb-1">
                  URL
                </label>
                <input
                  id="linkUrl"
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                  required
                />
              </div>
            )}
            
            <div className="pt-4 flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                Post
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-sm font-medium mb-3">Posting to Reddit</h2>
        <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
          <li>1. Remember the human</li>
          <li>2. Behave like you would in real life</li>
          <li>3. Look for the original source of content</li>
          <li>4. Search for duplicates before posting</li>
          <li>5. Read the community's rules</li>
        </ul>
      </div>
    </div>
  );
};