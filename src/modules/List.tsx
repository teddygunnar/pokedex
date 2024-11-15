import { capitalize } from "lodash";
import Loading from "../components/Loading";
import ModalPokemon from "../components/Modal";
import PokedexCard from "../components/PokedexCard";
import { IPokedexRes } from "../config/_models";
import { color, getPokemonIndex, typeColor } from "../helper/utils";
import usePokedex from "../hooks/usePokedex"
import useFilter from "../hooks/useFilter";

interface PokemonData {
    name: string;
    url: string;
}

interface FilteredPokemonData {
    pokemon: {
        name: string;
        url: string;
    };
}

type PokemonListItem = PokemonData | FilteredPokemonData;

const List = () => {
    const { data, loading, handleModal, modalContent, handleCloseModal, lastElementFetch, handleFetchMore, error, handleRefreshData } = usePokedex();
    const { filterData, filterError, filterLoading, isFilterActive, handleReset, setType, filterType, setIsFilterActive } = useFilter();
    const { content, isOpen } = modalContent
    const { results } = data as IPokedexRes || {}
    const usedData: PokemonListItem[] = isFilterActive ? (filterData?.pokemon || []) : results;
    const typeKey = Object.keys(color);

    return (
        <>
            <div className="p-5 my-10">
                <p className="text-3xl text-center font-bold">Filter by type: </p>
                <ul className="flex gap-5 flex-wrap mt-5 w-full justify-center items-center">
                    {
                        typeKey.map((val, index) => (
                            <li key={index} onClick={() => {
                                if (val === filterType) {
                                    handleReset();
                                    handleRefreshData();
                                } else {
                                    setType(val);
                                    setIsFilterActive(true);
                                }
                            }} className={`${typeColor(val)} px-5 cursor-pointer rounded-full black transition-all py-1 w-auto min-w-[8rem] text-center ${filterType === val ? 'border-blue-600 border-b-4' : ''}`}>{capitalize(val)}</li>
                        ))
                    }
                    <li className={`px-5 cursor-pointer rounded-full black transition-all py-1 w-auto min-w-[4rem] text-center bg-black text-white`} onClick={() => {
                        handleReset();
                        handleRefreshData();
                    }}>Reset</li>
                </ul>
            </div>
            <div className="mx-10">

                <ModalPokemon isOpen={isOpen} content={content} handleCloseModal={handleCloseModal} />
                <div className="flex gap-5 flex-wrap justify-center w-full">
                    {
                        (filterLoading || (loading && !usedData.length)) && (
                            <Loading />
                        )
                    }

                    {
                        usedData.length ? usedData.map((val, index) => (
                            <PokedexCard
                                name={"name" in val ? val.name : val.pokemon.name}
                                key={index}
                                url={"url" in val ? val.url : val.pokemon.url}
                                pokeIndex={getPokemonIndex("url" in val ? val.url : val.pokemon.url)}
                                handleModal={handleModal}
                            />
                        )) : !filterLoading && !loading && !error && !filterError && <span className="font-bold text-5xl">No Pokémon data</span>
                    }

                    {
                        (filterError || error) && Boolean(!usedData.length) &&
                        (
                            <span className="font-bold text-5xl">Failed to fetch Pokémon data</span>
                        )

                    }
                </div>
                {
                    results?.length >= 20 && !isFilterActive && !error && !filterError && (
                        <div className="flex justify-center items-center mt-10 cursor-pointer" ref={lastElementFetch} onClick={() => {
                            if (!loading) {
                                handleFetchMore()
                            }
                        }}>
                            {
                                loading ? <Loading /> : 'See More...'
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default List