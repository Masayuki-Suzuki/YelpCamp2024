import { useEffect, JSX } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link as ReactRouterLink } from'react-router-dom'
import { AppDispatch } from '../store'
import { selectCampground, selectCampgroundsLoading, fetchOneCampground } from '../features/campgrounds'
import { Box, Divider, Heading, Text, Link } from '@chakra-ui/react'
import { Campground } from '../types/campground.ts'
import { Nullable } from '../types/utilities.ts'

type DomProps = {
    children: JSX.Element
}

type ViewProps = {
    campground: Nullable<Campground>
    loading: boolean
}

const CampGroundDom = ({ children }: DomProps) => (
    <Box w="100%" maxH={1280} minH="100vh" p={8} mx="auto">
        <Heading as="h1" size='2xl' pb={4}>Show Campground</Heading>
        <Divider mt={4} mb={6} borderColor="#3c3c3c"/>
        { children }
        <Text mt={8}>
            <Link as={ReactRouterLink} to='/campgrounds'>
                Back to List
            </Link>
        </Text>
    </Box>
)

const CampgroundView = ({ campground, loading }: ViewProps) => {
    if (loading) {
        return <Text>Loading...</Text>
    } else if(campground) {
        return (
            <>
                <Heading as="h2" mb={3}>{campground.title}</Heading>
                <Text fontSize='xl' textColor="#777">{campground.location}</Text>
            </>
        )
    } else {
        return <Text>No Campground Data</Text>
    }
}


const CampGround = () => {
    const dispatch: AppDispatch = useDispatch()
    const campground = useSelector(selectCampground)
    const loading = useSelector(selectCampgroundsLoading)
    const params = useParams()

    useEffect(() => {
        if (params && params.id) {
            dispatch(fetchOneCampground(params.id))
        }
    }, [])

    return (
        <CampGroundDom>
            <CampgroundView campground={campground} loading={loading} />
        </CampGroundDom>
    )
}

export default CampGround
