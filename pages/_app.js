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
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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

MyApp.getInitialProps = async () => ({ pageProps: {} });

export default MyApp;
