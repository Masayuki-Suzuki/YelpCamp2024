import { Textarea } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

type FormTextAreaProps = {
    id: string
    name: string
    placeholder: string
    onChange: (e: ChangeEvent<any>) => void
    onBlur: (e: any) => void
    value: string | number
}

const FormTextArea = ({id, name, placeholder, onBlur, onChange, value}: FormTextAreaProps) => (
    <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
    />
)

export default FormTextArea
