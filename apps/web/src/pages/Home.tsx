import { Link as ReactRouterLink } from 'react-router-dom'
import { Box, Heading, Link, UnorderedList, ListItem } from '@chakra-ui/react'

const Home = () => (
    <Box w="100%" minH="100vh" p={6} maxW={1280} mx="auto">
        <Heading as="h1" mb={8}>Home</Heading>
        <UnorderedList styleType="none" spacing={3} ml={0} flexDir="row">
            <ListItem>
                <Link as={ReactRouterLink} to="/campgrounds">All Campgrounds</Link>
            </ListItem>
            <ListItem>
                <Link as={ReactRouterLink} to="/campgrounds/create">Create Campground</Link>
            </ListItem>
        </UnorderedList>
    </Box>
)

export default Home
