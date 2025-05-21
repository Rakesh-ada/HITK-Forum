import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { useVoteStore } from "../../store/voteStore";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";

interface VoteButtonsProps {
  id: string;
  type: "post" | "comment";
  votes: number;
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md";
}

export const VoteButtons = ({ 
  id, 
  type, 
  votes, 
  orientation = "vertical",
  size = "md"
}: VoteButtonsProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getVote, upvote, downvote } = useVoteStore();
  const userVote = getVote(id, type);
  
  const handleVote = (voteFunc: () => void) => {
    if (!user) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }
    voteFunc();
  };
  
  const containerClass = clsx(
    "flex items-center",
    orientation === "vertical" ? "flex-col" : "flex-row"
  );
  
  const iconSize = size === "sm" ? 16 : 20;
  
  const voteClass = (voteValue: 1 | -1) => clsx(
    "transition-colors duration-200 hover:text-neutral-400",
    userVote === voteValue ? 
      (voteValue === 1 ? "text-primary-500" : "text-secondary-500") : 
      "text-neutral-400 dark:text-neutral-500"
  );
  
  const voteCountClass = clsx(
    "font-semibold",
    userVote === 1 ? "text-primary-500" : 
    userVote === -1 ? "text-secondary-500" : 
    "text-neutral-700 dark:text-neutral-300"
  );
  
  return (
    <div className={containerClass}>
      <button 
        onClick={() => handleVote(() => upvote(id, type))}
        aria-label="Upvote"
        className={voteClass(1)}
      >
        <ArrowBigUp size={iconSize} />
      </button>
      
      <span className={clsx(
        voteCountClass,
        orientation === "vertical" ? "my-1" : "mx-2",
        size === "sm" ? "text-xs" : "text-sm"
      )}>
        {votes}
      </span>
      
      <button 
        onClick={() => handleVote(() => downvote(id, type))}
        aria-label="Downvote"
        className={voteClass(-1)}
      >
        <ArrowBigDown size={iconSize} />
      </button>
    </div>
  );
};