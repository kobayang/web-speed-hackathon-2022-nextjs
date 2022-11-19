import { AuthContextProvider } from "../src/client/foundation/contexts/AuthContext";
import { GlobalStyle } from "../src/client/foundation/styles/GlobalStyle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

MyApp.getInitialProps = async () => ({ pageProps: {} });

export default MyApp;
