import { useState, useEffect } from "react";
import { Comment } from "../../types/Comment";
import { CommentItem } from "./CommentItem";
import { Button } from "../ui/Button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CommentListProps {
  comments: Comment[];
  postId: string;
}

export const CommentList = ({ comments, postId }: CommentListProps) => {
  const [sortBy, setSortBy] = useState<'best' | 'new' | 'controversial' | 'old'>('best');
  const [loadAll, setLoadAll] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  
  // Update local comments when props change
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);
  
  // Get top-level comments (no parentId)
  const topLevelComments = localComments.filter(comment => !comment.parentId);
  
  // Get replies for a specific comment
  const getReplies = (commentId: string) => {
    return localComments.filter(comment => comment.parentId === commentId);
  };
  
  // Handle newly added comment or reply
  const handleCommentAdded = (newComment: Comment) => {
    setLocalComments(prev => [...prev, newComment]);
  };
  
  // Sort comments based on selected sort method
  const sortedComments = [...topLevelComments].sort((a, b) => {
    switch (sortBy) {
      case 'best':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      case 'new':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'controversial':
        // Higher ratio of downvotes to total votes indicates more controversial
        const aRatio = a.downvotes / (a.upvotes + a.downvotes);
        const bRatio = b.downvotes / (b.upvotes + b.downvotes);
        return bRatio - aRatio;
      case 'old':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });
  
  // Display all comments or just the top ones initially
  const displayedComments = loadAll ? sortedComments : sortedComments.slice(0, 5);
  
  return (
    <div className="mt-4">
      <div className="flex items-center mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <span className="text-sm font-medium mr-2">Sort by:</span>
        <div className="flex space-x-2">
          {(['best', 'new', 'controversial', 'old'] as const).map((option) => (
            <button
              key={option}
              className={`text-xs px-2 py-1 rounded-full ${
                sortBy === option
                  ? 'bg-neutral-200 dark:bg-neutral-700 font-medium'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              onClick={() => setSortBy(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {displayedComments.length > 0 ? (
        <div className="space-y-4">
          {displayedComments.map(comment => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              replies={getReplies(comment.id)} 
              postId={postId}
              allComments={localComments}
              onReplyAdded={handleCommentAdded}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-neutral-500 dark:text-neutral-400">No comments yet. Be the first to comment!</p>
        </div>
      )}
      
      {sortedComments.length > 5 && !loadAll && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setLoadAll(true)}
            className="inline-flex items-center"
          >
            <ChevronDown size={16} className="mr-1" />
            Load more comments ({sortedComments.length - 5} more)
          </Button>
        </div>
      )}
      
      {loadAll && sortedComments.length > 5 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setLoadAll(false)}
            className="inline-flex items-center"
          >
            <ChevronUp size={16} className="mr-1" />
            Collapse comments
          </Button>
        </div>
      )}
    </div>
  );
};