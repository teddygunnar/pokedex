import Loading from "../components/Loading";
import ModalPokemon from "../components/Modal";
import PokedexCard from "../components/PokedexCard";
import { IPokedexRes } from "../config/_models";
import { getPokemonIndex } from "../helper/utils";
import usePokedex from "../hooks/usePokedex"


const List = () => {
    const { data, offset, loading, handleModal, modalContent, handleCloseModal, lastElementRef, handleFetchMore } = usePokedex();
    const { content, isOpen } = modalContent
    const { results } = data as IPokedexRes || {}
    return (
        <>
            <ModalPokemon isOpen={isOpen} content={content} handleCloseModal={handleCloseModal} />
            <div className="mx-36 my-10 p-10">
                <div className="flex gap-5 flex-wrap justify-center w-full">
                    {
                        data && (
                            results.map((val, index) => (
                                <PokedexCard name={val.name} key={index} url={val.url} pokeIndex={getPokemonIndex(val.url)} handleModal={handleModal} />
                            ))
                        )
                    }
                </div>

                {
                    loading && <Loading />
                }
                {
                    results?.length >= 20 && (
                        <div className="flex justify-center items-center mt-10 cursor-pointer" ref={lastElementRef} onClick={handleFetchMore}>
                            See more...
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default List