export default function EText({ text, setText, theme, type, kind }) {
  let isKind = kind ? "w-24 mr-5 text-gray-400 -mt-2" : "w-72";
  let isSent =
    type === "sentence" && "bg-transparent w-full col-start-1 col-span-3 mt-4";
  return (
    <input
      value={text}
      type="text"
      placeholder={type}
      onChange={(e) => setText(e.target.value)}
      className={`outline-none border-b border-gray-500 px-2 pt-1 text-xl break-all  focus:border-yellow-500 transition ease-in-out duration-200 bg-transparent ${
        theme === "dark" && "text-gray-100 border-blue-600"
      } ${isKind} ${isSent}`}
    />
  );
}
