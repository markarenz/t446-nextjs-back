import { createContext, useContext, useState, useMemo } from 'react';
type ContextValue = {
  userRole: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  setLoading: Function;
  isSidebarOpen: boolean;
  setSidebarOpen: Function;
};

const initialState: ContextValue = {
  userRole: '',
  isLoggedIn: false,
  isLoading: false,
  setLoading: () => {},
  isSidebarOpen: false,
  setSidebarOpen: () => {}
};

export const AppContext = createContext(initialState);

type Props = {
  children: JSX.Element;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      userRole,
      isLoggedIn,
      isLoading,
      setLoading,
      isSidebarOpen,
      setSidebarOpen
    };
  }, [userRole, isLoggedIn, isLoading, isSidebarOpen]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
