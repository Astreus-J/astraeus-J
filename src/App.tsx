import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Single-page site: "/" is the home page, anything else is a 404.
const App = () => {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  return pathname === "/" ? <Index /> : <NotFound />;
};

export default App;
