import { useEffect, useState } from 'react';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { IOptionSelect } from '@/components/FormularioV4/Config/interface';
import { SaveProduct, UpdateProduct } from '@/shared/Api/ProductApi';
import { getTypes } from '@/shared/Api/TypeProduct';
import { IProduct, ProductDtoPost, ProductUpdateDto } from '@/shared/interfaces/IProduct';
import showGenericNotification from '@/util/antd/notification';
import showConfirm from '@/util/antd/confirm';



export const useProductForm = () => {
  const [formData, setFormData] = useState<IProduct>(new ProductDtoPost());
  const [typeProdOptions, setTypeProdOptions] = useState<IOptionSelect[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showConfirm({
      title: "Confirmar envío",
      content: "¿Está seguro de que desea enviar los datos de el Producto?",
      onOk: () => {
        GenericRequest(formData, SaveProduct, "Product data submitted successfully")
          .then((response: any) => {
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al crear el Producto';
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
            console.error("Error submitting Product data:", error);
          });
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: IProduct = new ProductUpdateDto(formData);
    
    showConfirm({
      title: "Confirmar actualización",
      content: "¿Está seguro de que desea actualizar los datos de el Producto?",
      onOk: () => {
        GenericRequest(updateData, UpdateProduct, "Datos de Producto actualizados correctamente")
          .then((response: any) => {
            showGenericNotification({ isSuccess: true, title: 'Éxito', message: response.message });
            setIsSuccess(true);
          })
          .catch((error) => {
            const errorMessage = 'Hubo un error al actualizar el Producto'; 
            showGenericNotification({ isSuccess: false, title: 'Error', message: errorMessage });
            console.error("Error updating Producto data:", error);
          });
      }
    });
  };
  
  const loadTypeProdOptions = async (fk_type?: number, type?: string) => {
    try {
      const prodTypes = await getTypes(); // Llama a la función para obtener los tipos de producto
      const options: IOptionSelect[] = prodTypes.map((type: any) => ({
        value: type.id,
        label: type.type,
      }));
      setTypeProdOptions(options);

      // Si estamos actualizando, derivamos el fk_type desde type si está ausente
      if (!fk_type && type) {
        const matchingOption = options.find((option) => option.label === type);
        if (matchingOption) {
          setFormData((prevData) => ({ ...prevData, fk_type: matchingOption.value }));
        }
      } else if (fk_type) {
        setFormData((prevData) => ({ ...prevData, fk_type }));
      }
    } catch (error) {
      console.error('Error al cargar los tipos de productos:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setIsSuccess(false);
    }
  }, [isSuccess]);

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
