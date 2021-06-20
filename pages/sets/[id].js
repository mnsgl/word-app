import { useRouter } from "next/router";
import { MdAdd, MdSave, MdKeyboardBackspace } from "react-icons/md";
import Head from "next/head";
import WordItem from "../../components/worditem/WordItem";
import { useContext, useEffect, useState } from "react";
import AddWordItem from "../../components/worditem/AddWordItem";
import Loading from "../../components/Loading";
import LogOut from "../../components/LogOut";
import React from "react";
import {
  makeStyles,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ThemeContext } from "../../context/themeContext/ThemeProvider";
import Theme from "../../components/Theme";
export default function Set() {
  let classes = useStyles();
  let router = useRouter();
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [curSet, setCurSet] = useState({});
  const [theme] = useContext(ThemeContext);
  const [filter, setFilter] = useState("");

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
                <div className="bg-transparent flex flex-col items-center">
                  <p
                    className={`text-center text-3xl ${
                      theme === "dark" && "bg-dark text-gray-200"
                    }`}
                  >
                    {curSet?.setName.toUpperCase()}
                  </p>
                  <input
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="filter words by kind"
                    className={`w-1/5 h-9 outline-none text-base p-2 my-5 border-2 border-gray-400 rounded-md bg-transparent focus:border-yellow-500 ${
                      theme === "dark" && "text-gray-200"
                    }`}
                  />
                </div>
              </div>
              <div
                className={`items w-full h-full py-3 px-4 overflow-scroll mt-10 ${
                  theme === "dark" && "bg-dark"
                }`}
              >
                {data
                  .filter((word) => {
                    if (filter === "") {
                      return true;
                    } else {
                      return word.kind.search(filter) >= 0;
                    }
                  })
                  .sort((a, b) => a.timeStamp - b.timeStamp)
                  .map((item, index) => (
                    <WordItem key={index} data={item} setData={setData} />
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "black",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
