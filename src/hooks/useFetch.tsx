import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = (
    url = '',
    { prevent = false, refetch = false, setRefetch = (refetch: boolean) => refetch } = {}
) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [abortController, setAbortController] = useState<AbortController | null>(null);

    useEffect(() => {
        setAbortController(new AbortController());
    }, []);

    const hitApi = useCallback(async () => {
        try {
            if (!url) return;
            setLoading(true);
            axios.defaults.responseType = 'json';
            const { data } = await axios.get(url, {
                signal: abortController?.signal
            });
            if (data) {
                setData(data);
                setLoading(false);
                setRefetch(false);
            } else {
                throw Error(data);
            }
        } catch (err) {
            console.log(err as Error)
            setLoading(false);
            setRefetch(false);
        }
    }, [abortController?.signal, setRefetch, url]);

    const reset = () => {
        setLoading(false);
        setData(null);
        setError(null);
    };

    useEffect(() => {
        if (!prevent) {
            hitApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevent]);

    useEffect(() => {
        if (refetch) {
            setData(null);
            setError(null);
            hitApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch]);

    useEffect(() => {
        return () => abortController?.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, loading, error, reset };
};

export default useFetch;
