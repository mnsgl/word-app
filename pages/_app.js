import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { SetProvider } from "../context/setcontext/SetProvider";

function MyApp({ Component, pageProps }) {
  return (
    <SetProvider>
      <Component {...pageProps} />
    </SetProvider>
  );
}

export default MyApp;
