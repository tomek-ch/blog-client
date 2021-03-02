import { ContextProvider } from '../components/Context';
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <ContextProvider>
            <Header />
            <Component {...pageProps} />
        </ContextProvider>
    );
}

export default MyApp;
