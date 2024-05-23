import { Box, Heading } from '@chakra-ui/react'



const CampGroundsDom = () => (
    <Box w='100%' h='100vh' p={6} maxW={1280} mx='auto'>
        <Heading as="h1">All Campgrounds</Heading>
    </Box>
)

const CampGrounds = () => {
    return <CampGroundsDom />
}

export default CampGrounds
