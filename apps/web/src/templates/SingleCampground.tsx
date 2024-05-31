import { Nullable } from '../types/utilities.ts'
import { Campground } from '../types/campground.ts'
import PageLayout from './PageLayout.tsx'
import { Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import CampgroundView from '../organisms/CampgroundView.tsx'
import Loading from '../Molecules/Loading.tsx'

type SingleCampgroundProps = {
    id: string
    campground: Nullable<Campground>
    loading: boolean
}

const SingleCampground = ({ id, campground, loading }: SingleCampgroundProps) => (
    <PageLayout>
        {loading || !campground ? <Loading/> : <CampgroundView id={id} campground={campground}/>}
        <Text mt={8}>
            <Link as={ReactRouterLink} to="/campgrounds">
                Back to List
            </Link>
        </Text>
    </PageLayout>
)

export default SingleCampground
