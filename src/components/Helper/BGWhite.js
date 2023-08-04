import { useEffect } from 'react';

const BGWhite = () => {
    useEffect(() => {
        document.body.style.backgroundColor = 'white';
        return () => (document.body.style.backgroundColor = '#e3e6e6');
    });
    return null;
};

export default BGWhite;
