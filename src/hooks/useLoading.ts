import { useState } from "react";

export default function useLoading() {
    const [isLoading, setIsLoading] = useState(false);

    const load = () => setIsLoading(true);
    const stopLoad = () => setIsLoading(false);

    return {
        isLoading,
        load,
        stopLoad
    }
}