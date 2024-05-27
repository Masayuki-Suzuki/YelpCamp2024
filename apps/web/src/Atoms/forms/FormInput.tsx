import { ChangeEvent } from 'react'
import { Input } from '@chakra-ui/react'

type FormInputProps = {
    id: string
    name: string
    type: 'text' | 'email' | 'password' | 'number' | 'tel'
    onChange: (e: ChangeEvent<any>) => void
    onBlur: (e: any) => void
    value: string | number
}

const FormInput = ({ id, name, type, onBlur, onChange, value}: FormInputProps) => (
    <Input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
    />
)

export default FormInput
