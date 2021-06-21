import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { SetsContext } from "../../context/setcontext/SetProvider";
import { ThemeContext } from "../../context/themeContext/ThemeProvider";
import { useCompare } from "../useCompare";
import EText from "./EText";
export default function EditWordItem({ data, setEdit, setData }) {
  const [, setSets] = useContext(SetsContext);
  const [theme] = useContext(ThemeContext);
  const router = useRouter();
  const [word, setWord] = useState("");
  const [pro, setPro] = useState("");
  const [tran, setTran] = useState("");
  const [sent, setSent] = useState("");
  const [kind, setKind] = useState("");
  useEffect(() => {
    setWord(data.word);
    setPro(data.pro);
    setTran(data.tran);
    setKind(data?.kind);
    setSent(data?.sent);
  }, []);

  async function edit(e) {
    if (word.length <= 1 && tran.length <= 1) {
      return;
    }
    let newWord = {
      _id: data._id,
      word,
      tran,
      kind,
      pro,
      timeStamp: data.timeStamp,
      sent,
      // fav,
    };
    if (useCompare(newWord, data)) {
      setEdit((p) => !p);
      return;
    }
    setData((prev) => {
      let curData = prev.filter((item) => item._id !== data._id);
      return [...curData, newWord];
    });
    fetch("/api/set/word/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newWord,
      }),
    });
    setEdit((p) => !p);
  }
  async function delItem(e) {
    await setData((prev) => prev.filter((item) => item._id !== data._id));
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
    setEdit((p) => !p);
    setSets([]);
  }

  return (
    <div
      className={`item w-full h-28 overflow-hidden mb-2 rounded-md cursor-pointer border-2 border-gray-300 shadow hover:shadow-lg px-4 select-none mobile:h-72 ${
        theme === "dark" && "bg-dark hover:border-blue-600"
      }`}
    >
      <div className="flex justify-between items-start h-full bg-transparent mobile:flex-col mobile:justify-evenly">
        <div className="bg-transparent grid grid-cols-3 w-5/6 mt-2 mobile:grid-rows-4 mobile:grid-cols-1 mobile:w-full mobile:gap-2 mobile:mb-5 mobile:pr-3">
          <EText type="word" theme={theme} text={word} setText={setWord} />
          <EText
            type="pronunciation"
            theme={theme}
            text={pro}
            setText={setPro}
          />
          <EText type="translate" theme={theme} text={tran} setText={setTran} />
          <EText type="sentence" theme={theme} text={sent} setText={setSent} />
        </div>
        <div className="word-item-set h-full items-center justify-center flex gap-3 bg-transparent mobile:flex-col mobile:justify-center mobile:w-full">
          <EText type="kind" theme={theme} text={kind} setText={setKind} kind />
          <div className="flex gap-3 bg-transparent mobile:justify-center mobile:mr-5">
            <MdAdd
              onClick={edit}
              id="word-item-set-add"
              size="28px"
              className="cursor-pointer bg-transparent"
            />
            <MdDelete
              onClick={delItem}
              id="word-item-set-del"
              size="24px"
              className="cursor-pointer bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
          <select
            onChange={(e) => setKind(e.target.value)}
            defaultValue={data?.kind || "verb"}
            className={` outline-none px-2 ${theme === "dark" && "bg-dark"}`}
          >
            <option
              value="verb"
              className="bg-transparent border-l-2 border-purple-700"
            >
              Verb
            </option>
            <option value="noun" className="bg-transparent">
              Noun
            </option>
            <option value="adverb" className="bg-transparent">
              Adverb
            </option>
          </select>
*/

/*

        <Input placeholder="Word" text={data.word} />
        <Input placeholder="Pronunciation" text={data.pre} />
        <Input placeholder="Translation" text={data.trans} />


function Input({ placeholder, text }) {
  return (
    <input
      value={text && text}
      type="text"
      placeholder={placeholder}
      className="outline-none border-b-2 border-gray-500 px-2 py-1 text-xl break-all w-72 mobile:text-base mobile:w-64 focus:border-yellow-500 transition ease-in-out duration-200 laptop:w-36 laptop:text-sm tablet:w-24 tablet:text-xs"
    />
  );
}
*/
