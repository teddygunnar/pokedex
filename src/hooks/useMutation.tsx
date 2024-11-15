import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useMutation = (url = '') => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState<boolean | null>(null);
    const [abortController, setAbortController] = useState<AbortController>();

    useEffect(() => {
        if (!abortController) {
            setAbortController(new AbortController());
        }
    }, [abortController]);

    const hitApi = useCallback(
        async (params = {}) => {
            try {
                if (!url) return;
                setLoading(true);
                setData(null);
                setError(null);
                axios.defaults.responseType = 'json';
                const { data } = await axios.get(url, {
                    params: params,
                    signal: abortController?.signal
                });
                if (data) {
                    setData(data);
                    setLoading(false);
                } else {
                    throw Error(data);
                }
            } catch (e) {
                console.log(e);
                setError(true);
                setLoading(false);
            }
        },
        [abortController?.signal, url]
    );

    const reset = () => {
        setLoading(false);
        setData(null);
        setError(null);
    };

    return { function: hitApi, data, loading, error, reset };
};

export default useMutation;
