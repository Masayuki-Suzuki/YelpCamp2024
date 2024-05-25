import { useDispatch } from 'react-redux'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Textarea } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useFormik } from 'formik'
import { createCampgroundSchema } from '../libs/campgroundValidationSchema'
import { Campground, CampgroundPostData } from '../types/campground.ts'
import { pushNewCampground } from '../features/campgrounds'
import { AppDispatch } from '../store'

const CreateCampGroundForm = () => {
    const dispatch: AppDispatch = useDispatch()

    // TODO: replace image url after image uploader implemented.
    const initialValues: Campground = {
        title: '',
        location: '',
        description: '',
        price: 0,
        image: 'https://images.unsplash.com/photo-1564577160324-112d603f750f?q=800',
    }

    const formik = useFormik<Campground>({
        initialValues,
        validationSchema: createCampgroundSchema,
        onSubmit: (values: Campground, actions) => {
            actions.setSubmitting(true);

            // TODO: replace with user id after set User data in the store.
            const postData: CampgroundPostData = {
                authorId: '66516b1689fcff6faeca12e9',
                data: values,
            }

            dispatch(pushNewCampground(postData))
            actions.setSubmitting(false);
        },
    })

    return (
        <Box w="100%" maxH={1280} minH="100vh" p={8}>
            <Heading as="h1" size="xl" pb={4}>Create Campground:</Heading>
            <Box p={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl
                        mb={6}
                        isInvalid={!!formik.errors.title && formik.touched.title}
                    >
                        <FormLabel htmlFor="title" fontWeight="bold">Title</FormLabel>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                        mb={6}
                        isInvalid={!!formik.errors.location && formik.touched.location}
                    >
                        <FormLabel htmlFor="location" fontWeight="bold">Location</FormLabel>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>{formik.errors.location}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                        mb={6}
                        isInvalid={!!formik.errors.description && formik.touched.description}
                    >
                        <FormLabel htmlFor="description" fontWeight="bold">Description</FormLabel>
                        <Textarea
                            id="description"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                        mb={6}
                        isInvalid={!!formik.errors.price && formik.touched.price}
                    >
                        <FormLabel htmlFor="price" fontWeight="bold">Price</FormLabel>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        isLoading={formik.isSubmitting}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
                <Box mt={10}>
                    <Link as={ReactRouterLink} to='/'> &lt;&lt; Back to Home</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default CreateCampGroundForm
