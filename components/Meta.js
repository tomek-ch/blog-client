import Head from 'next/head';

function Meta({ title, description}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
        </Head>
    );
}

export default Meta;