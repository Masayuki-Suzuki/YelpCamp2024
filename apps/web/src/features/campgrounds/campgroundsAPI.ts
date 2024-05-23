import { Campgrounds } from '../../types/campground'
import apiClient from '../../libs/apiClient'

export const fetchCampgrounds = async (): Promise<Campgrounds> => {
    const res = await apiClient.get('/campgrounds')
    return res.data
}
