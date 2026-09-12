import { AppProps } from 'next/app';
import Head from 'next/head';
import { ProjectContextProvider } from '../ProjectContext';
import { SupabaseContextProvider } from '@nextnexus/nextnexus-supabase-context';
import { NextNexusUserProvider } from '@nextnexus/nextnexus-user-context';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next Nexus Podium</title>
      </Head>
      <SupabaseContextProvider>
        <NextNexusUserProvider>
          <ProjectContextProvider>
            <main>
              <Component {...pageProps} />
            </main>
          </ProjectContextProvider>
        </NextNexusUserProvider>
      </SupabaseContextProvider>
    </>
  );
}

export default App;
