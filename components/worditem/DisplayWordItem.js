import { MdEdit, MdDelete } from "react-icons/md";
export default function DisplayWordItem({ data, setEdit, setData }) {
  function delItem(e) {
    setData((prev) => prev.filter((item) => item._id !== data._id));
  }
  return (
    <div className="item w-full h-18 mb-2 rounded-lg hover:border-opacity-0 cursor-pointer border-2 border-gray-300 shadow hover:shadow-lg transition ease-in-out duration-300 px-5 mobile:px-2 mobile:h-auto mobile:pt-4 select-none">
      <div className="flex justify-between items-center h-full mobile:flex-col mobile:pt-2 mobile:gap-5">
        <Item text={data.word} />
        <Item text={data.pro} />
        <Item text={data.tran} />
        <div className="word-item-display flex gap-3 mobile:gap-10 mobile:mb-3 mobile:mt-3">
          <MdEdit
            onClick={(e) => setEdit((p) => !p)}
            id="word-item-dis-edit"
            size="25px"
            className="cursor-pointer laptop-7 tablet:w-5 mobile:w-4"
          />
          <MdDelete
            onClick={delItem}
            id="word-item-dis-del"
            size="24px"
            className="cursor-pointer laptop-7 tablet:w-5 mobile:w-4"
          />
        </div>
      </div>
    </div>
  );
}
function Item({ text }) {
  return (
    <span className="border-b-2 border-gray-300 w-72 pl-3 text-lg laptop:w-36 laptop:text-sm  tablet:w-28 tablet:text-xs mobile:w-64">
      {text}
    </span>
  );
}
