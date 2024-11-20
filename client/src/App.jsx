import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Search from './pages/Search';
import RegisterVendor from './pages/RegisterVendor';
import Land from './pages/land';
import BuildProfile from './pages/BuildProfile';
import Dash from './pages/vendor/dash';
import Property from './pages/Property';
import Showlist from './pages/vendor/Showlist';
import Showtenant from './pages/vendor/Showtenant';
import LandlordContact from './components/LandlordContact';
import Showstatus from './pages/userDash/Showstatus';
import Shownest from './pages/userDash/Shownest';
import Footer from './components/Footer';
import MapSearch from './components/MapSearch';
import Statistics from './components/Statistics';
import Loader from './components/Loader'; 

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <Loader />; 
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Land />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/vend' element={<RegisterVendor />} />
        <Route path='/property/:listingId' element={<Property />} />
        {/* <Route path='/listing/:listingId' element={<Listing />} /> */}
        <Route path='/build' element={<BuildProfile />} />
        <Route path='/show' element={<Dash />} />
        <Route path='/viewlist' element={<Showlist />} />
        <Route path='/view-tenants' element={<Showtenant />} />
        <Route path='/rent' element={<Showstatus />} />
        <Route path="/landlord-contact" element={<LandlordContact />} />
        <Route path="/nest" element={<Shownest />} />
        <Route path="/map-search" element={<MapSearch />} />
        <Route path="/view-dash" element={<Statistics />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
