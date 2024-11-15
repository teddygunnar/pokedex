import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { PokeAPI } from 'pokeapi-types'
import { capitalize } from "lodash";
import Loading from "./Loading";
import { statsTypography, typeColor } from "../helper/utils";

const ModalPokemon = ({ isOpen, content, handleCloseModal }: {
    isOpen: boolean, content: {
        name: string, pokeIndex: number, url: string,
    },
    handleCloseModal: () => void;
}) => {
    const { name, url } = content;
    const [pokeImage, setPokeImage] = useState<'front_default' | 'back_default'>('front_default');
    const isDirectionActive = (val: string) => {
        return pokeImage.includes(val)
    }

    useEffect(() => {
        setPokeImage('front_default');
    }, [name])

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

    const { data: pokeData, loading, reset } = useFetch(url, {
        prevent: !name
    });

    if (!isOpen) return null;
    const { sprites, height, base_experience, name: pokemonName, weight, abilities, types, stats } = pokeData! as PokeAPI.Pokemon || {}

    return (
        <div className="w-screen h-screen min-h-screen min-w-full fixed bg-black/50 z-10 top-0 left-0" onClick={() => {
            if (!loading) {
                handleCloseModal();
                reset();
            }
        }}>
            <div className="w-full h-full justify-center items-center flex">
                <div className={`w-5/5 h-4/5 md:h-5/5 lg:h-auto overflow-auto bg-slate-900 text-white rounded-md p-5 ${loading ? 'justify-center items-center flex bg-transparent' : ''}`} onClick={(e) => e.stopPropagation()}>
                    {
                        loading || !pokeData ? (
                            <Loading />
                        ) : (
                            <>
                                <span className="bg-blue-500/50 font-bold text-5xl w-full flex justify-center items-center rounded-md">{capitalize(pokemonName)}</span>
                                <div className="sm:flex mt-5 gap-5 justify-between w-full">
                                    <div className="rounded-xl bg-gray-600 flex flex-col justify-between">
                                        <div className="w-auto">
                                            <img src={sprites[pokeImage]} alt={`${pokemonName}.jpg`} width={650} loading="lazy" />
                                        </div>
                                        <div className="inline-flex w-full justify-center items-end relative">
                                            <button className={`${!isDirectionActive('front') ? 'bg-gray-300 text-black' : 'bg-blue-500 border-blue-700 text-white'} hover:bg-blue-400 hover:text-white font-bold py-2 px-4 border-b-4 hover:border-blue-500 w-full transition-all`} onClick={() => setPokeImage('front_default')}>
                                                Front
                                            </button>
                                            <button className={`${!isDirectionActive('back') ? 'bg-gray-300 text-black' : 'bg-blue-500 border-blue-700 text-white'} hover:bg-blue-400 hover:text-white font-bold py-2 px-4 border-b-4  hover:border-blue-500 w-full transition-all`} onClick={() => setPokeImage('back_default')}>
                                                Back
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex sm:flex-col flex-row w-full gap-5 flex-s">
                                        <div className="hidden sm:flex flex-col m-0 p-5 bg-blue-500 rounded-xl md:w-full h-full w-full">
                                            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
                                                <div>
                                                    <p className="font-bold text-xl">Height</p>
                                                    <span className="font-thin">{height * 10}</span><span className="font-thin">cm</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-xl">Weight</p>
                                                    <span className="font-thin">{weight / 10}</span><span className="font-thin">kg</span>
                                                </div>

                                                <div>
                                                    <p className="font-bold text-xl">Base EXP</p>
                                                    <span className="font-thin">{base_experience}</span><span className="font-thin">xp</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-xl">Types</p>
                                                    <ul>
                                                        {
                                                            types.map((val, index) => (
                                                                <li className={`font thin ${typeColor(val.type.name)} w-3/5 my-1 px-1`} key={index}>{capitalize(val.type.name)}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-xl">Abilites</p>
                                                    <ul>
                                                        {
                                                            abilities.map((val, index) => (
                                                                <li className={`${val.is_hidden ? 'opacity-35' : ''} font-thin`} key={index}>{capitalize(val.ability.name)}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="hidden lg:flex flex-col justify-center m-0 p-5 bg-gray-500 rounded-xl md:w-full h-full sm:w-full">
                                            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
                                                {
                                                    stats.map((val, index) => (
                                                        <div className="w-full shadow-md" key={index}>
                                                            <p className="font-bold text-xl bg-blue-500 text-center">{statsTypography(capitalize(val.stat.name))}</p>
                                                            <p className="bg-blue-500 z-10"></p>
                                                            <p className="bg-red-500 text-center">{val.base_stat}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:hidden flex flex-col mt-5 m-0 p-5 bg-blue-500 rounded-xl">
                                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
                                        <div>
                                            <p className="font-bold text-xl">Height</p>
                                            <span className="font-thin">{height * 10}</span><span className="font-thin">cm</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-xl">Weight</p>
                                            <span className="font-thin">{weight / 10}</span><span className="font-thin">kg</span>
                                        </div>

                                        <div>
                                            <p className="font-bold text-xl">Base EXP</p>
                                            <span className="font-thin">{base_experience}</span><span className="font-thin">xp</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-xl">Types</p>
                                            <ul>
                                                {
                                                    types.map((val, index) => (
                                                        <li className={`font thin ${typeColor(val.type.name)} w-3/5 my-1 px-1`} key={index}>{capitalize(val.type.name)}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-bold text-xl">Abilites</p>
                                            <ul>
                                                {
                                                    abilities.map((val, index) => (
                                                        <li className={`${val.is_hidden ? 'opacity-35' : ''} font-thin`} key={index}>{capitalize(val.ability.name)}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                    </div>

                                </div>
                                <div className="lg:hidden flex mt-5 flex-col lg:justify-center lg:items-center m-0 p-5 bg-gray-500 rounded-xl md:w-full h-auto sm:w-full">
                                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
                                        {
                                            stats.map((val, index) => (
                                                <div className="w-full shadow-md" key={index}>
                                                    <p className="font-bold text-xl bg-blue-500 text-center">{statsTypography(capitalize(val.stat.name))}</p>
                                                    <p className="bg-blue-500 z-10"></p>
                                                    <p className="bg-red-500 text-center">{val.base_stat}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default ModalPokemon