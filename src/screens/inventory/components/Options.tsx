
// import React from 'react'
import ButtonModal from '@/components/Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';
import { APP_ICONS } from '@/shared/constants/icons-constants';

const Options = () => {

  return (
    <div className="flex">
      <ul>
        <li>
          <div className="flex">
            {/* <AppIcon type="dashboard" className="cursor-pointer mx-2" width={18} /> */}
            <ButtonModal
              buttonText="New Inventory"
              modalTitle=""
              modalContent={<ViewForm usarForm="Inventory" />}
              // modalContent={<InventoryForm/>}
              iconType={"dashboard" as keyof typeof APP_ICONS}
              cssColor='green'
            />
            
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Options