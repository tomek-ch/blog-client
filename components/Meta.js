import Head from 'next/head';

function Meta({ title, description}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
        </Head>
    );
}

export default Meta;