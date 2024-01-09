//SendForm.ts
import { saveInventory } from "../../../screens/inventory/hooks/InventoryApi";
import { addType, saveProduct } from "../../../screens/inventory/hooks/ProductsApi";
import { FormDataProducto, FormDataType, FormDataInventory } from './interface';

export const SendProduct = async <T extends FormDataProducto>(formData: T): Promise<void> => {
    try {
      await saveProduct(formData);
      console.log('Product saved successfully');
    } catch (error) {
      console.error('Error saving product:', error);
    }
};

export const SendTypes = async <T extends FormDataType>(formData: T): Promise<void> => {
    try {
      await addType(formData);
      console.log('Product saved successfully');
    } catch (error) {
      console.error('Error saving product:', error);
    }
};

export const SendInventory = async <T extends FormDataInventory>(formData: T): Promise<void> => {
  try {
    await saveInventory(formData);
    console.log('Inventory saved successfully');
  } catch (error) {
    console.error('Error saving inventory:', error);
  }
};

