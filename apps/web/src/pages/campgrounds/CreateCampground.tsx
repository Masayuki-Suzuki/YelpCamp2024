import CampgroundFormPageTemp from '../../templates/CampgroundFormPageTemp'
import { CampgroundForm } from '../../types/campground'

const CreateCampGroundForm = () => {
    const initialValues: CampgroundForm = {
        title: '',
        location: '',
        description: '',
        price: 0,
        image: ''
    }

    return (
        <CampgroundFormPageTemp
            heading="Create Campground:"
            initialValues={initialValues}
            mode="create"
            isLoading={false}
        />
    )
}

export default CreateCampGroundForm
