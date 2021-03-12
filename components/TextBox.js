import { useRef, useState } from 'react';

function TextBox(props) {

    const [style, setStyle] = useState({});
    const textBox = useRef(null);

    const handleChange = e => {
        props.onChange(e);
        setStyle({ height: textBox.current.scrollHeight });
    };


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