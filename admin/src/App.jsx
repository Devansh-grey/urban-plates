import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Orders from './Pages/Orders'

const App = () => {
  return (
    // Fixed height of screen and hidden overflow to prevent the whole page from scrolling
    <div className="h-screen flex flex-col bg-[#fffaf5] overflow-hidden">
      <ToastContainer />
      <Navbar />
      
      {/* This container takes up the remaining height under the navbar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* Only this area will scroll */}
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <Routes>
            <Route path='/admin/add' element={<Add />} />
            <Route path='/admin/list' element={<List />} />
            <Route path='/admin/orders' element={<Orders />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App