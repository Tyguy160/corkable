import '../styles/globals.css';
import { useState } from 'react';
import Nav from '../components/Nav';
import Login from './login';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthContext from '../context/AuthContext';
import getCurrentUser from '../api/getCurrentUser';
import useAuth from '../hooks/useAuth';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  queryClient.fetchQuery('me', getCurrentUser);

  const [authenticated, setAuthenticated] = useState();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          login: () => setAuthenticated(true),
          logout: () => setAuthenticated(false),
          isAuthenticated: authenticated,
        }}>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <Component {...pageProps} />
          <footer className="flex flex-row items-center justify-center h-16">
            <span className="text-sm font-medium tracking-wide text-gray-600">
              Made by {''}
              <a href="https://tylerstephenmaschino.com" className="underline">
                Tyler Stephen Maschino
              </a>
            </span>
          </footer>
        </div>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
