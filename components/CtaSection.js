import Link from 'next/link';
import { ctaSection, container, heading } from '../styles/CtaSection.module.css';
import { ctaBtn } from '../styles/CtaBtn.module.css';

function CtaSection() {
    return (
        <section className={ctaSection}>
            <div className={container}>
                <h2 className={heading}>Think big</h2>
                <p>Whether you're a reader or a writer</p>
                <Link href="/register">
                    <a className={ctaBtn}>Get started</a>
                </Link>
            </div>
        </section>
    );
}

export default CtaSection;