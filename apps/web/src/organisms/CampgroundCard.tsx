import { Link as ReactRouterLink } from 'react-router-dom'
import { Box, Button, Card, CardBody, Heading, Image, Link, Skeleton, Text } from '@chakra-ui/react'
import { Campground } from '../types/campground.ts'

type CampGroundCardProps = {
    campground: Campground
    isLoaded: boolean
}

const CampGroundCard = ({ campground, isLoaded }: CampGroundCardProps) => (
    <Card m={2}>
        <CardBody p={0}>
            <Skeleton isLoaded={isLoaded}>
                <Image src={campground.image} alt={campground.title} w="100%" rounded="6px 6px 0 0"/>
            </Skeleton>
            <Box px={4} pt={6} pb={4}>
                <Skeleton isLoaded={isLoaded}>
                    <Heading as="h4" mb={1} fontSize="large" lineHeight={1.1}>{campground.title}</Heading>
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
                        mt={2}
                        mb={6}
                    >
                        $ {campground.price} / night
                    </Text>
                </Skeleton>
                <Skeleton isLoaded={isLoaded}>
                    <Box as="span" data-group>
                        <Button
                            colorScheme="blue"
                            cursor="pointer"
                            display="flex"
                            alignItems="stretch"
                            px={0}
                            _groupHover={{ backgroundColor: 'transparent' }}
                        >
                            <Link
                                as={ReactRouterLink}
                                to={`/campgrounds/${campground.id}`}
                                display="flex"
                                alignItems="center"
                                px={4}
                                _hover={{ textDecoration: 'none' }}
                                _groupHover={{ color: 'blue.500' }}
                            >
                                View Details
                            </Link>
                        </Button>
                    </Box>
                </Skeleton>
            </Box>
        </CardBody>
    </Card>
)

export default CampGroundCard
