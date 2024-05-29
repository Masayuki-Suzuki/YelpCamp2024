import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CampgroundPostData, CampgroundsState, CampgroundUpdateData } from '../../types/campground.ts'
import { fetchCampgrounds, fetchCampground, createCampground, updateCampground, deleteCampground } from './campgroundsAPI'

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

export const updateOneCampground = createAsyncThunk(
    'campgrounds/updateCampground',
    async (postData: CampgroundUpdateData) => {
        const updatedCampground = await updateCampground(postData)
        return updatedCampground
    }
)

export const deleteOneCampground = createAsyncThunk(
    'campgrounds/deleteCampground',
    async (id: string) => {
        const deletedCampground = await deleteCampground(id)
        return deletedCampground
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
            .addCase(updateOneCampground.pending, (state) => {
                state.status = 'loading'
                state.isLoading = true
            })
            .addCase(updateOneCampground.rejected, (state) => {
                state.status = 'failed'
                state.isLoading = false
            })
            .addCase(updateOneCampground.fulfilled, (state, action) => {
                state.status = 'idle'
                state.isLoading = false
                state.campgrounds = state.campgrounds.map((campground) => {
                    if (campground.id === action.payload.id) {
                        return action.payload
                    }
                    return campground
                })
                state.campground = action.payload
            })
            .addCase(deleteOneCampground.pending, (state) => {
                state.status = 'loading'
                state.isLoading = true
            })
            .addCase(deleteOneCampground.rejected, (state) => {
                state.status = 'failed'
                state.isLoading = false
            })
            .addCase(deleteOneCampground.fulfilled, (state) => {
                state.status = 'idle'
                state.isLoading = false
                state.campgrounds = state.campgrounds.filter((campground) => {
                    if(campground && state.campground) {
                        return campground.id !== state.campground.id
                    } else {
                        return false
                    }
                })
                state.campground = null
            })
    }
})

export default campgroundsSlice.reducer
