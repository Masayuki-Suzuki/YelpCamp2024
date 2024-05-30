import { Link as ReactRouterLink } from 'react-router-dom'
import { Flex, Box, Link } from '@chakra-ui/react'
import Logo from '../Atoms/Logo'
import HeaderNavList from '../Molecules/HeaderNavList.tsx'

const HeaderNav = () => (
    <Box as="nav" position="fixed" w="100%" bgColor="#2c2c2c">
        <Flex justifyContent="space-between" alignItems="center" px={12} py={4} maxW={1280} mx="auto">
            <Link as={ReactRouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                <Logo/>
            </Link>
            <Box>
                <HeaderNavList/>
            </Box>
        </Flex>
    </Box>
)

export default HeaderNav
