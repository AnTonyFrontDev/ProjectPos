import { Outlet } from "react-router-dom"
import Sidebard from "../../components/Sidebar"
import  Header from "../../components/Header"

// import React from 'react'
const MainLayout = () => {
  return (
    <div className="main-layout bg-[#F7F7F7] h-screen">
        {/* <AppHeader /> */}
        <div className="w-screen h-12 text-white pl-56 bg-sky-950 z-10 fixed border-b-2 border-gray-600 shadow-sm">
          <Header/>
        </div>
      <div className="mr-1">
        <main className="grid grid-cols-12 gap-4">
          <div className="sidebard col-span-2 bg-sky-950 h-screen z-10 border-gray-800 sticky top-0">
            <Sidebard />
          </div>
          <div className="content col-span-10 m-10 mt-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout