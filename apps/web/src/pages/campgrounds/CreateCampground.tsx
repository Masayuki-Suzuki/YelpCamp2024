import { useEffect, useState } from 'react'
import CampgroundFormPageTemp from '../../templates/CampgroundFormPageTemp'
import { CampgroundForm } from '../../types/campground'
import { useParams } from 'react-router-dom'

const CreateCampGroundForm = () => {
    const params = useParams()
    const [ postId, setPostId ] = useState<string | undefined>('')

    const initialValues: CampgroundForm = {
        title: '',
        location: '',
        description: '',
        price: 0,
        image: ''
    }

    useEffect(() => {
        if(params && params.id) {
            setPostId(params.id)
        } else {
            setPostId(undefined)
        }
    }, [])

    return (
        <CampgroundFormPageTemp
            heading="Create Campground:"
            initialValues={initialValues}
            mode="create"
            isLoading={false}
            postId={postId}
        />
    )
}

export default CreateCampGroundForm
