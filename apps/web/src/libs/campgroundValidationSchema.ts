import * as Yup from 'yup'

export const createCampgroundSchema = Yup.object({
    title: Yup.string().required(),
    price: Yup.number().required(),
    description: Yup.string(),
    location: Yup.string().required(),
})
