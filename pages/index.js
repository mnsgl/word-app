import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../components/Loading";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("userName")) {
      router.push("/user/signin");
    } else {
      router.push("/sets");
    }
  }, []);
  return (
    <div className="flex items-center h-screen">
      <Loading />;
    </div>
  );
}
