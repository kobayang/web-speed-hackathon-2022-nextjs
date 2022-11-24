import Head from "next/head";
import { AuthContextProvider } from "../src/client/foundation/contexts/AuthContext";

import "../src/client/foundation/styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Head>
          <title>CyberTicket</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
