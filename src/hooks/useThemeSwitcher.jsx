import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  createContext,
} from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const [mode, setMode] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const userPref = window.localStorage.getItem("theme");
    if (userPref) {
      let check = userPref === "dark" ? "dark" : "light";
      setMode(check);
    } else {
      let check = mediaQuery.matches ? "dark" : "light";
      setMode(check);
    }

    const handleChange = () => {
      if (userPref) {
        let check = userPref === "dark" ? "dark" : "light";
        setMode(check);
        if (check === "dark")
          document.querySelector("html").setAttribute("data-theme", "dark");
        else document.querySelector("html").setAttribute("data-theme", "light");
      } else {
        let check = mediaQuery.matches ? "dark" : "light";
        setMode(check);
        if (check === "dark")
          document.querySelector("html").setAttribute("data-theme", "dark");
        else document.querySelector("html").setAttribute("data-theme", "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.addEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (mode === "dark") {
      window.localStorage.setItem("theme", "dark");
      document.querySelector("html").setAttribute("data-theme", "dark");
    } else if (mode === "light") {
      window.localStorage.setItem("theme", "light");
      document.querySelector("html").setAttribute("data-theme", "light");
    }
  }, [mode, setMode]);

  const contextValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useThemeSwitcher() {
  return useContext(ThemeContext);
}
