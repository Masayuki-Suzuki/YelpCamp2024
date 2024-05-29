import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button } from '@chakra-ui/react'
import { selectCampgroundsLoading } from '../../features/campgrounds'
import Loading from '../../Molecules/Loading.tsx'
import { useParams } from 'react-router-dom'
import { deleteOneCampground } from '../../features/campgrounds/campgroundsSlice.ts'
import { AppDispatch } from '../../store'

type FormDeleteButtonProps = {
    text: string
}

type FormDeleteDomProps = {
    isLoading: boolean
    onSubmit: () => void
    text: string
}

const FormDeleteButtonDom = ({ isLoading, onSubmit, text }: FormDeleteDomProps) => {
    if (isLoading) {
        return <Loading/>
    } else {
        return (
            <Box my={6}>
                <Button colorScheme="red" onClick={onSubmit}>{text}</Button>
            </Box>
        )
    }
}

const FormDeleteButton = ({ text }: FormDeleteButtonProps) => {
    const dispatch: AppDispatch = useDispatch()
    const loading = useSelector(selectCampgroundsLoading)
    const params = useParams()
    const [isLoading, setIsLoading] = useState(loading)

    const onSubmit = () => {
        setIsLoading(true)
        let postId = ''

        if (params && params.id) {
            postId = params.id
        } else {
            const idFromPathname = location.pathname.split('/')[2]
            if (idFromPathname) {
                postId = idFromPathname
            }
        }

        dispatch(deleteOneCampground(postId))
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(loading)
    }, [loading])

    return <FormDeleteButtonDom isLoading={isLoading} onSubmit={onSubmit} text={text}/>
}

export default FormDeleteButton
