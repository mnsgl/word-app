import { MdAdd, MdDelete } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { SetsContext } from "../context/setcontext/SetProvider";
export default function Item({ item }) {
  const [, setSets] = useContext(SetsContext);
  function deleteSet(e) {
    let userName = localStorage.getItem("userName");
    setSets((prev) => prev.filter((set) => set.setName !== item.setName));
    fetch(`/api/set/${userName}/${item._id}`, { method: "DELETE" });
  }
  return (
    <div className="item w-full h-18 mb-2 rounded-lg hover:border-opacity-0 cursor-pointer border-2 border-gray-300 shadow hover:shadow-lg transition ease-in-out duration-300 px-5">
      <div className="flex justify-between items-center h-full">
        <Link href={"/sets/" + item.setName}>
          <a>
            <span className="text-1.5xl mobile:text-lg">{item.setName}</span>
          </a>
        </Link>

        <div className="delete">
          <MdDelete
            onClick={deleteSet}
            className="rounded-md bg-transparent ml-8"
          />
        </div>
        <div className="flex flex-col mobile:hidden">
          <span className="text-lg text-font-bold mb-2 mobile:text-base">
            {item?.words?.length} words
          </span>
          <span className="text-base">{item.date}</span>
        </div>
      </div>
    </div>
  );
}

//href="/sets/[set_name]" as={`/sets/${item.setName}`}
