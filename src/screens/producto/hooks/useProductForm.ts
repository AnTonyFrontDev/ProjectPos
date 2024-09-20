import { useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { IOptionSelect } from '@/components/FormularioV4/Config/interface';
import { SaveProduct, UpdateProduct } from '@/shared/Api/Products/ProductApi';
import { getTypes } from '@/shared/Api/Products/TypeProd/TypeProduct';
import { IProduct, ProductDtoPost, ProductUpdateDto } from '@/shared/interfaces/IProduct';
import showGenericNotification from '@/util/antd/notification';



export const useProductForm = () => {
  const [formData, setFormData] = useState<IProduct>(new ProductDtoPost());
  const [typeProdOptions, setTypeProdOptions] = useState<IOptionSelect[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product Data:', formData);
    GenericRequest(formData, SaveProduct, "Product data submitted successfully")
      .then(() => {
        // Muestra notificación de éxito
        showGenericNotification({
          isSuccess: true,
          title: 'Éxito',
          message: 'Los datos del producto se han enviado con éxito.'
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Esperar 2 segundos antes de recargar
      })
      .catch((error) => {
        console.error("Error submitting Product data:", error);
        // Muestra notificación de error
        showGenericNotification({
          isSuccess: false,
          title: 'Error',
          message: 'Hubo un problema al enviar los datos del producto.'
        });
      });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IProduct = new ProductUpdateDto(formData);
    // console.log('Product Data:', updateData);
    GenericRequest(updateData, UpdateProduct, "Payment data updated successfully")
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
    });
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
