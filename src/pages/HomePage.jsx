import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { products, setPage } = useApp();

  return (
    <div className="page">
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroTag}>📍 Fauji Local Business</div>
        <h1 className={styles.heroTitle}>
          Fresh Spices,
          <br />
          <em>Fair Prices</em>
        </h1>
        <p className={styles.heroSubtitle}>
          Quality Spices with transparent, real-time pricing.
        </p>
      </div>

      {/* ── Product grid ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">All Products</div>
          <button className="btn-primary" onClick={() => setPage("calc")}>
            ＋ Add Product
          </button>
        </div>

        <div className={styles.productsGrid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {products.length === 0 && (
          <p className={styles.emptyMsg}>No products yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}
