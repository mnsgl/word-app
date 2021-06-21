import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { SetsContext } from "../../context/setcontext/SetProvider";
import { ThemeContext } from "../../context/themeContext/ThemeProvider";
import DText from "./DText";
export default function DisplayWordItem({ data, setEdit, setData }) {
  const [, setSets] = useContext(SetsContext);
  const [theme] = useContext(ThemeContext);
  const router = useRouter();
  function delItem(e) {
    setData((prev) => prev.filter((item) => item._id !== data._id));
    fetch("/api/set/word/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: {
          wordId: data._id,
        },
        set: {
          setId: router.query.id,
        },
      }),
    });
    setSets([]);
  }
  return (
    <div
      className={`item expand-item w-full h-14 mb-2 overflow-hidden rounded-lg cursor-pointer border shadow hover:shadow-lg px-4 pt-4 select-none mobile:h-72 ${
        theme === "dark" && "bg-dark hover:border-blue-800 dark-item"
      }`}
    >
      <div
        className={`flex justify-between items-start h-full mobile:flex-col mobile:justify-evenly ${
          theme === "dark" && "bg-dark text-gray-100"
        }`}
      >
        <div className="grid grid-cols-3 w-5/6 bg-transparent mobile:grid-rows-4 mobile:grid-cols-1 mobile:w-full mobile:mb-5">
          <DText text={data.word} theme={theme} />
          <DText text={data.pro} theme={theme} />
          <DText text={data.tran} theme={theme} />
          <DText text={data?.sent} theme={theme} sent />
        </div>
        <div className="word-item-display flex gap-3 bg-transparent -mt-1 mobile:flex-col mobile:justify-center mobile:w-full">
          <DText text={data?.kind} theme={theme} kind />
          <div className="flex gap-3 bg-transparent mt-1 mobile:justify-center mobile:mr-5">
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
    </div>
  );
}
