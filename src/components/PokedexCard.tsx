import { FC } from 'react'
import { capitalize } from 'lodash'
import useFetch from '../hooks/useFetch';
import { PokeAPI } from 'pokeapi-types';
import { paddedId, typeColor } from '../helper/utils';
export interface IPokedexProps {
    name: string,
    url: string,
    pokeIndex: number,
    handleModal: (modalParams: { name: string; pokeIndex: number, url: string }) => void;
}

const PokedexCard: FC<IPokedexProps> = ({ name, url, pokeIndex, handleModal }) => {

    const { data: _data } = useFetch(url, {
        prevent: !url
    });

    const data = _data as PokeAPI.Pokemon | null;

    return (
        <div className='border p-3 cursor-pointer hover:bg-blue-500/10 hover:p-5 sm:w-60 sm:h-auto w-full flex justify-around items-center flex-col rounded-sm relative transition-all' onClick={() => handleModal({ name, pokeIndex, url })}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex}.png`} className='w-96 min-h-40' alt={`${name}.jpg`} />
            <span className='font-semibold '>
                {capitalize(name)} <span className='font-bold text-gray-400/30'>#{data ? paddedId(data?.id) : null}</span>
            </span>

            {
                _data ? (
                    <>
                        <ul className='flex gap-2'>
                            {data?.types.map((val, idx) => (
                                <li key={idx} className={`${typeColor(val.type.name)} px-3 py-1 mt-2 rounded min-w-14 text-center`}>{capitalize(val.type.name)}</li>
                            ))}
                        </ul>
                    </>
                ) : null
            }
        </div>
    )
}

export default PokedexCard