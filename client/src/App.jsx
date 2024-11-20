import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp.jsx';
import About from './Pages/About.jsx';
import Profile from './Pages/Profile.jsx';
import Header from './components/Header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Search from './Pages/Search.jsx';
import RegisterVendor from './Pages/RegisterVendor.jsx';
import Land from './Pages/Land.jsx';
import BuildProfile from './Pages/BuildProfile.jsx';
import Dash from './Pages/vendor/dash.jsx';
import Property from './Pages/Property.jsx';
import Showlist from './Pages/vendor/Showlist.jsx';
import Showtenant from './Pages/vendor/Showtenant.jsx';
import LandlordContact from './components/LandlordContact.jsx';
import Showstatus from './Pages/userDash/Showstatus.jsx';
import Shownest from './Pages/userDash/Shownest.jsx';
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
