import { AppProps } from 'next/app';
import Head from 'next/head';
import { ProjectContextProvider } from '../ProjectContext';
import { SupabaseContextProvider } from '@nextnexus/nextnexus-supabase-context';
import { Next Nexus PlatformUserProvider } from '@nextnexus/nextnexus-user-context';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next Nexus Podium</title>
      </Head>
      <SupabaseContextProvider>
        <Next Nexus PlatformUserProvider>
          <ProjectContextProvider>
            <main>
              <Component {...pageProps} />
            </main>
          </ProjectContextProvider>
        </Next Nexus PlatformUserProvider>
      </SupabaseContextProvider>
    </>
  );
}

export default App;
