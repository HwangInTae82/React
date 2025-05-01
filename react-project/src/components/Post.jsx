import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Post = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await axios.get('http://localhost:3001/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <PostImg src={post.img} />
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;

const PostImg = styled.img`
  width: 468px;
  height: 585px;
  border-radius: 4px;
  object-fit: cover;
`;
