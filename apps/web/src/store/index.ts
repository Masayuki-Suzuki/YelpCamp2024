import { configureStore } from '@reduxjs/toolkit'
import campgroundsReducer from '../features/campgrounds/campgroundsSlice'
import alertDialogReducer from '../features/dialogs/dialogSlices'

export const store = configureStore({
    reducer: {
        campgrounds: campgroundsReducer,
        alertDialog: alertDialogReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

