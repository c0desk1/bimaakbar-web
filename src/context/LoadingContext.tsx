// src/context/LoadingContext.tsx
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<{
  isLoading: boolean;
  setLoading: (val: boolean) => void;
}>({
  isLoading: false,
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}