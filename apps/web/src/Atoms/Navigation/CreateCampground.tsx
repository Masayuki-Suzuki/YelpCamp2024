import { Flex, Link } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom'

const CreateCampgroundButton = () => {
    return (
        <Link as={ReactRouterLink} to="/campgrounds/create">
            <Flex
                position="fixed"
                right={4}
                bottom={4}
                w={16}
                h={16}
                justifyContent="center"
                alignItems="center"
                rounded="100%"
                bgColor="#000080"
                boxShadow="0px 0px 4px 2px rgba(0, 0, 0, 0.2)"
                transition="all 0.2s ease-in-out"
                _hover={{ transform: 'scale(1.2) rotate(90deg)' }}
            >
                <AddIcon w={5} h={5} color="white" fontWeight="black"/>
            </Flex>
        </Link>
    )
}

export default CreateCampgroundButton
