// usePhonesForm.ts
import { useState } from 'react';
import { IClientPhone } from '@/shared/interfaces/Client/IClientPhone';
import { ClientPostDto, IClientPost } from '../../../shared/interfaces/Client/IClientPost';
import { ClientPhoneDto } from '@/shared/interfaces/Client/IClientPhone';


interface UseClientPhonesResult {
    clientPost: IClientPost;
    addPhone: () => void;
    handlePhoneInputChange: (index: number, field: string, value: string) => void;
  }
  
  const usePhonesForm = (): UseClientPhonesResult => {
    const initialPhone: IClientPhone = new ClientPhoneDto();
  
    const [clientPost, setClientPost] = useState<IClientPost>({
      ...new ClientPostDto(),
      phonesClient: [initialPhone],
    });
  
    const addPhone = () => {
      setClientPost((prevClientPost) => ({
        ...prevClientPost,
        phonesClient: [...prevClientPost.phonesClient, { ...initialPhone }],
      }));
    };
  
    const handlePhoneInputChange = (index: number, field: string, value: string) => {
      setClientPost((prevClientPost) => {
        const updatedPhonesClient = prevClientPost.phonesClient.map((phone, i) =>
          i === index ? { ...phone, [field]: value } : phone
        );
  
        return {
          ...prevClientPost,
          phonesClient: updatedPhonesClient,
        };
      });
    };
  
    return {
      clientPost,
      addPhone,
      handlePhoneInputChange,
    };
  };
  
  export default usePhonesForm;