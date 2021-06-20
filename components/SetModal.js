import Modal from "react-modal";
import { useState } from "react";

export default function SetModal({
  setIsPublic,
  err,
  setErr,
  setProjectName,
  projectName,
  checkAndCreate,
  theme,
  isModalOpen,
  setIsModalOpen,
}) {
  function modalClosed(e) {
    setErr(false);
    setProjectName("");
  }
  return (
    <Modal
      onAfterClose={modalClosed}
      className={`flex flex-col gap-3 items-center outline-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-72 pb-5 border-2 border-gray-400 rounded-3xl overflow-hidden mobile:w-72 mobile:h-56 ${
        theme === "dark" && "bg-dark"
      }`}
      isOpen={isModalOpen}
      onRequestClose={(_) => setIsModalOpen(false)}
    >
      <div className="flex flex-col gap-8 w-full h-full justify-center items-center bg-transparent mobile:gap-4">
        <p
          className={`text-xl mt-5 mobile:text-base ${
            theme === "dark" && "bg-dark text-gray-50"
          }`}
        >
          Enter a project name
        </p>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value.slice(0, 36))}
          className={`outline-none border-2 rounded-md border-gray-500 py-2 px-2 text-xl mobile:py-1 mobile:px-1 mobile:text-sm ${
            theme === "dark" && "bg-dark border-gray-300 text-gray-100"
          }`}
          type="text"
        />
        {err && (
          <p className="text-red-600 text-lg bg-transparent mobile:text-sm">
            Project name must be different
          </p>
        )}
        <div className="bg-transparent flex">
          <p
            className={`bg-transparent mr-4 text-lg mobile:text-sm ${
              theme === "dark" && "text-gray-100"
            }`}
          >
            public :
          </p>
          <input
            onChange={(e) => setIsPublic(e.target.checked)}
            type="checkbox"
            name=""
            id="checkBox"
            className="mt-2 -ml-2 h-4 w-4 mobile:h-3 mobile:w-3 mobile:mt-1.5"
          />
        </div>
        <button
          onClick={checkAndCreate}
          className={`focus:outline-none px-5 py-1 border border-gray-500 text-lg rounded-md mobile:text-sm mobile:mt-2 ${
            theme === "dark" && "border-gray-50 text-gray-100"
          }`}
        >
          Create
        </button>
      </div>
    </Modal>
  );
}
