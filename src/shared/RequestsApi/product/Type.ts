import { FormDataType } from "@/components/FormularioV4/Config/interface";
import { addType } from "@/shared/Api/ProductsApi";

export const SendTypes = async <T extends FormDataType>(formData: T): Promise<void> => {
    try {
      await addType(formData);
      console.log('Product saved successfully');
    } catch (error) {
      console.error('Error saving product:', error);
    }
};
