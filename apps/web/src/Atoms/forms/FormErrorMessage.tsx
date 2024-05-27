import { FormErrorMessage } from '@chakra-ui/react'

type FormErrorMessageProps = {
    children: string | undefined | null
}

const FormErrorMessageComponent = ({ children }: FormErrorMessageProps) => (
    <FormErrorMessage>{ children }</FormErrorMessage>
)

export default FormErrorMessageComponent
