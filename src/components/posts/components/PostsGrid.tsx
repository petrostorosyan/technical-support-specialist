import styles from "../PostsSection.module.css";
import type { Post } from "../types";
import PostCard from "./PostCard";

type PostsGridProps = {
  posts: Post[];
  onOpenPost: (post: Post) => void;
};

const PostsGrid = ({ posts, onOpenPost }: PostsGridProps) => {
  return (
    <div className={styles.postsGrid}>
      {posts.map((post) => (
        <PostCard key={post.title} post={post} onOpen={onOpenPost} />
      ))}
    </div>
  );
};

export default PostsGrid;
