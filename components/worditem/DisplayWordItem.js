import { useRouter } from "next/router";
import { useContext } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { SetsContext } from "../../context/setcontext/SetProvider";
export default function DisplayWordItem({ data, setEdit, setData }) {
  const [, setSets] = useContext(SetsContext);
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
    <div className="item w-full h-18 mb-2 rounded-lg hover:border-opacity-0 cursor-pointer border-2 border-gray-300 shadow hover:shadow-lg transition ease-in-out duration-300 px-5 select-none">
      <div className="flex justify-between items-center h-full">
        <Item text={data.word} />
        <Item text={data.pro} />
        <Item text={data.tran} />
        <div className="word-item-display flex gap-3">
          <MdEdit
            onClick={(e) => setEdit((p) => !p)}
            id="word-item-dis-edit"
            size="25px"
            className="cursor-pointer"
          />
          <MdDelete
            onClick={delItem}
            id="word-item-dis-del"
            size="24px"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
function Item({ text }) {
  return (
    <span className="border-b-2 border-gray-300 w-72 pl-3 text-lg">{text}</span>
  );
}
