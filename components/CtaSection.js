import Link from 'next/link';

function CtaSection() {
    return (
        <section className="cta-section">
            <div className="container">
                <h2>Think big</h2>
                <p>Whether you're a reader or a writer</p>
                <Link href="/register">
                    <a className="btn">Get started</a>
                </Link>
            </div>
        </section>
    );
}

export default CtaSection;