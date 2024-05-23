import { Routes, Route } from 'react-router-dom'
import CampGrounds from './pages/CampGrounds.tsx'

const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<CampGrounds />} />
      </Routes>
    </>
  )
}

export default App
