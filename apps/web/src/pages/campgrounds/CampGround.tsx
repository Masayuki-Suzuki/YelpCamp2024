import { useEffect, JSX, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link as ReactRouterLink } from 'react-router-dom'
import { AppDispatch } from '../../store'
import { selectCampground, selectCampgroundsLoading, fetchOneCampground } from '../../features/campgrounds'
import { Divider, Heading, Text, Link } from '@chakra-ui/react'
import { Campground } from '../../types/campground.ts'
import { Nullable } from '../../types/utilities.ts'
import PageLayout from '../../templates/PageLayout.tsx'

type DomProps = {
    children: JSX.Element
}

type ViewProps = {
    id: string
    campground: Nullable<Campground>
    loading: boolean
}

const CampGroundDom = ({ children }: DomProps) => (
    <PageLayout>
        <Heading as="h1" size="2xl" pb={4}>Show Campground</Heading>
        <Divider mt={4} mb={6} borderColor="#3c3c3c"/>
        {children}
        <Text mt={8}>
            <Link as={ReactRouterLink} to="/campgrounds">
                Back to List
            </Link>
        </Text>
    </PageLayout>
)

const CampgroundView = ({ id, campground, loading }: ViewProps) => {
    if (loading) {
        return <Text>Loading...</Text>
    } else if (campground) {
        return (
            <>
                <Heading as="h2" mb={3}>{campground.title}</Heading>
                <Text fontSize="xl" textColor="#777">{campground.location}</Text>
                <Text mt={8}>
                    <Link as={ReactRouterLink} to={`/campgrounds/${id}/update`}>
                        Edit Campground
                    </Link>
                </Text>
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
    const [paramsId, setParamsId] = useState<string>('')

    useEffect(() => {
        if (params && params.id) {
            setParamsId(params.id)
            dispatch(fetchOneCampground(params.id))
        }
    }, [])

    return (
        <CampGroundDom>
            <CampgroundView id={paramsId} campground={campground} loading={loading}/>
        </CampGroundDom>
    )
}

export default CampGround
