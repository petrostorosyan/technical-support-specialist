import { useMemo, useState } from "react";
import styles from "./PostsSection.module.css";
import type { Post, PostsSectionProps } from "./types";
import usePosts from "./hooks/usePosts";
import { filterPosts } from "./utils";
import PostsGrid from "./components/PostsGrid";
import PostModal from "./components/PostModal";

const PostsSection = ({ searchQuery }: PostsSectionProps) => {
  const { posts, isLoading, errorMessage } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filteredPosts = useMemo(
    () => filterPosts(posts, searchQuery),
    [posts, searchQuery],
  );

  return (
    <>
      <main className={styles.postsSection}>
        <div className={styles.postsContainer}>
          {isLoading && <p className={styles.stateMessage}>Loading posts...</p>}

          {!isLoading && errorMessage && (
            <p className={`${styles.stateMessage} ${styles.stateError}`}>
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && (
            <>
              {!filteredPosts.length && (
                <div className={styles.noResults}>
                  <p className={styles.stateMessage}>No posts found.</p>
                </div>
              )}

              <PostsGrid posts={filteredPosts} onOpenPost={setSelectedPost} />
            </>
          )}
        </div>
      </main>

      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
};

export default PostsSection;
