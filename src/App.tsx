import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const isAuthStateLoaded = useAuthStore((state) => state.isAuthStateLoaded);
  const loadAuthState = useAuthStore((state) => state.loadAuthState);
  const loadTheme = useThemeStore((state) => state.loadTheme);

  useEffect(() => {
    // Load auth state on mount
    loadAuthState();
  }, [loadAuthState]);

  useEffect(() => {
    // Load theme on mount
    loadTheme();
  }, [loadTheme]);

  if (!isAuthStateLoaded) {
    // @todo: implement loader
    return null;
  }

  return <RouterProvider router={router} />;
}

export default App;
