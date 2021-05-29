import { useEffect, useState } from "react";
import useCheck from "../../components/useCheck";
import Head from "next/head";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [errs, setErrs] = useState({});
  async function check(e) {
    e.preventDefault();
    setErrs({});
    let errs = useCheck(name, mail, pass);
    setErrs(errs);

    if (!Object.keys(errs).length) {
      const respons = await fetch("/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mail,
          pass,
        }),
      });

      if (respons.status === 203) {
        setErrs({ pass: "Username or Mail is already used" });
      }
      if (respons.status === 201) {
        router.push("/user/signin");
      }
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("userName")) {
        router.back();
      } else {
        setLoading(false);
      }
    }
  }, []);
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="container mx-auto h-screen">
        <div className="h-screen flex justify-center items-center">
          {loading ? (
            <Loading />
          ) : (
            <form className="flex flex-col justify-center w-96 h-144 pb-10 rounded-3xl shadow-3xl">
              <p className="font-open mb-16 mx-auto text-5xl">Sign Up</p>
              <div className="w-4/5 mb-5 mx-auto">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-open w-full mx-auto mb-3 text-xl outline-none px-2 py-2 border-2 border-gray-300 focus:border-blue-600 rounded-lg transition duration-300 ease-in-out"
                  type="text"
                  placeholder="Username..."
                />
                {errs?.name && Error(errs.name)}
              </div>
              <div className="w-4/5 mb-5 mx-auto">
                <input
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="font-open w-full text-xl outline-none px-2 py-2 border-2 border-gray-300 focus:border-blue-600 rounded-lg transition duration-300 ease-in-out"
                  type="text"
                  placeholder="Mail..."
                />
                {errs?.mail && Error(errs.mail)}
              </div>
              <div className="w-4/5 mb-5 mx-auto">
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="font-open w-full text-xl outline-none px-2 py-2 border-2 border-gray-300 focus:border-blue-600 rounded-lg transition duration-300 ease-in-out"
                  type="Password"
                  placeholder="Password..."
                />
                {errs?.pass && Error(errs.pass)}
              </div>
              <button
                onClick={check}
                className="font-open outline-none focus:outline-none w-1/2 text-2xl text-white bg-blue-500 font-sans mx-auto mt-12 py-2 hover:bg-white hover:text-blue-500 border-2 hover:border-blue-500 transition ease-in-out duration-200"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

function Error(msg) {
  return <div className="font-open text-red-500 text-center">{msg}</div>;
}
