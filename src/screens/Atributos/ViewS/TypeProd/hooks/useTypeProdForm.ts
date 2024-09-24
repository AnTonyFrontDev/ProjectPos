import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { TypeProdDto, ITypeProd, TypeProdUpdateDto } from '@/shared/interfaces/ITypeProd';
import { SaveTypeProd, UpdateTypeProd } from '@/shared/Api/TypeProduct';

export const useTypeProdForm = () => {
  const [formData, setFormData] = useState<ITypeProd>(new TypeProdDto());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('TypeProd Data:', formData);

    GenericRequest(formData, SaveTypeProd, "TypeProd data submitted successfully")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting TypeProd data:", error);
      });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: ITypeProd = new TypeProdUpdateDto(formData);
    console.log('TypeProd Data:', updateData);
    GenericRequest(updateData, UpdateTypeProd, "TypeProd data updated successfully");
    window.location.reload();
  };

  return { formData, setFormData, handleInputChange, handleSubmit, handleUpdate };
};
