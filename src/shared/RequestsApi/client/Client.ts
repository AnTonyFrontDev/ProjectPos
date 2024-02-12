import {
  RemoveClient,
  UpdateClient,
  saveClient,
} from "@/shared/Api/Customers/CustomersApi";
import { IClientPost } from "@/shared/interfaces/Client/IClientPost";
import { IClientRemove } from "@/shared/interfaces/Client/IClientRemove";
import { IClientUpdate } from "@/shared/interfaces/Client/IClientUpdate";

export const SendClient = async <T extends IClientPost>(
  formData: T
): Promise<void> => {
  try {
    await saveClient(formData);
    console.log("Inventory saved successfully");
  } catch (error) {
    console.error("Error saving inventory:", error);
  }
};

export const updateClient = async <T extends IClientUpdate>(
  formData: T
): Promise<void> => {
  try {
    await UpdateClient(formData);
    console.log("Inventory saved successfully");
  } catch (error) {
    console.error("Error saving inventory:", error);
  }
};

export const removeClient = async <T extends IClientRemove>(
  formData: T
): Promise<void> => {
  try {
    await RemoveClient(formData);
    console.log("Inventory saved successfully");
  } catch (error) {
    console.error("Error saving inventory:", error);
  }
};
