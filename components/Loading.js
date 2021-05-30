import { useContext, useEffect } from "react";
import Loader from "react-loader-spinner";
import { ThemeContext } from "../context/themeContext/ThemeProvider";

export default function Loading() {
  const [theme] = useContext(ThemeContext);
  useEffect(() => {
    if (theme === "dark") {
      document.getElementById("triangle")?.classList?.add("bg-dark");
    } else {
      document.getElementById("triangle")?.classList?.remove("bg-dark");
    }
  }, [theme]);
  return (
    <div
      className={`w-full h-full text-3xl flex flex-col gap-5 justify-center items-center ${
        theme === "dark" && "bg-dark"
      }`}
    >
      <Loader
        className={`${theme === "dark" && "bg-dark"}`}
        secondaryColor="dark"
        type="Triangle"
        color="orange"
      />
      <p className={`${theme === "dark" && "bg-dark text-gray-100"}`}>
        Loading
      </p>
    </div>
  );
}
