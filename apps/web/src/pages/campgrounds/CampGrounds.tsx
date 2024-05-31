import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCampgrounds, selectCampgroundsLoading } from '../../features/campgrounds'
import { fetchAllCampgrounds } from '../../features/campgrounds'
import { AppDispatch } from '../../store'
import CampgroundsTemplate from '../../templates/CampgroundsTemplate.tsx'

const CampGrounds = () => {
    const dispatch: AppDispatch = useDispatch()
    const campgrounds = useSelector(selectCampgrounds)
    const loading = useSelector(selectCampgroundsLoading)
    const [isLoaded, setIsLoaded] = React.useState(false)

    useEffect(() => {
        dispatch(fetchAllCampgrounds())
    }, [])

    useEffect(() => {
        setIsLoaded(!loading)
    }, [loading])

    return (
        <CampgroundsTemplate isLoaded={isLoaded} campgrounds={campgrounds}/>
    )
}

export default CampGrounds
