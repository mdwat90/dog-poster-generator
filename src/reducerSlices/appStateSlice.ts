import { createSlice } from '@reduxjs/toolkit'
import { emptyQueryObj } from '../constants'

export interface Query {
  id: number,
  selectedBreed: string | null,
  selectedSubBreed: string | null,
  photoNumber: string | null,
}

export type AppState = {
  allBreeds: string[] | null,
  queries: Query[],
  images: string[] | null,
  error: string | null
}

const initialState: AppState = {
  allBreeds: null,
  queries: [emptyQueryObj],
  images: null,
  error: null
}

const appStateSlice = createSlice({
  name: 'mainBreed',
  initialState,
  reducers: {
    setBreeds(state, action) {
      state.allBreeds = Object.keys(action.payload.message);
    },
    setQueries(state, action) {
      state.queries = action.payload;
    },
    setImages(state, action) {
      let allImages: string[] = [];
      for (const payload of action.payload) {
        payload.message.map((url: any) => allImages.push(url));
      }
      state.images = allImages;
    },
    setError(state, action) {
      state.error = action.payload.message;
    },
  }
})

export const { setBreeds, setQueries, setImages, setError } = appStateSlice.actions

export default appStateSlice.reducer