//SendForm.ts
import { saveClient } from "@/shared/Api/Customers/CustomersApi";
import { saveInventory } from "@/shared/Api/InventoryApi";
import { addType, saveProduct } from "@/shared/Api/ProductsApi";
import { FormDataType } from './interface';
import { IInventory } from "@/shared/interfaces/Inventory/I_Inventory";
import { IClientPost } from "@/shared/interfaces/Client/IClientPost";
import { IProduct } from "@/shared/interfaces/Product/IProduct";

export const SendProduct = async <T extends IProduct>(formData: T): Promise<void> => {
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

export const SendInventory = async <T extends IInventory>(formData: T): Promise<void> => {
  try {
    await saveInventory(formData);
    console.log('Inventory saved successfully');
  } catch (error) {
    console.error('Error saving inventory:', error);
  }
};


export const SendClient = async <T extends IClientPost>(formData: T): Promise<void> => {
  try {
    await saveClient(formData);
    console.log('Inventory saved successfully');
  } catch (error) {
    console.error('Error saving inventory:', error);
  }
};

