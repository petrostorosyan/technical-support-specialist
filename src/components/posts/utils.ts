import type { Post } from "./types";

const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

export const filterPosts = (posts: Post[], searchQuery: string): Post[] => {
  const normalizedSearch = normalize(searchQuery);
  if (!normalizedSearch) {
    return posts;
  }

  return posts.filter((post) => {
    const searchableText = normalize(`${post.title} ${post.text}`);
    return searchableText.includes(normalizedSearch);
  });
};
