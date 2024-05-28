import { Campground, Campgrounds, CampgroundPostData, CampgroundUpdateData } from '../../types/campground'
import apiClient from '../../libs/apiClient'

export const fetchCampgrounds = async (): Promise<Campgrounds> => {
    const { data } = await apiClient.get('/campgrounds')
    return data
}

export const fetchCampground = async (id: string): Promise<Campground> => {
    const { data } = await apiClient.get(`/campgrounds/${id}`)
    return data
}

export const createCampground = async (postData: CampgroundPostData): Promise<Campground> => {
    const { data } = await apiClient.post('/campgrounds/create', postData)
    return data
}

export const updateCampground = async ({id, data: postData}: CampgroundUpdateData): Promise<Campground> => {
    const { data } = await apiClient.put(`/campgrounds/${id}/update`, postData)
    console.log(data)
    return data
}
