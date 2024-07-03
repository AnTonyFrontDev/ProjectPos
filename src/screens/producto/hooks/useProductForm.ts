import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { IOptionSelect } from '@/components/FormularioV4/Config/interface';
import { SaveProduct, UpdateProduct } from '@/shared/Api/Products/ProductApi';
import { getTypes } from '@/shared/Api/Products/TypeProd/TypeProduct';
import { IProductPost, ProductDtoPost } from '@/shared/interfaces/Product/IProductPost';
import { IProductUpdate, ProductUpdateDto } from '@/shared/interfaces/Product/IProductUpdate';



export const useProductForm = () => {
  const [formData, setFormData] = useState<IProductPost>(new ProductDtoPost());
  const [typeProdOptions, setTypeProdOptions] = useState<IOptionSelect[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product Data:', formData);
    GenericRequest(formData, SaveProduct, "Payment data submitted successfully");
    window.location.reload();
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IProductUpdate = new ProductUpdateDto(formData);
    console.log('Product Data:', updateData);
    GenericRequest(updateData, UpdateProduct, "Payment data updated successfully");
    window.location.reload();
  };

  const loadTypeProdOptions = async () => {
    try {
      const prodTypes = await getTypes(); // Llama a la función para obtener los tipos de pago
      const options: IOptionSelect[] = prodTypes.map((type: any) => ({
        value: type.id,
        label: type.type,
      }));
      setTypeProdOptions(options);
    } catch (error) {
      console.error('Error al cargar los tipos de pago:', error);
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    handleUpdate,
    typeProdOptions,
    loadTypeProdOptions
  };
};
