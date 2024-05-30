import { Link as ReactRouterLink } from 'react-router-dom'
import { Heading, Link, UnorderedList, ListItem } from '@chakra-ui/react'
import PageLayout from '../templates/PageLayout'

const Home = () => (
    <PageLayout>
        <Heading as="h1" mb={8}>Home</Heading>
        <UnorderedList styleType="none" spacing={3} ml={0} flexDir="row">
            <ListItem>
                <Link as={ReactRouterLink} to="/campgrounds">All Campgrounds</Link>
            </ListItem>
        </UnorderedList>
    </PageLayout>
)

export default Home
