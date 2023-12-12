import BreadcrumbData from "../../../components/Breadcrumb"
import Table from '../components/Tabla'
// import React from 'react'


const Inventory = () => {
    const routes = [
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/' },
        { title: 'Inventory', path: '/inventory' },
        // { title: 'An Application', path: '/an-application' },
      ];
  return (
    <div>
        <BreadcrumbData routes={routes}/>
        <div className="mt-10">
            <Table/>    
        </div>
    </div>
  )
}

export default Inventory