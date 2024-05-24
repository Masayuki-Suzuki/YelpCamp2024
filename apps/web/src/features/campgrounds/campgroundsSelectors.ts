import { RootState } from '../../store'

export const selectCampgrounds = (state: RootState) => state.campgrounds.campgrounds
export const selectCampgroundsLoading = (state: RootState) => state.campgrounds.isLoading
export const selectCampgroundsStatus = (state: RootState) => state.campgrounds.status
export const selectCampground = (state: RootState) => state.campgrounds.campground
