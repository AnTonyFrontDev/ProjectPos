// InventoryForm.tsx
import React, { useState} from 'react';
import { getColors, getSizes, saveInventory } from '../../shared/Api/InventoryApi';
import { getProducts } from '../../shared/Api/ProductsApi';
import { useFormDataWithOptionsNew } from '../FormularioV4/Config/FormUtils';
import { FormDataInventory, FormApi } from '../FormularioV4/Config/interface';
import { initialFormDataInventory } from '../FormularioV4/Config/FormConfig';
import { f_DataFieldsInventory } from '../FormularioV4/Config/data';
import Form from '../FormularioV4/Views/Form';


 interface Color {
    user: number;
    fk_color_primary: number;
    fk_color_secondary: number;
    quantity: number;
  }

const InventoryForm: React.FC<FormApi> = () => {
    const { sizes, colors, products } = useFormDataWithOptionsNew(['colors', 'products', 'sizes']);
    const [formData, setFormData] = useState<FormDataInventory>(initialFormDataInventory);
  
    const handleColorChange = (index: number, field: string, value: any) => {
      const updatedColors = [...formData.inventoryColors];
      updatedColors[index][field] = value;
      setFormData({
        ...formData,
        inventoryColors: updatedColors,
      });
    };
  
    const handleAddColor = () => {
      setFormData({
        ...formData,
        inventoryColors: [
        //   ...formData.inventoryColors,
          {
            user: 0,
            fk_color_primary: 0,
            fk_color_secondary: 0,
            quantity: 0,
          },
        ],
      });
    };
  
    const handleRemoveColor = (index: number) => {
      const updatedColors = [...formData.inventoryColors];
      updatedColors.splice(index, 1);
      setFormData({
        ...formData,
        inventoryColors: updatedColors,
      });
    };
  
    const handleSubmit = () => {
      SendInventory(formData);
    };

  
    const dataFields = f_DataFieldsInventory(sizes, colors, products);
  

  const onFinish = async (values: any) => {
    try {
      await saveInventory(values);
      console.log('Inventory saved successfully:', values);
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };

  return (
    <div>
      <Form
        formDataFields={dataFields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
      {formData.inventoryColors.map((color, index) => (
        <div key={index}>
          <select
            name={`fk_color_primary_${index}`}
            value={color.fk_color_primary}
            onChange={(e) => handleColorChange(index, 'fk_color_primary', parseInt(e.target.value, 10))}
          >
    
          </select>
          <select
            name={`fk_color_secondary_${index}`}
            value={color.fk_color_secondary}
            onChange={(e) => handleColorChange(index, 'fk_color_secondary', parseInt(e.target.value, 10))}
          >
          </select>
          <input
            type="number"
            name={`quantity_${index}`}
            value={color.quantity}
            onChange={(e) => handleColorChange(index, 'quantity', parseInt(e.target.value, 10))}
          />
          <button type="button" onClick={() => handleRemoveColor(index)}>
            Remove Color
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddColor}>
        Add Color
      </button>
    </div>
  );
};

export default InventoryForm;
