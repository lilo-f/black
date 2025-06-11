import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Artists from '../pages/Artists'
import ArtistProfile from '../pages/ArtistProfile'
import Studio from '../pages/Studio'
import Booking from '../pages/Booking'
import Aftercare from '../pages/Aftercare'
import Layout from '../components/Layout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="artists" element={<Artists />} />
        <Route path="artists/:id" element={<ArtistProfile />} />
        <Route path="studio" element={<Studio />} />
        <Route path="booking" element={<Booking />} />
        <Route path="aftercare" element={<Aftercare />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes