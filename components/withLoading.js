import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function withLoading(component) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeStart', () => setIsLoading(true));
        router.events.on('routeChangeComplete', () => setIsLoading(false));
        router.events.on('routeChangeError', () => setIsLoading(false));
    }, []);

    return isLoading ? 'Loading...' : component;
}

export default withLoading;