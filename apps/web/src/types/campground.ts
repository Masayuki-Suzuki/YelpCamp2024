import { FetchStatus } from './utilities.ts'

export type Campground = {
    id?: string,
    title: string,
    price: number,
    description: string,
    location: string,
    authorId: string | null,
    image: string
}

export type Campgrounds = Campground[]

export type CampgroundsState = {
    campgrounds: Campgrounds,
    isLoading: boolean,
    status: FetchStatus
}
