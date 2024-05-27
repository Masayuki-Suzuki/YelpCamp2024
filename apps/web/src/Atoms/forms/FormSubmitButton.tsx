import { Button } from '@chakra-ui/react'
import { FormikProps } from 'formik'
import { Campground } from '../../types/campground.ts'

type FormSubmitButtonProps = {
    formik: FormikProps<Campground>,
    children: string
}

const FormSubmitButton = ({ formik, children }: FormSubmitButtonProps) => (
    <Button
        colorScheme="blue"
        isLoading={formik.isSubmitting}
        isDisabled={!formik.isValid}
        type="submit"
        py={6}
        px={10}
    >
        { children }
    </Button>
)

export default FormSubmitButton
