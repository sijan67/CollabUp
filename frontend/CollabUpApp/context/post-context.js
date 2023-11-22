import React, { createContext, useContext, useEffect, useState } from "react";
// import { generatePosts } from "../utils/generate-dommy-data";
import {generatePostsFromAPI} from "../utils/backend-data";

const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // setPosts(generatePosts());

    generatePostsFromAPI().then(posts => setPosts(posts));

  }, []);

  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };

  const uploadPosts = (newPost) => {
    // Prepend the new post to the existing posts array
    setPosts((prevPosts) => [newPost, ...prevPosts]);

    console.log("newPost is: ", newPost)
    
  };

  return (
    <PostContext.Provider value={{ posts, updatePosts, uploadPosts }}>
      {children}
    </PostContext.Provider>
  );
};
