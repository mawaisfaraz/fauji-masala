import { useState, useEffect } from "react";
import styles from "./AddModal.module.css";

export default function AddModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [packets, setPackets] = useState("");
  const [overhead, setOverhead] = useState(30);

  const basePerPkt = price && packets ? Number(price) / Number(packets) : 0;
  const finalPerPkt = basePerPkt + Number(overhead);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Enter") handleSave();
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [name, price, packets, overhead]);

  function handleSave() {
    if (
      !name.trim() ||
      !price ||
      Number(price) < 1 ||
      !packets ||
      Number(packets) < 1
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    onSave({
      name: name.trim(),
      price: Math.round(finalPerPkt * 100) / 100,
      rawPrice: Number(price),
      packets: Number(packets),
      overhead: Number(overhead),
      unit: "per packet",
      category: "spice",
      emoji: "📦",
    });
    onClose();
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalTitle}>Add New Product</div>

        <div className="form-group">
          <label className="form-label">Product Name *</label>
          <input
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lal Mirch"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Total Price (PKR) *</label>
            <input
              className="form-input"
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 1000"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Number of Packets *</label>
            <input
              className="form-input"
              type="number"
              min="1"
              value={packets}
              onChange={(e) => setPackets(e.target.value)}
              placeholder="e.g. 10"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Overhead per Packet (PKR)</label>
          <input
            className="form-input"
            type="number"
            min="0"
            value={overhead}
            onChange={(e) => setOverhead(e.target.value)}
          />
        </div>

        {/* ── Live preview ── */}
        {basePerPkt > 0 && (
          <div className={styles.preview}>
            <div className={styles.previewRow}>
              <span>Base per Packet</span>
              <span>₨ {basePerPkt.toFixed(2)}</span>
            </div>
            <div className={styles.previewRow}>
              <span>＋ Overhead</span>
              <span>₨ {Number(overhead).toFixed(2)}</span>
            </div>
            <div className={styles.previewTotal}>
              <span>Final Price / Packet</span>
              <span>₨ {finalPerPkt.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className={styles.modalActions}>
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            ＋ Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
