import { RefObject, useEffect } from 'react';

function useOutsideClick<T extends HTMLElement>(ref: RefObject<T>, callback: () => void): void {
    useEffect(() => {
        // Handler to call on outside click
        const handleClickOutside = (event: MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}


export default useOutsideClick;