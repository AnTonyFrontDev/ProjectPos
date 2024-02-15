import { useState } from 'react';
import { InventoryColorDto } from '../../../shared/interfaces/Inventory/I_InventoryColor';
import { InventoryDto } from '@/shared/interfaces/Inventory/I_Inventory';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
import { saveInventory } from '@/shared/Api/InventoryApi';
import { useNavigate } from 'react-router-dom';

export const useInventoryForm = () => {
  const [formData, setFormData] = useState<InventoryDto>(new InventoryDto());
  const currentDate = new Date().toISOString();
  const newExistence: InventoryColorDto = new InventoryColorDto();
  newExistence.date = currentDate;
  const navigate = useNavigate();

  

  const addExistence = () => {
    newExistence.date = currentDate;

    setFormData((prevInventory) => ({
      ...prevInventory,
      inventoryColors: [...prevInventory.inventoryColors, newExistence],
    }));
  };
  

  const handleProductSelect = (productId: string) => {
    setFormData({ ...formData, fk_product: Number(productId) });
  };

  const handleSizeSelect = (sizeId: string) => {
    setFormData({ ...formData, fk_size: Number(sizeId) });
  };

  const handleColorSelect = (sizeId: string, isPrimary: boolean, index: number) => {
    setFormData((prevInventory) => ({
      ...prevInventory,
      inventoryColors: prevInventory.inventoryColors.map((item, i) =>
        i === index
          ? isPrimary
            ? { ...item, fk_color_primary: Number(sizeId) }
            : { ...item, fk_color_secondary: Number(sizeId) }
          : item
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Puedes realizar acciones adicionales aquí antes de enviar el inventario a la base de datos
    console.log('Inventario:', formData);
    GenericRequest(formData, saveInventory, "inventario enviado con éxito")
        .then(() => {
            console.log('Inventario enviado con éxito');
            navigate('/inventory', { replace: true });
        })
        .catch((error) => {
            console.error('Error al enviar el inventario:', error);
        });
};

  const handleAddInventory = () => {
    // Puedes realizar acciones adicionales aquí antes de enviar el inventario a la base de datos
    console.log('Inventario:', formData);
    // SendInventory(formData);
  };

  return { formData, setFormData, addExistence, handleSubmit, handleAddInventory, handleProductSelect, handleSizeSelect, handleColorSelect };
};
