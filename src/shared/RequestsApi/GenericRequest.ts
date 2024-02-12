export const GenericRequest = async <T>(
    formData: T,
    methodGeneric : (formData: T) => Promise<void>,
    messageSuccess:string,
    
  ): Promise<void> => {
    try {
      await methodGeneric(formData);
      console.log(messageSuccess);
    } catch (error) {
      console.error("Error:", error);
    }
  };