import { createContext, useContext } from "react";

const OddsModalContext = createContext(null);

export const OddsModalProvider = OddsModalContext.Provider;

export const useOddsModalContext = () => {
  const context = useContext(OddsModalContext);
  return context;
};
