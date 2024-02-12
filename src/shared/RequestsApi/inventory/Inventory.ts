import { saveInventory } from "@/shared/Api/InventoryApi";
import { IInventory } from "@/shared/interfaces/Inventory/I_Inventory";

export const SendInventory = async <T extends IInventory>(formData: T): Promise<void> => {
    try {
      await saveInventory(formData);
      console.log('Inventory saved successfully');
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };
  