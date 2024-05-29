import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { fetchOneCampground, selectCampground, selectCampgroundsLoading } from '../../features/campgrounds'
import { useParams } from 'react-router-dom'
import CampgroundFormPageTemplate from '../../templates/CampgroundFormPageTemp'
import { CampgroundForm } from '../../types/campground.ts'

const EditCampground = () => {
    const dispatch: AppDispatch = useDispatch()
    const campground = useSelector(selectCampground)
    const loading = useSelector(selectCampgroundsLoading)
    const params = useParams()
    const [ initialValues, setInitialValues ] = useState<CampgroundForm>({
        title: '',
        location: '',
        description: '',
        price: 0,
        image: 'https://images.unsplash.com/photo-1564577160324-112d603f750f?q=800'
    })
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    useEffect(() => {
        if (params && params.id) {
            dispatch(fetchOneCampground(params.id))
        }
    }, [])

    useEffect(() => {
        setIsLoading(true)
        if (campground) {
            setInitialValues({
                title: campground.title,
                location: campground.location,
                description: campground.description,
                price: campground.price,
                image: campground.image
            })
            setTimeout(() => {
                setIsLoading(false)
            }, 300)
        } else {
            setIsLoading(true)
        }
    }, [campground])

    useEffect(() => {
        setIsLoading(loading)
    }, [loading])

    return (
        <CampgroundFormPageTemplate
            initialValues={initialValues}
            heading="Edit Campground"
            mode="edit"
            postId={params && params.id}
            isLoading={isLoading}
        />
    )
}

export default EditCampground
