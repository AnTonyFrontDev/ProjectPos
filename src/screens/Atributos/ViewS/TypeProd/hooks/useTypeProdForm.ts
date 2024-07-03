import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { TypeProdDto, ITypeProdPost } from '@/shared/interfaces/Product/TypeProd/ITypeProdPost';
import { SaveTypeProd, UpdateTypeProd } from '@/shared/Api/Products/TypeProd/TypeProduct';
import { ITypeProdUpdate, TypeProdUpdateDto } from '@/shared/interfaces/Product/TypeProd/ITypeProdUpdate';



export const useTypeProdForm = () => {
  const [formData, setFormData] = useState<ITypeProdPost>(new TypeProdDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('TypeProd Data:', formData);
    GenericRequest(formData, SaveTypeProd, "TypeProd data submitted successfully");
    window.location.reload();
  };
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: ITypeProdUpdate = new TypeProdUpdateDto(formData);
    console.log('TypeProd Data:', updateData);
    GenericRequest(updateData, UpdateTypeProd, "TypeProd data updated successfully");
    window.location.reload();
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
