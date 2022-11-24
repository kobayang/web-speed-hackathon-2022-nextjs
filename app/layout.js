import "../src/client/foundation/styles/global.css";

import { Header } from "../src/client/foundation/components/navs/Header/Header";
import { Footer } from "../src/client/foundation/components/navs/Footer";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div>
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
