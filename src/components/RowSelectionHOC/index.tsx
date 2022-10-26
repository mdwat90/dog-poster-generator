import React from 'react';
import { useDispatch } from 'react-redux';
import { Query, setQueries } from '../../reducerSlices/appStateSlice';

interface HOCData {
    breeds: string[],
    queries: Query[],
    query: Query
}

export const withDispatch = (WrappedComponent: React.ElementType, data: HOCData) => {
    const RowSelectionHOC = () => {
        const {query, queries} = data;
        const dispatch = useDispatch();

        const dispatchQueries = (newQuery: Query) => {
            let newQueriesArr = queries.map(q => {
                if(q.id === query.id) {
                    return newQuery;
                }
                return q;
            });
            dispatch(setQueries(newQueriesArr))
        }
  
        return (
            <WrappedComponent dispatchQueries={dispatchQueries} {...data} />
        )
    };

    return RowSelectionHOC;
  }