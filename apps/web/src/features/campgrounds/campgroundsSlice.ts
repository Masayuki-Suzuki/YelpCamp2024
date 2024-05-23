import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CampgroundsState } from '../../types/campground.ts'
import { fetchCampgrounds } from './campgroundsAPI'

const initialState: CampgroundsState = {
    campgrounds: [],
    isLoading: false,
    status: 'idle'
}

export const fetchAllCampgrounds = createAsyncThunk(
    'campgrounds/fetchAllCampgrounds',
    async () => {
        const campgrounds = await fetchCampgrounds()
        return campgrounds
    }
)

const campgroundsSlice = createSlice({
    name: 'campgrounds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(fetchAllCampgrounds.pending, (state) => {
                state.status = 'loading'
                state.isLoading = true
            })
           .addCase(fetchAllCampgrounds.fulfilled, (state, action) => {
                state.status = 'idle'
                state.isLoading = false
                state.campgrounds = action.payload
            })
           .addCase(fetchAllCampgrounds.rejected, (state) => {
                state.status = 'failed'
                state.isLoading = false
            })
    }
})

export default campgroundsSlice.reducer
