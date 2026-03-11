import { useApp } from "../context/AppContext";
import { fmt } from "../constants/data";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product: p }) {
  const { removeProduct } = useApp();

  return (
    <div className={styles.productCard}>
      <div className={styles.productBody}>
        <div className={styles.productName}>{p.name}</div>

        <div className={styles.productPrice}>
          {fmt(p.price)}
          <small>{p.unit}</small>
        </div>

        <div className={styles.productActions}>
          <button
            className="btn-danger"
            onClick={() => removeProduct(p.id)}
            title="Remove">
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}
