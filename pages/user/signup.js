import { useContext, useEffect, useState } from "react";
import useCheck from "../../components/useCheck";
import Head from "next/head";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import Theme from "../../components/Theme";
import { ThemeContext } from "../../context/themeContext/ThemeProvider";
import Link from "next/link";
export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [errs, setErrs] = useState({});
  const [theme] = useContext(ThemeContext);
  async function check(e) {
    e.preventDefault();
    setErrs({});
    let errs = useCheck(name, pass, mail);
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
        <div
          className={`h-screen flex justify-center items-center ${
            theme === "dark" && "bg-dark"
          }`}
        >
          <Theme />
          {loading ? (
            <Loading />
          ) : (
            <form
              className={`flex flex-col justify-center w-96 h-144 pb-10 rounded-3xl shadow-3xl mobile:h-100 mobile:w-72 mobile:pb-3 ${
                theme === "dark" && "bg-dark shadow-dark"
              }`}
            >
              <p
                className={`font-open mb-16 mx-auto text-5xl mobile:text-3xl mobile:mb-5 ${
                  theme === "dark" && "bg-dark text-gray-100"
                }`}
              >
                Sign Up
              </p>
              <div
                className={`w-4/5 mb-5 mx-auto mobile:w-3/5 mobile:mb-2 ${
                  theme === "dark" && "bg-dark"
                }`}
              >
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`font-open w-full mx-auto mb-1 text-xl outline-none px-2 py-2 border-2 border-gray-300 focus:border-blue-600 rounded-lg transition duration-300 ease-in-out mobile:text-sm mobile:border ${
                    theme === "dark" && "bg-dark text-gray-100"
                  }`}
                  type="text"
                  placeholder="Username..."
                />
                {errs?.name && Error(errs.name)}
              </div>
              <div
                className={`w-4/5 mb-5 mx-auto mobile:w-3/5 mobile:mb-2 ${
                  theme === "dark" && "bg-dark"
                }`}
              >
                <input
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className={`font-open w-full mb-1 text-xl outline-none px-2 py-2 border-2 border-gray-300 focus:border-blue-600 rounded-lg transition duration-300 ease-in-out mobile:text-sm mobile:border ${
                    theme === "dark" && "bg-dark text-gray-100 shadow-dark"
                  }`}
                  type="text"
                  placeholder="Mail..."
                />
                {errs?.mail && Error(errs.mail)}
              </div>
              <div
                className={`w-4/5 mb-5 mx-auto mobile:w-3/5 mobile:mb-2 ${
                  theme === "dark" && "bg-dark"
                }`}
              >
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className={`font-open w-full text-xl outline-none px-2 py-2 border-2 border-gray-300 focus:border-blue-600 rounded-lg transition duration-300 ease-in-out mobile:text-sm mobile:border ${
                    theme === "dark" && "bg-dark text-gray-100"
                  }`}
                  type="Password"
                  placeholder="Password..."
                />
                {errs?.pass && Error(errs.pass)}
              </div>
              <button
                onClick={check}
                className={`font-open outline-none focus:outline-none w-1/2 text-2xl text-white bg-blue-500 font-sans mx-auto mt-12 py-2 hover:bg-white hover:text-blue-500 border-2 hover:border-blue-500 transition ease-in-out duration-200 rounded-md mobile:text-base mobile:mt-5 ${
                  theme === "dark" && "text-dark border-dark hover:bg-dark"
                }`}
              >
                Sign Up
              </button>
              <Link href="/user/signin">
                <p className="text-center mt-3 hover:underline cursor-pointer text-purple-700 bg-transparent mobile:text-gray-100 mobile:text-sm">
                  Do you have an account?
                </p>
              </Link>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

function Error(msg) {
  return (
    <div className="font-open text-red-500 text-center bg-transparent mobile:rounded-sm mobile:text-sm">
      {msg}
    </div>
  );
}
