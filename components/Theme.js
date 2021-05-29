import { useContext, useState } from "react";
import { MdLightbulbOutline } from "react-icons/md";
import { ThemeContext } from "../context/themeContext/ThemeProvider";

function Theme() {
  const [theme, setTheme] = useContext(ThemeContext);
  function changeTheme(e) {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  return (
    <MdLightbulbOutline
      size="35px"
      fill={`${theme === "dark" ? "white" : "black"}`}
      onClick={changeTheme}
      className="absolute top-5 left-20 cursor-pointer bg-transparent"
    />
  );
}
export default Theme;
