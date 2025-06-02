import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import ScrollToTop from "../components/ScrollToTop";

function RootLayout() {
  return (
    <main>
      <Navigation />
      <Outlet />
      <ScrollToTop />
    </main>
  );
}

export default RootLayout;
