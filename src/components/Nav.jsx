import { useApp } from "../context/AppContext";
import styles from "./Nav.module.css";

const TABS = [
  { id: "home", label: "🏪 Products" },
  { id: "calc", label: "🧮 Calculate" },
];

export default function Nav() {
  const { page, setPage } = useApp();

  return (
    <nav className={styles.nav}>
      <div className={styles.navBrand} onClick={() => setPage("home")}>
        <span>Fauji Masala</span>
      </div>

      <div className={styles.navLinks}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`${styles.navBtn}${page === t.id ? ` ${styles.active}` : ""}`}
            onClick={() => setPage(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
