export default function DText({ text, theme, kind }) {
  return (
    <span
      className={`border-gray-300 px-3 text-lg ${
        theme === "dark" && "bg-dark border-blue-200"
      } ${kind && "mr-5 text-gray-400"}`}
    >
      {text}
    </span>
  );
}
