import { Heading } from '@chakra-ui/react'

type CommonMainHeadingProps = {
    text: string
}

const CommonMainHeading = ({ text }: CommonMainHeadingProps) => <Heading as="h1" size="xl" pb={4}>{ text }</Heading>

export default CommonMainHeading
