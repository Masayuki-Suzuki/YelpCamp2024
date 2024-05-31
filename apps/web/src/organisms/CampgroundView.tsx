import { Box, Heading, Link, Text, Image } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Campground } from '../types/campground.ts'

type CampgroundViewProps = {
    id: string
    campground: Campground
}

const CampgroundView = ({ id, campground }: CampgroundViewProps) => (
    <Box>
        <Heading as="h2" mb={3}>{campground.title}</Heading>
        <Text fontSize="xl" textColor="#777">{campground.location}</Text>
        <Image src={campground.image} alt={campground.title}/>
        <Text mt={8}>{campground.description}</Text>
        <Text mt={8}>
            <Link as={ReactRouterLink} to={`/campgrounds/${id}/update`}>
                Edit Campground
            </Link>
        </Text>
    </Box>
)

export default CampgroundView
