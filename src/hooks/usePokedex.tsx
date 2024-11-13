import { useCallback, useEffect, useRef, useState } from 'react'
import { IPokedexRes } from '../config/_models'
import useMutation from './useMutation';
import axios from 'axios';

type ModalContent = {
    isOpen: boolean;
    content: {
        name: string;
        pokeIndex: number;
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
    const [limit, setLimit] = useState<number>(20);
    const [modalContent, setModalContent] = useState<ModalContent>({
        isOpen: false,
        content: {
            name: '',
            pokeIndex: 0,
        }
    })

    const [hasMore, setHasMore] = useState(true);

    const observe = useRef<IntersectionObserver | null>(null);

    const { data: pokedexData, error, function: getPokedex, loading, reset: resetPokedexData } = useMutation('https://pokeapi.co/api/v2/pokemon') as IUseMutation;

    const handleModal = (_content: { name: string, pokeIndex: number }) => {
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
    }, [offset]);

    const lastElementRef = useCallback((node: HTMLDivElement) => {
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
    }, [hasMore])

    useEffect(() => {
        getPokedex({
            limit,
            offset
        })
    }, [])

    useEffect(() => {
        if (pokedexData) {
            setData((prev) => ({
                ...pokedexData,
                results: [
                    ...prev.results,
                    ...pokedexData.results
                ]
            }))
            resetPokedexData();
        }
    }, [pokedexData])

    return { data, error, loading, offset, modalContent, handleModal, handleCloseModal, setOffset, handleFetchMore, observe, lastElementRef }
}

export default usePokedex