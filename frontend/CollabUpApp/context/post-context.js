import React, { createContext, useContext, useEffect, useState } from "react";
import { generatePosts } from "../utils/generate-dommy-data";

const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(generatePosts());
  }, []);

  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };

  return (
    <PostContext.Provider value={{ posts, updatePosts }}>
      {children}
    </PostContext.Provider>
  );
};
