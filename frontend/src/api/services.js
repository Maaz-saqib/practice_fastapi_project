import client from './client';

export const authService = {
  login: async (email, password) => {
    // FastAPI's OAuth2PasswordRequestForm requires form data
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await client.post('/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  },
  
  register: async (email, password) => {
    const response = await client.post('/users/', { email, password });
    return response.data;
  }
};

export const postService = {
  getPosts: async (limit = 100, skip = 0, search = '') => {
    const response = await client.get(`/posts/?limit=${limit}&skip=${skip}&search=${search}`);
    return response.data;
  },
  
  getPost: async (id) => {
    const response = await client.get(`/posts/${id}`);
    return response.data;
  },
  
  createPost: async (title, content, published = true) => {
    const response = await client.post('/posts/', { title, content, published });
    return response.data;
  },
  
  updatePost: async (id, title, content, published = true) => {
    const response = await client.put(`/posts/${id}`, { title, content, published });
    return response.data;
  },
  
  deletePost: async (id) => {
    const response = await client.delete(`/posts/${id}`);
    return response.data;
  }
};

export const voteService = {
  vote: async (post_id, dir) => {
    const response = await client.post('/vote/', { post_id, dir });
    return response.data;
  }
};
