import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../../types/Post";
import { useVoteStore } from "../../store/voteStore";
import { VoteButtons } from "./VoteButtons";
import { ArrowUpRight, MessageSquare, BookmarkCheck, Share2 } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const userVote = useVoteStore(state => state.getVote(post.id, "post"));
  const totalVotes = post.upvotes - post.downvotes + userVote;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-neutral-100 dark:border-neutral-800">
      <div className="flex">
        {/* Vote buttons */}
        <div className="w-12 flex-shrink-0 bg-neutral-50 dark:bg-neutral-800 flex flex-col items-center py-3 border-r border-neutral-100 dark:border-neutral-800">
          <VoteButtons
            id={post.id}
            type="post"
            votes={totalVotes}
            orientation="vertical"
          />
        </div>

        {/* Post content */}
        <div className="flex-1 p-4">
          {/* Post metadata */}
          <div className="flex items-center text-xs text-neutral-500 mb-2">
            <Link 
              to={`/r/${post.subreddit}`}
              className="font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 mr-2"
            >
              r/{post.subreddit}
            </Link>
            <span className="mr-2">•</span>
            <span className="mr-2">
              Posted by{" "}
              <Link 
                to={`/user/${post.author}`}
                className="hover:underline text-neutral-600 dark:text-neutral-400"
              >
                u/{post.author}
              </Link>
            </span>
            <span className="mr-2">•</span>
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          </div>

          {/* Post title */}
          <Link to={`/r/${post.subreddit}/comments/${post.id}`}>
            <h2 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
              {post.title}
            </h2>
          </Link>

          {/* Post content - truncated for card view */}
          <div className="mb-4">
            {post.imageUrl ? (
              <div className="relative overflow-hidden max-h-96 rounded-lg mb-3">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full object-cover transform hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ) : post.link ? (
              <div className="flex items-center text-blue-500 text-sm p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <ArrowUpRight size={16} className="mr-2 flex-shrink-0" />
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline truncate"
                >
                  {post.link}
                </a>
              </div>
            ) : (
              <p className="text-neutral-700 dark:text-neutral-300 text-sm line-clamp-3 bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-lg">
                {post.content}
              </p>
            )}
          </div>

          {/* Post actions */}
          <div className="flex items-center text-xs text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <Link 
              to={`/r/${post.subreddit}/comments/${post.id}`}
              className="flex items-center mr-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <MessageSquare size={14} className="mr-2" />
              <span>{post.commentCount} comments</span>
            </Link>
            <button className="flex items-center mr-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-lg transition-colors duration-200">
              <BookmarkCheck size={14} className="mr-2" />
              <span>Save</span>
            </button>
            <button className="flex items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-lg transition-colors duration-200">
              <Share2 size={14} className="mr-2" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};