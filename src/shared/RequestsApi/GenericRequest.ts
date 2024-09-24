export const GenericRequest = async <T, R>(
    formData: T,
    methodGeneric : (formData: T) => Promise<R>,
    messageSuccess:string,
    
  ): Promise<R | undefined> => {
    try {
      const response = await methodGeneric(formData);
      console.log('GenericRequest', messageSuccess);
      return response;
    } catch (error) {
      console.error("Error:", error);
      return undefined;
    }
  };