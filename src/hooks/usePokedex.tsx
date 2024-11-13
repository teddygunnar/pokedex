import { useEffect, useState } from 'react'
import { IPokedexRes } from '../config/_models'
import useMutation from './useMutation';

type ModalContent = {
    isOpen: boolean;
    content: {
        name: string;
        pokeIndex: number;
    };
};

const usePokedex = () => {
    const [data, setData] = useState<IPokedexRes>();
    const [offset, setOffset] = useState<number>(0);
    const [limit, setLimit] = useState<number>(20);
    const [modalContent, setModalContent] = useState<ModalContent>({
        isOpen: false,
        content: {
            name: '',
            pokeIndex: 0,
        }
    })

    const { data: pokedexData, error, function: getPokedex, loading, reset } = useMutation('https://pokeapi.co/api/v2/pokemon');

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

    useEffect(() => {
        getPokedex({
            limit,
            offset
        })
    }, [offset, limit])

    useEffect(() => {
        if (pokedexData) {
            setData(pokedexData)
        };
    }, [pokedexData])
    return { data, error, loading, offset, modalContent, handleModal, handleCloseModal }
}

export default usePokedex