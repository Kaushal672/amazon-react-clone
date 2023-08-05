import { useEffect } from 'react';

const useBgColor = (bgColor, defaultColor) => {
    useEffect(() => {
        document.body.style.backgroundColor = bgColor;
        return () => (document.body.style.backgroundColor = defaultColor);
    }, [bgColor, defaultColor]);
};

export default useBgColor;
