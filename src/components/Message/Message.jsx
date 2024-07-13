import styles from "./Message.module.css";

function Message({ children }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {children}
    </p>
  );
}

export default Message;
