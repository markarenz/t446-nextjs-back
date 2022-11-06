import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

function MyApp({
  Component,
  pageProps
}: AppProps<{
  session: Session;
}>) {
  const session = pageProps?.session;
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
