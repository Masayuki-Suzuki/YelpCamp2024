import { Campgrounds } from '../types/campground.ts'
import { Heading, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import PageLayout from './PageLayout.tsx'
import CreateCampgroundButton from '../Atoms/Navigation/CreateCampground'
import CampgroundsList from '../organisms/CampgroundsList'

type CampgroundsTemplateProps = {
    campgrounds: Campgrounds
    isLoaded: boolean
}

const CampgroundsTemplate = ({ isLoaded, campgrounds }: CampgroundsTemplateProps) => (
    <PageLayout>
        <Heading as="h1" mb={8}>All Campgrounds</Heading>
        <CampgroundsList isLoaded={isLoaded} campgrounds={campgrounds}/>
        <Link as={ReactRouterLink} to="/">
            Back to Home
        </Link>
        <CreateCampgroundButton/>
    </PageLayout>
)

export default CampgroundsTemplate
