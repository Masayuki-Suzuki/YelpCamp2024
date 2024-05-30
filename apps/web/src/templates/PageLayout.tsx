import { Box } from '@chakra-ui/react'
import HeaderNav from '../organisms/HeaderNav.tsx'

const PageLayout = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <Box w="100%" minH="100vh">
        <HeaderNav/>
        <Box w="100%" maxW={1280} minH="100vh" px={12} pt={24} pb={12} mx="auto">
            {children}
        </Box>
    </Box>
)

export default PageLayout
