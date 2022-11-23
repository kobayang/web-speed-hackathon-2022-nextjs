import Head from "next/head";
import { AuthContextProvider } from "../src/client/foundation/contexts/AuthContext";
import { GlobalStyle } from "../src/client/foundation/styles/GlobalStyle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <GlobalStyle />
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
