import { useEffect, useRef, useState } from 'react';

function TextBox(props) {

    const [style, setStyle] = useState({});
    const textBox = useRef(null);

    const handleChange = async e => {
        props.onChange(e);
        await setStyle({ height: 'auto' });
        setStyle({ height: textBox.current?.scrollHeight });
    };

    useEffect(() => setStyle({ height: textBox.current.scrollHeight }), []);

    return (
        <textarea
            {...props}
            ref={textBox}
            style={style}
            onChange={handleChange}
        />
    );
}

export default TextBox;