import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Client-side route changes (React Router <Link> nav) don't reset scroll
// position the way a real browser navigation does — without this, clicking
// to a new page from partway down the previous one leaves you scrolled to
// that same spot on the new page. Force to top on every path change.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Standalone sales pages: no site header, so the only way forward is the
// checkout button. /course is the course sales funnel (unlisted).
const STANDALONE_PATHS = new Set(["/course", "/course/"]);

export default function Layout() {
  const { pathname } = useLocation();
  const standalone = STANDALONE_PATHS.has(pathname);
  return (
    <div className="min-h-screen bg-white selection:bg-green-brand-50 selection:text-green-brand-dark">
      <ScrollToTop />
      {!standalone && <Navbar />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
