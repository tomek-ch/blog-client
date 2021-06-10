import Head from 'next/head';

function Meta({ title = 'Blogg', description = "Join internet's best blog platform and start writing!"}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
            <link rel="icon" href="/favicon.svg" />
        </Head>
    );
}

export default Meta;