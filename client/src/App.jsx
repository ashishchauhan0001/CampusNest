import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import RegisterVendor from './pages/RegisterVendor';
import Land from './pages/land';
import BuildProfile from './pages/BuildProfile';
import Dash from './pages/vendor/dash';
import Property from './pages/Property';
import Showlist from './pages/vendor/Showlist';
import Showtenant from './pages/vendor/Showtenant'
import LandlordContact from './components/LandlordContact';
import Showstatus from './pages/userDash/Showstatus';
import Shownest from './pages/userDash/Shownest'

export default function App() {
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
        <Route path="/nest" element={<Shownest/>}/> 
          {/*  */}
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
