import { lazy, Suspense } from 'react';
import { Outlet } from "react-router-dom";

const Sidebar = lazy(() => import('@/components/ui/Sidebar'));
const Header = lazy(() => import('@/components/ui/Header'));

import { AppIcon } from "@/components/ui/AppIcon"
import { useState } from "react"

// import React from 'react'
const MainLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <div className="main-layout bg-[#F7F7F7] h-screen">
      {/* <AppHeader /> */}
      <div className="w-screen h-12 text-white pl-56 bg-sky-950 z-10 fixed border-b-2 border-gray-600 shadow-sm">
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header />
        </Suspense>
      </div>
      <div className="mr-1">
        <main className="grid grid-cols-12 gap-4">
          <div className={`sidebard col-span-${sidebarVisible ? '2' : '1'} bg-sky-950 h-screen z-10 border-gray-800 sticky top-0`}>
            <button onClick={toggleSidebar} className="absolute top-0 left-0 mt-4 ml-4 hidden">
              <AppIcon type="dashboard" className="cursor-pointer" width={54} />
            </button>
            <Suspense fallback={<div>Loading Sidebar...</div>}>
              <Sidebar sidebarVisible={sidebarVisible} />
            </Suspense>
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