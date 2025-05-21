import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../../types/Post";
import { useVoteStore } from "../../store/voteStore";
import { VoteButtons } from "./VoteButtons";
import { ArrowUpRight, MessageSquare, BookmarkCheck } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const userVote = useVoteStore(state => state.getVote(post.id, "post"));
  const totalVotes = post.upvotes - post.downvotes + userVote;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-neutral-200 dark:border-neutral-700">
      <div className="flex">
        {/* Vote buttons */}
        <div className="w-10 flex-shrink-0 bg-neutral-50 dark:bg-neutral-850 flex flex-col items-center py-2">
          <VoteButtons
            id={post.id}
            type="post"
            votes={totalVotes}
            orientation="vertical"
          />
        </div>

        {/* Post content */}
        <div className="flex-1 p-3">
          {/* Post metadata */}
          <div className="flex items-center text-xs text-neutral-500 mb-2">
            <Link 
              to={`/r/${post.subreddit}`}
              className="font-medium text-blue-500 hover:underline mr-2"
            >
              r/{post.subreddit}
            </Link>
            <span className="mr-2">•</span>
            <span className="mr-2">
              Posted by{" "}
              <Link 
                to={`/user/${post.author}`}
                className="hover:underline"
              >
                u/{post.author}
              </Link>
            </span>
            <span className="mr-2">•</span>
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          </div>

          {/* Post title */}
          <Link to={`/r/${post.subreddit}/comments/${post.id}`}>
            <h2 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-100">
              {post.title}
            </h2>
          </Link>

          {/* Post content - truncated for card view */}
          <div className="mb-3">
            {post.imageUrl ? (
              <div className="relative overflow-hidden max-h-96">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : post.link ? (
              <div className="flex items-center text-blue-500 text-sm">
                <ArrowUpRight size={16} className="mr-1" />
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
              <p className="text-neutral-700 dark:text-neutral-300 text-sm line-clamp-3">
                {post.content}
              </p>
            )}
          </div>

          {/* Post actions */}
          <div className="flex items-center text-xs text-neutral-500">
            <Link 
              to={`/r/${post.subreddit}/comments/${post.id}`}
              className="flex items-center mr-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-2 py-1 rounded-full transition-colors duration-200"
            >
              <MessageSquare size={14} className="mr-1" />
              <span>{post.commentCount} comments</span>
            </Link>
            <button className="flex items-center mr-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-2 py-1 rounded-full transition-colors duration-200">
              <BookmarkCheck size={14} className="mr-1" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};