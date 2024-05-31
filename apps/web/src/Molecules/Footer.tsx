import { Box } from '@chakra-ui/react'
import Copyright from '../Atoms/Copyright.tsx'

const Footer = () => (
    <Box as="footer" bgColor="#2c2c2c" py={4} px={8}>
        <Box as="div" maxW={1280} mx="auto">
            <Copyright/>
        </Box>
    </Box>
)

export default Footer
