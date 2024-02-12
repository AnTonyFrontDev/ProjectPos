import { SaveSize, UpdateSize } from "@/shared/Api/Size/SizeApi";
import { ISizePost } from "@/shared/interfaces/size/ISizePost";
import { ISizeUpdate } from "@/shared/interfaces/size/ISizeUpdate";



export const SendColor = async <T extends ISizePost>(
  formData: T
): Promise<void> => {
  try {
    await SaveSize(formData);
    console.log("Inventory saved successfully");
  } catch (error) {
    console.error("Error saving inventory:", error);
  }
};

export const UpdateColor = async <T extends ISizeUpdate>(
    formData: T
  ): Promise<void> => {
    try {
      await UpdateSize(formData);
      console.log("Inventory saved successfully");
    } catch (error) {
      console.error("Error saving inventory:", error);
    }
  };
  
  
// export const RemoveColor = async <T extends ISizeRemove>(
//     formData: T
//   ): Promise<void> => {
//     try {
//       await RemoveSize(formData);
//       console.log("Inventory saved successfully");
//     } catch (error) {
//       console.error("Error saving inventory:", error);
//     }
//   };
  
  