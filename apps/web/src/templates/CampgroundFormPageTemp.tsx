import { Box } from '@chakra-ui/react'
import CampGroundForm from '../organisms/CampgroundForm.tsx'
import { CampgroundForm } from '../types/campground.ts'
import LoadingComponent from '../Molecules/Loading.tsx'
import CommonMainHeading from '../Atoms/CommonMainHeading.tsx'

type CampgroundFormPageTemplateProps = {
    heading: string
    initialValues: CampgroundForm
    mode: 'create' | 'edit'
    isLoading: boolean
}

const CampgroundFormPageTemplate = ({heading, initialValues, mode, isLoading}: CampgroundFormPageTemplateProps) => (
    <Box w="100%" maxH={1280} minH="100vh" p={8}>
        <CommonMainHeading text={heading} />
        {isLoading ? <LoadingComponent /> : <CampGroundForm initialValues={initialValues} mode={mode} />}
    </Box>
)

export default CampgroundFormPageTemplate
