"use client";

import { useCallback, useContext } from "react";

const SelectKeyContext = createContext(null);

export const SelectKeyProvider = SelectKeyContext.Provider;

export const useSelectKeyContext = () => {
  const context = useContext(SelectKeyContext);
  return context;
};

export function KeySelect({ children }) {
  const { setKey, key } = useSelectKeyContext();

  const handleChange = useCallback(
    (e) => {
      setKey(parseInt(e.currentTarget.value, 10));
    },
    [setKey]
  );

  return (
    <select onChange={handleChange} value={key}>
      {children}
    </select>
  );
}
