import campgroundsReducer from './campgroundsSlice'

export { fetchAllCampgrounds, fetchOneCampground, pushNewCampground } from './campgroundsSlice'
export { selectCampground, selectCampgrounds, selectCampgroundsLoading, selectCampgroundsStatus } from './campgroundsSelectors'

export default campgroundsReducer
