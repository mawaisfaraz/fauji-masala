import { useState } from "react";
import { useApp } from "../context/AppContext";
import { fmt } from "../constants/data";
import EditModal from "./EditModal";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product: p }) {
  const { removeProduct, editProduct } = useApp();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.productBody}>
          <div className={styles.productName}>{p.name}</div>

          <div className={styles.productPrice}>
            {fmt(p.price)}
            <small>{p.unit}</small>
          </div>

          <div className={styles.productActions}>
            <button
              className="btn-ghost"
              onClick={() => setShowEdit(true)}
              title="Edit">
              ✏️ Edit
            </button>
            <button
              className="btn-danger"
              onClick={() => removeProduct(p.id)}
              title="Remove">
              🗑
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditModal
          product={p}
          onClose={() => setShowEdit(false)}
          onSave={(updated) => editProduct(p.id, updated)}
        />
      )}
    </>
  );
}
