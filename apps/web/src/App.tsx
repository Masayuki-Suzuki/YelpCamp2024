import { Routes, Route } from 'react-router-dom'
import CampGrounds from './pages/CampGrounds'
import CampGround from './pages/CampGround'
import Home from './pages/Home.tsx'
import CreateCampground from './pages/CreateCampground.tsx'

const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campgrounds" element={<CampGrounds />} />
          <Route path="/campgrounds/create" element={<CreateCampground />} />
          <Route path="/campgrounds/:id" element={<CampGround />} />
      </Routes>
    </>
  )
}

export default App
