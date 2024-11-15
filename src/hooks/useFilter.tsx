/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { PokeAPI } from 'pokeapi-types';
import useMutation from './useMutation';

const useFilter = () => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [type, setType] = useState('');
    const {
        data: _filterData,
        error: filterError,
        loading: filterLoading,
        reset: filterReset,
        function: getFilter,
    } = useMutation(`https://pokeapi.co/api/v2/type/${type}`);

    const filterData = _filterData as PokeAPI.Type | null


    useEffect(() => {
        if (type && isFilterActive) {
            getFilter();
        }
    }, [type, isFilterActive])

    const handleReset = () => {
        filterReset();
        setIsFilterActive(false);
        setType('');
    }

    return {
        isFilterActive, setIsFilterActive, filterData, filterLoading, handleReset, setType, filterError, filterType: type, getFilter
    }
}

export default useFilter