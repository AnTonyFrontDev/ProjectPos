// import React from 'react'
import ViewForm from '@/components/FormularioV4/viewForm';
import { APP_ICONS } from '@/shared/constants/icons-constants';
import ButtonModal from './Modal/ButtonModal';

const G_Options = ({ buttonText, usarForm }: { buttonText: string, usarForm: string }) => {

  return (
    <div className="flex">
      <ul>
        <li>
          <div className="flex">
            <ButtonModal
              buttonText={buttonText}
              modalTitle=""
              size={15}
              modalContent={<ViewForm usarForm={usarForm} />}
              iconType={"dashboard" as keyof typeof APP_ICONS}
              cssColor='green'
            />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default G_Options
