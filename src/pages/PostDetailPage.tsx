import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById, getPostComments, addComment } from "../data/dummyData";
import { CommentList } from "../components/post/CommentList";
import { PostContent } from "../components/post/PostContent";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { Comment } from "../types/Comment";

export const PostDetailPage = () => {
  const { postId, subreddit } = useParams<{ postId: string; subreddit: string }>();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch post and comments
  const post = postId ? getPostById(postId) : undefined;
  
  // Load comments when postId changes
  useEffect(() => {
    if (!postId) return;
    
    setIsLoading(true);
    
    // Get comments for this post
    const postComments = getPostComments(postId);
    setComments(postComments);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [postId]);
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !user || !postId || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Add comment using our storage service
      const newComment = addComment({
        postId,
        content: commentText,
        author: user.username,
        authorId: user.id,
        level: 0,
      });
      
      console.log("Comment added:", newComment);
      
      // Update the comments list with the new comment
      setComments(prevComments => [...prevComments, newComment]);
      
      // Clear the input
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!post && !isLoading) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Sorry, this post doesn't exist or has been removed.
        </p>
        <Link to={`/r/${subreddit}`}>
          <Button variant="secondary">Return to r/{subreddit}</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
          <div className="h-32 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          <div className="h-20 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        </div>
      ) : post ? (
        <div>
          <PostContent post={post} />
          
          {/* Comment input */}
          {user && (
            <div className="mt-4 bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700 p-4">
              <form onSubmit={handleSubmitComment}>
                <div className="mb-3">
                  <label htmlFor="comment" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Comment as <span className="text-blue-500">u/{user.username}</span>
                  </label>
                  <textarea
                    id="comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="What are your thoughts?"
                    className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-800 dark:text-neutral-200"
                    rows={4}
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={!commentText.trim() || isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Comment
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Comments */}
          <CommentList comments={comments} postId={post.id} />
        </div>
      ) : null}
    </div>
  );
};