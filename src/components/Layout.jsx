import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {!isHome && (
        <div className="w-full">
          <Header />
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
