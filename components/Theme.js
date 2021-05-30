import { useContext, useEffect, useState } from "react";
import { MdLightbulbOutline } from "react-icons/md";
import { ThemeContext } from "../context/themeContext/ThemeProvider";

function Theme() {
  const [theme, setTheme] = useContext(ThemeContext);
  async function changeTheme(e) {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    sessionStorage.setItem("wordTheme", theme === "light" ? "dark" : "light");
  }
  useEffect(() => {
    if (theme === "dark") {
      document.getElementById("__next").style.backgroundColor = "#151515";
    } else {
      document.getElementById("__next").style.backgroundColor = "#F5F5F5";
    }
  }, [theme]);
  return (
    <MdLightbulbOutline
      size="35px"
      fill={`${theme === "dark" ? "white" : "black"}`}
      onClick={changeTheme}
      className="absolute top-5 left-20 cursor-pointer bg-transparent select-none"
    />
  );
}
export default Theme;
