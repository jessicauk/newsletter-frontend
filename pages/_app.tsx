import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContext from "../app/context/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Component {...pageProps} />;
    </AppContext>
  );
}
