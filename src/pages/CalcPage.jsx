import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import AddModal from "../components/AddModal";
import styles from "./CalcPage.module.css";

export default function CalcPage() {
  const { addProduct, setPage } = useApp();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  function handleSave(product) {
    addProduct(product);
    setPage("home");
  }

  function handleClose(product) {
    setShowModal(false);
    setPage("home");
  }

  return (
    <div className="page">
      <div className="section">
        <div className="section-header">
          <div className="section-title">Add Product</div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            ＋ Add New Product
          </button>
        </div>

        <div
          className={styles.calcCard}
          style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ color: "var(--muted)" }}>
            Use the button above to add a new spice product with calculated
            pricing.
          </p>
        </div>
      </div>

      {showModal && <AddModal onClose={handleClose} onSave={handleSave} />}
    </div>
  );
}
