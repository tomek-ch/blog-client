import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from './Spinner';

function withLoading(component) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeStart', () => setIsLoading(true));
        router.events.on('routeChangeComplete', () => setIsLoading(false));
        router.events.on('routeChangeError', () => setIsLoading(false));
    }, []);

    return isLoading ? <Spinner /> : component;
}

export default withLoading;