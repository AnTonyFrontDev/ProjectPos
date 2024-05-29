import { SaveProduct } from "@/shared/Api/Products/ProductApi";
import { IProductPost } from '@/shared/interfaces/Product/IProductPost';


export const SendProduct = async <T extends IProductPost>(formData: T): Promise<void> => {
    try {
      await SaveProduct(formData);
      console.log('Product saved successfully');
    } catch (error) {
      console.error('Error saving product:', error);
    }
};
