import React from 'react';
import { Link } from 'react-router-dom';

function CtaSection() {
    return (
        <section className="cta-section">
            <div className="container">
                <h2>Think big</h2>
                <p>Whether you're a reader or a writer</p>
                <Link to="/register" className="btn">Get started</Link>
            </div>
        </section>
    );
}

export default CtaSection;