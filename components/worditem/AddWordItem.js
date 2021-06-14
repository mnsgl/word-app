import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { SetsContext } from "../../context/setcontext/SetProvider";
import { ThemeContext } from "../../context/themeContext/ThemeProvider";
import EText from "./EText";
import mongoose from "mongoose";
export default function AddWordItem({ setAdd, data, setData }) {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [pro, setPro] = useState("");
  const [tran, setTran] = useState("");
  const [sent, setSent] = useState("");
  const [kind, setKind] = useState("");
  const [, setSets] = useContext(SetsContext);
  const [theme] = useContext(ThemeContext);

  async function add(e) {
    if (word.length <= 1 && tran.length <= 1) {
      return;
    }
    let newWord = {
      _id: new mongoose.Types.ObjectId(),
      word,
      pro,
      tran,
      kind,
      timeStamp: Date.now(),
      sent,
      //fav,
    };
    fetch("/api/set/word/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newWord,
        set: {
          setId: router.query.id,
        },
      }),
    });
    setData((prev) => [...prev, newWord]);
    setAdd(false);
    setSets([]);
  }

  return (
    <div
      className={`item w-full h-28 overflow-hidden mb-2 rounded-lg cursor-pointer border-2 border-gray-300 shadow hover:shadow-lg transition ease-in-out duration-300 px-4 select-none ${
        theme === "dark" && "bg-dark hover:border-blue-600"
      }`}
    >
      <div className="flex justify-between items-start h-full bg-transparent">
        <div className="bg-transparent grid grid-cols-3 w-5/6 mt-2">
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
        <div className="word-item-set h-full items-center justify-center flex gap-3 bg-transparent">
          <EText type="kind" theme={theme} text={kind} setText={setKind} kind />
          <div className="flex gap-3 bg-transparent">
            <MdAdd
              onClick={add}
              id="word-item-set-add"
              size="28px"
              className="cursor-pointer bg-transparent"
            />
            <MdDelete
              onClick={() => setAdd(false)}
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
