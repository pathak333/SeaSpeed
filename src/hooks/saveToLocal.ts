import { useEffect, useState } from "react";


function useLocalStorage(key: string, initialValue: any) {
    const storedValue = localStorage.getItem(key);
    const initalValue = storedValue ? JSON.parse(storedValue) : initialValue;

    const [value, setValue] = useState(initalValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // Function to delete the stored value from localStorage
    const deleteValue = () => {
        localStorage.removeItem(key);
        setValue(initialValue); // Reset the state to its initial value
    };

    return [value, setValue, deleteValue];
}

export default useLocalStorage;