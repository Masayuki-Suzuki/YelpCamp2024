import CampGroundForm from '../organisms/CampgroundForm.tsx'
import { CampgroundForm } from '../types/campground.ts'
import CommonMainHeading from '../Atoms/CommonMainHeading.tsx'
import PageLayout from './PageLayout.tsx'

type CampgroundFormPageTemplateProps = {
    heading: string
    initialValues: CampgroundForm
    mode: 'create' | 'edit'
    isLoading: boolean
    postId?: string
}

const CampgroundFormPageTemplate =
    (
        {
            heading,
            initialValues,
            mode,
            isLoading,
            postId
        }: CampgroundFormPageTemplateProps
    ) => (
        <PageLayout>
            <CommonMainHeading text={heading}/>
            <CampGroundForm initialValues={initialValues} mode={mode} postId={postId} isLoading={isLoading}/>
        </PageLayout>
    )

export default CampgroundFormPageTemplate
