import { MdAdd, MdDelete } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { SetsContext } from "../context/setcontext/SetProvider";
import { ThemeContext } from "../context/themeContext/ThemeProvider";
export default function Item({ item }) {
  const [, setSets] = useContext(SetsContext);
  const [theme] = useContext(ThemeContext);
  function deleteSet(_) {
    let userName = sessionStorage.getItem("userName");
    setSets((prev) => prev.filter((set) => set.setName !== item.setName));
    fetch(`/api/set/${userName}/${item._id}`, { method: "DELETE" });
  }
  return (
    <div
      className={`item w-full h-18 mb-2 rounded-lg cursor-pointer border-2 shadow hover:shadow-lg px-5 ${
        theme === "dark" && "bg-dark"
      }`}
    >
      <div className="grid grid-cols-3 items-center content-center h-full bg-transparent">
        <Link href={"/sets/" + item._id}>
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

        <div className="flex flex-col delete bg-transparent">
          <MdDelete
            onClick={deleteSet}
            size="26px"
            className={`self-center rounded-md bg-transparent ml-8 fill-current text-${
              theme === "light" ? "gray-400" : "gray-400"
            } hover:text-${theme === "light" ? "black" : "white"}`}
          />
        </div>
        <div className="flex flex-col bg-transparent">
          <span
            className={`self-end text-lg text-font-bold mb-2 ${
              theme === "dark" && "bg-dark text-yellow-50"
            }`}
          >
            {item?.words?.length && item.words.length} words
          </span>
          <span
            className={`self-end text-base bg-transparent ${
              theme === "dark" && "text-yellow-50"
            }`}
          >
            {new Date(item.timeStamp).toLocaleString().split(",")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
