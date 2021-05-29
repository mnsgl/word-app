import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { SetsContext } from "../../context/setcontext/SetProvider";
export default function AddWordItem({ setAdd, data, setData }) {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [pro, setPro] = useState("");
  const [tran, setTran] = useState("");
  const [, setSets] = useContext(SetsContext);

  async function add(e) {
    if (word.length <= 1 && trans.length <= 1) {
      return;
    }
    let id = data.sort((a, b) => b._id - a._id)[0];
    let newWord = { _id: id, word, pro, tran };
    setData((prev) => [...prev, newWord]);
    fetch("/api/set/word/create-word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word, pro, tran, setName: router.query.set_name }),
    });
    setAdd(false);
    setSets([]);
  }

  return (
    <div className="item w-full h-18 mb-2 rounded-lg hover:border-opacity-0 cursor-pointer border-2 border-gray-300 shadow hover:shadow-lg transition ease-in-out duration-300 px-5 select-none">
      <div className="flex justify-between items-center h-full">
        <input
          value={word}
          type="text"
          placeholder="Word"
          onChange={(e) => setWord(e.target.value)}
          className={
            "outline-none border-b-2 border-gray-500 px-2 pt-1 text-xl break-all w-72 focus:border-yellow-500 transition ease-in-out duration-200"
          }
        />

        <input
          value={pro}
          type="text"
          placeholder="Pronunciation"
          onChange={(e) => setPro(e.target.value)}
          className="outline-none border-b-2 border-gray-500 px-2 pt-1 text-xl break-all w-72 focus:border-yellow-500 transition ease-in-out duration-200"
        />

        <input
          value={tran}
          type="text"
          placeholder="Translation"
          onChange={(e) => setTran(e.target.value)}
          className="outline-none border-b-2 border-gray-500 px-2 pt-1 text-xl break-all w-72 focus:border-yellow-500 transition ease-in-out duration-200"
        />

        <div className="word-item-set flex gap-3">
          <MdAdd
            onClick={add}
            id="word-item-set-add"
            size="28px"
            className="cursor-pointer"
          />
          <MdDelete
            onClick={() => setAdd(false)}
            id="word-item-set-del"
            size="24px"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
