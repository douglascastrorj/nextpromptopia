'use client';

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
       ) )}
    </div>
  );
};

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]); // [post, setPost]
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    setFilteredPosts(posts.filter((post) => {
      return post.prompt.toLowerCase().includes(e.target.value.toLowerCase()) || post.tag.toLowerCase().includes(e.target.value.toLowerCase());
    }));
  }

  useEffect(() => {
    const fetchPosts = async () => { 
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" 
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList 
        data={filteredPosts}
        handleTagClick={() => {}} 
      />
    </section>
  )
}

export default Feed