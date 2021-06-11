import Head from "next/head";
import { MdAdd, MdDelete } from "react-icons/md";
import Item from "../../components/Item";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { SetsContext } from "../../context/setcontext/SetProvider";
import Modal from "react-modal";
import { useRouter } from "next/router";
import LogOut from "../../components/LogOut";
import { ThemeContext } from "../../context/themeContext/ThemeProvider";
import Theme from "../../components/Theme";

function Sets() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sets, setSets] = useContext(SetsContext);
  const [theme] = useContext(ThemeContext);
  const [projectName, setProjectName] = useState("");
  const [err, setErr] = useState(false);
  const router = useRouter();

  async function checkAndCreate(e) {
    let userName = sessionStorage.getItem("userName");
    let nameIsValid = sets.find((set) => set.setName === projectName);
    const emptySet = {
      set: {
        setName: projectName,
      },
      user: {
        userName,
      },
    };
    if (nameIsValid) {
      setErr(true);
    } else {
      setIsModalOpen(false);
      setErr(false);
      fetch("api/set/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emptySet),
      })
        .then((res) => res.json())
        .then((info) => {
          setSets((prev) => [...prev, info]);
        });
    }
  }

  function modalClosed(e) {
    setErr(false);
    setProjectName("");
  }

  useEffect(async () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("userName")) {
      router.push("/user/signin");
    }
    if (sets.length === 0) {
      fetch("/api/set/" + sessionStorage.getItem("userName"))
        .then((res) => res.json())
        .then((data) => {
          if (data.length !== 0) {
            setSets(data);
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    Modal.setAppElement("#__next");
  }, [sets]);
  return (
    <>
      <Head>
        <title>Sets</title>
      </Head>
      <div
        className={`container h-screen w-full mx-auto box-content ${
          theme === "dark" && "bg-dark"
        }`}
      >
        <LogOut />
        <Theme />
        <div
          className={`w-3/5 mx-auto h-full flex flex-col ${
            theme === "dark" && "bg-dark"
          }`}
        >
          <Modal
            onAfterClose={modalClosed}
            className={`flex flex-col gap-3 items-center outline-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-72 border-2 border-gray-400 rounded-3xl overflow-hidden ${
              theme === "dark" && "bg-dark"
            }`}
            isOpen={isModalOpen}
            onRequestClose={(_) => setIsModalOpen(false)}
          >
            <div className="flex flex-col gap-8 w-full h-full justify-center items-center bg-transparent">
              <p
                className={`text-xl mt-5 ${
                  theme === "dark" && "bg-dark text-gray-50"
                }`}
              >
                Enter a project name
              </p>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className={`outline-none border-2 rounded-md border-gray-500 py-2 px-2 text-xl ${
                  theme === "dark" && "bg-dark border-gray-300 text-gray-100"
                }`}
                type="text"
              />
              {err && (
                <p className="text-red-600 text-lg bg-transparent">
                  Project name must be different
                </p>
              )}
              <button
                onClick={checkAndCreate}
                className={`focus:outline-none px-5 py-1 border border-gray-500 text-lg rounded-md ${
                  theme === "dark" && "border-gray-50 text-gray-100"
                }`}
              >
                Create
              </button>
            </div>
          </Modal>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div
                className={`head flex justify-center items-center w-full h-16 mb-5 mt-5 ${
                  theme === "dark" && "bg-dark"
                }`}
              >
                <MdAdd
                  size="3em"
                  className="cursor-pointer rounded-full"
                  onClick={(_) => setIsModalOpen(true)}
                />
              </div>
              <div
                className={`items w-full h-full py-3 px-4 overflow-scroll ${
                  theme === "dark" && "bg-dark"
                }`}
              >
                {sets.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Sets;
