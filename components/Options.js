import { useState } from 'react';
import { container } from '../styles/Options.module.css';

function Options({ toggleText, renderOptions, optionId }) {

    const [optionsOpen, setOptionsOpen] = useState(false);
    const toggle = () => setOptionsOpen(prev => !prev);
    const hideOptions = e => {
        if (!e.relatedTarget?.dataset[optionId])
            setOptionsOpen(false);
    };

    return (
        <div className={container}>
            <button
                onClick={toggle}
                onBlur={hideOptions}
            >
                {toggleText}
            </button>
            {optionsOpen ? renderOptions(toggle) : ''}
        </div>
    );
}

export default Options;