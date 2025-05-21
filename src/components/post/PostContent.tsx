import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { Post } from "../../types/Post";
import { VoteButtons } from "./VoteButtons";
import { useVoteStore } from "../../store/voteStore";
import { ArrowUpRight, BookmarkPlus, Share2, Flag } from "lucide-react";

interface PostContentProps {
  post: Post;
}

export const PostContent = ({ post }: PostContentProps) => {
  const userVote = useVoteStore(state => state.getVote(post.id, "post"));
  const totalVotes = post.upvotes - post.downvotes + userVote;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="flex">
        {/* Vote column */}
        <div className="w-12 flex-shrink-0 bg-neutral-50 dark:bg-neutral-850 flex flex-col items-center py-3">
          <VoteButtons
            id={post.id}
            type="post"
            votes={totalVotes}
            orientation="vertical"
          />
        </div>

        {/* Post content */}
        <div className="flex-1 p-4">
          {/* Post header */}
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
          <h1 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
            {post.title}
          </h1>

          {/* Post content */}
          <div className="mb-4">
            {post.imageUrl ? (
              <div className="mb-4">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full rounded-md"
                />
              </div>
            ) : null}
            
            {post.link ? (
              <div className="mb-4">
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-blue-500 hover:underline"
                >
                  <ArrowUpRight size={16} className="mr-1" />
                  {post.link}
                </a>
              </div>
            ) : null}
            
            <div className="text-neutral-800 dark:text-neutral-200 whitespace-pre-line">
              {post.content}
            </div>
          </div>

          {/* Post actions */}
          <div className="flex items-center text-xs text-neutral-500 pt-2 border-t border-neutral-200 dark:border-neutral-700">
            <div className="mr-4 flex items-center">
              <span>
                {post.commentCount} {post.commentCount === 1 ? "comment" : "comments"}
              </span>
            </div>
            
            <button className="mr-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              <Share2 size={16} />
            </button>
            
            <button className="mr-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              <BookmarkPlus size={16} />
            </button>
            
            <button className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              <Flag size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};