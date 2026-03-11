import { createContext, useContext, useState, useCallback, useRef } from "react";
import { INITIAL_PRODUCTS } from "../constants/data";

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [page,     setPage]     = useState("home");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [toasts,   setToasts]   = useState([]);
  const nextId = useRef(11);

  const showToast = useCallback((msg) => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2800);
  }, []);

  function addProduct(product) {
    const id = nextId.current;
    nextId.current += 1;
    setProducts(prev => [...prev, { ...product, id }]);
    showToast(`✓ ${product.name} added!`);
  }

  function removeProduct(id) {
    const p = products.find(x => x.id === id);
    setProducts(prev => prev.filter(x => x.id !== id));
    showToast(`🗑 ${p?.name} removed`);
  }

  return (
    <AppContext.Provider value={{
      page, setPage,
      products, addProduct, removeProduct,
      toasts,
    }}>
      {children}
    </AppContext.Provider>
  );
}