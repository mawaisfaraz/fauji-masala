import styles from "./Toast.module.css";

export default function Toast({ msg }) {
  return <div className={styles.toast}>{msg}</div>;
}
