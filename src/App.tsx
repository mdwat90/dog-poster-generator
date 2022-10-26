import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button } from '@mui/material';
import { getBreeds, getPhotos } from './api';
import { RowSelection } from './components/RowSelection';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setBreeds, setError, setImages, setQueries } from './reducerSlices/appStateSlice';
import { CustomModal } from './components/Modal';
import { withDispatch } from './components/RowSelectionHOC';
import './App.css';

interface State {
  app: AppState,
}

const API = {
  SubBreed: (breed: string | null, subBreed: string | null, num: string | null) => `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${num}`,
  Breed: (breed: string | null, num: string | null) => `https://dog.ceo/api/breed/${breed}/images/random/${num}` 
}  

function App() {
  const breeds = useSelector((state: State) => state.app.allBreeds);
  const queries = useSelector((state: State) => state.app.queries);
  const images = useSelector((state: State) => state.app.images);
  const error = useSelector((state: State) => state.app.error);
  const [open, setOpen] = useState(false);
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      setError(null);
      getBreeds().then(resp => dispatch(setBreeds(resp))).catch(err => dispatch(setError(err)));
    }
  })

  const handleAddRow = () => {
    let newQuery = {
      id: Math.floor(Math.random() * 1000),
      selectedBreed: null,
      selectedSubBreed: null,
      photoNumber: null
    }
    dispatch(setQueries([...queries, newQuery]))
  }

  const handleGenerate = () => {
    let queriesArr = queries.map((query) => {
      if(query.selectedSubBreed) {
        return API.SubBreed(query.selectedBreed, query.selectedSubBreed, query.photoNumber);
      }
      return API.Breed(query.selectedBreed, query.photoNumber);
    })

    getPhotos(queriesArr).then(resp => {
      dispatch(setError({message: null}));
      dispatch(setImages(resp));
      setOpen(true);
    }).catch(err => dispatch(setError(err)));
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className='App'>
      <div className='container'>
        {error && <Alert severity='error'>{error}</Alert>}
        {breeds && queries.map(query => {
          const RowSelect = withDispatch(
            RowSelection,
            {breeds, query, queries}
          )
          return  (
            <RowSelect key={query.id} />
          )
        }
        )}
        <Button className='add-btn' onClick={handleAddRow} id='add-btn'>+</Button>
        <div>
          <Button onClick={handleGenerate}>GENERATE</Button>
        </div>
      </div>
      {(!error && images && images.length > 0) && (
        <CustomModal open={open} images={images} handleClose={handleClose} />
      )}
    </div>
  );
}

export default App;
