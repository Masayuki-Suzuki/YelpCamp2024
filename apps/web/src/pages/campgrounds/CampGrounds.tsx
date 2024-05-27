import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as ReactRouterLink } from'react-router-dom'
import { Box, Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { selectCampgrounds, selectCampgroundsLoading, selectCampgroundsStatus } from '../../features/campgrounds'
import { fetchAllCampgrounds } from '../../features/campgrounds'
import { AppDispatch } from '../../store'
import { FetchStatus } from '../../types/utilities'
import { Campgrounds } from '../../types/campground'

type ListProps = {
    loading: boolean
    campgrounds: Campgrounds
}

type DomProps = {
    status: FetchStatus
    children: React.JSX.Element
}

const CreateCampGroundList = ({ loading, campgrounds } : ListProps) => {
    if(loading) {
        return <Text>Loading...</Text>
    } else {
        const listItems = campgrounds.map(campground => (
            <ListItem key={campground.id} pl={0}>
                <Link as={ReactRouterLink} to={`/campgrounds/${campground.id}`}>
                    {campground.title}
                </Link>
            </ListItem>
        ))

        return (
            <UnorderedList styleType="none" spacing={3} ml={0}>
                {listItems}
            </UnorderedList>
        )
    }
}

const CampGroundsDom = ({ status, children }: DomProps) => (
    <Box w="100%" minH="100vh" p={6} maxW={1280} mx="auto">
        <Heading as="h1" mb={8}>All Campgrounds</Heading>
        {children}
        <Text mt={8} mb={8}>Status: {status}</Text>
        <Link as={ReactRouterLink} to='/'>
            Back to Home
        </Link>
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

    return (
        <CampGroundsDom status={status}>
            <CreateCampGroundList loading={loading} campgrounds={campgrounds} />
        </CampGroundsDom>
    )
}

export default CampGrounds
