import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';
import { voteService, postService } from '../api/services';

export default function PostCard({ postData, currentUserId, onVoteChange, onDelete }) {
  const { Post, votes } = postData;
  const [localVotes, setLocalVotes] = useState(votes);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleVote = async (dir) => {
    try {
      await voteService.vote(Post.id, dir);
      setLocalVotes((prev) => (dir === 1 ? prev + 1 : prev - 1));
      if (onVoteChange) onVoteChange();
    } catch (err) {
      if (err.response?.status === 409) {
        alert("You have already voted on this post!");
      } else {
        console.error("Failed to vote", err);
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      setIsDeleting(true);
      await postService.deletePost(Post.id);
      if (onDelete) onDelete(Post.id);
    } catch (err) {
      console.error("Failed to delete post", err);
      setIsDeleting(false);
      alert("Error deleting post.");
    }
  };

  const dateStr = new Date(Post.created_at).toLocaleDateString(undefined, { 
    month: 'short', day: 'numeric', year: 'numeric' 
  });

  return (
    <div className="card card-hover mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{Post.title}</h3>
        {currentUserId === Post.owner_id && (
          <button onClick={handleDelete} disabled={isDeleting} className="btn-icon" style={{ color: 'var(--accent-danger)' }}>
            <Trash2 size={18} />
          </button>
        )}
      </div>
      
      <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        {Post.content}
      </p>
      
      <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="flex items-center gap-2">
          <button onClick={() => handleVote(1)} className="btn-icon">
            <ThumbsUp size={18} />
          </button>
          <span style={{ fontWeight: 600, minWidth: '2ch', textAlign: 'center' }}>{localVotes}</span>
          <button onClick={() => handleVote(0)} className="btn-icon">
            <ThumbsDown size={18} />
          </button>
        </div>
        
        <div className="text-sm text-muted">
          By {Post.owner.email} • {dateStr}
        </div>
      </div>
    </div>
  );
}
