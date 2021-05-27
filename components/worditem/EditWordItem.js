import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { SetsContext } from "../../context/setcontext/SetProvider";
export default function EditWordItem({ data, setEdit, setData }) {
  const [, setSets] = useContext(SetsContext);
  const router = useRouter();
  const [word, setWord] = useState("");
  const [pro, setPro] = useState("");
  const [tran, setTran] = useState("");
  useEffect(() => {
    setWord(data.word);
    setPro(data.pro);
    setTran(data.tran);
  }, []);

  async function edit(e) {
    if (word.length <= 1 && trans.length <= 1) {
      return;
    }
    let newData = null;
    let userName = localStorage.getItem("userName");

    await setData((prev) => {
      let curData = prev.filter((item) => item._id !== data._id);
      newData = { _id: data._id, word, pro, tran };
      return [...curData, newData];
    });
    fetch("/api/set/word/update-word/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newData,
        setName: router.query.set_name,
        userName,
      }),
    });
    setEdit((p) => !p);
  }
  async function delItem(e) {
    let userName = localStorage.getItem("userName");
    await setData((prev) => prev.filter((item) => item._id !== data._id));
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
    setEdit((p) => !p);
    setSets([]);
  }

  return (
    <div className="item w-full h-18 mb-2 rounded-lg hover:border-opacity-0 cursor-pointer border-2 border-gray-300 shadow hover:shadow-lg transition ease-in-out duration-300 px-5 mobile:px-2 mobile:h-auto select-none mobile:pt-5">
      <div className="flex justify-between items-center h-full mobile:flex-col mobile:pt-2 mobile:gap-5 ">
        <input
          value={word}
          type="text"
          placeholder="Word"
          onChange={(e) => setWord(e.target.value)}
          className={`outline-none border-b-2 border-gray-500 px-2 pt-1 text-xl break-all w-72 mobile:text-base mobile:w-64 focus:border-yellow-500 transition ease-in-out duration-200 laptop:w-36 laptop:text-sm tablet:w-24 tablet:text-xs`}
        />

        <input
          value={pro}
          type="text"
          placeholder="Pronunciation"
          onChange={(e) => setPro(e.target.value)}
          className="outline-none border-b-2 border-gray-500 px-2 pt-1 text-xl break-all w-72 mobile:text-base mobile:w-64 focus:border-yellow-500 transition ease-in-out duration-200 laptop:w-36 laptop:text-sm tablet:w-24 tablet:text-xs"
        />

        <input
          value={tran}
          type="text"
          placeholder="Translation"
          onChange={(e) => setTran(e.target.value)}
          className="outline-none border-b-2 border-gray-500 px-2 pt-1 text-xl break-all w-72 mobile:text-base mobile:w-64 focus:border-yellow-500 transition ease-in-out duration-200 laptop:w-36 laptop:text-sm tablet:w-24 tablet:text-xs"
        />

        <div className="word-item-set flex gap-3 mobile:gap-10 mobile:mb-3 mobile:mt-3">
          <MdAdd
            onClick={edit}
            id="word-item-set-add"
            size="28px"
            className="cursor-pointer laptop:w-7 tablet:w-5 mobile:w-4"
          />
          <MdDelete
            onClick={delItem}
            id="word-item-set-del"
            size="24px"
            className="cursor-pointer laptop:w-7 tablet:w-5 mobile:w-4"
          />
        </div>
      </div>
    </div>
  );
}

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
