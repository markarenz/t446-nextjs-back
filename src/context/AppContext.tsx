import { createContext, useContext, useState, useMemo } from 'react';
type ContextValue = {
  userRole: string;
  isLoggedIn: boolean;
  authLogin: Function;
  authLogout: Function;
  isLoading: boolean;
  setLoading: Function;
  isSidebarOpen: boolean;
  setSidebarOpen: Function;
};

const initialState: ContextValue = {
  userRole: '',
  isLoggedIn: false,
  authLogin: () => {},
  authLogout: () => {},
  isLoading: false,
  setLoading: () => {},
  isSidebarOpen: false,
  setSidebarOpen: () => {}
};

const AppContext = createContext(initialState);

type Props = {
  children: JSX.Element;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const authLogin = (username: string, password: string) => {
    const loginStr = `${username}|${password}`;
    let role = '';
    if (loginStr === process.env.USER_ADMIN) {
      role = 'admin';
    }
    if (loginStr === process.env.USER_HISTORIAN) {
      role = 'historian';
    }
    setUserRole(role);
    setIsLoggedIn(role !== '');
  };

  const authLogout = () => {
    setUserRole('');
    setIsLoggedIn(false);
  };
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
      authLogin,
      authLogout,
      isLoading,
      setLoading,
      isSidebarOpen,
      setSidebarOpen
    };
  }, [userRole, isLoggedIn, authLogin, authLogout, isLoading, setLoading]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
