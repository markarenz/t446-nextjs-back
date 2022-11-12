import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { AppContextProvider } from '../context/AppContext';

function T446CmsApp({
  Component,
  pageProps
}: AppProps<{
  session: Session;
}>) {
  const session = pageProps?.session;
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  );
}

export default T446CmsApp;
