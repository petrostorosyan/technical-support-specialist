import styles from "../PostsSection.module.css";
import type { Post } from "../types";

type PostModalProps = {
  post: Post | null;
  onClose: () => void;
};

const PostModal = ({ post, onClose }: PostModalProps) => {
  if (!post) {
    return null;
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        <h3 className={styles.modalTitle}>{post.title}</h3>
        <p className={styles.modalDescription}>{post.text}</p>
        <button type="button" className={styles.modalClose} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default PostModal;
