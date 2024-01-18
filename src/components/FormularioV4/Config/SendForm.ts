//SendForm.ts
import { saveClient } from "../../../shared/Api/CustomersApi";
import { saveInventory } from "../../../shared/Api/InventoryApi";
import { addType, saveProduct } from "../../../shared/Api/ProductsApi";
import { FormDataProducto, FormDataType, FormDataInventory, FormDataClient } from './interface';

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


export const SendClient = async <T extends FormDataClient>(formData: T): Promise<void> => {
  try {
    await saveClient(formData);
    console.log('Inventory saved successfully');
  } catch (error) {
    console.error('Error saving inventory:', error);
  }
};

