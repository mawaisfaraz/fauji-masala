import "./index.css";
import { AppProvider, useApp } from "./context/AppContext";
import Nav from "./components/Nav";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";
import CalcPage from "./pages/CalcPage";

function AppContent() {
  const { page, toasts } = useApp();

  return (
    <>
      <Nav />
      {page === "home" && <HomePage />}
      {page === "calc" && <CalcPage />}
      {toasts.map((t) => (
        <Toast key={t.id} msg={t.msg} />
      ))}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
