import { useRef } from 'react'
import {
    AlertDialog as ChakraAlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Flex, Heading,
    Text
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import AlertIcon from '../Atoms/AlertIcon.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { closeAlertDialog, selectDialogData } from '../features/dialogs'
import { Nullable } from '../types/utilities.ts'

type AlertDialogProps = {
    onClose?: () => void
    isCentered?: boolean
    children: JSX.Element
}

const iconColor = {
    'success': '#00ff7f',
    'warning': '#ff7f00',
    'error': '#d00',
    'info': '#1e90ff'
}

const AlertDialog = ({ onClose, children, isCentered = true }: AlertDialogProps) => {
    const dispatch: AppDispatch = useDispatch()
    const ref = useRef<Nullable<FocusableElement>>(null)
    const { isOpen, icon, message, header } = useSelector(selectDialogData)

    const defaultOnCloseFn = () => {
        console.log('defaultOnCloseFn')
        dispatch(closeAlertDialog())
    }

    return (
        <ChakraAlertDialog
            isOpen={isOpen}
            isCentered={isCentered}
            onClose={onClose || defaultOnCloseFn}
            leastDestructiveRef={ref}
        >
            <AlertDialogOverlay/>
            <AlertDialogContent>
                <AlertDialogCloseButton/>
                <AlertDialogHeader></AlertDialogHeader>
                <AlertDialogBody pt={6}>
                    <Flex justifyContent="center">
                        <AlertIcon type={icon} color={iconColor[icon]}/>
                    </Flex>
                    <Heading as="h4" mt={4} mb={4} textAlign="center" letterSpacing="0.05em">{header}</Heading>
                    <Text>{message}</Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    {children}
                </AlertDialogFooter>
            </AlertDialogContent>
        </ChakraAlertDialog>
    )
}

export default AlertDialog
