import { Box } from '@chakra-ui/react'
import CampGroundForm from '../organisms/CampgroundForm.tsx'
import { CampgroundForm } from '../types/campground.ts'
import CommonMainHeading from '../Atoms/CommonMainHeading.tsx'

type CampgroundFormPageTemplateProps = {
    heading: string
    initialValues: CampgroundForm
    mode: 'create' | 'edit'
    isLoading: boolean
    postId?: string
}

const CampgroundFormPageTemplate = ({heading, initialValues, mode, isLoading, postId}: CampgroundFormPageTemplateProps) => (
    <Box w="100%" maxH={1280} minH="100vh" p={8}>
        <CommonMainHeading text={heading} />
        <CampGroundForm initialValues={initialValues} mode={mode} postId={postId} isLoading={isLoading} />
    </Box>
)

export default CampgroundFormPageTemplate
