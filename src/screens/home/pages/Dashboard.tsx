import { Example1, Example2, Example3, Example5 } from '../components/example';
import Table from '../components/tableExample'
// import React from 'react'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {/* Div 1 */}
      <div className="col-span-2 bg-gray-50 shadow-lg p-4 rounded-md">
        <Example1/>
      </div>

      {/* Div 2 */}
      <div className="col-span-2 bg-gray-50 shadow-lg p-4 rounded-md flex justify-center">
        {/* Contenido del segundo div */}
        <Example2/>
      </div>

      {/* Div 3 */}
      <div className="col-span-1 bg-gray-50 shadow-lg p-4 rounded-md flex justify-center">
        {/* Contenido del tercer div */}
        <Example3/>
      </div>

      {/* Div 4 */}
      <div className="col-span-2 bg-gray-50 shadow-lg p-4 rounded-md flex justify-between">
        {/* Contenido del cuarto div */}
        <Example5/>
        <Example5/>
      </div>

      {/* Div 5 */}
      <div className="bg-gray-50 shadow-lg p-4 rounded-md flex justify-center">
        {/* Contenido del quinto div */}
        <Example5/>
      </div>

      {/* Div 5 */}
      <div className="col-span-4 bg-gray-50 shadow-lg p-4 rounded-md">
        
        {/* Contenido del quinto div */}
        <Table/>
      </div>
    </div>
  )
}

export default Dashboard