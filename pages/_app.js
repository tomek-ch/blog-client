import { ContextProvider } from '../components/Context';
import Header from '../components/header/Header';
import '../styles/globals.css';
import Meta from '../components/Meta';
import withLoading from '../components/withLoading';

function MyApp({ Component, pageProps }) {
    return (
        <ContextProvider>
            <Meta />
            <Header />
            {withLoading(<Component {...pageProps} />)}
        </ContextProvider>
    );
}

export default MyApp;
