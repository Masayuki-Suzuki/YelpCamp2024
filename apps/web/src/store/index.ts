import { configureStore } from '@reduxjs/toolkit'
import campgroundsReducer from '../features/campgrounds/campgroundsSlice'

export const store = configureStore({
    reducer: {
        campgrounds: campgroundsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
