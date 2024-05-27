import { FormControl } from '@chakra-ui/react'
import { FormikProps, FormikErrors, FormikTouched, FormikValues } from 'formik'
import { Campground } from '../types/campground'
import { FormLabel, FormInput, FormErrorMessage } from '../Atoms/forms'
import FormTextArea from '../Atoms/forms/FormTextArea.tsx'

type FormControlProps = {
    formik: FormikProps<Campground>,
    title: string,
    id: string,
    name: string,
    type: 'input' | 'textarea'
    inputType: 'text' | 'number' | 'email' | 'password' | 'tel'
    valueName: string
}

type FormControlErrors = {
    [key: string]: string
} & FormikErrors<Campground>

type FormControlTouched = {
    [key: string]: boolean
} & FormikTouched<Campground>

type FormControlValue = FormikValues

const FormControlComponent = ({ formik, title, id, name, inputType, type, valueName }: FormControlProps) => {
    const errors: FormControlErrors = formik.errors
    const touched: FormControlTouched = formik.touched
    const values: FormControlValue = formik.values

    return (
        <FormControl
            mb={6}
            isInvalid={!!errors[valueName] && touched[valueName]}
        >
            <FormLabel htmlFor={id}>{title}</FormLabel>
            {
                type === 'textarea' ?
                    (
                        <FormTextArea
                            id={id}
                            name={name}
                            placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={values[valueName]}
                        />
                    ) : (
                        <FormInput
                            id={id}
                            name={name}
                            type={inputType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={values[valueName]}
                        />
                    )
            }
            <FormErrorMessage>{errors[valueName]}</FormErrorMessage>
        </FormControl>
    )
}

export default FormControlComponent
