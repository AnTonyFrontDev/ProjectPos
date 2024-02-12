import { saveProduct } from "@/shared/Api/ProductsApi";
import { IProduct } from "@/shared/interfaces/Product/IProduct";

export const SendProduct = async <T extends IProduct>(formData: T): Promise<void> => {
    try {
      await saveProduct(formData);
      console.log('Product saved successfully');
    } catch (error) {
      console.error('Error saving product:', error);
    }
};
