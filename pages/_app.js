import "../styles/global.css";

import { StyleSheetManager } from "styled-components";
import { AuthContextProvider } from "../src/client/foundation/contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StyleSheetManager disableCSSOMInjection>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </StyleSheetManager>
    </>
  );
}

MyApp.getInitialProps = async () => ({ pageProps: {} });

export default MyApp;
