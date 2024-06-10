import { CheckCircleIcon, InfoIcon, WarningIcon, WarningTwoIcon } from '@chakra-ui/icons'
import { Nullable } from '../types/utilities.ts'

type AlertIconProps = {
    type: Nullable<'error' | 'success' | 'warning' | 'info'>
    color: string
}

const AlertIcon = ({ type = 'success', color = '' }: AlertIconProps) => {
    const boxSize = 20

    switch (type) {
        case 'error':
            return <WarningIcon color={color} boxSize={boxSize}/>
        case 'warning':
            return <WarningTwoIcon color={color} boxSize={boxSize}/>
        case 'info':
            return <InfoIcon color={color} boxSize={boxSize}/>
        case 'success':
        default:
            return <CheckCircleIcon color={color} boxSize={boxSize}/>
    }
}

export default AlertIcon
