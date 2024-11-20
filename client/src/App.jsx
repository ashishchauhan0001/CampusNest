import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import Header from './components/Header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Search from './pages/Search.jsx';
import RegisterVendor from './pages/RegisterVendor.jsx';
import Land from './pages/Land.jsx';
import BuildProfile from './pages/BuildProfile.jsx';
import Dash from './pages/vendor/dash.jsx';
import Property from './pages/Property.jsx';
import Showlist from './pages/vendor/Showlist.jsx';
import Showtenant from './pages/vendor/Showtenant.jsx';
import LandlordContact from './components/LandlordContact.jsx';
import Showstatus from './pages/userDash/Showstatus.jsx';
import Shownest from './pages/userDash/Shownest.jsx';
import Footer from './components/Footer.jsx';
import MapSearch from './components/MapSearch.jsx';
import Statistics from './components/Statistics.jsx';
import Loader from './components/Loader.jsx';
import toast, { Toaster } from 'react-hot-toast';
// import { ToastContainer, toast } from "react-toastify";


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => setLoading(false), 3000);
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
      <Toaster/>
    </BrowserRouter>
  );
}
