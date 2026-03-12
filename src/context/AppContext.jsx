import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { INITIAL_PRODUCTS } from "../constants/data";

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [page, setPage] = useState("home");

  // load from localStorage on first render, fall back to INITIAL_PRODUCTS
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("fauji-products");
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // start nextId from highest existing id so new ids never clash
  const nextId = useRef(
    Math.max(
      ...(() => {
        try {
          const saved = JSON.parse(
            localStorage.getItem("fauji-products") || "[]",
          );
          return saved.length ? saved.map((p) => p.id) : [10];
        } catch {
          return [10];
        }
      })(),
      0,
    ) + 1,
  );

  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((msg) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  function addProduct(product) {
    const id = nextId.current;
    nextId.current += 1;
    setProducts((prev) => {
      const updated = [...prev, { ...product, id }];
      localStorage.setItem("fauji-products", JSON.stringify(updated));
      return updated;
    });
    showToast(`✓ ${product.name} added!`);
  }

  function removeProduct(id) {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => {
      const updated = prev.filter((x) => x.id !== id);
      localStorage.setItem("fauji-products", JSON.stringify(updated));
      return updated;
    });
    showToast(`🗑 ${p?.name} removed`);
  }

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        products,
        addProduct,
        removeProduct,
        toasts,
      }}>
      {children}
    </AppContext.Provider>
  );
}
