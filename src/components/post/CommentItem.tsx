import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ChevronDown, ChevronUp, Reply } from "lucide-react";
import { Comment } from "../../types/Comment";
import { VoteButtons } from "./VoteButtons";
import { useVoteStore } from "../../store/voteStore";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { addComment } from "../../data/dummyData";

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  postId: string;
  allComments: Comment[];
  onReplyAdded?: (newComment: Comment) => void;
}

export const CommentItem = ({ 
  comment, 
  replies, 
  postId, 
  allComments,
  onReplyAdded 
}: CommentItemProps) => {
  const { user } = useAuth();
  const [showReplies, setShowReplies] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localReplies, setLocalReplies] = useState<Comment[]>(replies);
  
  const userVote = useVoteStore(state => state.getVote(comment.id, "comment"));
  const totalVotes = comment.upvotes - comment.downvotes + userVote;
  
  // Get nested replies for replies
  const getNestedReplies = (commentId: string) => {
    return allComments.filter(c => c.parentId === commentId);
  };
  
  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };
  
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replyText.trim() || !user || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Add reply using our storage service
      const newReply = addComment({
        postId,
        content: replyText,
        author: user.username,
        authorId: user.id,
        parentId: comment.id,
        level: comment.level + 1
      });
      
      console.log("Reply added:", newReply);
      
      // Add to local replies
      setLocalReplies(prev => [...prev, newReply]);
      
      // Notify parent component
      if (onReplyAdded) {
        onReplyAdded(newReply);
      }
      
      // Reset form
      setReplyText("");
      setShowReplyForm(false);
    } catch (error) {
      console.error("Error adding reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="comment-thread relative">
      <div className="comment-item flex">
        {/* Left sidebar with vote buttons */}
        <div className="flex flex-col mr-3">
          <VoteButtons
            id={comment.id}
            type="comment"
            votes={totalVotes}
            orientation="vertical"
            size="sm"
          />
          
          {/* Vertical line connecting to replies */}
          {localReplies.length > 0 && (
            <div className="w-px bg-neutral-200 dark:bg-neutral-700 ml-2 flex-grow mt-2"/>
          )}
        </div>
        
        {/* Comment content */}
        <div className="flex-1">
          {/* Comment metadata */}
          <div className="flex items-center text-xs text-neutral-500 mb-1">
            <Link 
              to={`/user/${comment.author}`}
              className="font-medium text-neutral-700 dark:text-neutral-300 hover:underline mr-2"
            >
              u/{comment.author}
            </Link>
            <span className="text-neutral-400 dark:text-neutral-500">
              {formatDistanceToNow(new Date(comment.createdAt))} ago
            </span>
          </div>
          
          {/* Comment text */}
          <div className="text-sm text-neutral-800 dark:text-neutral-200 mb-2">
            {comment.content}
          </div>
          
          {/* Comment actions */}
          <div className="flex items-center text-xs space-x-2 mb-2">
            {user && (
              <button
                className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <Reply size={12} className="mr-1" />
                Reply
              </button>
            )}
            
            {localReplies.length > 0 && (
              <button
                className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center"
                onClick={toggleReplies}
              >
                {showReplies ? (
                  <>
                    <ChevronUp size={12} className="mr-1" />
                    Hide replies
                  </>
                ) : (
                  <>
                    <ChevronDown size={12} className="mr-1" />
                    Show {localReplies.length} {localReplies.length === 1 ? 'reply' : 'replies'}
                  </>
                )}
              </button>
            )}
          </div>
          
          {/* Reply form */}
          {showReplyForm && (
            <div className="mb-3 bg-neutral-50 dark:bg-neutral-850 p-2 rounded-md">
              <form onSubmit={handleSubmitReply}>
                <textarea
                  placeholder="What are your thoughts?"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-800 dark:text-neutral-200"
                  rows={3}
                  disabled={isSubmitting}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    type="button"
                    onClick={() => setShowReplyForm(false)}
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    size="sm"
                    variant="secondary"
                    isLoading={isSubmitting}
                    disabled={!replyText.trim()}
                  >
                    Reply
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Nested replies */}
          {localReplies.length > 0 && showReplies && (
            <div className="mt-2 space-y-4">
              {localReplies.map(reply => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  replies={getNestedReplies(reply.id)}
                  postId={postId}
                  allComments={allComments}
                  onReplyAdded={onReplyAdded}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};