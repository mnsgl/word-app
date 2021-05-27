import DisplayWordItem from "./DisplayWordItem";
import EditWordItem from "./EditWordItem";
import { useEffect, useState } from "react";
export default function WordItem({ data, setData }) {
  const [edit, setEdit] = useState(true);
  return (
    <>
      {edit ? (
        <DisplayWordItem data={data} setData={setData} setEdit={setEdit} />
      ) : (
        <EditWordItem data={data} setData={setData} setEdit={setEdit} />
      )}
    </>
  );
}
