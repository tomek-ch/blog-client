import { useEffect, useRef, useState } from 'react';

function TextBox(props) {

    const [style, setStyle] = useState({});
    const textBox = useRef(null);

    useEffect(async () => {
        await setStyle({ height: 'auto' });
        setStyle({
            height: parseInt(textBox.current?.scrollHeight) + 1,
        });
    }, [props.value]);

    return (
        <textarea
            {...props}
            ref={textBox}
            style={style}
        />
    );
}

export default TextBox;