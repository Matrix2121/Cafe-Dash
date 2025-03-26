import { useState } from "react";

const useValidation = () => {
    const regexPattern = /\S+@\S+\.\S+/;
    const [error, setError] = useState('');

    const emailValidation = (email: string): boolean => {
        if (!regexPattern.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        return true;
    };

    const emptyParams = (...params: string[]): boolean => {
        if (params.length === 0 || params.some(p => !p.trim())) {
            setError('Please fill in all fields.');
            return false;
        }
        return true;
    };
    return {emailValidation, emptyParams};
}

export default useValidation;