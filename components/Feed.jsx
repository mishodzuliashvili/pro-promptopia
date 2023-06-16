"use client";

import { useState, useEffect } from "react";

import PromptCard from "@/components/PromptCard";
import { PromptCardList } from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const filterPrompts = (filterText) => {
    const filteredPrompts = prompts.filter((prompt) => {
      const promptText = prompt.prompt.toLowerCase();
      const promptTag = prompt.tag.toLowerCase();
      const promptUser = prompt.creator.username.toLowerCase();
      const searchText = filterText.toLowerCase();
      return (
        promptText.includes(searchText) ||
        promptTag.includes(searchText) ||
        promptUser.includes(searchText)
      );
    });
    return filteredPrompts;
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        setSearchedResults(filterPrompts(e.target.value));
      }, 500)
    );
  };
  const handleTagClick = (tag) => {
    setSearchText(tag);
    setSearchedResults(filterPrompts(tag));
  };
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt", {
        cache: "no-store",
      });
      const data = await response.json();
      setPrompts(data);
    };
    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={prompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
