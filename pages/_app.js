import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { SetProvider } from "../context/setcontext/SetProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ThemeProvider } from "../context/themeContext/ThemeProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <SetProvider>
        <Component {...pageProps} />
      </SetProvider>
    </ThemeProvider>
  );
}

export default MyApp;
