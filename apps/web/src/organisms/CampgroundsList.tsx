import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Campgrounds } from '../types/campground'
import CampgroundCard from './CampgroundCard'

type CampgroundsListProps = {
    campgrounds: Campgrounds
    isLoaded: boolean
}

const CampgroundsList = ({ campgrounds, isLoaded }: CampgroundsListProps) => (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 900: 3, 1280: 4 }}>
        <Masonry gutter="12px">
            {campgrounds.map(campground => (
                <div key={campground.id}>
                    <CampgroundCard campground={campground} isLoaded={isLoaded}/>
                </div>
            ))}
        </Masonry>
    </ResponsiveMasonry>
)

export default CampgroundsList
