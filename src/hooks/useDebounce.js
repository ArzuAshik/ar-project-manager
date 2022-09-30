
// import { useRef } from 'react';
// export default function useDebounce(time = 1000) {
//     const timerRef = useRef(null);

//     const handleDebounce = (callbackFunction) => {
//         if (timerRef) clearTimeout(timerRef.current);
//         timerRef.current = setTimeout(callbackFunction, time);
//     };

//     return handleDebounce;
// }



import { useEffect } from 'react';
import useTimeout from './useTimeout';

export default function useDebounce(callback = () => { }, delay = 1000, dependencies = []) {
    const { reset, clear } = useTimeout(callback, delay);
    useEffect(reset, [...dependencies, reset]);
    // eslint-disable-next-line
    useEffect(clear, []);
}
