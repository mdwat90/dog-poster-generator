import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSubBreeds } from '../../api';
import { Query, setError } from '../../reducerSlices/appStateSlice';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';

interface RowSelectionProps {
    breeds: string[],
    queries: Query[],
    query: Query,
    dispatchQueries: (q: Query) => void;
    dispatchError: (err: string) => void;
}

export const RowSelection = ({ breeds, query, dispatchQueries, dispatchError }: RowSelectionProps) => {
    const [subBreeds, setSubBreeds] = useState<string[]>();

    useEffect(() => {
        if (query.selectedBreed && !subBreeds) {
            getSubBreeds(query.selectedBreed).then(resp => {
                if(resp.message.length > 0) {
                    setSubBreeds(resp.message);
                }
            }).catch(err => dispatchError(err));
        }
    })
    
    const handleBreedChange = (val: string) => {
        let newQuery = {
            ...query,
            selectedBreed: val
        }
        dispatchQueries(newQuery)
    }
  
    const handleSubBreedChange = (val: string) => {
        let newQuery = {
            ...query,
            selectedSubBreed: val
        }
        dispatchQueries(newQuery)
    }
  
    const handleNumberChange = (val: string) => {
        let newQuery = {
            ...query,
            photoNumber: val
        }
        dispatchQueries(newQuery)
    }

    return (
        <div className='row'>
            <FormSelect
                value={query?.selectedBreed || ''}
                label={'Breed'}
                onChange={handleBreedChange}
                data={breeds} 
            />
          
            <FormSelect
                value={query?.selectedSubBreed || ''}
                label={'Sub-Breed'}
                onChange={handleSubBreedChange}
                data={subBreeds && subBreeds.length > 0 ? subBreeds : []}
                disabled={(query?.selectedBreed && !subBreeds) || (!query?.selectedBreed)  ? true : false}
            />

            <FormInput value={query?.photoNumber || ''} label={'Number'} onChange={handleNumberChange} />
        </div>
    )
}
