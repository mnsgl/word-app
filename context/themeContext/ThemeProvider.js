import React, { createContext, useEffect, useState } from "react";

const ThemeContext = createContext("");

function ThemeProvider(props) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (sessionStorage.getItem("wordTheme")) {
      setTheme(sessionStorage.getItem("wordTheme"));
    }
  });
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
