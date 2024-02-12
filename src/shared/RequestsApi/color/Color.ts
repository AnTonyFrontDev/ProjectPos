import { SaveColor } from "@/shared/Api/Color/ColorApi";
import { IColorPost } from "@/shared/interfaces/Color/IColorPost";
import { IColorUpdate } from "@/shared/interfaces/Color/IColorUpdate";

export const SendColor = async <T extends IColorPost>(
    formData: T
  ): Promise<void> => {
    try {
      await SaveColor(formData);
      console.log("Inventory saved successfully");
    } catch (error) {
      console.error("Error saving inventory:", error);
    }
  };

  export const UpdateColor = async <T extends IColorUpdate>(
    formData: T
  ): Promise<void> => {
    try {
      await UpdateColor(formData);
      console.log("Inventory saved successfully");
    } catch (error) {
      console.error("Error saving inventory:", error);
    }
  };