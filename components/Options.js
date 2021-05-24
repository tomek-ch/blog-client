import { useState } from 'react';
import style, { container } from '../styles/Options.module.css';

function Options({ toggleText, renderOptions, optionId }) {

    const [optionsOpen, setOptionsOpen] = useState(false);
    const toggle = () => setOptionsOpen(prev => !prev);
    const hideOptions = e => {
        if (!e.relatedTarget?.dataset[optionId])
            setOptionsOpen(false);
    };

    const toggleStyle = {};
    if (optionsOpen)
        toggleStyle.backgroundColor = 'var(--foreground)';

    if (toggleText === '⋯') {
        toggleStyle.width = '2em';
        toggleStyle.height = '2em';
        toggleStyle.fontWeight = 'bold';
    } else {
        toggleStyle.padding = '0.5em 1em';
    }

    return (
        <div className={container}>
            <button
                onClick={toggle}
                onBlur={hideOptions}
                className={style.toggle}
                style={toggleStyle}
            >
                {toggleText}
            </button>
            {optionsOpen ? renderOptions(hideOptions) : ''}
        </div>
    );
}

export default Options;