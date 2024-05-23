import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Heading, ListItem, Text, UnorderedList, } from '@chakra-ui/react'
import { selectCampgrounds, selectCampgroundsLoading, selectCampgroundsStatus } from '../features/campgrounds'
import { fetchAllCampgrounds } from '../features/campgrounds'
import { AppDispatch } from '../store'
import { FetchStatus } from '../types/utilities.ts'
import { Campgrounds } from '../types/campground.ts'

type DomProps = {
    campgrounds: Campgrounds
    loading: boolean
    status: FetchStatus
}

const CampGroundsDom = ({ campgrounds, loading, status }: DomProps) => (
    <Box w="100%" minH="100vh" p={6} maxW={1280} mx="auto">
        <Heading as="h1" mb={8}>All Campgrounds</Heading>
        {loading ? <Text>Loading...</Text> : (
            <UnorderedList styleType="none" spacing={3} ml={0}>
                {campgrounds.map(campground => (
                    <ListItem key={campground.id} pl={0}>{campground.title}</ListItem>
                ))}
            </UnorderedList>
        )}
        <Text mt={8}>Status: {status}</Text>
    </Box>
)

const CampGrounds = () => {
    const dispatch: AppDispatch = useDispatch()
    const campgrounds = useSelector(selectCampgrounds)
    const loading = useSelector(selectCampgroundsLoading)
    const status = useSelector(selectCampgroundsStatus)

    useEffect(() => {
        dispatch(fetchAllCampgrounds())
    }, [])

    return <CampGroundsDom campgrounds={campgrounds} loading={loading} status={status}/>
}

export default CampGrounds
