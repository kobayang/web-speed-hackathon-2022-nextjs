import "../src/client/foundation/styles/global.css";

import { Header } from "../src/client/foundation/components/navs/Header/Header";
import { Providers } from "./providers";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html>
        <body>
          <div>
            <Header />
            {children}
          </div>
        </body>
      </html>
    </Providers>
  );
}
