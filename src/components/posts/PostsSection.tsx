import { useEffect, useMemo, useState } from "react";
import styles from "./PostsSection.module.css";

type Post = {
  title: string;
  text: string;
  tags: string;
  autor: string;
  img: string;
  img_2x: string;
  date: string;
  views: string;
};

const POSTS_ENDPOINT = "https://cloud.codesupply.co/endpoint/react/data.json";

type PostsSectionProps = {
  searchQuery: string;
};

const PostsSection = ({ searchQuery }: PostsSectionProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
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

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    if (!normalizedSearch) {
      return posts;
    }

    return posts.filter((post) => {
      const title = post.title.toLowerCase();
      const text = post.text.toLowerCase();
      return (
        title.includes(normalizedSearch) || text.includes(normalizedSearch)
      );
    });
  }, [posts, searchQuery]);

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

              <div className={styles.postsGrid}>
                {filteredPosts.map((post) => (
                  <article
                    key={post.title}
                    className={styles.postCard}
                    onClick={() => setSelectedPost(post)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedPost(post);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open post: ${post.title}`}
                  >
                    <img
                      src={post.img}
                      srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
                      sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                      alt={post.title}
                      className={styles.postImage}
                    />

                    <div className={styles.postContent}>
                      <p className={styles.postTag}>{post.tags}</p>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postMeta}>
                        <span className={styles.postAuthor}>{post.autor}</span>
                        <span className={styles.metaDot}>&bull;</span>
                        <span className={styles.postMetaMuted}>{post.date}</span>
                        <span className={styles.metaDot}>&bull;</span>
                        <span className={styles.postMetaMuted}>{post.views} Views</span>
                      </p>
                      <p className={styles.postText}>{post.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {selectedPost && (
        <div
          className={styles.modalOverlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPost(null);
            }
          }}
        >
          <div className={styles.modalContent} role="dialog" aria-modal="true">
            <h3 className={styles.modalTitle}>{selectedPost.title}</h3>
            <p className={styles.modalDescription}>{selectedPost.text}</p>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setSelectedPost(null)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostsSection;
