import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Footer from './components/Footer/Footer'

const App = () => {

  const location = useLocation();
  const [showLogin,setShowLogin] = useState(false);


  return (
    <div className="min-h-screen bg-[#fffaf5] selection:bg-[#ff5a00]/30 flex flex-col">
        <>
        {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
        <Navbar  showLogin={showLogin} setShowLogin={setShowLogin}/>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/order' element={<PlaceOrder />}/>
        </Routes>
        <Footer />
        
        </>
    </div>
  )
}

export default App
