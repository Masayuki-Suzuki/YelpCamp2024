import { useDispatch } from 'react-redux'
import { Box, Link} from '@chakra-ui/react'
import { Link as ReactRouterLink, useParams } from 'react-router-dom'
import { FormikProps, useFormik } from 'formik'
import { createCampgroundSchema } from '../libs/campgroundValidationSchema'
import { Campground, CampgroundForm, CampgroundPostData, CampgroundUpdateData } from '../types/campground'
import { pushNewCampground } from '../features/campgrounds'
import { AppDispatch } from '../store'
import { updateOneCampground } from '../features/campgrounds/campgroundsSlice'
import CustomFormControl from '../Molecules/FormControl'
import FormSubmitButton from '../Atoms/forms/FormSubmitButton.tsx'

type CampgroundFormProps = {
    initialValues?: CampgroundForm,
    mode: 'create' | 'edit'
}

type CampgroundFormDomProps = {
    formik: FormikProps<Campground>,
}

const CampGroundFormDom = ({ formik }: CampgroundFormDomProps) => (
    <Box p={4}>
        <form onSubmit={formik.handleSubmit}>
            <CustomFormControl
                formik={formik}
                title="Title"
                id="title"
                name="title"
                inputType="text"
                type="input"
                valueName="title"
            />

            <CustomFormControl
                formik={formik}
                title="Location"
                id="location"
                name="location"
                inputType="text"
                type="input"
                valueName="location"
            />

            <CustomFormControl
                formik={formik}
                title="Description"
                id="description"
                name="description"
                type="textarea"
                inputType="text"
                valueName="description"
            />

            <CustomFormControl
                formik={formik}
                title="Price"
                id="price"
                name="price"
                type="input"
                inputType="number"
                valueName="price"
            />

            <FormSubmitButton formik={formik}>Submit</FormSubmitButton>
        </form>
        <Box mt={10}>
            <Link as={ReactRouterLink} to="/"> &lt;&lt; Back to Home</Link>
        </Box>
    </Box>
)

const CampGroundForm = ({ initialValues, mode }: CampgroundFormProps) => {
    const dispatch: AppDispatch = useDispatch()
    const params = useParams()

    const DefaultInitialValues = {
        title: '',
        location: '',
        description: '',
        price: 0,
        image: 'https://images.unsplash.com/photo-1564577160324-112d603f750f?q=800'
    }

    const formik = useFormik<Campground>({
        initialValues: initialValues || DefaultInitialValues,
        validationSchema: createCampgroundSchema,
        onSubmit: (values: Campground, actions) => {
            actions.setSubmitting(true)

            if (mode === 'create') {
                // TODO: replace with user id after set User data in the store.
                const postData: CampgroundPostData = {
                    authorId: '66516b1689fcff6faeca12e9',
                    data: values
                }

                dispatch(pushNewCampground(postData))
            } else {
                let postId = ''

                if (params && params.id) {
                    postId = params.id
                } else {
                    const idFromPathname = location.pathname.split('/')[2]
                    postId = idFromPathname
                }

                const postData: CampgroundUpdateData = {
                    id: postId,
                    data: values
                }

                dispatch(updateOneCampground(postData))
            }

            actions.setSubmitting(false)
        }
    })

    return <CampGroundFormDom formik={formik} />
}

export default CampGroundForm
