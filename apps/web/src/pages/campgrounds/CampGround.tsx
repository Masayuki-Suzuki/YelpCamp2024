import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '../../store'
import { selectCampground, selectCampgroundsLoading, fetchOneCampground } from '../../features/campgrounds'
import SingleCampground from '../../templates/SingleCampground.tsx'

const CampGround = () => {
    const dispatch: AppDispatch = useDispatch()
    const campground = useSelector(selectCampground)
    const loading = useSelector(selectCampgroundsLoading)
    const params = useParams()
    const [paramsId, setParamsId] = useState<string>('')

    useEffect(() => {
        if (params && params.id) {
            setParamsId(params.id)
            dispatch(fetchOneCampground(params.id))
        }
    }, [])

    return <SingleCampground id={paramsId} campground={campground} loading={loading}/>

}

export default CampGround
