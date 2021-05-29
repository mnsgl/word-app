import { useRouter } from "next/router";
import { useContext } from "react";
import { SetsContext } from "../context/setcontext/SetProvider";

export default function LogOut() {
  const router = useRouter();
  const [, setSets] = useContext(SetsContext);
  function logOut(e) {
    e.preventDefault();
    setSets([]);
    sessionStorage.removeItem("userName");
    router.push("/user/signin");
  }
  return (
    <button
      onClick={logOut}
      className="focus:outline-none px-3 py-2 border-2 text-lg border-yellow-500 text-yellow-500 absolute right-10 top-5 rounded-md"
    >
      Log out
    </button>
  );
}
