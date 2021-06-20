import Head from "next/head";
import Modal from "react-modal";
import { MdAdd, MdDelete } from "react-icons/md";
import Item from "../../components/Item";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { SetsContext } from "../../context/setcontext/SetProvider";
import { useRouter } from "next/router";
import LogOut from "../../components/LogOut";
import { ThemeContext } from "../../context/themeContext/ThemeProvider";
import Theme from "../../components/Theme";
import SetModal from "../../components/SetModal";

function Sets() {
  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useContext(SetsContext);
  const [theme] = useContext(ThemeContext);
  const [projectName, setProjectName] = useState("");
  const [err, setErr] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(isPublic);
  }, [isPublic]);
  async function checkAndCreate(e) {
    let userName = sessionStorage.getItem("userName");
    let nameIsValid = sets.find((set) => set.setName === projectName);
    const emptySet = {
      set: {
        setName: projectName,
        created: userName,
        isPublic,
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

  useEffect(async () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("userName")) {
      router.push("/user/signin");
    }
    if (sets.length === 0) {
      fetch("/api/set/userName=" + sessionStorage.getItem("userName"))
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
          className={`w-3/5 mobile:w-full mx-auto h-full flex flex-col ${
            theme === "dark" && "bg-dark"
          }`}
        >
          <SetModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setIsPublic={setIsPublic}
            err={err}
            setErr={setErr}
            setProjectName={setProjectName}
            projectName={projectName}
            checkAndCreate={checkAndCreate}
            theme={theme}
          />
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
                  className="cursor-pointer rounded-full w-10 h-10 mobile:h-7 mobile:w-7"
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
