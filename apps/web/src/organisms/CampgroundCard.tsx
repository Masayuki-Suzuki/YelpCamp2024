import { Link as ReactRouterLink } from 'react-router-dom'
import { Button, Card, CardBody, Heading, Image, Link, Skeleton, Text } from '@chakra-ui/react'
import { Campground } from '../types/campground.ts'

type CampGroundCardProps = {
    campground: Campground
    isLoaded: boolean
}

const CampGroundCard = ({ campground, isLoaded }: CampGroundCardProps) => (
    <Card m={2}>
        <CardBody>
            <Skeleton isLoaded={isLoaded}>
                <Image src={campground.image} alt={campground.title} w="100%" rounded="6px"/>
            </Skeleton>
            <Skeleton isLoaded={isLoaded}>
                <Heading as="h4" mt={4} mb={1} fontSize="large" lineHeight={1.1}>{campground.title}</Heading>
            </Skeleton>
            <Skeleton isLoaded={isLoaded}>
                <Text
                    fontSize="small"
                    color="gray.500"
                    mt={0}
                >
                    {campground.location}
                </Text>
            </Skeleton>
            <Skeleton isLoaded={isLoaded}>
                <Text
                    fontSize="large"
                    color=""
                    fontWeight={700}
                    textColor="darkcyan"
                    my={2}
                >
                    $ {campground.price}
                </Text>
            </Skeleton>
            <Skeleton isLoaded={isLoaded}>
                <Button colorScheme="blue">
                    <Link as={ReactRouterLink} to={`/campgrounds/${campground.id}`}>
                        View Details
                    </Link>
                </Button>
            </Skeleton>
        </CardBody>
    </Card>
)

export default CampGroundCard
