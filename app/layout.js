import "../src/client/foundation/styles/global.css";

import { Header } from "../src/client/foundation/components/navs/Header/Header";
import { Footer } from "../src/client/foundation/components/navs/Footer";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html>
        <body>
          <div>
            <Header />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </Providers>
  );
}
