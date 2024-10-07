import React, { useEffect, useState } from 'react';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Simulación de la obtención de publicaciones desde un backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/posts');
        const data = await response.json();
        setPosts(data.posts); // Asume que el backend retorna un objeto con un array `posts`
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      {posts.map(post => (
        <div key={post._id} className="post">
          <div className="post-header">
            <img src={post.user.profilePicture} alt="User profile" className="profile-picture" />
            <p className="username">{post.user.username}</p>
          </div>
          <img src={post.image} alt="Post content" className="post-image" />
          <div className="post-actions">
            <button className="like-button">❤️ Like</button>
            <button className="comment-button">💬 Comment</button>
          </div>
          <p className="post-caption"><strong>{post.user.username}</strong> {post.caption}</p>
          <p className="post-comments">View all {post.comments.length} comments</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
