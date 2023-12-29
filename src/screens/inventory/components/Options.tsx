
import { OptInventory } from "../../../util/routes.data"
import { AppIcon } from "../../../components/ui/AppIcon"
import { useState } from "react"
import AntdModal from "./AntdModal"

// import AddProducts from "./AddProducts"

// import React from 'react'
const Options = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOkModal = () => {
    // Haz lo que necesites con el modal abierto
    console.log('Modal OK button clicked.');
    handleCloseModal();
  };
  return (
    <div className="flex">
        <ul>
                {OptInventory.map((route, index) => (
                    <li key={index} className="
                    my-2 mx-2 inline-flex p-1 pr-4 rounded-md transition-colors duration-300 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-blue-200 shadow-md">
                        <div className="flex">
                        
                         {/* @ts-expect-error: Type busca un string y no detecta la variable */}
                        <AppIcon type={route.icon} className="cursor-pointer mx-2" width={18}></AppIcon>
                        <div onClick={handleShowModal}>{route.name}</div>
                        </div>
                        {/* <AppIcon type="next" className="cursor-pointer" width={18}></AppIcon> */}
                    </li>
                ))}
            </ul>
            <AntdModal visible={showModal} onCancel={handleCloseModal} onOk={handleOkModal} />
    </div>
  )
}

export default Options