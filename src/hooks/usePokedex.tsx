import { useCallback, useEffect, useRef, useState } from 'react'
import { IPokedexRes } from '../config/_models'
import useMutation from './useMutation';

type ModalContent = {
    isOpen: boolean;
    content: {
        name: string;
        pokeIndex: number;
        url: string;
    };
};

interface IUseMutation {
    data: IPokedexRes | null,
    error: boolean,
    function: (pokedexProps: { offset: number, limit: number }) => void;
    loading: boolean,
    reset: () => void;
}

const usePokedex = () => {
    const [data, setData] = useState<IPokedexRes>({
        count: 0,
        next: '',
        previous: '',
        results: []
    });
    const [offset, setOffset] = useState<number>(0);
    const limit: number = 20;
    const [modalContent, setModalContent] = useState<ModalContent>({
        isOpen: false,
        content: {
            name: '',
            pokeIndex: 0,
            url: '',
        }
    })

    const [hasMore, setHasMore] = useState(true);
    const observe = useRef<IntersectionObserver | null>(null);
    const { data: pokedexData, error, function: getPokedex, loading, reset: resetPokedexData } = useMutation('https://pokeapi.co/api/v2/pokemon') as IUseMutation;

    const handleModal = (_content: { name: string, pokeIndex: number, url: string }) => {
        setModalContent((prev) => ({
            ...prev,
            isOpen: !prev.isOpen,
            content: { ..._content }
        }))
    }

    const handleCloseModal = () => {
        setModalContent((prev) => ({
            ...prev,
            isOpen: false,
            content: {
                name: '',
                pokeIndex: 0,
                url: '',
            }
        }))
    }

    const handleFetchMore = useCallback(() => {
        setHasMore(true)
        setOffset((prev) => {
            const offset = prev + limit;
            getPokedex({
                offset,
                limit,
            })
            if (offset > 60) {
                setHasMore(false);
            }
            return offset
        });
    }, [getPokedex]);

    const lastElementFetch = useCallback((node: HTMLDivElement) => {
        if (loading) return;
        if (!hasMore) return;
        if (observe.current) observe.current.disconnect()
        observe.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setOffset((prev) => {
                    const offset = prev + limit;
                    getPokedex({
                        offset,
                        limit,
                    })
                    if (offset === 60) {
                        setHasMore(false);
                    }
                    return offset
                });
            }
        });

        if (node) observe.current.observe(node)
    }, [hasMore, loading, getPokedex])

    const handleRefreshData = () => {
        setOffset(0);
        resetPokedexData();
        setData({
            count: 0,
            next: '',
            previous: '',
            results: []
        })
        getPokedex({
            offset: 0,
            limit: 20,
        })
    }

    useEffect(() => {
        getPokedex({
            limit,
            offset
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (pokedexData && !error) {
            setData((prev) => ({
                ...pokedexData,
                results: [
                    ...prev.results,
                    ...pokedexData.results
                ]
            }))
            resetPokedexData();
        }
    }, [pokedexData, resetPokedexData, error])

    return { data, error, loading, offset, modalContent, handleModal, handleCloseModal, setOffset, handleFetchMore, observe, lastElementFetch, handleRefreshData }
}

export default usePokedex