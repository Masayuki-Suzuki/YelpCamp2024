import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CampgroundPostData, CampgroundsState } from '../../types/campground.ts'
import { fetchCampgrounds, fetchCampground, createCampground } from './campgroundsAPI'

const initialState: CampgroundsState = {
    campgrounds: [],
    campground: null,
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

export const fetchOneCampground = createAsyncThunk(
    'campgrounds/fetchOneCampground',
    async (id: string) => {
        const campground = await fetchCampground(id)
        return campground
    }
)

export const pushNewCampground = createAsyncThunk(
    'campgrounds/createCampground',
    async (postData: CampgroundPostData) => {
        const newCampground = await createCampground(postData)
        return newCampground
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
            .addCase(fetchOneCampground.pending, (state) => {
                state.status = 'loading'
                state.isLoading = true
            })
            .addCase(fetchOneCampground.fulfilled, (state, action) => {
                state.status = 'idle'
                state.isLoading = false
                state.campground = action.payload
            })
            .addCase(fetchOneCampground.rejected, (state) => {
                state.status = 'failed'
                state.isLoading = false
            })
            .addCase(pushNewCampground.pending, (state) => {
                state.status = 'loading'
                state.isLoading = true
            })
            .addCase(pushNewCampground.rejected, (state) => {
                state.status = 'failed'
                state.isLoading = false
            })
            .addCase(pushNewCampground.fulfilled, (state, action) => {
                state.status = 'idle'
                state.isLoading = false
                state.campgrounds.push(action.payload)
            })
    }
})

export default campgroundsSlice.reducer
