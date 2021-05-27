import Head from "next/head";
import { MdAdd, MdDelete } from "react-icons/md";
import Item from "../../components/Item";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { SetsContext } from "../../context/setcontext/SetProvider";
import Modal from "react-modal";
import { useRouter } from "next/router";

function Sets() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sets, setSets] = useContext(SetsContext);
  const [projectName, setProjectName] = useState("");
  const [err, setErr] = useState(false);

  async function checkAndCreate(e) {
    let userName = localStorage.getItem("userName");
    const response = await fetch(`/api/set/word/${userName}/${projectName}`);
    const res = await response.json();
    if (res.length !== 0) {
      setErr(true);
    } else {
      setIsModalOpen(false);
      setErr(false);
      fetch("api/set/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, setName: projectName }),
      });
    }
  }

  function modalClosed(e) {
    setErr(false);
    setProjectName("");
  }

  useEffect(async () => {
    Modal.setAppElement("#__next");
    if (sets.length === 0) {
      fetch("/api/set/" + localStorage.getItem("userName"))
        .then((res) => res.json())
        .then((data) => {
          setSets(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Sets</title>
      </Head>
      <div className="container h-screen w-full mx-auto box-content">
        <div className="w-4/5 mx-auto h-full flex flex-col">
          <Modal
            onAfterClose={modalClosed}
            className="flex flex-col gap-3 items-center outline-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-56 border-2 border-gray-400 rounded-md"
            isOpen={isModalOpen}
            onRequestClose={(_) => setIsModalOpen(false)}
          >
            <p className="text-xl mt-5">Enter a project name</p>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="outline-none border-2 rounded-md border-gray-500 py-2 px-2 text-xl"
              type="text"
            />
            {err && (
              <p className="text-red-600 text-lg">
                Project name must be different
              </p>
            )}
            <button
              onClick={checkAndCreate}
              className="focus:outline-none px-5 py-1 border border-gray-500 text-lg rounded-md"
            >
              Create
            </button>
          </Modal>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="head flex justify-center items-center w-full h-16 mb-5 mt-5">
                <MdAdd
                  size="3em"
                  className="cursor-pointer rounded-full"
                  onClick={(_) => setIsModalOpen(true)}
                />
              </div>
              <div className="items w-full h-full py-3 mobile:py-1 px-4 overflow-scroll">
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
