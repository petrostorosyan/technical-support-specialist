import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import PostsSection from "./components/posts/PostsSection";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <PostsSection searchQuery={searchQuery} />
    </div>
  );
}

export default App;
