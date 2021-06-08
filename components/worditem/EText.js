export default function EText({ text, setText, theme, type, kind }) {
  return (
    <input
      value={text}
      type="text"
      placeholder={type}
      onChange={(e) => setText(e.target.value)}
      className={`outline-none border-b border-gray-500 px-2 pt-1 text-xl break-all  focus:border-yellow-500 transition ease-in-out duration-200 bg-transparent ${
        theme === "dark" && "text-gray-100 border-blue-600"
      } ${kind ? "w-24 mr-5 text-gray-400" : "w-72"}`}
    />
  );
}
