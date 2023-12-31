import { useEffect, useState, useRef } from 'react';

const useOutsideClick = (initialValue) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialValue);
    const ref = useRef(null);

    const handleClickOutside = (evt) => {
        if (ref.current && !ref.current.contains(evt.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        document.addEventListener('touchstart', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
            document.removeEventListener(
                'touchstart',
                handleClickOutside,
                true
            );
        };
    }, []);
    return { ref, isComponentVisible, setIsComponentVisible };
};

export default useOutsideClick;
