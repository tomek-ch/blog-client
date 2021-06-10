import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from './Spinner';

function withLoading(component) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const end = () => {
            setIsLoading(false);

            if (window.location.hash) {
                const { hash } = window.location;
                const comment = document.querySelector(`[id="${hash.substring(1)}"]`);
                comment.scrollIntoView();
            }
        };

        router.events.on('routeChangeStart', () => setIsLoading(true));
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);
    }, []);

    return isLoading ? <Spinner /> : component;
}

export default withLoading;