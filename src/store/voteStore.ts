import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Vote {
  id: string;
  type: "post" | "comment";
  vote: 1 | -1 | 0;
}

interface VoteStore {
  votes: Vote[];
  getVote: (id: string, type: "post" | "comment") => 1 | -1 | 0;
  upvote: (id: string, type: "post" | "comment") => void;
  downvote: (id: string, type: "post" | "comment") => void;
  removeVote: (id: string, type: "post" | "comment") => void;
}

export const useVoteStore = create<VoteStore>()(
  persist(
    (set, get) => ({
      votes: [],
      
      getVote: (id, type) => {
        const vote = get().votes.find(v => v.id === id && v.type === type);
        return vote ? vote.vote : 0;
      },
      
      upvote: (id, type) => {
        const currentVote = get().getVote(id, type);
        
        if (currentVote === 1) {
          // If already upvoted, remove the vote
          get().removeVote(id, type);
        } else {
          // Otherwise add/update the vote
          set(state => ({
            votes: [
              ...state.votes.filter(v => !(v.id === id && v.type === type)),
              { id, type, vote: 1 }
            ]
          }));
        }
      },
      
      downvote: (id, type) => {
        const currentVote = get().getVote(id, type);
        
        if (currentVote === -1) {
          // If already downvoted, remove the vote
          get().removeVote(id, type);
        } else {
          // Otherwise add/update the vote
          set(state => ({
            votes: [
              ...state.votes.filter(v => !(v.id === id && v.type === type)),
              { id, type, vote: -1 }
            ]
          }));
        }
      },
      
      removeVote: (id, type) => {
        set(state => ({
          votes: state.votes.filter(v => !(v.id === id && v.type === type))
        }));
      }
    }),
    {
      name: "reddit-votes"
    }
  )
);