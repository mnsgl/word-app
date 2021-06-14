export default function DText({ text, theme, kind, sent }) {
  let isKind = kind && "mr-5 text-gray-400";
  let isSent =
    sent && "bg-transparent w-full col-start-1 col-span-3 mt-4 text-center";
  return (
    <span
      className={`border-gray-300 px-3 text-lg ${
        theme === "dark" && "bg-dark border-blue-200"
      } ${isKind} ${isSent}`}
    >
      {text}
    </span>
  );
}
