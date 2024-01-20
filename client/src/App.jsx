import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Profile from "./Pages/Profile"
import Signin from "./Pages/Signin"
import Signout from "./Pages/Signout"
import Header from './Components/Header'
import Signup from './Pages/Signup'
import Listing from './Pages/Listing'
import Search from './Pages/Search'
import Privateroute from './Components/Privateroute'
import CreateListing from './Components/CreateListing'
import UpdateListing from './Pages/UpdateListing'


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route  element={<Privateroute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlisting" element={<CreateListing/>} />
          <Route path="/updatelisting/:listingId" element={<UpdateListing/>} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        
      </Routes>
    </BrowserRouter>
  );
    
  
}

export default App