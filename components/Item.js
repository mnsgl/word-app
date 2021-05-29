import { MdAdd, MdDelete } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { SetsContext } from "../context/setcontext/SetProvider";
import { ThemeContext } from "../context/themeContext/ThemeProvider";
export default function Item({ item }) {
  const [, setSets] = useContext(SetsContext);
  const [theme, setTheme] = useContext(ThemeContext);
  function deleteSet(e) {
    let userName = sessionStorage.getItem("userName");
    setSets((prev) => prev.filter((set) => set.setName !== item.setName));
    fetch(`/api/set/${userName}/${item._id}`, { method: "DELETE" });
  }
  return (
    <div
      className={`item w-full h-18 mb-2 rounded-lg hover:border-opacity-0 cursor-pointer border-2 border-gray-300 shadow hover:shadow-lg px-5 ${
        theme === "dark" && "bg-dark"
      }`}
    >
      <div
        className={`grid grid-cols-3 items-center content-center h-full ${
          theme === "dark" && "bg-dark"
        }`}
      >
        <Link href={"/sets/" + item.setName}>
          <a>
            <p
              className={`text-2xl ${
                theme === "dark" && "bg-dark text-yellow-50"
              }`}
            >
              {item.setName}
            </p>
          </a>
        </Link>

        <div
          className={`flex flex-col delete ${theme === "dark" && "bg-dark"}`}
        >
          <MdDelete
            onClick={deleteSet}
            size="26px"
            className={`self-center rounded-md bg-transparent ml-8 fill-current text-${
              theme === "light" ? "gray-400" : "gray-400"
            } hover:text-${theme === "light" ? "black" : "white"}`}
          />
        </div>
        <div className={`flex flex-col ${theme === "dark" && "bg-dark"}`}>
          <span
            className={`self-end text-lg text-font-bold mb-2 ${
              theme === "dark" && "bg-dark text-yellow-50"
            }`}
          >
            {item?.words?.length ? item.words.length : 0} words
          </span>
          <span
            className={`self-end text-base ${
              theme === "dark" && "bg-dark text-yellow-50"
            }`}
          >
            {item.date.split(",")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

//href="/sets/[set_name]" as={`/sets/${item.setName}`}
