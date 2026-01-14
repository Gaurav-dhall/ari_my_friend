import { Outlet, useLocation } from "react-router-dom";
import FloatingNav from "../components/FloatingNav";

export default function AppLayout() {
  const location = useLocation();

  // Hide nav on chat screen
  const hideNavRoutes = ["/chat"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-bg text-main relative">
      <Outlet />

      {!shouldHideNav && <FloatingNav />}
    </div>
  );
}
