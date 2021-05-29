import { useRouter } from "next/router";
import { MdAdd, MdSave, MdKeyboardBackspace } from "react-icons/md";
import Head from "next/head";
import WordItem from "../../components/worditem/WordItem";
import { useEffect, useState } from "react";
import AddWordItem from "../../components/worditem/AddWordItem";
import Loading from "../../components/Loading";
import LogOut from "../../components/LogOut";
export default function Set() {
  let router = useRouter();
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(async () => {
    if (router.query.set_name) {
      await fetch(
        `/api/set/word/${sessionStorage.getItem("userName")}/${
          router.query.set_name
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [router.query.set_name]);
  if (typeof window !== "undefined" && !sessionStorage.getItem("userName")) {
    router.push("/user/signin");
  }
  return (
    <>
      <Head>
        <title>Set-{router.query.set_name}</title>
      </Head>
      <div className="container h-screen w-full mx-auto box-content">
        <LogOut />
        <div className="w-4/5 mx-auto h-full flex flex-col">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="back items-center  w-full h-16 mb-10 mt-5 pl-5 pr-10">
                <div className="flex justify-between h-10">
                  <MdKeyboardBackspace
                    onClick={() => router.back()}
                    size="2.3em"
                    className="arr cursor-pointer"
                  />
                </div>
                <div>
                  <p className="text-center text-4xl">
                    {router.query.set_name?.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="items w-full h-full py-3 px-4 overflow-scroll">
                {data
                  .sort((a, b) => a._id - b._id)
                  .map((item, index) => (
                    <div key={index}>
                      <WordItem data={item} setData={setData} />
                    </div>
                  ))}
                {add && (
                  <div>
                    <AddWordItem
                      data={data}
                      setData={setData}
                      setAdd={setAdd}
                    />
                  </div>
                )}
                <div className="head flex justify-center items-center w-full h-16 mb-5 mt-5">
                  <MdAdd
                    onClick={() => setAdd(true)}
                    size="3em"
                    className="cursor-pointer rounded-full"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/*
export async function getStaticPaths(context) {
  const response = await fetch("/api/set/" + localStorage.getItem("userName"));
  const res = await response.json();
  const path = {};
  if (response.status === 200) {
    path = res.map((set) => ({
      params: { set_name: `${set.setName}` },
    }));
  }
  return { paths, fallback: false };
}
*/
/*
                      <MdDelete
                        size="26px"
                        className="rounded-md bg-transparent ml-8"
                      />
*/
