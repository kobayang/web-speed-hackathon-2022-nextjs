"use client";

import { AuthContextProvider } from "../src/client/foundation/contexts/AuthContext";

export function Providers({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
