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
      className={`item w-full h-18 mb-2 rounded-lg cursor-pointer border-2 shadow hover:shadow-lg px-5 mobile:border ${
        theme === "dark" && "bg-dark"
      }`}
    >
      <div className="grid grid-cols-4 items-center content-center h-full bg-transparent">
        <Link href={"/sets/" + item._id}>
          <a>
            <p
              className={`text-2xl mobile:text-sm mobile:text-center mobile:break-words ${
                theme === "dark" && "bg-dark text-yellow-50"
              }`}
            >
              {item.setName}
            </p>
          </a>
        </Link>

        <div className="flex justify-end delete bg-transparent mobile:justify-start">
          <MdDelete
            onClick={deleteSet}
            className={`self-center h-7 w-7 mobile:w-5 mobile:h-5 rounded-md bg-transparent ml-8 fill-current text-${
              theme === "light" ? "gray-400" : "gray-400"
            } hover:text-${theme === "light" ? "black" : "white"}`}
          />
        </div>
        <div className="bg-transparent flex justify-end mobile:justify-center">
          <p
            className={`bg-transparent text-lg hover:underline mobile:text-xs ${
              theme === "dark" && "text-gray-100"
            }`}
          >
            {item.created}
          </p>
        </div>
        <div className="flex flex-col bg-transparent">
          <span
            className={`self-end text-lg text-font-bold mb-2 mobile:text-xs mobile:mb-4 ${
              theme === "dark" && "bg-dark text-yellow-50"
            }`}
          >
            {item?.words?.length && item.words.length} words
          </span>
          <span
            className={`self-end text-base bg-transparent mobile:text-xs ${
              theme === "dark" && "text-yellow-50"
            }`}
          >
            {new Date(item.timeStamp).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
