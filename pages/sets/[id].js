import { useRouter } from "next/router";
import { MdAdd, MdSave, MdKeyboardBackspace } from "react-icons/md";
import Head from "next/head";
import WordItem from "../../components/worditem/WordItem";
import { useContext, useEffect, useState } from "react";
import AddWordItem from "../../components/worditem/AddWordItem";
import Loading from "../../components/Loading";
import LogOut from "../../components/LogOut";
import { ThemeContext } from "../../context/themeContext/ThemeProvider";
import Theme from "../../components/Theme";
export default function Set() {
  let router = useRouter();
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [curSet, setCurSet] = useState({});
  const [theme] = useContext(ThemeContext);

  useEffect(async () => {
    if (router.query.id) {
      await fetch("/api/set/word/" + router.query.id)
        .then((res) => res.json())
        .then((data) => {
          setData(data.words);
          setCurSet(data);
          setLoading(false);
        });
    }
  }, [router.query.id]);
  if (typeof window !== "undefined" && !sessionStorage.getItem("userName")) {
    router.push("/user/signin");
  }
  return (
    <>
      <Head>
        <title>Set-{curSet?.setName}</title>
      </Head>
      <div
        className={`container h-screen w-full mx-auto box-content ${
          theme === "dark" && "bg-dark"
        }`}
      >
        <LogOut />
        <div
          className={`w-4/5 mx-auto h-full flex flex-col ${
            theme === "dark" && "bg-dark"
          }`}
        >
          <Theme />
          {loading ? (
            <Loading />
          ) : (
            <>
              <div
                className={`back items-center  w-full h-16 mb-10 mt-5 pl-5 pr-10 ${
                  theme === "dark" && "bg-dark"
                }`}
              >
                <div
                  className={`flex justify-between h-10 ${
                    theme === "dark" && "bg-dark"
                  }`}
                >
                  <MdKeyboardBackspace
                    onClick={() => router.back()}
                    size="2.3em"
                    fill={theme === "dark" ? "white" : "black"}
                    className={`arr cursor-pointer ${
                      theme === "dark" && "bg-dark"
                    }`}
                  />
                </div>
                <div>
                  <p
                    className={`text-center text-3xl ${
                      theme === "dark" && "bg-dark text-gray-200"
                    }`}
                  >
                    {curSet?.setName.toUpperCase()}
                  </p>
                </div>
              </div>
              <div
                className={`items w-full h-full py-3 px-4 overflow-scroll ${
                  theme === "dark" && "bg-dark"
                }`}
              >
                {data
                  //.sort((a, b) => a._id - b._id)
                  .map((item, index) => (
                    <div key={index} className="rounded-lg">
                      <WordItem data={item} setData={setData} />
                    </div>
                  ))}
                {add && (
                  <div className="rounded-xl">
                    <AddWordItem
                      data={data}
                      setData={setData}
                      setAdd={setAdd}
                    />
                  </div>
                )}
                <div
                  className={`head flex justify-center items-center w-full h-16 mb-5 mt-5 ${
                    theme === "dark" && "bg-dark"
                  }`}
                >
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
