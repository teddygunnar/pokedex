import ModalPokemon from "../components/Modal";
import PokedexCard from "../components/PokedexCard";
import { IPokedexRes } from "../config/_models";
import usePokedex from "../hooks/usePokedex"

const List = () => {
    const { data, offset, loading, handleModal, modalContent, handleCloseModal } = usePokedex();
    const { content, isOpen } = modalContent
    const { results } = data as IPokedexRes || {}
    return (
        <>
            <ModalPokemon isOpen={isOpen} content={content} handleCloseModal={handleCloseModal} />
            <div className="mx-36 my-10 p-10">
                <div className="flex gap-5 flex-wrap justify-center w-full">
                    {
                        data && !loading ? (
                            results.map((val, index) => (
                                <PokedexCard name={val.name} key={index} url={val.url} pokeIndex={offset + (index + 1)} handleModal={handleModal} />
                            ))
                        ) : 'Loading...'
                    }
                </div>

                {
                    data && (
                        <div className="flex justify-center items-center mt-10">
                            See more...
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default List