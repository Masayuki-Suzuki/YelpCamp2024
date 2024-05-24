import { Campground, Campgrounds } from '../../types/campground'
import apiClient from '../../libs/apiClient'

export const fetchCampgrounds = async (): Promise<Campgrounds> => {
    const res = await apiClient.get('/campgrounds')
    return res.data
}

export const fetchCampground = async (id: string): Promise<Campground> => {
    const res = await apiClient.get(`/campgrounds/${id}`)
    return res.data
}

export const createCampground = async (campground: Campground): Promise<void> => {
    await apiClient.post('/campgrounds', campground)
}
