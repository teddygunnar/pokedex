import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { PokeAPI } from 'pokeapi-types'
import { capitalize } from "lodash";

const ModalPokemon = ({ isOpen, content, handleCloseModal }: {
    isOpen: boolean, content: {
        name: string, pokeIndex: number
    },
    handleCloseModal: () => void;
}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        };
    }, [isOpen]);


    const { name, pokeIndex } = content;
    const { data: pokeData, error, loading, reset } = useFetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
        prevent: !name
    });

    if (!isOpen || !pokeData) return null;

    console.log(pokeData)
    const { sprites, height, base_experience, name: pokemonName, weight } = pokeData as PokeAPI.Pokemon || {}

    return (
        <div className="w-screen h-screen min-h-screen min-w-full fixed bg-black/50 z-10 top-0 left-0" onClick={() => {
            handleCloseModal();
            reset();
        }}>
            <div className="w-full h-full justify-center items-center flex">
                <div className="w-4/5 h-4/5 bg-slate-900 text-white rounded-md p-5" onClick={(e) => e.stopPropagation()}>
                    <span className="bg-blue-500/50 font-bold text-5xl w-full flex justify-center items-center rounded-md">{capitalize(pokemonName)}</span>
                    <div className="flex mt-5 gap-5">
                        <div className="border">
                            <img src={sprites.front_default} alt={`${pokemonName}.jpg`} width={450} loading="lazy" />
                        </div>
                        <div className="flex flex-col m-0 p-0">
                            <ul>
                                <li>Height: {height}</li>
                                <li>Weight: {weight}</li>
                                <li>Base EXP: {base_experience}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPokemon