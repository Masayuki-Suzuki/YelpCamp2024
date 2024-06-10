import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CampgroundPostData, CampgroundsState, CampgroundUpdateData } from '../../types/campground.ts'
import { createCampground, deleteCampground, fetchCampground, fetchCampgrounds, updateCampground } from './campgroundsAPI'

const initialState: CampgroundsState = {
    campgrounds: [],
    campground: null,
    isLoading: false,
    status: 'idle'
}

const getRejectValue = (err: any) => {
    let rejectValue = {
        isOpen: true,
        icon: 'error',
        status: 400,
        message: 'Something went wrong...'
    }

    if ('response' in err && 'data' in err.response && 'error' in err.response.data) {
        rejectValue = {
            ...rejectValue,
            message: err.response.data.error.message,
            status: err.response.status
        }
    } else if (err instanceof Error) {
        rejectValue = { ...rejectValue, message: err.message }
    }

    return rejectValue
}

export const fetchAllCampgrounds = createAsyncThunk(
    'campgrounds/fetchAllCampgrounds',
    async (_, { rejectWithValue }) => {
        try {
            const campgrounds = await fetchCampgrounds()
            return campgrounds
        }
        catch (err: any) {
            return rejectWithValue(getRejectValue(err))
        }
    }
)

export const fetchOneCampground = createAsyncThunk(
    'campgrounds/fetchOneCampground',
    async (id: string, { rejectWithValue }) => {
        try {
            const campground = await fetchCampground(id)
            return campground
        }
        catch (err: any) {
            return rejectWithValue(getRejectValue(err))
        }
    }
)

export const pushNewCampground = createAsyncThunk(
    'campgrounds/createCampground',
    async (postData: CampgroundPostData, { rejectWithValue }) => {
        try {
            const newCampground = await createCampground(postData)
            return newCampground
        }
        catch (err: any) {
            return rejectWithValue(getRejectValue(err))
        }
    }
)

export const updateOneCampground = createAsyncThunk(
    'campgrounds/updateCampground',
    async (postData: CampgroundUpdateData, { rejectWithValue }) => {
        try {
            const updatedCampground = await updateCampground(postData)
            return updatedCampground
        }
        catch (err: any) {
            return rejectWithValue(getRejectValue(err))
        }
    }
)

export const deleteOneCampground = createAsyncThunk(
    'campgrounds/deleteCampground',
    async (id: string, { rejectWithValue }) => {
        try {
            const deletedCampground = await deleteCampground(id)
            return deletedCampground
        }
        catch (err: any) {
            return rejectWithValue(getRejectValue(err))
        }
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
                    if (campground && state.campground) {
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
