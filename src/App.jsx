import React, { useEffect } from "react";
import Router from "./routes";

import { ThemeProvider } from "./hooks/useThemeSwitcher";

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
