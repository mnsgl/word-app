export default function DText({ text, theme, kind, sent }) {
  let isKind = kind && "mr-5 text-gray-400";
  let isSent =
    sent &&
    "bg-transparent w-full col-start-1 col-span-3 mt-4 text-center mobile:col-span-1 mobile:mt-0";
  return (
    <span
      className={`border-gray-300 px-3 text-lg mobile:text-sm mobile:text-center mobile:px-0 mobile:h-6 mobile:mb-2 ${
        theme === "dark" && "bg-dark border-blue-200"
      } ${isKind} ${isSent}`}
    >
      {text}
    </span>
  );
}
