import { FC } from 'react'
import { capitalize } from 'lodash'
export interface IPokedexProps {
    name: string,
    url: string,
    pokeIndex: number,
    handleModal: (modalParams: { name: string; pokeIndex: number, url: string }) => void;
}

const PokedexCard: FC<IPokedexProps> = ({ name, url, pokeIndex, handleModal }) => {
    return (
        <div className='border p-3 cursor-pointer hover:bg-blue-500/10 hover:p-5 sm:w-60 sm:h-auto w-full flex justify-around items-center flex-col rounded-sm relative transition-all' onClick={() => handleModal({ name, pokeIndex, url })}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex}.png`} className='w-96 min-h-40' alt={`${name}.jpg`} />
            <span className='font-semibold '>
                {capitalize(name)}
            </span>
        </div>
    )
}

export default PokedexCard