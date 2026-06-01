import styles from "../PostsSection.module.css";
import type { Post } from "../types";

type PostCardProps = {
  post: Post;
  onOpen: (post: Post) => void;
};

const PostCard = ({ post, onOpen }: PostCardProps) => {
  return (
    <article
      className={styles.postCard}
      onClick={() => onOpen(post)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(post);
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
  );
};

export default PostCard;
