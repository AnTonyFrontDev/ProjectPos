
// import React from 'react'
import ButtonModal from '@/components/Generics/Modal/ButtonModal';
import ViewForm from '@/components/FormularioV4/viewForm';
import { APP_ICONS } from '@/shared/constants/icons-constants';

const Options = () => {

  return (
    <div className="flex">
      <ul>
        <li>
          <div className="flex">
            <ButtonModal
              buttonText="Nuevo Tipo Pago"
              modalTitle=""
              size={15}
              modalContent={<ViewForm usarForm="TypePay" />}
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