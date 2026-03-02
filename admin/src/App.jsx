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
    <div className="min-h-screen bg-[#fffaf5]">
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 lg:p-12">
          <Routes >
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
