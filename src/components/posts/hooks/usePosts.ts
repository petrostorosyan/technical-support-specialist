import { useEffect, useState } from "react";
import { POSTS_ENDPOINT } from "../constants";
import type { Post } from "../types";

type UsePostsResult = {
  posts: Post[];
  isLoading: boolean;
  errorMessage: string;
};

const usePosts = (): UsePostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(POSTS_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Failed to load posts: ${response.status}`);
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format");
        }

        setPosts(data as Post[]);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading posts.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  return { posts, isLoading, errorMessage };
};

export default usePosts;
