import * as Yup from 'yup'

export const createCampgroundSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    price: Yup.number().min(0, 'Price must be greater than or equal to 0').required('Price is required'),
    description: Yup.string(),
    location: Yup.string().required('Location is required'),
})
