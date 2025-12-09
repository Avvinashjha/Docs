import { useEffect, useState } from "react";

function useLocalStorage(key: string, initialValue: string){
    // load initial value
    const [storedValues, setStoredValues] = useState(()=>{
        const item = localStorage.getItem(key);
        return item !== null ? item : initialValue;
    })

    // update local storage whenever the value changes
    useEffect(()=>{
        localStorage.setItem(key, storedValues);
    }, [key, storedValues])
    return [storedValues, setStoredValues] as const;
}

export default useLocalStorage;