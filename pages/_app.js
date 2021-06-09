import { useState } from 'react';
import { useRouter } from 'next/router';
import { ContextProvider } from '../components/Context';
import Header from '../components/header/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    router.events.on('routeChangeStart', () => setIsLoading(true));
    router.events.on('routeChangeComplete', () => setIsLoading(false));
    router.events.on('routeChangeError', () => setIsLoading(false));

    return (
        <ContextProvider>
            <Header />
            {
                isLoading
                    ? 'Loading...'
                    : <Component {...pageProps} />
            }
        </ContextProvider>
    );
}

export default MyApp;
