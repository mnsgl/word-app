import Loader from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full h-full text-3xl flex flex-col gap-5 justify-center items-center">
      <Loader type="Triangle" color="orange" />
      <p>Loading</p>
    </div>
  );
}
