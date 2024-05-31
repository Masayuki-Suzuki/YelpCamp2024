import { Box } from '@chakra-ui/react'
import HeaderNav from '../organisms/HeaderNav.tsx'
import Footer from '../Molecules/Footer.tsx'

const PageLayout = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <Box w="100%">
        <HeaderNav/>
        <Box w="100%" maxW={1280} minH="calc(100vh - 53px)" px={12} pt={24} pb={12} mx="auto">
            {children}
        </Box>
        <Footer/>
    </Box>
)

export default PageLayout
