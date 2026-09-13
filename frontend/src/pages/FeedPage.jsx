import React, { useState, useEffect } from 'react';
import { postService } from '../api/services';
import PostCard from '../components/PostCard';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await postService.getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
      } else {
        setError('Failed to load posts.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }
    
    try {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.user_id);
    } catch (e) {
      navigate('/auth');
      return;
    }

    fetchPosts();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container text-center mt-4">
        <Loader2 className="animate-spin" size={32} style={{ color: 'var(--accent-primary)', margin: '0 auto' }} />
        <p className="mt-2 text-muted">Loading feed...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2>Your Feed</h2>
      </div>
      
      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {posts.length === 0 && !error ? (
        <div className="card text-center" style={{ padding: '3rem 1rem' }}>
          <p className="text-muted mb-4">No posts found. Be the first to post!</p>
          <button className="btn btn-primary" onClick={() => navigate('/create')}>Create Post</button>
        </div>
      ) : (
        posts.map((postData) => (
          <PostCard 
            key={postData.Post.id} 
            postData={postData} 
            currentUserId={currentUserId}
            onVoteChange={fetchPosts}
            onDelete={() => fetchPosts()}
          />
        ))
      )}
    </div>
  );
}
