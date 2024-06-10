import { useDispatch } from 'react-redux'
import { Box, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink, useParams } from 'react-router-dom'
import { FormikProps, useFormik } from 'formik'
import { createCampgroundSchema } from '../libs/campgroundValidationSchema'
import { Campground, CampgroundForm, CampgroundPostData, CampgroundUpdateData } from '../types/campground'
import { pushNewCampground } from '../features/campgrounds'
import { AppDispatch } from '../store'
import { updateOneCampground } from '../features/campgrounds/campgroundsSlice'
import CustomFormControl from '../Molecules/FormControl'
import FormSubmitButton from '../Atoms/forms/FormSubmitButton'
import FormDeleteButton from '../Atoms/forms/FormDeleteButton'
import { useEffect, useState } from 'react'
import Loading from '../Molecules/Loading'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import { setDialogData } from '../features/dialogs'
import { AlertDialogState } from '../features/dialogs/dialogSlices.ts'

type CampgroundFormProps = {
    initialValues?: CampgroundForm
    mode: 'create' | 'edit'
    postId?: string
    isLoading: boolean
}

type CampgroundFormDomProps = {
    formik: FormikProps<Campground>
    postId: string
    mode: 'create' | 'edit'
}

const CampGroundFormDom = ({ formik, postId, mode }: CampgroundFormDomProps) => (
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

        {mode !== 'create' && (
            <FormDeleteButton text="Delete this Campground"/>
        )}

        <Box mt={10}>
            <Link as={ReactRouterLink} to={`/campgrounds/${postId}`} display="flex" alignItems="center">
                <ArrowLeftIcon mr={2}/>
                <Box
                    borderBottom={1}
                    borderStyle="solid"
                    borderColor="#000"
                    fontSize="large"
                    lineHeight={1}
                    fontWeight="medium"
                >
                    Back
                </Box>
            </Link>
        </Box>
    </Box>
)

const CampGroundForm = ({ initialValues, mode, postId, isLoading }: CampgroundFormProps) => {
    const dispatch: AppDispatch = useDispatch()
    const params = useParams()
    const [id, setPostId] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(isLoading)

    const DefaultInitialValues = {
        title: '',
        location: '',
        description: '',
        price: 0,
        image: 'https://images.unsplash.com/photo-1564577160324-112d603f750f?q=800'
    }

    useEffect(() => {
        setLoading(true)
        formik.setValues(initialValues || DefaultInitialValues)
        setLoading(false)
    }, [initialValues])

    useEffect(() => {
        if (postId) {
            setPostId(postId)
        } else {
            if (params && params.id) {
                setPostId(params.id)
            }
        }
    }, [postId])

    const formik = useFormik<Campground>({
        initialValues: initialValues || DefaultInitialValues,
        validationSchema: createCampgroundSchema,
        onSubmit: (values: Campground, actions) => {
            actions.setSubmitting(true)

            if (mode === 'create') {
                // TODO: replace with user id after set User data in the store.
                const postData: CampgroundPostData = {
                    authorId: '6655266e76031884d19fa0cb',
                    data: values
                }

                dispatch(pushNewCampground(postData)).unwrap().then(() => {
                    const dialogData: AlertDialogState = {
                        isOpen: true,
                        icon: 'success',
                        message: 'Campground created successfully.',
                        header: 'Success!',
                        status: 200
                    }
                    dispatch(setDialogData(dialogData))
                }).catch((err) => {
                    dispatch(setDialogData(err))
                })
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

                dispatch(updateOneCampground(postData)).unwrap().then(() => {
                    const dialogData: AlertDialogState = {
                        isOpen: true,
                        icon: 'success',
                        message: 'Campground updated successfully.',
                        header: 'Success!',
                        status: 200
                    }
                    dispatch(setDialogData(dialogData))
                }).catch((err) => {
                    dispatch(setDialogData(err))
                })
            }

            actions.setSubmitting(false)
        }
    })

    if (loading) {
        return <Loading/>
    }
    return <CampGroundFormDom formik={formik} postId={id} mode={mode}/>
}

export default CampGroundForm
