import { FetchStatus, Nullable } from './utilities.ts'

export type Campground = {
    id?: string,
    title: string,
    price: number,
    description: string,
    location: string,
    image: string
}

export type Campgrounds = Campground[]

export type CampgroundsState = {
    campgrounds: Campgrounds,
    campground: Nullable<Campground>,
    isLoading: boolean,
    status: FetchStatus
}

export type CampgroundPostData = {
    authorId: string,
    data: Campground
}

export type CampgroundUpdateData = {
    id: string,
    data: Campground
}

export type CampgroundForm = {
    title: string,
    price: number,
    description: string,
    location: string,
    image: string
}
