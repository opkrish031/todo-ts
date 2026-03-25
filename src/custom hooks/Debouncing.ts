import { useEffect, useState } from "react"

const useDebounce = (value: string, delay: number) => {
    const [debouncedVal, setDebouncedVal] = useState<string>("");

    useEffect(()=>{
        const delayHandler = setTimeout(() => {
            setDebouncedVal(value);
        }, delay);

        return () => {
            clearTimeout(delayHandler);
        };
    }, [value, delay]);

  return debouncedVal;
}

export default useDebounce