import { FormLabel } from '@chakra-ui/react'

type FormLabelProps = {
    children: string
    htmlFor: string
}

const FormLabelComponent = ({ children, htmlFor }: FormLabelProps) => (
    <FormLabel htmlFor={htmlFor} fontWeight="bold">{ children }</FormLabel>
)

export default FormLabelComponent
