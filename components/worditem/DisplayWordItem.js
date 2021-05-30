import { useRouter } from "next/router";
import { useContext } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { SetsContext } from "../../context/setcontext/SetProvider";
import { ThemeContext } from "../../context/themeContext/ThemeProvider";
export default function DisplayWordItem({ data, setEdit, setData }) {
  const [, setSets] = useContext(SetsContext);
  const [theme] = useContext(ThemeContext);
  const router = useRouter();
  function delItem(e) {
    let userName = sessionStorage.getItem("userName");
    setData((prev) => prev.filter((item) => item._id !== data._id));
    fetch("/api/set/word/delete-word/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        setName: router.query.set_name,
        wordId: data._id,
      }),
    });
    setSets([]);
  }
  return (
    <div
      className={`item w-full h-18 mb-2 rounded-lg cursor-pointer border-2 border-gray-300 shadow hover:shadow-lg px-5 select-none ${
        theme === "dark" && "bg-dark hover:border-blue-800"
      }`}
    >
      <div
        className={`flex justify-between items-center h-full ${
          theme === "dark" && "bg-dark text-gray-100"
        }`}
      >
        <span
          className={`border-b-2 border-gray-300 w-72 pl-3 text-lg ${
            theme === "dark" && "bg-dark border-blue-600"
          }`}
        >
          {data.word}
        </span>
        <span
          className={`border-b-2 border-gray-300 w-72 pl-3 text-lg ${
            theme === "dark" && "bg-dark border-blue-600"
          }`}
        >
          {data.pro}
        </span>
        <span
          className={`border-b-2 border-gray-300 w-72 pl-3 text-lg ${
            theme === "dark" && "bg-dark border-blue-600"
          }`}
        >
          {data.tran}
        </span>
        <div className="word-item-display flex gap-3 bg-transparent">
          <MdEdit
            onClick={(e) => setEdit((p) => !p)}
            id="word-item-dis-edit"
            size="25px"
            className="cursor-pointer bg-transparent"
          />
          <MdDelete
            onClick={delItem}
            id="word-item-dis-del"
            size="24px"
            className="cursor-pointer bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
