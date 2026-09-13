import React, { useState } from 'react';
import { postService } from '../api/services';
import { useNavigate } from 'react-router-dom';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await postService.createPost(title, content, true);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="mb-6">Create New Post</h2>
        
        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required 
              placeholder="Give your post a catchy title"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea 
              className="form-input form-textarea" 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              required 
              placeholder="What's on your mind?"
            ></textarea>
          </div>
          
          <div className="flex gap-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
