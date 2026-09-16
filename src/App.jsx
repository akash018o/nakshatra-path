import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Home from "./pages/Home";

// Admin pulls in auth, uploads, and CSV export logic that public visitors
// never need — lazy-loaded so it's not part of the bundle everyone downloads.
const Admin = lazy(() => import("./pages/Admin"));

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-cosmos text-parchment/50">Loading...</div>}>
              <Admin />
            </Suspense>
          }
        />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
