import { createContext, useContext, useState, useMemo } from 'react';
type ContextValue = {
  isLoading: boolean;
  setLoading: Function;
  isSidebarOpen: boolean;
  setSidebarOpen: Function;
};

const AppContext = createContext({} as ContextValue);

type Props = {
  children: JSX.Element;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const setLoading = (v: boolean): void => {
    setIsLoading(v);
  };
  const setSidebarOpen = (v: boolean): void => {
    setIsSidebarOpen(v);
  };

  const contextValue = useMemo((): ContextValue => {
    return {
      isLoading,
      setLoading,
      isSidebarOpen,
      setSidebarOpen
    };
  }, [isLoading, isSidebarOpen]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
