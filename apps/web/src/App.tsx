import { Routes, Route } from 'react-router-dom'
import CampGrounds from './pages/campgrounds/CampGrounds'
import CampGround from './pages/campgrounds/CampGround'
import Home from './pages/Home.tsx'
import CreateCampground from './pages/campgrounds/CreateCampground.tsx'
import EditCampground from './pages/campgrounds/EditCampground.tsx'

const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campgrounds" element={<CampGrounds />} />
          <Route path="/campgrounds/create" element={<CreateCampground />} />
          <Route path="/campgrounds/:id" element={<CampGround />} />
          <Route path="/campgrounds/:id/update" element={<EditCampground />} />
      </Routes>
    </>
  )
}

export default App
