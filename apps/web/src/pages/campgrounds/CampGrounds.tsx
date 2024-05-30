import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { selectCampgrounds, selectCampgroundsLoading, selectCampgroundsStatus } from '../../features/campgrounds'
import { fetchAllCampgrounds } from '../../features/campgrounds'
import { AppDispatch } from '../../store'
import { FetchStatus } from '../../types/utilities'
import { Campgrounds } from '../../types/campground'
import PageLayout from '../../templates/PageLayout.tsx'
import CreateCampgroundButton from '../../Atoms/Navigation/CreateCampground.tsx'

type ListProps = {
    loading: boolean
    campgrounds: Campgrounds
}

type DomProps = {
    status: FetchStatus
    children: React.JSX.Element
}

const CreateCampGroundList = ({ loading, campgrounds }: ListProps) => {
    if (loading) {
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
    <PageLayout>
        <Heading as="h1" mb={8}>All Campgrounds</Heading>
        {children}
        <Text mt={8} mb={8}>Status: {status}</Text>
        <Link as={ReactRouterLink} to="/">
            Back to Home
        </Link>
        <CreateCampgroundButton/>
    </PageLayout>
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
            <CreateCampGroundList loading={loading} campgrounds={campgrounds}/>
        </CampGroundsDom>
    )
}

export default CampGrounds
