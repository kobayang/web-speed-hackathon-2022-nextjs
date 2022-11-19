import "../styles/global.css";

import { AuthContextProvider } from "../src/client/foundation/contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

MyApp.getInitialProps = async () => ({ pageProps: {} });

export default MyApp;
